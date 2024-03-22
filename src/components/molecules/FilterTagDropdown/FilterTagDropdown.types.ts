import type { FiltersTagItem } from '@/store/useFilterStore/useFilterStore';

export namespace FilterTagDropdownTypes {
    export type Props = {
        items: FiltersTagItem[];
        isOpen: boolean;
        left: number;
        className?: string;
    };
}
