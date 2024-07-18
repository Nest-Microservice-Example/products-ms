export type DatabaseConfig = {
  url: string;
};

export type Config = {
  port: number;
  database: DatabaseConfig;
};
