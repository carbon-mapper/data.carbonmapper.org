import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useAOI } from '@/store/useDrawStore/useDrawStore';
import { useRightPanel, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { trackSearchImpressionEvent } from '@/hooks/useGTM';
import { useSourcesInView } from '@/hooks/useSourceData';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import CountDisplay, { EmissionsDisplay } from '@/components/atoms/CountDisplay/CountDisplay';
import Icon from '@/components/atoms/Icon/Icon';
import TooltipToggle from '@/components/atoms/TooltipToggle/TooltipToggle';
import BarGraph from '@/components/molecules/BarGraph/BarGraph';
import { calculateSourceStatistics } from '../Map/Map.utils';
import { getAnimationType } from '@/animations/framer';
import styles from './SummaryStatistics.module.scss';

const SummaryStatistics = () => {
    const { data, isLoading } = useSourcesInView();
    const { bySector, totalEmissions, totalSources, totalUncertainty, totalPlumes } = calculateSourceStatistics(
        data?.features ?? []
    );
    const { setRightPanel } = usePanelActions();
    const shouldRender = useRightPanel() === 'statistics';

    const animation = getAnimationType('top');

    const [params] = usePortalQueryParams();
    const { mainMap: map } = useMap();
    const aoi = useAOI();

    /**
     * Tracking Search Impression event - when filters get applied
     * Depentent on isLoading and data - to make sure the event is not
     * dispatched before data arrives and that totalPlumes and totalSources
     * are calculated before tracking the event.
     * Non exhaustive deps:
     * - map: not relevant in this context
     * - totalPlumes: not a filter
     * - totalSources: not a filter
     * - coordinates: not a filter
     */
    const {
        date,
        emission_max,
        emission_min,
        gasType,
        instrument,
        location,
        persistence_max,
        persistence_min,
        plume_max,
        plume_min,
        plume_qualities,
        plume_status,
        sector
    } = params;

    useEffect(() => {
        if (!map || !data || isLoading) return;

        trackSearchImpressionEvent(totalPlumes, totalSources, map, {
            ...params,
            aoi: !!aoi
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isLoading,
        aoi,
        date,
        emission_max,
        emission_min,
        gasType,
        instrument,
        location,
        persistence_max,
        persistence_min,
        plume_max,
        plume_min,
        plume_qualities,
        plume_status,
        sector
    ]);

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div className={styles.container} {...animation} data-testid='summary-statistics'>
                    <div className={styles.heading}>
                        <h2>Methane Summary Statistics in Current View</h2>
                        <Icon icon='experimental' />
                    </div>
                    <Button
                        ariaLabel='Close Summary Statistics'
                        className={styles.closer}
                        onClick={() => setRightPanel(null)}
                    >
                        <Icon icon={'closer'} />
                    </Button>

                    <BarGraph bySector={bySector} />

                    <EmissionsDisplay
                        count={totalEmissions}
                        uncertainty={totalUncertainty}
                        labelPrefix='Point Source Emissions Total'
                        gas='CH4'
                        bigLabel
                    >
                        <TooltipToggle
                            // Do we need to change this text??
                            tooltip={{
                                text: 'Point Source Emissions Total consists of the sum of all individual \
                                point source emission rates in the field of view in kilograms per hour.'
                            }}
                        />
                    </EmissionsDisplay>
                    <CountDisplay type={'plumes'} count={totalPlumes} label={'Plumes Detected'} />
                    <div className={styles.separator}></div>
                    <CountDisplay type={'persistent'} count={totalSources} label={'Emission Sources Detected'} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SummaryStatistics;
