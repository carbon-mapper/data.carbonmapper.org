import type { FilterStore } from '@/store/useFilterStore/useFilterStore';

export namespace DashboardFiltersTypes {
    export type ViewType = FilterStore['view'];

    export type FieldToggleProps = {
        onClick: () => void;
    };

    export type FieldCalendarToggleProps = {
        onClick: (view: ViewType) => void;
    };

    export type RangeProps = {
        name: string;
    };

    export type CalendarItemProps = {
        type: 'start' | 'end';
    };
}
