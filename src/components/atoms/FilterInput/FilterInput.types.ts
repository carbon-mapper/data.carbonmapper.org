export namespace FilterInputTypes {

    export type InputType = 'text' | 'select';

    export type IconType = 'chevron' | 'loupe' | 'calendar';

    export type Icons = {
        type: InputType;
        icon: IconType;
    }[];

    export type CommonOptions = {
        value: string;
        inputNameTag: string;
        id: string;
        alt: string;
        placeholder: string;
    }

    export type TextOptions = CommonOptions;

    export type SelectOptions = CommonOptions & {
        onClick: () => void;
    };

    export type DateOptions = CommonOptions & {
        onClick: () => void;
    };

    export type Props = {
        [T in InputType]: {
            type: T;
            options: T extends 'text' ? TextOptions : T extends 'select' ? SelectOptions : DateOptions;
        };
    }[InputType];
}
