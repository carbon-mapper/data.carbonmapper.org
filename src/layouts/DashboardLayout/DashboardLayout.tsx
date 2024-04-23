import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
import { MapProvider } from 'react-map-gl';
import { NewMap } from '@/components/NewMap';
import MessagePopup from '@/components/atoms/MessagePopup/MessagePopup';
import Loader from '@/components/scaffold/Loader/Loader';
import LocalStorageProvider from '@/components/utils/LocalStorageProvider/LocalStorageProvider';
import type { DashboardLayoutTypes } from './DashboardLayout.types';

// Should providers go here or in _app?
// This can be whatever it needs to be, but having the main feature, the map, seems odd
const DashboardLayout = ({ children }: DashboardLayoutTypes.Props) => (
    <QueryParamProvider adapter={NextAdapterApp}>
        <LocalStorageProvider>
            <MapProvider>
                <div className='dashboard'>
                    <div className='dashboard__inner'>{children}</div>
                </div>
                <NewMap />
                <div id='modals' />
                <div id='popups'>
                    <MessagePopup />
                </div>
                <Loader />
            </MapProvider>
        </LocalStorageProvider>
    </QueryParamProvider>
);

export default DashboardLayout;
