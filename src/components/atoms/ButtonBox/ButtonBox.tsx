import classNames from 'classnames';
import type { ReactNode, MouseEvent } from 'react';
import type { IconName } from '@/components/atoms/Icon/Icon';
import { trackEvent } from '@/hooks/useGTM';
import { type Props as TooltipProps } from '@/components/atoms/Tooltip/Tooltip';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import styles from './ButtonBox.module.scss';

type Props = {
    children?: string | ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    details?: boolean;
    user?: boolean;
    small?: boolean;
    tiny?: boolean;
    transparent?: boolean;
    disabled?: boolean;
    success?: boolean;
    className?: string;
    outline?: boolean;
    filled?: boolean;
    icon?: IconName;
    stackChild?: boolean;
    type?: 'button' | 'submit' | 'reset';
    gridArea?: string;
    ariaLabel?: string;
    trackingTitle?: string;
    noTracking?: boolean;
    tooltip?: TooltipProps;
};

const ButtonBox = ({
    children,
    details,
    user,
    filled,
    small,
    tiny,
    tooltip,
    transparent,
    disabled,
    success,
    outline,
    icon,
    stackChild,
    onClick,
    type,
    className: propClassName,
    gridArea,
    ariaLabel,
    trackingTitle,
    noTracking = false
}: Props) => {
    const className = classNames(
        styles.button,
        { [styles.details]: details },
        { [styles.user]: user },
        { [styles.small]: small },
        { [styles.tiny]: tiny },
        { [styles.disabled]: disabled },
        { [styles.success]: success },
        { [styles.transparent]: transparent },
        { [styles.filled]: filled },
        { [styles.outline]: outline },
        { [styles.icon]: icon },
        { [styles['stack-child']]: stackChild },
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
            aria-label={ariaLabel}
            onClick={noTracking ? onClick : onClickTracked}
            disabled={disabled}
            type={type ?? 'button'}
            style={{ gridArea }}
        >
            {icon && <Icon icon={icon} />}
            {children}
            {tooltip && <Tooltip text={tooltip.text} position='top' inline />}
        </button>
    );
};

export default ButtonBox;
