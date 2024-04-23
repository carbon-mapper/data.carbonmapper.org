import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { GLOBAL_IDS } from '@/utils/globals';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import FilterInput from '@/components/atoms/FilterInput/FilterInput';
import withTooltipTextLabel from '@/hoc/withTooltipTextLabel/withTooltipTextLabel';
import styles from './EpsFilter.module.scss';

// We may want to have this as some sort of user-click-to-set input
// since source.geojson request is expensive
// Consider using react-debounce-input
const MAX_EPS = 1_000; // m
export const EpsInput = withTooltipTextLabel(() => {
    const [{ eps }, setParams] = usePortalQueryParams();
    const [internalValue, setInternalValue] = useState(eps);

    // Update internal state from parent
    // There are better ways to do this
    useEffect(() => {
        if (internalValue !== eps) setInternalValue(eps);
        // Only want to trigger this from parent prop update
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eps]);

    const onChange = useCallback(
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            const parsedValue = value === '' ? undefined : parseInt(value);

            // Allow "" Don't accept non-empty, non-number inputs
            if (parsedValue !== undefined && (isNaN(parsedValue) || parsedValue < 0 || parsedValue >= MAX_EPS)) return;

            setInternalValue(parsedValue);
        },
        [setInternalValue]
    );

    return (
        <div className={styles.container}>
            <FilterInput
                type='text'
                options={{
                    value: internalValue?.toString() ?? '',
                    inputNameTag: 'eps',
                    alt: 'set plume cluster distance in meters',
                    placeholder: 'E.g. 10, 100, 1000 meters',
                    id: GLOBAL_IDS.dashboard.filters.eps,
                    onChange: onChange
                }}
            />
            <ButtonBox
                onClick={() => setParams({ eps: internalValue })}
                outline
                type='submit'
                className={styles.button}
                disabled={internalValue === eps}
            >
                Apply
            </ButtonBox>
        </div>
    );
});
