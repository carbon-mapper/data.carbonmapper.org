import { useCallback } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useTrackedPortalQueryParams } from '@/hooks/useTrackedPortalQueryParams';

export const useOpenSourceDetailsHandler = () => {
    const { setRightPanel, setOverlay } = usePanelActions();
    const setHoveredPlumeId = useSourceDetailsSlice(state => state.setHoveredPlumeId);
    const [, setParams] = useTrackedPortalQueryParams();

    return useCallback((sourceName: string) => {
        setParams({ details: sourceName });
        setRightPanel(null);
        setOverlay(null);
        setHoveredPlumeId(null);
    }, []); // No deps array, this was causing constant re-renders.....
};

export const useCloseSourceDetailsHandler = () => {
    const { setRightPanel } = usePanelActions();

    const setOverlayOpacity = useMapLayersSlice(state => state.setOverlayOpacity);
    const setActiveOverlay = useMapLayersSlice(state => state.setActiveOverlay);
    const setHoveredPlumeId = useSourceDetailsSlice(state => state.setHoveredPlumeId);
    const setActivePlume = useSourceDetailsSlice(state => state.setActivePlume);
    const [, setParams] = useTrackedPortalQueryParams();

    return useCallback(
        (filterUpdates?: Parameters<typeof setParams>[0]) => {
            setRightPanel(null);
            setActiveOverlay('');
            setActivePlume(null);
            setHoveredPlumeId(null);
            // This is necessary because calling setParams twice in quick succession causes
            // a race condition and the first invocation will not apply
            setParams({ ...filterUpdates, details: undefined });
            setOverlayOpacity();
        },
        [setActivePlume, setHoveredPlumeId, setActiveOverlay, setOverlayOpacity, setParams, setRightPanel]
    );
};
