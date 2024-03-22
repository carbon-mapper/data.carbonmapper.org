import classNames from 'classnames';
import { trackEvent } from '@/hooks/useGTM';
import { BulkDownloadListTypes } from './BulkDownloadList.types';
import styles from './BulkDownloadList.module.scss';

const BULK_DOWNLOAD_LOCATION = 'https://s3.us-west-1.amazonaws.com/msf.data/exports/';

export const BulkDownloadList = ({ title, linksList, withGeoTifs }: BulkDownloadListTypes.Props) => {
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>{title}</h2>
            <table className={styles.table}>
                <tbody>
                    {linksList.map(item => (
                        <tr className={styles.row} key={item.filename}>
                            <td className={classNames(styles.cell, styles.cellBorders)}>{item.year}</td>
                            <td className={styles.cell}>
                                <a
                                    href={`${BULK_DOWNLOAD_LOCATION}${item.filename}`}
                                    target='_blank'
                                    rel='noreferrer noopenner'
                                    onClick={() =>
                                        trackEvent({
                                            event: 'download',
                                            event_name: 'bulk_download',
                                            download_name: item.filename,
                                            download_year: item.year,
                                            download_size: item.size,
                                            withGeoTifs: withGeoTifs
                                        })
                                    }
                                >
                                    {item.filename}
                                </a>
                            </td>
                            <td className={classNames(styles.cell, styles.cellBorders)}>{item.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
