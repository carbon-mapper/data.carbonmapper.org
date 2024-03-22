import '@testing-library/jest-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import FilterTag from './FilterTag';
import styles from './FilterTag.module.scss';

jest.mock('@/assets/svg/closer.svg', () => 'svg');

describe('[Atom] FilterTag', () => {
    it('renders correctly', () => {
        const { container } = render(<FilterTag>Hello</FilterTag>);

        const textSpan = getByText(container, 'Hello');
        const icon = container.querySelector('svg');

        expect(textSpan).toBeInTheDocument();
        expect(textSpan).toHaveClass(styles.text);
        expect(icon).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<FilterTag onClick={handleClick}>Hello</FilterTag>);
        fireEvent.click(getByText('Hello'));
        expect(handleClick).toHaveBeenCalled();
    });
});
