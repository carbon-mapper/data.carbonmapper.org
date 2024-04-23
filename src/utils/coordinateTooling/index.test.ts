import {
    toAbsoluteNumber,
    toAbsoluteNumberFromString,
    toFixed,
    extractDecimalFromString,
    extractDMSFromString,
    convertDecimalToDMS,
    convertDMStoDecimal,
    convertDecimalStringToDMS,
    convertDMSStringToDecimal,
    normalizeStringCoordinatesToDecimal,
    normalizeStringCoordinatesToDMS,
    normalizeStringCoordinates
} from '.';

describe('[Function] toAbsoluteNumber', () => {
    it('should return a positive number for a positive number', () => {
        const testNumber = 1;
        const expected = 1;
        expect(toAbsoluteNumber(testNumber)).toBe(expected);
    });

    it('should return a positive number for a negative number', () => {
        const testNumber = -1;
        const expected = 1;
        expect(toAbsoluteNumber(testNumber)).toBe(expected);
    });
});

describe('[Function] toAbsoluteNumberFromString', () => {
    it('should return a positive number for a positive number string', () => {
        const testString = '1';
        const expected = 1;
        expect(toAbsoluteNumberFromString(testString)).toBe(expected);
    });

    it('should return a positive number for a negative number string', () => {
        const testString = '-1';
        const expected = 1;
        expect(toAbsoluteNumberFromString(testString)).toBe(expected);
    });

    it('should return a positive number for a positive number string with a positive sign', () => {
        const testString = '+1';
        const expected = 1;
        expect(toAbsoluteNumberFromString(testString)).toBe(expected);
    });
});

describe('[Function] toFixed', () => {
    it('should return a number with the correct number of decimal places', () => {
        const testNumber = 1.23456789;
        const testPrecision = 3;
        const expected = 1.235;
        expect(toFixed(testNumber, testPrecision)).toBe(expected);
    });
});

describe('[Function] extractDMSFromString', () => {
    it("should return null if latitude's absolute value is greater than 90", () => {
        const testString = '95°42\'57.1"N 29°23\'36.6"W';
        expect(extractDMSFromString(testString)).toBeNull();
    });

    it('should return null if both coordinates are of the same type', () => {
        const testString = '29°23\'36.6"N 29°23\'36.6"S';
        expect(extractDMSFromString(testString)).toBeNull();
    });

    it('should return a valid DMS object for a valid DMS string', () => {
        const testString = '29°23\'36.6"N 95°42\'57.1"W';
        const expected = {
            latitude: {
                degrees: 29,
                minutes: 23,
                seconds: 36.6,
                direction: 'N'
            },
            longitude: {
                degrees: 95,
                minutes: 42,
                seconds: 57.1,
                direction: 'W'
            }
        };

        expect(extractDMSFromString(testString)).toEqual(expected);
    });

    it('should return a valid DMS object for a valid DMS string with no spaces', () => {
        const testString = '29°23\'36.6"N95°42\'57.1"W';
        const expected = {
            latitude: {
                degrees: 29,
                minutes: 23,
                seconds: 36.6,
                direction: 'N'
            },
            longitude: {
                degrees: 95,
                minutes: 42,
                seconds: 57.1,
                direction: 'W'
            }
        };

        expect(extractDMSFromString(testString)).toEqual(expected);
    });

    it('should return null for an invalid DMS string', () => {
        const testString = 'invalid';
        expect(extractDMSFromString(testString)).toBeNull();
    });

    it('should return null for a DMS string with no spaces and no seconds', () => {
        const testString = "29°23'N95°42'W";

        expect(extractDMSFromString(testString)).toBeNull;
    });

    it('should return null for a DMS string with no spaces and no seconds and no minutes', () => {
        const testString = '29°N95°W';

        expect(extractDMSFromString(testString)).toBeNull;
    });

    it('should return null for a DMS string with no spaces and no seconds and no minutes and no direction', () => {
        const testString = '29°95°';

        expect(extractDMSFromString(testString)).toBeNull;
    });
});

