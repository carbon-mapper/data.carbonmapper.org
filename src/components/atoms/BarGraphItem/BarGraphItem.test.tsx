import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BarGraphItem from './BarGraphItem';

jest.mock('../../../assets/svg/tooltip-triangle.svg', () => 'svg');

describe('[Atom] BarGraphItem', () => {
    const testClass = 'test-class';
    const testColorClass = 'pink';
    const testHoveredSector = 'solid';
    const testCount = 999;

    it('renders correctly', () => {
        render(
            <BarGraphItem
                className={testClass}
                colorClass={testColorClass}
                count={testCount}
                hoveredSector={testHoveredSector}
            />
        );
    });

    it('applies the given className', () => {
        const { container } = render(
            <BarGraphItem
                className={testClass}
                colorClass={testColorClass}
                count={testCount}
                hoveredSector={testHoveredSector}
            />
        );
        expect(container.firstChild).toHaveClass(testClass);
    });

    it('sets the flex style based on the flexFactor prop', () => {
        const flexFactor = 999;

        const { container } = render(
            <BarGraphItem
                className={testClass}
                colorClass={testColorClass}
                count={testCount}
                hoveredSector={testHoveredSector}
            />
        );
        expect(container.firstChild).toHaveStyle({ flex: flexFactor });
    });
});
