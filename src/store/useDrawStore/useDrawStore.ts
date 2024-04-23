import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import type { Position } from '@turf/turf';

export type AOIJSON = {
    id: string | undefined; // Theoretically undefined could represent a AOI that isn't backed by the server
    geometry_json: {
        type: 'MultiPolygon';
        coordinates: Position[][][];
    };
};

// MapboxDraw.DrawMode + custom modes added in useDraw.tsx
// ....could this be done better?
export type AugmentedDrawMode = MapboxDraw.DrawMode | 'draw_rectangle' | 'draw_circle' | 'draw_radius' | 'static';

type DrawStore = {
    draw: MapboxDraw | null;
    aoi: AOIJSON | null;
    file: File | null;
    drawMode: AugmentedDrawMode;
    actions: {
        setDraw: (draw: MapboxDraw) => void;
        removeDraw: () => void;
        setAOI: (shape: AOIJSON) => void;
        deleteAOI: () => void;
        setFile: (file: File) => void;
        setDrawMode: (drawMode: AugmentedDrawMode, options?: { updateDraw?: boolean }) => void;
    };
};

// https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md#events
// If you programmatically invoke a function in the Draw API,
// any event that directly corresponds with that function will not be fired.
// For example, if you invoke draw.delete(), there will be no corresponding draw.delete event,
// since you already know what you've done.
// Subsequent events may fire, though, that do not directly correspond to the invoked function.
// For example, if you have a one feature selected and then invoke draw.changeMode('draw_polygon'),
// you will not see a draw.modechange event (because that directly corresponds with the invoked function)
// but you will see a draw.selectionchange event, since by changing the mode you indirectly deselected a feature.

// should be aoi_id
// and aoi_geometry, maybe even just a hash to make it reactive
const useDrawStore = create<DrawStore>()((set, get) => ({
    draw: null,
    aoi: null,
    file: null,
    drawMode: 'simple_select' as const, // i think this is the default Draw state
    actions: {
        setDraw: (draw: MapboxDraw) => {
            set(() => ({ draw }));
        },
        removeDraw: () => {
            set(() => ({ draw: null }));
        },
        setAOI: (aoi: AOIJSON) => {
            set(() => ({ aoi }));
        },
        deleteAOI: () => {
            set(() => {
                const draw = get().draw;
                draw?.deleteAll();
                return { aoi: null };
            });
        },
        setFile: (file: File) => {
            set(() => ({ file }));
        },
        // draw.getMode() is not reactive, so we need to use zustand state to make it reactive
        setDrawMode: (drawMode, options) => {
            const { updateDraw = true } = options ?? {};

            // We don't need to update the draw instance if this was invoked by draw.modechange
            const drawInstance = get().draw;
            if (drawInstance && updateDraw) drawInstance.changeMode(drawMode as string); // weird type issue

            set(() => ({ drawMode }));
        }
    }
}));

export const useDraw = () => useDrawStore(state => state.draw);
export const useAOI = () => useDrawStore(state => state.aoi);
export const useFile = () => useDrawStore(state => state.file);
export const useDrawMode = () => useDrawStore(state => state.drawMode);
export const useDrawStoreActions = () => useDrawStore(state => state.actions);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Draw Store', useDrawStore);
}