describe('[Function] extractDecimalFromString', () => {
    it('should return null if both coordinates are 90 degrees or greater', () => {
        const testString = '95.71585, 95.71585';
        expect(extractDecimalFromString(testString)).toBeNull();
    });

    it('should return null if both negative coordinates are 90 degrees or greater', () => {
        const testString = '-95.71585, -95.71585';
        expect(extractDecimalFromString(testString)).toBeNull();
    });

    it('should reverse coordinates if provided in the wrong order', () => {
        const testString = '95.71585, 29.39349';
        const expected = {
            latitude: 29.39349,
            longitude: 95.71585
        };

        expect(extractDecimalFromString(testString)).toEqual(expected);
    });

    it('should reverse negative coordinates if provided in the wrong order', () => {
        const testString = '-95.71585, -29.39349';
        const expected = {
            latitude: -29.39349,
            longitude: -95.71585
        };

        expect(extractDecimalFromString(testString)).toEqual(expected);
    });

    it('should return a valid decimal object for a valid decimal string', () => {
        const testString = '29.39349, 145.71585';
        const expected = {
            latitude: 29.39349,
            longitude: 145.71585
        };

        expect(extractDecimalFromString(testString)).toEqual(expected);
    });

    it('should return a valid decimal object for a valid negative decimal string', () => {
        const testString = '-29.39349, -95.71585';
        const expected = {
            latitude: -29.39349,
            longitude: -95.71585
        };

        expect(extractDecimalFromString(testString)).toEqual(expected);
    });

    it('should return a valid decimal object for a valid decimal string with no spaces', () => {
        const testString = '-29.39349,-95.71585';
        const expected = {
            latitude: -29.39349,
            longitude: -95.71585
        };

        expect(extractDecimalFromString(testString)).toEqual(expected);
    });

    it('should return null for an invalid decimal string', () => {
        const testString = 'invalid';
        expect(extractDecimalFromString(testString)).toBeNull();
    });
});

describe('[Function] convertDecimalToDMS', () => {
    it('should return a North DMS coordinate string', () => {
        const testDecimal = 29.39349;
        const testType = 'latitude';

        const { degrees, minutes, seconds, direction } = convertDecimalToDMS(testDecimal, testType);

        expect(degrees).toBe(29);
        expect(minutes).toBe(23);
        expect(seconds).toBeCloseTo(36.6, 0.1);
        expect(direction).toBe('N');
    });

    it('should return an East DMS coordinate string', () => {
        const testDecimal = -95.71585;
        const testType = 'longitude';

        const { degrees, minutes, seconds, direction } = convertDecimalToDMS(testDecimal, testType);

        expect(degrees).toBe(95);
        expect(minutes).toBe(42);
        expect(seconds).toBeCloseTo(57.1, 0.1);
        expect(direction).toBe('E');
    });

    it('should return a South DMS coordinate string', () => {
        const testDecimal = -45.39349;
        const testType = 'latitude';

        const { degrees, minutes, seconds, direction } = convertDecimalToDMS(testDecimal, testType);

        expect(degrees).toBe(45);
        expect(minutes).toBe(23);
        expect(seconds).toBeCloseTo(36.6, 0.1);
        expect(direction).toBe('S');
    });

    it('should return a West DMS coordinate string', () => {
        const testDecimal = 176.12;
        const testType = 'longitude';

        const { degrees, minutes, seconds, direction } = convertDecimalToDMS(testDecimal, testType);

        expect(degrees).toBe(176);
        expect(minutes).toBe(7);
        expect(seconds).toBeCloseTo(12, 0.1);
        expect(direction).toBe('W');
    });
});

