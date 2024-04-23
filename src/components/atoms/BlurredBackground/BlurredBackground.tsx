import classNames from 'classnames';
import type { BlurredBackgroundTypes } from './BlurredBackground.types';
import styles from './BlurredBackground.module.scss';

const BlurredBackground = ({ className }: BlurredBackgroundTypes.Props) => <span className={classNames('blurred-bg', styles.wrapper, className)} />

export default BlurredBackground;