import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo } from 'react';
import { useRightPanel, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { trackEvent } from '@/hooks/useGTM';
import { useSourcesInView } from '@/hooks/useSourceData';
import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';
import Select from '@/components/atoms/Select/Select';
import SourcesList from '@/components/molecules/SourcesList/SourcesList';
import { MapTypes } from '../Map/Map.types';
import { getAnimationType } from '@/animations/framer';
import styles from './Sources.module.scss';

export type SortOption = 'time-desc' | 'time-published-desc' | 'emission-desc';

// WARNING: Sorts in-place. Can return a new array if necessary
const sortSources = (sources: MapTypes.MapboxFeature[], sort: SortOption, isReversed: boolean) => {
    switch (sort) {
        case 'time-desc': {
            sources.sort((a, b) => {
                // Revisit
                const dateMinA = a.properties.timestamp_min ?? '';
                const dateMaxA = a.properties.timestamp_max ?? '';
                const dateMinB = b.properties.timestamp_min ?? '';
                const dateMaxB = b.properties.timestamp_max ?? '';
                // Unique keys are necessary for consistent sorting
                const aSortKey = isReversed ? `${dateMinA}-${a.id}` : `${dateMaxA}-${a.id}`;
                const bSortKey = isReversed ? `${dateMinB}-${b.id}` : `${dateMaxB}-${b.id}`;

                return isReversed ? (aSortKey < bSortKey ? -1 : 1) : aSortKey < bSortKey ? 1 : -1;
            });
            break;
        }
        case 'time-published-desc': {
            sources.sort((a, b) => {
                const publishedDateMinA = a.properties.published_at_min ?? '';
                const publishedDateMaxA = a.properties.published_at_max ?? '';
                const publishedDateMinB = b.properties.published_at_min ?? '';
                const publishedDateMaxB = b.properties.published_at_max ?? '';
                // Unique keys are necessary for consistent sorting
                const aSortKey = isReversed ? `${publishedDateMinA}-${a.id}` : `${publishedDateMaxA}-${a.id}`;
                const bSortKey = isReversed ? `${publishedDateMinB}-${b.id}` : `${publishedDateMaxB}-${b.id}`;

                return isReversed ? (aSortKey < bSortKey ? -1 : 1) : aSortKey < bSortKey ? 1 : -1;
            });
            break;
        }
        case 'emission-desc': {
            sources.sort((a, b) => {
                const aSortKey = a.properties.emission_auto;
                const bSortKey = b.properties.emission_auto;

                const isAValid = aSortKey !== null && aSortKey !== 0;
                const isBValid = bSortKey !== null && bSortKey !== 0;

                // Sort no-shows always at the bottom
                if (!isAValid && !isBValid) return 0;
                if (!isAValid) return 1;
                if (!isBValid) return -1;

                return isReversed ? (aSortKey < bSortKey ? -1 : 1) : aSortKey < bSortKey ? 1 : -1;
            });
            break;
        }

        default:
            console.error('Invalid sort type');
    }

    return sources;
};

const sortOptions: { value: SortOption; label: string }[] = [
    {
        value: 'time-desc',
        label: 'Date Acquired'
    },
    {
        value: 'time-published-desc',
        label: 'Date Published'
    },
    {
        value: 'emission-desc',
        label: 'Emission Rate'
    }
];

const Sources = () => {
    const { setRightPanel } = usePanelActions();
    const setIsUserClosed = useSourceDetailsSlice(state => state.setIsUserClosed);
    const animationVariant = getAnimationType('right');

    const [sort, setSort] = useState<SortOption>('time-desc');
    const [isReversed, setIsReversed] = useState<boolean>(false);

    const { data: sources, isLoading } = useSourcesInView();
    // Warning: This sorts in place
    const listItems = sortSources(sources?.features ?? [], sort, isReversed);

    const onClose = () => {
        setIsUserClosed(true);
        setRightPanel(null);
    };

    return (
        <motion.div className={styles.wrapper} {...animationVariant}>
            <div className={styles.header}>
                <span>Sources</span>

                <ButtonIcon
                    className={styles.closer}
                    icon='closer-big'
                    ariaLabel='Close Sources'
                    onClick={onClose}
                    options={{
                        transparent: true
                    }}
                />
            </div>
            <div className={styles.filters}>
                <Select
                    label='Sort by'
                    options={sortOptions}
                    current={sort}
                    onClick={value => {
                        trackEvent({
                            event: 'source',
                            event_name: 'source_sort',
                            sortType: sortOptions.filter(item => item.value === value)[0].label,
                            sortOrder: 'DESC'
                        });
                        setSort(value as SortOption);
                    }}
                    isReversed={isReversed}
                    onReverse={() => {
                        trackEvent({
                            event: 'source',
                            event_name: 'source_sort',
                            sortType: sortOptions.filter(item => item.value === sort)[0].label,
                            sortOrder: isReversed ? 'DESC' : 'ASC'
                        });
                        setIsReversed(!isReversed);
                    }}
                />
            </div>
            <SourcesList sorting={sort} isReversed={isReversed} sources={listItems} isLoading={isLoading} />
        </motion.div>
    );
};

/*
 * TODO: clean this up, moved this out to kill this component when not visible, framer has to be OUTSIDE
 */

function SourcesWrapper() {
    return <AnimatePresence>{useRightPanel() === 'sources' && <Sources />}</AnimatePresence>;
}

export default memo(SourcesWrapper);
