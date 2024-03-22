import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from '@/components/atoms/LinkWithTracking/LinkWithTracking';
import Modal from '@/components/atoms/Modal/Modal';
import ButtonBox from '../ButtonBox/ButtonBox';
import Icon from '../Icon/Icon';
import styles from './TermsOfUsePrompt.module.scss';

const TermsOfUsePrompt = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(() => {
        const termsAccepted = localStorage.getItem('termsOfUseAccepted');
        if (termsAccepted === 'true') {
            setIsConfirmed(true);
        }
    }, []);

    const handleConfirmation = () => {
        localStorage.setItem('termsOfUseAccepted', 'true');
        setIsConfirmed(true);
    };

    const portalElement = typeof window !== 'undefined' && document.getElementById('modals');

    if (!portalElement || isConfirmed) return null;

    return createPortal(
        <Modal isDarkBg size='m' title='Carbon Mapper Terms of Use'>
            <div className={styles.inner}>
                <label>
                    <input
                        type='checkbox'
                        onChange={() => setIsAccepted(!isAccepted)}
                        checked={isAccepted}
                        className='sr-only'
                    />
                    <Icon icon='checkbox' />
                    <span>I accept and agree</span>
                    <Link
                        href='https://carbonmapper.org/terms-of-use/'
                        isExternal
                        target='_blank'
                        rel='noreferrer noopenner'
                    >
                        Terms of Use
                    </Link>
                </label>
                <ButtonBox onClick={handleConfirmation} outline disabled={!isAccepted}>
                    Continue
                </ButtonBox>
            </div>
        </Modal>,
        portalElement
    );
};

export default TermsOfUsePrompt;
