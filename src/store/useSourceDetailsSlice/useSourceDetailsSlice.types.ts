export namespace SourceDetailsSliceTypes {
    export type CurrentSource = {
        id: string;
        coordinates: [lng: number, lat: number];
    } | null;

    export type CurrentPlume =
        | {
              id: string;
              coordinates: [lng: number, lat: number] | null;
              bounds: [number, number, number, number] | null;
              sceneID: string;
          }
        | undefined;

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

        /*
         * Active Plume
         */
        activePlume: CurrentPlume;
        setActivePlume: (plume: CurrentPlume) => void;

        searchedPlume: string | undefined;
        setSearchedPlume: (p: string | undefined) => void;

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
