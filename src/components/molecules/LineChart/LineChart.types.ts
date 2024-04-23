import type { ScaleLinear, ScaleTime } from 'd3';

export namespace LineChartTypes {
    export type ChartSettings = {
        width: number;
        height: number;
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        marginBottom: number;
        boundedHeight: number;
        boundedWidth: number;
    };

    export type Tick = {
        value: number;
        offset: number;
    };

    export type TimeTick = {
        value: Date;
        offset: number;
    };

    export type AxisProps = {
        ticks: Tick[];
        width: number;
    };

    export type TimeAxisProps = {
        ticks: TimeTick[];
        timeSpan: string;
        width: number;
        height: number;
    };

    export type Plume = {
        id: string;
        emission_auto: number;
        scene_timestamp: string;
    };

    export type PlumeDataPoint = {
        emission: number;
        id: string;
        date: Date;
    };

    export type TimeScale = ScaleTime<number, number>;
    export type LinearScale = ScaleLinear<number, number>;

    export type UseTicksLinearProps = {
        yScale: LinearScale;
    };

    export type UseTicksTimeProps = {
        xScale: TimeScale;
    };

    export type DataPointsProps = {
        nulls?: boolean;
        data: PlumeDataPoint[];
        xScale: TimeScale;
        yScale: LinearScale;
    };

    export type DataCurveProps = {
        data: PlumeDataPoint[];
        xScale: TimeScale;
        yScale: LinearScale;
    };

    export type LinearScaleProps = {
        data: PlumeDataPoint[];
        height: number;
    };

    export type TimeScaleProps = {
        data: PlumeDataPoint[];
        width: number;
    };

    export type LineChartProps = {
        data: PlumeDataPoint[];
    };
}
