import { gsap } from 'gsap';
import { useEffect, useRef, memo } from 'react';
import { useIsPageLoaded } from '@/store/useGlobalStore/useGlobalStore';
// import { SECRETS } from '@/utils/secrets';
import Logo from '@/components/atoms/Logo/Logo';
import styles from './Loader.module.scss';

const Loader = () => {
    const isPageLoaded = useIsPageLoaded();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const countRef = useRef<HTMLDivElement>(null);

    const noLoader = true; //SECRETS.isDevelopment;

    useEffect(() => {
        const inner = innerRef.current;
        const count = countRef.current;

        if (!inner || !count) return;

        const tl = gsap.timeline();

        tl.fromTo(
            count,
            { textContent: 0 },
            { textContent: 97, duration: 15, ease: 'power2', snap: { textContent: 1 }, stagger: 1, delay: 0.5 }
        );

        return () => {
            gsap.killTweensOf([count, inner]);
        };
    }, []);

    useEffect(() => {
        if (noLoader) {
            document.body.classList.add('is-loaded');
        }

        if (!isPageLoaded) return;

        const inner = innerRef.current;
        const count = countRef.current;
        const wrapper = wrapperRef.current;

        if (!inner || !count || !wrapper) return;

        document.body.classList.add('is-loaded');

        const tl = gsap.timeline();

        gsap.killTweensOf([count, inner, wrapper]);

        tl.to(count, {
            textContent: 100,
            duration: 1.25,
            ease: 'power2',
            snap: { textContent: 1 },
            stagger: 1,
            delay: 0.5
        })
            .to(inner, { opacity: 0, duration: 0.6, ease: 'custom', delay: 0.15 })
            .to(wrapper, { yPercent: 100, duration: 0.75, ease: 'custom' });
    }, [isPageLoaded, noLoader]);

    if (noLoader) return null;

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.inner} ref={innerRef}>
                <div className={styles.count} aria-hidden>
                    <span ref={countRef}>100</span>%
                </div>
                <div className={styles.line}></div>
                <span className={styles.info}>
                    Loading methane and CO2 point source emissions from around the globe
                </span>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </div>
        </div>
    );
};

export default memo(Loader);
