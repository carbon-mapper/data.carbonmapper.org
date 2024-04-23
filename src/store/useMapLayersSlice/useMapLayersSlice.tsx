import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { MapLayersSliceTypes } from './useMapLayersSlice.types';

export const useMapLayersSlice = createWithEqualityFn<MapLayersSliceTypes.Slice>()(
    devtools(
        (set, get) => ({
            /*
             * Basemap
             */
            // NOT STATE - just a constant - refactor later
            basemaps: [
                {
                    id: 'layer-og',
                    name: 'og',
                    alt: 'Map'
                },
                {
                    id: 'layer-satellite',
                    name: 'satellite',
                    alt: 'Satellite'
                }
            ],
            activeBasemap: 'og',
            setActiveBasemap: name => set(() => ({ activeBasemap: name })),
            /*
             * Plumes
             */
            plumesOpacity: 1,
            setPlumesOpacity: opacity => set(() => ({ plumesOpacity: opacity })),
            /*
             * Overlays
             */
            overlays: [
                {
                    id: 'layer-atmosphere',
                    name: 'ch4',
                    alt: 'Gas',
                    opacity: 0
                },
                {
                    id: 'layer-scenes',
                    name: 'rgb',
                    alt: 'RGB',
                    opacity: 0
                }
            ],
            activeOverlay: '',
            setActiveOverlay: name => {
                set(() => ({ activeOverlay: name }));
                const activeOverlay = get().activeOverlay;
                document.body.classList.toggle('is-overlay', activeOverlay !== '');
            },
            overlayOpacity: 1,
            setOverlayOpacity: (opacity = 1) => set(() => ({ overlayOpacity: opacity })),
            /*
             * Cluster / Decluster
             */
            showClusters: true,
            setShowClusters: show => set(() => ({ showClusters: show }))
        }),
        { enabled: false, name: 'Map Layers Slice' }
    ),
    shallow
);
