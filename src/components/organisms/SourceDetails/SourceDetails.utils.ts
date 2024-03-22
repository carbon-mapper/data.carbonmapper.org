import { SourceDataTypes } from '@/types/api/source.types';
import { MapboxGeoJSONFeature } from 'mapbox-gl';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { externalHttpGet } from '@/utils/httpClient';
import { SECRETS } from '@/utils/secrets';
import { SourceDetailsTypes } from '@/components/organisms/SourceDetails/SourceDetails.types';

// Should see where this is used
export const useLocationData = (coordinates: [longitude: number, latitude: number] | null) => {
    const { data, error, isLoading } = useSWR(
        coordinates
            ? `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?types=place&types=region&language=en&access_token=${SECRETS.MAPBOX_TOKEN}`
            : null,
        externalHttpGet
    );

    return {
        locationData: data,
        isError: error,
        isLoading
    };
};

const getDataFromFeatureContext = (feature: SourceDetailsTypes.LocationFeature) => {
    const { context } = feature;

    const district = context.find(({ id }) => id.includes('district')) || null;
    const region = context.find(({ id }) => id.includes('region')) || null;
    const country = context.find(({ id }) => id.includes('country')) || null;

    return [district, country, region];
};

const getNamesFromContext = (context: (SourceDetailsTypes.LocationContext | null)[]) =>
    context.map(contextItem => contextItem?.text_en || 'N/A');

// TODO: refactor this to a regular function
export const useLocationDetails = (locationData: SourceDetailsTypes.LocationData | null, isLoading: boolean) => {
    const [city, setCity] = useState<string | null>(null);
    const [district, setDistrict] = useState<string | null>(null);
    const [region, setRegion] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);

    useEffect(() => {
        if (isLoading) return;

        if (!locationData || !locationData.features.length) {
            setCity('N/A');
            setDistrict('N/A');
            setRegion('N/A');
            setCountry('N/A');
            return;
        }

        const [feature] = locationData.features;
        const { text_en: cityName } = feature;

        const contextItems = getDataFromFeatureContext(feature);
        const [districtName, countryName, regionName] = getNamesFromContext(contextItems);

        const shortCountryName = countryName === 'United States' ? 'US' : countryName;

        setCity(cityName);
        setDistrict(districtName);
        setRegion(regionName);
        setCountry(shortCountryName);
    }, [locationData, isLoading]);

    return {
        city,
        district,
        region,
        country
    };
};

// Why are we doing all of this data munging?
export const useDetailsData = (data: SourceDataTypes.Data | null | undefined) => {
    if (!data)
        return {
            point: null,
            plumes: null,
            scenes: null,
            sourceInfo: null
        };

    const { source_name, source, plumes, point, scenes } = data;
    const { gas, sector, persistence, emission_auto, emission_uncertainty_auto } = source;
    const name = source_name.slice(0, source_name.indexOf('?'));

    return {
        point,
        plumes,
        scenes,
        sourceInfo: {
            name,
            gas: gas,
            sector: sector,
            emissions: emission_auto,
            uncertainty: emission_uncertainty_auto,
            persistence
        }
    };
};

// Plume timestamps are plume[3:18] - we could also use a regex to be more safe....
// emi20231205t074315p05043-A
// GAO20200715t163629p0000-H
// ang20221024t180037-A
export const getLatestPlumeFromPlumeIds = (plumeIds: string[]) =>
    [...plumeIds].sort((a, b) => (a.slice(3, 18) > b.slice(3, 18) ? -1 : 1)).at(0);

export const getLatestPlumeFromPlumes = <T>(plumes: T[], getter: (o: T) => string) =>
    [...plumes].sort((a, b) => (getter(a) > getter(b) ? -1 : 1)).at(0);

export const getLatestPlumeFromSourceFeature = (sourceFeature: MapboxGeoJSONFeature) => {
    const plumeIds: string[] = sourceFeature.properties?.plume_ids
        ? JSON.parse(sourceFeature.properties.plume_ids)
        : [];

    return getLatestPlumeFromPlumeIds(plumeIds);
};
