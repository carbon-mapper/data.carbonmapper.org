import { ReactNode } from 'react';

export namespace BarGraphLegendItemTypes {
    export interface Props {
        children: ReactNode;
        colorClassName: string;
        isDisabled: boolean;
        activeSector: string | null;
        setActiveSector: (sector: string | null) => void;
    }
}
