import * as d3 from 'd3';
import type { LineChartTypes } from '@/components/molecules/LineChart/LineChart.types';

const DataCurve = ({ data, xScale, yScale }: LineChartTypes.DataCurveProps) => {
    const curveGenerator = d3
        .line<LineChartTypes.PlumeDataPoint>()
        .x(point => xScale(point.date))
        .y(point => yScale(point.emission))
        .curve(d3.curveLinear);

    const pathString = curveGenerator(data) || '';

    return (
        <svg className='data-curve'>
            <path className='data-curve' d={pathString}></path>
        </svg>
    );
};

export default DataCurve;
