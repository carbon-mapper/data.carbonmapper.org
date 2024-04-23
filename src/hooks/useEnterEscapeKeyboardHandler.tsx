import { useEffect } from 'react';

type EscapeHandlerProps = {
    onEscape?: () => void;
    onEnter?: () => void;
    isConfirmationPopup?: boolean;
}

export const useEnterEscapeHandler = ({ onEnter, onEscape, isConfirmationPopup }: EscapeHandlerProps) => {

    const onKeyup = (event: KeyboardEvent) => {

        if (!isConfirmationPopup && document.body.classList.contains('is-confirmation-popup')) return;

        event.key === 'Enter' && onEnter && onEnter();

        event.key === 'Escape' && onEscape && onEscape();
    }

    useEffect(() => {

        window.addEventListener('keyup', onKeyup);

        return () => {
            window.removeEventListener('keyup', onKeyup);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

}