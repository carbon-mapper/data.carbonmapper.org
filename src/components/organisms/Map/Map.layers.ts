import type { AnyPaint, AnyLayout } from 'mapbox-gl';
import { API_BASE_URL } from '@/utils/config';
import type { MapTypes } from './Map.types';

export type Source = {
    id: string;
    type: MapTypes.SourceType;
    data?: {
        type: 'FeatureCollection';
        features: MapTypes.MapboxFeature[] | [];
    };
    url: string;
    options?: {
        cluster: boolean;
        clusterMaxZoom: number;
        clusterRadius: number;
        clusterMinPoints?: number;
        tolerance?: number;
    };
    tileSize?: number;
    promoteId?: string;
};

const emptyGeoJSONData = { type: 'FeatureCollection', features: [] };

const mapNames = {
    accessibility: 'Carbon 04 - Accesibility-bw',
    satellite: 'Mapbox Satellite Streets',
    og: 'Carbon New Satellite'
};

const colorMap = {
    [mapNames['accessibility']]: '#0026FF',
    [mapNames['satellite']]: '#ffffff',
    [mapNames['og']]: '#6b01b3'
};

const opacityMap = {
    [mapNames['accessibility']]: 0.4,
    [mapNames['satellite']]: 0.3,
    [mapNames['og']]: 0.2
};

export const sourceConfig: {
    [key: string]: Source;
} = {
    main: {
        id: 'main-source',
        type: 'geojson',
        data: emptyGeoJSONData as Source['data'],
        url: `${API_BASE_URL}/catalog/sources.geojson`, // Not used (geojson)
        options: {
            cluster: true,
            clusterMaxZoom: 11,
            clusterRadius: 120
        }
    },
    dense: {
        id: 'dense-source',
        type: 'geojson',
        data: emptyGeoJSONData as Source['data'],
        url: `${API_BASE_URL}/catalog/sources.geojson`, // Not used (geojson)
        options: {
            cluster: true,
            clusterMaxZoom: 24,
            clusterRadius: 60
        }
    },
    data: {
        id: 'data-source',
        type: 'geojson',
        data: emptyGeoJSONData as Source['data'],
        url: `${API_BASE_URL}/catalog/sources.geojson` // Not used (geojson)
    },
    // What is this? - Will fix this later
    raster: {
        id: 'raster-source',
        type: 'raster',
        url: `${API_BASE_URL}/layers/scene/GAO20210715t191357p0000/rgb/{z}/{x}/{y}.png`,
        tileSize: 256
    },
    scenes: {
        id: 'scenes-source',
        type: 'vector',
        url: `${API_BASE_URL}/layers/scenes/{z}/{x}/{y}.mvt`, // This is used i think
        promoteId: 'scene_uuid'
    }
};

export const sourceIds = Object.keys(sourceConfig);

export const sourceIdMap = {
    main: 'main-source',
    dense: 'dense-source',
    data: 'data-source',
    raster: 'raster-source',
    plumes: 'plumes-source',
    scenes: 'scenes-source'
};

export const layerIdMap = {
    main: 'main-layer',
    dense: 'dense-layer',
    data: 'data-layer',
    decor: 'data-layer-decor',
    raster: 'raster-layer',
    plumes: 'plumes-layer',
    scenes: 'scenes-layer',
    'scenes-outline': 'scenes-outline-layer'
};

export type LayerName = keyof typeof layerIdMap;
export type LayerId = (typeof layerIdMap)[LayerName];

export type Layer = {
    id: string;
    type: MapTypes.LayerType;
    source: string;
    'source-layer'?: string;
    layout?: AnyLayout | undefined;
    paint?: AnyPaint | undefined;
    minZoom?: number;
    maxZoom?: number;
};

export const getLayerConfig = (
    sources: {
        [key: string]: Source;
    },
    basemap: string
): { [key: string]: Layer } => ({
    main: {
        id: 'main-layer',
        type: 'circle',
        source: sources.main.id,
        layout: {
            visibility: 'visible'
        },
        paint: {
            'circle-opacity': 0
        },
        minZoom: 4
    },
    dense: {
        id: 'dense-layer',
        type: 'circle',
        source: sources.dense.id,
        layout: {
            visibility: 'visible'
        },
        paint: {
            'circle-opacity': 0
        },
        maxZoom: 4
    },
    data: {
        id: 'data-layer',
        type: 'circle',
        source: sources.data.id,
        layout: {
            visibility: 'visible'
        },
        paint: {
            'circle-opacity': 0,
            'circle-color': '#ffffff',
            'circle-radius': 9,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-opacity': 0.5
        }
    },
    decor: {
        id: 'data-layer-decor',
        type: 'circle',
        source: sources.data.id,
        layout: {
            visibility: 'visible'
        },
        paint: {
            'circle-opacity': 0,
            'circle-color': '#ffffff',
            'circle-radius': 3.5,
            'circle-stroke-width': 3.5,
            'circle-stroke-color': ['match', ['get', 'gas'], 'CH4', '#6b01b3', 'CO2', '#d00a75', '#6b01b3'],
            'circle-stroke-opacity': 0
        }
    },
    raster: {
        id: 'raster-layer',
        type: 'raster',
        source: sources.raster.id,
        layout: {
            visibility: 'none'
        }
    },
    scenes: {
        id: 'scenes-layer',
        type: 'fill',
        source: sources.scenes.id,
        'source-layer': 'scenes',
        layout: {
            visibility: 'none'
        },
        paint: {
            'fill-color': colorMap[basemap],
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                opacityMap[basemap] / 5,
                opacityMap[basemap] / 10
            ]
        }
    },
    'scenes-outline': {
        id: 'scenes-outline-layer',
        type: 'line',
        source: sources.scenes.id,
        'source-layer': 'scenes',
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none'
        },
        paint: {
            'line-color': colorMap[basemap],
            'line-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                opacityMap[basemap] * 1.25,
                opacityMap[basemap]
            ],
            'line-width': 1
        }
    }
});
