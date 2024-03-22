import classNames from 'classnames';
import styles from './Divider.module.scss';

/**
 * Divider Component
 *
 * Provides a visual divider that can be oriented either vertically or horizontally.
 * The component can also have an optional style to be a child of a grid.
 *
 * Props:
 * - orientation (Required): Type 'vertical' | 'horizontal'.
 *   Describes the orientation of the divider.
 *      - 'vertical': Renders a vertical divider.
 *      - 'horizontal': Renders a horizontal divider.
 *
 * - isGridChild (Optional): Type boolean. Default: false.
 *   Indicates whether the divider shold be positioned inside a grid system.
 *   If true, the divider will use grid-area: divider.
 **/

const Divider = ({
    orientation,
    isGridChild = false
}: {
    orientation: 'vertical' | 'horizontal';
    isGridChild?: boolean;
}) => {
    const className = classNames(styles.divider, {
        [styles.vertical]: orientation === 'vertical',
        [styles.horizontal]: orientation === 'horizontal',
        [styles.gridChild]: isGridChild
    });

    return <div className={className} />;
};

export default Divider;
