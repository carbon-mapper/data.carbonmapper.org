import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useIsLoggedIn, useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { useDrawMode, useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { useIsAccessibility, useSetIsAccessibility } from '@/store/useGlobalStore/useGlobalStore';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import {
    useLeftPanel,
    useRightPanel,
    useOverlay,
    useIsLayersPanelOpen,
    usePanelActions
} from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useFitBounds } from '@/hooks/useMapMovements';
import { DEFAULT_BOUNDS } from '@/utils/globals';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';
import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/LinkWithTracking/LinkWithTracking';
import { type Position as TooltipPosition } from '@/components/atoms/Tooltip/Tooltip';
import LayersPanel from '@/components/molecules/LayersPanel/LayersPanel';
import AccountModal from '@/components/organisms/Account/Account';
import AcknowledgmentsModal from '../Acknowledgments/Acknowledgments';
import DashboardBulkDownload from '../DashboardBulkDownload/DashboardBulkDownload';
import DashboardSavedSearches from '../DashboardSavedSearches/DashboardSavedSearches';
import DataProvidersModal from '../DataProvidersModal/DataProvidersModal';
import styles from './DashboardPanel.module.scss';

/**
 * Left Button Stack:
 * - Saved Searches
 * - Account
 * - Bulk Download
 */

export const SavedSearchesToggle = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const isLoggedIn = useIsLoggedIn();
    const { setView: setAccountView, setMessage } = useAccountActions();

    const leftPanel = useLeftPanel();
    const { setLeftPanel } = usePanelActions();

    function onLoggedInClick() {
        setLeftPanel('searches');
    }

    function onLoggedOutClick() {
        setLeftPanel('account');
        setAccountView('message');
        setMessage({
            title: 'Information',
            lines: [
                {
                    text: 'Please log in to use Saved Searches.',
                    button: {
                        label: 'Login',
                        view: 'login'
                    }
                },
                {
                    text: '...or create an account first.',
                    button: {
                        label: 'Register',
                        view: 'register'
                    }
                }
            ]
        });
    }

    const onClickHandler = isLoggedIn ? onLoggedInClick : onLoggedOutClick;

    return (
        <>
            <ButtonIcon
                icon='folder'
                ariaLabel='Toggle saved searches'
                onClick={onClickHandler}
                options={{
                    active: leftPanel === 'searches'
                }}
                tooltip={{
                    text: 'Saved Searches',
                    position
                }}
            />
            <DashboardSavedSearches
                portalId='modals'
                isOpen={leftPanel === 'searches'}
                onClose={() => setLeftPanel(null)}
            />
        </>
    );
};

export const AccountToggle = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const router = useRouter();
    const isLoggedIn = useIsLoggedIn();
    const leftPanel = useLeftPanel();
    const setLeftPanel = usePanelActions().setLeftPanel;
    const { setView: setAccountView } = useAccountActions();

    return (
        <>
            <ButtonIcon
                icon='user'
                ariaLabel='Toggle my account panel'
                onClick={() => {
                    setLeftPanel('account');
                    setAccountView(isLoggedIn ? 'profile' : 'login');
                }}
                tooltip={{
                    text: 'My Account',
                    position
                }}
            />
            <AccountModal
                portalId='modals'
                isOpen={leftPanel === 'account'}
                onClose={() => {
                    setLeftPanel(null);
                    // TODO: is this necessary?
                    router.push('/');
                }}
            />
        </>
    );
};

export const BulkDownloadToggle = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const isLoggedIn = useIsLoggedIn();
    const leftPanel = useLeftPanel();
    const { setView: setAccountView, setMessage } = useAccountActions();
    const { setLeftPanel } = usePanelActions();

    const onLoggedInClick = () => {
        setLeftPanel('bulk-download');
    };

    const onLoggedOutClick = () => {
        setLeftPanel('account');
        setAccountView('message');
        setMessage({
            title: 'Information',
            lines: [
                {
                    text: 'Please log in to use Bulk Downloads.',
                    button: {
                        label: 'Login',
                        view: 'login'
                    }
                },
                {
                    text: '...or create an account first.',
                    button: {
                        label: 'Register',
                        view: 'register'
                    }
                }
            ]
        });
    };

    const onClickHandler = isLoggedIn ? onLoggedInClick : onLoggedOutClick;

    return (
        <>
            <ButtonIcon
                icon='download'
                ariaLabel='Toggle downloads panel'
                onClick={onClickHandler}
                options={{
                    active: leftPanel === 'bulk-download'
                }}
                tooltip={{
                    text: 'Downloads',
                    position
                }}
            />
            <DashboardBulkDownload
                portalId='modals'
                isOpen={leftPanel === 'bulk-download'}
                onClose={() => setLeftPanel(null)}
            />
        </>
    );
};

/**
 * Top Right Button Stack:
 * - Sources List
 */

export const SourceListToggle = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';
    const rightPanel = useRightPanel();
    const setRightPanel = usePanelActions().setRightPanel;
    const onClick = () => setRightPanel('sources');

    return !isDetailsOpen ? (
        <ButtonIcon
            icon='list'
            ariaLabel='Toggle source list'
            onClick={onClick}
            options={{
                active: rightPanel === 'sources'
            }}
            tooltip={{
                text: 'Sources',
                position
            }}
        />
    ) : null;
};

/*
 * Right Button Stack:
 * - Reset Camera
 * - Zoom In
 * - Zoom Out
 * - Layers Panel
 * - Measure Tool
 */

