import { motion, AnimatePresence } from 'framer-motion';
import { useRightPanel, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourcesInView } from '@/hooks/useSourceData';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import CountDisplay from '@/components/atoms/CountDisplay/CountDisplay';
import Icon from '@/components/atoms/Icon/Icon';
import TooltipToggle from '@/components/atoms/TooltipToggle/TooltipToggle';
import BarGraph from '@/components/molecules/BarGraph/BarGraph';
import { calculateSourceStatistics } from '../Map/Map.utils';
import { getAnimationType } from '@/animations/framer';
import styles from './SummaryStatistics.module.scss';

const SummaryStatistics = () => {
    const { data } = useSourcesInView();
    const { bySector, totalEmissions, totalSources, totalUncertainty, totalPlumes } = calculateSourceStatistics(
        data?.features ?? []
    );
    const { setRightPanel } = usePanelActions();
    const shouldRender = useRightPanel() === 'statistics';

    const animation = getAnimationType('top');

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

                    <CountDisplay
                        type={'emission'}
                        count={totalEmissions}
                        uncertainty={totalUncertainty}
                        label={'Point Source Emissions Total (kg CH4/hr)'}
                        bigLabel
                    >
                        <TooltipToggle
                            tooltip={{
                                text: 'Point Source Emissions Total consists of the sum of all individual point source emission rates in the field of view in kilograms per hour.'
                            }}
                        />
                    </CountDisplay>
                    <CountDisplay type={'plumes'} count={totalPlumes} label={'Plumes Detected'} />
                    <div className={styles.separator}></div>
                    <CountDisplay type={'persistent'} count={totalSources} label={'Emission Sources Detected'} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SummaryStatistics;
