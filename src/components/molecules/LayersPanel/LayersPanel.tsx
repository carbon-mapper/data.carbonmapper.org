import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useShowScenes, useCoverageStoreActions } from '@/store/useCoverageStore/useCoverageStore';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { trackEvent } from '@/hooks/useGTM';
import { useOutsideClickHandler } from '@/hooks/useOutsideClickHandler';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import {
    LayersPanelItem,
    LayersPanelRangeItem,
    LayersPanelItemWithRangeInput,
    LayersPanelToggleItem
} from '@/components/atoms/LayersPanelItem/LayersPanelItem';
import { getAnimationType } from '@/animations/framer';
import styles from './LayersPanel.module.scss';

type Item = {
    name: string;
    alt: string;
};

type ImageType = {
    label: string;
    type: 'image';
    items: Item[] | undefined;
    state: string;
    handler: (name: string) => void;
    canDisable?: boolean;
};

type RangeType = {
    label: string;
    type: 'range';
    items: undefined;
    state: number;
    handler: (value: number) => void;
    endHandler: (value: number) => void;
};

type ImageWithRangeType = {
    label: string;
    type: 'image';
    items: Item[] | undefined;
    withRangeInput: true;
    state: string;
    handler: (name: string) => void;
    rangeState: number;
    rangeHandler: (value: number) => void;
    endHandler: (value: number) => void;
    canDisable?: boolean;
};

type ToggleType = {
    label: string;
    children?: React.ReactNode;
    type: 'toggle';
    items: undefined;
    state: boolean;
    handler: (value: boolean) => void;
};

