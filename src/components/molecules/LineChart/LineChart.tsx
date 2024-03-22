import classNames from 'classnames';
import { useRef } from 'react';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { useChartDimensions } from '@/hooks/charts/useChartDimensions';
import { useXTicks } from '@/hooks/charts/useXTicks';
import { useXTimeScale } from '@/hooks/charts/useXTimeScale';
import { useYLinearScale } from '@/hooks/charts/useYLinearScale';
import { useYTicks } from '@/hooks/charts/useYTicks';
import DataCurve from '@/components/atoms/DataCurve/DataCurve';
import DataPoints from '@/components/atoms/DataPoints/DataPoints';
import XAxis from '@/components/atoms/XAxis/XAxis';
import YAxis from '@/components/atoms/YAxis/YAxis';
import type { LineChartTypes } from './LineChart.types';
import { chartSettings } from './LineChart.settings';
import styles from './LineChart.module.scss';

const LineChart = ({ data }: { data: LineChartTypes.PlumeDataPoint[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dimensions = useChartDimensions(chartSettings, containerRef);

    const xScale = useXTimeScale({ data, width: dimensions.boundedWidth });
    const yScale = useYLinearScale({ data, height: dimensions.boundedHeight });
    const { xTicks, timeSpan } = useXTicks({ xScale });
    const yTicks = useYTicks({ yScale });

    const includeNullDetects = useSourceDetailsSlice(state => state.includeNullDetects);

    const dataSorted = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const plumes = dataSorted.filter(item => item.emission && item.emission > 0);
    const nulls = dataSorted.filter(item => item.emission === null);
    const nonQuantified = dataSorted.filter(item => item.emission === 0);

    return (
        <div ref={containerRef} className={classNames(styles.container, 'line-chart')}>
            {/* wrapper */}
            <svg width='100%' height='100%'>
                {/* bounds */}
                <g
                    transform={`
                    translate(${dimensions.marginLeft}, ${dimensions.marginTop})
                    `}
                >
                    {/* axes */}
                    <XAxis
                        ticks={xTicks}
                        timeSpan={timeSpan}
                        width={dimensions.boundedWidth}
                        height={dimensions.boundedHeight}
                    />
                    <YAxis ticks={yTicks} width={dimensions.boundedWidth} />

                    {/* data points */}
                    <DataPoints data={plumes} xScale={xScale} yScale={yScale} />
                    <DataPoints
                        nulls
                        data={includeNullDetects ? [...nulls, ...nonQuantified] : [...nonQuantified]}
                        xScale={xScale}
                        yScale={yScale}
                    />

                    {/* data curve */}
                    <DataCurve
                        data={dataSorted.filter(item => item.emission && item.emission > 0)}
                        xScale={xScale}
                        yScale={yScale}
                    />
                </g>
            </svg>
        </div>
    );
};

export default LineChart;
