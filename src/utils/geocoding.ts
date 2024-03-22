import { ApiGetCountryTypes } from '@/types/api/country.types';
import useSWRImmutable from 'swr/immutable';
import { useState } from 'react';
import type { ApiGetLocationTypes } from '@/types/api/location.types';
import { SECRETS } from '@/utils/secrets';
import { externalHttpGet } from './httpClient';

// maybe we want this endpoint to do direct lookups
// const url = https://api.mapbox.com/search/searchbox/v1/retrieve/{id}

// ToDo: Consider creating a single location lookup
export const useLocation = (
    name: string | undefined
): { locationData: ApiGetLocationTypes.ResponseData; isError: boolean; isLoading: boolean } => {
    // If name is undefined or empty string we should not be making a request
    const url =
        name === undefined || name === ''
            ? null // disables the request
            : `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?limit=5&access_token=${SECRETS.MAPBOX_TOKEN}`;

    // Immutable since response doesn't change
    const { error, isLoading, data } = useSWRImmutable<ApiGetLocationTypes.RequestData>(url, externalHttpGet);

    // Warning, new references, should improve
    const locationData = (data?.features ?? [])
        .map(({ bbox, center, place_name, id }) => {
            const nameFormated = place_name.replace(', United States', ', US');

            const separatedWithComma = name ? (name as string).split(',') : [];
            const isWithComma = separatedWithComma.length === 2;
            let centerUpdated = center;
            let centerBbox: [number, number, number, number] | null = bbox;
            // check if input is coordinate, and use it intead of Mapbox place center
            if (isWithComma) {
                const isNumbers = !!parseFloat(separatedWithComma[0]) && !!parseFloat(separatedWithComma[1]);
                if (isNumbers) {
                    centerUpdated = [parseFloat(separatedWithComma[0]), parseFloat(separatedWithComma[1])];
                    centerBbox = null;
                }
            }

            return {
                id,
                bbox: centerBbox,
                center: centerUpdated,
                name: nameFormated
            };
        })
        .filter(({ center, bbox }) => center || bbox);

    return {
        locationData,
        isError: error,
        isLoading
    };
};

export const useCountryData = (
    coords: [number, number]
): { data: ApiGetCountryTypes.ResponseData; isError: boolean; isLoading: boolean } => {
    const [data, setData] = useState<ApiGetCountryTypes.ResponseData>([]);

    // If name is undefined or empty string we should not be making a request
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.join(
        ','
    )}.json?limit=1&types=country&language=en&access_token=${SECRETS.MAPBOX_TOKEN}`;

    // I think we can do this since the response should not really change
    const { error, isLoading } = useSWRImmutable<ApiGetCountryTypes.RequestData>(url, externalHttpGet, {
        onSuccess: ({ features }) =>
            setData(
                features.map(({ bbox, properties: { short_code } }) => ({
                    // exclude alaska from united states bbox
                    bbox: short_code === 'us' ? [-128.00165, 25.396308, -66.93457, 49.345786] : bbox,
                    short_code
                }))
            )
    });

    return {
        data,
        isError: error,
        isLoading
    };
};
