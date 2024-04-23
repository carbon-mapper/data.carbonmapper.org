import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import BarGraph from './BarGraph';
import { sectorMap } from './BarGraph.data';
import styles from './BarGraph.module.scss';

jest.mock('../../../assets/svg/tooltip-triangle.svg', () => 'svg');

describe('[Molecule] BarGraph', () => {
    const mockData = {
        '4B': 100,
        NA: 666,
        '6B': 80,
        '6A': 0,
        '1B1a': 200,
        '1A1': 23,
        '1B2': 250,
        other: 30
    };

    type Code = keyof typeof mockData;

    it('renders correctly', () => {
        render(<BarGraph bySector={mockData} />);
    });

    test('renders correct number of BarGraphItem and BarGraphLegendItem components', () => {
        const { container } = render(<BarGraph bySector={mockData} />);

        const graphItems = container.querySelectorAll('[data-bar-graph-item]');
        const legendItems = container.querySelectorAll('[data-bar-graph-legend-item]');

        expect(graphItems.length).toBe(Object.keys(mockData).length);
        expect(legendItems.length).toBe(Object.keys(mockData).length);
    });

    test('renders sector names in the legend correctly', () => {
        const { getByText } = render(<BarGraph bySector={mockData} />);

        sectorMap.forEach(sector => {
            const sectorName = getByText(sector.name);
            expect(sectorName).toBeInTheDocument();
        });
    });

    test('renders each sector div with correct flex factor', () => {
        const { container } = render(<BarGraph bySector={mockData} />);

        const sectorDivs = [...container.querySelectorAll(`[data-bar-graph-item]`)];

        sectorDivs.forEach((sector, index) => {
            const sectorCode = sectorMap[index].code;
            expect(sector).toHaveStyle({ flex: mockData[sectorCode as Code] });
        });
    });

    test('adds a noData class to note div when no data is present', () => {
        const emptyMockData = {
            '4B': 0,
            NA: 0,
            '6B': 0,
            '6A': 0,
            '1B1a': 0,
            '1B2': 0,
            other: 0
        };

        const noteClass = styles.note;
        const noDataClass = styles.noData;

        const { container } = render(<BarGraph bySector={emptyMockData} />);
        const note = container.getElementsByClassName(noteClass)[0];

        expect(note).toHaveClass(noDataClass);
    });
});
