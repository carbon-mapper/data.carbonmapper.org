import { API_BASE_URL } from '@/utils/config';
import type { MapTypes } from './Map.types';

export const sources: { [key: string]: MapTypes.Source } = {
    main: {
        type: 'geojson',
        url: `${API_BASE_URL}/catalog/sources.geojson`,
        id: 'main-source',
        options: {
            cluster: true,
            clusterMaxZoom: 11,
            clusterRadius: 100
        },
        layerId: 'main-layer',
        layerType: 'circle',
        clusterLayerId: 'clusters'
    },
    // the data source is bascially the same as the main source, but w/o clusters - it's
    // necessary for the mapbox queryRenderedFeatures method to work as we need it to
    data: {
        type: 'geojson',
        url: `${API_BASE_URL}/catalog/sources.geojson`,
        id: 'data-source',
        layerId: 'data-layer',
        layerType: 'circle'
    },
    // What is this?
    raster: {
        type: 'raster',
        url: `${API_BASE_URL}/layers/scene/GAO20210715t191357p0000/rgb/{z}/{x}/{y}.png`,
        id: 'raster-source',
        tileSize: 256,
        layerId: 'raster-layer',
        layerType: 'raster'
    },
    plumes: {
        type: 'vector',
        url: `${API_BASE_URL}/layers/plumes/{z}/{x}/{y}.mvt`,
        id: 'plumes-source',
        layerId: 'plumes-layer',
        layerType: 'fill'
    },
    scenes: {
        type: 'vector',
        url: `${API_BASE_URL}/layers/scenes/{z}/{x}/{y}.mvt`,
        id: 'scenes-source',
        layerId: 'scenes-layer',
        layerType: 'fill'
    },
    scenesOutline: {
        type: 'vector',
        url: `${API_BASE_URL}/layers/scenes/{z}/{x}/{y}.mvt`,
        id: 'scenes-source',
        layerId: 'scenes-outline-layer',
        layerType: 'line'
    }
};
