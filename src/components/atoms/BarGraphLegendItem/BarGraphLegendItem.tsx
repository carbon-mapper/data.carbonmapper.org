import classNames from 'classnames';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import type { BarGraphLegendItemTypes } from './BarGraphLegendItem.types';
import styles from './BarGraphLegendItem.module.scss';

const BarGraphLegendItem = ({
    children,
    colorClassName,
    isDisabled,
    activeSector,
    setActiveSector
}: BarGraphLegendItemTypes.Props) => {
    return (
        <li
            className={classNames(styles.item, {
                [styles.isActive]: activeSector === colorClassName,
                [styles.isDisabled]: isDisabled
            })}
            data-bar-graph-legend-item
        >
            <Button
                ariaLabel={`Set active sector on the bar chart: ${colorClassName}`}
                onClick={() => setActiveSector(colorClassName)}
            />
            <div className={classNames(styles.color, colorClassName)}>
                <span className={styles.dot} />
            </div>
            <span className={styles.text}>{children}</span>
        </li>
    );
};

export default BarGraphLegendItem;
