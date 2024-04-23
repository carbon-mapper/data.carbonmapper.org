import useSWR from 'swr';
import { useIsLoggedIn } from '@/store/useAccountStore/useAccountStore';
import { httpGet } from '@/utils/httpClient';

// ToDo: Share the output types of the API with this application
interface UserOut {
    id?: number;
    last_login?: string; // date-time
    is_superuser?: boolean;
    first_name?: string;
    last_name?: string;
    is_staff?: boolean;
    is_active?: boolean;
    date_joined?: string; // date-time
    email: string;
    updated_at: string; // date-time
    organization?: string;
    title?: string;
    industry?: string;
    usage?: string;
    groups: number[];
    user_permissions: number[];
    label: string;
}

export const useCurrentUser = () => {
    const isLoggedIn = useIsLoggedIn();

    return useSWR<UserOut>({ url: '/account/me', isLoggedIn }, httpGet, {
        revalidateOnFocus: false,
        onErrorRetry: error => {
            if (error.status === 401) return false;
        }
    });
};
