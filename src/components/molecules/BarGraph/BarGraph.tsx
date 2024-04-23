import classNames from 'classnames';
import { useEffect, useState } from 'react';
import BarGraphItem from '@/components/atoms/BarGraphItem/BarGraphItem';
import BarGraphLegendItem from '@/components/atoms/BarGraphLegendItem/BarGraphLegendItem';
import type { BarGraphTypes } from './BarGraph.types';
import { sectorMap } from './BarGraph.data';
import styles from './BarGraph.module.scss';

const BarGraph = ({ bySector }: { bySector: BarGraphTypes.BySector }) => {
    const [activeSector, setActiveSector] = useState<string | null>('oil');

    useEffect(() => {
        const firstNonZeroSector =
            sectorMap.some(({ code }) => bySector[code] > 0) && sectorMap.find(({ code }) => bySector[code] > 0);
        firstNonZeroSector && setActiveSector(firstNonZeroSector.colorClass);
    }, [bySector]);

    return (
        <div className={styles.container}>
            <div className={styles.graph}>
                {sectorMap.map(({ code, colorClass }) => (
                    <BarGraphItem
                        className={classNames(styles.item, {
                            [styles.hasWidth]: bySector[code] > 0
                        })}
                        key={code}
                        count={bySector[code]}
                        colorClass={colorClass}
                        activeSector={activeSector}
                    />
                ))}
                <div
                    className={classNames(styles.note, {
                        [styles.noData]: !sectorMap.reduce((accumulator, { code }) => accumulator + bySector[code], 0)
                    })}
                >
                    <span>No data in current view</span>
                </div>
            </div>
            <p className={styles.label}>Emissions by Sector</p>
            <ul className={styles.legend}>
                {sectorMap.map(({ code, name, colorClass }) => (
                    <BarGraphLegendItem
                        key={code}
                        colorClassName={colorClass}
                        isDisabled={bySector[code] <= 0}
                        activeSector={activeSector}
                        setActiveSector={setActiveSector}
                    >
                        {name}
                    </BarGraphLegendItem>
                ))}
            </ul>
        </div>
    );
};

export default BarGraph;
