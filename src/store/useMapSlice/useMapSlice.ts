import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { Map, LngLatBoundsLike, PaddingOptions, MapboxGeoJSONFeature, LngLatBounds } from 'mapbox-gl';

// Silly precision but why bother shortening
export const defaultBounds: LngLatBoundsLike = [
    { lat: -69.3867512495605, lng: -175.88637108667567 }, // sw
    { lat: 83.28283147143202, lng: 276.8863710866779 } // ne
];

type MarkerStateItem = {
    feature: MapboxGeoJSONFeature;
    marker: mapboxgl.Marker;
};

type MapStore = {
    /*
     * Map Main
     */
    map: Map | null;
    getMap: () => void;
    setMap: (map: Map) => void;
    isMapLoaded: boolean;
    setIsMapLoaded: (isMapLoaded: boolean) => void;

    /*
     * Map Style
     */
    styleName: string;
    setStyleName: (styleName: string) => void;

    /*
     * Map Source
     */
    isSourceLoaded: boolean;
    setIsSourceLoaded: (isSourceLoaded: boolean) => void;

    /*
     * Map Markers
     */
    sourceMarkers: MarkerStateItem[];
    setSourceMarkers: (sourceMarkers: MarkerStateItem[]) => void;
    clusterMarkers: MarkerStateItem[];
    setClusterMarkers: (clusterMarkers: MarkerStateItem[]) => void;

    /*
     * Camera
     */
    increaseZoom: (zoom?: number) => void;
    increaseZoomOnCoordinates: (coordinates: [lng: number, lat: number], zoom?: number) => void;
    decreaseZoom: (zoom?: number) => void;
    bounds: LngLatBounds | null;
    setBounds: (bounds: LngLatBounds) => void;
    easeTo: (
        coordinates: [lng: number, lat: number],
        padding?: PaddingOptions | 'details' | number,
        zoom?: number
    ) => void;
    flyTo: (coordinates: [lng: number, lat: number], zoom?: number, useDetailsPadding?: boolean) => void;
    flyToDefaultZoom: (coordinates: [lng: number, lat: number]) => void;
    fitBounds: (bounds: LngLatBoundsLike, padding?: PaddingOptions | 'details' | number) => void;
    panBy: (offset: [number, number]) => void;

    /*
     * Measure
     */
    isMeasure: boolean;
    setIsMeasure: (trigger: boolean) => void;
    isMeasureActive: boolean;
    setIsMeasureActive: (trigger: boolean) => void;
};

// Cannot use devtools on this Slice
// I think serializing the map object is causing issues - too large
// TODO: Refactor to export actions as one object and state as individual objects
// sourceMarkers and clusterMarkers are update on map 'move' events which happen a lot
export const useMapSlice = createWithEqualityFn<MapStore>(
    (set, get) => ({
        /*
         * Map Main
         */
        map: null,
        getMap: () => get().map ?? null,
        setMap: (map: mapboxgl.Map) => set({ map }),
        isMapLoaded: false,
        setIsMapLoaded: isMapLoaded => set(() => ({ isMapLoaded })),

        /*
         * Map Style
         */
        styleName: '',
        setStyleName: styleName => set(() => ({ styleName })),

        /*
         * Map Source
         */
        isSourceLoaded: false,
        setIsSourceLoaded: isSourceLoaded => set(() => ({ isSourceLoaded })),

        /*
         * Map Markers
         */
        sourceMarkers: [],
        setSourceMarkers: sourceMarkers => set(() => ({ sourceMarkers })),
        clusterMarkers: [],
        setClusterMarkers: clusterMarkers => set(() => ({ clusterMarkers })),

        // A lot of this does not need to be app state. Just use the map setters and getters
        // The map will hold the state
        /*
         * Camera
         */
        // We don't need these
        increaseZoom: zoom => {
            const map = get().map;

            if (!map) return;

            const currentZoom = map.getZoom();
            const newZoom = zoom || Math.round(currentZoom + 2);

            map.flyTo({ center: map.getCenter(), zoom: newZoom });
        },
        increaseZoomOnCoordinates: (coordinates, zoom) => {
            const map = get().map;

            if (!map) return;

            const currentZoom = map.getZoom();
            const newZoom = currentZoom + (zoom || 2);

            map.flyTo({ center: coordinates, zoom: newZoom });
        },
        decreaseZoom: zoom => {
            const map = get().map;

            if (!map) return;

            const currentZoom = map.getZoom();
            const newZoom = zoom || Math.round(currentZoom - 2);

            map?.flyTo({ center: map.getCenter(), zoom: newZoom });
        },
        // Currently we need these because the bounds aren't "reactive" but we can fix this later
        bounds: null,
        setBounds: bounds => set(() => ({ bounds })),
        easeTo: (coordinates, padding, zoom) => {
            const map = get().map;

            if (!map) return;

            const noPadding = { top: 0, left: 0, bottom: 0, right: 0 };
            const detailsPadding = { top: 0, left: 0, bottom: 0, right: window.innerWidth * 0.3 };
            const newPadding = padding === 'details' ? detailsPadding : padding || noPadding;

            const currentZoom = map.getZoom();

            map.easeTo({ center: coordinates, padding: newPadding, zoom: zoom || currentZoom, duration: 500 });
        },
        fitBounds: (bounds, padding) => {
            const map = get().map;

            if (!map || !bounds) return;

            const noPadding = { top: 0, left: 0, bottom: 0, right: 0 };
            const detailsPadding = { top: 0, left: 0, bottom: 0, right: window.innerWidth * 0.3 };
            const newPadding = padding === 'details' ? detailsPadding : padding || noPadding;

            map.fitBounds(bounds, {
                easing: time => 1 - Math.pow(1 - time, 2),
                padding: newPadding
            });
        },

        flyTo: (coordinates, zoom, useDetailsPadding) => {
            const map = get().map;

            if (!map) return;

            const currentZoom = map.getZoom();

            const flyToOptions: mapboxgl.FlyToOptions = {
                center: coordinates,
                zoom: zoom || currentZoom
            };
            if (useDetailsPadding) {
                flyToOptions.padding = { top: 0, left: 0, bottom: 0, right: window.innerWidth * 0.3 };
            }

            map.flyTo(flyToOptions);
        },
        flyToDefaultZoom: coordinates => get().flyTo(coordinates, 1.75),
        panBy: offset => {
            const map = get().map;

            if (!map) return;

            map.panBy(offset, { easing: time => 1 - Math.pow(1 - time, 2) });
        },

        /*
         * Measure Tool
         */
        isMeasure: false,
        setIsMeasure: isMeasure => set(() => ({ isMeasure })),
        isMeasureActive: false,
        setIsMeasureActive: isMeasureActive => set(() => ({ isMeasureActive }))
    }),
    shallow
);
