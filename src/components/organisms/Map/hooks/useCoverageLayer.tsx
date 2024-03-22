import { useEffect } from 'react';
import { useShowScenes } from '@/store/useCoverageStore/useCoverageStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';

export function useCoverageLayer() {
    /*
     * Show/hide scenes and scenes outline layer
     */

    const showScenes = useShowScenes();
    const map = useMapSlice(state => state.map);
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);
    const styleName = useMapSlice(state => state.styleName);

    // styleName is required cuz when style is changed, the layers are removed
    // And when the layers are re-added, the visibility is reset
    // This could be refactored
    useEffect(() => {
        if (!map || !isMapLoaded) return;

        // Shouldn't need this...
        if (!map.getLayer('scenes-layer') || !map.getLayer('scenes-outline-layer')) return;

        map.getLayer('scenes-layer') && showScenes
            ? map.setLayoutProperty('scenes-layer', 'visibility', 'visible')
            : map.setLayoutProperty('scenes-layer', 'visibility', 'none');

        map.getLayer('scenes-outline-layer') && showScenes
            ? map.setLayoutProperty('scenes-outline-layer', 'visibility', 'visible')
            : map.setLayoutProperty('scenes-outline-layer', 'visibility', 'none');
    }, [map, isMapLoaded, showScenes, styleName]);
}
