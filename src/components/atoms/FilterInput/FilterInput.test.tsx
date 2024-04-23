import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import type { WithLabelTypes } from '@/hoc/withLabel/withLabel.types';
import type { FilterInputTypes } from './FilterInput.types';
import FilterInput from './FilterInput';

jest.mock('@/assets/svg/chevron.svg', () => 'svg');
jest.mock('@/assets/svg/loupe.svg', () => 'svg');
jest.mock('@/assets/svg/select.svg', () => 'svg');


describe('[Atom] FilterInput', () => {

    it('renders component correctly', () => {

        const props: FilterInputTypes.Props & WithLabelTypes.Props = {
            type: 'select',
            label: 'Custom Label',
            options: {
                value: 'value',
                placeholder: 'placeholder',
                inputNameTag: 'sector',
                alt: 'alt',
                onClick: jest.fn,
                id: `123`
            }
        }

        const { container, getByText, getByRole } = render(<FilterInput {...props} />);

        const labelEl = getByText('Custom Label');
        const altLabelEl = getByText(props.options.alt);
        const svgEl = container.querySelector('svg');
        const buttonEl = getByRole('button');
        const buttonText = getByText(props.options.value);

        expect(labelEl).toBeInTheDocument();
        expect(altLabelEl).toBeInTheDocument();
        expect(svgEl).toBeInTheDocument();
        expect(buttonEl).toBeInTheDocument();
        expect(buttonText).toBeInTheDocument();

        const wrapperEl = altLabelEl.parentElement;

        expect(wrapperEl).toBeInTheDocument();

        expect(altLabelEl).toHaveClass('sr-only');

    });



    it('check if text filter input type doesn\'t have button element ', () => {

        const props: FilterInputTypes.Props & WithLabelTypes.Props = {
            type: 'text',
            label: 'Custom Label',
            options: {
                value: 'custom value',
                inputNameTag: 'text',
                alt: 'alt',
                id: '123'
            } as FilterInputTypes.TextOptions
        }


        const { container } = render(<FilterInput {...props} />);

        const buttonEl = container.querySelector('button');

        expect(buttonEl).toBeNull();

    });



    it('check if onClick callback is fired if button is clicked', () => {

        const onClick = jest.fn();

        const props: FilterInputTypes.Props = {
            type: 'select',
            options: {
                value: 'value',
                inputNameTag: 'sector',
                placeholder: 'placeholder',
                alt: 'alt',
                onClick,
                id: `123`
            }
        }

        const { getByRole } = render(<FilterInput {...props} />);

        const buttonEl = getByRole('button');

        expect(buttonEl).toBeInTheDocument();
        fireEvent.click(buttonEl);

        expect(onClick).toHaveBeenCalledTimes(1);

    });

});