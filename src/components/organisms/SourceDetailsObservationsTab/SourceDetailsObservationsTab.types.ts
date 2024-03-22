import type { SourceDataTypes } from '@/types/api/source.types';
import type { SourceDetailsTypes } from '@/components/organisms/SourceDetails/SourceDetails.types';

export namespace SourceDetailsObservationsTabTypes {
    export type Props = {
        plumes: Array<Plume>;
        scenes: Array<Scene>;
        graphData: Array<GraphDataPoint>;
        // statistics: SourceDetailsTypes.SourceStatistics;
    };

    export type GraphDataPoint = SourceDetailsTypes.GraphData;

    export type Plume = SourceDataTypes.Plume;
    export type Scene = SourceDataTypes.Scene;
    export type ListItemData = Plume | Scene;
}
