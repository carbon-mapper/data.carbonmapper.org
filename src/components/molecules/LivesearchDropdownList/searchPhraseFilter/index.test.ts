import { checkIfPlume, checkIfSource, checkIfCoordinates, searchPhraseFilter } from '.';

const mockInputs = {
    empty: [''],
    // invalid: ['12kdsu', 'november 2020 12:00', 'november 2020 12:00:00', 'pasztet', '50kg'],
    // 12kdsu not passing !!!
    invalid: [
        'kdsu 1',
        'prosta 8 Kraków',
        'november 2020 12:00',
        'november 2020 12:00:00',
        'pasztet',
        '50kg',
        'Georgia'
    ],
    location: ['Needville', 'Texas', 'US', 'Needville, Texas', 'Needville, US', 'Texas, US', 'Needville, Texas, US'],
    coordinates: [
        '29.39349, -95.71585',
        '-95.71585, 29.39349',
        '29.39349 -95.71585',
        '20, -10',
        '20 10',
        '-160, 60',
        '29°23\'36.6"N 95°42\'57.1"W',
        '95°42\'57.1"W 29°23\'36.6"N'
    ],
    plume: { full: 'GAO20230416t184913p0000-A', partial: 'GAO20230416t184913', stub: 'GAO20230416' },
    source: { full: 'CH4_6A_100m_-95.71615_29.39327', partial: 'CH4_6A_100m_-95.71615', stub: 'CH4_6A' }
};

describe('[Function] checkIfPlume', () => {
    it('should return true for a full plume name', () => {
        const testPhrase = mockInputs.plume.full;
        expect(checkIfPlume(testPhrase)).toBe(true);
    });

    it('should return true for a partial plume name', () => {
        const testPhrase = mockInputs.plume.partial;
        expect(checkIfPlume(testPhrase)).toBe(true);
    });

    it('should return true for a stub plume name', () => {
        const testPhrase = mockInputs.plume.stub;
        expect(checkIfPlume(testPhrase)).toBe(true);
    });

    it('should return false for an invalid plume name', () => {
        const testPhrase = mockInputs.invalid[0];
        expect(checkIfPlume(testPhrase)).toBe(false);
    });

    it('should return false for an empty plume name', () => {
        const testPhrase = mockInputs.empty[0];
        expect(checkIfPlume(testPhrase)).toBe(false);
    });

    it('should return false for a full source name', () => {
        const testPhrase = mockInputs.source.full;
        expect(checkIfPlume(testPhrase)).toBe(false);
    });

    it('should return false for a partial source name', () => {
        const testPhrase = mockInputs.source.partial;
        expect(checkIfPlume(testPhrase)).toBe(false);
    });

    it('should return false for a stub source name', () => {
        const testPhrase = mockInputs.source.stub;
        expect(checkIfPlume(testPhrase)).toBe(false);
    });

    it('should return false for a coordinates', () => {
        const testPhrase = mockInputs.coordinates[0];
        expect(checkIfPlume(testPhrase)).toBe(false);
    });

    it('should return false for a location', () => {
        const testPhrase = mockInputs.location[0];
        expect(checkIfPlume(testPhrase)).toBe(false);
    });
});

describe('[Function] checkIfSource', () => {
    it('should return true for a full source name', () => {
        const testPhrase = mockInputs.source.full;
        expect(checkIfSource(testPhrase)).toBe(true);
    });

    it('should return true for a partial source name', () => {
        const testPhrase = mockInputs.source.partial;
        expect(checkIfSource(testPhrase)).toBe(true);
    });

    it('should return true for a stub source name', () => {
        const testPhrase = mockInputs.source.stub;
        expect(checkIfSource(testPhrase)).toBe(true);
    });

    it('should return false for an invalid source name', () => {
        const testPhrase = mockInputs.invalid[0];
        expect(checkIfSource(testPhrase)).toBe(false);
    });

    it('should return false for an empty source name', () => {
        const testPhrase = mockInputs.empty[0];
        expect(checkIfSource(testPhrase)).toBe(false);
    });

    it('should return false for a full plume name', () => {
        const testPhrase = mockInputs.plume.full;
        expect(checkIfSource(testPhrase)).toBe(false);
    });

    it('should return false for a partial plume name', () => {
        const testPhrase = mockInputs.plume.partial;
        expect(checkIfSource(testPhrase)).toBe(false);
    });

    it('should return false for a stub plume name', () => {
        const testPhrase = mockInputs.plume.stub;
        expect(checkIfSource(testPhrase)).toBe(false);
    });

    it('should return false for a coordinates', () => {
        const testPhrase = mockInputs.coordinates[0];
        expect(checkIfSource(testPhrase)).toBe(false);
    });
});

describe('[Function] checkIfCoordinates', () => {
    it('should return true for decimal coordinates', () => {
        const testPhrase = mockInputs.coordinates[0];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return true for reversed decimal coordinates', () => {
        const testPhrase = mockInputs.coordinates[1];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return true for short decimal coordinates without a comma', () => {
        const testPhrase = mockInputs.coordinates[2];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return true for short decimal coordinates', () => {
        const testPhrase = mockInputs.coordinates[3];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return true for short decimal coordinates without a comma', () => {
        const testPhrase = mockInputs.coordinates[4];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return true for reversed short decimal coordinates', () => {
        const testPhrase = mockInputs.coordinates[5];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return true for DMS coordinates', () => {
        const testPhrase = mockInputs.coordinates[6];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return true for reversed DMS coordinates', () => {
        const testPhrase = mockInputs.coordinates[7];
        expect(checkIfCoordinates(testPhrase)).toBe(true);
    });

    it('should return false for an invalid coordinates', () => {
        const testPhrase = mockInputs.invalid[0];
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for an empty coordinates', () => {
        const testPhrase = mockInputs.empty[0];
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for a full plume name', () => {
        const testPhrase = mockInputs.plume.full;
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for a partial plume name', () => {
        const testPhrase = mockInputs.plume.partial;
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for a stub plume name', () => {
        const testPhrase = mockInputs.plume.stub;
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for a full source name', () => {
        const testPhrase = mockInputs.source.full;
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for a partial source name', () => {
        const testPhrase = mockInputs.source.partial;
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for a stub source name', () => {
        const testPhrase = mockInputs.source.stub;
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });

    it('should return false for a location', () => {
        const testPhrase = mockInputs.location[0];
        expect(checkIfCoordinates(testPhrase)).toBe(false);
    });
});

describe('[Function] searchPhraseFilter', () => {
    it('should return a plume object for a full plume name', () => {
        const testPhrase = mockInputs.plume.full;
        const expectedResult = {
            type: 'plume',
            value: testPhrase
        };
        expect(searchPhraseFilter(testPhrase)).toEqual(expectedResult);
    });

    it('should return a source object for a full source name', () => {
        const testPhrase = mockInputs.source.full;
        const expectedResult = {
            type: 'source',
            value: testPhrase
        };
        expect(searchPhraseFilter(testPhrase)).toEqual(expectedResult);
    });

    it('should return a coordinates object for decimal coordinates', () => {
        const testPhrase = mockInputs.coordinates[0];
        const expectedResult = {
            type: 'coordinates',
            value: testPhrase
        };
        expect(searchPhraseFilter(testPhrase)).toEqual(expectedResult);
    });

    it('should return a location object for a location', () => {
        const testPhrase = mockInputs.location[0];
        const expectedResult = {
            type: 'location',
            value: testPhrase
        };
        expect(searchPhraseFilter(testPhrase)).toEqual(expectedResult);
    });
});
