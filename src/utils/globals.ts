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
