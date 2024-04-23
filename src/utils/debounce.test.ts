import { debounce } from './debounce';

describe('debounce', () => {
    jest.useFakeTimers();

    it('should execute the callback function after the specified delay', () => {
        const callback = jest.fn();
        const debouncedFn = debounce(callback, 500);

        debouncedFn('test');

        expect(callback).not.toBeCalled();

        jest.advanceTimersByTime(499);
        expect(callback).not.toBeCalled();

        jest.advanceTimersByTime(1);
        expect(callback).toBeCalledWith('test');
    });

    it('should execute the callback function only once if called multiple times within the delay', () => {
        const callback = jest.fn();
        const debouncedFn = debounce(callback, 500);

        debouncedFn('test-1');
        jest.advanceTimersByTime(100);

        debouncedFn('test-2');
        jest.advanceTimersByTime(300);

        debouncedFn('test-3');
        jest.advanceTimersByTime(500);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toBeCalledWith('test-3');
    });
});
