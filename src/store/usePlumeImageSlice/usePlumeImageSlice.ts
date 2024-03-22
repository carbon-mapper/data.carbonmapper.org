import { SourceDataTypes } from '@/types/api/source.types';
import useSWR from 'swr';
import { create } from 'zustand';
import { useEffect } from 'react';
import type { Fetcher } from 'swr';
import httpClient from '@/utils/httpClient';
import { layerIdMap } from '@/components/organisms/Map/Map.layers';
import { getLatestPlumeFromSourceFeature } from '@/components/organisms/SourceDetails/SourceDetails.utils';
import { useMapLayersSlice } from '../useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '../useMapSlice/useMapSlice';
import { useSourceDetailsSlice } from '../useSourceDetailsSlice/useSourceDetailsSlice';

// This store and hooks within it are used to collect plumes that we need the images for
// The plumes we need images for are the "default plumes" for the sources in the map and sidebar
// The default plume information is not contained in the api payload that is used to show the sources in the map and sidebar
// If it were, as it would ideally be, none of this would be necessary and things would be better
// Unfortunately, due to challenges with the sources endpoint (sources.geojson) adding this information is not currently viable
// Maybe someday it will be and we will be able to remove this

type PlumeImageValue =
    | {
          bounds: [number, number, number, number];
          url: string;
          coordinates: [number, number];
          sceneId: string;
          plumeId: string;
          id: string;
      }
    | string
    | undefined;

interface PlumeImageSlice {
    plumeImageDictionary: Record<string, PlumeImageValue>;
    addPlumeImages: (plumeIds: string[]) => void;
    setLoadingPlumeImages: (plumeIds: string[]) => void;
    setPlumeImageDictionary: (newDict: PlumeImageSlice['plumeImageDictionary']) => void;
}

const usePlumeImageSlice = create<PlumeImageSlice>(set => ({
    plumeImageDictionary: {},
    addPlumeImages: plumeIds =>
        set(state => {
            // const currentPlumes = Object.keys(state.plumeImageDictionary);
            const newPlumes = plumeIds.filter(plumeId => state.plumeImageDictionary[plumeId] === undefined);

            if (newPlumes.length === 0) return {};

            const newDict = { ...state.plumeImageDictionary };
            newPlumes.forEach(plumeId => (newDict[plumeId] = 'init'));

            return { plumeImageDictionary: newDict };
        }),
    setLoadingPlumeImages: plumeIds =>
        set(state => {
            const newDict = { ...state.plumeImageDictionary };
            plumeIds.forEach(plumeId => (newDict[plumeId] = 'loading'));

            return { plumeImageDictionary: newDict };
        }),
    setPlumeImageDictionary: dictionaryUpdates =>
        set(state => {
            const newDict = { ...state.plumeImageDictionary, ...dictionaryUpdates };
            return { plumeImageDictionary: newDict };
        })
}));

export const usePlumeImageDictionary = () => usePlumeImageSlice(state => state.plumeImageDictionary);
export const useAddPlumeImages = () => usePlumeImageSlice(state => state.addPlumeImages);
export const useSetLoadingPlumeImages = () => usePlumeImageSlice(state => state.setLoadingPlumeImages);
export const useSetPlumeImageDictionary = () => usePlumeImageSlice(state => state.setPlumeImageDictionary);

const MIN_SOURCE_HOVER_ZOOM = 12;
const useTrackMapSources = () => {
    const map = useMapSlice(state => state.map);
    const addPlumeImages = useAddPlumeImages();

    // We may also need to activate this in some way if decluster is turned on
    useEffect(() => {
        if (map === null) return;

        const handler = () => {
            if (map.getZoom() < MIN_SOURCE_HOVER_ZOOM) return;

            // Could also useSourcesInView
            const sources = map.queryRenderedFeatures(undefined, { layers: [layerIdMap.data] });
            const plumes = sources
                .map(getLatestPlumeFromSourceFeature)
                .filter((id): id is string => typeof id === 'string');

            addPlumeImages(plumes);
        };

        map.on('moveend', handler);
        return () => {
            map.off('moveend', handler);
        };
    }, [map, addPlumeImages]);
};

