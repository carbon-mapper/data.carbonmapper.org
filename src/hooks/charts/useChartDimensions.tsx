import { useIsomorphicLayoutEffect as useLayoutEffect } from 'swr/_internal';
import { useState, RefObject } from 'react';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

export const useChartDimensions = (
    passedSettings: LineChartTypes.ChartSettings,
    ref: RefObject<HTMLDivElement>
): LineChartTypes.ChartSettings => {
    const dimensions = combineChartDimensions(passedSettings);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const resizeObserver = new ResizeObserver(entries => {
            const entry = entries[0];
            if (width != entry.contentRect.width) setWidth(entry.contentRect.width);
            if (height != entry.contentRect.height) setHeight(entry.contentRect.height);
        });

        resizeObserver.observe(element);

        return () => resizeObserver.unobserve(element);
    }, [ref, width, height]);

    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height
    });

    return newSettings;
};

const combineChartDimensions = (dimensions: LineChartTypes.ChartSettings): LineChartTypes.ChartSettings => {
    const parsedDms = {
        ...dimensions,
        marginTop: dimensions.marginTop || 0,
        marginRight: dimensions.marginRight || 0,
        marginBottom: dimensions.marginBottom || 0,
        marginLeft: dimensions.marginLeft || 0
    };

    const boundedHeight = Math.max(parsedDms.height - parsedDms.marginTop - parsedDms.marginBottom, 0);
    const boundedWidth = Math.max(parsedDms.width - parsedDms.marginLeft - parsedDms.marginRight, 0);

    return {
        ...parsedDms,
        boundedHeight,
        boundedWidth
    };
};
