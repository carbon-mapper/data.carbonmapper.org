import { useEffect, useState } from 'react';
import { FiltersLocation } from '@/store/useFilterStore/useFilterStore';
import { MapTypes } from '@/components/organisms/Map/Map.types';

export const useFilteredSource = (
    mainSourceData: MapTypes.SourceData | undefined,
    searchInput: string
): FiltersLocation[] | null => {
    const [filteredSource, setFilteredSource] = useState<FiltersLocation[] | null>(null);

    useEffect(() => {
        const matchedSources: FiltersLocation[] = [];
        if (searchInput.length < 3) {
            return;
        }

        mainSourceData?.features?.forEach(feature => {
            const { source_name: sourceName } = feature.properties;
            const formatedSourceName = sourceName.split('?')[0];
            if (formatedSourceName.toLowerCase().includes(searchInput.toLowerCase())) {
                const Source: FiltersLocation = {
                    name: `${formatedSourceName}`,
                    id: `source.${formatedSourceName}`,
                    source_id: feature.properties.source_name,
                    center: feature.geometry.coordinates,
                    bbox: null
                };
                matchedSources.push(Source);
            }
        });

        setFilteredSource(matchedSources.length > 0 ? matchedSources : null);
    }, [mainSourceData, searchInput]);

    return filteredSource;
};
