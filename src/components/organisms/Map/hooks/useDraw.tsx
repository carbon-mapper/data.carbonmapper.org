import MapboxDraw from '@mapbox/mapbox-gl-draw';
// no type definitions for this package
// @ts-ignore
import StaticMode from '@mapbox/mapbox-gl-draw-static-mode';
// @ts-ignore
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import { useEffect, useMemo } from 'react';
import { useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import CircleMode from '../custom/circleMode';
import RadiusMode from '../custom/radiusMode';
import { styles as radiusModeStyles } from '../custom/radiusMode.style';

/*
 * Adds draw control to map and stores a reference to it in global state
 * Adds custom draw modes to draw control
 * Documentation: https://docs.mapbox.com/mapbox-gl-js/api/mapbox-gl-draw/
 */

export function useDraw() {
    const map = useMapSlice(state => state.map);
    const { setDraw, removeDraw } = useDrawStoreActions();

    // I think this could sit inside the useEffect
    // We really just want to initialize this onMapLoad...
    const draw = useMemo(() => {
        return new MapboxDraw({
            displayControlsDefault: false,
            modes: {
                ...MapboxDraw.modes,
                draw_rectangle: DrawRectangle,
                draw_circle: CircleMode, // what about https://github.com/iamanvesh/mapbox-gl-draw-circle?
                draw_radius: RadiusMode,
                static: StaticMode
            },
            // Add custom radius mode styles, also applies to circle mode
            styles: radiusModeStyles
        });
    }, []);

    useEffect(() => {
        if (!map) return;

        map.addControl(draw);
        setDraw(draw);

        return () => {
            map.removeControl(draw);
            removeDraw();
        };
    }, [map, draw, setDraw, removeDraw]);
}
