import { useEffect } from 'react';
import { useIsLoggedIn, useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import { msalLogout } from '@/utils/auth';
import { MS_SESSION_STORAGE_KEY } from '@/utils/config';
import httpClient from '@/utils/httpClient';

export function useMsLoginRedirectHandler() {
    const { setView, login, logout } = useAccountActions();
    const { setLeftPanel } = usePanelActions();
    const setMessage = useSetPopupMessage();
    const msSessionStorageKeys = sessionStorage.getItem(MS_SESSION_STORAGE_KEY);
    const isLoggedIn = useIsLoggedIn();

    useEffect(() => {
        if (isLoggedIn || msSessionStorageKeys == null) return;

        const oauthRequest = async () => {
            try {
                // All of this can fail
                const idTokenKey = JSON.parse(msSessionStorageKeys ?? '').idToken[0];
                const secret = JSON.parse(sessionStorage.getItem(idTokenKey) ?? '').secret;

                const response = await httpClient.post(
                    '/account/oauth',
                    {
                        id_token: secret,
                        session_state: '', // Not used
                        state: '' // Not used
                    },
                    { withCredentials: true }
                );

                login(response.data);
                // Handle UI state
                setLeftPanel('account');
            } catch (error) {
                console.log('Error with oauth request: ', error);
                // Sometimes the message disappears before the loading page is done
                setMessage('Error logging in. Please try again.');
                // Remove any logged in state
                logout();
                msalLogout();
            }
        };

        oauthRequest();
    }, [isLoggedIn, msSessionStorageKeys, setView, setLeftPanel, setMessage, login, logout]);
}
