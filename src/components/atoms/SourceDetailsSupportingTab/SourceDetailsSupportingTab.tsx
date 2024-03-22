import { SourceDataTypes } from '@/types/api/source.types';
import classNames from 'classnames';
import { SECTOR_MAP } from '@/store/useFilterStore/static';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import { integerNumber } from '@/utils/math.utils';
import { getDataTables } from './SourceDetailsSupportingTab.data';
import styles from './SourceDetailsSupportingTab.module.scss';

export type Plume = SourceDataTypes.Plume;
export type Scene = SourceDataTypes.Scene;

export type Props = {
    plumes: Array<Plume>;
    scenes: Array<Scene>;
    sector: string;
    emissions: number;
    gas: string;
    numObservedDays: number | undefined;
    numDetectedDays: number | undefined;
};

interface Statistics {
    totalObservations: number;
    totalPlumes: number;
    totalNullDetects: number;
    totalQuantifiedPlumes: number;
    airborneCount: number;
    satelliteCount: number;
}

const SourceDetailsSupportingTab = ({
    plumes,
    scenes,
    sector,
    emissions,
    gas,
    numDetectedDays,
    numObservedDays
}: Props) => {
    const isActive = useSourceDetailsSlice(state => state.activeTab) === 'supporting';

    return (
        <section
            className={classNames(styles.container, {
                [styles.isActive]: isActive
            })}
        >
            {getDataTables({ ...gatherSourceStatistics(plumes, scenes), numDetectedDays, numObservedDays }).map(
                ({ data, title }) => (
                    <table key={title}>
                        <tbody>
                            {data.map(({ title: rowTitle, value: rowValue }) => (
                                <tr key={rowTitle}>
                                    <th>{rowTitle}</th>
                                    <td>{rowValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}

            <table>
                <tbody>
                    <tr>
                        <th>Sector</th>
                        <td>{sector ? SECTOR_MAP[sector as keyof typeof SECTOR_MAP] : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Source Emission Rate</th>
                        {/* handle zero */}
                        <td>{emissions === 0 ? 'N/A' : `${integerNumber(emissions)} kg ${gas}/hr`}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default SourceDetailsSupportingTab;

export const gatherSourceStatistics = (plumes: Plume[], scenes: Scene[]): Statistics => {
    const totalPlumes = plumes.length;

    const nullDetectScenes = scenes.filter(({ id }) => !plumes.some(({ scene_id }) => scene_id === id));
    const totalNullDetects = nullDetectScenes.length;

    const totalQuantifiedPlumes = plumes.filter(({ emission_auto: emission }) => emission).length;

    const { airborne: airborneCount, satellite: satelliteCount } = scenes.reduce(
        (accumulator, { instrument }) => {
            const { airborne, satellite } = { ...accumulator };
            return {
                airborne: instrument === 'ang' || instrument === 'GAO' ? airborne + 1 : airborne,
                satellite: instrument === 'emi' || instrument === 'tan' ? satellite + 1 : satellite
            };
        },
        {
            airborne: 0,
            satellite: 0
        }
    );

    // Observations are the number of plumes (a data point) and null detect scenes (a data point)
    const totalObservations = totalNullDetects + totalPlumes;

    return {
        totalObservations,
        totalPlumes,
        totalNullDetects,
        totalQuantifiedPlumes,
        airborneCount,
        satelliteCount
    };
};
