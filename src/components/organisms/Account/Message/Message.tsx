import { motion } from 'framer-motion';
import type { AccountView, AccountMessage } from '@/store/useAccountStore/useAccountStore';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import Icon from '@/components/atoms/Icon/Icon';
import AccountHeader from '../AccountHeader/AccountHeader';
import { getAnimationType } from '@/animations/framer';
import styles from './Message.module.scss';

const animation = getAnimationType('opacity');

const Message = ({ message, previousView }: { message: AccountMessage | null; previousView: AccountView }) => {
    const { setView } = useAccountActions();

    if (!message) return null;

    const { title, lines } = message;

    return (
        <motion.article {...animation} key='profile' className={styles.container}>
            <AccountHeader title={title} backButtonHandler={() => setView(previousView)} />
            <div className={styles.wrapper}>
                <Icon icon='info-big' />
                {lines.map(line => {
                    const text = line.text;
                    const button = 'button' in line ? line.button : null;

                    return (
                        <p className={styles.text} key={text.slice(0, 10)}>
                            <span>{text}</span>
                            {button && (
                                <ButtonBox outline onClick={() => setView(button.view)}>
                                    {button.label}
                                </ButtonBox>
                            )}
                        </p>
                    );
                })}
            </div>
        </motion.article>
    );
};

export default Message;
