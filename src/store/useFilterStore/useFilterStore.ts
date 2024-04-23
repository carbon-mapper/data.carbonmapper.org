import dayjs from 'dayjs';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export const defaultDateStart = dayjs(new Date('2016-01-01T00:00:00')).hour(0).minute(0).second(0);
export const defaultDateEnd = dayjs().hour(0).minute(0).second(0);

export type FiltersDate = {
    date: Date;
    display: string;
} | null;

export type FiltersLocation = {
    name: string | null;
    center: [lng: number, lat: number] | null;
    bbox: [number, number, number, number] | null;
    id: string | null;
    plume_ids?: string[];
    source_id?: string;
};

export type FiltersTagItem = {
    id: string;
    name: string;
    onClick: () => void;
};

type FilterView = 'main' | 'sector' | 'instrument' | 'calendar' | 'calendar-2nd' | 'plumeStatus' | 'plumeQualities';

export interface FilterStore {
    view: FilterView;
    setView: (view: FilterView) => void;
    livesearchItemsWrapperEl: HTMLDivElement | null;
    setLivesearchItemsWrapper: (el: HTMLDivElement | null) => void;
    livesearchTerm: string;
    setLivesearchTerm: (term: string) => void;
}
//
export const useFilterStore = createWithEqualityFn<FilterStore>()(
    devtools(
        set => ({
            view: 'main',
            setView: view => set(() => ({ view })),
            livesearchItemsWrapperEl: null,
            setLivesearchItemsWrapper: livesearchItemsWrapperEl => set({ livesearchItemsWrapperEl }),
            livesearchTerm: '',
            setLivesearchTerm: livesearchTerm => set(() => ({ livesearchTerm }))
        }),
        { enabled: false, name: 'Filter Store' }
    ),
    shallow
);

export const useFiltersSlice = useFilterStore;
export default useFilterStore;
