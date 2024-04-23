import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useRightPanel } from '@/store/usePanelStore/usePanelStore';
import { useOutsideClickHandler } from '@/hooks/useOutsideClickHandler';
import { useCurrentFilterTags } from '@/hooks/useTags';
import FilterTagBar from '@/components/molecules/FilterTagBar/FilterTagBar';
import FilterTagDropdown from '@/components/molecules/FilterTagDropdown/FilterTagDropdown';
import styles from './DashboardFilterTags.module.scss';

const DashboardFilterTags = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTagsExtended, setIsTagsExtended] = useState(false);
    const [dropdownLeft, setDropdownLeft] = useState(0);

    const tags = useCurrentFilterTags();

    const rightPanel = useRightPanel();

    useEffect(() => {
        if (rightPanel) {
            setIsDropdownOpen(false);
        }
    }, [rightPanel]);

    const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);
    useOutsideClickHandler(containerRef, () => setIsDropdownOpen(false), [doesNotContainTag, doesNotContainTagParent]);

    return (
        <div ref={containerRef} className={classNames('tags', styles.container)}>
            <FilterTagBar
                functions={{ toggleDropdown, setDropdownLeft, setIsDropdownOpen, setIsTagsExtended }}
                items={tags}
            />
            {isTagsExtended && <FilterTagDropdown isOpen={isDropdownOpen} left={dropdownLeft} items={tags} />}
        </div>
    );
};

const doesNotContainTag = (target: EventTarget | null): boolean =>
    !((target as HTMLElement)?.classList.contains('tag') ?? false);

const doesNotContainTagParent = (target: EventTarget | null): boolean =>
    !((target as HTMLElement)?.parentElement?.classList.contains('tag') ?? false);

export default DashboardFilterTags;
