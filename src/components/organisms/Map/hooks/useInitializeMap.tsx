import mapboxgl from 'mapbox-gl';
import { MutableRefObject, RefObject, useEffect } from 'react';
import type { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import { MAPBOX_MINIMAP_STYLE } from '@/utils/globals';
import { SECRETS } from '@/utils/secrets';

type UseInitializeMapParams = {
    wrapperRef: RefObject<HTMLDivElement>;
    mapRef: MutableRefObject<mapboxgl.Map | null>;
    coordinates?: LngLatLike;
    zoom?: number;
    interactive?: boolean;
    minZoom?: number;
    maxZoom?: number;
    renderWorldCopies?: boolean;
    dragRotate?: boolean;
    touchZoomRotate?: boolean;
    setMap?: (map: mapboxgl.Map) => void;
    hash?: boolean;
    bounds?: LngLatBoundsLike;
};

// DO NOT USE THIS ANYMORE - USE REACT-MAP-GL
export const useInitializeMap = ({
    wrapperRef,
    mapRef,
    coordinates,
    zoom,
    setMap,
    minZoom,
    maxZoom,
    interactive = true,
    renderWorldCopies = false,
    touchZoomRotate = false,
    dragRotate = false,
    hash,
    bounds
}: UseInitializeMapParams) => {
    useEffect(() => {
        if (!wrapperRef || mapRef.current) return;

        mapboxgl.accessToken = SECRETS.MAPBOX_TOKEN ?? '';

        const options: mapboxgl.MapboxOptions = {
            container: wrapperRef.current as HTMLDivElement,
            bounds,
            style: MAPBOX_MINIMAP_STYLE,
            interactive,
            dragRotate,
            touchZoomRotate,
            projection: { name: 'mercator' },
            renderWorldCopies,
            hash
        };

        // Below could be refactored
        if (typeof coordinates !== 'undefined') {
            options['center'] = coordinates;
        }

        if (typeof zoom !== 'undefined') {
            options['zoom'] = zoom;
        }

        if (typeof maxZoom !== 'undefined') {
            options['maxZoom'] = maxZoom;
        }

        if (typeof minZoom !== 'undefined') {
            options['minZoom'] = minZoom;
        }

        mapRef.current = new mapboxgl.Map(options);

        setMap && setMap(mapRef.current);

        // todo fix deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
