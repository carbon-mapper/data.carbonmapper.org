import classNames from 'classnames';
import { ReactNode } from 'react';
import LayersPanelButton from '@/components/atoms/LayersPanelButton/LayersPanelButton';
import LayersPanelRangeInput from '@/components/atoms/LayersPanelRangeInput/LayersPanelRangeInput';
import LayersPanelToggleInput from '../LayersPanelToggleInput/LayersPanelToggleInput';
import styles from './LayersPanelItem.module.scss';

export type RangeItemProps = {
    label: string;
    state: number;
    handler: (value: number) => void;
    endHandler: (value: number) => void;
};

export const LayersPanelRangeItem = ({ label, state, handler, endHandler }: RangeItemProps) => {
    return (
        <div className={styles.item}>
            <label className={styles.label} htmlFor={label}>
                {label}
            </label>
            <div className={styles.body}>
                <LayersPanelRangeInput inside id={label} value={state} setValue={handler} setValueOnEnd={endHandler} />
            </div>
        </div>
    );
};

export type ToggleItemProps = {
    children?: ReactNode;
    label: string;
    state: boolean;
    handler: (value: boolean) => void;
};

export const LayersPanelToggleItem = ({ children, label, state, handler }: ToggleItemProps) => {
    return (
        <div className={styles.item}>
            <label className={styles.label} htmlFor={label}>
                {label}
            </label>
            <div className={styles.body}>
                <span className={styles.text}>{children}</span>
                <LayersPanelToggleInput id={label} state={state} handler={handler} />
            </div>
        </div>
    );
};

export type ItemProps = {
    children?: ReactNode;
    label: string;
    items:
        | {
              name: string;
              alt: string;
          }[]
        | undefined;
    state: string;
    handler: (value: string) => void;
    canDisable?: boolean;
    noBottomRadius?: boolean;
};

export const LayersPanelItem = ({ children, label, items, state, handler, canDisable, noBottomRadius }: ItemProps) => {
    return (
        <div className={classNames(styles.item, { [styles['no-bottom-radius']]: noBottomRadius })}>
            <label className={styles.label}>{label}</label>
            <div className={styles.body}>
                {items &&
                    items.map(item => (
                        <LayersPanelButton
                            key={item.alt}
                            alt={item.alt}
                            src={`/${item.name}.jpg`}
                            name={item.name}
                            state={state}
                            setState={handler}
                            canDisable={canDisable}
                        />
                    ))}
                {children}
            </div>
        </div>
    );
};

export type ItemWithRangeProps = {
    children?: ReactNode;
    label: string;
    items:
        | {
              name: string;
              alt: string;
          }[]
        | undefined;
    state: string;
    handler: (value: string) => void;
    rangeState: number;
    rangeHandler: (vacalue: number) => void;
    endHandler: (vacalue: number) => void;
    canDisable?: boolean;
};

const withRangeInput = <P extends ItemWithRangeProps>(Component: React.FC<P>) => {
    const ComponentWithRangeInput = (props: P) => {
        const { label, rangeState, rangeHandler, endHandler } = props;

        return (
            <Component {...props} noBottomRadius={true}>
                <LayersPanelRangeInput id={label} value={rangeState} setValue={rangeHandler} setValueOnEnd={endHandler} />
            </Component>
        );
    };

    return ComponentWithRangeInput;
};

export const LayersPanelItemWithRangeInput = withRangeInput(LayersPanelItem);
