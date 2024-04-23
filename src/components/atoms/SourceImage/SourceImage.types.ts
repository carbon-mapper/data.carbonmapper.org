
export namespace SourceImageTypes {

    export type IsLoaded = {
        bg: boolean;
        plume: boolean;
    }

    export type Props = {
        bg: string;
        plume: string;
        className?: string;
        onLoadingComplete?: () => void;
    }

}