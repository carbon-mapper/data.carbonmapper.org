import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { trackEvent } from '@/hooks/useGTM';
import httpClient from '@/utils/httpClient';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { Fieldset } from '../Fieldset/Fieldset';
import { SelectInput } from '../SelectInput/SelectInput';
import { TextArea } from '../TextArea/TextArea';
import { TextInput } from '../TextInput/TextInput';
import styles from './RegisterForm.module.scss';

const industryOptionsMap = [
    {
        value: 'academic',
        label: 'Academic'
    },
    {
        value: 'nonprofit',
        label: 'NGO / Nonprofit'
    },
    {
        value: 'government',
        label: 'Government'
    },
    {
        value: 'media',
        label: 'Media'
    },
    {
        value: 'finance',
        label: 'Finance'
    },
    {
        value: 'business',
        label: 'Business'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

const industryOptions = industryOptionsMap.map(option => option.label);

export const RegisterForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { setView, setMessage } = useAccountActions();

    const schema = z
        .object({
            email: z
                .string()
                .min(1, { message: 'Please enter your email' })
                .email({ message: 'Please enter a valid email address' }),
            first: z.string().min(1, { message: 'Please enter your first name' }),
            last: z.string().min(1, { message: 'Please enter your last name' }),
            organization: z.string().min(1, { message: 'Please enter an organization name' }),
            industry: z.string().min(1, { message: 'Please select an industry' }),
            notes: z.string().min(1, { message: 'Please, tell us a little more' }),
            title: z.string().min(1, { message: 'Please enter a title' }),
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
        })
        .refine(data => data.password !== data.email, {
            message: 'Password is too similar to email address. Please choose a different password.',
            path: ['password']
        });

    const {
        control,
        getValues,
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            first: '',
            last: '',
            organization: '',
            title: '',
            industry: '',
            notes: '',
            password: '',
            confirm: ''
        },
        resolver: zodResolver(schema)
    });

    watch();

    const onSubmit = handleSubmit(async formData => {
        setIsSubmitted(true);

        const { email, password, confirm, first, last, organization, title, industry, notes } = formData;

        const body = {
            email: email,
            password1: password,
            password2: confirm,
            first_name: first,
            last_name: last,
            organization: organization,
            title: title,
            industry: industryOptionsMap.find(option => option.label === industry)?.value,
            notes: notes
        };

        try {
            await httpClient.post('/account/register', body);

            setMessage({
                title: 'Confirmation',
                lines: [
                    {
                        text: 'Your registration has been processed. You will receive an email with a verification link. Please follow the link to activate your account.',
                        button: {
                            label: 'Login',
                            view: 'login'
                        }
                    }
                ]
            });
            setView('message', 'login');

            // Tracking
            trackEvent({
                event: 'account',
                event_name: 'register_processed',
                account_type: 'email'
            });
        } catch (error) {
            console.error(error);

            setMessage({
                title: 'Error',
                lines: [
                    {
                        text: 'We could not create an account with that email address. Please try again.',
                        button: {
                            label: 'Register',
                            view: 'register'
                        }
                    }
                ]
            });
            setView('message', 'register');
        }
    });

    const sharedProps = {
        register,
        getValues,
        schema
    };

    return (
        <form className={styles.form}>
            <Fieldset legend='User registration'>
                <TextInput name='email' type='email' {...sharedProps} error={errors.email} />
                <TextInput name='first' label='first name' {...sharedProps} error={errors.first} />
                <TextInput name='last' label='last name' {...sharedProps} error={errors.last} />
                <TextInput name='organization' label='organization name' {...sharedProps} error={errors.organization} />
                <TextInput name='title' {...sharedProps} error={errors.title} />
                <Controller
                    render={({ field }) => (
                        <SelectInput
                            options={[...industryOptions]}
                            placeholder='Industry'
                            {...field}
                            // {...sharedProps}
                            error={errors.industry}
                        />
                    )}
                    control={control}
                    name='industry'
                    defaultValue={''}
                />

                <TextArea
                    name='notes'
                    label='How do you plan to use our data (please be specific)'
                    {...sharedProps}
                    error={errors.notes}
                />
                <TextInput name='password' type='password' {...sharedProps} error={errors.password} />
                <TextInput
                    name='confirm'
                    type='password'
                    label='confirm password'
                    {...sharedProps}
                    error={errors.confirm}
                />
                <ButtonBox
                    className={styles.submit}
                    gridArea='submit'
                    onClick={onSubmit}
                    ariaLabel='Submit registration form'
                    disabled={isSubmitted}
                >
                    Submit
                </ButtonBox>
            </Fieldset>
        </form>
    );
};
