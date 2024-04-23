import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useAddPlumeImages, usePlumeImageDictionary } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { trackSourceSelectEvent } from '@/hooks/useGTM';
import { useZoomToSource } from '@/hooks/useMapMovements';
import { getImgFromMapbox } from '@/utils/getImgFromMapbox';
import { toFixed } from '@/utils/math.utils';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import { MapTypes } from '@/components/organisms/Map/Map.types';
import {
    getLatestPlumeFromPlumeIds,
    getLocationDisplay,
    useLocationData
} from '@/components/organisms/SourceDetails/SourceDetails.utils';
import { useOpenSourceDetailsHandler } from '@/components/organisms/SourceDetails/useCloseSourceDetails';
import CountDisplay, { EmissionsDisplay } from '../CountDisplay/CountDisplay';
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
    const { setHoveredPlumeId } = useSourceDetailsSlice(state => ({
        setActivePlume: state.setActivePlume,
        setHoveredPlumeId: state.setHoveredPlumeId
    }));
    const onOpenSourceDetail = useOpenSourceDetailsHandler();
    const addPlumeImages = useAddPlumeImages();
    const { setLeftPanel } = usePanelActions();
    const zoomToSource = useZoomToSource();

    const latestPlumeId = getLatestPlumeFromPlumeIds(plumeIds);
    const plumeImageDict = usePlumeImageDictionary();
    const defaultSourcePlume = latestPlumeId && plumeImageDict[latestPlumeId];

    const { locationData, isLoading: isLocationDataLoading } = useLocationData(coordinates);

    const locationName = getLocationDisplay(locationData, isLocationDataLoading);
    const [longitude, latitude] = coordinates;

    const onClick = async () => {
        setHoveredPlumeId(null);
        setLeftPanel(null);
        trackSourceSelectEvent('source_panel_click', sourceName);
        onOpenSourceDetail(sourceName);
        zoomToSource(coordinates);
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

    useEffect(() => {
        const latestPlume = getLatestPlumeFromPlumeIds(source.properties.plume_ids);

        if (latestPlume) addPlumeImages([latestPlume]);
    }, [source, addPlumeImages]);

    return (
        <li
            className={classNames(styles.wrapper, {
                'is-loading': isLocationDataLoading || isImageLoading
            })}
        >
            <Button
                ariaLabel={`Show Source Details (${locationName})`}
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
                    <p className={styles.title}>{locationName}</p>
                    <p className={styles.coords}>
                        {toFixed(latitude || 0, 5)}, {toFixed(longitude || 0, 5)}
                    </p>

                    {additionalInfo()}
                    <p className={styles.plumeCount}>Plumes: {plumeCount}</p>
                    <EmissionsDisplay
                        count={emissions}
                        nonZero
                        uncertainty={uncertainty}
                        labelPrefix='Source Emission Rate'
                        className={styles.count}
                        gas={gas}
                    />
                </div>
            </div>
        </li>
    );
};

export default memo(SourcesListItem);
