import Head from 'next/head';
import { useEffect, ReactElement } from 'react';
import { useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { useIsPageLoaded } from '@/store/useGlobalStore/useGlobalStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { trackEvent } from '@/hooks/useGTM';
import { useReadAuthParams } from '@/hooks/useQueryParams/useReadQueryParams';
import httpClient from '@/utils/httpClient';
import DashboardFilters from '@/components/organisms/DashboardFilters/DashboardFilters';
import DashboardHeader from '@/components/organisms/DashboardHeader/DashboardHeader';
import DashboardPanel from '@/components/organisms/DashboardPanel/DashboardPanel';
import SourceDetails from '@/components/organisms/SourceDetails/SourceDetails';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';
import type { NextPageWithLayout } from '../_app';

const DashboardPage: NextPageWithLayout = () => {
    const isPageLoaded = useIsPageLoaded();
    const { setLeftPanel } = usePanelActions();
    const { setMessage, setView } = useAccountActions();

    // ToDo: Refactor this to not use useReadAuthParams
    const { uidb64, token } = useReadAuthParams();

    useEffect(() => {
        if (!isPageLoaded) return;

        async function verifyUser() {
            if (!uidb64 || !token) return;

            try {
                const body = {
                    uidb64: uidb64,
                    token: token
                };

                // If unsuccessful, an error will be thrown
                await httpClient.post('/account/register_verify', body);

                setLeftPanel('account');
                setView('message');
                setMessage({
                    title: 'Confirmation',
                    lines: [
                        {
                            text: 'Your account has been verified. Please log in.',
                            button: {
                                label: 'Login',
                                view: 'login'
                            }
                        }
                    ]
                });

                // Tracking
                trackEvent({
                    event: 'account',
                    event_name: 'register_confirmation'
                });
            } catch (error) {
                console.error(error);

                setLeftPanel('account');
                setView('message');
                setMessage({
                    title: 'Error',
                    lines: [
                        {
                            text: 'There was an error verifying your account. Please try again.'
                        }
                    ]
                });
            }
        }

        verifyUser();
    }, [isPageLoaded, setLeftPanel, setView, setMessage, uidb64, token]);
    return (
        <>
            <Head>
                <title>Dashboard | Carbon Mapper</title>
            </Head>
            <h1 className='sr-only'>Dashboard | Carbon Mapper</h1>
            <DashboardHeader />
            <DashboardPanel />
            <DashboardFilters />
            <SourceDetails />
        </>
    );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
