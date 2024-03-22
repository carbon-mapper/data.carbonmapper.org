import classNames from 'classnames';
import { memo, useEffect, useRef, ReactElement } from 'react';
import styles from './Tooltip.module.scss';

export type Props = {
    text: string | ReactElement;
    className?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    width?: number | undefined;
    inline?: boolean;
    statistics?: boolean;
};

export type Position = 'top' | 'bottom' | 'left' | 'right';

const Tooltip = ({ text, className, position, width, inline, statistics }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tooltipEl = ref.current;

        if (!tooltipEl || !width) return;

        tooltipEl.style.width = `${width}px`;
    }, [width]);

    return (
        <span
            className={classNames('tooltip', styles.tooltip, `is-${position ?? 'top'}`, className, {
                [styles['statistics']]: statistics
            })}
            ref={ref}
            aria-hidden
        >
            <span className={classNames(styles.inner, { 'is-inline': inline })}>{text}</span>
            <span className={classNames('triangle', styles.triangle)}></span>
        </span>
    );
};

export default memo(Tooltip);
