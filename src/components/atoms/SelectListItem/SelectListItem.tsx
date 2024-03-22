import classNames from 'classnames';
import type { ChangeEvent } from 'react';
import Icon from '../Icon/Icon';
import styles from './SelectListItem.module.scss';

type Props = {
    name: string;
    label: string;
    checked: boolean;
    isAllChecked?: boolean;
    onClick: (isChecked: boolean) => void;
};

const SelectListItem = ({ name, label, checked, isAllChecked, onClick }: Props) => {
    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: target } = event;
        const { checked } = target;
        onClick(checked);
    };

    return (
        <div className={classNames(styles.wrapper, { 'is-svg-select-line': !isAllChecked && !checked })}>
            <input
                id={`sector-${name}`}
                type='checkbox'
                name={name}
                onChange={handleClick}
                checked={isAllChecked ? false : checked}
            />
            <label className={styles.label} htmlFor={`sector-${name}`}>
                <Icon icon='select' />
                <span>{label}</span>
            </label>
        </div>
    );
};

export default SelectListItem;
