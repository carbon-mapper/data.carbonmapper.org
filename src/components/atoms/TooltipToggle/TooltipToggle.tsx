import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useSize } from '@/hooks/useSize';
import Tooltip from '../Tooltip/Tooltip';
import { type Props as TooltipProps } from '../Tooltip/Tooltip';
import InfoSVG from '@/assets/svg/info.svg';
import styles from './TooltipToggle.module.scss';

export type Props = {
    tooltip: TooltipProps;
    className?: string;
};

const TooltipToggle = ({ tooltip, className }: Props) => {
    const ref = useRef<HTMLElement>(null);
    const size = useSize(ref);
    const [tooltipWidth, setTooltipWidth] = useState<number | undefined>(undefined);

    const position = tooltip.position || 'top';
    const inline = tooltip.inline;

    const setTotalTooltipMaxWidth = () => {
        if (tooltip.width && size.width) {
            const totalWidth: number = tooltip.width * 2 - size.width;
            setTooltipWidth(totalWidth);
        }
    };

    useEffect(() => {
        tooltip.width && setTotalTooltipMaxWidth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tooltip.width, size.width]);

    return (
        <i className={classNames(`tooltip-info tooltip-trigger js-tooltip-toggle`, styles.info, className)} ref={ref}>
            <InfoSVG />
            <Tooltip {...tooltip} position={position} width={tooltipWidth} inline={inline} />
        </i>
    );
};

export default TooltipToggle;
