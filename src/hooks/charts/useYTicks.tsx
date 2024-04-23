import { useMemo } from 'react';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

export const useYTicks = ({ yScale }: LineChartTypes.UseTicksLinearProps) => {
    const yTicks = useMemo(() => {
        const numberOfTicksTarget = 5;

        return yScale.nice().ticks(numberOfTicksTarget).map(value => ({
            value: value,
            offset: yScale(value + 0)
        }));
    }, [yScale]);

    return yTicks;
};
