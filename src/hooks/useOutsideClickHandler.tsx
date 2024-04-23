import { useEffect, RefObject } from 'react';

export const useOutsideClickHandler = (
    containerRef: RefObject<HTMLElement> | null,
    callback: () => void,
    conditions?: ((target: EventTarget | null) => boolean)[]
) => {
    useEffect(() => {
        if (!containerRef) return;

        const containerElement = containerRef.current;

        const outsideClickHandler = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                containerElement &&
                !containerElement.contains(target) &&
                conditions?.every(condition => condition(target))
            ) {
                callback();
            }
        };

        window.addEventListener('click', outsideClickHandler);

        return () => {
            window.removeEventListener('click', outsideClickHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
