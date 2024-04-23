import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { LngLatBounds } from 'mapbox-gl';

type MapStore = {
    bounds: LngLatBounds | null;
    setBounds: (bounds: LngLatBounds) => void;
};

// TODO: Refactor to export actions as one object and state as individual objects
// sourceMarkers and clusterMarkers are update on map 'move' events which happen a lot
export const useMapSlice = createWithEqualityFn<MapStore>(
    set => ({
        // Currently we need these because the bounds aren't "reactive" but we can fix this later
        bounds: null,
        setBounds: bounds => set(() => ({ bounds }))
    }),
    shallow
);
