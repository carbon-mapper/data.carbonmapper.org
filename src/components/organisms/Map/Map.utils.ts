import { toNearestCeil } from '@/utils/math.utils';
import type { MapTypes } from './Map.types';

export const calculateSourceStatistics = (features: MapTypes.SourceData['features']): MapTypes.SourceStatistics => {
    const sourceStatistics = features.reduce(
        (acc, current) => {
            const emission =
                current.properties && 'emission_auto' in current.properties
                    ? Math.round(current.properties.emission_auto || 0)
                    : 0;
            const uncertainty =
                current.properties && 'emission_uncertainty_auto' in current.properties
                    ? Math.round(current.properties.emission_uncertainty_auto || 0)
                    : 0;
            const plumeCount =
                current.properties && 'plume_count' in current.properties ? current.properties.plume_count : 0;
            const persistentSource = plumeCount > 1;
            const sector = current.properties && 'sector' in current.properties ? current.properties.sector : '';
            // @ts-ignore
            const newSectorEmission = sector ? acc.bySector[sector] + emission : null;

            return {
                totalEmissions: acc.totalEmissions + emission,
                totalUncertainty: acc.totalUncertainty + uncertainty,
                totalPlumes: acc.totalPlumes + plumeCount,
                totalSources: acc.totalSources + 1,
                totalPersistentSources: persistentSource ? acc.totalPersistentSources + 1 : acc.totalPersistentSources,
                bySector: sector ? { ...acc.bySector, [sector]: newSectorEmission } : acc.bySector
            };
        },
        {
            totalEmissions: 0,
            totalUncertainty: 0,
            totalPlumes: 0,
            totalSources: 0,
            totalPersistentSources: 0,
            bySector: {
                '1A1': 0,
                '1B1a': 0,
                '1B2': 0,
                '4B': 0,
                '6A': 0,
                '6B': 0,
                NA: 0,
                other: 0
            }
        }
    );

    return sourceStatistics;
};

export const gatherFilterRanges = (features: MapTypes.MapboxFeature[], gas: 'CH4' | 'CO2') => {
    const filteredSources = features.filter(({ properties }) => properties.gas === gas);
    const emissions = filteredSources.map(
        ({ properties }) => ('emission_auto' in properties && properties.emission_auto) || 0
    );
    const plumes = filteredSources.map(
        ({ properties }) => ('plume_count' in properties && properties.plume_count) || 0
    );
    const maxEmissions = Math.max(...emissions, 0);
    const maxPlumes = Math.max(...plumes, 0);
    const maxEmissionsRounded = maxEmissions > 0 ? toNearestCeil(maxEmissions, 100) : 0;
    const maxPlumesRounded = maxPlumes > 0 ? toNearestCeil(maxPlumes, 5) : 0;

    return {
        maxEmissions: maxEmissionsRounded,
        maxPlumes: maxPlumesRounded
    };
};
