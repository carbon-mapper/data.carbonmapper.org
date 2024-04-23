import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useResize } from '@/hooks/useResize';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import FilterTag from '@/components/atoms/FilterTag/FilterTag';
import type { FilterTagBarTypes } from './FilterTagBar.types';
import styles from './FilterTagBar.module.scss';

const FilterTagBar = ({ items, functions, className: propClassName }: FilterTagBarTypes.Props) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [availableSlots, setAvailableSlots] = useState<number>(0);
    const [buttonWidth, setButtonWidth] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState<number>(0);

    const { toggleDropdown, setIsDropdownOpen, setDropdownLeft, setIsTagsExtended } = functions;

    const className = classNames(styles.container, propClassName);

    useLayoutEffect(() => {
        setButtonWidth(buttonRef.current?.getBoundingClientRect().width || 0);
    }, [items.length]); // skeptical about this dependency

    useEffect(() => {
        availableSlots >= items.length && setIsDropdownOpen(false);
        setIsTagsExtended(availableSlots < items.length);
    }, [availableSlots, items, setIsDropdownOpen, setIsTagsExtended]);

    // handle available slots
    useLayoutEffect(() => {
        const containerRight = containerRef.current?.getBoundingClientRect().right || 0;
        const children = wrapperRef.current?.children || [];

        [...(children as HTMLElement[])].forEach(child => {
            child?.classList.remove('isHidden');
        });

        const excessTags = [...(children as HTMLElement[])].filter(child => {
            const childRight = child.getBoundingClientRect().right;
            const doesNotFit = childRight > containerRight - buttonWidth;

            !doesNotFit && setDropdownLeft(childRight);

            return doesNotFit && child;
        });

        excessTags.forEach(child => child?.classList.add('isHidden'));

        setAvailableSlots(items.length - excessTags.length);
    }, [buttonWidth, items, setDropdownLeft, screenWidth]);

    // handle resize
    useResize(() => setScreenWidth(window.innerWidth));

    return (
        <div className={className} ref={containerRef}>
            <div className={styles.wrapper} ref={wrapperRef}>
                {items.map(({ id, name, onClick }) => (
                    <FilterTag key={id} onClick={onClick}>
                        {name}
                    </FilterTag>
                ))}
            </div>

            <div ref={buttonRef}>
                {availableSlots < items.length && (
                    <ButtonBox
                        className={styles.button}
                        onClick={toggleDropdown}
                        aria-label='Expand Filter Tag Dropdown'
                    >
                        ...
                    </ButtonBox>
                )}
            </div>
        </div>
    );
};

export default FilterTagBar;
