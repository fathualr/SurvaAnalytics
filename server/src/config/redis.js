import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});
await redis.connect();

export default redis;
