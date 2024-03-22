import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import Icon from '../Icon/Icon';
import styles from './HeatmapLegend.module.scss';

const unit = 'ppm-m';

const HeatmapLegend = () => {
    const [{ details }] = usePortalQueryParams();
    const isCO2 = details?.slice(0, 3) === 'CO2';

    const legendNumbers = {
        min: 0,
        max: Intl.NumberFormat('en-US', {
            notation: 'compact'
        }).format(isCO2 ? 100000 : 6000)
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <p>{legendNumbers.max}+</p>
                <Icon icon={isCO2 ? 'legend-gradient-co2' : 'legend-gradient'} />
                <p>{legendNumbers.min}</p>
            </div>
            <div className={styles.unit}>
                <p>{unit}</p>
            </div>
        </div>
    );
};

export default HeatmapLegend;
