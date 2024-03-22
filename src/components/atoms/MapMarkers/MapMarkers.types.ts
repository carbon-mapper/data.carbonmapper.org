import { SourceDataTypes } from '@/types/api/source.types';

export namespace MapMarkerTypes {
    export type ClusterMarkerProps = {
        id: number;
        longitude: number;
        latitude: number;
        pointCount: number;
    };

    export type SourceMarkerProps = {
        sourceName: string;
        numberOfPlumes: number;
        latestPlumeId: string | undefined;
    };

    export type Fetcher = (url: string) => Promise<SourceByPlumeNameData>;

    export type SourceByPlumeNameData = {
        name: string;
        plumes: [
            {
                plume_bounds: number[];
                plume_png: string;
            }
        ];
        point: {
            coordinates: [lng: number, lat: number];
            type: 'Point';
        };
        scenes: object[];
    };

    export type Plume = SourceDataTypes.Plume;
}
