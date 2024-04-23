import classNames from 'classnames';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './ToggleInput.module.scss';

const ToggleInput = ({
    name,
    label = name,
    gridArea = name,
    register,
    getValues,
    schema,
    error,
    border = false
}: {
    // TODO: types!
    name: string;
    label?: ReactNode;
    gridArea?: string;
    register?: any;
    getValues?: any;
    schema?: any;
    error: FieldError | undefined;
    border?: boolean;
}) => {
    return (
        <label
            className={classNames(styles.wrapper, {
                [styles.border]: border
            })}
            style={{ gridArea }}
        >
            <span className={styles.label}>{label}</span>

            <input type='checkbox' name={name} {...register(name, schema)} />

            <div className={styles.track}>
                <div className={classNames(styles.handle, { [styles.active]: getValues(name) === true })} />
            </div>

            {error && <span className={styles.error}>{error.message}</span>}
        </label>
    );
};

export default ToggleInput;
