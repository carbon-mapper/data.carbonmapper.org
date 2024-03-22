import classNames from 'classnames';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useSize } from '@/hooks/useSize';
import { type Props as TooltipToggleProps } from '../TooltipToggle/TooltipToggle';
import TooltipToggle from '../TooltipToggle/TooltipToggle';
import styles from './TooltipText.module.scss';

export type Props = {
    tooltip: Omit<TooltipToggleProps['tooltip'], 'width'> & {
        fill?: boolean;
    };
    children: ReactNode;
    className?: string;
    options?: {
        tiny?: boolean;
        fontWeight?: '400' | '500';
    };
};

const TooltipText = ({ tooltip, children, options, className }: Props) => {
    const ref = useRef<HTMLSpanElement>(null);
    const size = useSize(ref, !tooltip.fill);

    const allClassNames = classNames('js-tooltip-text', styles.wrapper, { 'is-tiny': options?.tiny }, className);

    return (
        <span className={allClassNames} ref={ref}>
            <span className={styles.text} style={{ fontWeight: options?.fontWeight ?? '500' }}>
                {children}
            </span>
            <TooltipToggle tooltip={{ ...tooltip, width: tooltip.fill ? size.width : 0 }} />
        </span>
    );
};

export default TooltipText;
