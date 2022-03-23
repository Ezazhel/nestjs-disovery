## nestjs-disovery

Learning project using nestjs ; jest ; typeorm ; mssql

## Description

I used the framework from Typescript starter repository.
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Swagger

I used this link in order to install swagger on this solution : https://docs.nestjs.com/openapi/introduction, the url to access swagger page is : http://localhost:3000/api as found in the documentation.

## Running the app

# Database

In order to test this app on your computeur, you'll need a MSSQL Server instance, with the parameters found in ormconfig.json.
The "synchronize": true parameter should ONLY be used in development. It create the database table and table scheme for you.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Nest is [MIT licensed](LICENSE).
