import { useEffect } from 'react';
import { useFilterStore } from '@/store/useFilterStore/useFilterStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useFilteredPlume } from '@/hooks/search/useFilteredPlume';
import { useFilteredSource } from '@/hooks/search/useFilteredSource';
import { useAPIFilteredSourceData } from '@/hooks/useSourceData';
import { useLocation } from '@/utils/geocoding';
import LivesearchDropdownItem from '@/components/atoms/LivesearchDropdownItem/LivesearchDropdownItem';
import type { LivesearchDropdownTypes } from './LivesearchDropdownList.types';
import { normalizeStringCoordinates, toFixed } from '../../../utils/coordinateTooling';
import { searchPhraseFilter } from './searchPhraseFilter';
import styles from './LivesearchDropdownList.module.scss';

const LivesearchDropdownList = ({ searchInput, callback }: LivesearchDropdownTypes.Props) => {
    const filtersView = useFilterStore(state => state.view);
    const setFiltersView = useFilterStore(state => state.setView);
    const { setLeftPanel } = usePanelActions();

    // load main source data (slightly filtered)
    // This is fine technically but i'm not sure it is the behavior we want
    const { data: mainSourceData } = useAPIFilteredSourceData();

    // determine search phrase type and pass value to the correct handler
    const { type: inputType, value: phrase } = searchPhraseFilter(searchInput);

    // plume and source search from geojson
    const filteredPlume = useFilteredPlume(mainSourceData, inputType === 'plume' ? phrase : '');
    const filteredSource = useFilteredSource(mainSourceData, inputType === 'source' ? phrase : '');

    // coordinates from search input
    const coordinates = normalizeStringCoordinates(phrase);

    // location name search via mapbox api
    const { locationData } = useLocation(inputType === 'location' ? phrase : '');

    useEffect(() => {
        if (!coordinates && !locationData && !filteredPlume && !filteredSource) return;

        setLeftPanel('filters');
        setFiltersView('main');
    }, [filtersView, coordinates, locationData, filteredPlume, filteredSource, setLeftPanel, setFiltersView]);

    const renderedVariant = (phrase: 'plume' | 'source' | 'coordinates' | 'location') => {
        switch (phrase) {
            case 'plume':
                return filteredPlume
                    ?.slice(0, 10)
                    .map(({ name, center, bbox, id, source_id: sourceName }) => (
                        <LivesearchDropdownItem
                            key={name}
                            location={{ name, center, bbox, id }}
                            callback={callback}
                            type={inputType}
                            sourceName={sourceName || ''}
                        />
                    ));
            case 'source':
                return filteredSource
                    ?.slice(0, 10)
                    .map(({ name, center, bbox, id, source_id: sourceName }) => (
                        <LivesearchDropdownItem
                            key={name}
                            location={{ name, center, bbox, id }}
                            callback={callback}
                            type={inputType}
                            sourceName={sourceName || ''}
                        />
                    ));
            case 'location':
                return locationData?.map(({ name, center, bbox, id }) => (
                    <LivesearchDropdownItem
                        key={name}
                        location={{ name, center, bbox, id }}
                        callback={callback}
                        type={inputType}
                        sourceName={''}
                    />
                ));
            case 'coordinates':
                if (!coordinates) return;

                const [trimmedLatitude, trimmedLongitude] = Object.values(coordinates).map(coordinate =>
                    toFixed(coordinate, 6)
                );

                return (
                    <>
                        <LivesearchDropdownItem
                            key={trimmedLatitude.toString()}
                            location={{
                                name: `Lat: ${trimmedLatitude}, Lon: ${trimmedLongitude}`,
                                center: [trimmedLongitude as number, trimmedLatitude as number],
                                bbox: null,
                                id: ''
                            }}
                            callback={callback}
                            type={'coordinates'}
                            sourceName={''}
                        />

                        {Math.abs(trimmedLongitude) <= 90 && (
                            <LivesearchDropdownItem
                                key={trimmedLongitude.toString() + 'reverse'}
                                location={{
                                    name: `Lat: ${trimmedLongitude}, Lon: ${trimmedLatitude}`,
                                    center: [trimmedLatitude as number, trimmedLongitude as number],
                                    bbox: null,
                                    id: ''
                                }}
                                callback={callback}
                                type={'coordinates'}
                                sourceName={''}
                            />
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return <ul className={styles.wrapper}>{renderedVariant(inputType)}</ul>;
};

export default LivesearchDropdownList;
