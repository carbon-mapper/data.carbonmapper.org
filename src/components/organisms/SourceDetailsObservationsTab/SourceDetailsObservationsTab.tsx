import classNames from 'classnames';
import type { SourceDataTypes } from '@/types/api/source.types';
import type { SourceDetailsTypes } from '@/components/organisms/SourceDetails/SourceDetails.types';
import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import CountDisplay from '@/components/atoms/CountDisplay/CountDisplay';
import { gatherSourceStatistics } from '@/components/atoms/SourceDetailsSupportingTab/SourceDetailsSupportingTab';
import LineChart from '@/components/molecules/LineChart/LineChart';
import { ObservationsList } from '@/components/molecules/ObservationList/ObservationList';
import styles from './SourceDetailsObservationsTab.module.scss';

export type GraphDataPoint = SourceDetailsTypes.GraphData;

export type Plume = SourceDataTypes.Plume;
export type Scene = SourceDataTypes.Scene;
export type ListItemData = Plume | Scene;

interface Props {
    plumes: Array<Plume> | [];
    scenes: Array<Scene> | [];
    emissions: number;
    uncertainty: number;
    persistence: number;
    gas: string;
    sourceCoordinates: [number, number] | undefined;
}

const LOW_SAMPLE_SIZE_THRESHOLD = 4;
const LOW_SAMPLES_TEXT = 'CAUTION: LOW NUMBER OF SAMPLES';

const SourceDetailsObservationsTab = ({
    plumes,
    scenes,
    emissions,
    uncertainty,
    persistence,
    gas,
    sourceCoordinates
}: Props) => {
    const isActive = useSourceDetailsSlice(state => state.activeTab) === 'observations';
    const { includeNullDetects } = useSourceDetailsSlice();
    const { totalPlumes, totalObservations } = gatherSourceStatistics(plumes, scenes);
    const listData = getListData(plumes, scenes, includeNullDetects);
    const isLowSampleSize = scenes.length < LOW_SAMPLE_SIZE_THRESHOLD;

    return (
        <section
            className={classNames(styles.container, {
                [styles['is-active']]: isActive,
                [styles['no-chart']]: listData.length <= 1
            })}
        >
            <div>
                <div className={styles.statistics}>
                    <CountDisplay
                        type={'emission'}
                        count={emissions || 0}
                        nonZero
                        uncertainty={uncertainty || 0}
                        label={`Source Emission Rate (kg ${gas}/hr)`}
                    />
                    <CountDisplay
                        type={'persistent'}
                        count={Math.round(persistence * 100) || 0}
                        label={'Source Persistence'}
                        percentage
                    />
                    <CountDisplay
                        type={'plumes'}
                        count={includeNullDetects ? totalObservations : totalPlumes}
                        label={`Number of ${includeNullDetects ? 'Observations' : 'Plumes'}`}
                    />
                </div>
                {isLowSampleSize && (
                    <p
                        style={{
                            paddingTop: '10px',
                            color: 'red',
                            fontWeight: '400',
                            fontSize: '11px',
                            paddingLeft: '5px'
                        }}
                    >
                        {LOW_SAMPLES_TEXT}
                    </p>
                )}
            </div>
            {listData.length > 1 && <LineChart data={formatGraphData(plumes, scenes, includeNullDetects)} />}
            <ObservationsList data={listData} sourceCoordinates={sourceCoordinates} />
        </section>
    );
};

export default SourceDetailsObservationsTab;

function getListData(plumes: Plume[], scenes: Scene[], includeNullDetects: boolean) {
    // filter out all scenes whose ids are included in plumes as scene_ids
    const includeNullListData = [...filterSceneDuplicates(plumes, scenes), ...plumes];
    return includeNullDetects ? includeNullListData : [...plumes];
}

type DataPoint = {
    id: string;
    date: Date;
    emission: number;
};

function formatSceneDataPoint(scene: Scene): DataPoint {
    const { id, timestamp } = scene;
    const date = new Date(timestamp);
    const emission = 0;

    return {
        id,
        date,
        emission
    };
}

function formatPlumeDataPoint(plume: Plume): DataPoint {
    const { id, scene_timestamp, emission_auto } = plume;
    const date = new Date(scene_timestamp);

    return {
        id,
        date,
        emission: emission_auto || 0
    };
}

function filterSceneDuplicates(plumes: Plume[], scenes: Scene[]): Scene[] {
    const plumeIDs = plumes.map(({ scene_id: id }) => id);
    const filteredScenes = scenes.filter(({ id }) => !plumeIDs.includes(id));
    return filteredScenes;
}

function formatGraphData(plumes: Plume[], scenes: Scene[], includeNullDetects: boolean): DataPoint[] {
    const plumeData = plumes.map(plume => formatPlumeDataPoint(plume));
    const sceneData = filterSceneDuplicates(plumes, scenes).map(scene => formatSceneDataPoint(scene));

    return includeNullDetects ? [...plumeData, ...sceneData] : [...plumeData];
}
