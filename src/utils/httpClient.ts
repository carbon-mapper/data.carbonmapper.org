import axios from 'axios';
import createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import queryString from 'query-string';
import { nonComponentLogout } from '@/store/useAccountStore/useAccountStore';
import { getAccessToken, getRefreshToken, localStorageRefresh } from './auth';
import { API_BASE_URL } from './config';

// One benefit of react-query vs SWR is that react-query can be used for non-GET requests
// It is not as necessary but some of the bells and whistles are nice. Can use SWR for now tho

/**
 * Notes:
 * #1 - we are using queryString for parameter serialization becuase by default axios uses URLSearchParams
 *      which serializes arrays like a[]=1&b[]=2 which is not compatible with django ninja?
 */

const httpClient = axios.create({
    baseURL: API_BASE_URL,
    paramsSerializer: { serialize: params => queryString.stringify(params) } // #1
});

httpClient.defaults.headers.common['Content-Type'] = 'application/json';

httpClient.interceptors.request.use(
    config => {
        const accessToken = getAccessToken();
        if (accessToken !== null) config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
    },
    null,
    { synchronous: true }
);

// https://github.com/Flyrell/axios-auth-refresh#readme
createAuthRefreshInterceptor(httpClient, async () => {
    try {
        // Potentially skip all of the below if the access token is not expired
        // Look at the token itself or perhaps the request error message?
        // This means the request was likely rejected simply because the user does not have authorization
        // And refreshing the access token will not help

        const refresh = getRefreshToken();
        if (refresh === null) throw Error('No Refresh Token');

        // Refresh token request should skip this interceptor - skipAuthRefresh
        // https://github.com/Flyrell/axios-auth-refresh?tab=readme-ov-file#pause-the-instance-while-refresh-logic-is-running
        const { data } = await httpClient.post<{ access: string }>('/token/refresh', { refresh }, {
            skipAuthRefresh: true
        } as AxiosAuthRefreshRequestConfig);

        // Set the new JWT in localstorage to be picked up in the interceptor
        localStorageRefresh(data.access);
    } catch (error) {
        nonComponentLogout();
        throw error; // Indicates that the initial failed request should not be retried
    }
});

// Consider using SWR global config https://swr.vercel.app/docs/global-configuration
export const httpGet = ({
    url,
    isLoggedIn,
    token,
    ...params
}: {
    url: string;
    isLoggedIn?: string;
    token?: string;
} & Record<string, string>) => {
    // isLoggedIn is required for apis calls have different responses based on logged in user
    // useSWR will be reactive to isLoggedIn changes and fetch new data based on the different "request key"
    // but we also need to use token since isLoggedIn alone isn't indicative of the api response
    // essentially isLoggedIn is the reactive bit and token can dictate the api response
    // THIS APPROACH DOESN'T COVER CASE WHERE ACCESS TOKEN CHANGES AND ISLOGGEDIN DOESN'T (very edge case but should be handled)

    // I wonder if we should just clear cache on logout / login....
    // I don't know what the right pattern is here
    // Can we just relaunch all requests? Or just specific ones?

    return httpClient.get(url, { params }).then(res => res.data);
};

export default httpClient;

// We don't want to send external requests with the JWT. Consider alternative ways to do this
export const externalHttpGet = (url: string) => axios.get(url).then(res => res.data);
