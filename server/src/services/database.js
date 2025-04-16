import db from '../models/index.js';

export const testDatabaseConnection = async () => {
  try {
    await db.sequelize.authenticate();
    const connectionType = process.env.DATABASE_CLOUD === 'true' || process.env.NODE_ENV === 'production'
      ? 'Cloud'
      : 'Local';

    console.log(`✅ Database connected successfully on ${connectionType}`);
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    return false;
  }
};