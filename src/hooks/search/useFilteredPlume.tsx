import { useEffect, useState } from 'react';
import { FiltersLocation } from '@/store/useFilterStore/useFilterStore';
import { MapTypes } from '@/components/organisms/Map/Map.types';

export const useFilteredPlume = (
    mainSourceData: MapTypes.SourceData | undefined,
    searchInput: string
): FiltersLocation[] | null => {
    const [filteredPlume, setFilteredPlume] = useState<FiltersLocation[] | null>(null);

    useEffect(() => {
        const matchedPlumes: FiltersLocation[] = [];
        if (searchInput.length < 3) {
            return;
        }

        mainSourceData?.features?.forEach(feature => {
            feature.properties.plume_ids.forEach(id => {
                if (id.toLowerCase().includes(searchInput.toLowerCase())) {
                    const plume: FiltersLocation = {
                        name: `${id}`,
                        id: `plume.${id}`,
                        source_id: feature.properties.source_name,
                        center: feature.geometry.coordinates,
                        bbox: null
                    };
                    matchedPlumes.push(plume);
                }
            });
        });

        setFilteredPlume(matchedPlumes.length > 0 ? matchedPlumes : null);
    }, [mainSourceData, searchInput]);

    return filteredPlume;
};
