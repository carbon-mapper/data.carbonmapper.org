import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { usePortalQueryParams, getSelectedInstrumentKeys } from '@/utils/usePortalQueryParams';
import { addMapRasterSource } from '@/components/atoms/MapMarkers/MapMarkers.utils';
import SourceDetailsSupportingTab from '@/components/atoms/SourceDetailsSupportingTab/SourceDetailsSupportingTab';
import SourceDetailsFooter from '@/components/molecules/SourceDetailsFooter/SourceDetailsFooter';
import SourceDetailsHeader from '@/components/molecules/SourceDetailsHeader/SourceDetailsHeader';
import { useSourceByNameData } from '@/components/organisms/Map/hooks/useSourceByNameData';
import SourceDetailsObservationsTab from '@/components/organisms/SourceDetailsObservationsTab/SourceDetailsObservationsTab';
import { useUpdateOverlays } from '../Map/hooks/useUpdateOverlays';
import { useUpdatePlumesVisibility } from '../Map/hooks/useUpdatePlumesVisibility';
import SourceDetailsSkeleton from './SourceDetails.skeleton';
import { getLatestPlumeFromPlumes, useDetailsData, useLocationData, useLocationDetails } from './SourceDetails.utils';
import { useCloseSourceDetailsHandler } from './useCloseSourceDetails';
import { getAnimationType } from '@/animations/framer';
import styles from './SourceDetails.module.scss';

