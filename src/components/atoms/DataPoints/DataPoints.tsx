import classNames from 'classnames';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';

const DataPoints = ({ nulls, data, xScale, yScale }: LineChartTypes.DataPointsProps) => {
    const activePlume = useSourceDetailsSlice(state => state.activePlume);

    return (
        <svg className='data-points'>
            {data.map((point, index) => {
                return (
                    <circle
                        key={index}
                        className={classNames('data-point', { null: nulls })}
                        cx={xScale(point.date)}
                        cy={yScale(point.emission ?? 0)}
                        r={activePlume?.id === point.id ? 5 : 3}
                    />
                );
            })}
        </svg>
    );
};

export default DataPoints;
