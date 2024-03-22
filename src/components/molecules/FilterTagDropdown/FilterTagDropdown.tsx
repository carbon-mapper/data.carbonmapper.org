import classNames from 'classnames';
import { useRef } from 'react';
import { useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useClearQueryParams } from '@/utils/usePortalQueryParams';
import Button from '@/components/atoms/ButtonBasic/ButtonBasic';
import FilterTag from '@/components/atoms/FilterTag/FilterTag';
import type { FilterTagDropdownTypes } from './FilterTagDropdown.types';
import styles from './FilterTagDropdown.module.scss';

const FilterTagDropdown = ({ items, isOpen, left, className: propClassName }: FilterTagDropdownTypes.Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const clearFilters = useClearQueryParams();
    const { deleteAOI } = useDrawStoreActions();

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.style.left = `${left}px`;
    }, [left]);

    const onClearAllClick = () => {
        clearFilters();
        deleteAOI();
    };

    return (
        <div ref={containerRef} className={classNames(styles.container, propClassName, { [styles.isOpen]: isOpen })}>
            <div className={styles.background}></div>
            {items.map(({ id, name, onClick }) => (
                <FilterTag key={id} onClick={onClick}>
                    {name}
                </FilterTag>
            ))}
            <Button className={styles.button} onClick={() => onClearAllClick()}>
                Clear filters
            </Button>
        </div>
    );
};

export default FilterTagDropdown;
