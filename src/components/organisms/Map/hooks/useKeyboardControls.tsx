import { useEffect } from 'react';
import { useMapSlice, defaultBounds } from '@/store/useMapSlice/useMapSlice';

const movementDelta = 200;
const easing = (time: number) => time * (2 - time);

function onKeydownHandler(event: KeyboardEvent, map: mapboxgl.Map) {
    switch (event.key) {
        case 'Escape':
            map?.fitBounds(defaultBounds);
            break;
        case 'w':
            map.panBy([0, movementDelta * -1], { easing: easing });
            break;
        case 'a':
            map.panBy([movementDelta * -1, 0], { easing: easing });
            break;
        case 's':
            map.panBy([0, movementDelta], { easing: easing });
            break;
        case 'd':
            map.panBy([movementDelta, 0], { easing: easing });
            break;
        case '[':
            console.log('prev');
            break;
        case ']':
            console.log('next');
            break;
        default:
            break;
    }
}

export const useKeyboardControls = () => {
    const map = useMapSlice(state => state.map);
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);

    useEffect(() => {
        if (!map || !isMapLoaded) return;
        const canvas = map.getCanvas();

        canvas.addEventListener('keydown', event => onKeydownHandler(event, map));
        return () => canvas.removeEventListener('keydown', event => onKeydownHandler(event, map));
    }, [map, isMapLoaded]);
};
