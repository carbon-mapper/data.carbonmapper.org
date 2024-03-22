import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useShowScenes } from '@/store/useCoverageStore/useCoverageStore';
import { useSetIsPageLoaded } from '@/store/useGlobalStore/useGlobalStore';
import { useMapSlice, defaultBounds } from '@/store/useMapSlice/useMapSlice';
import { useUnboundedSources } from '@/hooks/useSourceData';
import { sourceConfig, getLayerConfig } from '@/components/organisms/Map/Map.layers';
import { useInitializeMap } from '@/components/organisms/Map/hooks/useInitializeMap';
import { setMapSourceData } from '@/components/organisms/Map/hooks/useSetMapSourceData';
import { addSources, addLayers } from '../Map.utils';
import { useCoverage } from './useCoverage';

// TODO: clean up?

export const useMapMainFeatures = (
    wrapperRef: React.MutableRefObject<HTMLDivElement | null>,
    mapRef: React.MutableRefObject<mapboxgl.Map | null>
) => {
    const setMap = useMapSlice(state => state.setMap);
    const styleName = useMapSlice(state => state.styleName);
    const setStyleName = useMapSlice(state => state.setStyleName);
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);
    const setIsMapLoaded = useMapSlice(state => state.setIsMapLoaded);

    const showScenes = useShowScenes();
    const setIsPageLoaded = useSetIsPageLoaded();

    /*
     * Get map instance
     */
    const map = mapRef.current;

    // Get the unbounded sources so that the map can show data as the user pans the map
    const { data: sources } = useUnboundedSources();

    /*
     * Initialize map
     */
    useInitializeMap({
        wrapperRef,
        mapRef,
        setMap,
        bounds: defaultBounds,
        minZoom: 1,
        renderWorldCopies: true,
        hash: true
    });

    // Initial Load
    useEffect(() => {
        if (map == null) return;

        // Can setup all event handlers here
        map.once('load', () => {
            const layers = getLayerConfig(sourceConfig, map.getStyle().name ?? '');

            // Do we actually need to update sources and layers on style change?
            addSources(sourceConfig, map);
            addLayers(layers, map);

            // set map loaded state
            setIsMapLoaded(true);
        });

        map.on('styledata', () => setStyleName(map.getStyle().name ?? '')); // Could improve

        // I guess we could also return a function to remove the event listener
    }, [map, setIsMapLoaded, setStyleName]);

    // Style change handler - changing the style removes source, layers, and data
    // Need to readd
    // This could be why sources disappear on hot reload
    // Doesn't mapbox just have an event for this?
    useEffect(() => {
        if (isMapLoaded && styleName && map) {
            const layers = getLayerConfig(sourceConfig, styleName);
            addSources(sourceConfig, map);
            addLayers(layers, map);

            if (sources) {
                setMapSourceData(map, sourceConfig.main.id, sources);
                setMapSourceData(map, sourceConfig.dense.id, sources);
                setMapSourceData(map, sourceConfig.data.id, sources);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, styleName, isMapLoaded]); // leaving out filteredSourceData

    // Data change handler
    useEffect(() => {
        if (isMapLoaded && map && sources) {
            setMapSourceData(map, sourceConfig.main.id, sources);
            setMapSourceData(map, sourceConfig.dense.id, sources);
            setMapSourceData(map, sourceConfig.data.id, sources);
        }
    }, [map, sources, isMapLoaded]);

    /*
     * Attach event listener to scene layer to retrieve coverage data
     */
    useCoverage({ map: mapRef.current, isActive: showScenes });

    // Would love to remove this
    useEffect(() => {
        isMapLoaded && sources && setIsPageLoaded(true);
    }, [isMapLoaded, sources, setIsPageLoaded]);
};
