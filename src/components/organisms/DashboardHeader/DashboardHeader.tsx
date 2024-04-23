import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { AOIControls } from '@/components/atoms/AOIControls/AOIControls';
import DashboardCounter from '@/components/atoms/DashboardCounter/DashboardCounter';
import Logo from '@/components/atoms/Logo/Logo';
import DashboardLivesearch from '@/components/molecules/DashboardLivesearch/DashboardLivesearch';
import DashboardFilterTags from '../DashboardFilterTags/DashboardFilterTags';
import styles from './DashboardHeader.module.scss';

const DashboardHeader = () => {
    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';

    return (
        <div className={styles.header}>
            <DashboardLivesearch />
            <AOIControls />
            <DashboardFilterTags />
            <DashboardCounter />
            <Logo isGradientExtended={isDetailsOpen} />
        </div>
    );
};

export default DashboardHeader;
