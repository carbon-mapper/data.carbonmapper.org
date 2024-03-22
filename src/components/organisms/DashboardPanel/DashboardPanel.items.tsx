import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIsLoggedIn, useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { useIsAccessibility, useSetIsAccessibility } from '@/store/useGlobalStore/useGlobalStore';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice, defaultBounds } from '@/store/useMapSlice/useMapSlice';
import {
    useLeftPanel,
    useRightPanel,
    useOverlay,
    useIsLayersPanelOpen,
    usePanelActions
} from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useSummaryStatisticsSlice } from '@/store/useSummaryStatisticSlice/useSummaryStatisticsSlice';
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
    const leftPanel = useLeftPanel();
    const setLeftPanel = usePanelActions().setLeftPanel;

    return (
        <>
            <ButtonIcon
                icon='download'
                ariaLabel='Toggle downloads panel'
                onClick={() => {
                    setLeftPanel('bulk-download');
                }}
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
    const activePlumeBounds = useSourceDetailsSlice(state => {
        if (state.activePlume === null) return undefined;
        if (typeof state.activePlume === 'string') return undefined;

        return state.activePlume.bounds;
    });
    const map = useMapSlice(state => state.map);
    const fitBounds = useMapSlice(state => state.fitBounds);

    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';

    const onClickHandler = () => map?.fitBounds(defaultBounds);
    const detailsOnClickHandler = () => {
        activePlumeBounds && fitBounds(activePlumeBounds, 'details');
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
            ariaLabel: 'Reset map camera to source position',
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
    const increaseZoom = useMapSlice(state => state.increaseZoom);

    return (
        <ButtonIcon
            cyID='zoom-in'
            icon='plus'
            ariaLabel='Zoom in map camera'
            onClick={() => increaseZoom()}
            tooltip={{
                text: 'Zoom in',
                position
            }}
        />
    );
};

export const ZoomOut = ({ tooltipPosition: position }: { tooltipPosition: TooltipPosition }) => {
    const decreaseZoom = useMapSlice(state => state.decreaseZoom);

    return (
        <ButtonIcon
            cyID='zoom-out'
            icon='minus'
            ariaLabel='Zoom out map camera'
            onClick={() => decreaseZoom()}
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
    const isMeasure = useMapSlice(state => state.isMeasure);
    const setIsMeasure = useMapSlice(state => state.setIsMeasure);
    const isMeasureActive = useMapSlice(state => state.isMeasureActive);
    const setIsMeasureActive = useMapSlice(state => state.setIsMeasureActive);

    const onClick = () => {
        setIsMeasure(!isMeasure);
        setIsMeasureActive(!isMeasureActive);
    };

    return (
        <ButtonIcon
            icon='measure'
            ariaLabel='Toggle measure tool'
            onClick={onClick}
            options={{
                active: isMeasureActive
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
