/**
 * Redis 配置 - Vercel 环境使用 Upstash
 * 
 * 在 Vercel 环境中，使用 Upstash Redis REST API
 * 在本地环境中，使用标准 ioredis
 */

// 检测是否在 Vercel 环境
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

let redisClient;

if (isVercel) {
  // Vercel 环境：使用 Upstash Redis
  const { Redis } = require('@upstash/redis');
  
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Vercel 环境需要设置 UPSTASH_REDIS_REST_URL 和 UPSTASH_REDIS_REST_TOKEN');
  }
  
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  
  console.log('✅ 使用 Upstash Redis (Vercel 环境)');
} else {
  // 本地环境：使用标准 ioredis
  const Redis = require('ioredis');
  
  const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0'),
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 3,
  };
  
  redisClient = new Redis(redisConfig);
  
  redisClient.on('connect', () => {
    console.log('✅ Redis 连接成功');
  });
  
  redisClient.on('error', (err) => {
    console.error('❌ Redis 连接错误:', err.message);
  });
  
  console.log('✅ 使用标准 Redis (本地环境)');
}

module.exports = redisClient;
