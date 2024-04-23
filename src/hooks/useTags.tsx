import { useMemo } from 'react';
import { useAOI, useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import {
    SECTOR_MAP,
    INSTRUMENT_MAP,
    MAX_PERSISTENCE_LIMIT,
    PLUME_QUALITY_MAP,
    PLUME_STATUS_MAP
} from '@/store/useFilterStore/static';
import { type FiltersLocation, type FiltersDate, type FiltersTagItem } from '@/store/useFilterStore/useFilterStore';
import { useLocation } from '@/utils/geocoding';
import { dateParam2Dates, toggleArrayValues, type Params, usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { useGetSliderDefaults } from '@/components/organisms/Map/hooks/useGetSliderDefaults';
import { useCloseSourceDetailsHandler } from '@/components/organisms/SourceDetails/useCloseSourceDetails';
import { trackSearchSubmitEvent } from './useGTM';

export type FilterTags = {
    params: Params;
    hasAoi: boolean;
};
// Return type needs to be JSX[] so this can't be a component :/
export const useFilterTags = ({ params, hasAoi }: FilterTags) => {
    const onCloseSourceDetail = useCloseSourceDetailsHandler();

    const { combinedMaxEmissions, combinedMaxPlumes } = useGetSliderDefaults();

    const {
        location: locationParam,
        coordinates,
        date,
        sector,
        instrument,
        emission_max,
        emission_min,
        plume_max,
        plume_min,
        persistence_max,
        persistence_min,
        gasType,
        plume_qualities: plumeQualities,
        plume_status: plumeStatus,
        eps
    } = params;

    const { locationData: locations } = useLocation(locationParam ?? undefined);
    const location = locations.at(0);
    const { date_start, date_end } = dateParam2Dates(date);

    const emissionRateFrom = emission_min ?? 0; // default 0
    const emissionRateTo = emission_max ?? combinedMaxEmissions; // default max
    const plumeCountFrom = plume_min ?? 0; // default 0
    const plumeCountTo = plume_max ?? combinedMaxPlumes; // default max
    const persistenceFrom = persistence_min ?? 0; // default 0
    const persistenceTo = persistence_max ?? MAX_PERSISTENCE_LIMIT; // Always 100

    const { deleteAOI } = useDrawStoreActions();

    // These id's might be different
    const sectorTags = useMemo(() => {
        if (!sector) return [];

        return sector.map(sectorKey => ({
            id: `sector-${sectorKey}`,
            name: SECTOR_MAP[sectorKey as keyof typeof SECTOR_MAP], // could improve
            onClick: () => {
                const newSector = toggleArrayValues(sectorKey, sector);
                onCloseSourceDetail({ sector: newSector }); // could abstract
                trackSearchSubmitEvent('filter_tag_remove_sector', { sector: newSector });
            }
        }));
    }, [sector, onCloseSourceDetail]);

    // These id's might be different
    const instrumentTags = useMemo(() => {
        if (!instrument) return [];

        return instrument.map(instrumentKey => ({
            id: `instrument-${instrumentKey}`,
            name: INSTRUMENT_MAP[instrumentKey as keyof typeof INSTRUMENT_MAP], // could improve
            onClick: () => {
                const newInstrument = toggleArrayValues(instrumentKey, instrument);
                onCloseSourceDetail({ instrument: newInstrument }); // could abstract
                trackSearchSubmitEvent('filter_tag_remove_instrument', { instrument: newInstrument });
            }
        }));
    }, [instrument, onCloseSourceDetail]);

    const plumeQualityTags = useMemo<FiltersTagItem[]>(
        () =>
            plumeQualities.map(plumeQuality => ({
                id: `plume-quality-${plumeQuality}`,
                name: `${PLUME_QUALITY_MAP[plumeQuality as keyof typeof PLUME_QUALITY_MAP]} Quality Plumes`,
                onClick: () => {
                    const newPlumeQualities = toggleArrayValues(plumeQuality, plumeQualities);
                    onCloseSourceDetail({ plume_qualities: newPlumeQualities }); // could abstract
                    trackSearchSubmitEvent('filter_tag_remove_plume_quality', { plume_qualities: newPlumeQualities });
                }
            })),
        [plumeQualities, onCloseSourceDetail]
    );

    const singleTags = useMemo(
        () => ({
            coordinates: getCoordinateTag(coordinates, () => {
                onCloseSourceDetail({ coordinates: null });
                trackSearchSubmitEvent('filter_tag_remove_coordinates', { coordinates: null });
            }),
            location: getLocationTag(location, () => {
                onCloseSourceDetail({ location: null });
                trackSearchSubmitEvent('filter_tag_remove_location', { location: null });
            }),
            date: getDateTag(date_start, date_end, () => {
                onCloseSourceDetail({ date: null });
                trackSearchSubmitEvent('filter_tag_remove_date', { date: null });
            }),
            gasType: getGasTypeTag(gasType, () => {
                onCloseSourceDetail({ gasType: null });
                trackSearchSubmitEvent('filter_tag_remove_gas_type', { gasType: null });
            }),
            emission: getEmissionRateTag(emissionRateFrom, emissionRateTo, combinedMaxEmissions, () => {
                onCloseSourceDetail({ emission_max: null, emission_min: null });
                trackSearchSubmitEvent('filter_tag_remove_emission', { emission_max: null, emission_min: null });
            }),
            plumeCount: getPlumeCountTag(plumeCountFrom, plumeCountTo, combinedMaxPlumes, () => {
                onCloseSourceDetail({ plume_max: null, plume_min: null });
                trackSearchSubmitEvent('filter_tag_remove_plume_count', { plume_max: null, plume_min: null });
            }),
            persistence: getPersistenceTag(persistenceFrom, persistenceTo, MAX_PERSISTENCE_LIMIT, () => {
                onCloseSourceDetail({ persistence_max: null, persistence_min: null });
                trackSearchSubmitEvent('filter_tag_remove_persistence', {
                    persistence_max: null,
                    persistence_min: null
                });
            }),
            plumeStatus: plumeStatus
                ? {
                      id: `plume-status-${plumeStatus}`,
                      name: `${PLUME_STATUS_MAP[plumeStatus as keyof typeof PLUME_STATUS_MAP]} Plumes`,
                      onClick: () => {
                          onCloseSourceDetail({ plume_status: undefined });
                          trackSearchSubmitEvent('filter_tag_remove_plume_status', { plume_status: undefined });
                      }
                  }
                : null,
            aoi: getAOITag(hasAoi, () => {
                trackSearchSubmitEvent('filter_tag_remove_aoi', { aoi: undefined });
                deleteAOI();
            }),
            eps: eps
                ? {
                      id: `eps-${eps}`,
                      name: `${eps}m Plume Distance`,
                      onClick: () => {
                          onCloseSourceDetail({ eps: undefined });
                          trackSearchSubmitEvent('filter_tag_remove_eps', { eps: undefined });
                      }
                  }
                : null
        }),
        [
            coordinates,
            location,
            date_start,
            date_end,
            gasType,
            emissionRateFrom,
            emissionRateTo,
            combinedMaxEmissions,
            plumeCountFrom,
            plumeCountTo,
            combinedMaxPlumes,
            persistenceFrom,
            persistenceTo,
            hasAoi,
            deleteAOI,
            onCloseSourceDetail,
            plumeStatus,
            eps
        ]
    );

    const tags = useMemo(
        () =>
            [
                ...Object.values(singleTags).filter(tag => tag !== null),
                ...sectorTags,
                ...instrumentTags,
                ...plumeQualityTags
            ] as FiltersTagItem[],
        [singleTags, sectorTags, instrumentTags, plumeQualityTags]
    );

    return tags;
};

export const useCurrentFilterTags = () => {
    const [data] = usePortalQueryParams();
    const aoi = useAOI();

    return useFilterTags({ params: data, hasAoi: aoi !== null });
};

function getLocationTag(location: FiltersLocation | undefined, onClick: () => void): FiltersTagItem | null {
    if (location === undefined || location.name === null) return null;

    return {
        id: 'location-tag',
        name: location.name,
        onClick
    };
}

function getCoordinateTag(
    coordinates:
        | {
              lat: number;
              lon: number;
          }
        | null
        | undefined,
    onClick: () => void
): FiltersTagItem | null {
    if (coordinates === undefined || coordinates === null) return null;

    return {
        id: 'coordinates-tag',
        name: `Lat: ${coordinates.lat}, Lon: ${coordinates.lon}`,
        onClick
    };
}

function getDateTag(date_start: FiltersDate, date_end: FiltersDate, onClick: () => void): FiltersTagItem | null {
    if (!date_start && !date_end) return null;

    if (!date_start) {
        return {
            id: 'date-tag',
            name: `Until ${date_end?.display}`,
            onClick
        };
    }

    if (!date_end) {
        return {
            id: 'date-tag',
            name: `From ${date_start?.display}`,
            onClick
        };
    }

    return {
        id: 'date-tag',
        name: `${date_start?.display} - ${date_end?.display}`,
        onClick
    };
}

function getGasTypeTag(gasType: string | null | undefined, onClick: () => void): FiltersTagItem | null {
    if (gasType === undefined || gasType === null) return null;

    return {
        id: 'gas-type-tag',
        name: `Gas Type: ${gasType}`,
        onClick
    };
}

function getEmissionRateTag(from: number, to: number, max: number, onClick: () => void): FiltersTagItem | null {
    if (from === 0 && to === max) return null;

    return {
        id: 'emission-rate-tag',
        name: `Emission Rate: ${from} - ${to}`,
        onClick
    };
}

function getPlumeCountTag(from: number, to: number, max: number, onClick: () => void): FiltersTagItem | null {
    if (from === 0 && to === max) return null;

    return {
        id: 'plume-count-tag',
        name: `Number of Plumes: ${from} - ${to}`,
        onClick
    };
}

function getPersistenceTag(from: number, to: number, max: number, onClick: () => void): FiltersTagItem | null {
    if (from === 0 && to === max) return null;

    return {
        id: 'persistence-tag',
        name: `Persistence: ${from} - ${to}%`,
        onClick
    };
}

function getAOITag(hasAoi: boolean, onClick: () => void): FiltersTagItem | null {
    if (!hasAoi) return null;

    return {
        id: 'aoi-tag',
        name: 'Area of Interest',
        onClick
    };
}
