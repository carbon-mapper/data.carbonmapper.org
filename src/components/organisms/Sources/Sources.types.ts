import type { MapTypes } from '../Map/Map.types';

export namespace SourcesTypes {
    export type Features = {
        id: number;
        properties: MapTypes.FeatureProperties;
        _x: number;
        _y: number;
        _z: number;
        geometry: {
            coordinates: [number, number];
            type: string;
        };
    }[];
}
