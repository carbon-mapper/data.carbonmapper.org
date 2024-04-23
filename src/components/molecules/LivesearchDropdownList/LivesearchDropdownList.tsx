import { FiltersLocation } from '@/store/useFilterStore/useFilterStore';
import { useUnboundedSources } from '@/hooks/useSourceData';
import { useLocation } from '@/utils/geocoding';
import LivesearchDropdownItem from '@/components/atoms/LivesearchDropdownItem/LivesearchDropdownItem';
import { MapTypes } from '@/components/organisms/Map/Map.types';
import type { LivesearchDropdownTypes } from './LivesearchDropdownList.types';
import { normalizeStringCoordinates, toFixed } from '../../../utils/coordinateTooling';
import { searchPhraseFilter } from './searchPhraseFilter';
import styles from './LivesearchDropdownList.module.scss';

const EmptyResults = ({ message }: { message: string }) => <div className={styles.emptyResults}>{message}</div>;

export const LivesearchDropdownList = ({ searchInput, callback }: LivesearchDropdownTypes.Props) => {
    const { data: unboundedData } = useUnboundedSources();

    // determine search phrase type and pass value to the correct handler
    const { type: inputType, value: phrase } = searchPhraseFilter(searchInput);

    // location name search via mapbox api
    const { locationData } = useLocation(inputType === 'location' ? phrase : '');

    const renderedVariant = (inputType: 'plume' | 'source' | 'coordinates' | 'location') => {
        switch (inputType) {
            case 'plume':
                const filteredPlumes = getMatchingPlumes(unboundedData, phrase);
                if (filteredPlumes.length === 0) return <EmptyResults message='No Matching Plumes' />;

                return filteredPlumes
                    .slice(0, 10)
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
                const filteredSources = getMatchingSources(unboundedData, phrase);
                if (filteredSources.length === 0) return <EmptyResults message='No Matching Sources' />;

                return filteredSources
                    .slice(0, 10)
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
                const coordinates = normalizeStringCoordinates(phrase);
                if (!coordinates) return <EmptyResults message='Invalid Coordinates' />;

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

    // ToDo: Could update this so that we only use <ul/> if we actually have a list of results
    return <ul className={styles.wrapper}>{renderedVariant(inputType)}</ul>;
};

// We may want to put these utils elsewhere
export const getMatchingPlumes = (sources: MapTypes.SourceData | undefined, searchInput: string): FiltersLocation[] => {
    if (sources === undefined) return [];

    const matchedPlumes: FiltersLocation[] = [];

    sources.features.forEach(feature => {
        feature.properties.plume_ids.forEach(id => {
            if (id.toLowerCase().includes(searchInput.toLowerCase())) {
                const plume: FiltersLocation = {
                    name: `${id}`,
                    id: `plume.${id}`,
                    source_id: feature.properties.source_name,
                    center: feature.geometry.coordinates,
                    bbox: null
                };
                matchedPlumes.push(plume);
            }
        });
    });

    return matchedPlumes;
};

export const getMatchingSources = (
    sources: MapTypes.SourceData | undefined,
    searchInput: string
): FiltersLocation[] => {
    if (sources === undefined) return [];

    const matchedSources: FiltersLocation[] = [];

    sources.features.forEach(feature => {
        const { source_name: sourceName } = feature.properties;
        const formatedSourceName = sourceName.split('?')[0];
        if (formatedSourceName.toLowerCase().includes(searchInput.toLowerCase())) {
            const Source: FiltersLocation = {
                name: `${formatedSourceName}`,
                id: `source.${formatedSourceName}`,
                source_id: feature.properties.source_name,
                center: feature.geometry.coordinates,
                bbox: null
            };
            matchedSources.push(Source);
        }
    });

    return matchedSources;
};
