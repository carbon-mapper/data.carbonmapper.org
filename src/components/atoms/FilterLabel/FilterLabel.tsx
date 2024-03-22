import { memo } from 'react';
import type { FilterLabelTypes } from './FilterLabel.types';
import styles from './FilterLabel.module.scss';

const FilterLabel = ({ children }: FilterLabelTypes.Props) => {

    return (
        <span className={styles.label}>
            {children}
        </span>
    )
}

export default memo(FilterLabel);