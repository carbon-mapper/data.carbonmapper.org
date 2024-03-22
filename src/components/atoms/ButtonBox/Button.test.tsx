import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ButtonBox from './ButtonBox';


jest.mock('./ButtonBox.module.scss', () => ({
    button: 'button',
    tiny: 'tiny',
    disabled: 'disabled',
    transparent: 'transparent'
}));


describe('[Atom] ButtonBox', () => {

    it ('renders button with correct class name', () => {

        const fn = jest.fn();

        const { container } = render(
            <ButtonBox
                tiny
                disabled
                className='custom-class'
                onClick={fn}
             >
                Button Text
            </ButtonBox>
        );

        const button = container.querySelector('button') as HTMLButtonElement;

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('button');
        expect(button).toHaveClass('tiny');
        expect(button).toHaveClass('disabled');
        expect(button).toHaveClass('custom-class');
        expect(button?.textContent).toBe('Button Text');
    });


    it ('calls onClick handler when is clicked', () => {

        const onClickMock = jest.fn();
        const { container } = render(<ButtonBox onClick={onClickMock}>Button Text</ButtonBox>);

        const button = container.querySelector('button') as HTMLButtonElement;

        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });


    it ('calls onClick handler when is disabled', () => {

        const onClickMock = jest.fn();
        const { container } = render(<ButtonBox onClick={onClickMock} disabled>Button Text</ButtonBox>);

        const button = container.querySelector('button') as HTMLButtonElement;

        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalledTimes(0);
    });
});