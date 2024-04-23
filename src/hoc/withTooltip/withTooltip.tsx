import type { ComponentType, PropsWithChildren } from 'react';
import Tooltip from '@/components/atoms/Tooltip/Tooltip';
import { type Props as TooltipProps } from '@/components/atoms/Tooltip/Tooltip';

type Props = {
    tooltip?: TooltipProps;
};

export default function withTooltip<T extends object>(WrappedComponent: ComponentType<T & Props>) {
    const ComponentWithTooltip = (props: PropsWithChildren<T & Props>) => {
        const { tooltip, ...restProps } = !props.tooltip ? { tooltip: undefined, ...props } : props;

        return (
            <WrappedComponent {...(restProps as T)}>
                {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} inline />}
            </WrappedComponent>
        );
    };

    return ComponentWithTooltip;
}
