import { useAPIFilteredSourceData } from '@/hooks/useSourceData';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { gatherFilterRanges } from '@/components/organisms/Map/Map.utils';

// Slider defaults are dependent on selected gas type
// But they are not dependent on other filters set by the user
export const useGetSliderDefaults = () => {
    const { data } = useAPIFilteredSourceData();
    const [{ gasType }] = usePortalQueryParams();

    const { maxEmissions: ch4MaxEmissions, maxPlumes: ch4MaxPlumes } = gatherFilterRanges(data?.features ?? [], 'CH4');
    const { maxEmissions: co2MaxEmissions, maxPlumes: co2MaxPlumes } = gatherFilterRanges(data?.features ?? [], 'CO2');

    let combinedMaxEmissions;
    let combinedMaxPlumes;

    if (gasType === 'CH4') {
        combinedMaxEmissions = ch4MaxEmissions;
        combinedMaxPlumes = ch4MaxPlumes;
    } else if (gasType === 'CO2') {
        combinedMaxEmissions = co2MaxEmissions;
        combinedMaxPlumes = co2MaxPlumes;
    } else {
        combinedMaxEmissions = Math.max(ch4MaxEmissions, co2MaxEmissions);
        combinedMaxPlumes = Math.max(ch4MaxPlumes, co2MaxPlumes);
    }

    return {
        ch4MaxEmissions,
        ch4MaxPlumes,
        co2MaxEmissions,
        co2MaxPlumes,
        combinedMaxEmissions,
        combinedMaxPlumes
    };
};
