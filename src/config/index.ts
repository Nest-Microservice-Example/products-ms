import { Config } from './config.type';

export * from './config.type';
export * from './config.enum';

export default (): Config => ({
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
});
