import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './Acknowledgments.module.scss';

const Acknowledgments = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal className={styles.container} isDarkBg size='m' title='Acknowledgments' animation='popup' onClose={onClose}>
            <div className={styles.wrapper}>
                <p>The Carbon Mapper data portal, API, and underlying data sets are made possible by the generous support of our sponsors including the High Tide Foundation, Bloomberg Philanthropies, Grantham Foundation and other philanthropic donors. Additional funding for airborne observations and/or data analysis was supported by NASA’s Carbon Monitoring System and Advanced Information System Technology programs, RMI, the California Air Resources Board (CARB), the University of Arizona, Environmental Defense Fund, the US Climate Alliance, and Oceankind. Funding for Colorado overflights in 2021 was provided by the Mark Martinez and Joey Irwin Memorial Public Projects Fund with the support of the Colorado Oil and Gas Conservation Commission and the Colorado Department of Public Health and Environment. AVIRIS-NG airborne observations were carried out by the Jet Propulsion Laboratory, California Institute of Technology, under a contract with the National Aeronautics and Space Administration. The Global Airborne Observatory (GAO) is managed by the Center for Global Discovery and Conservation Science at Arizona State University. The GAO is made possible by support from private foundations, visionary individuals, and Arizona State University.</p>
            </div>
        </Modal>
    );
};

export default withPortal(Acknowledgments);
