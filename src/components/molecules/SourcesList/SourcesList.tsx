import classNames from 'classnames';
import { forwardRef, memo, useEffect, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import EmptyStateInfo from '@/components/atoms/EmptyStateInfo/EmptyStateInfo';
import SourcesListItem from '@/components/atoms/SourcesListItem/SourcesListItem';
import { MapTypes } from '@/components/organisms/Map/Map.types';
import styles from './SourcesList.module.scss';

type SourcesListProps = {
    sources: MapTypes.MapboxFeature[];
    sorting: string;
    isReversed: boolean;
    isLoading: boolean;
};

// eslint-disable-next-line react/display-name
const List = forwardRef<HTMLUListElement>((props, ref) => {
    return <ul {...props} ref={ref} />;
});

const SourcesList = ({ sources, sorting, isReversed, isLoading }: SourcesListProps) => {
    const virtuoso = useRef<VirtuosoHandle>(null);

    // Reset list scroll when sources change
    useEffect(() => virtuoso.current?.scrollToIndex({ index: 0 }), [sources]);

    const hasSomeSources = sources.length > 0;

    return (
        <div className={classNames(styles.wrapper)}>
            {!isLoading && hasSomeSources && (
                <Virtuoso
                    ref={virtuoso}
                    className={styles.list}
                    totalCount={sources.length}
                    // @ts-ignore - https://github.com/petyosi/react-virtuoso/issues/864
                    components={{ List }}
                    itemContent={index => {
                        const item = sources[index];

                        return (
                            <SourcesListItem key={item.id} sorting={sorting} isReversed={isReversed} source={item} />
                        );
                    }}
                />
            )}
            {!isLoading && !hasSomeSources && (
                <EmptyStateInfo
                    title='No sources available in this area'
                    text='Check another place or click the reset to global view button'
                    isTiny
                    className={styles.empty}
                />
            )}
            {isLoading && <EmptyStateInfo title='Loading Sources...' isTiny className={styles.empty} />}
        </div>
    );
};

export default memo(SourcesList);
