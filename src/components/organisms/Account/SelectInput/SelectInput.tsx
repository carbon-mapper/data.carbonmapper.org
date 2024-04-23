import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { FieldError } from 'react-hook-form';
import Icon from '@/components/atoms/Icon/Icon';
import styles from './SelectInput.module.scss';

export function SelectInput({
    name,
    options,
    placeholder = name,
    gridArea = name,
    value,
    onChange,
    error
}: {
    name: string;
    options: string[];
    placeholder: ReactNode;
    gridArea?: string;
    value: string;
    onChange: (value: string) => void;
    error: FieldError | undefined;
}) {
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(prev => !prev);

    const handleOptionClick = (value: string) => {
        onChange(value);
        toggleShow();
    };

    return (
        <label
            key={`${name}-select_input`}
            className={classNames(styles.label, {
                [styles['is-error']]: error
            })}
            style={{ gridArea }}
        >
            <SelectInput.Current current={value || placeholder} isOpen={show} onClick={toggleShow} />
            <ul
                className={classNames(styles.list, {
                    [styles['is-open']]: show
                })}
            >
                <div className={styles['list-wrapper']}>
                    {options.map(option => (
                        <SelectInput.Option key={option} value={option} onClick={() => handleOptionClick(option)} />
                    ))}
                </div>
            </ul>
            {error && <span className={styles.error}>{error.message}</span>}
        </label>
    );
}

const Current = ({ current, isOpen, onClick }: { current: ReactNode; isOpen: boolean; onClick: () => void }) => (
    <button
        type='button'
        onClick={onClick}
        className={classNames(styles.current, {
            [styles['is-open']]: isOpen
        })}
    >
        <span>{current}</span>
        <Icon icon='chevron-down' />
    </button>
);

const Option = ({ value, onClick }: { value: string; onClick: (value: string) => void }) => (
    <li className={classNames(styles.option)}>
        <button type='button' onClick={() => onClick(value)}>
            {value}
        </button>
    </li>
);

SelectInput.Current = Current;
SelectInput.Option = Option;
