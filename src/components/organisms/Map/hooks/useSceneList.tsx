import { useCallback, useEffect, useRef } from 'react';
import type { SourceDataTypes } from '@/types/api/source.types';
import { useShowScenes, useCurrentScenes, useCoverageStoreActions } from '@/store/useCoverageStore/useCoverageStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';

/*
 * Attach event listeners to scene layer to retrieve coverage data, handle
 * events, populate the layers panel
 */

type Feature = {
    type: 'Feature';
    id: number;
    properties: SourceDataTypes.VectorScene;
};

export function useSceneList() {
    const previousFeaturesRef = useRef<Feature[]>([]);

    const isActive = useShowScenes();

    const map = useMapSlice(state => state.map);

    const currentScenes = useCurrentScenes();
    const setCurrentScenes = useCoverageStoreActions().setCurrentScenes;

    const { setLeftPanel } = usePanelActions();

    const onMouseClickHander = useCallback(
        (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
            setLeftPanel('scene-list');

            const { features } = event;
            const currentSceneIDs = currentScenes.map(scene => scene.scene_uuid);

            currentSceneIDs.forEach(sceneID => {
                map?.setFeatureState(
                    {
                        source: 'scenes-source',
                        sourceLayer: 'scenes',
                        id: sceneID
                    },
                    {
                        hover: false
                    }
                );
            });

            features?.forEach((feature: Feature) => {
                map?.setFeatureState(
                    {
                        source: 'scenes-source',
                        sourceLayer: 'scenes',
                        id: feature.id
                    },
                    {
                        hover: true
                    }
                );
            });

            const dataFeatures = features.map((feature: Feature) => feature.properties);
            setCurrentScenes(dataFeatures);
        },
        [map, currentScenes, setCurrentScenes, setLeftPanel]
    );

    const onMouseEnterHandler = useCallback(() => {
        if (!map) return;
        map.getCanvas().style.cursor = 'pointer';
    }, [map]);

    const onMouseLeaveHandler = useCallback(() => {
        if (!map) return;
        map.getCanvas().style.cursor = '';

        const previousFeatures = previousFeaturesRef.current;
        const currentSceneIDs = currentScenes.map(scene => scene.scene_uuid);

        previousFeatures
            .filter(feature => !currentSceneIDs.includes(String(feature.id)))
            .forEach(feature => {
                map?.setFeatureState(
                    {
                        source: 'scenes-source',
                        sourceLayer: 'scenes',
                        id: feature.id
                    },
                    {
                        hover: false
                    }
                );
            });
    }, [map, currentScenes]);

    const onMouseMoveHandler = useCallback(
        (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
            const { features } = event;
            const previousFeatures = previousFeaturesRef.current;
            const currentSceneIDs = currentScenes.map(scene => scene.scene_uuid);

            previousFeatures
                .filter(feature => !currentSceneIDs.includes(String(feature.id)))
                .forEach(feature => {
                    map?.setFeatureState(
                        {
                            source: 'scenes-source',
                            sourceLayer: 'scenes',
                            id: feature.id
                        },
                        {
                            hover: false
                        }
                    );
                });

            features?.forEach((feature: Feature) => {
                map?.setFeatureState(
                    {
                        source: 'scenes-source',
                        sourceLayer: 'scenes',
                        id: feature.id
                    },
                    {
                        hover: true
                    }
                );
            });

            previousFeaturesRef.current = features;
        },
        [map, currentScenes]
    );

    useEffect(() => {
        if (!map?.getLayer('scenes-layer')) return;

        map.on('click', 'scenes-layer', onMouseClickHander);
        map.on('mousemove', 'scenes-layer', onMouseMoveHandler);
        map.on('mouseenter', 'scenes-layer', onMouseEnterHandler);
        map.on('mouseleave', 'scenes-layer', onMouseLeaveHandler);

        return () => {
            map.off('click', 'scenes-layer', onMouseClickHander);
            map.off('mousemove', 'scenes-layer', onMouseMoveHandler);
            map.off('mouseenter', 'scenes-layer', onMouseEnterHandler);
            map.off('mouseleave', 'scenes-layer', onMouseLeaveHandler);
        };
    }, [map, isActive, onMouseClickHander, onMouseEnterHandler, onMouseLeaveHandler, onMouseMoveHandler, setLeftPanel]);
}
