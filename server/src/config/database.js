import pg from 'pg';

export const isProduction = process.env.NODE_ENV === 'production';
export const isCloud = process.env.DATABASE_URL && (process.env.DATABASE_CLOUD === 'true' || isProduction);

const baseConfig = {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
};

export default isCloud
  ? {
      ...baseConfig,
      use_env_variable: 'DATABASE_URL',
      ssl: true,
      dialectOptions: {
        ssl: { rejectUnauthorized: false },
      },
    }
  : {
      ...baseConfig,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };
