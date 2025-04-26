export default {
  accessSecret: process.env.JWT_ACCESS_SECRET || 'your_secure_secret_123',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_456',
  accessExpires: '15m',
  refreshExpires: '7d',
  algorithm: 'HS256',
};
