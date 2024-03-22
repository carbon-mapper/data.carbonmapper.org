import classNames from 'classnames';
import withLabel from '@/hoc/withLabel/withLabel';
import type { FilterInputTypes } from './FilterInput.types';
import Icon from '../Icon/Icon';
import { getIcon } from './FilterInput.utils';
import styles from './FilterInput.module.scss';

const FilterInput = ({ type, options }: FilterInputTypes.Props) => {
    const { id, alt, value, inputNameTag, placeholder } = options;

    const icon = getIcon(type);

    return (
        <div className={classNames(styles.wrapper, `is-${type}`, { 'is-placeholder': value === '' })}>
            <div className={styles.inner}>
                <label className='sr-only' htmlFor={id}>
                    {alt}
                </label>
                <input
                    type={type === 'select' ? 'hidden' : 'text'}
                    id={id}
                    name={inputNameTag}
                    autoComplete='off'
                    placeholder={placeholder}
                />

                {type === 'select' && (
                    <button className={styles.button} onClick={options.onClick} type='button'>
                        <span>{value ?? placeholder}</span>
                    </button>
                )}

                {icon && type === 'select' && (
                    <div className={styles.icon}>
                        <Icon icon={icon} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default withLabel(FilterInput);