export const useSourceImages = () => {
    useTrackMapSources();
    const dict = usePlumeImageDictionary();
    const setLoadingPlumeImages = useSetLoadingPlumeImages();
    const setPlumeImageDictionary = useSetPlumeImageDictionary();

    // Tried to use useSWR onSuccess callback but that didn't work due to the near simultaneous invocations of this request
    // Using this odd approach instead. It works but is not ideal and should be revisited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const specialFetcher: Fetcher<any> = async (url: string) => {
        const response = await httpClient.get<{ items: Components.Schemas.PlumeAnnotatedOut[] }>(url);

        // Currently this code "throws away" plumes that don't have bounds or an image
        // Hopefully we don't have this data
        // But this breaks some other behavior and could be improved
        const dictionaryUpdates: PlumeImageSlice['plumeImageDictionary'] = {};
        (response?.data?.items ?? []).forEach(({ plume_id, plume_bounds, plume_png, geometry_json, scene_id, id }) => {
            if (plume_bounds && plume_png && geometry_json && scene_id) {
                dictionaryUpdates[plume_id] = {
                    bounds: plume_bounds as [number, number, number, number],
                    url: plume_png,
                    coordinates: geometry_json.coordinates as [number, number],
                    id,
                    plumeId: plume_id,
                    sceneId: scene_id
                };
            } else {
                console.log(`missing plume img data for ${plume_id}`);
            }
        });
        setPlumeImageDictionary(dictionaryUpdates);

        return response.data;
    };

    const plumesToFetch = Object.keys(dict).filter(plumeId => dict[plumeId] === 'init');
    const queryString = plumesToFetch.map(plumeId => `plume_names=${plumeId}`).join('&');
    const query =
        queryString.length > 0 ? `/catalog/plumes/annotated?${queryString}&limit=${plumesToFetch.length}` : null;

    useEffect(() => {
        if (plumesToFetch.length > 0) setLoadingPlumeImages(plumesToFetch);
    }, [plumesToFetch, setLoadingPlumeImages]);

    useSWR(query, specialFetcher);
};

// This could be a component that just returns <></> or a hook
// Need to update this to work when we already have the plume info (source details)
export const useHoveredPlumeImage = () => {
    const map = useMapSlice(state => state.map);
    const plumesOpacity = useMapLayersSlice(state => state.plumesOpacity);
    // const activePlume = useSourceDetailsSlice(state => state.activePlume); // Active plums is another mess
    const hoveredPlumeId = useSourceDetailsSlice(state => state.hoveredPlumeId);
    const plumeImageDict = usePlumeImageDictionary();

    useEffect(() => {
        if (!map || hoveredPlumeId === null) return;

        const layerId = `plume-${hoveredPlumeId}`;
        const sourceId = `plume-source-${hoveredPlumeId}`;

        // Non-dup check
        if (map.getSource(sourceId) || map.getLayer(layerId)) return;

        const plume = plumeImageDict[hoveredPlumeId];

        // Plume image check
        if (plume === undefined || typeof plume === 'string') return;

        const { bounds, url } = plume;

        // Bounds check
        if (!bounds) return;

        const awsNoCacheQuery = '&cacheblock=true';
        const imageUrl = `${url}${awsNoCacheQuery}`;
        const [W, S, E, N] = bounds;
        const coordinates = [
            [W, N],
            [E, N],
            [E, S],
            [W, S]
        ];

        map.addSource(sourceId, {
            type: 'image',
            url: imageUrl,
            coordinates
        });

        map.addLayer({
            id: layerId,
            type: 'raster',
            source: sourceId,
            paint: {
                'raster-opacity': plumesOpacity, // Did we need hidden ? 0 : opacity,
                'raster-resampling': 'nearest'
            }
        });

        // Idk what this did - bring into view??
        map.moveLayer(layerId, 'data-layer');

        return () => {
            if (!map || hoveredPlumeId === null) return;

            const layerId = `plume-${hoveredPlumeId}`;
            const sourceId = `plume-source-${hoveredPlumeId}`;

            map.removeLayer(layerId);
            map.removeSource(sourceId);
        };
    }, [hoveredPlumeId, map, plumesOpacity, plumeImageDict]);
};
