import { useEffect } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';

export const useUpdatePlumesVisibility = () => {
    const map = useMapSlice(state => state.map);
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);

    const plumesOpacity = useMapLayersSlice(state => state.plumesOpacity);

    const activePlumeLayerId = useSourceDetailsSlice(state => {
        if (state.activePlume === null) return undefined;
        if (typeof state.activePlume === 'string') return undefined;

        return state.activePlume.layerID;
    });

    useEffect(() => {
        if (!map || !isMapLoaded) return;

        const plumeLayers = map.getStyle().layers.filter(layer => layer.id.includes('plume-'));

        plumeLayers.forEach(({ id }) => {
            map.getLayer(id) && map.setPaintProperty(id, 'raster-opacity', 0);
        });

        activePlumeLayerId &&
            map.getLayer(activePlumeLayerId) &&
            map.setPaintProperty(activePlumeLayerId, 'raster-opacity', plumesOpacity);

        const measureToolLayers = map.getStyle().layers.filter(layer => layer.id.includes('gl-draw'));

        measureToolLayers &&
            measureToolLayers.forEach(({ id }) => {
                map.getLayer(id) && map.moveLayer(id);
            });
    }, [map, isMapLoaded, activePlumeLayerId, plumesOpacity]);
};
