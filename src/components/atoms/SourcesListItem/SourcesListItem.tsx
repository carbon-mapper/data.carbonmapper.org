import classNames from 'classnames';
import { memo, useState } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { usePlumeImageDictionary } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { getImgFromMapbox } from '@/utils/getImgFromMapbox';
import { toFixed } from '@/utils/math.utils';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import { MapTypes } from '@/components/organisms/Map/Map.types';
import {
    getLatestPlumeFromPlumeIds,
    useLocationData,
    useLocationDetails
} from '@/components/organisms/SourceDetails/SourceDetails.utils';
import { useOpenSourceDetailsHandler } from '@/components/organisms/SourceDetails/useCloseSourceDetails';
import CountDisplay from '../CountDisplay/CountDisplay';
import { addMapRasterSource } from '../MapMarkers/MapMarkers.utils';
import SourceImage from '../SourceImage/SourceImage';
import styles from './SourcesListItem.module.scss';

type SourcesListItemProps = {
    sorting: string;
    isReversed: boolean;
    source: MapTypes.MapboxFeature;
};

const SourcesListItem = ({ sorting, isReversed, source }: SourcesListItemProps) => {
    const { source_name: sourceName, plume_count: plumeCount, plume_ids: plumeIds, gas } = source.properties;

    // I'm not sure about doing this. We should just handle the data as is and not do this
    const emissions = source.properties.emission_auto ?? 0;
    const uncertainty = source.properties.emission_uncertainty_auto ?? 0;
    const dateMin = source.properties.timestamp_min ?? '';
    const dateMax = source.properties.timestamp_max ?? '';
    const publishedDateMin = source.properties.published_at_min ?? '';
    const publishedDateMax = source.properties.published_at_max ?? '';
    const coordinates = source.geometry.coordinates;

    const [isImageLoading, setIsImageLoading] = useState(true);
    const { setHoveredPlumeId, setActivePlume } = useSourceDetailsSlice(state => ({
        setActivePlume: state.setActivePlume,
        setHoveredPlumeId: state.setHoveredPlumeId
    }));
    const fitBounds = useMapSlice(state => state.fitBounds);
    const map = useMapSlice(state => state.map);
    const opacity = useMapLayersSlice(state => state.plumesOpacity);
    const onOpenSourceDetail = useOpenSourceDetailsHandler();
    const { setSourceTrigger, setLeftPanel } = usePanelActions();

    const latestPlumeId = getLatestPlumeFromPlumeIds(plumeIds);
    const plumeImageDict = usePlumeImageDictionary();
    const defaultSourcePlume = latestPlumeId && plumeImageDict[latestPlumeId];

    const { locationData, isLoading: isLocationDataLoading } = useLocationData(coordinates);

    const { city, region, country } = useLocationDetails(locationData, isLocationDataLoading);
    const [longitude, latitude] = coordinates;

    const name = region !== 'N/A' ? `${city} , ${region}, ${country}` : `${city}, ${country}`;

    const onClick = async () => {
        // Same handler as the MapMarker
        setHoveredPlumeId(null);
        setLeftPanel(null);
        setSourceTrigger('source_panel_click');
        onOpenSourceDetail(sourceName);

        if (defaultSourcePlume !== undefined && typeof defaultSourcePlume !== 'string' && latestPlumeId) {
            // Different fit than clicking on the plume in the source plume list....but that is current prod behavior too
            fitBounds(defaultSourcePlume.bounds, 'details');

            const defaultActivePlume = {
                id: defaultSourcePlume.id,
                layerID: `plume-${defaultSourcePlume.id}`,
                coordinates: defaultSourcePlume.coordinates,
                sceneID: defaultSourcePlume.sceneId,
                bounds: defaultSourcePlume.bounds
            };
            setActivePlume(defaultActivePlume);

            const plumeImageObject = {
                plumeBounds: defaultSourcePlume.bounds,
                plumeUrl: defaultSourcePlume.url,
                plumeId: defaultSourcePlume.id
            };
            addMapRasterSource(map, plumeImageObject, { opacity });
        } else {
            // For smoother UX purposes we could try to zoom to the source here
            // Only necessary if the plume data didn't load yet which is rare
        }
    };

    const onMouseEnterHandler = () => {
        latestPlumeId && setHoveredPlumeId(latestPlumeId);
    };
    const onMouseLeaveHandler = () => {
        setHoveredPlumeId(null);
    };

    const formatDate = (stringDate: string) => {
        const [year, month, day] = stringDate.split('-');
        return `${month}-${day}-${year}`;
    };

    const additionalInfo = () => {
        /* depending on the sorting display the corresponding info */

        switch (sorting) {
            case 'time-desc':
                return !isReversed ? (
                    <p className={styles.date}>Latest Acquired: {formatDate(dateMax)}</p>
                ) : (
                    <p className={styles.date}>Oldest Acquired: {formatDate(dateMin)}</p>
                );

            case 'time-published-desc':
                return !isReversed ? (
                    <p className={styles.date}>Latest Published: {formatDate(publishedDateMax)}</p>
                ) : (
                    <p className={styles.date}>Oldest Published: {formatDate(publishedDateMin)}</p>
                );

            default:
                return <p className={styles.date}>Latest Acquired: {formatDate(dateMax)}</p>;
        }
    };
    return (
        <>
            <li
                className={classNames(styles.wrapper, {
                    'is-loading': isLocationDataLoading || isImageLoading
                })}
            >
                <Button
                    ariaLabel={`Show Source Details (${name})`}
                    className={styles.button}
                    onClick={onClick}
                    onMouseEnter={onMouseEnterHandler}
                    onMouseLeave={onMouseLeaveHandler}
                />
                <div className={classNames('inner', styles.inner)}>
                    {typeof defaultSourcePlume === 'object' && (
                        <SourceImage
                            className={styles.image}
                            plume={defaultSourcePlume.url}
                            bg={getImgFromMapbox(defaultSourcePlume.bounds)}
                            onLoadingComplete={() => setIsImageLoading(false)}
                        />
                    )}

                    <div className={styles.content}>
                        <p className={styles.title}>{name}</p>
                        <p className={styles.coords}>
                            {toFixed(latitude || 0, 5)}, {toFixed(longitude || 0, 5)}
                        </p>

                        {additionalInfo()}
                        <p className={styles.plumeCount}>Plumes: {plumeCount}</p>
                        <CountDisplay
                            count={emissions}
                            nonZero
                            uncertainty={uncertainty}
                            label={`Source Emission Rate (kg ${gas}/hr)`}
                            className={styles.count}
                        />
                    </div>
                </div>
            </li>
        </>
    );
};

export default memo(SourcesListItem);
