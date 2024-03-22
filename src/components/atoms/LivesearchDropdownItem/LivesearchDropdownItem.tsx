import classNames from 'classnames';
import type { MouseEvent } from 'react';
import type { FiltersLocation } from '@/store/useFilterStore/useFilterStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useTrackedPortalQueryParams } from '@/hooks/useTrackedPortalQueryParams';
import { useOpenSourceDetailsHandler } from '@/components/organisms/SourceDetails/useCloseSourceDetails';
import styles from './LivesearchDropdownItem.module.scss';

type Props = {
    location: FiltersLocation;
    type: 'coordinates' | 'location' | 'plume' | 'source';
    sourceName: string;
    callback: () => void;
};

const LivesearchDropdownItem = ({ location, callback, type, sourceName }: Props) => {
    const { setLeftPanel } = usePanelActions();
    const [, setParams] = useTrackedPortalQueryParams();
    const map = useMapSlice(state => state.map);
    const fitBounds = useMapSlice(state => state.fitBounds);
    const flyTo = useMapSlice(state => state.flyTo);

    const { setActivePlume } = useSourceDetailsSlice();
    const onOpenSourceDetail = useOpenSourceDetailsHandler();

    const onPlumeItemClick = () => {
        location.center && flyTo(location.center, 15, true);

        setActivePlume(location.name);
        // TODO: merge - commenting this out for now
        // setSourceTrigger('search_dropdown_click');
        onOpenSourceDetail(sourceName);
    };

    const onSourceItemClick = () => {
        location.center && flyTo(location.center, 15, true);

        // TODO: merge - commenting this out for now
        // setSourceTrigger('search_dropdown_click');
        onOpenSourceDetail(sourceName);
    };

    // TODO:  What is this? Not used anywhere
    // Something to do with tracking, I'll revisit all tracking code at some
    // point
    const onMoveEnd = () => {
        setTimeout(() => {
            // TODO: merge - commenting this out for now
            // setTrackingSearchImpression();
        }, 1000);
        map && map.off('moveend', onMoveEnd);
    };

    const onLocationItemClick = () => {
        const { bbox: bounds, center } = location;

        if (bounds) {
            fitBounds(bounds, 20);
        } else if (center) {
            flyTo(center, 14);
        }

        // Also unset coordinates
        setParams({ location: location.name, coordinates: undefined });
    };

    const onCoordinatesItemClick = () => {
        const { center } = location;

        if (!map || !center) return;

        flyTo(center, 16);

        // Also unset location
        setParams({ coordinates: { lat: center[1], lon: center[0] }, location: undefined });
    };

    const onClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        switch (type) {
            case 'plume':
                onPlumeItemClick();
                break;
            case 'source':
                onSourceItemClick();
                break;
            case 'location':
                onLocationItemClick();
                break;
            case 'coordinates':
                onCoordinatesItemClick();
                break;
        }

        setLeftPanel('filters');
        callback();
    };

    return (
        <li
            className={classNames('livesearch-dropdown-item', styles.wrapper)}
            data-testid='livesearch-dropdown-item'
            data-cy-id='livesearch-result'
        >
            <button onClick={onClick}>{location.name}</button>
        </li>
    );
};

export default LivesearchDropdownItem;
