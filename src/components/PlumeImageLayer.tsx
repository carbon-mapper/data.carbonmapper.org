import { useEffect, useMemo } from 'react';
import { Layer, Source } from 'react-map-gl';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { usePlumeImageDictionary, useAddPlumeImages } from '@/store/usePlumeImageSlice/usePlumeImageSlice';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { AnchorLayer } from './AnchorLayer';
import { useSourceByNameData } from './organisms/Map/hooks/useSourceByNameData';

const awsNoCacheQuery = '&cacheblock=true'; // I don't know why we do this
const IMAGE_ANCHOR_ID = 'plume-image-anchor-layer';

// ToDo: Need to handle plume opacity

// Right now we are handling the following 2 scenarios
// plumeId for hovered plumes
// plumeUuid for source detail selected plumes
type PlumeImageLayerProps = {
    plumeId: string | undefined;
    plumeUuid: string | undefined;
};
export const PlumeImageLayer = ({ plumeId, plumeUuid }: PlumeImageLayerProps) => {
    // For UUID
    const [{ details: currentSourceId }] = usePortalQueryParams();
    const { data: selectedSourceData } = useSourceByNameData(currentSourceId ?? null);
    const plumesOpacity = useMapLayersSlice(state => state.plumesOpacity);

    const plumeImagePaint: mapboxgl.RasterPaint = useMemo(
        () => ({ 'raster-resampling': 'nearest', 'raster-opacity': plumesOpacity }),
        [plumesOpacity]
    );

    // For ID
    const plumeImageDictionary = usePlumeImageDictionary();
    const addPlumeImages = useAddPlumeImages();
    useEffect(() => {
        if (plumeId) addPlumeImages([plumeId]);
    }, [plumeId, addPlumeImages]);

    // Necessary Info
    const plumeImageInfo = useMemo(() => {
        // Hovered Plumes
        if (typeof plumeId === 'string') {
            const plumeImageInfo = plumeId && plumeImageDictionary[plumeId]; // can be undefined or 'loading'
            if (plumeImageInfo === undefined || typeof plumeImageInfo === 'string' || plumeImageInfo.bounds === null)
                return undefined;

            return {
                url: plumeImageInfo.url,
                coordinates: plumeBoundsToCoordinates(plumeImageInfo.bounds)
            };
        } else if (typeof plumeUuid === 'string') {
            // Selected Plumes
            if (selectedSourceData === undefined) return undefined;
            const plume = selectedSourceData.plumes.find(plume => plume.id === plumeUuid);
            if (plume === undefined || plume.plume_bounds === null) return undefined;

            return {
                url: plume.plume_png,
                coordinates: plumeBoundsToCoordinates(plume.plume_bounds)
            };
        } else {
            return undefined;
        }
    }, [plumeId, plumeUuid, plumeImageDictionary, selectedSourceData]);

    return (
        <>
            <AnchorLayer id={IMAGE_ANCHOR_ID} />
            {plumeImageInfo && (
                <Source
                    key={plumeId}
                    type='image'
                    url={plumeImageInfo.url + awsNoCacheQuery}
                    coordinates={plumeImageInfo.coordinates}
                >
                    <Layer type='raster' paint={plumeImagePaint} beforeId={IMAGE_ANCHOR_ID} />
                </Source>
            )}
        </>
    );
};

const plumeBoundsToCoordinates = (bounds: [number, number, number, number]) => {
    const [west, south, east, north] = bounds;

    // https://docs.mapbox.com/style-spec/reference/sources/#image
    // top left, top right, bottom right, bottom left
    return [
        [west, north],
        [east, north],
        [east, south],
        [west, south]
    ];
};
