import type { MouseEvent } from 'react';
import type { Value } from 'react-calendar/dist/cjs/shared/types';
export namespace CalendarDatePickerTypes {

    export type Props = {
        label: string;
        date: Date | null;
        minDate?: Date;
        maxDate?: Date;
        activeDateStart?: Date;
        onChange: (date: Date | null) => void;
    }

    export type onChange = (value: Value, event: MouseEvent<HTMLButtonElement>) => void;
}
