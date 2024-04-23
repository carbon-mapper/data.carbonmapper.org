import type { ReactNode } from 'react';

export namespace DashboardPanelItemTypes {
    export type Props = {
        children: ReactNode;
        direction?: 'row' | 'column';
        gap?: 'small' | 'big';
        isHiddenInDetailsView?: boolean;
        isDetailsViewOnly?: boolean;
        isOffsetInDetailsView?: boolean;
        position: 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left';
    };
}
