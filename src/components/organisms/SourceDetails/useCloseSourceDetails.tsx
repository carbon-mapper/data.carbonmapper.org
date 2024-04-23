import { useCallback, useEffect, useState } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { isNullOrUndefined } from '@/utils/globals';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';

// This handler suffers from a race condition where `detail` url param is still undefined on next render
// when all the other setStates in this handler have taken effect
// Right now, this doesn't cause any issues, but it may in the future
export const useOpenSourceDetailsHandler = () => {
    const { setRightPanel, setOverlay, setLeftPanel } = usePanelActions();
    const setHoveredPlumeId = useSourceDetailsSlice(state => state.setHoveredPlumeId);
    const [, setParams] = usePortalQueryParams();

    return useCallback((sourceName: string) => {
        setLeftPanel(null);
        setParams({ details: sourceName });
        setRightPanel(null); // source details is based on the details url param
        setOverlay(null);
        setHoveredPlumeId(null);
    }, []); // No deps array, this was causing constant re-renders.....
};

export const useCloseSourceDetailsHandler = () => {
    const [, setParams] = usePortalQueryParams();

    return useCallback(
        (filterUpdates?: Parameters<typeof setParams>[0]) => {
            // This is necessary because calling setParams twice in quick succession causes
            // a race condition and the first invocation will not apply
            setParams({ ...filterUpdates, details: undefined });
        },
        [setParams]
    );
};

// Sets other state after the source detail is closed and the url is changed to reflect this
// Currently used as a workaround for setParams and other setState being race conditions
// Really need to figure out how to fix this
export const useHandleSourceDetailClose = () => {
    const [{ details: currentSourceId }] = usePortalQueryParams();
    const [hasMounted, setHasMounted] = useState(false);

    const { setRightPanel } = usePanelActions();

    const setOverlayOpacity = useMapLayersSlice(state => state.setOverlayOpacity);
    const setActiveOverlay = useMapLayersSlice(state => state.setActiveOverlay);
    const setHoveredPlumeId = useSourceDetailsSlice(state => state.setHoveredPlumeId);
    const setActivePlume = useSourceDetailsSlice(state => state.setActivePlume);

    useEffect(() => {
        setHasMounted(true);
        if (!isNullOrUndefined(currentSourceId) || hasMounted === false) return;
        setActivePlume(undefined);
        setRightPanel(null);
        setActiveOverlay('');
        setHoveredPlumeId(null);
        setOverlayOpacity();
    }, [currentSourceId, setActivePlume, setActiveOverlay, setHoveredPlumeId, setOverlayOpacity, setRightPanel]); // leaving out hasMounted
};
