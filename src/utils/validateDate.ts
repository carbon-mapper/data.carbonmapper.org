import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FiltersDate } from '@/store/useFilterStore/useFilterStore';

dayjs.extend(customParseFormat);

type DateValidationProps = {
    date: string;
    type: 'start' | 'end';
    date_start: FiltersDate;
    date_end: FiltersDate;
    format: string;
};

type DateValidationReturn = {
    error: string | null;
    isValid: boolean;
    date: FiltersDate;
};

const formatRegEx = /^(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])-\d{4}$/;

// Idk if we need to be doing any of this
export const validateDate = ({
    date,
    date_end,
    date_start,
    type,
    format
}: DateValidationProps): DateValidationReturn => {
    const dayjsObject = dayjs(date, format);

    const dateObject = {
        date: dayjsObject.toDate(),
        display: dayjsObject.format(format)
    };

    let isValid: boolean = formatRegEx.test(date);

    if (!isValid) {
        return {
            error: 'Enter the correct date',
            date: dateObject,
            isValid
        };
    }

    if (type === 'start' && isValid) {
        isValid = date_end ? dayjs(dateObject.date).isSameOrBefore(date_end.date) : true;

        return {
            isValid,
            date: dateObject,
            error: isValid ? null : 'The date should be earlier'
        };
    }

    if (type === 'end' && isValid) {
        isValid = date_start ? dayjs(dateObject.date).isSameOrAfter(date_start.date) : true;

        return {
            isValid,
            date: dateObject,
            error: isValid ? null : 'The date should be later'
        };
    }

    return {
        isValid,
        date: dateObject,
        error: null
    };
};
