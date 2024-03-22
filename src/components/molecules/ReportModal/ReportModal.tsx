import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import httpClient from '@/utils/httpClient';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './ReportModal.module.scss';

const maxTopicLength = 50;

const ReportModal = ({ onClose }: { onClose: () => void }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const schema = z.object({
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Please enter a valid email address' }),
        topic: z.string().min(1, { message: 'Please enter a topic' }),
        message: z.string().min(1, { message: 'Please enter a message' })
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            topic: '',
            message: ''
        },
        resolver: zodResolver(schema)
    });

    const onSubmit = handleSubmit(async formData => {
        setIsDisabled(true);
        try {
            const { data } = await httpClient.post('/account/report', formData);

            if (data) setIsSubmitted(true);
        } catch (error) {
            console.log(error);
            return error;
        }
    });

    return (
        <Modal isDarkBg size='m' title='Comment / Report' onClose={onClose}>
            {isSubmitted ? (
                <div className={styles.submitted}>
                    <h2>Thank you!</h2>
                    <p>Your message has been sent.</p>
                </div>
            ) : (
                <form className={styles.form}>
                    <fieldset>
                        <label>
                            <span>Email</span>
                            <input type='text' {...register('email', { required: true })} />
                            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                        </label>
                        <label>
                            <span>Topic</span>
                            <input
                                type='text'
                                {...register('topic', {
                                    required: true,
                                    maxLength: maxTopicLength
                                })}
                            />
                            {errors.topic && <span className={styles.error}>{errors.topic.message}</span>}
                        </label>
                        <label style={{ display: 'block' }}>
                            <span>Message or Observation</span>
                            <textarea {...register('message', { required: true })}></textarea>
                            {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                        </label>
                    </fieldset>

                    <div className={styles.footer}>
                        <ButtonBox onClick={onSubmit} disabled={isDisabled} aria-label='Submit Comment/Report'>
                            Submit
                        </ButtonBox>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default withPortal(ReportModal);
