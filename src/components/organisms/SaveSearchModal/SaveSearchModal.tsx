import type { Props } from '@/hoc/withPortal';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import Popup from '@/components/atoms/Modal/Modal';
import { SearchItemSave } from '@/components/molecules/SearchItemSave/SearchItemSave';
import withPortal from '@/hoc/withPortal';

const SaveSearchModal = ({ onClose }: Props) => {
    const setMessage = useSetPopupMessage();

    const onSubmitCallback = () => {
        onClose();
        setMessage('Your search has been saved successfully');
    };

    return (
        <Popup size='xl' title='Save Search' isDarkBg onClose={onClose} onEscape={onClose} animation='scale'>
            <SearchItemSave onSubmitCallback={onSubmitCallback} />
        </Popup>
    );
};

export default withPortal(SaveSearchModal);
