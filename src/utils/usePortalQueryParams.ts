import {
    useQueryParams,
    StringParam,
    NumberParam,
    NumericObjectParam,
    QueryParamConfig,
    ArrayParam,
    withDefault
} from 'use-query-params';
import { INSTRUMENT_KEYS, SECTOR_KEYS } from '@/store/useFilterStore/static';
import { FiltersDate } from '@/store/useFilterStore/useFilterStore';

// Could also check if this is a valid dayjs date here
const convertDateParam = (dateString: string): FiltersDate => {
    if (dateString === '..') return null;

    // Safari likes slashes and not dashes....
    const date = new Date(dateString.replace(/-/g, '/'));

    return {
        date,
        display: dateString
    };
};

// Fix this up too
// Function exists elsewhere
export function buildQueryDateString(dateStart: FiltersDate, dateEnd: FiltersDate) {
    if (dateStart && !dateEnd) return `${dateStart.display}/..`;
    if (!dateStart && dateEnd) return `../${dateEnd.display}`;
    if (dateStart && dateEnd) return `${dateStart.display}/${dateEnd.display}`;

    return '';
}

// Custom use-query-param Param
// https://github.com/pbeshai/use-query-params/tree/master/packages/use-query-params
// Could fix this up a bit
const dateParam = {
    encode: (
        date:
            | {
                  date_start: FiltersDate;
                  date_end: FiltersDate;
              }
            | null
            | undefined
    ): string | null | undefined => {
        if (date === null || date === undefined) return null;

        return buildQueryDateString(date.date_start, date.date_end);
    },
    decode: (encodedDate: string | (string | null)[] | null | undefined) => {
        if (typeof encodedDate !== 'string') return null;

        const [date_start, date_end] = encodedDate.split('/');

        // Eventually fix this so we don't need to return both the Date object and the display value
        // display value can just be determined from the Date object

        return {
            date_start: convertDateParam(date_start),
            date_end: convertDateParam(date_end)
        };
    }
};

const coordinatesParam = NumericObjectParam as QueryParamConfig<{ lat: number; lon: number } | null | undefined>;
const stringArrayParam = withDefault(ArrayParam, []) as QueryParamConfig<string[]>;

export const usePortalQueryParams = () => {
    return useQueryParams(
        {
            location: StringParam,
            coordinates: coordinatesParam,
            date: dateParam,
            sector: stringArrayParam,
            instrument: stringArrayParam,
            gasType: StringParam,
            details: StringParam, // source detail view
            emission_min: NumberParam,
            emission_max: NumberParam,
            plume_min: NumberParam,
            plume_max: NumberParam,
            persistence_min: NumberParam,
            persistence_max: NumberParam,
            plume_status: StringParam,
            plume_qualities: stringArrayParam
        },
        { removeDefaultsFromUrl: true }
    );
};

export type Params = ReturnType<typeof usePortalQueryParams>[0];

// I wonder if there is a better way to do this
export const useClearQueryParams = () => {
    const [, setQuery] = usePortalQueryParams();

    return () => {
        setQuery({
            location: undefined,
            coordinates: undefined,
            date: undefined,
            sector: [],
            instrument: [],
            gasType: undefined,
            details: undefined,
            emission_min: undefined,
            emission_max: undefined,
            plume_min: undefined,
            plume_max: undefined,
            persistence_min: undefined,
            persistence_max: undefined,
            plume_status: undefined,
            plume_qualities: []
        });
    };
};

export const dateParam2Dates = (
    date: {
        date_start: FiltersDate;
        date_end: FiltersDate;
    } | null
): { date_start: FiltersDate; date_end: FiltersDate } => ({
    date_start: date?.date_start ?? null,
    date_end: date?.date_end ?? null
});

// Could potentially avoid this null/undefined/[] to all/selected conversion by defaulting all

// sectors being empty means all sectors
export const getSelectedSectorKeys = (sectors: string[]) => (sectors.length === 0 ? SECTOR_KEYS : sectors);

// instruments being empty means all instruments
export const getSelectedInstrumentKeys = (instruments: string[]) =>
    instruments.length === 0 ? INSTRUMENT_KEYS : instruments;

// null/undefined gasType means all gases
export const getSelectedGases = (gasType: string | null | undefined) =>
    gasType === undefined || gasType === null ? ['CH4', 'CO2'] : [gasType];

export function toggleArrayValues<T>(newValues: T | T[], oldValues: T[], compareFn = (a: T, b: T) => a === b): T[] {
    const newValuesArray = Array.isArray(newValues) ? newValues : [newValues];

    const addValues = newValuesArray.filter(v1 => oldValues.find(v2 => compareFn(v1, v2)) === undefined);
    const keepValues = oldValues.filter(v1 => newValuesArray.find(v2 => compareFn(v1, v2)) === undefined);

    return keepValues.concat(addValues);
}
