export namespace FilterDateInputTypes {

    export type Props = {
        options: {
            value: string;
            id: string;
            alt: string;
            placeholder: string;
            type: 'end' | 'start';
            onIconClick: () => void;
        }
    }

}