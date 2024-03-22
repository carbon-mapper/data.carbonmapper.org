import classNames from 'classnames';
import styles from './Gradient.module.scss';

const Gradient = ({ isExtended = false, isFullWidth = false }: { isExtended?: boolean; isFullWidth?: boolean }) => (
    <span
        className={classNames(styles.gradient, 'gradient', {
            [styles['is-extended']]: isExtended,
            [styles['is-full-width']]: isFullWidth
        })}
    ></span>
);

export default Gradient;
