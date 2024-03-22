import { useEffect } from 'react';
import { useDraw, useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export const useAreaMeasure = () => {
    const map = useMapSlice(state => state.map);
    const isMeasure = useMapSlice(state => state.isMeasure); // Can be replaced with mode === 'draw_radius'
    const setIsMeasure = useMapSlice(state => state.setIsMeasure);
    const setIsMeasureActive = useMapSlice(state => state.setIsMeasureActive);
    const { setDrawMode } = useDrawStoreActions();

    const draw = useDraw();

    // Did we need an effect for this?
    useEffect(() => {
        if (!map || !isMeasure) return;

        setDrawMode('draw_radius');

        const measureToolLayers = map.getStyle().layers.filter(layer => layer.id.includes('gl-draw'));
        measureToolLayers &&
            measureToolLayers.forEach(({ id }) => {
                map.getLayer(id) && map.moveLayer(id); // moveLayer to top of layers
            });

        setIsMeasure(false);
    }, [map, isMeasure, setIsMeasure, setDrawMode]);

    // Adds label-bg image to map for radius tool
    // Explore if there is another way to do this
    useEffect(() => {
        if (!map) return;

        map.on('styleimagemissing', () => {
            if (map.hasImage('label-bg')) {
                return;
            }
            const rgb = [253, 144, 16]; // orange
            const width = 64; // The image will be 64 pixels square.
            const bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
            const data = new Uint8Array(width * width * bytesPerPixel);

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < width; y++) {
                    const offset = (y * width + x) * bytesPerPixel;
                    data[offset + 0] = rgb[0]; // red
                    data[offset + 1] = rgb[1]; // green
                    data[offset + 2] = rgb[2]; // blue
                    data[offset + 3] = 255; // alpha
                }
            }
            map.addImage('label-bg', { width, height: width, data });
        });
    }, [map]);

    // handle draw tool toggle active state
    useEffect(() => {
        if (!draw || !map) return;

        map.on('draw.modechange', () => {
            setIsMeasureActive(false);
        });
    }, [map, draw, setIsMeasureActive]);
};
