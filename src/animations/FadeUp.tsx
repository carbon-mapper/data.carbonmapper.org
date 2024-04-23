import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { AnimationsTypes } from './animations.types';

const FadeUp = ({ children, duration, selector, debug }: AnimationsTypes.Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        let elements: NodeListOf<HTMLElement> | HTMLElement[] = [ref.current];

        if (selector) {
            elements = elements[0].querySelectorAll(selector) ?? elements;
        }

        gsap.killTweensOf(elements);

        Array.from(elements).map(el => {
            gsap.fromTo(
                el,
                {
                    y: 60,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: duration ?? 0.75,
                    ease: 'power2.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        toggleActions: 'play',
                        markers: debug ?? false
                    }
                }
            );
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={ref}>{children}</div>;
};

export default FadeUp;
