import { Layer, Source } from 'react-map-gl';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { API_BASE_URL } from '@/utils/config';
import { AnchorLayer } from './AnchorLayer';

const SCENE_IMAGE_ANCHOR_ID = 'scene-image-anchor-layer';

export const SceneImageLayer = () => {
    const activeOverlay = useMapLayersSlice(state => state.activeOverlay);
    const overlayOpacity = useMapLayersSlice(state => state.overlayOpacity);
    const activePlume = useSourceDetailsSlice(state => state.activePlume);
    const sceneUuid = activePlume?.sceneID;

    // Gotta fix this ridiculous indenting
    return (
        <>
            <AnchorLayer id={SCENE_IMAGE_ANCHOR_ID} />
            {sceneUuid && activeOverlay !== '' && (
                <Source
                    key={sceneUuid}
                    type='raster'
                    tiles={[`${API_BASE_URL}/layers/scene/${sceneUuid}/${activeOverlay}/{z}/{x}/{y}.png`]} // inline array
                >
                    <Layer
                        type='raster'
                        paint={{ 'raster-opacity': overlayOpacity }} // inline object
                        beforeId={SCENE_IMAGE_ANCHOR_ID}
                    />
                </Source>
            )}
        </>
    );
};
