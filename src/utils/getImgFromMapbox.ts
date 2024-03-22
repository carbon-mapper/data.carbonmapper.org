import type { LngLatBoundsLike } from 'mapbox-gl';
import { SECRETS } from './secrets';

export function lon2tile(lon: number, zoom: number): number {
    return Math.floor(((lon + 180) / 360) * 2 ** zoom);
}

export function lat2tile(lat: number, zoom: number): number {
    return Math.floor(
        ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
            2 ** zoom
    );
}

// Should see where this is used
export const getImgFromMapbox = (bbox: number[] | LngLatBoundsLike | null): string => {
    if (!bbox) return '';

    const src = `https://api.mapbox.com/styles/v1/${SECRETS.MAPBOX_STYLES_TOKEN}/static/[${bbox}]/150x150?access_token=${SECRETS.MAPBOX_TOKEN}&attribution=false&logo=false`;
    return src;
};
