import { type SourceDataTypes } from '@/types/api/source.types';
import mapboxgl from 'mapbox-gl';

export namespace MapTypes {
    export type Map = mapboxgl.Map;

    export type Fetcher = (url: string) => Promise<SourceData>;

    export type SourceType =
        | mapboxgl.GeoJSONSource['type']
        | mapboxgl.RasterSource['type']
        | mapboxgl.VectorSource['type'];

    export type LayerType =
        | mapboxgl.CircleLayer['type']
        | mapboxgl.FillLayer['type']
        | mapboxgl.LineLayer['type']
        | mapboxgl.SymbolLayer['type']
        | mapboxgl.RasterLayer['type'];

    export type Marker = {
        coordinates: [lng: number, lat: number];
        element: HTMLDivElement;
        id: number;
        registeredMarker: mapboxgl.Marker;
        pointCount?: number;
        plumeCount?: number;
        sourceName: string;
    };

    export type Source = {
        type: 'geojson' | 'raster' | 'vector';
        url: string;
        id: string;
        options?: {
            cluster: boolean;
            clusterMaxZoom: number;
            clusterRadius: number;
        };
        layerId: string;
        layerType: MapTypes.LayerType;
        clusterLayerId?: string;
        tileSize?: number;
    };

    export type SourceData = {
        type: 'FeatureCollection';
        features: MapboxFeature[];
    };

    export type SourceStatistics = {
        totalEmissions: number;
        totalUncertainty: number;
        totalPlumes: number;
        totalSources: number;
        totalPersistentSources: number;
        bySector: {
            '1A1': number;
            '1B1a': number;
            '1B2': number;
            '4B': number;
            '6A': number;
            '6B': number;
            NA: number;
            other: number;
        };
    };

    // Should be renamed
    export type MapboxFeature = {
        type: 'Feature';
        state?: unknown;
        geometry: SourceDataTypes.Point;
        properties: SourceDataTypes.GeoJSONFeatureProperties;
        id: string;
        bbox: [number, number, number, number];
    };

    export type MapboxClusterFeature = {
        type: 'Feature';
        state?: unknown;
        geometry: SourceDataTypes.Point;
        properties: {
            cluster: boolean;
            cluster_id: number;
            point_count: number;
            point_count_abbreviated: number;
        };
        id: string;
        layer: {
            id: string;
            type: string;
            source: string;
            'source-layer'?: string;
            minzoom?: number;
            maxzoom?: number;
            filter?: unknown[];
            layout?: unknown;
            paint?: unknown;
        };
        source: string;
    };

    export type FeatureProperties = SourceDataTypes.GeoJSONFeatureProperties;
}
