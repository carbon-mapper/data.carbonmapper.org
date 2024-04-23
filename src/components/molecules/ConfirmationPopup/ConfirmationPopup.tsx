import { useEffect } from 'react';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import Popup from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import type { ConfirmationPopupTypes } from './ConfirmationPopup.types';
import styles from './ConfirmationPopup.module.scss';

const ConfirmationPopup = ({
    title,
    subtitle,
    cancelButtonText,
    agreeButtonText,
    onCancel,
    onAgree
}: ConfirmationPopupTypes.Props) => {
    useEffect(() => {
        document.body.classList.add('is-confirmation-popup');

        return () => {
            document.body.classList.remove('is-confirmation-popup');
        };
    }, []);

    return (
        <Popup
            size='l'
            isDarkBg
            onClose={onCancel}
            onEscape={onCancel}
            isConfirmationPopup
            onEnter={onAgree}
            animation='scale'
        >
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <span className={styles.title}>{title}</span>
                    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                </div>

                <div className={styles.bottom}>
                    <ButtonBox outline onClick={onCancel} className={styles.button}>
                        {cancelButtonText}
                    </ButtonBox>
                    <ButtonBox tiny onClick={onAgree} className={styles.button}>
                        {agreeButtonText}
                    </ButtonBox>
                </div>
            </div>
        </Popup>
    );
};

export default withPortal(ConfirmationPopup);
