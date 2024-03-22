import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ButtonUnderline from './ButtonUnderline';

const mockOnClick = jest.fn();
const testText = 'Test';

describe('[Atom] Button', () => {
    it('should render a button element', () => {
        const { container } = render(<ButtonUnderline onClick={mockOnClick}>{testText}</ButtonUnderline>);
        const button = container.querySelector('button') as HTMLButtonElement;
        expect(button).toBeInTheDocument();
    });

    it('should render a button element with the correct text', () => {
        const { getByText } = render(<ButtonUnderline onClick={mockOnClick}>{testText}</ButtonUnderline>);
        const button = getByText(testText);
        expect(button).toBeInTheDocument();
    });

    it('should fire onClick handler when clicked', () => {
        const { container } = render(<ButtonUnderline onClick={mockOnClick}>{testText}</ButtonUnderline>);
        const button = container.querySelector('button') as HTMLButtonElement;
        fireEvent.click(button);
    });
});
