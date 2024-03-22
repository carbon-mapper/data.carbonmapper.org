import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Button from './ButtonBasic';

const mockOnClick = jest.fn();
const testText = 'Test';

describe('[Atom] Button', () => {
    it('should render a button element', () => {
        const { container } = render(<Button onClick={mockOnClick}>{testText}</Button>);
        const button = container.querySelector('button') as HTMLButtonElement;
        expect(button).toBeInTheDocument();
    });

    it('should render a button element with the correct text', () => {
        const { getByText } = render(<Button onClick={mockOnClick}>{testText}</Button>);
        const button = getByText(testText);
        expect(button).toBeInTheDocument();
    });

    it('should fire onClick handler when clicked', () => {
        const { container } = render(<Button onClick={mockOnClick}>{testText}</Button>);
        const button = container.querySelector('button') as HTMLButtonElement;
        fireEvent.click(button);
    });
});
