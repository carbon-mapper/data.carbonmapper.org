import useSWR from 'swr';
import { externalHttpGet } from '@/utils/httpClient';
import { SECRETS } from '@/utils/secrets';

export interface GeocodingCountryFeature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
        mapbox_id: string;
        short_code: string;
        wikidata: string;
    };
    text: string;
    place_name: string;
    bbox: [number, number, number, number];
    center: [number, number];
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    context: {
        id: string;
        wikidata: string;
        text: string;
        short_code: string;
    }[];
}

interface GeocodingCountryResponse {
    attribution: string;
    features: GeocodingCountryFeature[];
    query: string[];
    type: 'FeatureCollection';
}

export interface GeocodingCountry {
    bbox: [number, number, number, number];
    short_code: string;
}

export const useCountryData = (coords: [number, number]) => {
    // proximity ?

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.join(
        ','
    )}.json?types=country&limit=1&language=en&access_token=${SECRETS.MAPBOX_TOKEN}`;

    const { data, error: isError, isLoading } = useSWR<GeocodingCountryResponse>(coords ? url : null, externalHttpGet);

    const geocodingItems = data?.features.map(({ bbox, properties: { short_code } }) => ({
        // exclude alaska from united states bbox
        bbox: short_code === 'us' ? [-130, 26, -64, 45] : bbox,
        short_code
    }));

    // const geocodingItems = data?.features.map(({ bbox, properties: { short_code } }) => ({ bbox, short_code }));

    return {
        data: geocodingItems as GeocodingCountry[] | undefined,
        isError,
        isLoading
    };
};
