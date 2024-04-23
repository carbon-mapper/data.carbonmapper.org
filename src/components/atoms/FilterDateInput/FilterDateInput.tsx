import classNames from 'classnames';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { defaultDateStart, defaultDateEnd } from '@/store/useFilterStore/useFilterStore';
import { trackSearchSubmitEvent } from '@/hooks/useGTM';
import { dateParam2Dates, usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { validateDate } from '@/utils/validateDate';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import withLabel from '@/hoc/withLabel/withLabel';
import type { FilterDateInputTypes } from './FilterDateInput.types';
import Icon from '../Icon/Icon';
import { getDefaultPayload, isValidDate, processPayload } from './FilterDateInput.utils';
import styles from './FilterDateInput.module.scss';

// These can go elsewhere, perhaps a config file
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const validTestFormat = '00-00-0000';
const testDateFormatRegex = /^\d{2}-\d{2}-\d{4}$/;
const dateFormat = 'MM-DD-YYYY';

const FilterDateInput = ({ options }: FilterDateInputTypes.Props) => {
    const { id, value, alt, placeholder, onIconClick } = options;

    const [params, setParams] = usePortalQueryParams();
    const { date } = params;
    const { date_start, date_end } = dateParam2Dates(date);

    const [inputValue, setInputValue] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const cursorPositionRef = useRef<number>(0);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { target, nativeEvent } = e;

        const pattern = /[0-9,-/]/;

        let payload: string | null = 'data' in nativeEvent ? (nativeEvent.data as string | null) : '';

        cursorPositionRef.current = target.selectionStart ?? 0;

        if ('inputType' in nativeEvent && nativeEvent.inputType === 'deleteContentBackward') {
            setInputValue(
                inputValue =>
                    inputValue.substring(0, cursorPositionRef.current) +
                    inputValue.substring(cursorPositionRef.current + 1)
            );
        }

        if (!payload?.match(pattern)) return;

        payload = getDefaultPayload(payload);
        payload = processPayload(payload, cursorPositionRef.current, inputValue);

        const date =
            inputValue.substring(0, cursorPositionRef.current - 1) +
            payload +
            inputValue.substring(cursorPositionRef.current - 1);

        const testDate = date.length < dateFormat.length ? date.concat(validTestFormat.substring(date.length)) : date;
        const isValidFormat = isValidDate(testDate, testDateFormatRegex);

        const isFilled = date.length === dateFormat.length;
        const isDateStart = options.type === 'start';

        if (isValidFormat) {
            setInputValue(date);

            if (isFilled) {
                const {
                    isValid,
                    date: validatedDate,
                    error
                } = validateDate({
                    date_end,
                    date_start,
                    date,
                    format: dateFormat,
                    type: options.type
                });

                setErrorMessage(error);

                if (isValid) {
                    trackSearchSubmitEvent('date', params);
                    setParams({
                        date: {
                            date_end: isDateStart ? date_end : validatedDate,
                            date_start: isDateStart ? validatedDate : date_start
                        }
                    });
                }
            }
        }

        if (!isValidFormat && isFilled) {
            setErrorMessage('Enter the correct date');
        }
    };

    const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key.toLowerCase() === 'enter' && validate();
    };

    const onBlur = () => {
        const currentDate = options.type === 'start' ? date_start : date_end;
        const isEmpty = currentDate === null;

        if (!inputValue.length && !isEmpty) {
            setInputValue(
                dayjs(options.type === 'start' ? defaultDateStart.toDate() : defaultDateEnd.toDate()).format(
                    'MM-DD-YYYY'
                )
            );
            setErrorMessage(null);
            return;
        }

        validate();
    };

    const validate = () => {
        const dateFormat = 'MM-DD-YYYY';

        if (dateFormat.length > inputValue.length && inputValue.length > 0) {
            setErrorMessage('Enter the correct date');
            return;
        }

        inputValue.length === 0 && setErrorMessage(null);
    };

    useEffect(() => {
        setInputValue(value);
        setErrorMessage('');
    }, [value]);

    return (
        <div className={classNames(styles.wrapper, { 'is-placeholder': value === '', 'is-error': errorMessage })}>
            <div className={classNames(styles.inner, { 'is-error': errorMessage })}>
                <label className='sr-only' htmlFor={id}>
                    {alt}
                </label>
                <input
                    type='text'
                    id={id}
                    value={inputValue}
                    onChange={onChange}
                    maxLength={10}
                    autoComplete='off'
                    placeholder={placeholder}
                    onKeyUp={onKeyUp}
                    onBlur={onBlur}
                />
                <Button ariaLabel={placeholder} className={styles.button} onClick={onIconClick} type='button'>
                    <span className='sr-only'>{placeholder}</span>
                    <div className={styles.icon}>
                        <Icon icon='calendar' />
                    </div>
                </Button>
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            </div>
        </div>
    );
};

export default withLabel(FilterDateInput);
