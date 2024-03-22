import { isNumber } from './isNumber';

describe('[Utils] isNumber', () => {

    it ('check if type of value is number', () => {

        const value1 = isNumber('12312');
        const value2 = isNumber(123);
        const value3 = isNumber(NaN);
        const value4 = isNumber(undefined);
        const value5 = isNumber('undefined');
        const value6 = isNumber(null);

        expect(value1).toBe(false);
        expect(value2).toBe(true);
        expect(value3).toBe(false);
        expect(value4).toBe(false);
        expect(value5).toBe(false);
        expect(value6).toBe(false);

    });

})
