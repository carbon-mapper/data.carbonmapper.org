import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/LinkWithTracking/LinkWithTracking';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './DataProvidersModal.module.scss';

const DataProvidersModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal
            className={styles.container}
            isDarkBg
            size='s'
            title='Data observations provided by'
            animation='popup'
            onClose={onClose}
        >
            <div className={styles.wrapper}>
                <Link
                    href='https://globalfutures.asu.edu/gdcs/global-airborne-observatory/'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='ASU GDCS GAO'
                >
                    <span>ASU GDCS GAO</span>
                    <Icon icon='hyperlink' />
                </Link>
                <Link
                    href='https://avirisng.jpl.nasa.gov/'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='NASA-JPL AVIRIS-NG'
                >
                    <span>NASA-JPL AVIRIS-NG</span>
                    <Icon icon='hyperlink' />
                </Link>
                <Link
                    href='https://earth.jpl.nasa.gov/emit/'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='NASA-JPL EMIT'
                >
                    <span>NASA-JPL EMIT</span>
                    <Icon icon='hyperlink' />
                </Link>
            </div>
        </Modal>
    );
};

export default withPortal(DataProvidersModal);
