// @ts-nocheck
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import circle from '@turf/circle';
import length from '@turf/length';
import { Feature } from 'geojson';

const CircleMode = { ...MapboxDraw.modes.draw_line_string };

const { modes, constants, lib } = MapboxDraw;

const { doubleClickZoom } = lib;
const { classes, cursors, events, meta, geojsonTypes, types } = constants;

// CircleMode.onSetup
// CircleMode.onClick
// CircleMode.onStop
// CircleMode.on ???

// copied over from radius mode
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

// copied over from radius mode
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

// copied over from radius mode
function toDisplayNumber(number: number, magnitudeThreshold: number, power?: string) {
    const powerStr = power ? ` ${power}` : '';

    if (number < magnitudeThreshold) return `${parseFloat(number.toFixed(0)).toLocaleString('en-US')} ${powerStr}m`;

    return `${parseFloat((number / magnitudeThreshold).toFixed(2)).toLocaleString('en-US')} ${powerStr}km`;
}

// copied over from radius mode
CircleMode.toDisplayFeatures = function (state, geojson: Feature, display) {
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

    return null;
};

// copied over from radius mode
CircleMode.onClick = function (state, e) {
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

CircleMode.onStop = function (state) {
    // get the current drawn line feature
    const line = this.getFeature(state.line.id);

    // get the coordinates of the line, the first should be the center of the circle
    const [end, center] = line.getCoordinates();

    // get the radius of the circle in km
    const radius = length(line, { units: 'kilometers' });

    // make a "circle" polygon from the line's coordinates, divide by 2 - why?
    const circlePolygon = circle(center as [number, number], radius / 2, {
        steps: 64,
        units: 'kilometers'
    });

    // replace line coordinates with the circle polygon's coordinates
    const circleCoordinates = circlePolygon.geometry.coordinates;
    line.setCoordinates(...circleCoordinates);

    // update meta?
    line.setProperty('meta', 'circle');
    line.setProperty('radius', radius);
    line.setProperty('center', center);

    // need this?
    // this.updateUIClasses({ mouse: cursors.NONE });
    // doubleClickZoom.enable(this);
    // this.activateUIButton();

    // need to fire this ourselves!
    this.map.fire(events.CREATE, {
        features: [state.line.toGeoJSON()]
    });
};

export default CircleMode;
