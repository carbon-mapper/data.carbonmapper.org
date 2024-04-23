import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import CountDisplay from './CountDisplay';

describe('[Atom] CountDisplay', () => {
    it('renders correctly', () => {
        const { container } = render(<CountDisplay count={10} label="Test" type="emission" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('displays the provided count and label', () => {
        const testCount = 10;
        const testLabel = 'Test';

        const { getByText } = render(<CountDisplay count={testCount} label={testLabel} type="emission" />);
        expect(getByText(testCount)).toBeInTheDocument();
        expect(getByText(testLabel)).toBeInTheDocument();
    });

    it('does not display uncertainty if not provided', () => {
        const { queryByText } = render(<CountDisplay count={10} label="Test" type="emission" />);
        expect(queryByText('+/-')).not.toBeInTheDocument();
    });

    it('displays correct uncertainty if provided', () => {
        const testUncertainty = 2;

        const { getByText } = render(
            <CountDisplay count={10} label="Test" type="emission" uncertainty={testUncertainty} />
        );
        expect(getByText(`+/- ${testUncertainty}`)).toBeInTheDocument();
    });

    it('applies the correct class based on type', () => {
        const testType = 'emission';

        const { container } = render(<CountDisplay count={10} label="Test" type={testType} />);
        expect(container.firstChild).toHaveClass(testType);
    });
});
