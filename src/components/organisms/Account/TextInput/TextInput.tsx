import classNames from 'classnames';
import { MouseEvent, useState } from 'react';
import { FieldError } from 'react-hook-form';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';
import Icon from '@/components/atoms/Icon/Icon';
import styles from './TextInput.module.scss';

/**
 * TextInput Component
 *
 * A customizable text input component that supports various input types, including text, password, and email.
 *
 * Props:
 * - `name` (Required): Specifies the name of the input. Also used for default label and gridArea if not provided.
 * - `type` (Optional): Specifies the input type. Default is 'text'. Supported values: 'text', 'password', 'email'.
 * - `label` (Optional): Specifies the label text. Defaults to the `name` prop.
 * - `placeholder` (Optional): Specifies the placeholder text for the input. Defaults to the `label` prop or `name` prop if the label is not provided.
 * - `gridArea` (Optional): Specifies the grid area for the component for CSS Grid layout. Defaults to the `name` prop.
 *
 * Features:
 * - For password input, an eye icon button is provided to toggle visibility.
 * - Styles for the container, input, label, error message, and password visibility button are defined in `TextInput.module.scss`.
 *
 * Example Usage:
 * ```jsx
 * <TextInput name="username" type="text" label="Username" placeholder="Enter your username" />
 * <TextInput name="password" type="password" />
 * <TextInput name="email" type="email" label="Email Address" />
 * ```
 */

export const TextInput = ({
    name,
    type = 'text',
    isRequired = true,
    autocomplete = false,
    label = name,
    placeholder = label || name,
    removeHandler,
    gridArea = name,
    register,
    getValues,
    schema,
    error
}: {
    // TODO: types!
    name: string;
    type?: 'text' | 'password' | 'email';
    isRequired?: boolean;
    autocomplete?: boolean;
    label?: string;
    placeholder?: string;
    removeHandler?: () => void;
    gridArea?: string;
    register?: any;
    getValues?: any;
    schema?: any;
    error: FieldError | undefined;
}) => {
    const [show, setShow] = useState(false);

    function onClickHandler(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        setShow(prev => !prev);
    }

    return (
        <label
            className={classNames(styles.container, {
                [styles['is-error']]: error
            })}
            style={{ gridArea }}
            key={`${name}-text_input`}
        >
            <input
                {...register(name, schema, { required: isRequired })}
                className={classNames(styles.input, {
                    [styles['is-not-empty']]: getValues(name).length > 0
                })}
                type={type === 'password' && show ? 'text' : type}
                name={name}
                placeholder={placeholder}
                autoComplete={!autocomplete && name}
            />
            <span className={styles.label}>{label}</span>
            {error && <span className={styles.error}>{error.message}</span>}
            {type === 'password' && (
                <Button
                    ariaLabel={` ${show ? 'Hide' : 'Show'} password`}
                    className={classNames(styles.show, {
                        [styles['is-password-visible']]: show
                    })}
                    onClick={onClickHandler}
                >
                    <Icon icon='eye' />
                </Button>
            )}
            {removeHandler && (
                <ButtonIcon
                    ariaLabel='Remove field'
                    options={{
                        tiny: true
                    }}
                    icon='delete'
                    onClick={removeHandler}
                    className={styles.remove}
                />
            )}
        </label>
    );
};
