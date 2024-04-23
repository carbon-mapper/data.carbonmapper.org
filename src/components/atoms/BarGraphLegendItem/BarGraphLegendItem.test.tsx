import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BarGraphLegendItem from './BarGraphLegendItem';

describe('[Atom] BarGraphLegendItem', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<BarGraphLegendItem colorClassName="testColor">Test Item</BarGraphLegendItem>);
        expect(getByText('Test Item')).toBeInTheDocument();
    });

    it('applies the colorClassName to the color div', () => {
        const testColorClassName = 'oil';

        const { container } = render(
            <BarGraphLegendItem colorClassName={testColorClassName}>Test Item</BarGraphLegendItem>
        );
        const colorDiv = container.querySelector('div');
        expect(colorDiv).toHaveClass(testColorClassName);
    });

    it('renders supplied children', () => {
        const testChildren = 'Test Item';

        const { getByText } = render(
            <BarGraphLegendItem colorClassName="testColor">{testChildren}</BarGraphLegendItem>
        );
        expect(getByText(testChildren)).toBeInTheDocument();
    });
});
