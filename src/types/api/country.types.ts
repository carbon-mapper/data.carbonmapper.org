
export namespace ApiGetCountryTypes {

    export type ResponseData = {
        bbox: [number, number, number, number];
        short_code: string;
    }[]

    export type RequestData = {
        features: {
            id: string;
            type: string;
            place_type: string[];
            text: string;
            place_name: string;
            bbox: [number, number, number, number]
            center: [number, number];
            relevance: number;
            properties: {
                short_code: string;
                mapbox_id: string;
            }
        }[]
    }

    export type Error = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: any;
    }

}
