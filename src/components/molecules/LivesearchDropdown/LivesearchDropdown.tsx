import { createPortal } from 'react-dom';
import { useFilterStore } from '@/store/useFilterStore/useFilterStore';
import type { LivesearchDropdownTypes } from '../LivesearchDropdownList/LivesearchDropdownList.types';
import { LivesearchDropdownList } from '../LivesearchDropdownList/LivesearchDropdownList';

const LivesearchDropdown = ({ searchInput, callback }: LivesearchDropdownTypes.Props) => {
    const dropdownWrapper = useFilterStore(state => state.livesearchItemsWrapperEl);

    return (
        <>
            {dropdownWrapper &&
                createPortal(<LivesearchDropdownList searchInput={searchInput} callback={callback} />, dropdownWrapper)}
        </>
    );
};

export default LivesearchDropdown;
