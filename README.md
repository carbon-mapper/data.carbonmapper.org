## Notice

This repository has moved to https://gitlab.com/carbonmapper/portal and is now in read-only mode. Please direct any issues or changes to the new location.

# Data Portal 2.0

This codebase consists of the front-end SPA for the Carbon Mapper Data Portal at https://data.carbonmapper.org. It was authored by [Ode](https://ode.partners) and is forked from their repository at https://github.com/huncwotdigital/em-carbon-mapper.

Currently, Ode pushes updates to the `deployment` and `main` branches, with `deployment` being their "development" environment, and `main` being their "production" branch.

We periodically sync our `develop` branch from their `deployment` branch.

To sync with the `deployment` branch:

1. In the GitHub UI, switch to the `deployment` branch and use the `Sync Fork` menu and click `Update Branch`.
2. Create a new branch based off of `deployment`
3. Create a PR to merge into `develop`
4. The GitHub Action will deploy `develop` to https://data-dev.carbonmapper.org.

Once validated, the code can be promoted to the UAT environment by merging to the `staging` branch, which deploys to https://data-uat.carbonmapper.org.

To release to production, merge the `staging` branch into `prod`, which will automatically deploy to https://data.carbonmapper.org.
