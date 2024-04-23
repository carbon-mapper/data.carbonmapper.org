'use client';

import { MapBoxSourceFeature } from '@/types/api/source.types';
import { bbox } from '@turf/turf';
import { Geometry } from 'geojson';
import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';
import ReactGlMap from 'react-map-gl';
import type { MapLayerMouseEvent } from 'mapbox-gl';
import type { MapRef, ViewStateChangeEvent } from 'react-map-gl';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSourceImages } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useZoomToSource } from '@/hooks/useMapMovements';
import { AREA_MEASURE_IMAGE, DEFAULT_BOUNDS, MAP_STYLES_CONFIG } from '@/utils/globals';
import { SECRETS } from '@/utils/secrets';
import { ActivePlumeMarker } from './ActivePlumeMarker';
import { ActiveSourceLayer } from './ActiveSourceLayer';
import { DrawControl } from './DrawControl';
import { PlumeImageLayer } from './PlumeImageLayer';
import { SceneImageLayer } from './SceneImageLayer';
import { SceneLayer, useSceneClickHandler } from './SceneLayer';
import { SourceLayer } from './SourceLayer';
import { addActiveSourceMarkers } from './activeSourceMarkers';
import { useAutoOpenSourceList } from './organisms/Map/hooks/useAutoOpenSourceList';
import { useKeyboardControls } from './organisms/Map/hooks/useKeyboardControls';
import { useOpenSourceDetailsHandler } from './organisms/SourceDetails/useCloseSourceDetails';
import 'mapbox-gl/dist/mapbox-gl.css';

// Tuned to allow multiple user movements without sending requests for each movement
// While also not adding too much of a delay between stopping and sending a request
// Subject to change
const MAP_MOVEMENT_DEBOUNCE_MS = 100; // ms

