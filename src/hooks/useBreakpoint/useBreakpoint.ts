import { gsap } from 'gsap';
import { useState } from 'react';
import { SIZES } from '@/utils/globals';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../useIsomorphicLayoutEffect';

type Breakpoint = 'desktop' | 'mobile' | null;

export const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(null);

    useLayoutEffect(() => {
        const matchMedia = gsap.matchMedia();

        matchMedia
            .add(`(min-width: ${SIZES.desktop}px)`, () => {
                setBreakpoint('desktop');
            })
            .add(`(max-width: ${SIZES.mobile}px)`, () => {
                setBreakpoint('mobile');
            });
    }, []);

    return breakpoint;
};
