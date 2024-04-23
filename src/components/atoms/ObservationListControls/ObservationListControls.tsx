import type { SortAction, SortOption } from '@/components/molecules/ObservationList/ObservationList';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { trackEvent } from '@/hooks/useGTM';
import Icon from '@/components/atoms/Icon/Icon';
import Select from '@/components/atoms/Select/Select';
import styles from './ObservationListControls.module.scss';

interface Props {
    sorting: SortOption;
    isReversed?: boolean;
    setSorting: ({ type, newData }: SortAction) => void;
}

const selectItems = [
    {
        value: 'time-desc',
        label: 'Acquired Date'
    },
    {
        value: 'time-published-desc',
        label: 'Published Date'
    },
    {
        value: 'emission-desc',
        label: 'Emission Rate'
    }
] as const;

const ObservationListControls = ({ sorting, isReversed = false, setSorting }: Props) => {
    const { includeNullDetects, setIncludeNullDetects } = useSourceDetailsSlice();

    return (
        <form className={styles.container}>
            <Select
                label='Sort by'
                options={selectItems}
                current={sorting}
                onClick={value => {
                    trackEvent({
                        event: 'plume',
                        event_name: 'plume_sort',
                        sortType: selectItems.find(item => item.value === value)?.label,
                        sortOrder: isReversed ? 'DESC' : 'ASC'
                    });

                    setSorting({ type: value as SortOption });
                }}
                isReversed={isReversed}
                onReverse={() => {
                    setSorting({ type: 'reverse' });
                    trackEvent({
                        event: 'plume',
                        event_name: 'plume_sort',
                        sortType: selectItems.find(item => item.value === sorting)?.label,
                        sortOrder: isReversed ? 'DESC' : 'ASC'
                    });
                }}
            />
            <label
                style={{
                    gridArea: 'null-detects'
                }}
                className={styles['null-detects']}
            >
                Include Null Detects
                <input
                    type='checkbox'
                    onChange={() => setIncludeNullDetects(!includeNullDetects)}
                    checked={includeNullDetects}
                    className='sr-only'
                />
                <Icon icon='checkbox' />
            </label>
        </form>
    );
};

export default ObservationListControls;