describe('[Function] convertDMStoDecimal', () => {
    it('should return a positive decimal latitude', () => {
        const testDMS = {
            degrees: 29,
            minutes: 23,
            seconds: 36.6,
            direction: 'N'
        };

        const expected = 29.3935;

        expect(convertDMStoDecimal(testDMS)).toBeCloseTo(expected, 0.0001);
    });

    it('should return a negative decimal longitude', () => {
        const testDMS = {
            degrees: 95,
            minutes: 42,
            seconds: 57.1,
            direction: 'W'
        };

        const expected = -95.7159;

        expect(convertDMStoDecimal(testDMS)).toBeCloseTo(expected, 0.0001);
    });

    it('should return a negative decimal latitude', () => {
        const testDMS = {
            degrees: 45,
            minutes: 23,
            seconds: 36.6,
            direction: 'S'
        };

        const expected = -45.3935;

        expect(convertDMStoDecimal(testDMS)).toBe(expected);
    });

    it('should return a positive decimal longitude', () => {
        const testDMS = {
            degrees: 176,
            minutes: 7,
            seconds: 12,
            direction: 'E'
        };

        const expected = 176.12;

        expect(convertDMStoDecimal(testDMS)).toBe(expected);
    });
});

describe('[Function] convertDecimalStringToDMS', () => {
    it('should return a valid DMS object for a valid decimal string', () => {
        const testString = '-29.39349, -95.71585';

        const result = convertDecimalStringToDMS(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude.degrees).toBe(29);
        expect(latitude.minutes).toBe(23);
        expect(latitude.seconds).toBeCloseTo(36.6, 0.1);
        expect(latitude.direction).toBe('S');

        expect(longitude.degrees).toBe(95);
        expect(longitude.minutes).toBe(42);
        expect(longitude.seconds).toBeCloseTo(57.1, 0.1);
        expect(longitude.direction).toBe('E');
    });

    it('should return null for an invalid decimal string', () => {
        const testString = 'invalid';
        expect(convertDecimalStringToDMS(testString)).toBeNull();
    });
});

describe('[Function] convertDMSStringToDecimal', () => {
    it('should return a valid decimal object for a valid DMS string', () => {
        const testString = '29°23\'36.6"N 95°42\'57.1"W';

        const result = convertDMSStringToDecimal(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude).toBeCloseTo(29.3935, 0.0001);
        expect(longitude).toBeCloseTo(-95.7159, 0.0001);
    });

    it('should return a valid decimal object for a valid DMS string with no spaces', () => {
        const testString = '29°23\'36.6"N95°42\'57.1"W';

        const result = convertDMSStringToDecimal(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude).toBeCloseTo(29.3935, 0.0001);
        expect(longitude).toBeCloseTo(-95.7159, 0.0001);
    });

    it('should return null for an invalid DMS string', () => {
        const testString = 'invalid';
        expect(convertDMSStringToDecimal(testString)).toBeNull();
    });
});

describe('[Function] normalizeStringCoordinatesToDecimal', () => {
    it('should return a valid decimal object for a valid DMS string', () => {
        const testString = '29°23\'36.6"N 95°42\'57.1"W';

        const result = normalizeStringCoordinatesToDecimal(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude).toBeCloseTo(29.3935, 0.0001);
        expect(longitude).toBeCloseTo(-95.7159, 0.0001);
    });

    it('should return a valid decimal object for a valid DMS string with no spaces', () => {
        const testString = '29°23\'36.6"N95°42\'57.1"W';

        const result = normalizeStringCoordinatesToDecimal(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude).toBeCloseTo(29.3935, 0.0001);
        expect(longitude).toBeCloseTo(-95.7159, 0.0001);
    });

    it('should return a valid decimal object for a valid decimal string', () => {
        const testString = '-29.39349, -95.71585';

        const result = normalizeStringCoordinatesToDecimal(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude).toBeCloseTo(-29.3935, 0.0001);
        expect(longitude).toBeCloseTo(-95.7159, 0.0001);
    });

    it('should return a valid decimal object for a valid decimal string with no spaces', () => {
        const testString = '-29.39349,-95.71585';

        const result = normalizeStringCoordinatesToDecimal(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude).toBeCloseTo(-29.3935, 0.0001);
        expect(longitude).toBeCloseTo(-95.7159, 0.0001);
    });

    it('should return null for an invalid string', () => {
        const testString = 'invalid';
        expect(normalizeStringCoordinatesToDecimal(testString)).toBeNull();
    });
});

