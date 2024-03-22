import Head from 'next/head';
import { ReactElement } from 'react';
import DashboardFilters from '@/components/organisms/DashboardFilters/DashboardFilters';
import DashboardHeader from '@/components/organisms/DashboardHeader/DashboardHeader';
import DashboardPanel from '@/components/organisms/DashboardPanel/DashboardPanel';
import SourceDetails from '@/components/organisms/SourceDetails/SourceDetails';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';
import type { NextPageWithLayout } from './_app';

const DashboardPage: NextPageWithLayout = () => (
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

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
