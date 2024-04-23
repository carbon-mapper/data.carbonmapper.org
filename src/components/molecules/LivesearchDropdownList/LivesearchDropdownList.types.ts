import type { FiltersLocation } from '@/store/useFilterStore/useFilterStore';

export namespace LivesearchDropdownTypes {
    export type Props = {
        searchInput: string;
        callback: () => void;
    };

    export type DisplayState = FiltersLocation[];
    export type Items = FiltersLocation[];
}
