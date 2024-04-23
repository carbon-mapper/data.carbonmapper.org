// TODO: Remove duplicate information from other places in the code
export const SECTOR_MAP = Object.freeze({
    '1B2': 'Oil & Gas',
    '4B': 'Livestock',
    '1B1a': 'Coal Mining',
    '1A1': 'Electricity Generation',
    '6A': 'Solid Waste',
    '6B': 'Waste Water',
    other: 'Other',
    NA: 'Undetermined'
});
export const SECTOR_KEYS = Object.keys(SECTOR_MAP);

export const INSTRUMENT_STATE = Object.freeze({
    planet_tanager: true,
    nasa_emit: true,
    nasa_aviris_ng: true,
    asu_gao: true
});

export const INSTRUMENT_MAP = Object.freeze({
    tan: 'Planet Tanager',
    emi: 'NASA EMIT',
    ang: 'NASA AVIRIS-NG',
    GAO: 'ASU GAO'
});
export const INSTRUMENT_KEYS = Object.keys(INSTRUMENT_MAP);

// ToDo: Consider removing these
export const GAS_TYPE_STATE = Object.freeze({
    CH4: true,
    CO2: true
});

export type GasType = keyof typeof GAS_TYPE_STATE;

export type GasTypeState = {
    [key in GasType]: boolean;
};

export const MAX_PERSISTENCE_LIMIT = 100;

export const PLUME_STATUS_MAP = Object.freeze({
    not_deleted: 'Not Deleted',
    valid: 'Valid',
    publish_ready: 'Publish Ready',
    published: 'Published',
    deleted: 'Deleted',
    hidden: 'Hidden'
});

export const PLUME_QUALITY_MAP = Object.freeze({
    good: 'Good',
    questionable: 'Questionable',
    bad: 'Bad'
});
