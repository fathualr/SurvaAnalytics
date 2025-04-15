import pkg from 'pg';
const { Pool } = pkg;

const isCloud = process.env.DATABASE_URL && process.env.DATABASE_CLOUD === 'true';

const pool = new Pool(
  isCloud
    ? {
        // Konfigurasi untuk koneksi database cloud menggunakan connection string
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        // Konfigurasi untuk koneksi database lokal menggunakan parameter individual
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      }
);

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    const connectionType = isCloud ? 'Cloud' : 'Local';
    console.log(`✅ PostgreSQL connected successfully on ${connectionType}`);
    client.release();
    return true;
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err.message);
    return false;
  }
};

export default pool;
