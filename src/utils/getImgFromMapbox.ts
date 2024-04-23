import type { LngLatBoundsLike } from 'mapbox-gl';
import { DEFAULT_MAPBOX_STYLE_ID } from './globals';
import { SECRETS } from './secrets';

// Should see where this is used
export const getImgFromMapbox = (bbox: number[] | LngLatBoundsLike | null): string => {
    if (!bbox) return '';

    const src = `https://api.mapbox.com/styles/v1/${DEFAULT_MAPBOX_STYLE_ID}/static/[${bbox}]/150x150?access_token=${SECRETS.MAPBOX_TOKEN}&attribution=false&logo=false`;
    return src;
};
