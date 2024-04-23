import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { AnimationType } from '@/animations/framer';
import { useEnterEscapeHandler } from '@/hooks/useEnterEscapeKeyboardHandler';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { getAnimationType } from '@/animations/framer';
import styles from './Modal.module.scss';

type Props = {
    portal?: 'popups' | 'modals';
    children?: ReactNode;
    title?: string | ReactNode;
    className?: string;
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
    isDarkBg?: boolean;
    isConfirmationPopup?: boolean;
    animation?: AnimationType;
    onEscape?: () => void;
    onEnter?: () => void;
    isRight?: boolean;
    isLeft?: boolean;
    onClose?: () => void;
    fullScreen?: boolean;
};

const Modal = (props: Props) => {
    const {
        children,
        title,
        className,
        size,
        isDarkBg,
        onClose,
        onEnter,
        onEscape = onClose,
        isConfirmationPopup,
        animation,
        isRight,
        isLeft,
        fullScreen
    } = props;

    useEnterEscapeHandler({
        onEscape,
        onEnter,
        isConfirmationPopup
    });

    const opacityVariants = getAnimationType('opacity');
    const popupVariants = getAnimationType(animation ?? 'popup');

    return (
        <motion.div
            className={classNames(styles.wrapper, {
                [styles['full-screen']]: fullScreen,
                'is-dark-bg': isDarkBg,
                [styles['is-right']]: isRight,
                [styles['fullscreen']]: fullScreen,
                [styles['is-left']]: isLeft
            })}
            {...opacityVariants}
        >
            <motion.div
                className={classNames(
                    styles.modal,
                    {
                        [`is-${size}-size`]: size
                    },
                    className
                )}
                {...popupVariants}
                data-testid='modal'
            >
                {title && (
                    <div className={styles.title}>
                        <span>{title}</span>
                    </div>
                )}

                <div className={classNames('scrollbar-hidden', styles.inner)}>{children}</div>

                {onClose && (
                    <div className={styles.closer} data-testid='modal-closer'>
                        <ButtonIcon onClick={onClose} icon='closer-big' ariaLabel={`Close ${title}`} />
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Modal;
