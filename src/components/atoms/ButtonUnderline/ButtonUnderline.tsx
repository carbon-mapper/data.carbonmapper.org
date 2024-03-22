import classNames from 'classnames';
import type { ReactNode, MouseEvent } from 'react';
import { trackEvent } from '@/hooks/useGTM';
import { type Props as TooltipProps } from '@/components/atoms/Tooltip/Tooltip';
import Tooltip from '../Tooltip/Tooltip';
import styles from './ButtonUnderline.module.scss';

type Props = {
    children: ReactNode;
    bold?: boolean;
    tabs?: boolean;
    isActive?: boolean;
    color?: 'black';
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    gridArea?: string;
    ariaLabel?: string;
    trackingTitle?: string;
    noTracking?: boolean;
    tooltip?: TooltipProps;
};

const ButtonUnderline = ({
    children,
    bold,
    tabs,
    isActive,
    color,
    onClick,
    tooltip,
    className: propClassName,
    gridArea,
    ariaLabel,
    trackingTitle,
    noTracking = false
}: Props) => {
    const className = classNames(
        styles.button,
        { [styles.black]: color === 'black' },
        { [styles.bold]: bold },
        { [styles.tabs]: tabs },
        { [styles.isActive]: isActive },
        propClassName
    );

    const trackingTitleWithFallback =
        trackingTitle ||
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
        <button
            className={className}
            onClick={noTracking ? onClick : onClickTracked}
            type='button'
            style={{ gridArea }}
        >
            <span className={styles.text}>{children}</span>
            <span className={styles.underline} />
            {tooltip && <Tooltip text={tooltip.text} position='top' inline />}
        </button>
    );
};

export default ButtonUnderline;
