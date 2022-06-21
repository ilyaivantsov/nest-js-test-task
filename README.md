## Installation

```bash
$ npm install
```

> **WARNING** Need to install dev-dependencies to work with `sequelize-cli`

## Setting up
Create `.env` file at the root of the project with content with the same content as [`.env_example`](.env_example) 

### To create a DB
```bash
$ npm run db:create
```

### To run migration
```bash
$ npm run db:migrate
```

### To generate test data
```bash
$ npm run db:seed
```

> This command will create 100 test users with the same passwords - `password`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger API docs

Swagger docs will be available at [http:://localhost:3000/api](http:://localhost:3000/api)
