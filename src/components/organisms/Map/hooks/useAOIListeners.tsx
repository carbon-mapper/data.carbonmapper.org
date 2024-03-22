import MapboxDraw from '@mapbox/mapbox-gl-draw';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import * as turf from '@turf/turf';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import mapboxgl from 'mapbox-gl';
import { useCallback, useEffect } from 'react';
import type { Position } from '@turf/turf';
import { useDraw, useFile, useDrawStoreActions, AOIJSON } from '@/store/useDrawStore/useDrawStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export function useAOIListeners() {
    const map = useMapSlice(state => state.map);
    const draw = useDraw();
    const file = useFile();
    const { setAOI, setDrawMode } = useDrawStoreActions();
    const fitBounds = useMapSlice(state => state.fitBounds);
    const setPopupMessage = useSetPopupMessage();

    const handleDrawCreate = useCallback(() => {
        if (draw !== null) {
            setAOI(buildAOIJSON(getFeatures(draw)));

            // setTimeout necessary to achieve the correct order of events
            // to prevent draw.create from continuously firing
            setTimeout(() => setDrawMode('static'), 0);
        }
    }, [draw, setAOI, setDrawMode]);

    const handleDrawUpdate = useCallback(() => {
        if (draw !== null) {
            setAOI(buildAOIJSON(getFeatures(draw)));
        }
    }, [draw, setAOI]);

    const handleDrawModeChange = useCallback(
        ({ mode }: MapboxDraw.DrawModeChangeEvent) => setDrawMode(mode, { updateDraw: false }),
        [setDrawMode]
    );

    // Add draw event listeners - i feel like these could be moved to useDraw
    useEffect(() => {
        if (!map) return;

        map.on('draw.create', handleDrawCreate);
        map.on('draw.update', handleDrawUpdate);
        map.on('draw.modechange', handleDrawModeChange);

        return () => {
            map.off('draw.create', handleDrawCreate);
            map.off('draw.update', handleDrawUpdate);
            map.off('draw.modechange', handleDrawModeChange);
        };
    }, [map, handleDrawCreate, handleDrawUpdate, handleDrawModeChange]);

    // Add file to draw
    useEffect(() => {
        if (!file || !draw) return;

        const getAOI = () => buildAOIJSON(getFeatures(draw));

        const reader = new FileReader();

        reader.onload = function () {
            try {
                const geojson = JSON.parse(reader.result as string);

                const { type, name, features } = geojson;

                // Guard against empty features inside a file
                const sanitized = {
                    type,
                    name,
                    features: features.filter((feature: Feature) => feature.geometry)
                };

                const boundingBox = turf.bbox(sanitized);

                draw.set(sanitized);
                fitBounds(boundingBox as mapboxgl.LngLatBoundsLike, 100);
                setAOI(getAOI());
            } catch (error) {
                console.error(error);
                setPopupMessage('Error parsing GeoJSON file');
            }
        };

        reader.readAsText(file);
    }, [draw, file, setAOI, fitBounds, setPopupMessage]);
}

const getFeatures = (draw: MapboxDraw) => draw.getAll().features;

function buildAOIJSON(features: Feature<Geometry, GeoJsonProperties>[]): AOIJSON {
    return features.reduce(combineGeometry, {
        id: undefined, // If we are building stuff on the frontend, it's not backed by the server yet
        geometry_json: {
            type: 'MultiPolygon',
            coordinates: []
        }
    });
}

// I wonder if we can pull this from a existing library
function combineGeometry(accumulator: AOIJSON, feature: Feature): AOIJSON {
    const { geometry } = feature;
    const type = geometry.type;
    const coordinates = 'coordinates' in geometry ? geometry.coordinates : null;

    if (!coordinates) return accumulator;

    let newGeometry: Position[][][] = [];

    switch (type) {
        case 'MultiPolygon':
            newGeometry = [...accumulator.geometry_json.coordinates, ...(coordinates as Position[][][])];
            break;
        case 'Polygon':
            newGeometry = [...accumulator.geometry_json.coordinates, [...(coordinates as Position[][])]];
            break;
        case 'LineString':
            newGeometry = [...accumulator.geometry_json.coordinates, [[...(coordinates as Position[])]]];
            break;
        case 'Point':
            const buffered = turf.buffer(turf.point(coordinates as Position), 500, { units: 'meters' });
            newGeometry = [...accumulator.geometry_json.coordinates, buffered.geometry.coordinates];
            break;
        default:
            // ???
            break;
    }

    return {
        ...accumulator,
        geometry_json: {
            type: 'MultiPolygon',
            coordinates: newGeometry
        }
    };
}

export function getFeaturesInsideAOI<T extends Feature>(aoi: AOIJSON | null, features: T[]) {
    if (!aoi) return features;

    const { geometry_json } = aoi;

    const points = features.filter(feature => {
        const { geometry } = feature;
        const { coordinates } = geometry as { coordinates: Position };

        const multiPolygon = turf.multiPolygon(geometry_json.coordinates);
        return booleanPointInPolygon(coordinates, multiPolygon);
    });

    return points;
}
