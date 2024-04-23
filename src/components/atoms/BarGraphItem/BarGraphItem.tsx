import classNames from 'classnames';
import { compactNumberScientific } from '@/utils/math.utils';
import Tooltip from '../Tooltip/Tooltip';

export type Props = {
    className: string;
    colorClass: string;
    count: number;
    activeSector: string | null;
};

const BarGraphItem = ({ className, colorClass, count, activeSector }: Props) => {
    return (
        <div
            className={classNames(className, colorClass, {
                isHovered: activeSector === colorClass
            })}
            data-bar-graph-item
            style={{
                flex: count
            }}
        >
            {count > 0 && <Tooltip text={compactNumberScientific(count)} position='top' inline statistics />}
        </div>
    );
};

export default BarGraphItem;
