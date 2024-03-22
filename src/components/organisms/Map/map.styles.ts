import { SECRETS } from '@/utils/secrets';

export const mapstyles = {
    og: `mapbox://styles/${SECRETS.MAPBOX_STYLES_TOKEN}`,
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    accessibility: `mapbox://styles/${SECRETS.MAPBOX_STYLES_ACCESSIBILITY_TOKEN}`
};
