import classNames from 'classnames';
import type { ReactNode } from 'react';
import styles from './FilterFieldset.module.scss';

const FilterFieldset = ({
    children,
    legend,
    small = false
}: {
    children: ReactNode;
    legend: string;
    small?: boolean;
}) => {
    return (
        <fieldset
            className={classNames(styles.fieldset, {
                [styles.small]: small
            })}
        >
            <legend className='sr-only'>{legend}</legend>
            {children}
        </fieldset>
    );
};

export default FilterFieldset;
