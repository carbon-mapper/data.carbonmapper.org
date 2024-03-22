import classNames from 'classnames';
import React, { MouseEvent, ReactNode } from 'react';
import { trackEvent } from '@/hooks/useGTM';
import styles from './ButtonBasic.module.scss';

interface Props {
    children: string | ReactNode;
    color?: 'black';
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    trackingTitle?: string;
    noTracking?: boolean;
}

export default function ButtonBasic({
    children,
    color,
    onClick,
    trackingTitle,
    noTracking = false,
    className: propClassName
}: Props) {
    const className = classNames(styles.button, { [styles.isBlack]: color === 'black' }, propClassName);

    const trackingTitleWithFallback =
        trackingTitle ||
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
        <button className={className} onClick={noTracking ? onClick : onClickTracked} type='button'>
            <span className={styles.text}>{children}</span>
        </button>
    );
}
