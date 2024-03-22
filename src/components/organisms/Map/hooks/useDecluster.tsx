import { useCallback, useEffect } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { usePlumeImageDictionary } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { addMapRasterSource } from '@/components/atoms/MapMarkers/MapMarkers.utils';
import { sourceConfig, getLayerConfig } from '@/components/organisms/Map/Map.layers';
import { getLatestPlumeFromSourceFeature } from '@/components/organisms/SourceDetails/SourceDetails.utils';
import { useOpenSourceDetailsHandler } from '../../SourceDetails/useCloseSourceDetails';

// This shouldn't be a hook
// Should just be a function that runs when the slider is moved
// Usage of hooks should be reserved for when they are necessary
export const useDecluster = () => {
    const showClusters = useMapLayersSlice(state => state.showClusters);
    const map = useMapSlice(state => state.map);
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);
    const styleName = useMapSlice(state => state.styleName);
    const fitBounds = useMapSlice(state => state.fitBounds);
    const opacity = useMapLayersSlice(state => state.plumesOpacity);
    const onOpenSourceDetail = useOpenSourceDetailsHandler();
    const { setLeftPanel } = usePanelActions();

    const plumeImageDict = usePlumeImageDictionary();

    //
    const { setHoveredPlumeId, setActivePlume } = useSourceDetailsSlice(state => ({
        setHoveredPlumeId: state.setHoveredPlumeId,
        setActivePlume: state.setActivePlume
    }));

    // These should be the same exact handlers that are used for the MapMarkers
    // We are repeating code unnecessarily

    const onClickHandler = useCallback(
        (event: mapboxgl.MapLayerMouseEvent) => {
            if (!map) return;
            // For some reason, I am not seeing features attached to this event
            // Possibly something to do with the circle styles or layers but i don't think its worth investigating
            // Here's a workaround
            const features = map.queryRenderedFeatures(event.point, { layers: ['data-layer'] });
            const feature = (features || [])[0];
            if (feature === undefined) return;

            const latestPlumeId = getLatestPlumeFromSourceFeature(feature);
            const sourceName = feature?.properties?.source_name;

            if (sourceName === undefined) return;

            const defaultSourcePlume = latestPlumeId && plumeImageDict[latestPlumeId];

            // Same handler as SourceListItem
            setHoveredPlumeId(null);
            // TODO: merge - commenting this out for now
            // setSourceTrigger('map_click');
            setLeftPanel(null);
            onOpenSourceDetail(sourceName);

            if (defaultSourcePlume !== undefined && typeof defaultSourcePlume !== 'string' && latestPlumeId) {
                // Different fit than clicking on the plume in the source plume list....but that is current prod behavior too
                fitBounds(defaultSourcePlume.bounds, 'details');

                const defaultActivePlume = {
                    id: defaultSourcePlume.id,
                    layerID: `plume-${defaultSourcePlume.id}`,
                    coordinates: defaultSourcePlume.coordinates,
                    sceneID: defaultSourcePlume.sceneId,
                    bounds: defaultSourcePlume.bounds
                };
                setActivePlume(defaultActivePlume);

                const plumeImageObject = {
                    plumeBounds: defaultSourcePlume.bounds,
                    plumeUrl: defaultSourcePlume.url,
                    plumeId: defaultSourcePlume.id
                };
                addMapRasterSource(map, plumeImageObject, { opacity });
            } else {
                // For smoother UX purposes we could try to zoom to the source here
                // Only necessary if the plume data didn't load yet which is rare
            }
        },
        [map, opacity, fitBounds, onOpenSourceDetail, setHoveredPlumeId, setActivePlume, plumeImageDict, setLeftPanel]
    );

    // Do i need to do other things here?
    // Lets just give it a go
    const onMouseEnterHandler = useCallback(
        (event: mapboxgl.MapLayerMouseEvent) => {
            if (map) map.getCanvas().style.cursor = 'pointer';

            const feature = (event.features || [])[0];
            if (feature === undefined) return;

            const latestPlumeId = getLatestPlumeFromSourceFeature(feature);

            latestPlumeId && setHoveredPlumeId(latestPlumeId);
        },
        [setHoveredPlumeId, map]
    );

    const onMouseLeaveHandler = useCallback(() => {
        if (map) map.getCanvas().style.cursor = '';

        setHoveredPlumeId(null);
    }, [setHoveredPlumeId, map]);

    /*
     * Add / Remove event listeners, change layer visibility depending on
     * showClusters value
     */

    useEffect(() => {
        if (!map || !isMapLoaded) return;

        const layers = getLayerConfig(sourceConfig, map?.getStyle().name ?? '');

        if (showClusters === false) {
            map.setLayoutProperty(layers.main.id, 'visibility', 'none');
            map.setLayoutProperty(layers.dense.id, 'visibility', 'none');
            map.setPaintProperty(layers.data.id, 'circle-opacity', 1);
            map.setPaintProperty(layers.data.id, 'circle-stroke-opacity', 1);
            map.setPaintProperty(layers.decor.id, 'circle-stroke-opacity', 1);
            map.setPaintProperty(layers.decor.id, 'circle-opacity', 1);

            map.on('mouseenter', layers.data.id, onMouseEnterHandler);
            map.on('mouseleave', layers.data.id, onMouseLeaveHandler);
            map.on('click', layers.data.id, onClickHandler);
        } else {
            map.setLayoutProperty(layers.main.id, 'visibility', 'visible');
            map.setLayoutProperty(layers.dense.id, 'visibility', 'visible');
            map.setPaintProperty(layers.data.id, 'circle-opacity', 0);
            map.setPaintProperty(layers.data.id, 'circle-stroke-opacity', 0);
            map.setPaintProperty(layers.decor.id, 'circle-opacity', 0);
            map.setPaintProperty(layers.decor.id, 'circle-stroke-opacity', 0);

            map.off('mouseenter', layers.data.id, onMouseEnterHandler);
            map.off('mouseleave', layers.data.id, onMouseLeaveHandler);
            map.off('click', layers.data.id, onClickHandler);
        }

        /*
         * Clean up the event listeners
         */

        return () => {
            map.off('mouseenter', layers.data.id, onMouseEnterHandler);
            map.off('mouseleave', layers.data.id, onMouseLeaveHandler);
            map.off('click', layers.data.id, onClickHandler);
        };
    }, [showClusters, styleName, map, isMapLoaded, onMouseEnterHandler, onMouseLeaveHandler, onClickHandler]);
};
