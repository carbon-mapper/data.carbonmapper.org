import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Logo from './Logo';

jest.mock('@/assets/svg/logo.svg', () => 'svg');

describe('[Atom] Logo', () => {

    it ('renders the logo with default href when href prop is not provided', () => {

        const { getByRole } = render(<Logo />);
        const logoLink = getByRole('link', { name: 'Carbon Mapper Logo' });

        expect(logoLink).toHaveAttribute('href', '/');

    });

    it ('renders the logo with the provided href', () => {

        const customHref = '/custom-link';
        const { getByRole } = render(<Logo href={customHref} />);
        const logoLink = getByRole('link', { name: 'Carbon Mapper Logo' });

        expect(logoLink).toHaveAttribute('href', customHref);

    });

})