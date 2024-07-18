import { Config } from './config.type';

export default (): Config => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
});
