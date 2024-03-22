import useSWRImmutable from 'swr/immutable';
import { useMemo } from 'react';
import { useIsLoggedIn } from '@/store/useAccountStore/useAccountStore';
import { useAOI } from '@/store/useDrawStore/useDrawStore';
import { MAX_PERSISTENCE_LIMIT } from '@/store/useFilterStore/static';
import { useIsExperimentalSources } from '@/store/useGlobalStore/useGlobalStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { getAccessToken } from '@/utils/auth';
import { datesToStacDatetime } from '@/utils/globals';
import { httpGet } from '@/utils/httpClient';
import { getSelectedGases, getSelectedSectorKeys, usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { MapTypes } from '@/components/organisms/Map/Map.types';
import { getFeaturesInsideAOI } from '@/components/organisms/Map/hooks/useAOIListeners';
import { useGetSliderDefaults } from '@/components/organisms/Map/hooks/useGetSliderDefaults';

// Everything below can be refactored better

// Only a subset of what is actually supported
// This is why we need to share types between the client and server
interface SourceGeoJSONQueryParameters {
    instruments?: string[];
    qualities?: string[];
    datetime?: string;
    source_name?: string;
    status?: string;
}

const API_ENDPOINT = '/catalog/sources.geojson';
const EXPERIMENTAL_API_ENDPOINT = '/catalog/experimental/sources.geojson';

export const useSourceDataFetch = (params?: SourceGeoJSONQueryParameters) => {
    const isLoggedIn = useIsLoggedIn();
    const token = getAccessToken();
    const userGroupParams = { isLoggedIn, token };

    const isExperimentalSources = useIsExperimentalSources();
    const url = isExperimentalSources ? EXPERIMENTAL_API_ENDPOINT : API_ENDPOINT;

    const { data, error, isLoading } = useSWRImmutable<MapTypes.SourceData>(
        { url, ...userGroupParams, ...params },
        httpGet
    );

    return {
        data,
        isError: error,
        isLoading
    };
};

export const useAPIFilteredSourceData = () => {
    // These seem to "come in late" on url reload. Needs further investigation
    const [{ date, instrument, plume_status, plume_qualities }] = usePortalQueryParams();
    const startDate = date?.date_start?.date ?? null;
    const endDate = date?.date_end?.date ?? null;
    const datetime = datesToStacDatetime([startDate, endDate]);

    // Only pass in "defined" params
    // Results in the same key for `useSWRImmutable` as just useSourceData() if no params are defined
    // Fixes duplicate initial page load requests
    // Should be refactored to work another way in the future

    const params: SourceGeoJSONQueryParameters = {};
    if (instrument.length > 0) params.instruments = instrument;
    if (plume_status) params.status = plume_status;
    if (plume_qualities.length > 0) params.qualities = plume_qualities;
    if (datetime) params.datetime = datetime;

    return useSourceDataFetch(params);
};

// should be removed at some point
export const useGetSourceBySourceNameFromGeojson = (sourceName: string | null | undefined) => {
    const { data } = useAPIFilteredSourceData();

    if (data === undefined || sourceName === null || sourceName === undefined) return undefined;
    return data.features.find(feature => feature.properties.source_name === sourceName);
};

const emissionsFilter = (source: MapTypes.MapboxFeature, min: number, max: number) => {
    // Current behavior is have null emissions sources to behave like 0 emissions sources
    // When min emission > 0, they become filtered out
    const emission = source.properties.emission_auto ?? 0;

    return emission >= min && emission <= max;
};

const persistenceFilter = (source: MapTypes.MapboxFeature, min: number, max: number) => {
    // Current behavior is have null persistence sources to behave like 0 persistence sources
    // When min persistence > 0, they become filtered out
    const persistence = source.properties.persistence ?? 0;

    return persistence >= min && persistence <= max;
};

const filterByMapBounds = (bounds: mapboxgl.LngLatBounds | null, sources: MapTypes.MapboxFeature[]) => {
    if (!bounds) return sources;

    const filteredSources = sources.filter(source => {
        const coordinates = source.geometry.coordinates;
        return bounds.contains(coordinates);
    });

    return filteredSources;
};

const useFrontendFilteredSourceData = (
    sourceCollection: MapTypes.SourceData | undefined
): MapTypes.SourceData | undefined => {
    const [{ gasType, emission_min, emission_max, plume_min, plume_max, persistence_min, persistence_max, sector }] =
        usePortalQueryParams();
    const { combinedMaxEmissions, combinedMaxPlumes } = useGetSliderDefaults();
    const aoi = useAOI(); // There are multiple functions with this name. Fix this

    return useMemo(() => {
        if (!sourceCollection) return undefined;
        const sources = sourceCollection.features;

        const selectedGases = getSelectedGases(gasType);
        const selectedSectors = getSelectedSectorKeys(sector);

        // Duplicated code. DRY up
        const emissionRateFrom = emission_min ?? 0; // default 0
        const emissionRateTo = emission_max ?? combinedMaxEmissions; // default max
        const plumeCountFrom = plume_min ?? 0; // default 0
        const plumeCountTo = plume_max ?? combinedMaxPlumes; // default max
        const persistenceFrom = (persistence_min ?? 0) / 100; // default 0
        const persistenceTo = (persistence_max ?? MAX_PERSISTENCE_LIMIT) / 100; // default max

        const filteredSources = sources.filter(
            source =>
                emissionsFilter(source, emissionRateFrom, emissionRateTo) &&
                persistenceFilter(source, persistenceFrom, persistenceTo) &&
                source.properties.plume_count >= plumeCountFrom &&
                source.properties.plume_count <= plumeCountTo &&
                selectedGases.includes(source.properties?.gas) &&
                selectedSectors.includes(source.properties?.sector)
        );
        // Should do this last since it might be the most expensive
        const aoiSources = getFeaturesInsideAOI(aoi, filteredSources);

        return {
            ...sourceCollection,
            features: aoiSources
        };
    }, [
        gasType,
        sector,
        emission_min,
        emission_max,
        plume_min,
        plume_max,
        persistence_min,
        persistence_max,
        aoi,
        sourceCollection,
        combinedMaxEmissions,
        combinedMaxPlumes
    ]);
};

const useMapBoundsFilteredSourceData = (
    sourceCollection: MapTypes.SourceData | undefined
): MapTypes.SourceData | undefined => {
    const bounds = useMapSlice(state => state.bounds);

    if (!sourceCollection) return undefined;
    const sources = sourceCollection.features;
    const boundedSources = filterByMapBounds(bounds, sources);

    return {
        ...sourceCollection,
        features: boundedSources
    };
};

// For every component this is in,
// We re-run the following calculations on the api source data
// And we re-run it every time bounds or filters change (more often in fact)
// All this computing may slow down the app
// If it does, the best thing to do would be to run these calculations at the top level
// And pass this data down to the components that need it
// It could be put into global state, but it's not actually new state
// It is just a transformation of the existing state
export const useSourcesInView = () => {
    const { data, isError, isLoading } = useAPIFilteredSourceData();
    const allInViewSources = useMapBoundsFilteredSourceData(data);
    const filteredInViewSources = useFrontendFilteredSourceData(allInViewSources);

    return {
        data: filteredInViewSources,
        isError,
        isLoading
    };
};

// Sources that have all filters applied except map bounds
export const useUnboundedSources = () => {
    const { data, isError, isLoading } = useAPIFilteredSourceData();
    const frontendFilteredData = useFrontendFilteredSourceData(data);

    return {
        data: frontendFilteredData,
        isError,
        isLoading
    };
};
