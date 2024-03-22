import classNames from 'classnames';
import { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import type { CalendarDatePickerTypes } from './CalendarDatePicker.types';
import Icon from '../Icon/Icon';
import { formatShortWeekday } from './CalendarDatePicker.utils';
import styles from './CalendarDatePicker.module.scss';

const CalendarDatePicker = ({ date, minDate, maxDate, onChange, activeDateStart, label }: CalendarDatePickerTypes.Props) => {
    const [value, onCalendarChange] = useState(date);

    useEffect(() => {
        date === null && onCalendarChange(date);
    }, [date]);

    return (
        <div className={styles.wrapper}>
            <p className={styles.label}>{label}</p>
            <ReactCalendar
                onChange={innerValue => {
                    const date = innerValue?.toString() == value?.toString() ? null : (innerValue as Date);
                    onCalendarChange(date);
                    onChange(date);
                }}
                value={value}
                formatShortWeekday={formatShortWeekday}
                locale={'en-US'}
                minDate={minDate}
                maxDate={maxDate}
                defaultActiveStartDate={activeDateStart}
                nextLabel={
                    <span className={classNames(styles.button, 'is-next')}>
                        <Icon icon='chevron' />
                        <span className='sr-only'>next date range</span>
                    </span>
                }
                prevLabel={
                    <span className={classNames(styles.button, 'is-prev')}>
                        <Icon icon='chevron' />
                        <span className='sr-only'>previous date range</span>
                    </span>
                }
            />
        </div>
    );
};

export default CalendarDatePicker;
