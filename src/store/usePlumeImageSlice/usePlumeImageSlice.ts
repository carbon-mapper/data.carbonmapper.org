import useSWR from 'swr';
import { create } from 'zustand';
import { useEffect } from 'react';
import type { Fetcher } from 'swr';
import httpClient from '@/utils/httpClient';

// This store and hooks within it are used to collect plumes that we need the images for
// The plumes we need images for are the "default plumes" for the sources in the map and sidebar
// The default plume information is not contained in the api payload that is used to show the sources in the map and sidebar
// If it were, as it would ideally be, none of this would be necessary and things would be better
// Unfortunately, due to challenges with the sources endpoint (sources.geojson) adding this information is not currently viable
// Maybe someday it will be and we will be able to remove this

type PlumeImageValue =
    | {
          bounds: [number, number, number, number] | null;
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

export const useSourceImages = () => {
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
