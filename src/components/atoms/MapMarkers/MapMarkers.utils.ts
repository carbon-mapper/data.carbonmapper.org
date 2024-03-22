import { useEffect, useState } from 'react';
import type { SourceDataTypes } from '@/types/api/source.types';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import type { MapMarkerTypes } from './MapMarkers.types';

// Seems like we add sources and then never remove them...I wonder if that is best for performance
export const addMapRasterSource = (
    map: mapboxgl.Map | null,
    plume: { plumeBounds: number[]; plumeUrl: string; plumeId: string },
    options: { opacity: number; hidden?: boolean }
) => {
    const { plumeBounds, plumeUrl, plumeId } = plume;
    const { opacity, hidden = false } = options;
    const awsNoCacheQuery = '&cacheblock=true';

    // Wonder when we have run into this
    if (!plumeBounds) return;

    const [W, S, E, N] = plumeBounds;
    const coordinates = [
        [W, N],
        [E, N],
        [E, S],
        [W, S]
    ];

    const layerId = `plume-${plumeId}`;
    const sourceId = `plume-source-${plumeId}`;

    if (!map || map.getSource(sourceId)) return;

    map.addSource(sourceId, {
        type: 'image',
        url: plumeUrl + awsNoCacheQuery,
        coordinates
    });

    map.addLayer({
        id: layerId,
        type: 'raster',
        source: sourceId,
        paint: {
            'raster-opacity': hidden ? 0 : opacity,
            'raster-resampling': 'nearest'
        }
    });

    // TODO: Get this layer to the layerIdMap
    map.moveLayer(layerId, 'data-layer');
};

export const getLatestPlume = (plumes: SourceDataTypes.Plume[]) => {
    const plumesDescendingTimeOrder = plumes.sort((a, b) => {
        const timeA = new Date(a.scene_timestamp);
        const timeB = new Date(b.scene_timestamp);
        return timeA < timeB ? 1 : -1;
    });

    return plumesDescendingTimeOrder[0];
};

export const sortPlumesTimeDescending = (plumes: SourceDataTypes.Plume[] | []) => {
    return plumes.sort((a, b) => {
        const timeA = new Date(a.scene_timestamp);
        const timeB = new Date(b.scene_timestamp);
        return timeA < timeB ? 1 : -1;
    });
};

export const sortScenesTimeDescending = (scenes: SourceDataTypes.Scene[] | SourceDataTypes.VectorScene[] | []) => {
    return scenes.sort((a, b) => {
        const timeA = new Date(a.timestamp);
        const timeB = new Date(b.timestamp);
        return timeA < timeB ? 1 : -1;
    });
};

export const sortPlumesAndScenesTimeDescending = (
    items: SourceDataTypes.Plume[] | SourceDataTypes.Scene[] | SourceDataTypes.VectorScene[] | []
) => {
    return items.sort((a, b) => {
        const timeA = new Date('scene_timestamp' in a ? a.scene_timestamp : a.timestamp);
        const timeB = new Date('scene_timestamp' in b ? b.scene_timestamp : b.timestamp);
        return timeA < timeB ? 1 : -1;
    });
};

export const usePlumeData = (data: SourceDataTypes.Data | undefined) => {
    const activePlumeID = useSourceDetailsSlice(state => {
        if (state.activePlume === null) return undefined;
        if (typeof state.activePlume === 'string') return undefined;

        return state.activePlume.id;
    });
    const [plumeData, setPlumeData] = useState<MapMarkerTypes.Plume | null>(null);

    useEffect(() => {
        if (!data) return;

        const { plumes } = data;

        const mostRecentPlume = getLatestPlume(plumes);
        const currentPlume = plumes.find(plume => plume.id === activePlumeID) || mostRecentPlume;

        setPlumeData(currentPlume);
    }, [activePlumeID, data]);

    return plumeData;
};
