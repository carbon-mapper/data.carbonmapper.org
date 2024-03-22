import { useMsal } from '@azure/msal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { trackEvent } from '@/hooks/useGTM';
import httpClient from '@/utils/httpClient';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import ButtonUnderline from '@/components/atoms/ButtonUnderline/ButtonUnderline';
import { Fieldset } from '../Fieldset/Fieldset';
import { TextInput } from '../TextInput/TextInput';
import styles from './LoginForm.module.scss';

const MsSignInButton = () => {
    const { instance } = useMsal();

    return (
        <ButtonUnderline bold className={styles.msLoginBtn} onClick={() => instance.loginRedirect()}>
            Carbon Mapper Sign In
        </ButtonUnderline>
    );
};

export const LoginForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { setView, setMessage, login } = useAccountActions();

    const schema = z.object({
        email: z
            .string()
            .min(1, { message: 'Please enter your email' })
            .email({ message: 'Please enter a valid email address' }),
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
            )
    });

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(schema)
    });

    watch();

    const onSubmit = handleSubmit(async formData => {
        setIsSubmitted(true);

        try {
            // Poor typings
            const response = await httpClient.post('/token/pair', formData, {
                skipAuthRefresh: true
            } as AxiosAuthRefreshRequestConfig);

            login(response.data);
            setView('profile');

            // Tracking
            trackEvent({
                event: 'account',
                event_name: 'login_success',
                account_type: 'email'
            });
        } catch (error) {
            console.error(error);
            setMessage({
                title: 'Error',
                lines: [
                    {
                        text: 'The email or password you entered is incorrect. Please try again.',
                        button: {
                            label: 'Login',
                            view: 'login'
                        }
                    }
                ]
            });
            setView('message');

            // Tracking
            trackEvent({
                event: 'account',
                event_name: 'login_failed',
                account_type: 'email',
                // TODO: type the errors!
                // @ts-ignore
                error_code: error.response.status,
                // @ts-ignore
                error_name: error.response.data.detail
            });
        }
    });

    const sharedProps = {
        register,
        getValues,
        schema
    };

    return (
        <>
            <form className={styles.form}>
                <Fieldset legend='User login'>
                    <TextInput name='email' type='email' {...sharedProps} error={errors.email} />
                    <TextInput name='password' type='password' {...sharedProps} error={errors.password} />
                    <ButtonUnderline bold onClick={() => setView('request-reset-password')}>
                        Reset Password
                    </ButtonUnderline>
                    <ButtonBox
                        className={styles.submit}
                        gridArea='submit'
                        onClick={onSubmit}
                        ariaLabel='Submit login form'
                        disabled={isSubmitted}
                    >
                        Submit
                    </ButtonBox>
                </Fieldset>
            </form>
            <MsSignInButton />
        </>
    );
};
