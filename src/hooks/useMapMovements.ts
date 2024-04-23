import { FitBoundsOptions, FlyToOptions, LngLatBoundsLike } from 'mapbox-gl';
import { useCallback } from 'react';
import { useMap } from 'react-map-gl';
import { getDetailsPadding } from '@/utils/globals';

type ExtendedFitBoundsOptions = FitBoundsOptions & {
    sourceDetailPadding?: boolean;
};

export const useFitBounds = () => {
    const { mainMap } = useMap();

    return useCallback(
        (bounds: LngLatBoundsLike, options?: ExtendedFitBoundsOptions) => {
            if (mainMap === undefined) return;

            const newOptions = { ...options } || {};
            if (newOptions.sourceDetailPadding) newOptions.padding = getDetailsPadding();

            mainMap.fitBounds(bounds, newOptions);
        },
        [mainMap]
    );
};

type ExtendedFlyToOptions = FlyToOptions & {
    sourceDetailPadding?: boolean;
};

// Can i use offset instead????
export const useFlyTo = () => {
    const { mainMap } = useMap();

    return useCallback(
        (options: ExtendedFlyToOptions) => {
            if (mainMap === undefined) return;

            const newOptions = { ...options };
            if (newOptions.sourceDetailPadding && options.center !== undefined) {
                // Use offset instead of padding for flyTo since padding applied via flyTo
                // is persistent on the map and will affect fitBounds behavior
                // fitBounds does not have this persistent padding behavior
                const detailsPadding = getDetailsPadding();
                const xOffset = detailsPadding ? -(detailsPadding.right / 2) : 0;

                newOptions.offset = [xOffset, 0];
            } else {
                console.warn('Should include center point for sourceDetailPadding to have any affect');
            }

            mainMap.flyTo(newOptions);
        },
        [mainMap]
    );
};

const DEFAULT_SOURCE_ZOOM = 15; // Can tune, but we need something
// Abstracted for convenience and consistency of behavior
export const useZoomToSource = () => {
    const flyTo = useFlyTo();

    return useCallback(
        (sourceCenter: [number, number]) =>
            flyTo({ center: sourceCenter, zoom: DEFAULT_SOURCE_ZOOM, sourceDetailPadding: true }),
        [flyTo]
    );
};
