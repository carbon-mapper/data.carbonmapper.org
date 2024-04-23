import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { useAlertsPaused, useAlertActions } from '@/store/useAlertStore/useAlertStore';
import TooltipToggle from '@/components/atoms/TooltipToggle/TooltipToggle';
import { Fieldset } from '../Fieldset/Fieldset';
import InputGroup from '../InputGroup/InputGroup';
import { SelectInput } from '../SelectInput/SelectInput';
import { TextInput } from '../TextInput/TextInput';
import ToggleInput from '../ToggleInput/ToggleInput';
import styles from './Alerts.module.scss';

const SCHEDULE_OPTIONS = ['Real-time', 'Daily', 'Weekly', 'Monthly'] as const;

export const Alerts = () => {
    // const [isSubmitted, setIsSubmitted] = useState(false);
    // const { setView, setMessage } = useAccountActions();

    const alertsPaused = useAlertsPaused();
    const { togglePaused } = useAlertActions();

    const schema = z.object({
        alerts: z.boolean(),
        schedule: z.enum(SCHEDULE_OPTIONS),
        recipients: z
            .array(
                z
                    .string()
                    .min(1, { message: 'Please enter an email' })
                    .email({ message: 'Please enter a valid email address' })
            )
            .optional()
    });

    const {
        control,
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            alerts: true,
            schedule: 'Set schedule',
            recipients: ['']
        },
        resolver: zodResolver(schema)
    });

    watch();

    const { fields, append, remove } = useFieldArray({
        control,
        // TODO: fix this type?
        // @ts-ignore
        name: 'recipients' as const
    });

    const sharedProps = {
        register,
        getValues,
        schema
    };

    const { alerts } = getValues();

    useEffect(() => {
        // set alerts state based on the toggle

        togglePaused(!alerts);
    }, [alerts, togglePaused]);

    return (
        <form className={styles.form}>
            <Fieldset legend='Alerts'>
                {/* ALERTS TOGGLE */}
                <ToggleInput
                    name='alerts'
                    label={
                        <>
                            {/* <span>Alerts</span> */}
                            <span>{alertsPaused ? 'Alerts are paused' : 'Alerts on'}</span>
                            <TooltipToggle
                                tooltip={{
                                    position: 'right',
                                    width: 100,
                                    text: (
                                        <p>
                                            Enable or disable all alerts. When disabled, no alerts will be delivered to
                                            your email address as well as any additional recipient email addresses
                                            provided. Disabling alerts will not impact the below settings.
                                        </p>
                                    )
                                }}
                            />
                        </>
                    }
                    register={register}
                    getValues={getValues}
                    schema={schema}
                    error={errors.alerts}
                    border
                />

                {/* SCHEDULE SELECT */}
                <Controller
                    render={({ field }) => (
                        <SelectInput
                            options={[...SCHEDULE_OPTIONS]}
                            placeholder='Set schedule'
                            {...field}
                            {...sharedProps}
                            error={errors.schedule}
                        />
                    )}
                    control={control}
                    name='schedule'
                />

                {/* RECIPIENTS */}
                <InputGroup
                    title={
                        <>
                            <span>Additional Recipients</span>
                            <TooltipToggle
                                tooltip={{
                                    position: 'right',
                                    width: 100,
                                    text: 'Add additional email addresses to receive alerts.'
                                }}
                            />
                        </>
                    }
                    button={{
                        label: 'Add another email field',
                        handler: () => append('')
                    }}
                    gridArea='recipients'
                >
                    {fields.map((item, index) => (
                        <TextInput
                            key={item.id}
                            name={`recipients.${index}`}
                            type='email'
                            label={`Email ${index + 1}`}
                            removeHandler={() => remove(index)}
                            {...sharedProps}
                            error={errors.recipients && errors.recipients[index]}
                        />
                    ))}
                </InputGroup>
            </Fieldset>
        </form>
    );
};
