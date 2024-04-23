import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import TooltipText from './TooltipText';

jest.mock('@/assets/svg/tooltip-triangle.svg', () => 'svg');

describe('[Atom] TooltipText', () => {

    it ('renders tooltip text with correct inner text & tooltip text', () => {

        const innerText = 'Custom Text';

        const tooltip = {
            text: 'Laboris labore reprehenderit sit officia ad ea ea nisi laborum laboris magna incididunt voluptate ex.'
        }

        const { getByText, queryByText, container }= render(
            <TooltipText
                tooltip={{
                    text: tooltip.text
                }}
            >
                <span>{innerText}</span>
            </TooltipText>
        );

        // Assert that the child element is rendered
        const childElement = getByText(innerText);
        expect(childElement).toBeInTheDocument();

        // Assert that the tooltip element is initially not visible
        const tooltipElement = queryByText(tooltip.text);
        expect(tooltipElement).toBeInTheDocument();

        if (tooltipElement) {
            expect(getComputedStyle(tooltipElement).opacity).toBeFalsy();
        }


        // Trigger the tooltip toggle to show the tooltip
        const tooltipToggleElement = container.querySelector('js-tooltip-toggle');

        if (tooltipToggleElement && tooltipElement) {
            fireEvent.mouseOver(tooltipToggleElement);

            // Assert that the tooltip element becomes visible
            expect(getByText(tooltip.text)).toBeInTheDocument();
            expect(getComputedStyle(tooltipElement).opacity).toBe('1');
        }
    });

})