const SourceDetails = () => {
    const map = useMapSlice(state => state.map);
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);
    const fitBounds = useMapSlice(state => state.fitBounds);
    const onCloseSourceDetail = useCloseSourceDetailsHandler();

    const activeBasemap = useMapLayersSlice(state => state.activeBasemap);
    const plumesOpacity = useMapLayersSlice(state => state.plumesOpacity);
    const overlayOpacity = useMapLayersSlice(state => state.overlayOpacity);

    const { activePlume, setSourcePlumeCount, setSourceObservationCount, setActivePlume, setHoveredPlumeId } =
        useSourceDetailsSlice(state => ({
            activePlume: state.activePlume,
            setSourcePlumeCount: state.setSourcePlumeCount,
            setSourceObservationCount: state.setSourceObservationCount,
            setActivePlume: state.setActivePlume,
            setHoveredPlumeId: state.setHoveredPlumeId
        }));

    const [{ instrument, details: currentSourceId }] = usePortalQueryParams();
    const isDetailsOpen = typeof currentSourceId === 'string';
    const selectedInstruments = getSelectedInstrumentKeys(instrument);

    const activePlumeLayerId =
        activePlume === null || typeof activePlume === 'string' ? undefined : activePlume.layerID;

    const { data, isError, isLoading } = useSourceByNameData(currentSourceId ?? null);
    const { point, plumes, scenes, sourceInfo } = useDetailsData(data); // Seems like unnecessary data manipulation
    // TODO: refactor this
    const { locationData, isLoading: isLocationDataLoading } = useLocationData(point?.coordinates as [number, number]);
    const { city, district, region, country } = useLocationDetails(locationData, isLocationDataLoading);

    /*
     * Set Default plume if one is not already set
     * Also covers a case where we only set activePlume to the plumeId and no the full activePlume object
     * Effect must guard against the component being "closed" but always rendered
     */
    useEffect(() => {
        if (
            plumes === null ||
            plumes.length === 0 ||
            (activePlume !== null && typeof activePlume === 'object') ||
            !isDetailsOpen ||
            !map ||
            !isMapLoaded
        )
            return;

        const defaultPlume =
            activePlume === null
                ? getLatestPlumeFromPlumes(plumes, ({ scene_timestamp }) => scene_timestamp)
                : plumes.find(plume => plume.plume_id === activePlume);

        if (defaultPlume === undefined) return;

        const defaultActivePlume = {
            id: defaultPlume.id,
            layerID: `plume-${defaultPlume.id}`,
            coordinates: defaultPlume.geometry_json.coordinates,
            sceneID: defaultPlume.scene_id,
            bounds: defaultPlume.plume_bounds
        };

        fitBounds(defaultPlume.plume_bounds, 'details');
        setActivePlume(defaultActivePlume);

        const plumeImageObject = {
            plumeBounds: defaultPlume.plume_bounds,
            plumeUrl: defaultPlume.plume_png,
            plumeId: defaultPlume.id
        };
        addMapRasterSource(map, plumeImageObject, { opacity: plumesOpacity });
        // Intentionally leaving out activePlume from the dependency array
        // This is terrible, but works until a later refactor
    }, [plumes, setActivePlume, fitBounds, isDetailsOpen, plumesOpacity, map, currentSourceId, isMapLoaded]);

    /*
     * Update plume layers visibility on active plume change
     */
    useUpdatePlumesVisibility();

    /*
     * Hide Details View on Error
     */

    useEffect(() => {
        if (isError) onCloseSourceDetail();
    }, [isError, onCloseSourceDetail]);

    /*
     * Update overlays on active overlay change
     */
    useUpdateOverlays();

    /*
     * Update overlays opacity
     */
    useEffect(() => {
        if (!map || !isMapLoaded) return;
        map.getLayer('raster-layer') && map.setPaintProperty('raster-layer', 'raster-opacity', overlayOpacity);
    }, [overlayOpacity, map, isMapLoaded]);

    /*
     * Update source plume and observation count on data change
     */
    useEffect(() => {
        setSourcePlumeCount(plumes?.length || 0);
        setSourceObservationCount(scenes?.length || 0);
    }, [setSourcePlumeCount, setSourceObservationCount, plumes, scenes]);

    /*
     * Handle side effects on source details open
     */
    useEffect(() => {
        setHoveredPlumeId(null);
    }, [setHoveredPlumeId]);

    /*
     * Restore active plume and scene on active basemap change
     */
    useEffect(() => {
        if (!map || !activePlumeLayerId) return;

        const currentPlume = plumes?.find(
            ({ id }) => id === activePlumeLayerId?.slice(activePlumeLayerId.indexOf('-') + 1)
        );

        if (!currentPlume) return;

        const { plume_bounds: bounds, id, geometry_json, scene_id } = currentPlume;

        const activePlume = {
            id: id,
            layerID: `plume-${id}`,
            coordinates: geometry_json.coordinates,
            sceneID: scene_id,
            bounds
        };

        map.once('style.load', () => {
            if (isDetailsOpen) {
                const plumeImageObject = {
                    plumeBounds: currentPlume.plume_bounds,
                    plumeUrl: currentPlume.plume_png,
                    plumeId: currentPlume.id
                };

                addMapRasterSource(map, plumeImageObject, { opacity: plumesOpacity, hidden: false });

                setActivePlume(activePlume);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, activeBasemap]);

    // Will produce a new array and reference every render meaning the following useEffect will run a lot?
    const filteredPlumes = plumes?.filter(({ instrument }) => selectedInstruments.includes(instrument));

    const animation = getAnimationType('details');

    // useEffect(() => {
    //     if (!isDetailsOpen) {
    //         return;
    //     }
    //     const sourceLocation = [
    //         ...(city ? [city] : []),
    //         ...(region ? [region] : []),
    //         ...(country ? [country] : [])
    //     ].join(', ');

    //     const dateTime = filteredPlumes ? new Date(filteredPlumes[0].scene_timestamp) : null;

    //     // TODO: merge - commenting this out for now
    //     // debouncedTrackEvent({
    //     //     event: 'source',
    //     //     event_name: 'source_select',
    //     //     source_select_type: sourceTrigger,
    //     //     sourceName: sourceInfo?.name,
    //     //     sourceLocation,
    //     //     sourceLatestAcquiredDate: dateTime ? dateTime.toDateString() : '',
    //     //     sector: sourceInfo && getSectorDisplayName(getSectorName(sourceInfo.sector) as SectorName),
    //     //     gasType: sourceInfo?.gas,
    //     //     plumeCount: filteredPlumes ? filteredPlumes.length : 0,
    //     //     sourceEmissionRate: sourceInfo?.emissions,
    //     //     sourceEmissionVariance: sourceInfo?.uncertainty
    //     // });
    // }, [isDetailsOpen, city, region, country]);

    return (
        <AnimatePresence>
            {isDetailsOpen && (
                <motion.article className={styles.container} {...animation}>
                    {isLoading && <SourceDetailsSkeleton />}
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
