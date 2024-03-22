import type { MapTypes } from '@/components/organisms/Map/Map.types';

export namespace SummaryStatisticsSliceTypes {
    export type Slice = {
        statistics: MapTypes.SourceStatistics;
        setStatistics: (statistics: MapTypes.SourceStatistics) => void;
    };
}
