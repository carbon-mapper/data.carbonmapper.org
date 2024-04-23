import { RefObject, useEffect, useState, useCallback } from 'react'
import { debounce } from '@/utils/debounce';

export type Size = {
    width: number;
    height: number;
}

export const useSize = (ref: RefObject<HTMLElement>, isBlocked?: boolean) => {

    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    const handleSize = () => {

        const wrapper = ref.current;

        if (!wrapper) {
            return;
        }

        const { width, height } = wrapper.getBoundingClientRect();

        setSize({
            width,
            height
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onResize = useCallback(() => debounce(handleSize), []);

    useEffect(() => {

        handleSize();

        !isBlocked && window.addEventListener('resize', onResize);

        return () => {
            !isBlocked && window.removeEventListener('resize', onResize);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return size;

}
