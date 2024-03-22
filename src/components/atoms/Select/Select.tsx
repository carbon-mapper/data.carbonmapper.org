import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './Select.module.scss';

type SelectOption = {
    value: string;
    label: string;
};

interface SelectProps {
    label: string;
    options: readonly SelectOption[];
    current: string;
    onClick: (value: string) => void;
    isReversed?: boolean;
    onReverse?: () => void;
}

export default function Select({ label, options, current, isReversed = false, onClick, onReverse }: SelectProps) {
    return (
        <label className={styles.label}>
            <Select.Current label={label} current={options.find(({ value }) => value === current)?.label || ''} />
            <ul className={styles.list}>
                {options.map(({ value, label }) => (
                    <Select.Option
                        key={value}
                        isCurrent={current === value}
                        value={value}
                        label={label}
                        onClick={onClick}
                    />
                ))}
            </ul>
            {onReverse && (
                <button
                    aria-label='reverse sorting'
                    type='button'
                    className={classNames(styles.reverse, {
                        [styles['is-reversed']]: isReversed
                    })}
                    onClick={onReverse}
                >
                    <Icon icon='triangle' />
                </button>
            )}
        </label>
    );
}

const Current = ({ current, label }: { current: string; label: string }) => (
    <p className={styles.current}>
        <span>{label} </span>
        <span>{current}</span>
    </p>
);

const Option = ({
    isCurrent,
    value,
    label,
    onClick
}: {
    isCurrent: boolean;
    value: string;
    label: string;
    onClick: (value: string) => void;
}) => (
    <li
        className={classNames(styles.option, {
            [styles['is-current']]: isCurrent
        })}
    >
        <button type='button' onClick={() => onClick(value)}>
            {label}
        </button>
    </li>
);

Select.Current = Current;
Select.Option = Option;
