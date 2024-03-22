import { useEffect } from 'react';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { sourceConfig } from '../Map.layers';

const clusterMaxZoom = sourceConfig.main.options?.clusterMaxZoom;
const thesholdZoom = clusterMaxZoom ? clusterMaxZoom + 1 : 12;

export const useOpenSourceListAtZoomLevel = () => {
    const map = useMapSlice(state => state.map);
    const mapZoom = map?.getZoom();

    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';

    const { setRightPanel } = usePanelActions();

    const isUserClosed = useSourceDetailsSlice(state => state.isUserClosed);
    const setIsUserClosed = useSourceDetailsSlice(state => state.setIsUserClosed);

    // toggle source list when clusters unclustered
    // I wonder if it is just better to not automatically open this if overviewActiveElement is set at all
    useEffect(() => {
        if (mapZoom === undefined) return;
        if (mapZoom >= thesholdZoom && !isDetailsOpen && !isUserClosed) {
            setRightPanel('sources');

            if (mapZoom < thesholdZoom && isUserClosed) {
                setIsUserClosed(false);
            }
        }
    }, [mapZoom, isDetailsOpen, setRightPanel, isUserClosed, setIsUserClosed]);
};
