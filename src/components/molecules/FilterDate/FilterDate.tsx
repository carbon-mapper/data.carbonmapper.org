import { GLOBAL_IDS } from '@/utils/globals';
import FilterDateInput from '@/components/atoms/FilterDateInput/FilterDateInput';
import type { FilterDateTypes } from './FilterDate.types';
import styles from './FilterDate.module.scss';

const FilterDate = ({ onClick, date }: FilterDateTypes.Props) => {

    const { start, end } = date;

    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <FilterDateInput
                    label='Date / Range'
                    options={{
                        type: 'start',
                        value: start?.display ?? '',
                        alt: 'select start date',
                        placeholder: 'MM-DD-YYYY',
                        id: GLOBAL_IDS.dashboard.filters.date.start,
                        onIconClick: () => onClick('calendar')
                    }}
                />
            </div>
            <div className={styles.separator}></div>
            <div className={styles.item}>
                <FilterDateInput
                    label='Date / Range'
                    options={{
                        type: 'end',
                        value: end?.display ?? '',
                        alt: 'select start date',
                        placeholder: 'MM-DD-YYYY',
                        id: GLOBAL_IDS.dashboard.filters.date.start,
                        onIconClick: () => onClick('calendar-2nd')
                    }}
                />
            </div>
        </div>
    )
}

export default FilterDate;
