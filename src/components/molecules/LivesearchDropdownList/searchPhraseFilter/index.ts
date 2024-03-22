import {
    decimalCoordinatesRegex,
    dmsCoordinatesRegex
} from '@/utils/coordinateTooling';

export type OutputType = 'coordinates' | 'location' | 'plume' | 'source';

export interface Output {
    type: OutputType;
    value: string;
}

/*
 * Livesearch Dropdown Search inputs:
 * 1. Location geographical name:
 *   - City name - Needville
 *   - State name - Texas
 *   - Country name - US
 *   - City name, State name - Needville, Texas
 *   - City name, Country name - Needville, US
 *   - State name, Country name - Texas, US
 *   - City name, State name, Country name - Needville, Texas, US
 * 2. Location coordinates:
 *   - Decimal latitude, decimal longitude -29.39349, -95.71585
 *   - Decimal longitude, decimal latitude -95.71585, 29.39349
 *   - DMS latitude, DMS longitude - 29°23'36.6"N 95°42'57.1"W
 *   - DMS longitude, DMS latitude - 95°42'57.1"W 29°23'36.6"N
 * 3. Plume name:
 *   - full - GAO20230416t184913p0000-A [1 item]
 *   - partial - GAO20230416t184913p0000 eg GAO20230416t184913p0000-A, GAO20230416t184913p0000-B etc [items > 1]
 *   - stub - GAO2023 eg GAO20230416t184913p0000-A, GAO20230416t184913p0000-B etc [10 items]
 * 4. Source name:
 *   - full - CH4_6A_100m_-95.71615_29.39327 [1 item]
 *   - partial - CH4_6A_100m_-95.71615 eg CH4_6A_100m_-95.71615_29.39327, CH4_6A_100m_-95.71615_29.39328 etc [items > 1]
 *   - stub - CH4_6A_100m eg CH4_6A_100m_-95.71615_29.39327, CH4_6A_100m_-95.71615_29.39328 etc [10 items]
 */

// plumeInstruments gao, ang, emi, tan, ssc

/*
 * Plume naming schemes:
 * 1. GAO20230416t184913p0000-A
 * 2. ang20230319t210529-A
 * 3. emi20230907t131657p09007-A
 * 4. tan20230416t184913p0000-A
 * 5. ssc20230416t184913p0000-A
 */

/*
 * Sector codes: 1B2, 6A, 6B, 4B, 1B1a, 1A1, other, NA
 * Gas types: CH4, CO2
 */

/*
 * Source naming scheme:
 * GAS_SECTOR_RESOLUTION_LONGITUDE_LATITUDE
 * examples:
 *  1. CH4_6A_100m_-95.71615_29.39327
 *  2. CO2_1A1_100m_-93.75644_30.05309
 */

const plumeRegex = /^(GAO|ang|emi|tan|ssc)(\d{4})([01]\d)([0-3]\d)(t(\d{6})(?:\w+)?-(\S+))?/i;
const sourceRegex = /^(CH4|CO2)_(1B2|6A|6B|4B|1B1a|1A1|other|NA)(_(\w+)_(-?\d+(?:\.\d+)?)_(-?\d+(?:\.\d+)?))?/i;

export const checkIfPlume = (phrase: string): boolean => plumeRegex.test(phrase);
export const checkIfSource = (phrase: string): boolean => sourceRegex.test(phrase);
export const checkIfCoordinates = (phrase: string): boolean =>
    decimalCoordinatesRegex.test(phrase) || dmsCoordinatesRegex.test(phrase);

export function searchPhraseFilter(phrase: string): Output {
    if (checkIfPlume(phrase)) {
        return {
            type: 'plume',
            value: phrase
        };
    }

    if (checkIfSource(phrase)) {
        return {
            type: 'source',
            value: phrase
        };
    }

    if (checkIfCoordinates(phrase)) {
        return {
            type: 'coordinates',
            value: phrase
        };
    }

    return {
        type: 'location',
        value: phrase
    };
}
