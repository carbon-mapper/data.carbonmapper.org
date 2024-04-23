import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Icon from './Icon';

jest.mock('@/assets/svg/attention.svg', () => 'svg');

describe('[Atom] Icon', () => {
    it('renders an svg icon', () => {
        const { container } = render(<Icon icon='attention' />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});
