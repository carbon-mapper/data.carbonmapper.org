import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useFilterStore } from '@/store/useFilterStore/useFilterStore';
import type { FiltersViewItem } from './FiltersViewItem.types';
import BlurredBackground from '../BlurredBackground/BlurredBackground';
import styles from './FiltersViewItem.module.scss';

const FiltersViewItem = ({ id, type, children, bg, fill, noPadding }: FiltersViewItem.Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const setLivesearchItemsWrapperElement = useFilterStore(state => state.setLivesearchItemsWrapper);

    const className = classNames(
        styles.wrapper,
        `is-${type}`,
        { 'is-fill': fill },
        { 'is-blur': bg === 'blur' },
        { 'is-white': bg === 'white' },
        { 'no-padding': noPadding }
    );

    useEffect(() => {
        if (type !== 'livesearch') return;

        const element = ref.current;
        element && setLivesearchItemsWrapperElement(element);

        return () => {
            setLivesearchItemsWrapperElement(null);
        };
    }, [type, setLivesearchItemsWrapperElement]);

    return (
        <div className={className} id={id} ref={ref}>
            {bg === 'blur' && <BlurredBackground />}
            {children}
        </div>
    );
};

export default FiltersViewItem;
