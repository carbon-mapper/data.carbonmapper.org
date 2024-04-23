# Data Portal 2.0

This codebase consists of the front-end SPA for the Carbon Mapper Data Portal at https://data.carbonmapper.org. It's built with [NextJS](https://nextjs.org/) with [NodeJS](https://nodejs.org/).

## Configuration

Environment configuration is stored in the `.env` file at the root of the repository, and an example is provided in `.env.example`. All configuration keys are passed into the frontend and available to all viewers once deployed, so they should be considered public.

### mapbox

A [mapbox](https://www.mapbox.com/) public API key is required for the `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` variable in your `.env`. To get started, you can sign up for a free account on [mapbox](https://www.mapbox.com/) and use your "Default public token" for your account.

## Local Development

As a [Next.js](https://nextjs.org/) project using [Node.js](https://nodejs.org/en), the following commands are configured to manage the project:

-   `npm install` to install dependencies
-   `npm run dev` to run the development server (with hot reload)
-   `npm run build` to build the project, placing resulting files in `./out`
-   `npm run start` to start a local server
