import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BlurredBackground from './BlurredBackground';

describe('[Atom] BlurredBackground', () => {

    it ('renders component correctly with custom classname', () => {

        const customClassName = 'custom-class';

        const { container } = render(<BlurredBackground className={customClassName} />);

        const wrapper = container.querySelector('span');

        expect(wrapper).toBeInTheDocument();
        expect(wrapper).toHaveClass(customClassName);

    });

})