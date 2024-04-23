import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthResponse, getIsLoggedIn, localStorageLogin, localStorageLogout } from '@/utils/auth';

// Style guide
// https://tkdodo.eu/blog/working-with-zustand

// login/profile should be the same with the switch being the isLoggedIn boolean
export const views = [
    'login',
    'register',
    'request-reset-password',
    'reset-password',
    'message',
    'profile',
    'edit-profile',
    'change-password',
    'alerts'
] as const;

export type AccountView = (typeof views)[number];

type MessageLine = {
    text: string;
    button?: {
        label: string;
        view: AccountView;
    };
};

export type AccountMessage = {
    title: 'Confirmation' | 'Information' | 'Error';
    lines: MessageLine[];
};

interface AccountStore {
    isLoggedIn: boolean;
    view: AccountView;
    previousView: AccountView | null;
    message: AccountMessage | null;

    // If we are going to use zustand and actions and such
    // We should use them effectively and have actions as events and not just setters
    actions: {
        login: (authResponse: AuthResponse) => void;
        logout: () => void;
        setView: (view: AccountView, previous?: AccountView) => void;
        setMessage: (message: AccountMessage | null) => void;
    };
}

// We need a non-component logout for the interceptor in auth
// Could potentially create one for login with optional view setting
export const nonComponentLogout = () => {
    localStorageLogout();
    // Tbd if we should also try to clear msal session storage
    // ...I think everything "will work" regardless

    useAccountStore.setState({ view: 'login', isLoggedIn: false });
};

const useAccountStore = create<AccountStore>()(
    devtools(
        (set, get) => ({
            isLoggedIn: getIsLoggedIn(),
            view: getIsLoggedIn() ? 'profile' : 'login',
            previousView: null,
            message: null,
            actions: {
                login: authResponse => {
                    localStorageLogin(authResponse);

                    set({ view: 'profile', isLoggedIn: true });
                },
                logout: nonComponentLogout,
                setView: (view, previous) => {
                    const { view: currentView } = get();
                    const updatedPrevious = previous || currentView;

                    set({ view, previousView: updatedPrevious });
                },
                setMessage: message => set({ message })
            }
        }),
        {
            enabled: false, // isDevelopment - switch when state is only composed of primitives
            name: 'Account Store'
        }
    )
);

export const useIsLoggedIn = () => useAccountStore(state => state.isLoggedIn);
export const useAccountView = () => useAccountStore(state => state.view);
export const useAccountPreviousView = () => useAccountStore(state => state.previousView);
export const useAccountMessage = () => useAccountStore(state => state.message);
export const useAccountActions = () => useAccountStore(state => state.actions);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Account Store', useAccountStore);
}
