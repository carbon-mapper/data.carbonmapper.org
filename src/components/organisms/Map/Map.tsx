import { useRef } from 'react';
import { useHoveredPlumeImage, useSourceImages } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { MapMarkers } from '@/components/atoms/MapMarkers/MapMarkers';
import { useKeyboardControls } from '@/components/organisms/Map/hooks/useKeyboardControls';
import { useMapBoundsTracker } from '@/components/organisms/Map/hooks/useMapBoundsTracker';
import { useAOIListeners } from './hooks/useAOIListeners';
import { useAreaMeasure } from './hooks/useAreaMeasure';
import { useCoverageLayer } from './hooks/useCoverageLayer';
import { useDecluster } from './hooks/useDecluster';
import { useDraw } from './hooks/useDraw';
import { useMapMainFeatures } from './hooks/useMapMainFeatures';
import { useOpenSourceListAtZoomLevel } from './hooks/useOpenSourceListAtZoomLevel';
import { useSceneList } from './hooks/useSceneList';
import { useSwitchMapStyles } from './hooks/useSwitchMapStyles';
import styles from './Map.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

// This rerenders constantly while the map is being moved
const Map = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useMapMainFeatures(wrapperRef, mapRef);
    /*
     * Handle Plume Raster Images
     */
    useSourceImages();

    useHoveredPlumeImage();

    /*
     * Switch map styles
     */
    useSwitchMapStyles();

    /*
     * Update coordinates and zoom in global state on map move
     */
    useMapBoundsTracker();

    /*
     * Cluster / Decluster
     */
    useDecluster();

    /*
     * Show/hide scenes and scenes outline layer
     */
    useCoverageLayer();

    /*
     * Attach event listeners to scene layer to retrieve coverage data, handle
     * events, populate the Scene List
     */
    useSceneList();

    /*
     * Add draw with custom modes and styles to map
     */
    useDraw();

    /*
     * Draw/Upload Area of Interest
     */
    useAOIListeners();

    /*
     * Draw distance/area measurment tool on map
     */
    useAreaMeasure();

    /*
     * Add WSAD keyboard controls to map camera
     */
    useKeyboardControls();

    /*
     * Open source list view at a certain zoom level
     */
    useOpenSourceListAtZoomLevel();

    /*
     * Clear filters location if user moves map outside of bounds
     */
    // useClearFiltersLocation();
    // TODO: check this

    return (
        <div className={styles.container}>
            <div ref={wrapperRef} className={styles['wrapper']}></div>
            <MapMarkers.Data />
            <MapMarkers.ActiveSource />
            <MapMarkers.PlumeOrigin />
            <MapMarkers.CoordinatesPin />
        </div>
    );
};

export default Map;
