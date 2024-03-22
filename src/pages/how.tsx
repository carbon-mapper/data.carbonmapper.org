import Head from 'next/head';
import { useEffect, type ReactElement } from 'react';
import { useIsPageLoaded } from '@/store/useGlobalStore/useGlobalStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import DashboardFilters from '@/components/organisms/DashboardFilters/DashboardFilters';
import DashboardHeader from '@/components/organisms/DashboardHeader/DashboardHeader';
import DashboardPanel from '@/components/organisms/DashboardPanel/DashboardPanel';
import SourceDetails from '@/components/organisms/SourceDetails/SourceDetails';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';
import type { NextPageWithLayout } from './_app';

const DashboardPage: NextPageWithLayout = () => {
    const isPageLoaded = useIsPageLoaded();
    const { setOverlay } = usePanelActions();

    useEffect(() => {
        if (!isPageLoaded) return;
        setOverlay('how-to-use-it');
    }, [isPageLoaded, setOverlay]);

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
