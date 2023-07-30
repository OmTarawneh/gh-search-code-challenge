# GitHub Search Challenge

## Overview

This repository contains a solution for the GitHub Code Search Challenge. The challenge involves creating an application that allows users to search for repos/users on GitHub using the GitHub API. Before you proceed, please take note of the following important information:

## Important Notes

- There is an API rate limit for public usage of the GitHub API. To avoid any issues, it is highly recommended to add your GitHub Token when using the application. For more information on GitHub API rate limits, refer to the [official documentation](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#exceeding-the-rate-limit).

- The application comes with unit tests, though not for all components, as some are excluded for timing measurement purposes. However, significant components have test coverage.

- Not all component can be tested because there are some known issues with Next 13 for RCS. [issue](https://github.com/vercel/next.js/issues/47299)

## Getting Started

Before running the application, please ensure that you have the following prerequisites installed:

- **Node.js** (The required version is specified in the `.nvmrc` file).

Optionally, if you wish to use your GitHub Token, follow the steps below:

1. Create a `.env.local` file in the project root directory.
2. Add your GitHub Token to the `.env.local` file. Refer to the `.env.example` file for the format.

## Useful Commands

To work with the application, use the following commands:

- Run the application in the local environment: `npm run dev`
- Run unit tests: `npm run test`
- Run unit tests in watch mode: `npm run test:watch`

## Installation

Please follow the steps below to get the project set up:

1. Install **nvm** by following the instructions provided [here](https://github.com/nvm-sh/nvm#installation-and-update).
2. Install the specified **Node.js** version using nvm by running: `nvm install <VERSION>`, where `<VERSION>` corresponds to the version specified in the `.nvmrc` file.

With these instructions, you should have everything ready to run the application and explore its functionality. Happy coding!
