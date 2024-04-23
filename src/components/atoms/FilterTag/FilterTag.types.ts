import type { MouseEvent, ReactNode } from 'react';

export namespace FilterTagTypes {
    export type Props = {
        children: ReactNode;
        onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
        className?: string;
    };
}