// Start with an uncontrolled view state map but consider changing
// Primary concern with using a controlled view state map is the compatibility
// with functions like flyTo and eastTo
export const NewMap = () => {
    /////////////////////////////////// HOOKS
    const setHoveredPlumeId = useSourceDetailsSlice(state => state.setHoveredPlumeId);
    const activePlume = useSourceDetailsSlice(state => state.activePlume);
    const activePlumeUuid = activePlume?.id;
    const hoverPlumeId = useSourceDetailsSlice(state => state.hoveredPlumeId);
    const [hoverSceneId, setHoverSceneId] = useState<string>();
    const { setLeftPanel } = usePanelActions();
    const onOpenSourceDetail = useOpenSourceDetailsHandler();
    const onSceneClick = useSceneClickHandler(); // I like this pattern for other handlers
    useSourceImages(); // Need to fetch source images that we hover over
    useKeyboardControls();
    const zoomToSource = useZoomToSource();
    const autoOpenSourceListHandler = useAutoOpenSourceList();

    // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
    const [mapCursor, setMapCursor] = useState<string | undefined>(undefined);
    const mapRef = useRef<MapRef>(null); // use useMap instead

    const setBounds = useMapSlice(state => state.setBounds);
    const debouncedSetBounds = debounce(setBounds, MAP_MOVEMENT_DEBOUNCE_MS);
    const activeBasemapKey = useMapLayersSlice(state => state.activeBasemap);
    const mapStyle = MAP_STYLES_CONFIG[activeBasemapKey].url;

    ///////////////////////////// HANDLERS

    const handleSourceClick = useCallback(
        (sourceFeature: MapBoxSourceFeature) => {
            setHoveredPlumeId(null); // do we want this?
            // TODO: merge - commenting this out for now
            // setSourceTrigger('map_click');
            setLeftPanel(null);
            onOpenSourceDetail(sourceFeature.properties.source_name);
            zoomToSource(sourceFeature.geometry.coordinates as [number, number]);
        },
        [setHoveredPlumeId, setLeftPanel, onOpenSourceDetail, zoomToSource]
    );

    // Should only fire when clicking a feature of interactiveLayerIds
    const handleOnMapClick = useCallback(
        (e: mapboxgl.MapLayerMouseEvent) => {
            const feature = getFirstFeatureFromMapEvent(e);
            if (feature === undefined) return; // Shouldn't happen

            // Figure out a way to get this id
            if (feature.layer.id === 'source-clusters-points-circles') {
                // May want to tune the zoom
                e.target.flyTo({ center: getGeometryCenterPoint(feature.geometry), zoom: e.target.getZoom() + 2 });
            } else if (feature.layer.id === 'not-clustered-source-icons' && isSourceFeature(feature)) {
                handleSourceClick(feature);
            } else if (feature.layer.id === 'scene-background-fill') {
                onSceneClick(e);
            } else {
                console.warn('Missing handler for feature', feature, e);
            }
        },
        [handleSourceClick, onSceneClick]
    );

    // Tried to use onMouseEnter and onMouseLeave but they don't work as required
    // They only fire when "any number or interactive features" is entered or left
    // Not when an "any individual interactive feature" is entered or left
    // Therefore you don't get enter or leave events when panning from one feature to another

    const handleOnMouseMove = useCallback(
        (e: MapLayerMouseEvent) => {
            const feature = getFirstFeatureFromMapEvent(e);

            // Reset when there are no features
            // TODO: If these cause performance issues we can optimize
            if (feature === undefined) {
                setMapCursor(undefined);
                setHoveredPlumeId(null);
                setHoverSceneId(undefined);

                return;
            }

            setMapCursor('pointer');
            // We might need to optimize some of this
            if (isSourceFeature(feature)) {
                const latestPlumeId = getLatestPlumeFromSourceFeature(feature);
                if (latestPlumeId) setHoveredPlumeId(latestPlumeId);
            } else if (isSceneFeature(feature)) {
                // doing this in react state as opposed to map state
                // so that it is easier to reset
                setHoverSceneId(`${feature.id}`);
            }
        },
        [setMapCursor, setHoveredPlumeId]
    );

    const handleOnMoveEnd = useCallback(
        (e: ViewStateChangeEvent) => {
            debouncedSetBounds(e.target.getBounds());
            // don't know how frequently we want to check this
            // could be onMove, could be deboundeOnMoveEnd
            autoOpenSourceListHandler(e.target.getZoom());
        },
        [debouncedSetBounds, autoOpenSourceListHandler]
    );

    const handleOnLoad = useCallback(
        (e: mapboxgl.MapboxEvent<undefined>) => {
            setBounds(e.target.getBounds());
        },
        [setBounds]
    );

    const handleStyleData = useCallback(({ target }: mapboxgl.MapboxEvent<undefined>) => {
        // Need to re-add the image after style data changes
        // export/abstract image name
        const imageId = 'label-bg';

        if (target.hasImage(imageId)) return;
        target.addImage(imageId, AREA_MEASURE_IMAGE);

        addActiveSourceMarkers(target);
    }, []);

    // If dragRotate (or any handler) === false, doesn't disable the pointer event
    // can try something like map[handler].disable();
    // https://docs.mapbox.com/mapbox-gl-js/example/toggle-interaction-handlers/

    return (
        <ReactGlMap
            ref={mapRef}
            id='mainMap'
            hash
            cursor={mapCursor}
            initialViewState={{ bounds: DEFAULT_BOUNDS }}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle={mapStyle}
            mapboxAccessToken={SECRETS.MAPBOX_TOKEN}
            boxZoom={false}
            doubleClickZoom={false}
            dragRotate={false}
            touchPitch={false}
            touchZoomRotate={false}
            onClick={handleOnMapClick}
            onMouseMove={handleOnMouseMove}
            onMoveEnd={handleOnMoveEnd}
            onLoad={handleOnLoad}
            onMoveStart={debouncedSetBounds.cancel}
            onStyleData={handleStyleData}
            interactiveLayerIds={[
                'not-clustered-source-icons',
                'source-clusters-points-circles',
                'scene-background-fill'
            ]}
            minZoom={1}
        >
            <DrawControl map={mapRef.current} />
            <SceneLayer hoverSceneId={hoverSceneId} />]
            <SceneImageLayer />
            <PlumeImageLayer plumeId={hoverPlumeId ?? undefined} plumeUuid={activePlumeUuid} />
            <SourceLayer />
            <ActiveSourceLayer />
            <ActivePlumeMarker plumeUuid={activePlumeUuid} />
            {/* If we want to have the old style clusters, we can render a bunch of Markers */}
        </ReactGlMap>
    );
};

// Move to utils or something
const isSceneFeature = (feature: mapboxgl.MapboxGeoJSONFeature): boolean =>
    feature.layer.id === 'scene-background-fill';

const isSourceFeature = (feature: mapboxgl.MapboxGeoJSONFeature): feature is MapBoxSourceFeature => {
    return feature.properties?.source_name !== undefined;
};

const getLatestPlumeFromPlumeIds = (plumeIds: string[]) =>
    [...plumeIds].sort((a, b) => (a.slice(3, 18) > b.slice(3, 18) ? -1 : 1)).at(0);

const getLatestPlumeFromSourceFeature = (sourceFeature: MapBoxSourceFeature) => {
    // JSON.parse can fail
    try {
        const plumeIds = JSON.parse(sourceFeature.properties.plume_ids);

        return getLatestPlumeFromPlumeIds(plumeIds);
    } catch (e) {
        console.log('error in getLatestPlumeFromSourceFeature', e);
    }
};

const getFirstFeatureFromMapEvent = (e: mapboxgl.MapLayerMouseEvent) => {
    if (e.features === undefined || e.features.length === 0) return;
    return e.features[0];
};

const getGeometryCenterPoint = (geometry: Geometry): [number, number] => {
    switch (geometry.type) {
        case 'Point':
            return [geometry.coordinates[0], geometry.coordinates[1]];
        case 'LineString':
        case 'Polygon':
            const [minLng, minLat, maxLng, maxLat] = bbox(geometry); // may not need this tbh
            return [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
        default:
            throw Error(`Unsupported geometry type: ${geometry.type}`);
    }
};
