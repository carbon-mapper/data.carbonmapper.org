import { render } from '@testing-library/react';
import React from 'react';
import XAxis from './XAxis';

const createTicks = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
        value: new Date(2023, 7, 18, index),
        offset: index * 10
    }));
};

describe('[Atom] xAxis', () => {
    it.each([
        ['hour', '3:00 AM'],
        ['day', '3:00 AM'],
        ['week', 'Aug 18'],
        ['month', 'Aug 18'],
        ['quarter', 'Aug 2023'],
        ['year', 'Aug 2023']
    ])('renders correctly with timeSpan: %s', timeSpan => {
        const props = {
            ticks: createTicks(5),
            timeSpan: timeSpan,
            width: 100,
            height: 50
        };

        render(<XAxis {...props} />);
    });

    it('renders correct number of tick labels', () => {
        const props = {
            ticks: createTicks(5),
            timeSpan: 'day',
            width: 100,
            height: 50
        };

        const { container } = render(<XAxis {...props} />);

        // Check if the correct number of tick labels are rendered
        expect(container.querySelectorAll('.label').length).toBe(5);
    });
});
