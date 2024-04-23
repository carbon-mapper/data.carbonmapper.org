import useSWR from 'swr';
import { httpGet } from '@/utils/httpClient';
import { type Params } from '@/utils/usePortalQueryParams';

export type SavedSearch = {
    id: string;
    user: number;
    aoi: string | null;
    query: Params;
    name: string;
    source_name: string | null;
    source_gas: string | null;
    source_sector: string | null;
    source_eps: string | null;
    created: string;
    modified: string;
    source_point_json: string | null;
};

type SavedSearches = {
    items: SavedSearch[];
    count: number;
};

export const useSavedSearches = () => useSWR<SavedSearches>({ url: '/account/search-requests' }, httpGet);
