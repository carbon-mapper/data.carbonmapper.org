import { scaleLinear } from 'd3';
import { useMemo } from 'react';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

export const useYLinearScale = ({ data, height }: LineChartTypes.LinearScaleProps) => {
    const yScale = useMemo(() => {
        const domain = [0, Math.max(...data.map(point => point.emission))];
        const range = [height, 0];

        return scaleLinear().domain(domain).range(range);
    }, [data, height]);

    return yScale;
};
