import classNames from 'classnames';
import mapboxgl from 'mapbox-gl';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { usePlumeImageDictionary } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useGetSourceBySourceNameFromGeojson } from '@/hooks/useSourceData';
import { throttle } from '@/utils/throttle';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { addMapRasterSource } from '@/components/atoms/MapMarkers/MapMarkers.utils';
import { sourceConfig, layerIdMap } from '@/components/organisms/Map/Map.layers';
import { getLatestPlumeFromSourceFeature } from '@/components/organisms/SourceDetails/SourceDetails.utils';
import { useOpenSourceDetailsHandler } from '@/components/organisms/SourceDetails/useCloseSourceDetails';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import { MapMarkerTypes } from './MapMarkers.types';
import styles from './MapMarkers.module.scss';

const clusterMaxZoom = sourceConfig.main.options?.clusterMaxZoom;
const clusterClickStep = ((clusterMaxZoom || 11) + 1.1 - 1.2) / 4;

const Source = memo(function Marker({ sourceName, latestPlumeId, numberOfPlumes }: MapMarkerTypes.SourceMarkerProps) {
    const map = useMapSlice(state => state.map);
    const fitBounds = useMapSlice(state => state.fitBounds);
    const opacity = useMapLayersSlice(state => state.plumesOpacity);
    const { setLeftPanel } = usePanelActions();
    const setActivePlume = useSourceDetailsSlice(state => state.setActivePlume);
    const setHoveredPlumeId = useSourceDetailsSlice(state => state.setHoveredPlumeId);
    const plumeImageDict = usePlumeImageDictionary();
    const defaultSourcePlume = latestPlumeId && plumeImageDict[latestPlumeId];
    const onOpenSourceDetail = useOpenSourceDetailsHandler();

    // We could also just not do this
    const onClickHandler = () => {
        // Same handler as SourceListItem
        setHoveredPlumeId(null);
        // TODO: merge - commenting this out for now
        // setSourceTrigger('map_click');
        setLeftPanel(null);
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

    return (
        <button
            className={classNames(styles.source, 'tooltip-trigger', {
                [styles['co2']]: sourceName.includes('CO2')
            })}
            onClick={onClickHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            data-cy-id={`map-source-marker-${sourceName.slice(0, sourceName.indexOf('?'))}`}
        >
            <span className='sr-only'>show source in details view</span>

            <Tooltip position='right' inline text={`Plumes: ${numberOfPlumes}`} />
        </button>
    );
});

/*
 * Cluster Marker
 */

const Cluster = memo(function ClusterMarker({ longitude, latitude, pointCount }: MapMarkerTypes.ClusterMarkerProps) {
    const [{ details: currentSourceId }] = usePortalQueryParams();
    const increaseZoomOnCoordinates = useMapSlice(state => state.increaseZoomOnCoordinates);

    const className = classNames(styles.cluster, {
        [styles.small]: pointCount < 20,
        [styles.medium]: pointCount >= 20 && pointCount < 100,
        [styles.large]: pointCount >= 100 && pointCount < 500,
        [styles.huge]: pointCount >= 500
    });

    const onClick = () => increaseZoomOnCoordinates([longitude, latitude], clusterClickStep);

    return (
        <button
            className={classNames(className, { [styles.disabled]: typeof currentSourceId === 'string' })}
            onClick={onClick}
            data-cy-id='map-cluster-marker'
        >
            <span className='sr-only'>Zoom in on this cluster</span>
            <div className={styles.blur}></div>
            <div className={styles.color}>
                <span className={styles.text}>{pointCount}</span>
                <Tooltip position='right' inline text={`Zoom in on this cluster`} />
            </div>
        </button>
    );
});

/*
 * Plume Origin Marker
 */

const PlumeOrigin = () => {
    const plumeOriginRef = useRef(null);
    const map = useMapSlice(state => state.map);
    const coordinates = useSourceDetailsSlice(state => {
        if (state.activePlume === null) return undefined;
        if (typeof state.activePlume === 'string') return undefined;

        return state.activePlume.coordinates;
    });

    const markerElement = plumeOriginRef.current;

    useEffect(() => {
        if (!map || !coordinates || !markerElement) return;

        const mapboxMarker = new mapboxgl.Marker({
            draggable: false,
            element: markerElement
        });

        mapboxMarker.setLngLat(coordinates).addTo(map);

        return () => {
            mapboxMarker.remove();
        };
    }, [map, coordinates, markerElement]);

    return (
        <div
            ref={plumeOriginRef}
            className={classNames(styles.plume, {
                [styles['is-active']]: coordinates
            })}
        />
    );
};

/*
 * Data = Cluster + Source Markers
 */

const Data = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const map = useMapSlice(state => state.map);
    const sourceMarkers = useMapSlice(state => state.sourceMarkers);
    const clusterMarkers = useMapSlice(state => state.clusterMarkers);
    const setSourceMarkers = useMapSlice(state => state.setSourceMarkers);
    const setClusterMarkers = useMapSlice(state => state.setClusterMarkers);

    const containerElement = containerRef.current;

    const getFeatures = useCallback(
        (map: mapboxgl.Map) => {
            const zoom = map.getZoom();

            const currentLayer = zoom < 4 ? layerIdMap.dense : layerIdMap.main;

            if (!map.getLayer(currentLayer)) return;

            const renderedFeatures = map?.queryRenderedFeatures(undefined, {
                layers: [currentLayer]
            });

            const updatedSources = renderedFeatures?.filter(feature => !feature.properties?.cluster);
            const updatedClusters = renderedFeatures?.filter(feature => feature.properties?.cluster);

            const updatedSourceMarkers = updatedSources.map(source => {
                const { properties } = source;
                const sourceName = properties?.source_name;

                const markerElement = document.createElement('div');
                markerElement.className = 'mapboxgl-marker marker-container ';
                markerElement.dataset.sourceName = sourceName;

                const marker = new mapboxgl.Marker({
                    draggable: false,
                    element: markerElement
                });

                return {
                    feature: source,
                    marker
                };
            });

            const updatedClusterMarkers = updatedClusters.map(cluster => {
                const { properties } = cluster;
                const clusterId = properties?.cluster_id;

                const markerElement = document.createElement('div');
                markerElement.className = 'mapboxgl-marker marker-container cluster';
                markerElement.dataset.clusterId = clusterId;

                const marker = new mapboxgl.Marker({
                    draggable: false,
                    element: markerElement
                });

                return {
                    feature: cluster,
                    marker
                };
            });

            setSourceMarkers(updatedSourceMarkers);
            setClusterMarkers(updatedClusterMarkers);
        },
        [setSourceMarkers, setClusterMarkers]
    );

    // Every 200ms while the map is moving, pan/zoom etc
    // We recreate all the markers and remove the old ones...there must be a better way
    const throttledGetFeatures = useMemo(() => throttle(getFeatures, 200), [getFeatures]);

    /*
     * Attach event listeners, for mount, move and map style change
     */

    // Causes the MapSlice Store to update onMove which is highly frequent
    useEffect(() => {
        // Get features on idle
        map?.on('idle', () => throttledGetFeatures(map));
        // // Get features on map move
        map?.on('move', () => throttledGetFeatures(map));
        // // Get features on map style change, throttled.

        return () => {
            map?.off('idle', () => throttledGetFeatures(map));
            map?.off('move', () => throttledGetFeatures(map));
        };
    }, [map, throttledGetFeatures]);

    useEffect(() => {
        if (!map || !containerElement) return;

        sourceMarkers.forEach(({ feature, marker }) => {
            const coordinates = 'coordinates' in feature.geometry ? feature.geometry.coordinates : [0, 0];
            marker.setLngLat(coordinates as [number, number]).addTo(map);
        });

        return () => {
            sourceMarkers.forEach(({ marker }) => marker.remove());
        };
    }, [sourceMarkers, containerElement, map]);

    useEffect(() => {
        if (!map || !containerElement) return;

        clusterMarkers.forEach(({ feature, marker }) => {
            const coordinates = 'coordinates' in feature.geometry ? feature.geometry.coordinates : [0, 0];
            marker.setLngLat(coordinates as [number, number]).addTo(map);
        });

        return () => {
            clusterMarkers.forEach(({ marker }) => marker.remove());
        };
    }, [clusterMarkers, containerElement, map]);

    return (
        <div ref={containerRef}>
            {sourceMarkers.map(({ feature, marker }) => {
                const { properties } = feature;

                const sourceName = properties?.source_name;
                const numberOfPlumes = properties?.plume_count;
                const latestPlumeId = getLatestPlumeFromSourceFeature(feature);

                return createPortal(
                    <MapMarkers.Source
                        key={sourceName}
                        sourceName={sourceName}
                        latestPlumeId={latestPlumeId}
                        numberOfPlumes={numberOfPlumes}
                    />,
                    marker.getElement()
                );
            })}

            {clusterMarkers.map(({ feature, marker }) => {
                const { properties, id } = feature;

                const clusterId = properties?.cluster_id;
                const coordinates = 'coordinates' in feature.geometry ? feature.geometry.coordinates : [0, 0];
                const [longitude, latitude] = coordinates as [number, number];
                const pointCount = properties?.point_count;

                return createPortal(
                    <MapMarkers.Cluster
                        key={clusterId}
                        id={id as number}
                        longitude={longitude}
                        latitude={latitude}
                        pointCount={pointCount}
                    />,
                    marker.getElement()
                );
            })}
        </div>
    );
};

const CoordinatesPin = () => {
    const locationPinRef = useRef(null);
    const map = useMapSlice(state => state.map);
    const [{ coordinates }] = usePortalQueryParams();
    const markerElement = locationPinRef.current;

    useEffect(() => {
        if (!map || !markerElement || !coordinates) return;

        const mapboxMarker = new mapboxgl.Marker({
            draggable: false,
            element: markerElement
        });

        mapboxMarker.setLngLat({ lat: coordinates.lat, lon: coordinates.lon }).addTo(map);

        return () => {
            mapboxMarker.remove();
        };
    }, [map, markerElement, coordinates]);

    return (
        <div className={styles.pin} ref={locationPinRef}>
            <Icon icon='location-pin' />
        </div>
    );
};

// Adding memo as the useEffect would run a lot otherwise and while that may not
// be an issue in and of itself, it would mess with the animation
export const ActiveSource = memo(function Marker() {
    const activeSourceRef = useRef(null);
    const markerElement = activeSourceRef.current;

    const map = useMapSlice(state => state.map);
    const [{ details }] = usePortalQueryParams();
    // Unstable reference, consider improving
    const sourceFeature = useGetSourceBySourceNameFromGeojson(details);

    useEffect(() => {
        // @ts-ignore - won't recognize coordinates as a property
        const coordinates: [number, number] | undefined = sourceFeature?.geometry?.coordinates;

        if (!map || !markerElement || coordinates === undefined) return;

        const mapboxMarker = new mapboxgl.Marker({
            draggable: false,
            element: markerElement
        });

        mapboxMarker.setLngLat(coordinates).addTo(map);

        return () => {
            mapboxMarker.remove();
        };
    }, [map, markerElement, sourceFeature]);

    return (
        <div
            ref={activeSourceRef}
            className={classNames(styles.active, {
                [styles['co2']]: sourceFeature?.properties?.source_name?.includes('CO2'),
                [styles['is-active']]: !!sourceFeature
            })}
        />
    );
});

export const MapMarkers = {
    Data,
    Cluster,
    Source,
    PlumeOrigin,
    CoordinatesPin,
    ActiveSource
};
