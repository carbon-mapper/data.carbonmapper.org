import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import type { AccountView } from '@/store/useAccountStore/useAccountStore';
import {
    useAccountView,
    useAccountPreviousView,
    useAccountMessage,
    useAccountActions
} from '@/store/useAccountStore/useAccountStore';
import Gradient from '@/components/atoms/Gradient/Gradient';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import AccountHeader from './AccountHeader/AccountHeader';
import { Alerts } from './Alerts/Alerts';
import { ChangePasswordForm } from './ChangePasswordForm/ChangePasswordForm';
import { LoginForm } from './LoginForm/LoginForm';
import Message from './Message/Message';
import Profile from './Profile/Profile';
import { RegisterForm } from './RegisterForm/RegisterForm';
import { RequestResetPasswordForm } from './RequestResetPasswordForm/RequestResetPasswordForm';
import { ResetPassword } from './ResetPassword/ResetPassword';
import TabSwitcher from './TabSwitcher/TabSwitcher';
import { getAnimationType } from '@/animations/framer';
import styles from './Account.module.scss';

const animation = getAnimationType('opacity');

const Account = () => {
    const view = useAccountView();
    const previousView = useAccountPreviousView();
    const message = useAccountMessage();

    const setView = useAccountActions().setView;

    const currentComponent = (view: AccountView, animation: HTMLMotionProps<'article'>) => {
        switch (view) {
            case 'login':
                return (
                    <motion.article {...animation}>
                        <TabSwitcher />
                        <LoginForm />
                    </motion.article>
                );
            case 'register':
                return (
                    <motion.article {...animation}>
                        <TabSwitcher />
                        <RegisterForm />
                    </motion.article>
                );
            case 'message':
                // TODO: why did I structure this one differently?
                return <Message message={message} previousView={previousView || 'login'} />;
            case 'profile':
                return <Profile />;
            case 'change-password':
                return (
                    <motion.article {...animation}>
                        <AccountHeader title='Change Password' backButtonHandler={() => setView('profile')} />
                        <ChangePasswordForm />
                    </motion.article>
                );
            case 'alerts':
                return (
                    <motion.article {...animation}>
                        <AccountHeader title='Alerts' backButtonHandler={() => setView('profile')} />
                        <Alerts />
                    </motion.article>
                );
            case 'request-reset-password':
                return (
                    <motion.article {...animation}>
                        <AccountHeader title='Reset Password' backButtonHandler={() => setView('login')} />
                        <RequestResetPasswordForm />
                    </motion.article>
                );
            case 'reset-password':
                return (
                    <motion.article {...animation}>
                        <AccountHeader title='Set Password' />
                        <ResetPassword />
                    </motion.article>
                );

            default:
                return false;
        }
    };

    return (
        <section className={styles.wrapper}>
            <AnimatePresence>{currentComponent(view, animation)}</AnimatePresence>
            <Gradient />
        </section>
    );
};

const AccountModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal title='Account' animation='popup' onClose={onClose} isDarkBg className={styles.modal}>
            <Account />
        </Modal>
    );
};

export default withPortal(AccountModal);
