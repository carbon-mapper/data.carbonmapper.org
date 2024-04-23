import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { DEFAULT_BOUNDS } from '@/utils/globals';

const movementDelta = 200;
const easing = (time: number) => time * (2 - time);

// consider exporting
type DefinedMapRef = NonNullable<ReturnType<typeof useMap>['current']>;

function onKeydownHandler(event: KeyboardEvent, map: DefinedMapRef) {
    switch (event.key) {
        case 'Escape':
            map.fitBounds(DEFAULT_BOUNDS);
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
    const { mainMap } = useMap();

    useEffect(() => {
        if (mainMap === undefined) return;

        const keydownHandler = (event: KeyboardEvent) => onKeydownHandler(event, mainMap);
        const canvas = mainMap.getCanvas();

        canvas.addEventListener('keydown', keydownHandler);

        return () => canvas.removeEventListener('keydown', keydownHandler);
    }, [mainMap]);
};
