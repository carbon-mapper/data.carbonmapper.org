import classNames from 'classnames';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { formatCoordinates } from '@/utils/formatCoordinates';
import CountDisplay from '../CountDisplay/CountDisplay';
import styles from './SourcesListItem.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const SourceListItemSkeleton = () => (
    <li className={classNames('skeleton', styles.wrapper, 'is-skeleton')} aria-hidden>
        <div className={styles.inner}>
            <div className={styles.image}>
                <Skeleton className={styles.skeletonImage} />
            </div>
            <div className={styles.content}>
                <div style={{ position: 'relative' }}>
                    <div className={styles.hiddenContent}>
                        <span className={styles.title} aria-hidden='true'>
                            <br />
                        </span>
                        <span className={styles.coords} aria-hidden='true'>
                            {formatCoordinates([123, 132])}
                        </span>
                        <span className={styles.plumeCount}>Observations: 123</span>
                        <CountDisplay
                            count={100}
                            uncertainty={100}
                            label='Source Emission Rate (kg/hr)' // This doesn't get rendered. Can leave as is
                            className={styles.count}
                        />
                    </div>
                    <Skeleton count={2} containerClassName={styles.skeletonTextWrapper} />
                </div>
            </div>
        </div>
    </li>
);

export default memo(SourceListItemSkeleton);
