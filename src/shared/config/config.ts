import 'dotenv/config';

export const AppConfig = {
  appPort: process.env.APP_PORT,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbUsername: process.env.POSTGRES_USERNAME,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT, 10),
  dbName: process.env.DB_DATABASE,
};
