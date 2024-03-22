import mapboxgl from 'mapbox-gl';
import { MutableRefObject, RefObject, useEffect } from 'react';
import type { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import { SECRETS } from '@/utils/secrets';

type UseInitializeMapParams = {
    wrapperRef: RefObject<HTMLDivElement>;
    mapRef: MutableRefObject<mapboxgl.Map | null>;
    coordinates?: LngLatLike;
    zoom?: number;
    style?: string;
    token?: string;
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

export const useInitializeMap = ({
    wrapperRef,
    mapRef,
    style,
    coordinates,
    zoom,
    setMap,
    token,
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

        mapboxgl.accessToken = token ?? SECRETS.MAPBOX_TOKEN ?? '';

        const options: mapboxgl.MapboxOptions = {
            container: wrapperRef.current as HTMLDivElement,
            bounds,
            style: `mapbox://styles/${style ?? SECRETS.MAPBOX_STYLES_TOKEN}`,
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
