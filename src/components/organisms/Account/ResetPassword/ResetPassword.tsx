import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import httpClient from '@/utils/httpClient';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { Fieldset } from '../Fieldset/Fieldset';
import { TextInput } from '../TextInput/TextInput';
import styles from './ResetPassword.module.scss';

export const ResetPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { setView, setMessage } = useAccountActions();

    const schema = z
        .object({
            password: z
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
        .refine(data => data.password === data.confirm, {
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
            confirm: ''
        },
        resolver: zodResolver(schema)
    });

    watch();

    const onSubmit = handleSubmit(async formData => {
        setIsSubmitted(true);

        const { password, confirm } = formData;
        const uidb64 = localStorage.getItem('uidb64');
        const token = localStorage.getItem('token');

        const body = {
            new_password1: password,
            new_password2: confirm,
            uidb64: uidb64,
            token: token
        };

        try {
            await httpClient.post('/account/reset_password', body);

            setMessage({
                title: 'Confirmation',
                lines: [
                    {
                        text: 'Your password has been reset.',
                        button: {
                            label: 'Login',
                            view: 'login'
                        }
                    }
                ]
            });
            setView('message');
        } catch (error) {
            console.error(error);

            setMessage({
                title: 'Error',
                lines: [
                    {
                        text: 'Password reset failed. Please try again.',
                        button: {
                            label: 'Reset password',
                            view: 'reset-password'
                        }
                    }
                ]
            });
            setView('message', 'reset-password');
        }
    });

    return (
        <form className={styles.form}>
            <Fieldset legend='Reset password'>
                <TextInput
                    name='password'
                    type='password'
                    register={register}
                    getValues={getValues}
                    schema={schema}
                    error={errors.password}
                />
                <TextInput
                    name='confirm'
                    type='password'
                    register={register}
                    getValues={getValues}
                    schema={schema}
                    error={errors.confirm}
                />
                <ButtonBox
                    className={styles.submit}
                    gridArea='submit'
                    onClick={onSubmit}
                    ariaLabel='Submit reset password form'
                    disabled={isSubmitted}
                >
                    Submit
                </ButtonBox>
            </Fieldset>
        </form>
    );
};
