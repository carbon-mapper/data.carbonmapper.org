import classNames from 'classnames';
import { useSourcesInView } from '@/hooks/useSourceData';
import { calculateSourceStatistics } from '@/components/organisms/Map/Map.utils';
import styles from './DashboardCounter.module.scss';

// It should be noted that there is a slight discrepancy with the new and old numbers
// The old numbers were based on rendered features. And features (sources) can still be rendered when their centerpoint is not on the map
// The new numbers are based on filtering the source center-points that are within the map bounds
// So it is different, but also probably more accurate (but perhaps not visually....?)

const DashboardCounter = () => {
    // Could abstract into a different hook. Could also expose error and loading states
    const { data } = useSourcesInView();
    const { totalPlumes, totalSources } = calculateSourceStatistics(data?.features ?? []);

    return (
        <div className={classNames('counter', styles.container)}>
            <div className={styles.item}>
                <span className={styles.count}>{totalPlumes}</span>
                <span className={styles.type}>Plumes</span>
            </div>

            <div className={styles.item}>
                <span className={styles.count}>{totalSources}</span>
                <span className={styles.type}>Sources</span>
            </div>
        </div>
    );
};

export default DashboardCounter;
