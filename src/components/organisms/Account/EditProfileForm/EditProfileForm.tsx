import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { useCurrentUser } from '@/hooks/useUser';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { Fieldset } from '../Fieldset/Fieldset';
import { TextInput } from '../TextInput/TextInput';
import styles from './EditProfileForm.module.scss';

// This isn't even used anywhere - complete later
export const EditProfileForm = () => {
    const { setView } = useAccountActions();
    const { data } = useCurrentUser();
    console.log(data);

    const schema = z.object({
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Please enter a valid email address' }),
        first: z.string().min(1, { message: 'Please enter a first name' }),
        last: z.string().min(1, { message: 'Please enter a last name' }),
        organization: z.string().min(1, { message: 'Please enter a organization name' }),
        title: z.string().min(1, { message: 'Please enter a title' })
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
            first: '',
            last: '',
            organization: '',
            title: ''
        },
        resolver: zodResolver(schema)
    });

    watch();

    // Requires call to API
    const onSubmit = handleSubmit(async formData => {
        console.log(formData);
        setView('profile');
    });

    const sharedProps = {
        register,
        getValues,
        schema
    };

    return (
        <form className={styles.form}>
            <Fieldset legend='Edit user profile'>
                <TextInput name='email' type='email' {...sharedProps} error={errors.email} />
                <TextInput name='first' label='first name' {...sharedProps} error={errors.first} />
                <TextInput name='last' label='last name' {...sharedProps} error={errors.last} />
                <TextInput name='organization' label='organization name' {...sharedProps} error={errors.organization} />
                <TextInput name='title' {...sharedProps} error={errors.title} />
                <ButtonBox
                    className={styles.submit}
                    gridArea='submit'
                    onClick={onSubmit}
                    ariaLabel='Submit changes to user profile'
                >
                    Submit
                </ButtonBox>
            </Fieldset>
        </form>
    );
};
