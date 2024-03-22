// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

const XAxis = ({ ticks, timeSpan, width, height }: LineChartTypes.TimeAxisProps) => {
    const formatValue = (value: Date) => {
        switch (timeSpan) {
            case 'hour':
                return value.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                });
            case 'day':
                return value.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                });
            case 'week':
                return value.toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short'
                });
            case 'month':
                return value.toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short'
                });
            case 'quarter':
                return value.toLocaleString('en-US', {
                    month: 'short',
                    year: 'numeric'
                });
            case 'year':
                return value.toLocaleString('en-US', {
                    month: 'short',
                    year: 'numeric'
                });
            default:
                return value.toLocaleString('en-US', {
                    year: 'numeric'
                });
                break;
        }
    };

    return (
        <svg className='x-axis'>
            <line className='line-bottom' x1='0' x2={width} transform={`translate(0, ${height})`} />
            {[...ticks].map(({ value, offset }, index) => {
                const formattedValue = formatValue(value);

                return (
                    <g className={`label label-${index}`} key={value.toString()} transform={`translate(${offset}, 0)`}>
                        <text y={height}>{formattedValue}</text>
                    </g>
                );
            })}
        </svg>
    );
};

export default XAxis;
