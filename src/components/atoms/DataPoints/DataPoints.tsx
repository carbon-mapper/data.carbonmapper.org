import classNames from 'classnames';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';

const DataPoints = ({ nulls, data, xScale, yScale }: LineChartTypes.DataPointsProps) => {
    const activePlumeLayerId = useSourceDetailsSlice(state => {
        if (state.activePlume === null) return undefined;
        if (typeof state.activePlume === 'string') return undefined;

        return state.activePlume.layerID;
    });
    const activePlumeId = activePlumeLayerId ? activePlumeLayerId.slice(activePlumeLayerId.indexOf('-') + 1) : null;

    return (
        <svg className='data-points'>
            {data.map((point, index) => {
                return (
                    <circle
                        key={index}
                        className={classNames('data-point', { null: nulls })}
                        cx={xScale(point.date)}
                        cy={yScale(point.emission ?? 0)}
                        r={activePlumeId === point.id ? 5 : 3}
                    />
                );
            })}
        </svg>
    );
};

export default DataPoints;
