import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import useSWR from 'swr/immutable';
import { useState } from 'react';
import { SECTOR_MAP } from '@/store/useFilterStore/static';
import { API_BASE_URL } from '@/utils/config';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import DownloadItem from '@/components/atoms/DownloadItem/DownloadItem';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './DownloadModal.module.scss';

type DownloadType = 'csv' | 'tiffs';

type Props = {
    tiffUrls: string[];
    onClose: () => void;
};

const downloadFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    return data;
};

const DownloadModal = ({ tiffUrls, onClose }: Props) => {
    const [selected, setSelected] = useState<DownloadType[]>([]);

    const [{ details: currentSourceId }] = usePortalQueryParams();

    const csvURL = `${API_BASE_URL}/catalog/source-plumes-csv/${currentSourceId}`;

    const { data: csvFile, isLoading: isCsvLoading } = useSWR(csvURL, downloadFile);
    const { data: tiffFiles, isLoading: istiffsLoading } = useSWR(tiffUrls, urls => {
        return Promise.all(urls.map(url => downloadFile(url)));
    });

    const tiffsPayload = tiffFiles?.reduce((acc, file) => acc + file.size, 0);

    const onDownloadClickHandler = async () => {
        function getHumanReadableSourceName(sourceID: string) {
            // Extract the source name and date query
            const [sourceName, query] = sourceID.split('?');

            // Extract the main components of source name
            const [gas, sectorCode, cluster, longitude, latitude] = sourceName.split('_');

            // Extract the start and end dates, handle no dates
            const decodedDatetime = query ? decodeURIComponent(query.replace('datetime=', '')) : '';

            const [startDate, endDate] = decodedDatetime.split('/').map(dateStr => {
                const date = new Date(dateStr);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
                    date.getDate()
                ).padStart(2, '0')}`;
            });

            // Get the sector name
            const sectorName = SECTOR_MAP[sectorCode as keyof typeof SECTOR_MAP] ?? 'N/A';

            // Construct the human-readable string
            return query
                ? `Source ${gas}, ${sectorName}, ${cluster} at ${latitude}N ${longitude}E from ${startDate} to ${endDate}`
                : `Source ${gas}, ${sectorName}, ${cluster} at ${latitude}N ${longitude}E`;
        }

        // const inputURL = "https://carbon-mapper-data.s3.amazonaws.com/l3a-ch4-mf-v1/2023/06/15/GAO20230615t202019p0000-A/GAO20230615t202019p0000-A_l3a-ch4-mf-v1_plume.tif?AWSAccessKeyId=AKIAZ6GFKVV6SHEMM55U&Signature=%2BMtmqJJZOY3iKvBwIeBEfVhKuzU%3D&Expires=1698752387";

        function getHumanReadableFileName(url: string): string {
            // Extract key components using regex
            const match = url.match(
                /https:\/\/carbon-mapper-data\.s3\.amazonaws\.com\/([^/]+)\/(\d{4}\/\d{2}\/\d{2})\/([^/]+)\/\3_[^/]+_(\w+)\.tif/
            );
            if (!match) return 'Invalid URL';

            const [, collection, date, plumeID] = match;

            // Convert date from YYYY/MM/DD to a more readable format
            const [year, month, day] = date.split('/');
            const readableDate = `${year}-${month}-${day}`;

            // Construct the human-readable string based on the format you provided
            return `Plume ${plumeID}, ${readableDate}, collection ${collection}`;
        }

        try {
            const zip = new JSZip();

            const humanReadableSourceName = getHumanReadableSourceName(currentSourceId as string);

            if (selected.length > 1) {
                if (!tiffFiles || !csvFile) return;
                tiffFiles.forEach(async (file, index) => {
                    const humanReadablePlumeName = getHumanReadableFileName(tiffUrls[index]);
                    zip.file(`${humanReadablePlumeName}.tif`, file);
                });

                zip.file(`${humanReadableSourceName}.csv`, csvFile);

                const content = await zip.generateAsync({ type: 'blob' });

                saveAs(content, `${humanReadableSourceName}.zip`);
            } else if (selected.includes('csv')) {
                csvFile && saveAs(csvFile, `${humanReadableSourceName}.csv`);
            } else if (selected.includes('tiffs')) {
                if (!tiffFiles) return;
                tiffFiles.forEach(async (file, index) => {
                    const humanReadablePlumeName = getHumanReadableFileName(tiffUrls[index]);
                    zip.file(`${humanReadablePlumeName}.tif`, file);
                });
                const content = await zip.generateAsync({ type: 'blob' });

                saveAs(content, `${humanReadableSourceName}_tiffs-only.zip`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    };

    const onItemClickHandler = (type: DownloadType) => {
        setSelected(prev => {
            if (prev.includes(type)) {
                return prev.filter(item => item !== type);
            }

            return [...prev, type];
        });
    };

    return (
        <Modal size='m' title='Download' onClose={onClose} isDarkBg animation='scale'>
            <div>
                <ul className={styles.top}>
                    <DownloadItem
                        type='csv'
                        payload={csvFile?.size ?? 0}
                        isPayloadLoading={isCsvLoading}
                        isSelected={selected.includes('csv')}
                        handler={onItemClickHandler}
                    />
                    <DownloadItem
                        type='tiffs'
                        payload={tiffsPayload ?? 0}
                        isPayloadLoading={istiffsLoading}
                        isSelected={selected.includes('tiffs')}
                        handler={onItemClickHandler}
                    />
                </ul>

                <div className={styles.bottom}>
                    <ButtonBox
                        onClick={onDownloadClickHandler}
                        disabled={
                            (selected.includes('csv') && isCsvLoading) ||
                            (selected.includes('tiffs') && istiffsLoading) ||
                            (!selected.includes('csv') && !selected.includes('tiffs'))
                        }
                    >
                        {(selected.includes('csv') && isCsvLoading) || (selected.includes('tiffs') && istiffsLoading)
                            ? 'Loading...'
                            : 'Download'}
                    </ButtonBox>
                </div>
            </div>
        </Modal>
    );
};

export default withPortal(DownloadModal);
