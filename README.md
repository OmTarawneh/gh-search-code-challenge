# GitHub Search Challenge

## Overview

This repository contains a solution for the GitHub Code Search Challenge. The challenge involves creating an application that allows users to search for repositories and users on GitHub using the GitHub API. Before you proceed, please take note of the following important information:

## Important Notes

- There is an API rate limit for public usage of the GitHub API. To avoid any issues, it is highly recommended to add your GitHub Token when using the application. For more information on GitHub API rate limits, refer to the [official documentation](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#exceeding-the-rate-limit).

- The application comes with unit tests, though not for all components, as some are excluded for timing measurement purposes. However, significant components have test coverage.

- Not all components can be tested due to known issues with Next.js 13 for RCS. For more details, see the [issue](https://github.com/vercel/next.js/issues/47299).

## Technology Stack

The application was developed using the following technologies:

- TypeScript
- Next.js 13
- Mobx
- Material UI

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

With these instructions, you should have everything ready to run the application and explore its functionality.

## Search Queries

### Search Queries for Repositories:

1. Search repositories by keyword:
   `react`

2. Search repositories by keyword within a specific language:
   `react language:javascript`

3. Search repositories by keyword with the specified topic:
   `react topic:ui-components`

4. Search repositories with a specific license:
   `react license:mit`

5. Search repositories created by a specific user:
   `user:octocat`

6. Search repositories with a specific number of stars:
   `react stars:>=1000`

7. Search repositories that were recently updated:
   `react pushed:>2023-01-01`

8. Search repositories with a specific number of forks:
   `react forks:>=500`

9. Search repositories that are not forks:
   `react fork:false`

10. Search repositories with a specific size:
    `react size:>=10000`

### Search Queries for Users:

1. Search users by username:

   `user:octocat`

2. Search users by location:
   `location:San Francisco`

3. Search users by the number of followers:
   `followers:>=1000`

4. Search users by the number of repositories they own:
   `repos:>=50`

5. Search users who have contributed to a specific repository:
   `repo:facebook/react`

6. Search users who are members of a specific organization:
   `org:google`

7. Search users who have created repositories with a specific license:
   `license:apache-2.0`

8. Search users who are popular within a specific programming language:
   `language:python`

9. Search users who have recently joined GitHub:
   `joined:>2023-01-01`

10. Search users who have a specific email associated with their account:
    `email:user@example.com`
