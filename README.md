npm run start:dev
npm run start:prod
npm run build
npm run seeding:test
npm run execute

-----Docker-----
docker-compose up -d
docker-compose down

-----Зависимости-----
npm i --save @nestjs/config

npm i cookie-parser
npm i -D @types/cookie-parser

npm install --save @nestjs/swagger

npm i --save class-validator
npm i --save class-transformer

npm install --save @nestjs/typeorm typeorm pg

-----Авторизация-----
npm i bcrypt @nestjs/jwt
npm i @nestjs/passport passport-jwt
npm i --save-dev @types/passport-jwt
npm i --save-dev @types/bcrypt


-----Чат-----
npm i --save @nestjs/websockets @nestjs/platform-socket.io
nest g gateway app



-----Миграции-----
MIGRATION_NAME=initial-schema npm run migration:create
 
-----Seeding-----
npm i typeorm-extension @faker-js/faker
faker - хуета

-----CLI-----
nest g mo document
nest g co document
nest g s document


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
