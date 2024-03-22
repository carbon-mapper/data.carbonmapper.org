import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { SourceDataTypes } from '@/types/api/source.types';
import { useCurrentScenes } from '@/store/useCoverageStore/useCoverageStore';
import { useLeftPanel, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import Icon from '@/components/atoms/Icon/Icon';
import { sortScenesTimeDescending } from '@/components/atoms/MapMarkers/MapMarkers.utils';
import SceneListToggleInput from '@/components/atoms/SceneListToggleInput/SceneListToggleInput';
import SortingToggle from '@/components/atoms/SortingToggle/SortingToggle';
import TooltipToggle from '@/components/atoms/TooltipToggle/TooltipToggle';
import { getAnimationType } from '@/animations/framer';
import styles from './SceneList.module.scss';

type VectorScene = SourceDataTypes.VectorScene;

const SceneList = () => {
    const [defaultView, setDefaultView] = useState<boolean>(true);
    const [isDescending, setIsDescending] = useState<boolean>(true);

    const currentScenes = useCurrentScenes();

    const isOpen = useLeftPanel() === 'scene-list';
    const { setLeftPanel } = usePanelActions();

    const currentScenesTimeDescending = useMemo(() => sortScenesTimeDescending(currentScenes), [currentScenes]);
    const currentScenesTimeAscending = useMemo(
        () => [...currentScenesTimeDescending].reverse(),
        [currentScenesTimeDescending]
    );

    const animation = getAnimationType('left');

    const statistics = (currentScenes as VectorScene[]).reduce(
        (
            accumulator: {
                satellite: number;
                airborne: number;
            },
            current
        ) => {
            if (current.scene_id.toLowerCase().includes('gao') || current.scene_id.toLowerCase().includes('ang')) {
                return {
                    ...accumulator,
                    airborne: accumulator.airborne + 1
                };
            }
            return {
                ...accumulator,
                satellite: accumulator.satellite + 1
            };
        },
        {
            satellite: 0,
            airborne: 0
        }
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div key='scene-list' className={styles.container} {...animation}>
                    <div className={styles.header}>
                        <div className={styles.top}>
                            <h2>Active Scenes</h2>
                            <TooltipToggle
                                tooltip={{
                                    text: 'Areas captured by satellite or aircraft imagery, regardless of whether plumes were detected.',
                                    position: 'right',
                                    width: 80
                                }}
                            />
                            <Button
                                ariaLabel='Close Scene List'
                                className={styles.closer}
                                onClick={() => setLeftPanel(null)}
                            >
                                <Icon icon={'closer'} />
                            </Button>
                        </div>

                        <div className={styles.middle}>
                            <SceneListToggleInput
                                state={defaultView}
                                handler={() => setDefaultView(prevState => !prevState)}
                                labelLeft='Default'
                                labelRight='ID'
                                colorState={false}
                            />

                            <p className={styles.statistics}>
                                <span className={styles.type}>Satellite:</span>
                                <span className={styles.count}>{statistics.satellite}</span>
                                <span className={styles.type}>Airborne:</span>
                                <span className={styles.count}>{statistics.airborne}</span>
                            </p>
                        </div>

                        <div className={styles.bottom}>
                            <SortingToggle
                                label='Sort by Date'
                                isAscending={!isDescending}
                                isActive={true}
                                handler={() => setIsDescending(prevState => !prevState)}
                            />
                        </div>
                    </div>

                    <table className={styles.table}>
                        <tbody>
                            {(isDescending
                                ? (currentScenesTimeDescending as unknown as VectorScene[])
                                : (currentScenesTimeAscending as unknown as VectorScene[])
                            ).map(scene => (
                                <SceneRow key={scene.scene_uuid} scene={scene} defaultView={defaultView} />
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SceneList;

const SceneRow = ({
    scene,
    defaultView
}: {
    scene: {
        scene_uuid: string;
        scene_id: string;
        timestamp: string;
    };
    defaultView: boolean;
}) => {
    const { timestamp } = scene;

    const day = new Date(timestamp).toLocaleDateString('en-UK', {
        day: '2-digit'
    });

    const month = new Date(timestamp).toLocaleDateString('en-UK', {
        month: 'short'
    });

    const year = new Date(timestamp).toLocaleDateString('en-UK', {
        year: 'numeric'
    });

    return (
        <tr className={styles.item}>
            {defaultView ? (
                <>
                    <td className={styles.uppercase}>{month}</td>
                    <td>{day}</td>
                    <td>{year}</td>
                    <td className={styles.uppercase}>{scene.scene_id.slice(0, 3)}</td>
                    <td>
                        {scene.scene_id.toLowerCase().includes('gao') || scene.scene_id.toLowerCase().includes('ang')
                            ? 'Airborne'
                            : 'Satellite'}
                    </td>
                </>
            ) : (
                <td className={styles.uppercase}>{scene.scene_id}</td>
            )}
        </tr>
    );
};
