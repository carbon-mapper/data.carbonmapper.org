import { timeMinute, timeHour, timeDay, timeWeek, timeMonth, timeYear } from 'd3';
import { useMemo } from 'react';
import type { CountableTimeInterval, TimeInterval } from 'd3';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

function compareDates(date1: Date, date2: Date): string {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        return 'Invalid Date';
    }

    const date1ms = date1.getTime();
    const date2ms = date2.getTime();
    const diff = Math.abs(Number(date1ms) - date2ms); // difference in milliseconds
    const oneHour = 1000 * 60 * 60; // milliseconds in an hour
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const oneWeek = oneDay * 7;
    const oneMonth = oneDay * 30; // Approximate, since not all months have 30 days
    const oneYear = oneDay * 365; // Approximate, without accounting for leap years

    switch (true) {
        case diff < oneHour:
            return 'hour';
        case diff <= oneDay:
            return 'day';
        case diff <= oneWeek:
            return 'week';
        case diff <= oneMonth:
            return 'month';
        case diff <= oneMonth * 3:
            return 'quarter';
        case diff <= oneYear:
            return 'year';
        default:
            return 'more than a year';
    }
}

const getTimeIntervals = (timeSpan: string): CountableTimeInterval | TimeInterval => {
    switch (timeSpan) {
        case 'hour':
            return timeMinute.every(5) || timeHour;
        case 'day':
            return timeHour.every(3) || timeDay;
        case 'week':
            return timeDay;
        case 'month':
            return timeWeek;
        case 'quarter':
            return timeMonth;
        case 'year':
            return timeMonth.every(3) || timeYear;
        default:
            return timeYear;
    }
};

export const useXTicks = ({ xScale }: LineChartTypes.UseTicksTimeProps) => {
    const firstTick = xScale.ticks()[0];
    const lastTick = xScale.ticks()[xScale.ticks().length - 1];
    const timeSpan = compareDates(firstTick, lastTick);

    const xTicks = useMemo(() => {
        const timeFrame = getTimeIntervals(timeSpan);

        return xScale
            .nice()
            .ticks(timeFrame)
            .map(value => ({ value, offset: xScale(value) }));
    }, [timeSpan, xScale]);

    return {
        timeSpan,
        xTicks
    };
};
