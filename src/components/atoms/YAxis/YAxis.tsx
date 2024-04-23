import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

const YAxis = ({ ticks, width }: LineChartTypes.AxisProps) => {
    return (
        <svg className='y-axis'>
            {ticks.map((tick, index) => {
                const { value, offset } = tick;

                return (
                    <g className={`label label-${index}`} key={value.toString()} transform={`translate(0, ${offset})`}>
                        <line className='grid-line' x1='0' x2={width} />
                        <text key={index} x='-15'>
                            {value}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default YAxis;
