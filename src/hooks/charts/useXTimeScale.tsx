import { extent, scaleTime } from 'd3';
import { useMemo } from 'react';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

export const useXTimeScale = ({ data, width }: LineChartTypes.TimeScaleProps) => {

    const xScale = useMemo(() => {
        const dates = data.map(entry => entry.date);
        const domain = extent(dates) as [Date, Date];
        const range = [0, width];

        return scaleTime().domain(domain).range(range);
    }, [data, width]);

    return xScale;
};
