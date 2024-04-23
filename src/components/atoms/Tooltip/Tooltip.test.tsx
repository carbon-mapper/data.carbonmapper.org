import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Tooltip from './Tooltip';

jest.mock('./Tooltip.module.scss', () => ({
    hover: 'hover'
}));

jest.mock('@/assets/svg/tooltip-triangle.svg', () => 'svg');

describe('[Atom] Tooltip', () => {
    it('renders tooltip with correct text and position', () => {
        const text = 'Example tooltip text';
        const position = 'top';
        const customClassName = 'custom-class';

        const { getByText, container } = render(
            <Tooltip text={text} position={position} className={customClassName} />
        );

        const tooltip = container.querySelector('.tooltip');
        const innerText = getByText(text);

        expect(tooltip).toBeInTheDocument();
        expect(tooltip).not.toHaveClass('is-visible');
        expect(tooltip).toHaveClass(`is-${position}`);
        expect(tooltip).toHaveClass(customClassName);
        expect(innerText).toBeInTheDocument();
    });

    it('check if tooltip has specific width', () => {
        const position = 'top';
        const width = 200;

        const text = 'Custom text';

        const { container } = render(<Tooltip text={text} position={position} width={width} />);

        const tooltip = container.querySelector('.tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveStyle(`width: ${width}px`);
    });
});
