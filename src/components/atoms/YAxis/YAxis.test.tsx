import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import YAxis from './YAxis';

describe('[ui_atom] YAxis', () => {
    it('renders without crashing', () => {
        const ticks = [
            { value: 10, offset: 10 },
            { value: 20, offset: 20 }
        ];

        const { container } = render(<YAxis ticks={ticks} width={100} />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders the correct number of ticks', () => {
        const ticks = [
            { value: 10, offset: 10 },
            { value: 20, offset: 20 },
            { value: 30, offset: 30 }
        ];
        const { getAllByText } = render(<YAxis ticks={ticks} width={100} />);
        expect(getAllByText(/(\d+)/)).toHaveLength(ticks.length);
    });

    it('renders grid lines for each tick', () => {
        const ticks = [
            { value: 10, offset: 10 },
            { value: 20, offset: 20 }
        ];
        const { container } = render(<YAxis ticks={ticks} width={100} />);
        const gridLines = container.querySelectorAll('.grid-line');
        expect(gridLines).toHaveLength(ticks.length);
    });

    it('positions the ticks correctly', () => {
        const ticks = [{ value: 10, offset: 10 }];
        const { getByText } = render(<YAxis ticks={ticks} width={100} />);
        const tickElement = getByText('10').closest('g');
        expect(tickElement).toHaveAttribute('transform', 'translate(0, 10)');
    });
});
