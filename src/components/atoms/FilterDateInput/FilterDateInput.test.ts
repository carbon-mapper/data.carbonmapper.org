import { isValidDate, getDefaultPayload, processPayload } from './FilterDateInput.utils';

describe('[Atom] FilterDateInput - isValidDate', () => {

    it('should return true for valid date strings', () => {

        const validDates = [
            '01-01-2022',
            '12-31-2023',
            '02-29-2024',
            '10-15-2030'
        ];

        validDates.forEach(date => {
            expect(isValidDate(date, /^\d{2}-\d{2}-\d{4}$/)).toBe(true);
        });
    });

    it('should return false for invalid date strings', () => {

        const invalidDates = [
            '2022-01-01',
            '12-31-22',
            '02/29/2024',
            '10-15-20300',
            'invalid-date'
        ];

        invalidDates.forEach(date => expect(isValidDate(date, /^\d{2}-\d{2}-\d{4}$/)).toBe(false));
    });
});

describe('[Atom] FilterDateInput - getDefaultPayload', () => {

    it('should return "-" when payload is "/"', () => {
        expect(getDefaultPayload('/')).toBe('-');
    });

    it('should return the same payload when payload is not "/"', () => {
        expect(getDefaultPayload('1')).toBe('1');
        expect(getDefaultPayload('-')).toBe('-');
    });
});

describe('[Atom] FilterDateInput - processPayload', () => {

    it('should process payload correctly based on cursor position', () => {
        // Test cases for cursorPositionRef.current = 1
        expect(processPayload('2', 1, '12')).toBe('02-');

        // Test cases for cursorPositionRef.current = 2
        expect(processPayload('2', 2, '02')).toBe('2');
        expect(processPayload('3', 2, '02')).toBe('3');

        // Test cases for cursorPositionRef.current = 3
        expect(processPayload('3', 3, '22')).toBe('-3');

        // Test cases for cursorPositionRef.current = 4
        expect(processPayload('2', 4, '22-3')).toBe('2');

        // Test cases for cursorPositionRef.current = 5
        expect(processPayload('3', 5, '22-02-')).toBe('3');
        expect(processPayload('2', 5, '22-02-')).toBe('2');

        // Test cases for cursorPositionRef.current = 6
        expect(processPayload('1', 6, '22-02-2')).toBe('-1');

        // Test cases for cursorPositionRef.current = 7
        expect(processPayload('3', 7, '22-02-21')).toBe('2');
        expect(processPayload('0', 7, '22-02-21')).toBe('1');
    });
});