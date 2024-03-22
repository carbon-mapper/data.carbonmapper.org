import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/LinkWithTracking/LinkWithTracking';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './FAQs.module.scss';

const FAQs = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal className={styles.container} isDarkBg size='s' title='FAQs' animation='popup' onClose={onClose}>
            <div className={styles.wrapper}>
                <p>Review our comprehensive FAQs for more information about our organization, data, and methods.</p>

                <Link
                    href='https://carbonmapper.org/our-mission/faq/#data'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='FAQ Page'
                >
                    <span>FAQ Page</span>
                    <Icon icon='hyperlink' />
                </Link>

                <p>Looking for the prior version of the data portal?</p>

                <Link
                    href='https://platform.carbonmapper.org/'
                    isExternal
                    target='_blank'
                    rel='noreferrer noopenner'
                    trackingTitle='Prior Version of the Data Portal'
                >
                    <span>Access it here</span>
                    <Icon icon='hyperlink' />
                </Link>
            </div>
        </Modal>
    );
};

export default withPortal(FAQs);
