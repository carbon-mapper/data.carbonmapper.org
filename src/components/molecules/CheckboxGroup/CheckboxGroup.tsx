import classNames from 'classnames';
import type { ReactElement } from 'react';
import Icon from '@/components/atoms/Icon/Icon';
import withTooltipTextLabel from '@/hoc/withTooltipTextLabel/withTooltipTextLabel';
import styles from './CheckboxGroup.module.scss';

export type Item = {
    value: string;
    name?: string;
    isChecked: boolean;
    onClick: () => void;
};

export function Checkbox({ value, name = value, isChecked, onClick }: Item) {
    return (
        <div className={classNames(styles.wrapper, 'is-checkbox')}>
            <input
                type='checkbox'
                id={name}
                name={name}
                className={classNames('sr-only', styles.input)}
                checked={isChecked}
                onChange={onClick}
                value={name}
            />
            <label htmlFor={name} className={styles.label}>
                <Icon icon='checkbox' />
                <span className={styles.text}>{name}</span>
            </label>
        </div>
    );
}

export interface CheckboxSetProps {
    items: Item[];

    label?: {
        name: string;
        tooltip: string | ReactElement;
    };
}

function CheckboxGroup({ items }: CheckboxSetProps) {
    return (
        <div className={styles.container}>
            {items.map(({ value, isChecked, onClick }) => (
                <Checkbox key={value} value={value} isChecked={isChecked} onClick={onClick} />
            ))}
        </div>
    );
}

export default withTooltipTextLabel(CheckboxGroup);
