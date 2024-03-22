import classNames from 'classnames';
import { ReactNode } from 'react';
import { customCoupledNotation } from '@/utils/math.utils';
import styles from './CountDisplay.module.scss';

type Props = {
    isLoading?: boolean;
    children?: ReactNode;
    count: number;
    nonZero?: boolean;
    label: ReactNode;
    bigLabel?: boolean;
    percentage?: boolean;
    type?: 'emission' | 'plumes' | 'persistent';
    uncertainty?: number;
    className?: string;
};

const CountDisplay = ({
    isLoading = false,
    children,
    count,
    nonZero,
    label,
    bigLabel,
    percentage,
    type,
    uncertainty = 0,
    className
}: Props) => {
    const containerClass = classNames(
        styles.container,
        {
            [styles.emission]: type === 'emission',
            [styles.plumes]: type === 'plumes',
            [styles.persistent]: type === 'persistent',
            [styles['is-loading']]: isLoading
        },
        className
    );

    const { count: countFormatted, uncertainty: uncertaintyFormatted } = customCoupledNotation(count, uncertainty);

    return (
        <div className={containerClass}>
            {isLoading ? (
                <p className={styles.count}>...</p>
            ) : (
                <p className={styles.count}>
                    {percentage ? (
                        <span>
                            {nonZero && !count ? 'N/A' : count}
                            <sub>%</sub>
                        </span>
                    ) : (
                        <span>{nonZero && !count ? 'N/A' : countFormatted}</span>
                    )}
                    {uncertainty && uncertainty > 0 ? <sub>+/- {uncertaintyFormatted}</sub> : null}
                </p>
            )}
            <p
                className={classNames(styles.label, {
                    [styles.big]: bigLabel
                })}
            >
                {label}
                {/* tooltip */}
                {children}
            </p>
        </div>
    );
};

export default CountDisplay;
