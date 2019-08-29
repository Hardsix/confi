## Description

Conference organization app built on top of Nest.js

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development, requires a running Postgres instance
$ npm run start

# raise db image
$ docker-compose up confi_db

# docker-compose run app and db
$ docker-compose up --build
```

## Test

```bash

# e2e tests
$ npm run test:e2e

```

## Notes

Yes, there are some env files in source control, only for local development.

This project has flaws, some because it's a play project and some due to lack of time.

- users aren't saved in db but are hardcoded in `userService`
- the project only has end to end tests
  - TO DO:
    End to end tests that interact with db, using db raised per suite as a docker image
    
    Unit tests for services
