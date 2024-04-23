import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/LinkWithTracking/LinkWithTracking';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './ApiEndpoints.module.scss';

const ApiEndpoints = ({ onClose }: { onClose: () => void }) => {
    const { setView } = useAccountActions();
    const { setLeftPanel } = usePanelActions();

    return (
        <Modal className={styles.container} isDarkBg size='s' title='API Endpoints' animation='popup' onClose={onClose}>
            <div className={styles.wrapper}>
                <p>Access the following publicly available API links for use within your own applications.</p>
                <Link
                    href='https://api.carbonmapper.org/api/v1/docs#/Public/catalog_api_plume_plume_csv'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='Plume CSV'
                >
                    <span>Plume CSV</span>
                    <Icon icon='hyperlink' />
                </Link>
                <Link
                    href='https://api.carbonmapper.org/api/v1/docs#/Public/catalog_api_source_sources_geojson'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='Sources GeoJSON'
                >
                    <span>Sources GeoJSON</span>
                    <Icon icon='hyperlink' />
                </Link>
                <Link
                    href='https://api.carbonmapper.org/api/v1/docs#/Public/layers_api_raster_scene_tile'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='Gas Overlays'
                >
                    <span>Gas Overlays</span>
                    <Icon icon='hyperlink' />
                </Link>
                <Link
                    href='https://api.carbonmapper.org/api/v1/docs#/Public/layers_api_raster_scene_tile'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='RGB Overlays'
                >
                    <span>RGB Overlays</span>
                    <Icon icon='hyperlink' />
                </Link>
                <span style={{ paddingTop: '14px', display: 'block', fontWeight: '400' }}>
                    To validate the API, please{' '}
                    <button
                        onClick={() => {
                            onClose();
                            setLeftPanel('account');
                            setView('register');
                        }}
                        style={{ color: 'rgb(62, 140, 240)' }}
                    >
                        register for an account.
                    </button>
                </span>
            </div>
        </Modal>
    );
};

export default withPortal(ApiEndpoints);
