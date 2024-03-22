import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './ProductSpecSheet.module.scss';

const ProductSpecSheet = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal className={styles.container} isDarkBg size='s' title='Product Guide' animation='popup' onClose={onClose}>
            <div className={styles.wrapper}>
                <p>
                    This document provides an overview of the products that make up the Carbon Mapper open data
                    platform. A detailed description of each Carbon Mapper product is included along with product uses,
                    generation time, release latency, and data format.
                </p>

                <a
                    href='/product_guide.pdf'
                    download='Carbon Mapper Product Guide - Data Definition & Specification v1_1_2.pdf'
                    target='_blank'
                    rel='noreferrer'
                >
                    <ButtonBox outline>Download</ButtonBox>
                </a>
            </div>
        </Modal>
    );
};

export default withPortal(ProductSpecSheet);
