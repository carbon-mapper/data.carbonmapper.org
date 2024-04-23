import classNames from 'classnames';
import type { MouseEvent } from 'react';
import type { FiltersLocation } from '@/store/useFilterStore/useFilterStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { trackSourceSelectEvent, trackSearchSubmitEvent } from '@/hooks/useGTM';
import { useFitBounds, useFlyTo } from '@/hooks/useMapMovements';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
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
    const [params, setParams] = usePortalQueryParams();
    const fitBounds = useFitBounds();
    const flyTo = useFlyTo();
    const setSearchedPlume = useSourceDetailsSlice(state => state.setSearchedPlume);

    const onOpenSourceDetail = useOpenSourceDetailsHandler();

    const onPlumeItemClick = () => {
        location.center && flyTo({ center: location.center, zoom: 15, sourceDetailPadding: true });

        location.name && setSearchedPlume(location.name);
        onOpenSourceDetail(sourceName);
        trackSourceSelectEvent('search_dropdown_click_plume', sourceName);
    };

    const onSourceItemClick = () => {
        location.center && flyTo({ center: location.center, zoom: 15, sourceDetailPadding: true });

        onOpenSourceDetail(sourceName);
        trackSourceSelectEvent('search_dropdown_click_source', sourceName);
    };

    const onLocationItemClick = () => {
        const { bbox: bounds, center } = location;

        if (bounds) {
            fitBounds(bounds); // was fitBounds(bounds, 20) but idk what 20 is; Maybe padding
        } else if (center) {
            flyTo({ center, zoom: 14 });
        }

        // Also unset coordinates
        setParams({ location: location.name, coordinates: undefined });
        trackSearchSubmitEvent('search_dropdown_click_location', { ...params, location: location.name });
    };

    const onCoordinatesItemClick = () => {
        const { center } = location;

        if (!center) return;

        flyTo({ center, zoom: 16 });

        // Also unset location
        const [lon, lat] = center;
        setParams({ coordinates: { lat, lon }, location: undefined });
        trackSearchSubmitEvent('search_dropdown_click_coordinates', { ...params, coordinates: { lat, lon } });
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

        setLeftPanel(null);
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
