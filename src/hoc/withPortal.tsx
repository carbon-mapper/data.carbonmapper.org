import type { ComponentType, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export interface Props {
    portalId: 'popups' | 'modals';
    isOpen: boolean;
    onClose: () => void;
}

export default function withPortal<T extends object>(WrappedComponent: ComponentType<T & Props>) {
    const Component = (props: PropsWithChildren<T & Props>) => {
        const { portalId, isOpen } = props;
        const portalElement = typeof window !== 'undefined' && document.getElementById(portalId);

        if (!portalElement) return null;

        return (isOpen && portalElement && createPortal(<WrappedComponent {...props} />, portalElement)) || null;
    };

    return Component;
}
