import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import * as z from 'zod';
import { useId, useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import SearchItemButtonGroup from '@/components/atoms/SearchItemButtonGroup/SearchItemButtonGroup';
import styles from './SaveForm.module.scss';

// TODO: temporary, revisit when backend is ready

export namespace SaveFormTypes {
    export type FormType = 'save' | 'display';

    export type CommonProps = {
        className?: string;
        boxClassName?: string;
        formItemClassName?: string;
        bottomTagClassName?: string;
        bottomTag?: string;
    };

    export type onSubmit = (name: string, isEditMode?: boolean) => void;

    export type SaveProps = CommonProps & {
        info: string;
        name?: string;
        callbacks: {
            onSubmit: onSubmit;
        };
    };

    export type DisplayProps = CommonProps & {
        name: string;
        deletePopup: {
            title: string;
            subtitle?: string;
        };
        callbacks: {
            onSubmit?: onSubmit;
            onDelete?: () => void;
            onClick?: () => void;
        };
    };

    export type Props = {
        [T in FormType]: {
            type: T;
            label: string;
            children?: ReactNode;
            options: T extends 'save' ? SaveProps : DisplayProps;
        };
    }[FormType];
}

const SaveForm = ({ type, children, options, label }: SaveFormTypes.Props) => {
    const { onSubmit } = options.callbacks;

    const [isEditMode, setIsEditMode] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const searchId = useId();
    const formId = `save-form-name-${searchId}`;

    const onEdit = () => {
        setIsEditMode(true);
    };

    const onDiscardChanges = () => {
        options?.name ? setValue('name', options.name) : resetField('name');
        clearErrors('name');
        setIsEditMode(false);
    };

    const formClassName = classNames(styles.form, options?.className, `is-${type}-type`, {
        'is-edit-mode': isEditMode
    });

    const schema = z.object({
        name: z.string().trim().min(3, {
            message: 'Name should have at least 3 characters'
        })
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        setValue,
        resetField,
        clearErrors
    } = useForm({
        defaultValues: {
            name: options?.name ?? ''
        },
        resolver: zodResolver(schema),
        reValidateMode: 'onChange'
    });

    const { onChange, onBlur, name: inputName, ref: inputRef } = register('name');

    const onFormSubmit = handleSubmit(({ name }) => {
        if (errors.name) return;

        onSubmit && onSubmit(name, isEditMode);

        if (type === 'display') {
            setIsEditMode(false);
        }
    });

    useEffect(() => {
        isEditMode ? setFocus('name') : formRef?.current?.querySelector('input')?.blur();
    }, [isEditMode, formRef, setFocus]);

    return (
        <form onSubmit={onFormSubmit} className={formClassName} id={`save-search-form-${searchId}`} ref={formRef}>
            <div className={classNames('box', styles.box, options?.boxClassName)}>
                <div className={classNames(styles.formItem, options?.formItemClassName, { 'is-error': errors.name })}>
                    <input
                        onChange={onChange}
                        onBlur={onBlur}
                        name={inputName}
                        ref={inputRef}
                        type='text'
                        placeholder='Enter a search name'
                        id={formId}
                        maxLength={30}
                        spellCheck='false'
                        autoComplete='off'
                    />

                    {options.bottomTag && !isEditMode && (
                        <span className={classNames(styles.bottomTag, options.bottomTagClassName)}>
                            {options.bottomTag}
                        </span>
                    )}
                    <label htmlFor={formId}>{label}</label>
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                </div>

                {!isEditMode && type === 'display' && (
                    <button className={styles.button} type='button' onClick={options.callbacks.onClick}>
                        <span className='sr-only'>set this filter</span>
                    </button>
                )}

                {type === 'display' && (
                    <SearchItemButtonGroup
                        isEditMode={isEditMode}
                        className={styles.panel}
                        title={options.deletePopup.title}
                        // TODO: check
                        subtitle={options.deletePopup.subtitle || ''}
                        // TODO
                        onDelete={options.callbacks.onDelete as () => void}
                        onEdit={onEdit}
                        onDiscardChanges={onDiscardChanges}
                        onApplyChanges={onFormSubmit}
                    />
                )}

                {children}
            </div>

            {type === 'save' && (
                <div className={styles.bottom}>
                    {/* <InfoSwitcher className={styles.info}>{options.info}</InfoSwitcher> */}
                    <ButtonBox type='submit'>Save</ButtonBox>
                </div>
            )}
        </form>
    );
};

export default SaveForm;
