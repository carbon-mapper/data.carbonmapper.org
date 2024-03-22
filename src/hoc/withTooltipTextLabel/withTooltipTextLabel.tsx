import type { ComponentType, PropsWithChildren, ReactElement } from 'react';
import TooltipText from '@/components/atoms/TooltipText/TooltipText';
import styles from './withTooltipTextLabel.module.scss';

export type Props = {
    label?: {
        name: string;
        tooltip: string | ReactElement;
    };
};

export default function withTooltipTextLabel<T extends object>(WrappedComponent: ComponentType<T & Props>) {
    const ComponentWithLabel = (props: PropsWithChildren<T & Props>) => {
        const { label, ...restProps } = props;

        return (
            <div className={styles.wrapper}>
                {props.label && (
                    <TooltipText tooltip={{ fill: true, text: label?.tooltip ?? '' }}>{label?.name}</TooltipText>
                )}
                <WrappedComponent {...(restProps as T)} />
            </div>
        );
    };

    return ComponentWithLabel;
}
