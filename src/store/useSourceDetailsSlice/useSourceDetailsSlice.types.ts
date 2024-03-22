export namespace SourceDetailsSliceTypes {
    export type CurrentSource = {
        id: string;
        coordinates: [lng: number, lat: number];
    } | null;

    export type CurrentPlume =
        | {
              id: string;
              layerID: string; // This is derivable from the id and therefore doesn't need to be state
              coordinates: [lng: number, lat: number] | null;
              bounds: [number, number, number, number] | null;
              sceneID: string;
          }
        | null
        | string;

    export type Slice = {
        /*
         * Active Tab
         */
        activeTab: 'observations' | 'supporting';
        setActiveTab: (tab: 'observations' | 'supporting') => void;

        /*
         * User Closed
         */
        isUserClosed: boolean;
        setIsUserClosed: (isOpen: boolean) => void;

        /*
         * Current Source
         */
        isCurrentSourcePHME: boolean;
        setIsCurrentSourcePHME: (isPHME: boolean) => void;
        sourcePlumeCount: number;
        setSourcePlumeCount: (count: number) => void;
        sourceObservationCount: number;
        setSourceObservationCount: (count: number) => void;

        /*
         * Active Plume
         */
        activePlume: CurrentPlume;
        setActivePlume: (plume: CurrentPlume) => void;

        /*
         * Hovered Plume
         */
        hoveredPlumeId: string | null;
        setHoveredPlumeId: (id: string | null) => void;

        /*
         * Include Null Detects
         */
        includeNullDetects: boolean;
        setIncludeNullDetects: (include: boolean) => void;
    };
}
