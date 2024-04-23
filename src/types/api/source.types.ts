import { Point } from 'geojson';
import { MapboxGeoJSONFeature } from 'mapbox-gl';

export type GasType = 'CO2' | 'CH4';
export namespace SourceDataTypes {
    export type GasType = 'CO2' | 'CH4';
    export type SectorCode = '1B2' | '6A' | '6B' | '4B' | '1B1a' | '1A1' | 'other' | 'NA';

    export type Point = {
        type: 'Point';
        coordinates: [number, number];
    };

    export type Plume = {
        collection: string;
        cmf_type: string;
        gas: GasType;
        sector: SectorCode;
        status: string;
        hide_emission: boolean;
        phme_candidate: boolean;
        published_at: string | null;
        id: string;
        plume_id: string;
        geometry_json: Point;
        scene_id: string;
        scene_timestamp: string;
        instrument: string;
        platform: string;
        emission_auto: number | null;
        emission_uncertainty_auto: number | null;
        plume_png: string;
        plume_rgb_png: string;
        plume_tif: string;
        rgb_png: string;
        plume_bounds: [number, number, number, number];
        wind_direction_avg_auto: number | null | undefined;
        wind_speed_avg_auto: number | null | undefined;
    };

    export type Scene = {
        id: string;
        name: string;
        instrument: string;
        timestamp: string;
    };

    // this is actually different
    export type VectorScene = {
        instrument: string;
        scene_id: string;
        scene_uuid: string;
        timestamp: string;
    };

    export type Source = {
        gas: GasType;
        sector: SectorCode;
        persistence: number | null;
        emission_auto: number | null;
        emission_uncertainty_auto: number | null;
    };

    export type Data = {
        point: Point;
        plumes: Plume[];
        scenes: Scene[];
        source_name: string;
        source: Source;
        observation_dates: string[];
        detection_dates: string[];
    };

    export type GeoJSONFeatureProperties = {
        cluster_id: number;
        gas: GasType;
        sector: SectorCode;
        plume_count: number;
        date_count: number;
        plume_ids: string[];
        emission_auto: number | null;
        emission_uncertainty_auto: number | null;
        source_name: string;
        // the below are not in the PRODUCTION API currently
        published_at_max?: string;
        published_at_min?: string;
        timestamp_max?: string;
        timestamp_min?: string;
        persistence?: number;
    };

    export type GeoJSONFeature = {
        type: 'Feature';
        geometry: Point;
        properties: GeoJSONFeatureProperties;
        id: string;
        bbox: [number, number, number, number];
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
}

// Not the API data but from source features related to mapbox events/queries
// A lot of this is in common with the API data and could be combined
// This should eventually become the only properties in the sources.geojson source features for optimal performance
export type MapBoxSourceFeatureProperties = {
    source_name: string;
    // Ideally plume_ids can be replaced with defaultPlumeUrl & bounds?? (needed for image)
    plume_ids: string; // JSON.stringified array of plume_ids
    plume_count: number; // Not necessary if plume_ids is an array...
};

// MapboxGeoJSONFeature can have different geometries
export type MapBoxPointFeature = MapboxGeoJSONFeature & {
    geometry: Point;
};

export type MapBoxSourceFeature = MapboxGeoJSONFeature & { properties: MapBoxSourceFeatureProperties } & {
    geometry: Point;
};
