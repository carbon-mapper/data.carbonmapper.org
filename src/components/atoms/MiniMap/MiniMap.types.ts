
export namespace MiniMapTypes {

    export type Props = {
        coordinates: [number, number];
        className?: string;
    }

    export type CountriesJson = {
        [key: string]: (string | [number, number, number, number])[];
    }

}