import classNames from 'classnames';
import { formatFilesize } from '@/utils/math.utils';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import styles from './DownloadItem.module.scss';

type DownloadType = 'csv' | 'tiffs';

type Props = {
    type: DownloadType;
    payload: number;
    isPayloadLoading: boolean;
    isSelected: boolean;
    handler: (type: DownloadType) => void;
};

const DownloadItem = ({ type, payload, isPayloadLoading, isSelected, handler }: Props) => {
    return (
        <div className={classNames(styles.wrapper, { 'is-selected': isSelected })}>
            <div className={styles.top}>
                <span>{type}</span>
            </div>
            <div className={styles.bottom}>
                <span>{isPayloadLoading ? 'loading...' : formatFilesize(payload)}</span>
            </div>
            <Button type='button' ariaLabel={`Download ${type} file.`} onClick={() => handler(type)}>
                <span className='sr-only'>download {type}</span>
            </Button>
        </div>
    );
};

export default DownloadItem;
