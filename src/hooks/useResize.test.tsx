import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useResize } from './useResize';

jest.mock('./useIsomorphicLayoutEffect', () => ({
    useIsomorphicLayoutEffect: jest.requireActual('react').useEffect
}));

describe('useResize hook', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map: { [key: string]: any } = {};

    window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
    });

    window.removeEventListener = jest.fn(event => {
        delete map[event];
    });

    it('should debounce callback', async () => {
        const callback = jest.fn();
        renderHook(() => useResize(callback));

        act(() => {
            map.resize();
            map.resize();
            map.resize();
            map.resize();
            map.resize();
        });

        // Debounce not completed yet
        expect(callback).toHaveBeenCalledTimes(0);

        // Wait for debounce to complete
        await new Promise(resolve => setTimeout(resolve, 150));

        // Debounce completed and callback executed
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should clean up on unmount', () => {
        const callback = jest.fn();

        const { unmount } = renderHook(() => useResize(callback));

        unmount();
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
