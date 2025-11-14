/**
 * Vercel-aware 入口文件
 * 
 * 自动检测环境并加载对应的配置：
 * - Vercel 环境：使用 Upstash Redis 和 Console 日志
 * - 本地环境：使用标准 Redis 和文件日志
 */

// 检测 Vercel 环境
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

if (isVercel) {
  console.log('🌐 检测到 Vercel 环境，使用 Vercel 适配配置');
  
  // 在 Vercel 环境中，重写模块路径
  const Module = require('module');
  const originalRequire = Module.prototype.require;
  
  Module.prototype.require = function(id) {
    // 重定向 Redis 模块
    if (id === './models/redis' || id === '../models/redis') {
      return originalRequire.call(this, '../config/redis.vercel');
    }
    
    // 重定向 Logger 模块
    if (id === './utils/logger' || id === '../utils/logger') {
      return originalRequire.call(this, './utils/logger.vercel');
    }
    
    return originalRequire.call(this, id);
  };
} else {
  console.log('💻 检测到本地环境，使用标准配置');
}

// 启动应用
const Application = require('./app');

const app = new Application();
app.start().catch((error) => {
  console.error('💥 应用启动失败:', error);
  process.exit(1);
});
