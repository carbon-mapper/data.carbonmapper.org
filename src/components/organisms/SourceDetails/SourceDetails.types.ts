import { SourceDataTypes } from '@/types/api/source.types';

export namespace SourceDetailsTypes {
    export type ActiveTab = 'observations' | 'supporting';
    export type SetActiveTab = (tab: ActiveTab) => void;

    export type Gas = SourceDataTypes.GasType;
    export type Gases = Gas[];
    export type Sector = SourceDataTypes.SectorCode;

    export type SectorName =
        | 'Oil & Gas'
        | 'Solid Waste'
        | 'Waste Water'
        | 'Livestock'
        | 'Coal Mining'
        | 'Electricity'
        | 'Other';

    export type Point = {
        coordinates: [longitude: number, latitude: number];
        type: 'Point';
    };

    export type Plume = SourceDataTypes.Plume;
    export type Scene = SourceDataTypes.Scene;
    export type ListItemData = Plume | Scene;

    export type LocationContext = {
        id: string;
        language: string;
        language_en: string;
        mapbox_id: string;
        short_code: string;
        text: string;
        text_en: string;
        wikidata: string;
    };

    export type LocationFeature = {
        bbox: [number, number, number, number];
        center: [longitude: number, latitude: number];
        context: LocationContext[];
        geometry: {
            coordinates: [longitude: number, latitude: number];
            type: 'Point';
        };
        id: string;
        language: string;
        language_en: string;
        place_name: string;
        place_name_en: string;
        place_type: string[];
        properties: {
            mapbox_id: string;
            wikidata: string;
        };
        relevance: number;
        text: string;
        text_en: string;
        type: 'Feature';
    };

    export type LocationData = {
        attribution: string;
        features: LocationFeature[];
        query: [longitude: number, latitude: number];
        type: 'FeatureCollection';
    };

    export type GraphData = {
        id: string;
        emission: number;
        date: Date;
    };

    export type SourceInfo = {
        name: string;
        gases: Gas[];
        sector: Sector | '';
    };

    export type SourceStatistics = {
        totalPlumes: number;
        totalQuantifiedPlumes: number;
        totalObservations: number;
        totalAirbornePlumes: number;
        totalSatellitePlumes: number;
        totalEmissionRate: number;
        totalUncertainty: number;
        averagePersistence: number;
        sectors: string[] | [];
    };
}
