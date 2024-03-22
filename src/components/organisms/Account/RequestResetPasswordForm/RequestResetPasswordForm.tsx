import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import httpClient from '@/utils/httpClient';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { Fieldset } from '../Fieldset/Fieldset';
import { TextInput } from '../TextInput/TextInput';
import styles from './RequestResetPasswordForm.module.scss';

export const RequestResetPasswordForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { setView, setMessage } = useAccountActions();

    const schema = z.object({
        email: z
            .string()
            .min(1, { message: 'Please enter your email' })
            .email({ message: 'Please enter a valid email address' })
    });

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(schema)
    });

    watch();

    const onSubmit = handleSubmit(async formData => {
        setIsSubmitted(true);

        try {
            await httpClient.post('/account/request_password_reset', formData);

            setMessage({
                title: 'Confirmation',
                lines: [
                    {
                        text: 'Please check your email for a link to reset your password.',
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
                        text: 'The email you entered is incorrect. Please try again.'
                    }
                ]
            });
            setView('message', 'request-reset-password');
        }
    });

    return (
        <form className={styles.form}>
            <Fieldset legend='Reset password'>
                <TextInput
                    name='email'
                    type='email'
                    register={register}
                    getValues={getValues}
                    schema={schema}
                    error={errors.email}
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