describe('[Function] normalizeStringCoordinatesToDMS', () => {
    it('should return a valid DMS object for a valid DMS string', () => {
        const testString = '29°23\'36.6"N 95°42\'57.1"W';

        const result = normalizeStringCoordinatesToDMS(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude.degrees).toBe(29);
        expect(latitude.minutes).toBe(23);
        expect(latitude.seconds).toBeCloseTo(36.6, 0.1);
        expect(latitude.direction).toBe('N');

        expect(longitude.degrees).toBe(95);
        expect(longitude.minutes).toBe(42);
        expect(longitude.seconds).toBeCloseTo(57.1, 0.1);
        expect(longitude.direction).toBe('W');
    });

    it('should return a valid DMS object for a valid DMS string with no spaces', () => {
        const testString = '29°23\'36.6"N95°42\'57.1"W';

        const result = normalizeStringCoordinatesToDMS(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude.degrees).toBe(29);
        expect(latitude.minutes).toBe(23);
        expect(latitude.seconds).toBeCloseTo(36.6, 0.1);
        expect(latitude.direction).toBe('N');

        expect(longitude.degrees).toBe(95);
        expect(longitude.minutes).toBe(42);
        expect(longitude.seconds).toBeCloseTo(57.1, 0.1);
        expect(longitude.direction).toBe('W');
    });

    it('should return a valid DMS object for a valid decimal string', () => {
        const testString = '-29.39349, -95.71585';

        const result = normalizeStringCoordinatesToDMS(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude.degrees).toBe(29);
        expect(latitude.minutes).toBe(23);
        expect(latitude.seconds).toBeCloseTo(36.6, 0.1);
        expect(latitude.direction).toBe('S');

        expect(longitude.degrees).toBe(95);
        expect(longitude.minutes).toBe(42);
        expect(longitude.seconds).toBeCloseTo(57.1, 0.1);
        expect(longitude.direction).toBe('E');
    });

    it('should return a valid DMS object for a valid decimal string with no spaces', () => {
        const testString = '-29.39349,-95.71585';

        const result = normalizeStringCoordinatesToDMS(testString);

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude.degrees).toBe(29);
        expect(latitude.minutes).toBe(23);
        expect(latitude.seconds).toBeCloseTo(36.6, 0.1);
        expect(latitude.direction).toBe('S');

        expect(longitude.degrees).toBe(95);
        expect(longitude.minutes).toBe(42);
        expect(longitude.seconds).toBeCloseTo(57.1, 0.1);
        expect(longitude.direction).toBe('E');
    });
});

describe('[Function] normalizeStringCoordinates', () => {
    it('should return a valid decimal coordinate object for a valid DMS string with output type set to decimal', () => {
        const testString = '29°23\'36.6"N 95°42\'57.1"W';

        const result = normalizeStringCoordinates(testString, 'decimal');

        if (!result) return;

        const { latitude, longitude } = result;

        expect(latitude).toBeCloseTo(29.3935, 0.0001);
        expect(longitude).toBeCloseTo(-95.7159, 0.0001);
    });

    it('should return a valid DMS coordinate object for a valid decimal string with output type set to DMS', () => {
        const testString = '-29.39349, -95.71585';

        const result = normalizeStringCoordinates(testString, 'dms');

        if (!result) return;

        const { latitude, longitude } = result;

        if (typeof latitude === 'number' || typeof longitude === 'number') return;

        expect(latitude.degrees).toBe(29);
        expect(latitude.minutes).toBe(23);
        expect(latitude.seconds).toBeCloseTo(36.6, 0.1);
        expect(latitude.direction).toBe('S');

        expect(longitude.degrees).toBe(95);
        expect(longitude.minutes).toBe(42);
        expect(longitude.seconds).toBeCloseTo(57.1, 0.1);
        expect(longitude.direction).toBe('E');
    });

    it('should return null for an invalid DMS string with output type set to decimal', () => {
        const testString = 'invalid';
        expect(normalizeStringCoordinates(testString, 'decimal')).toBeNull();
    });

    it('should return null for an invalid decimal string with output type set to DMS', () => {
        const testString = 'invalid';
        expect(normalizeStringCoordinates(testString, 'dms')).toBeNull();
    });
});
