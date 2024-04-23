import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { useEffect } from 'react';
import { usePopupMessage, useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import { wait } from '@/utils/wait';
import Icon from '../Icon/Icon';
import { getAnimationType } from '@/animations/framer';
import styles from './MessagePopup.module.scss';

const MessagePopup = () => {
    const message = usePopupMessage();
    const setMessage = useSetPopupMessage();
    const animation = getAnimationType('top') as HTMLMotionProps<'button'>;

    useEffect(() => {
        message && wait(5).then(() => setMessage(null));
    }, [message, setMessage]);

    return (
        <AnimatePresence>
            {message && (
                <motion.button className={styles.button} type='button' onClick={() => setMessage(null)} {...animation}>
                    <span className={styles.inner}>
                        <span>{message}</span>
                        <Icon icon='closer-medium' />
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default MessagePopup;
