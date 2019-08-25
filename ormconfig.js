require('dotenv/config');

module.exports = [{
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [
    "src/**/*-model.ts"
  ],
  subscribers: [
    "src/**.module/*-subscriber.ts"
  ],
  migrations: [
    "src/migrations/*.ts"
  ]
}];
