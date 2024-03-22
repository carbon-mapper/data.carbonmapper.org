import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import InfoSwitcher from './InfoSwitcher';

jest.mock('@/assets/svg/question-mark.svg', () => 'svg');

describe('[Atom] InfoSwitcher', () => {

    it ('toggles visibility when button is clicked', () => {

        const text = 'Test Content';
        const className = 'custom-class';

        const { getByText, getByRole, container } = render(<InfoSwitcher className={className}>{text}</InfoSwitcher>);

        const textEl = getByText(text);
        expect(textEl).toBeInTheDocument();
        expect(textEl).not.toHaveClass('is-visible');

        const buttonEl = getByRole('button');
        expect(buttonEl).toBeInTheDocument();

        fireEvent.click(buttonEl);
        expect(textEl).toHaveClass('is-visible');

        fireEvent.click(buttonEl);
        expect(textEl).not.toHaveClass('is-visible');

        const wrapperEl = container.querySelector(`.${className}`);
        expect(wrapperEl).toBeInTheDocument();

    });

});