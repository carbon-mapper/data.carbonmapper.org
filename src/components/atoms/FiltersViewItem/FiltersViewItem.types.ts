import type { ReactNode } from 'react';

export namespace FiltersViewItem {

    export type Props = {
        id: string;
        type: 'top' | 'main' | 'bottom' | 'livesearch' | 'select' | 'calendar';
        children?: ReactNode;
        bg: 'white' | 'blur';
        fill?: boolean;
        noPadding?: boolean;
    }

}