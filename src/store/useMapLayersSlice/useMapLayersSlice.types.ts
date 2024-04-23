export namespace MapLayersSliceTypes {
    export type BaseMapName = 'og' | 'satellite' | 'accessibility';
    export type OverlayName = 'ch4' | 'rgb';

    export type Layer = {
        id: string;
        name: string;
        alt: string;
        opacity?: number;
    };

    export type Slice = {
        /*
         * Basemaps
         */
        basemaps: Layer[];
        activeBasemap: BaseMapName;
        setActiveBasemap: (name: BaseMapName) => void;

        /*
         * Plumes
         */
        plumesOpacity: number;
        setPlumesOpacity: (opacity: number) => void;

        /*
         * Overlays
         */
        overlays: Layer[];
        activeOverlay: OverlayName | '';
        setActiveOverlay: (name: OverlayName | '') => void;
        overlayOpacity: number;
        setOverlayOpacity: (opacity?: number) => void;

        /*
         * Cluster / Decluster
         */
        showClusters: boolean;
        setShowClusters: (visibility: boolean) => void;
    };
}
