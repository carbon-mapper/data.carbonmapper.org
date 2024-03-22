import classNames from 'classnames';
import { memo, useEffect, useRef } from 'react';
import { useAddPlumeImages } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { setIntersectionObserver } from '@/utils/setIntersectionObserver';
import EmptyStateInfo from '@/components/atoms/EmptyStateInfo/EmptyStateInfo';
import SourcesListItem from '@/components/atoms/SourcesListItem/SourcesListItem';
import { MapTypes } from '@/components/organisms/Map/Map.types';
import { getLatestPlumeFromPlumeIds } from '@/components/organisms/SourceDetails/SourceDetails.utils';
import styles from './SourcesList.module.scss';

type Props = {
    items: MapTypes.MapboxFeature[];
    limit: number;
    getMoreItems: () => void;
    sorting: string;
    isReversed: boolean;
    onReset: () => void;
};

const SourcesList = ({ items, limit, getMoreItems, sorting, isReversed, onReset }: Props) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const observedRef = useRef<HTMLDivElement>(null);
    const addPlumeImages = useAddPlumeImages();

    const observed = observedRef.current;
    const wrapper = wrapperRef.current;

    const itemCount = items.length;

    // reconsider if this is the correct place to put this
    useEffect(() => {
        wrapper?.scrollTo(0, 0);
        onReset();
    }, [itemCount, wrapper, sorting, isReversed, onReset]);

    useEffect(() => {
        if (!observed || !wrapper) return;

        setIntersectionObserver(
            isIntersecting => {
                isIntersecting && getMoreItems();
            },
            observed,
            {
                root: wrapper,
                rootMargin: '0%',
                threshold: 0.5
            }
        );
    }, [observed, wrapper, getMoreItems]);

    useEffect(() => {
        const newItems = items.slice(0, limit);
        const latestPlumes = newItems
            .map(item => getLatestPlumeFromPlumeIds(item.properties.plume_ids))
            .filter((id): id is string => typeof id === 'string');

        addPlumeImages(latestPlumes);
    }, [items, limit, addPlumeImages]);

    return (
        <div className={classNames(styles.wrapper)} ref={wrapperRef}>
            <ul className={styles.list}>
                {items.slice(0, limit).map(item => (
                    <SourcesListItem key={item.id} sorting={sorting} isReversed={isReversed} source={item} />
                ))}

                <div ref={observedRef} style={{ height: '20px' }} />

                {/* This should probabaly be outside the UL */}
                {!items.length && (
                    <li>
                        <EmptyStateInfo
                            title='No sources available in this area'
                            text='Check another place or click the reset to global view button'
                            isTiny
                            className={styles.empty}
                        />
                    </li>
                )}
            </ul>

            <div className={styles.bg}></div>
        </div>
    );
};

export default memo(SourcesList);
