import { Config } from './config.type';

export * from './config.type';
export * from './config.enum';

export default (): Config => ({
  api: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
});
