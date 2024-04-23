import useSWR from 'swr';
import { httpGet } from '@/utils/httpClient';

export const useSavedAOI = (id: string | null) =>
    useSWR<Components.Schemas.AoiOut>(id && { url: `/layers/aoi/${id}` }, httpGet);
