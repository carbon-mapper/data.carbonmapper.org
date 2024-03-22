import classNames from 'classnames';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import type { DashboardPanelItemTypes } from './DashboardPanelItem.types';
import styles from './DashboardPanelItem.module.scss';

const DashboardPanelItem = ({
    children,
    direction,
    gap,
    position,
    isHiddenInDetailsView,
    isDetailsViewOnly,
    isOffsetInDetailsView
}: DashboardPanelItemTypes.Props) => {
    const [{ details }] = usePortalQueryParams();
    const isDetailsOpen = typeof details === 'string';

    const className = classNames(styles.item, `is-${position}`, {
        [styles.noTransition]: isDetailsViewOnly,
        [styles.isHidden]: (isHiddenInDetailsView && isDetailsOpen) || (isDetailsViewOnly && !isDetailsOpen),
        [styles.isOffset]: isOffsetInDetailsView && isDetailsOpen
    });

    const innerClassName = classNames(
        styles.inner,
        { [`is-${direction}`]: Boolean(direction) },
        { [`is-gap-${gap}`]: Boolean(gap) }
    );

    return (
        <div className={className}>
            <div className={innerClassName}>{children}</div>
        </div>
    );
};

export default DashboardPanelItem;
