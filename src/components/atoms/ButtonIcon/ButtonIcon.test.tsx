import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ButtonIcon from './ButtonIcon';

jest.mock('@/assets/svg/attention.svg', () => 'svg');

describe('[Atom] ButtonIcon', () => {
    it('should render as button by default', () => {
        const { container } = render(<ButtonIcon icon='attention' ariaLabel='test' />);
        const button = container.querySelector('button') as HTMLButtonElement;
        expect(button).toBeInTheDocument();
    });

    it('should call onClick when clicked', () => {
        const mockOnClick = jest.fn();
        const { getByRole } = render(<ButtonIcon icon='attention' ariaLabel='test' onClick={mockOnClick} />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });

    it('should have an active class when isActive is true', () => {
        const { container } = render(<ButtonIcon icon='attention' ariaLabel='test' options={{ active: true }} />);
        const button = container.querySelector('button');
        expect(button).toHaveClass('isActive');
    });

    it('should contain alt text for screen readers', () => {
        const { container } = render(<ButtonIcon icon='attention' ariaLabel='test' />);
        const srOnly = container.querySelector('.sr-only');
        expect(srOnly).toBeInTheDocument();
        expect(srOnly?.textContent).toBe('test');
    });

    it('should contain an icon', () => {
        const { container } = render(<ButtonIcon icon='attention' ariaLabel='test' />);
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });
});
