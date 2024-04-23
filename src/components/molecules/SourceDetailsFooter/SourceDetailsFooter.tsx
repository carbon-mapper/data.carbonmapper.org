import { MouseEvent, useState } from 'react';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import ButtonUnderline from '@/components/atoms/ButtonUnderline/ButtonUnderline';
import Tooltip from '@/components/atoms/Tooltip/Tooltip';
import DownloadModal from '../DownloadModal/DownloadModal';
import ReportPopup from '../ReportModal/ReportModal';
import styles from './SourceDetailsFooter.module.scss';

const SourceDetailsFooter = ({ plumeTifs }: { plumeTifs: string[] }) => {
    const setMessage = useSetPopupMessage();

    const onShareClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigator.clipboard.writeText(window.location.href);

        setMessage('Source URL copied to clipboard');
    };

    return (
        <section className={styles.container}>
            <ButtonUnderline bold ariaLabel='Share Source URL to clipboard' onClick={onShareClickHandler}>
                Share
                <Tooltip text='Copy Source URL' inline />
            </ButtonUnderline>
            {/* <Save /> */}
            <Download tifUrls={plumeTifs} />
            <Report propClassName={styles.right} />
        </section>
    );
};

export default SourceDetailsFooter;

const Download = ({ tifUrls }: { tifUrls: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ButtonUnderline
                bold
                ariaLabel='Open Download Dialog'
                onClick={() => setIsOpen(true)}
                tooltip={{ text: 'Download source data', position: 'top' }}
            >
                Download
            </ButtonUnderline>
            <DownloadModal portalId='modals' isOpen={isOpen} onClose={() => setIsOpen(false)} tiffUrls={tifUrls} />
        </>
    );
};

const Report = ({ propClassName }: { propClassName: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ButtonBox className={propClassName} details onClick={() => setIsOpen(true)} outline transparent>
                Comment/Report
            </ButtonBox>
            <ReportPopup portalId='popups' isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

// const Save = () => {
//     // const [isPopupOpen, setIsPopupOpen] = useState(false);

//     return (
//         <>
//             <ButtonUnderline
//                 bold
//                 ariaLabel='Save Source'
//                 tooltip={{ text: 'Coming soon: Save sources and build source collections', position: 'top' }}
//             >
//                 Save
//             </ButtonUnderline>
//             {/* <SaveSourcePopup portalId='popups' onClose={() => setIsPopupOpen(false)} isOpen={isPopupOpen} /> */}
//         </>
//     );
// };
