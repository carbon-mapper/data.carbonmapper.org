import { useCallback, useEffect } from 'react';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';

// Consider using a debounced onMoveEndHandler like in platform so the user can make multiple zooms or pans without triggering this
export const useMapBoundsTracker = () => {
    const map = useMapSlice(state => state.map);
    const setBounds = useMapSlice(state => state.setBounds);

    const setMapBoundsHandler = useCallback(() => {
        if (!map) return;
        setBounds(map.getBounds());
    }, [setBounds, map]);

    useEffect(() => {
        if (!map) return;
        map.on('moveend', setMapBoundsHandler);
        map.on('load', setMapBoundsHandler);

        return () => {
            map.off('moveend', setMapBoundsHandler);
            map.off('load', setMapBoundsHandler);
        };
    }, [map, setMapBoundsHandler]);
};
