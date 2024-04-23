import { LngLatBoundsLike } from 'mapbox-gl';

// Need to reorganize this file
export const SIZES = {
    desktop: 1024,
    mobile: 1023
};

// What are these for?
export const GLOBAL_IDS = {
    dashboard: {
        filters: {
            wrapper: 'dashboard-filters',
            livesearch: 'dashboard-filters-livesearch',
            top: 'dashboard-filters-calendar',
            main: 'dashboard-filters-options',
            submit: 'dashboard-filters-submit',
            date: {
                toggle: 'dashboard-filters-date-toggle',
                start: 'dashboard-filters-date-start',
                end: 'dashboard-filters-date-end'
            },
            select: {
                toggle: 'dashboard-filters-select-toggle',
                list: 'dashboard-filters-select-list'
            },
            instrument: {
                toggle: 'dashboard-filters-instrument-toggle',
                list: 'dashboard-filters-instrument-list'
            },
            plumeStatus: {
                toggle: 'dashboard-filters-plumeStatus-toggle',
                list: 'dashboard-filters-plumeStatus-list'
            },
            plumeQuality: {
                toggle: 'dashboard-filters-plumeQuality-toggle',
                list: 'dashboard-filters-plumeQuality-list'
            },
            eps: 'dashboard-filters-eps',
            radio: 'dashboard-filters-radio',
            checkbox: 'dashboard-filters-checkbox'
        }
    }
};

export const INSTRUMENT_DETAILS_MAP: Record<string, { platform: string; provider: string; label: string }> = {
    GAO: {
        provider: 'ASU GDCS',
        platform: 'Global Airborne Observatory',
        label: 'Global Airborne Observatory'
    },
    ang: {
        provider: 'NASA-JPL AVIRIS-NH',
        platform: 'AVIRIS-NG',
        label: 'AVIRIS-NG'
    },
    emi: { provider: 'NASA-JPL EMIT', platform: 'ISS', label: 'EMIT' },
    tan: { provider: 'Planet Inc.', platform: 'Tanager', label: 'Tanager' },
    ssc: { provider: 'Planet Inc.', platform: 'SkySat', label: 'SkySat' }
};

export const isDevelopment = process.env.NODE_ENV === 'development';

export const isNullOrUndefined = (a: unknown): a is undefined | null => a === undefined || a === null;

const STAC_OPEN_DATETIME = '..';
const dateToStacDateTime = (date: Date | undefined | null): string => (date ? date.toISOString() : STAC_OPEN_DATETIME);
export const datesToStacDatetime = (
    dates: [dateStart: Date | undefined | null, dateEnd: Date | undefined | null]
): string | undefined => {
    if (!dates[0] && !dates[1]) return undefined;

    return `${dateToStacDateTime(dates[0])}/${dateToStacDateTime(dates[1])}`;
};

export const DEFAULT_BOUNDS: LngLatBoundsLike = [
    { lat: -69.3867512495605, lng: -175.88637108667567 }, // sw
    { lat: 83.28283147143202, lng: 276.8863710866779 } // ne
];

export const AREA_MEASURE_IMAGE = (() => {
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
    return { width, height: width, data };
})();

export const isServer = typeof window === 'undefined';
export const isClient = !isServer;

export const getDetailsPadding = () => {
    if (isServer) return undefined;
    return { top: 0, left: 0, bottom: 0, right: window.innerWidth * 0.3 };
};

// Max zoom we want to show source clusters. Switch to individual source points at greater zooms
export const CLUSTERING_MAX_ZOOM = 11;

// Some of this is elsewhere. Need to cleanup
// Consider attempting optimization ?optimize=true
// https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/#remove-unused-features
// We can clean up the other mapbox env variables since we no longer need them
export const CH4_PRIMARY_COLOR = '#6b01b3';
export const CO2_PRIMARY_COLOR = '#d00a75';
export const DEFAULT_MAPBOX_STYLE_ID = 'carbonmapper/cltx4u53x018y01pbhlo78d9g';
export const MAP_STYLES_CONFIG = {
    og: {
        url: `mapbox://styles/${DEFAULT_MAPBOX_STYLE_ID}`,
        color: CH4_PRIMARY_COLOR, // I think this is scene color
        opacity: 0.2
    },
    satellite: {
        url: 'mapbox://styles/carbonmapper/clu06wwtw025c01pb8zqdfznq',
        color: '#ffffff',
        opacity: 0.3
    },
    accessibility: {
        url: 'mapbox://styles/carbonmapper/clu071r2l000z01pd65ioazce',
        color: '#0026FF',
        opacity: 0.4
    }
};
export const MAPBOX_MINIMAP_STYLE = 'mapbox://styles/carbonmapper/clpwvpgj5010901p7d5hx6215';

export const PRIVACY_POLICY_URL = 'https://carbonmapper.org/privacy-policy/';
