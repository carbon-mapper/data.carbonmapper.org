import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FilterLabel from './FilterLabel';

describe('[Atom] FilterLabel', () => {

    it('renders component correctly', () => {

        const customLabel = 'Custom Label';

        const { getByText } = render(<FilterLabel>{customLabel}</FilterLabel>);

        const element = getByText(customLabel);

        expect(element).toBeInTheDocument();

    });

})