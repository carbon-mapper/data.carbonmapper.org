import type { SourceDataTypes } from '@/types/api/source.types';

export namespace ObservationsListItemTypes {
    export type Props = {
        data: ListItemData;
        includeNullDetects: boolean;
    };

    export type Plume = SourceDataTypes.Plume;
    export type Scene = SourceDataTypes.Scene;
    export type ListItemData = Plume | Scene;
}
