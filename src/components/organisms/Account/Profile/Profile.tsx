import { useIsAuthenticated } from '@azure/msal-react';
import { motion } from 'framer-motion';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { useIsExperimentalSources, useSetIsExperimentalSources } from '@/store/useGlobalStore/useGlobalStore';
import { useCurrentUser } from '@/hooks/useUser';
import { getIsAdminUser, msalLogout } from '@/utils/auth';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { RemoteData } from '@/components/atoms/RemoteData/RemoteData';
import AccountHeader from '../AccountHeader/AccountHeader';
import { getAnimationType } from '@/animations/framer';
import styles from './Profile.module.scss';

const animation = getAnimationType('opacity');

const Profile = () => {
    const currentUserQuery = useCurrentUser();
    const { setView, logout } = useAccountActions();
    const isMsAuthenticated = useIsAuthenticated();
    const isExperimentalSources = useIsExperimentalSources();
    const setIsExperimentalSources = useSetIsExperimentalSources();
    const isAdminUser = getIsAdminUser();

    const onLogoutHandler = () => {
        localStorage.removeItem('uidb64'); // Should look to remove this
        localStorage.removeItem('token'); // Should look to remove this

        logout();

        // Wonder if django-all-auth would be helpful here
        // Logs out the user from MS
        // if (isMsAuthenticated) instance.logoutRedirect();
        // Simply removes the MS session from the browser
        if (isMsAuthenticated) msalLogout();
    };

    return (
        <RemoteData
            result={currentUserQuery}
            success={({ email, first_name: firstName, last_name: lastName, organization, title, industry, usage }) => (
                <motion.article {...animation} key='profile' className={styles.container}>
                    <AccountHeader title={`${firstName || ''} ${lastName || ''}`} subtitle={email} />
                    <main className={styles.main}>
                        {/* <ButtonBox outline onClick={() => setView('edit-profile')}>Edit Profile</ButtonBox> */}
                        {title && (
                            <p key='title'>
                                <strong>Title:</strong> {title}
                            </p>
                        )}
                        {organization && (
                            <p key='organization'>
                                <strong>Organization:</strong> {organization}
                            </p>
                        )}
                        {industry && (
                            <p key='industry'>
                                <strong>Industry:</strong> {industry}
                            </p>
                        )}
                        {usage && (
                            <p key='usage'>
                                <strong>Usage:</strong> {usage}
                            </p>
                        )}
                        {/* <p><strong>Joined:</strong> {joined}</p> */}

                        {/* TODO: maybe abstract this flex container, but seems what for? */}
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <ButtonBox outline onClick={() => setView('change-password')}>
                                Change Password
                            </ButtonBox>
                            {/* <ButtonBox outline onClick={() => setView('alerts')}>
                                Manage Alerts
                            </ButtonBox> */}
                        </div>
                        <br />
                        {isAdminUser && (
                            <ButtonBox onClick={() => setIsExperimentalSources(!isExperimentalSources)}>
                                {`Experimental Sources: ${isExperimentalSources ? 'On' : 'Off'}`}
                            </ButtonBox>
                        )}
                    </main>
                    <footer className={styles.footer}>
                        <ButtonBox outline onClick={onLogoutHandler}>
                            Log out
                        </ButtonBox>
                    </footer>
                </motion.article>
            )}
        />
    );
};

export default Profile;
