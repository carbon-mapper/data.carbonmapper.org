import { useCallback, useMemo } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { debounce } from '@/utils/debounce';

export const useResize = (callback: () => void, time = 100) => {
    const handleResize = useCallback(
        () => callback(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const debouncedHandleResize = useMemo(() => debounce(handleResize, time), [handleResize, time]);

    useLayoutEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [debouncedHandleResize]);
};
