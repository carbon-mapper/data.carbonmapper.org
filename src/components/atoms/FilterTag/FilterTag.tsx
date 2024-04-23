import classNames from 'classnames';
import type { FilterTagTypes } from './FilterTag.types';
import Icon from '../Icon/Icon';
import styles from './FilterTag.module.scss';

const FilterTag = ({ children, onClick, className }: FilterTagTypes.Props) => {

    return (
        <button className={classNames('tag', styles.container, className)} onClick={onClick} type='button'>
            <span className={styles.text}>{children}</span>
            <span className="sr-only">Remove filter: {children}</span>
            <Icon icon="closer" />
        </button>
    );
};

export default FilterTag;
