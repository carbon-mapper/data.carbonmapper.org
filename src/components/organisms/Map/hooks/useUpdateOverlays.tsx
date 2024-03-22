import { useEffect } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { API_BASE_URL } from '@/utils/config';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';

export const useUpdateOverlays = () => {
    const map = useMapSlice(state => state.map);
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);
    const styleName = useMapSlice(state => state.styleName);

    const activeOverlay = useMapLayersSlice(state => state.activeOverlay);
    const overlayOpacity = useMapLayersSlice(state => state.overlayOpacity);

    const setActiveOverlay = useMapLayersSlice(state => state.setActiveOverlay);
    const setOverlayOpacity = useMapLayersSlice(state => state.setOverlayOpacity);

    const activeSceneId = useSourceDetailsSlice(state => {
        if (state.activePlume === null) return undefined;
        if (typeof state.activePlume === 'string') return undefined;

        return state.activePlume.sceneID;
    });
    const [{ details: currentSourceId }] = usePortalQueryParams();

    // What's up with all of this?
    useEffect(() => {
        if (activeOverlay) {
            if (!map || !isMapLoaded || !activeSceneId) return;

            const isSourceCo2 = currentSourceId ? currentSourceId.includes('CO2') : false; // BAND-AID
            const layerName = activeOverlay === 'rgb' ? 'rgb' : isSourceCo2 ? 'co2' : 'ch4';
            // TODO: types
            (map.getSource('raster-source') as any).setTiles([
                `${API_BASE_URL}/layers/scene/${activeSceneId}/${layerName}/{z}/{x}/{y}.png`
            ]);
            map.getLayer('raster-layer') && map.getLayer('road-label') && map.moveLayer('raster-layer', 'road-label');
            map.getLayer('raster-layer') &&
                map.getLayer('contour-label-X') &&
                map.moveLayer('raster-layer', 'contour-label-X');
            map.getLayer('raster-layer') && map.setLayoutProperty('raster-layer', 'visibility', 'visible');
            map.getLayer('raster-layer') && map.setPaintProperty('raster-layer', 'raster-opacity', overlayOpacity);
        } else {
            if (!map || !isMapLoaded) return;
            map.getLayer('raster-layer') && map.setLayoutProperty('raster-layer', 'visibility', 'none');
        }
    }, [activeOverlay, activeSceneId, map, isMapLoaded, overlayOpacity, currentSourceId]);

    useEffect(() => {
        setActiveOverlay('');
        setOverlayOpacity(1);
    }, [styleName, setActiveOverlay, setOverlayOpacity]);
};
