import classNames from 'classnames';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SourceDetails.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const SourceDetailsSkeleton = () => (
    <article className={classNames(styles.container, styles.skeleton)}>
        <Skeleton count={1} containerClassName={classNames(styles.skeletonWrapper, 'is-small')} className='is-medium' />
        <Skeleton count={1} containerClassName={classNames(styles.skeletonWrapper, 'is-big')} className='is-big' />
        <Skeleton count={3} containerClassName={classNames(styles.skeletonWrapper, 'is-small')} className='is-medium' />
        <Skeleton count={2} containerClassName={classNames(styles.skeletonWrapper, 'is-medium')} className='is-small' />
    </article>
)

export default memo(SourceDetailsSkeleton);