import type { FiltersTagItem } from '@/store/useFilterStore/useFilterStore';
export namespace FilterTagBarTypes {
    export type Props = {
        items: FiltersTagItem[];
        functions: {
            toggleDropdown: () => void;
            setDropdownLeft: (left: number) => void;
            setIsDropdownOpen: (isOpen: boolean) => void;
            setIsTagsExtended: (isExtended: boolean) => void;
        };
        className?: string;
    };
}
