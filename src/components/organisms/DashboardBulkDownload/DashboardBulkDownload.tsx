import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAOI } from '@/store/useDrawStore/useDrawStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import { useSourcesInView, useSourceDataFetch } from '@/hooks/useSourceData';
import { useTrackedPortalQueryParams } from '@/hooks/useTrackedPortalQueryParams';
import { datesToStacDatetime } from '@/utils/globals';
import httpClient from '@/utils/httpClient';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { CollapseContent } from '@/components/atoms/CollapseContent/CollapseContent';
import Modal from '@/components/atoms/Modal/Modal';
import { BulkDownloadList } from '@/components/molecules/BulkDownloadList/BulkDownloadList';
import withPortal from '@/hoc/withPortal';
import { dataWith, dataWithout } from './DashboardBulkDownload.items';
import listStyles from '../../molecules/BulkDownloadList/BulkDownloadList.module.scss';
import styles from './DashboardBulkDownload.module.scss';

const mapBoundsToBboxParam = (bounds: mapboxgl.LngLatBounds | null): [number, number, number, number] | undefined => {
    if (bounds === null) return undefined;
    return [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
};

const PLUME_CSV_DOWNLOAD_LIMIT = 1000;

const DashboardBulkDownload = () => {
    const aoi = useAOI();
    const { setLeftPanel } = usePanelActions();
    const setMessage = useSetPopupMessage();
    const [{ date, gasType, instrument, plume_qualities, plume_status, sector }] = useTrackedPortalQueryParams();
    const bounds = useMapSlice(state => state.bounds);
    // Refactor to use swrMutation?
    const [isPlumesCsvLoading, setIsPlumesCsvLoading] = useState(false);

    const startDate = date?.date_start?.date ?? null;
    const endDate = date?.date_end?.date ?? null;
    const datetime = datesToStacDatetime([startDate, endDate]);

    // Should use typing here
    // Need to implement aoi
    const plumeCsvParams = {
        bbox: mapBoundsToBboxParam(bounds),
        plume_gas: gasType,
        instruments: instrument,
        qualities: plume_qualities,
        status: plume_status,
        sectors: sector,
        datetime,
        limit: PLUME_CSV_DOWNLOAD_LIMIT
    };

    const onClose = () => setLeftPanel(null);

    // Get all sources for all source download and filtering for in view download
    const { data, isError, isLoading } = useSourceDataFetch();
    const {
        data: inViewSourceCollection,
        isError: currentSourcesError,
        isLoading: currentSourcesLoading
    } = useSourcesInView();

    const sourceDataRequest = async () => {
        try {
            if (data === undefined) return;
            // Could add other parameters to this filename
            downloadBlob(data, `sources_${new Date().toISOString()}.json`);
        } catch (e) {
            setMessage('Error downloading sources');
            console.log(e);
        }
    };

    const DownloadAllSourcesButton = () => (
        <section className={listStyles.wrapper}>
            <h2 className={listStyles.title} style={{ paddingBottom: '5px' }}>
                Download All Sources
            </h2>
            {isLoading && <p>Loading</p>}
            {data && (
                <ButtonBox outline onClick={sourceDataRequest}>
                    Download
                </ButtonBox>
            )}
            {isError && <p>Error</p>}
        </section>
    );

    const sourceDataInViewRequest = async () => {
        try {
            // Initial Checks
            if (inViewSourceCollection === undefined || inViewSourceCollection.features.length === 0) return;

            // Could add other parameters to this filename
            downloadBlob(inViewSourceCollection, `sources_${new Date().toISOString()}.json`);
        } catch (e) {
            setMessage('Error downloading sources');
            console.log(e);
        }
    };

    const DownloadInViewSourcesButton = () => (
        <section className={listStyles.wrapper}>
            <h2 className={listStyles.title} style={{ paddingBottom: '5px' }}>
                Download Filtered Sources
            </h2>
            {currentSourcesLoading && <p>Loading</p>}
            {data && (
                <ButtonBox
                    outline
                    onClick={sourceDataInViewRequest}
                    disabled={inViewSourceCollection === undefined || inViewSourceCollection.features.length === 0}
                >
                    Download
                </ButtonBox>
            )}
            {currentSourcesError && <p>Error</p>}
        </section>
    );

    const downloadPlumesRequest = async () => {
        setIsPlumesCsvLoading(true);
        try {
            const csvData = await httpClient.get('/catalog/plume-csv', {
                params: plumeCsvParams
            });

            downloadBlob(csvData.data, `plumes_${new Date().toISOString()}.csv`);
        } catch (e) {
            setMessage('Error downloading Plumes');
            console.log(e);
        } finally {
            setIsPlumesCsvLoading(false);
        }
    };

    const DownloadPlumesButton = () => (
        <section className={listStyles.wrapper}>
            <p className={styles.title}>
                {`Warning. Download will be limited to ${PLUME_CSV_DOWNLOAD_LIMIT} plumes and the following filters will not be applied:`}
            </p>
            <ul style={{ listStyle: 'inside', paddingBottom: '12px', paddingTop: '5px', fontSize: '14px' }}>
                <li>Source Emission Rate</li>
                <li>Number of Plumes</li>
                <li>Source Persistence</li>
                <li>Unsaved Areas of Interest</li>
            </ul>
            <ButtonBox outline onClick={downloadPlumesRequest} disabled={isPlumesCsvLoading}>
                {isPlumesCsvLoading ? '...Loading' : 'Download'}
            </ButtonBox>
        </section>
    );

    return (
        <motion.div className={styles.wrapper}>
            <Modal title='Downloads' onClose={onClose} onEscape={onClose} isDarkBg className={styles.modal}>
                <CollapseContent
                    title='Source Download'
                    content={
                        <>
                            <DownloadAllSourcesButton />
                            <DownloadInViewSourcesButton />
                        </>
                    }
                />
                <CollapseContent title='Plume Download' content={<DownloadPlumesButton />} />
                <CollapseContent
                    title='Bulk Downloads'
                    content={
                        <>
                            <BulkDownloadList
                                linksList={dataWith}
                                withGeoTifs={true}
                                title='Plumes CSV with GeoTIFFs'
                            />
                            <BulkDownloadList
                                linksList={dataWithout}
                                withGeoTifs={false}
                                title='Plumes CSV without GeoTIFFs'
                            />
                        </>
                    }
                />
            </Modal>
        </motion.div>
    );
};

export default withPortal(DashboardBulkDownload);

// expects csvs to already by strings & converts json to string
export const downloadBlob = (data: object | string, filename: string) => {
    const isCsv = typeof data === 'string';
    const processedData = isCsv ? data : JSON.stringify(data);
    const blob = new Blob([processedData], {
        type: isCsv ? 'text/csv' : 'application/json'
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();
};
