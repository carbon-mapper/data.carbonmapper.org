import HeatmapLegend from '@/components/atoms/HeatmapLegend/HeatmapLegend';
import TermsOfUsePrompt from '@/components/atoms/TermsOfUsePrompt/TermsOfUsePrompt';
import { ButtonStack } from '@/components/molecules/ButtonStack/ButtonStack';
import DashboardPanelItem from '@/components/molecules/DashboardPanelItem/DashboardPanelItem';
import SceneList from '@/components/molecules/SceneList/SceneList';
import Sources from '../Sources/Sources';
import SummaryStatistics from '../SummaryStatistics/SummaryStatistics';
import {
    SummaryStatisticsToggle,
    ResetCamera,
    ZoomIn,
    ZoomOut,
    Attribution,
    AccountToggle,
    SavedSearchesToggle,
    SourceListToggle,
    LayersPanelToggle,
    AccessibilityToggle,
    BulkDownloadToggle,
    MeasureToggle
} from './DashboardPanel.items';
import styles from './DashboardPanel.module.scss';

const DashboardPanel = () => {
    return (
        <div className={styles.panel}>
            {/** Left */}
            <DashboardPanelItem position='left' direction='column' gap='small'>
                <AccountToggle tooltipPosition='right' />
                <SavedSearchesToggle tooltipPosition='right' />
                <BulkDownloadToggle tooltipPosition='right' />
            </DashboardPanelItem>

            {/** Bottom left  */}
            <DashboardPanelItem position='bottom-left' direction='row' gap='big' isDetailsViewOnly>
                <HeatmapLegend />
            </DashboardPanelItem>

            {/** Top right */}
            <DashboardPanelItem position='top-right'>
                <SourceListToggle tooltipPosition='left' />
            </DashboardPanelItem>

            {/** Right */}
            <DashboardPanelItem position='right' gap='small' direction='column' isOffsetInDetailsView>
                <ResetCamera tooltipPosition='left' />
                <ZoomIn tooltipPosition='left' />
                <ZoomOut tooltipPosition='left' />
                <LayersPanelToggle tooltipPosition='left' />
                <MeasureToggle tooltipPosition='left' />
            </DashboardPanelItem>

            {/** Bottom right  */}
            <DashboardPanelItem position='bottom-right' direction='row' gap='big' isHiddenInDetailsView>
                <SummaryStatisticsToggle />
                <AccessibilityToggle />
                <ButtonStack />
            </DashboardPanelItem>

            {/** Bottom  */}
            <DashboardPanelItem position='bottom' direction='row'>
                <Attribution />
            </DashboardPanelItem>

            {/** Other elements  */}
            <SceneList />
            <Sources />
            <SummaryStatistics />
            <TermsOfUsePrompt />
        </div>
    );
};

export default DashboardPanel;
