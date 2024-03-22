import { MS_SESSION_STORAGE_KEY } from './config';

export type AuthResponse = {
    access: string;
    refresh: string;
    permissions: string[];
    groups: string;
};

const AUTH_TOKEN_KEY = 'auth';

// These could be relocated to a different utils file
const isClientSide = () => typeof window !== 'undefined';
// Wonder if we should be logging where these might get called server-side
const getLocalStorage = (key: string) => (isClientSide() ? localStorage.getItem(key) : null);
const setLocalStorage = (key: string, value: string) => isClientSide() && localStorage.setItem(key, value);
const removeLocalStorage = (key: string) => isClientSide() && localStorage.removeItem(key);

const getAuthToken = () => {
    const value = getLocalStorage(AUTH_TOKEN_KEY);
    if (value === null) return null;

    // Parsing may fail if value is not as expected
    try {
        return JSON.parse(value) as AuthResponse;
    } catch {
        console.error('Failed to parse auth token', value);
        return null;
    }
};
const setAuthToken = (authData: AuthResponse) => setLocalStorage(AUTH_TOKEN_KEY, JSON.stringify(authData));
const removeAuthToken = () => removeLocalStorage(AUTH_TOKEN_KEY);

export const getIsLoggedIn = () => getAuthToken() !== null; // Non-reactive
export const getAccessToken = () => getAuthToken()?.access ?? null;
export const getRefreshToken = () => getAuthToken()?.refresh ?? null;

export const localStorageLogout = () => removeAuthToken();
export const localStorageLogin = (authData: AuthResponse) => setAuthToken(authData);
export const localStorageRefresh = (access: string) => {
    const authToken = getAuthToken();

    if (authToken === null) throw Error('No auth token to refresh');

    // Set new access token. Okay to write to this directly since it is not a direct reference to state
    authToken.access = access;
    setAuthToken(authToken);
};

// Idk how fragile all of this is
const MSAL_ACCOUNT_KEY_SESSION_STORAGE_KEY = 'msal.account.keys';
export const msalLogout = () => {
    // Check to see if we have everything that is expected
    const msSessionStorageKeys = sessionStorage.getItem(MS_SESSION_STORAGE_KEY);
    const msalAccountKeys = sessionStorage.getItem(MSAL_ACCOUNT_KEY_SESSION_STORAGE_KEY);

    if (msSessionStorageKeys === null || msalAccountKeys === null) {
        console.error('Failed MSAL logout. Expected keys are not in session storage');
        return;
    }

    // Parse the keys
    const msSessionStorageKeysParsed = JSON.parse(msSessionStorageKeys);
    const msalAccountKeysParsed = JSON.parse(msalAccountKeys);

    try {
        // Delete the keys
        sessionStorage.removeItem(msalAccountKeysParsed[0]);
        Object.values(msSessionStorageKeysParsed).forEach(keyArr => sessionStorage.removeItem(keyArr as string[][0]));
        sessionStorage.removeItem(MS_SESSION_STORAGE_KEY);
        sessionStorage.removeItem(MSAL_ACCOUNT_KEY_SESSION_STORAGE_KEY);
    } catch {
        // Don't expose secrets now
        console.error('Failed MSAL logout for unknown reason');
    }
};

const ADMIN_GROUP_NAME = 'Admin';
const INTERNAL_USER_GROUPS = ['Admin', 'Analyst', 'CARB', 'JPL', 'Viewer']; // Twins platform code

const getUserGroups = () => {
    const token = getAuthToken();
    if (token === null) return [];

    if (token.groups === undefined) {
        console.error('No groups found in token. This should not happen');
        return [];
    }

    return token.groups.split(' ');
};

export const getIsAdminUser = () => getUserGroups().includes(ADMIN_GROUP_NAME);
export const getIsInternalUser = () => getUserGroups().some(group => INTERNAL_USER_GROUPS.includes(group));
