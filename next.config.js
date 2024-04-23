const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'styles')]
    },
    experimental: {
        // appDir: false
    },
    env: {
        BE_EMAIL_FROM: process.env.BE_EMAIL_FROM,
        BE_SMTP_HOST: process.env.BE_SMTP_HOST,
        BE_SMTP_USER_NAME: process.env.BE_SMTP_USER_NAME,
        BE_SMTP_PASSWORD: process.env.BE_SMTP_PASSWORD,
        NEXT_PUBLIC_IS_DEV: process.env.NEXT_PUBLIC_IS_DEV
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/ // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: ['@svgr/webpack']
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    },
    images: {
        unoptimized: true,
        domains: [
            'source.unsplash.com',
            'images.unsplash.com',
            'https://api.mapbox.com',
            'https://carbon-mapper-data.s3.amazonaws.com'
        ]
    },
    productionBrowserSourceMaps: process.env.NODE_ENV === 'development'
};

module.exports = nextConfig;
