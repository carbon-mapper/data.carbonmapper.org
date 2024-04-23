import type { FiltersDate } from '@/store/useFilterStore/useFilterStore';
import type { DashboardFiltersTypes } from '@/components/organisms/DashboardFilters/DashboardFilters.types';
export namespace FilterDateTypes {
    export type Props = {
        date: Record<'start' | 'end', FiltersDate | null>;
        onClick: (view: DashboardFiltersTypes.ViewType) => void;
    };
}