const LayersPanel = () => {
    const [animCompleted, setAnimCompleted] = useState(false);
    const [, setEndOpacityOverlay] = useState(0);
    const [endPlumeOpacity, setEndPlumeOpacity] = useState(0);
    const layerPanelRef = useRef<HTMLDivElement>(null);
    const { setIsLayersPanelOpen } = usePanelActions();
    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';
    const animation = getAnimationType('left');

    const { setActiveBasemap, setPlumesOpacity, setActiveOverlay, setOverlayOpacity, setShowClusters } =
        useMapLayersSlice(state => ({
            setActiveBasemap: state.setActiveBasemap,
            setPlumesOpacity: state.setPlumesOpacity,
            setActiveOverlay: state.setActiveOverlay,
            setOverlayOpacity: state.setOverlayOpacity,
            setShowClusters: state.setShowClusters
        }));

    const basemaps = useMapLayersSlice(state => state.basemaps);
    const activeBasemap = useMapLayersSlice(state => state.activeBasemap);

    const plumesOpacity = useMapLayersSlice(state => state.plumesOpacity);

    const overlays = useMapLayersSlice(state => state.overlays);
    const activeOverlay = useMapLayersSlice(state => state.activeOverlay);
    const overlayOpacity = useMapLayersSlice(state => state.overlayOpacity);

    const showScenes = useShowScenes();
    const setShowScenes = useCoverageStoreActions().setShowScenes;

    const showClusters = useMapLayersSlice(state => state.showClusters);

    // TODO: check missing deps! revisit
    // These effects should just happen in the in the click handler.....refactor
    useEffect(() => {
        document.body.classList.toggle('is-satellite', activeBasemap === 'satellite');
    }, [activeBasemap]);

    // tracking
    useEffect(() => {
        if (!animCompleted) {
            return;
        }
        trackEvent({
            event: 'layer_panel',
            event_name: 'layer_panel_change',
            layerCategory: 'Basemap',
            // TODO: this breaks og -> a11y switching?
            layerValue: basemaps.filter(item => item.name === activeBasemap)[0]?.alt || ''
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBasemap]);

    useEffect(() => {
        if (!animCompleted) {
            return;
        }
        trackEvent({
            event: 'layer_panel',
            event_name: 'layer_panel_change',
            layerCategory: 'Plumes Opacity',
            layerValue: `Opacity: ${endPlumeOpacity}`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endPlumeOpacity]);

    useEffect(() => {
        if (!animCompleted) {
            return;
        }
        trackEvent({
            event: 'layer_panel',
            event_name: 'layer_panel_change',
            layerCategory: 'Coverage',
            layerValue: `Visibility: ${showScenes ? 'On' : 'Off'}`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showScenes]);

    useEffect(() => {
        if (!animCompleted) {
            return;
        }
        trackEvent({
            event: 'layer_panel',
            event_name: 'layer_panel_change',
            layerCategory: 'Clusters',
            layerValue: `Visibility: ${showClusters ? 'On' : 'Off'}`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showClusters]);

    const doesNotContainLayerToggle = (target: EventTarget | null): boolean =>
        !((target as HTMLElement)?.classList.contains('layers-toggle') ?? false);
    const doesNotContainLayerToggleParent = (target: EventTarget | null): boolean =>
        !((target as HTMLElement)?.parentElement?.classList.contains('layers-toggle') ?? false);

    useOutsideClickHandler(layerPanelRef, () => setIsLayersPanelOpen(false), [
        doesNotContainLayerToggle,
        doesNotContainLayerToggleParent
    ]);

    const basemapItem: ImageType = {
        label: 'basemap',
        type: 'image',
        items: basemaps,
        state: activeBasemap,
        handler: setActiveBasemap as (name: string) => void
    };

    const plumeOpacityItem: RangeType = {
        label: 'plumes opacity',
        type: 'range',
        items: undefined,
        state: plumesOpacity,
        handler: setPlumesOpacity,
        endHandler: setEndPlumeOpacity // should be able to call trackEvent directly here
    };

    const overlaysItem: ImageWithRangeType = {
        label: 'overlays',
        type: 'image',
        items: overlays,
        withRangeInput: true,
        state: activeOverlay,
        handler: setActiveOverlay as (name: string) => void,
        rangeState: overlayOpacity,
        rangeHandler: setOverlayOpacity,
        endHandler: setEndOpacityOverlay,
        canDisable: true
    };

    const coverageItem: ToggleType = {
        label: 'coverage',
        children: 'coverage',
        type: 'toggle',
        items: undefined,
        state: showScenes,
        handler: setShowScenes
    };

    const clusterItem: ToggleType = {
        label: 'clusters',
        children: 'Clusters',
        type: 'toggle',
        items: undefined,
        state: showClusters,
        handler: setShowClusters
    };

    const detailsViewItems = [basemapItem, plumeOpacityItem, overlaysItem, coverageItem, clusterItem];
    const defaultViewItems = [basemapItem, plumeOpacityItem, coverageItem, clusterItem];

    const panelItems = isDetailsOpen ? detailsViewItems : defaultViewItems;

    return (
        <motion.div
            ref={layerPanelRef}
            className={styles.container}
            {...animation}
            onAnimationComplete={() => setAnimCompleted(true)}
            onAnimationStart={() => setAnimCompleted(false)}
        >
            {panelItems.map(item => {
                const { items, label, type, state, handler } = item;
                const withRangeInput = 'withRangeInput' in item && item.withRangeInput;
                const rangeState = 'rangeState' in item && item.rangeState;
                const rangeHandler = 'rangeHandler' in item && item.rangeHandler;
                const endHandler = 'endHandler' in item && item.endHandler;
                const canDisable = 'canDisable' in item || false;

                switch (type) {
                    case 'image':
                        return withRangeInput ? (
                            <LayersPanelItemWithRangeInput
                                key={label}
                                label={label}
                                items={items}
                                state={state}
                                handler={handler}
                                rangeState={rangeState as ImageWithRangeType['rangeState']}
                                rangeHandler={rangeHandler as ImageWithRangeType['rangeHandler']}
                                endHandler={endHandler as ImageWithRangeType['endHandler']}
                                canDisable={canDisable}
                            />
                        ) : (
                            <LayersPanelItem
                                key={label}
                                label={label}
                                items={items}
                                state={state}
                                handler={handler}
                                canDisable={canDisable}
                            />
                        );
                    case 'toggle':
                        return (
                            <LayersPanelToggleItem key={label} label={label} state={state} handler={handler}>
                                Visibility
                            </LayersPanelToggleItem>
                        );
                    case 'range':
                        return (
                            <LayersPanelRangeItem
                                key={label}
                                label={label}
                                state={state}
                                handler={handler}
                                endHandler={endHandler as (value: number) => void}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </motion.div>
    );
};

export default LayersPanel;
