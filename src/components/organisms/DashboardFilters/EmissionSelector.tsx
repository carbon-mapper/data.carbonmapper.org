import {
    EmissionConversion,
    useEmissionConversionType,
    useSetEmissionConversionType
} from '@/store/useGlobalStore/useGlobalStore';
import { EMISSION_CONVERSION_OPTIONS } from '@/utils/converters';
import FilterFieldset from '@/components/atoms/FilterFieldset/FilterFieldset';
import Select from '@/components/atoms/Select/Select';
import withTooltipTextLabel from '@/hoc/withTooltipTextLabel/withTooltipTextLabel';
import styles from './EmissionSelector.module.scss';

const EmissionConversionSelect = withTooltipTextLabel(() => {
    const emissionConversion = useEmissionConversionType();
    const setEmissionConversion = useSetEmissionConversionType();

    // Should apply styles to component instead of just wrapping it
    return (
        <Select
            label=''
            onReverse={() => undefined}
            current={emissionConversion}
            options={EMISSION_CONVERSION_OPTIONS}
            onClick={newType => setEmissionConversion(newType as EmissionConversion)}
            className={styles.selector}
        />
    );
});

export const EmissionConversionSelector = () => (
    <FilterFieldset legend='Select Emission Conversion' small>
        <EmissionConversionSelect
            label={{ name: 'Emission Units', tooltip: 'Choose the units to quantify emissions.' }}
        />
    </FilterFieldset>
);
