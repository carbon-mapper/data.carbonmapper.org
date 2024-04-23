import classNames from 'classnames';
import { useState, memo } from 'react';
import type { InfoSwitcherTypes } from './InfoSwitcher.types';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import styles from './InfoSwitcher.module.scss';

const InfoSwitcher = ({ children, className }: InfoSwitcherTypes.Props) => {
    const [isVisible, setIsVisible] = useState(false);

    const onClick = () => setIsVisible(value => !value);

    return (
        <div className={classNames(styles.wrapper, className)}>
            <ButtonIcon
                icon='question-mark'
                className={styles.button}
                ariaLabel={isVisible ? 'Hide information' : 'Show information'}
                options={{
                    transparent: true
                }}
                onClick={onClick}
            />
            <p className={classNames(styles.text, { 'is-visible': isVisible })}>{children}</p>
        </div>
    );
};

export default memo(InfoSwitcher);
