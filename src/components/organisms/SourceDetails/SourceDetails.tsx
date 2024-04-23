import { SourceDataTypes } from '@/types/api/source.types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { trackEvent } from '@/hooks/useGTM';
import { useFitBounds } from '@/hooks/useMapMovements';
import { usePortalQueryParams, getSelectedInstrumentKeys } from '@/utils/usePortalQueryParams';
import SourceDetailsSupportingTab from '@/components/atoms/SourceDetailsSupportingTab/SourceDetailsSupportingTab';
import SourceDetailsFooter from '@/components/molecules/SourceDetailsFooter/SourceDetailsFooter';
import SourceDetailsHeader from '@/components/molecules/SourceDetailsHeader/SourceDetailsHeader';
import { useSourceByNameData } from '@/components/organisms/Map/hooks/useSourceByNameData';
import SourceDetailsObservationsTab from '@/components/organisms/SourceDetailsObservationsTab/SourceDetailsObservationsTab';
import SourceDetailsSkeleton from './SourceDetails.skeleton';
import { useDetailsData, useLocationData, getLocationDetails } from './SourceDetails.utils';
import { useCloseSourceDetailsHandler, useHandleSourceDetailClose } from './useCloseSourceDetails';
import { getAnimationType } from '@/animations/framer';
import styles from './SourceDetails.module.scss';

const getLatestPlume = (plumes: SourceDataTypes.Plume[]) => {
    const sortedBySceneTimestamp = [...plumes].sort((a, b) => (a.scene_timestamp > b.scene_timestamp ? -1 : 1));

    return sortedBySceneTimestamp.at(0);
};

const SourceDetails = () => {
    const onCloseSourceDetail = useCloseSourceDetailsHandler();
    const setHoveredPlumeId = useSourceDetailsSlice(state => state.setHoveredPlumeId);

    const [{ instrument, details: currentSourceId }] = usePortalQueryParams();
    const isDetailsOpen = typeof currentSourceId === 'string';
    const selectedInstruments = getSelectedInstrumentKeys(instrument);
    const setActivePlume = useSourceDetailsSlice(state => state.setActivePlume);
    const searchedPlume = useSourceDetailsSlice(state => state.searchedPlume);
    const fitBounds = useFitBounds();

    const { data, isError, isLoading } = useSourceByNameData(currentSourceId ?? null);
    const { point, plumes, scenes, sourceInfo } = useDetailsData(data); // Seems like unnecessary data manipulation
    // TODO: refactor this
    const { locationData, isLoading: isLocationDataLoading } = useLocationData(point?.coordinates as [number, number]);
    const { city, district, region, country } = getLocationDetails(locationData);

    useEffect(() => {
        if (plumes === null || plumes.length < 1) return;

        const defaultPlume = searchedPlume
            ? plumes.find(({ plume_id }) => plume_id === searchedPlume)
            : getLatestPlume(plumes);
        if (defaultPlume === undefined) return;

        setActivePlume({
            id: defaultPlume.id,
            bounds: defaultPlume.plume_bounds,
            coordinates: defaultPlume.geometry_json.coordinates,
            sceneID: defaultPlume.scene_id
        });

        // plume_bounds may be undefined. Type doesn't match potential data
        defaultPlume.plume_bounds && fitBounds(defaultPlume.plume_bounds, { sourceDetailPadding: true });
    }, [plumes, fitBounds, searchedPlume, setActivePlume]);

    // Consider moving this to a component that is always rendered/mounted
    // Right now, Source details qualifies, but it may not always
    useHandleSourceDetailClose();

    /*
     * Hide Details View on Error
     * ToDo: Revisit: Would rather show an error to the user
     */
    useEffect(() => {
        if (isError) onCloseSourceDetail();
    }, [isError, onCloseSourceDetail]);

    /*
     * Handle side effects on source details open
     * ToDo: Revisit - This shouldn't be necessary
     */
    useEffect(() => {
        setHoveredPlumeId(null);
    }, [setHoveredPlumeId]);

    // Will produce a new array and reference every render meaning the following useEffect will run a lot?
    const filteredPlumes = plumes?.filter(({ instrument }) => selectedInstruments.includes(instrument));

    const animation = getAnimationType('details');

    /**
     * Track Source Details Impression - the data user sees when they open the details view
     */
    useEffect(() => {
        if (!isDetailsOpen || isLoading || isLocationDataLoading) {
            return;
        }

        const sourceLocation = `${city}, ${district}, ${region}, ${country}`;
        const dateTime = filteredPlumes ? new Date(filteredPlumes[0].scene_timestamp) : null;

        trackEvent({
            event: 'source',
            event_name: 'source_impression',
            sourceName: sourceInfo?.name,
            sourceLocation,
            sourceLatestAcquiredDate: dateTime ? dateTime.toDateString() : '',
            sector: sourceInfo?.sector,
            gasType: sourceInfo?.gas,
            plumeCount: filteredPlumes ? filteredPlumes.length : 0,
            sourceEmissionRate: sourceInfo?.emissions,
            sourceEmissionVariance: sourceInfo?.uncertainty
        });
        // This should only run when the source details open, data and location data are loaded
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDetailsOpen, isLoading, isLocationDataLoading]);

    return (
        <AnimatePresence>
            {isDetailsOpen && (
                <motion.article className={styles.container} {...animation}>
                    {isLoading && <SourceDetailsSkeleton />}
                    {/* Should refactor this to use a RemoteData Component */}
                    <SourceDetailsHeader
                        coordinates={point?.coordinates as [number, number]}
                        city={city}
                        district={district}
                        region={region}
                        country={country}
                        sourceInfo={sourceInfo}
                    />
                    <div className={styles.tabs}>
                        <SourceDetailsObservationsTab
                            plumes={filteredPlumes || []}
                            scenes={scenes || []}
                            emissions={sourceInfo?.emissions || 0}
                            uncertainty={sourceInfo?.uncertainty || 0}
                            persistence={sourceInfo?.persistence || 0}
                            gas={sourceInfo?.gas || ''}
                            sourceCoordinates={data?.point.coordinates}
                        />
                        <SourceDetailsSupportingTab
                            plumes={plumes || []}
                            scenes={scenes || []}
                            sector={sourceInfo?.sector || ''}
                            emissions={sourceInfo?.emissions || 0}
                            gas={sourceInfo?.gas || ''}
                            numDetectedDays={data?.detection_dates?.length}
                            numObservedDays={data?.observation_dates?.length}
                        />
                    </div>
                    <SourceDetailsFooter
                        plumeTifs={filteredPlumes ? [...filteredPlumes.map(plume => plume.plume_tif)] : []}
                    />
                </motion.article>
            )}
        </AnimatePresence>
    );
};

export default SourceDetails;
