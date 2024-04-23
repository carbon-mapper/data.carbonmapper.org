import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-secondary',
    fallback: ['Helvetica', 'ui-sans-serif']
});

const Graphik = localFont({
    src: [
        {
            path: '../assets/fonts/Graphik/Graphik400.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../assets/fonts/Graphik/Graphik400.woff',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../assets/fonts/Graphik/Graphik500.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../assets/fonts/Graphik/Graphik500.woff',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../assets/fonts/Graphik/Graphik600.woff2',
            weight: '600',
            style: 'normal'
        },
        {
            path: '../assets/fonts/Graphik/Graphik600.woff',
            weight: '600',
            style: 'normal'
        },
        {
            path: '../assets/fonts/Graphik/Graphik700.woff2',
            weight: '700',
            style: 'normal'
        },
        {
            path: '../assets/fonts/Graphik/Graphik700.woff',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-primary',
    fallback: ['Helvetica', 'ui-sans-serif']
});

const fonts = {
    Graphik,
    Inter: inter
};

export default fonts;
