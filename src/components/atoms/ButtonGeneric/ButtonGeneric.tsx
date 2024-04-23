import { MouseEvent } from 'react';
import { trackEvent } from '@/hooks/useGTM';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    ariaLabel?: string;
    noTracking?: boolean;
}

export default function ButtonGeneric({ children, onClick, ariaLabel, noTracking = false, ...rest }: Props) {
    const trackingTitleWithFallback =
        ariaLabel ||
        (typeof children === 'string'
            ? children
            : 'WARNING: The children prop provided is not suitable as a tracking title');

    function onClickTracked(event: MouseEvent<HTMLButtonElement>) {
        onClick?.(event);
        trackEvent({
            event: 'button_click',
            button_text: trackingTitleWithFallback,
            button_url: window.location.href
        });
    }

    return (
        <button aria-label={ariaLabel} onClick={noTracking ? onClick : onClickTracked} {...rest}>
            {children}
        </button>
    );
}