export const ResetCamera = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const activePlume = useSourceDetailsSlice(state => state.activePlume);
    const fitBounds = useFitBounds();

    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';

    const onClickHandler = () => fitBounds(DEFAULT_BOUNDS);
    const detailsOnClickHandler = () => {
        activePlume?.bounds && fitBounds(activePlume.bounds, { sourceDetailPadding: true });
    };

    const props = {
        global: {
            icon: 'globe',
            ariaLabel: 'Reset map camera to global view',
            onClick: onClickHandler,
            tooltip: {
                text: 'Global View',
                position
            }
        },
        details: {
            icon: 'crosshair',
            ariaLabel: 'Reset map camera to source position', // but it fits plume bounds?
            onClick: detailsOnClickHandler,
            tooltip: {
                text: 'Source Position',
                position
            }
        }
    } as const;

    return <ButtonIcon {...props[isDetailsOpen ? 'details' : 'global']} />;
};

export const ZoomIn = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const { mainMap } = useMap();

    return (
        <ButtonIcon
            cyID='zoom-in'
            icon='plus'
            ariaLabel='Zoom in map camera'
            onClick={() => mainMap?.zoomIn()} // Only zooms in 1 level as opposed to 2
            tooltip={{
                text: 'Zoom in',
                position
            }}
        />
    );
};

export const ZoomOut = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const { mainMap } = useMap();

    return (
        <ButtonIcon
            cyID='zoom-out'
            icon='minus'
            ariaLabel='Zoom out map camera'
            onClick={() => mainMap?.zoomOut()} // Only zooms out 1 level as opposed to 2
            tooltip={{
                text: 'Zoom out',
                position
            }}
        />
    );
};

export const LayersPanelToggle = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const isLayersPanelOpen = useIsLayersPanelOpen();
    const { setIsLayersPanelOpen } = usePanelActions();

    return (
        <>
            <AnimatePresence>{isLayersPanelOpen && <LayersPanel key='layers-panel' />}</AnimatePresence>
            <ButtonIcon
                icon='layers'
                ariaLabel='Toggle layers panel'
                onClick={() => setIsLayersPanelOpen(!isLayersPanelOpen)}
                options={{
                    active: isLayersPanelOpen
                }}
                tooltip={{
                    text: 'Layers Panel',
                    position
                }}
                className='layers-toggle'
            />
        </>
    );
};

export const MeasureToggle = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const { setDrawMode } = useDrawStoreActions();
    const drawMode = useDrawMode();

    const onClick = () => setDrawMode('draw_radius');

    return (
        <ButtonIcon
            icon='measure'
            ariaLabel='Toggle measure tool'
            onClick={onClick}
            options={{
                active: drawMode === 'draw_radius'
            }}
            tooltip={{
                text: 'Measure Tool',
                position
            }}
        />
    );
};

/*
 * Bottom Right Footer:
 * - Attribution
 */

export const Attribution = () => {
    const overlay = useOverlay();
    const { setOverlay } = usePanelActions();

    return (
        <div className={styles.wrapper}>
            <Link
                href='https://carbonmapper.org/terms-of-use/'
                isExternal
                className={styles.text}
                target='_blank'
                rel='noreferrer noopenner'
                trackingTitle='Terms of Use'
            >
                Terms of Use
                <Icon icon='hyperlink' />
            </Link>
            <Link
                className={styles.text}
                href='https://www.carbonmapper.org'
                isExternal
                target='_blank'
                rel='noreferrer noopenner'
                trackingTitle='carbonmapper.org'
            >
                carbonmapper.org
                <Icon icon='hyperlink' />
            </Link>
            <Button onClick={() => setOverlay('data-providers')} className={styles.text}>
                Data Providers
            </Button>
            <Button onClick={() => setOverlay('acknowledgments')} className={styles.text}>
                Acknowledgments
            </Button>
            <DataProvidersModal
                portalId='modals'
                isOpen={overlay === 'data-providers'}
                onClose={() => setOverlay(null)}
            />
            <AcknowledgmentsModal
                portalId='modals'
                isOpen={overlay === 'acknowledgments'}
                onClose={() => setOverlay(null)}
            />
        </div>
    );
};

/*
 * Botom Right Button Stack:
 * - Summary Statistics
 * - How to use it
 * - Accessibility
 */

export const SummaryStatisticsToggle = () => {
    const isOpen = useRightPanel() === 'statistics';
    const { setRightPanel } = usePanelActions();

    return (
        <ButtonBox onClick={() => setRightPanel(isOpen ? null : 'statistics')} small transparent icon='stats'>
            Summary Statistics
        </ButtonBox>
    );
};

export const AccessibilityToggle = () => {
    const activeBasemap = useMapLayersSlice(state => state.activeBasemap);
    const { setActiveBasemap } = useMapLayersSlice();
    const isAccessibility = useIsAccessibility();
    const setIsAccessibility = useSetIsAccessibility();

    const onClickHandler = () => {
        setActiveBasemap(!isAccessibility ? 'accessibility' : 'og');
        setIsAccessibility(!isAccessibility);
    };

    useEffect(() => {
        activeBasemap !== 'accessibility' && setIsAccessibility(false);
    }, [activeBasemap, setIsAccessibility]);

    useEffect(() => {
        document.body.classList.toggle('is-accessibility', isAccessibility);
    }, [isAccessibility]);

    return (
        <ButtonBox
            onClick={onClickHandler}
            small
            transparent
            filled={isAccessibility}
            icon='accessibility'
            ariaLabel={`Turn ${isAccessibility ? 'off' : 'on'} accessibility mode`}
        />
    );
};
