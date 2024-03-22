// Custom mode taken from https://gist.github.com/chriswhong/694779bc1f1e5d926e47bab7205fa559
// One of the custom modes promoted by https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/MODES.md
// Modifications have been made
// Worth reviewing the code for optimizations and tuning towards our interests

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import length from '@turf/length';
import { Feature } from 'geojson';

const RadiusMode = { ...MapboxDraw.modes.draw_line_string };

function createVertex(parentId: string, coordinates: [number, number], path: string, selected: boolean): Feature {
    return {
        type: 'Feature',
        properties: {
            meta: 'vertex',
            parent: parentId,
            coord_path: path,
            active: selected ? 'true' : 'false'
        },
        geometry: {
            type: 'Point',
            coordinates
        }
    };
}

// create a circle-like polygon given a center point and radius
// https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js/39006388#39006388
function createGeoJSONCircle(center: [number, number], radiusInKm: number, parentId: string, points = 64): Feature {
    const coords = {
        latitude: center[1],
        longitude: center[0]
    };

    const km = radiusInKm;

    const ret = [];
    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    let theta;
    let x;
    let y;
    for (let i = 0; i < points; i += 1) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [ret]
        },
        properties: {
            parent: parentId
        }
    };
}

function toDisplayNumber(number: number, magnitudeThreshold: number, power?: string) {
    const powerStr = power ? ` ${power}` : '';

    if (number < magnitudeThreshold) return `${parseFloat(number.toFixed(0)).toLocaleString('en-US')} ${powerStr}m`;

    return `${parseFloat((number / magnitudeThreshold).toFixed(2)).toLocaleString('en-US')} ${powerStr}km`;
}

function getDisplayMeasurements(feature: Feature) {
    const drawnLength = length(feature) * 1000; // m
    const area = Math.PI * drawnLength ** 2; // m^2

    const displayMeasurements = {
        distance: toDisplayNumber(drawnLength, 1000),
        area: toDisplayNumber(area, 1000 * 1000, 'sq')
    };

    return displayMeasurements;
}

const doubleClickZoom = {
    // @ts-ignore
    enable: ctx => {
        setTimeout(() => {
            // First check we've got a map and some context.
            if (
                !ctx.map ||
                !ctx.map.doubleClickZoom ||
                !ctx._ctx ||
                !ctx._ctx.store ||
                !ctx._ctx.store.getInitialConfigValue
            )
                return;
            // Now check initial state wasn't false (we leave it disabled if so)
            if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
            ctx.map.doubleClickZoom.enable();
        }, 0);
    }
};

// @ts-ignore
RadiusMode.clickAnywhere = function (state, e) {
    // this ends the drawing after the user creates a second point, triggering this.onStop
    if (state.currentVertexPosition === 1) {
        state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
        // @ts-ignore
        return this.changeMode('simple_select', { featureIds: [state.line.id] });
    }
    // @ts-ignore
    this.updateUIClasses({ mouse: 'add' });
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
    if (state.direction === 'forward') {
        state.currentVertexPosition += 1; // eslint-disable-line
        state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
    } else {
        state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    }

    return null;
};

RadiusMode.onStop = function (state) {
    doubleClickZoom.enable(this);

    this.activateUIButton();

    // check to see if we've deleted this feature
    if (this.getFeature(state.line.id) === undefined) return;

    this.deleteFeature(state.line.id, { silent: true });
    this.changeMode('simple_select', {}, { silent: true });
};

RadiusMode.toDisplayFeatures = function (state, geojson: Feature, display) {
    // Satisfy TS
    geojson.properties = geojson.properties ?? {};

    const isActiveLine = geojson.properties.id === state.line.id;
    geojson.properties.active = isActiveLine ? 'true' : 'false';
    if (!isActiveLine) return display(geojson);

    // Only render the line if it has at least one real coordinate
    if (geojson.geometry.type === 'GeometryCollection' || geojson.geometry.coordinates.length < 2) return null;
    geojson.properties.meta = 'feature';

    // ToDo: Revisit. Skipping over for now
    const coordinates = geojson.geometry.coordinates[
        state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1
    ] as [number, number];

    // displays center vertex as a point feature
    display(
        createVertex(
            state.line.id,
            coordinates,
            `${state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1}`,
            false
        )
    );

    // displays the line as it is drawn
    display(geojson);

    // create custom feature for radius circlemarker
    const center = geojson.geometry.coordinates[0];
    // const radiusInKm = length(geojson, "kilometers");
    const radiusInKm = length(geojson, { units: 'kilometers' });
    const circleFeature = createGeoJSONCircle(center as [number, number], radiusInKm, state.line.id);
    circleFeature.properties = circleFeature.properties ?? {};
    circleFeature.properties.meta = 'radius';
    circleFeature.properties.active = 'true';

    display(circleFeature);

    const displayMeasurements = getDisplayMeasurements(geojson);

    // create custom feature for the current pointer position
    const currentVertex: Feature = {
        type: 'Feature',
        properties: {
            meta: 'currentPosition',
            distance: displayMeasurements.distance,
            area: displayMeasurements.area,
            parent: state.line.id
        },
        geometry: {
            type: 'Point',
            // @ts-ignore - ToDo: Revisit this as well
            coordinates: geojson.geometry.coordinates[1]
        }
    };

    display(currentVertex);

    return null;
};

export default RadiusMode;
