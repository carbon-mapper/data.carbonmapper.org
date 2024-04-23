import { FillPaint, LineLayout, LinePaint, MapLayerMouseEvent, MapboxGeoJSONFeature } from 'mapbox-gl';
import { useCallback } from 'react';
import { Layer, Source } from 'react-map-gl';
import { useCoverageStoreActions, useShowScenes } from '@/store/useCoverageStore/useCoverageStore';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { API_BASE_URL } from '@/utils/config';
import { MAP_STYLES_CONFIG } from '@/utils/globals';

const SCENE_TILES = [`${API_BASE_URL}/layers/scenes/{z}/{x}/{y}.mvt`];

type SceneLayerProps = {
    hoverSceneId?: string;
};

// visibility: none prevents scene tiles from being fetched
// therefore, that is the only switch we need to flip for good performance when scene layer is off
// Consider Memoizing this component and all paint and layout objects
export const SceneLayer = ({ hoverSceneId }: SceneLayerProps) => {
    const showScenes = useShowScenes();
    const activeBasemapKey = useMapLayersSlice(state => state.activeBasemap);
    const sceneFillColor = MAP_STYLES_CONFIG[activeBasemapKey].color;
    const sceneOpacity = MAP_STYLES_CONFIG[activeBasemapKey].opacity;

    // mapbox wants nulls instead of undefined
    const sceneFillPaint: FillPaint = {
        'fill-color': sceneFillColor, // Fix
        'fill-opacity': ['case', ['==', ['id'], hoverSceneId ?? null], sceneOpacity / 5, sceneOpacity / 10] // Fix
    };

    const sceneOutlinePaint: LinePaint = {
        'line-color': sceneFillColor, // Fix
        'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], sceneOpacity * 1.25, sceneOpacity],
        'line-width': 1
    };

    const sceneVisibilityLayout = { visibility: showScenes ? ('visible' as const) : ('none' as const) };
    const sceneOutlineLayout: LineLayout = { 'line-join': 'round', 'line-cap': 'round', ...sceneVisibilityLayout };

    return (
        // Promoting scene_id since we have seen the feature id of scenes
        // be undefined which can cause issues
        <Source type='vector' tiles={SCENE_TILES} promoteId='scene_id'>
            <Layer
                id='scene-background-fill'
                type='fill'
                source-layer='scenes'
                paint={sceneFillPaint}
                layout={sceneVisibilityLayout}
            />
            <Layer
                id='scene-outline'
                type='line'
                source-layer='scenes'
                paint={sceneOutlinePaint}
                layout={sceneOutlineLayout}
            />
        </Source>
    );
};

type SceneFeatureProperties = {
    instrument: string;
    scene_id: string;
    scene_uuid: string;
    timestamp: string;
};

type SourceFeature = MapboxGeoJSONFeature & { properties: SceneFeatureProperties };

const isSceneFeature = (feature: MapboxGeoJSONFeature): feature is SourceFeature =>
    feature.layer.id === 'scene-background-fill';

export const useSceneClickHandler = () => {
    const { setCurrentScenes } = useCoverageStoreActions();
    const { setLeftPanel } = usePanelActions();

    return useCallback(
        ({ features }: MapLayerMouseEvent) => {
            if (features === undefined) return; // Shouldn't happen

            setLeftPanel('scene-list');
            const dataFeatures = features.filter(isSceneFeature).map(feature => feature.properties);
            setCurrentScenes(dataFeatures);
        },
        [setCurrentScenes, setLeftPanel]
    );
};
