import { useCallback } from 'react';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { CLUSTERING_MAX_ZOOM } from '@/utils/globals';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';

export const useAutoOpenSourceList = () => {
    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';

    const { setRightPanel } = usePanelActions();

    const isUserClosed = useSourceDetailsSlice(state => state.isUserClosed);
    const setIsUserClosed = useSourceDetailsSlice(state => state.setIsUserClosed);

    // toggle source list when clusters unclustered
    // I wonder if it is just better to not automatically open this if overviewActiveElement is set at all
    return useCallback(
        (zoom: number) => {
            if (zoom >= CLUSTERING_MAX_ZOOM && !isDetailsOpen && !isUserClosed) setRightPanel('sources');

            if (zoom < CLUSTERING_MAX_ZOOM && isUserClosed) setIsUserClosed(false);
        },
        [isDetailsOpen, setRightPanel, isUserClosed, setIsUserClosed]
    );
};
