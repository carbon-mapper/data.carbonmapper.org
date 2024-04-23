import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TooltipToggle from './TooltipToggle';

jest.mock('@/assets/svg/tooltip-triangle.svg', () => 'svg');
jest.mock('@/assets/svg/info.svg', () => 'svg');


describe('[Atom] TooltipToggle', () => {

    it('renders tooltip with correct text and option', () => {

        const tooltipOptions = {
            text: 'Hello',
            width: 200
        };

        const className = 'custom-class';

        const { container, getByText } = render(<TooltipToggle tooltip={tooltipOptions} className={className} />);

        // Verify the presence of the tooltip text
        const tooltipText = getByText(tooltipOptions.text);
        expect(tooltipText).toBeInTheDocument();

        // Verify the tooltip width
        const tooltipToggle = container.querySelector('.js-tooltip-toggle') as HTMLElement;
        expect(tooltipToggle).toBeInTheDocument();

        // Verify if tooltip exists
        const tooltip = container.querySelector('.tooltip') as HTMLElement;
        expect(tooltip).toBeInTheDocument();

        // Verify custom className
        expect(tooltipToggle).toHaveClass(className);

    });
});