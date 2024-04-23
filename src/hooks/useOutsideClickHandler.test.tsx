import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useOutsideClickHandler } from './useOutsideClickHandler';

describe('useOutsideClickHandler', () => {
    let container: HTMLDivElement | null = null;
    let callback: jest.Mock;
    let conditions: [(target: EventTarget | null) => boolean];

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        callback = jest.fn();
        conditions = [target => !(target as HTMLElement).classList.contains('exclude')];
    });

    afterEach(() => {
        document.body.removeChild(container as Node);
        container = null;
    });

    it('should call the callback when clicked outside and conditions are met', () => {
        renderHook(() => useOutsideClickHandler({ current: container }, callback, conditions));

        act(() => {
            document.body.click();
        });

        expect(callback).toHaveBeenCalled();
    });

    it('should not call the callback when clicked inside the container', () => {
        renderHook(() => useOutsideClickHandler({ current: container }, callback, conditions));

        act(() => {
            container?.click();
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it('should not call the callback when conditions are not met', () => {
        const excludedElement = document.createElement('div');
        excludedElement.classList.add('exclude');
        document.body.appendChild(excludedElement);

        renderHook(() => useOutsideClickHandler({ current: container }, callback, conditions));

        act(() => {
            excludedElement.click();
        });

        expect(callback).not.toHaveBeenCalled();
    });
});
