import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import httpClient from '@/utils/httpClient';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { Fieldset } from '../Fieldset/Fieldset';
import { TextInput } from '../TextInput/TextInput';
import styles from './ChangePasswordForm.module.scss';

export const ChangePasswordForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { setView, setMessage } = useAccountActions();

    const schema = z
        .object({
            password: z.string().min(8, {
                message: 'Password is too short. Please choose a password that is at least 8 characters long.'
            }),
            new: z
                .string()
                .min(8, {
                    message: 'Password is too short. Please choose a password that is at least 8 characters long.'
                })
                .refine(
                    password => {
                        return !/^\d+$/.test(password);
                    },
                    {
                        message:
                            'Password is all numbers. Please choose a password that includes a mix of letters, numbers, or symbols.'
                    }
                ),
            confirm: z.string().min(8, { message: 'Please confirm your password' })
        })
        .refine(data => data.new === data.confirm, {
            message: 'Passwords do not match',
            path: ['confirm']
        });

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            password: '',
            new: '',
            confirm: ''
        },
        resolver: zodResolver(schema)
    });

    watch();

    const onSubmit = handleSubmit(async formData => {
        setIsSubmitted(true);

        console.log(formData);

        const { password, new: newPassword, confirm } = formData;

        const body = {
            old_password: password,
            new_password1: newPassword,
            new_password2: confirm
        };

        try {
            const response = await httpClient.post('/account/change_password', body);
            console.log('Change Password successful', response.status);

            setMessage({
                title: 'Confirmation',
                lines: [
                    {
                        text: 'Your password has been successfully changed.',
                        button: {
                            label: 'Login',
                            view: 'login'
                        }
                    }
                ]
            });
            setView('message', 'login');
        } catch (error) {
            console.error(error);
            setMessage({
                title: 'Error',
                lines: [
                    {
                        text: 'Password change failed, please try again.',
                        button: {
                            label: 'Login',
                            view: 'login'
                        }
                    }
                ]
            });
            setView('message');
        }
    });

    const sharedProps = {
        register,
        getValues,
        schema
    };

    return (
        <form className={styles.form}>
            <Fieldset legend='Change password'>
                <TextInput
                    name='password'
                    type='password'
                    label='current password'
                    {...sharedProps}
                    error={errors.password}
                />

                <br />
                <TextInput name='new' type='password' label='new password' {...sharedProps} error={errors.password} />
                <TextInput
                    name='confirm'
                    type='password'
                    label='confirm new password'
                    {...sharedProps}
                    error={errors.confirm}
                />
                <ButtonBox
                    className={styles.submit}
                    gridArea='submit'
                    onClick={onSubmit}
                    ariaLabel='Submit Change Password Form'
                    disabled={isSubmitted}
                >
                    Submit
                </ButtonBox>
            </Fieldset>
        </form>
    );
};
