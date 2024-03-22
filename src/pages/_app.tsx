import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import Head from 'next/head';
import NextAdapterPages from 'next-query-params/pages';
import { QueryParamProvider } from 'use-query-params';
import { ReactElement, ReactNode } from 'react';
import { NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { useBreakpoint } from '@/hooks/useBreakpoint/useBreakpoint';
import useGTM from '@/hooks/useGTM';
import { MS_ENTRA_CLIENT_ID, MS_ENTRA_REDIRECT_URL, MS_ENTRA_TENANT_ID } from '@/utils/config';
import fonts from '@/utils/fonts';
import '@/utils/plugins';
import PlaceholderView from '@/components/scaffold/PlaceholderView/PlaceholderView';
import '@/styles/main.scss';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const publicClientApplication = new PublicClientApplication({
    auth: {
        clientId: MS_ENTRA_CLIENT_ID ?? '',
        authority: `https://login.microsoftonline.com/${MS_ENTRA_TENANT_ID}`, // For single-tenant apps
        redirectUri: MS_ENTRA_REDIRECT_URL
    }
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? (page => page);

    const breakpoint = useBreakpoint();
    const isMapLoaded = useMapSlice(state => state.isMapLoaded);

    useGTM();

    return (
        <QueryParamProvider adapter={NextAdapterPages}>
            <MsalProvider instance={publicClientApplication}>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    {/* favicon */}
                    <link rel='icon' href='/favicons/favicon.ico' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
                    <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
                    {/* <link rel='manifest' href='/favicons/site.webmanifest' /> */}
                    <link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='#5bbad5' />
                    <meta name='msapplication-TileColor' content='#da532c' />
                    <meta name='theme-color' content='#ffffff' />
                    <meta name='msapplication-TileColor' content='#da532c' />
                    <meta name='theme-color' content='#ffffff' />
                    {/* favicon */}
                </Head>

                <div id='root' className={`${fonts.Graphik.variable} ${fonts.Inter.variable}`}>
                    {(breakpoint === 'desktop' || isMapLoaded) && (
                        <main id='main'>{getLayout(<Component {...pageProps} />)}</main>
                    )}

                    {breakpoint !== 'desktop' && <PlaceholderView />}
                </div>
            </MsalProvider>
        </QueryParamProvider>
    );
}
