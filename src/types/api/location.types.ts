import { FiltersLocation } from '@/store/useFilterStore/useFilterStore';
export namespace ApiGetLocationTypes {
    export type ResponseData = FiltersLocation[];

    export type RequestData = {
        features: {
            id: string;
            type: string;
            place_type: string[];
            text: string;
            place_name: string;
            bbox: [number, number, number, number];
            center: [number, number];
            relevance: number;
            properties: {
                accuracy: string;
                mapbox_id: string;
            };
        }[];
    };

    export type Error = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: any;
    };
}
