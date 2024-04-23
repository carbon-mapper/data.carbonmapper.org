import type { ComponentType, PropsWithChildren } from 'react';
import FilterLabel from '@/components/atoms/FilterLabel/FilterLabel';
import type { WithLabelTypes } from './withLabel.types';
import styles from './withLabel.module.scss';

export default function withLabel<T extends object>(WrappedComponent: ComponentType<T & WithLabelTypes.Props>) {

    const ComponentWithLabel = (props: PropsWithChildren<T & WithLabelTypes.Props>) => {

        const { label, ...restProps } = props;

        return (
            <div className={styles.wrapper}>
                {label && <FilterLabel>{label}</FilterLabel>}
                <WrappedComponent {...(restProps as T)} />
            </div>
        );
    }

    return ComponentWithLabel;
}