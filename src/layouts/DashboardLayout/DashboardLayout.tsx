import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
import MessagePopup from '@/components/atoms/MessagePopup/MessagePopup';
import Map from '@/components/organisms/Map/Map';
import Loader from '@/components/scaffold/Loader/Loader';
import LocalStorageProvider from '@/components/utils/LocalStorageProvider/LocalStorageProvider';
import type { DashboardLayoutTypes } from './DashboardLayout.types';

const DashboardLayout = ({ children }: DashboardLayoutTypes.Props) => (
    <QueryParamProvider adapter={NextAdapterApp}>
        <LocalStorageProvider>
            <div className='dashboard'>
                <div className='dashboard__inner'>{children}</div>
            </div>
            <Map />
            <div id='modals' />
            <div id='popups'>
                <MessagePopup />
            </div>
            <Loader />
        </LocalStorageProvider>
    </QueryParamProvider>
);

export default DashboardLayout;
