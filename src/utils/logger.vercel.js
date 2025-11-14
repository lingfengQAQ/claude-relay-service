/**
 * Logger 配置 - Vercel 环境适配
 * 
 * Vercel 无持久化文件系统，只使用 Console 输出
 * 本地环境使用文件日志
 */

const winston = require('winston');
const path = require('path');

// 检测是否在 Vercel 环境
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

// 日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Console 格式（更易读）
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

// 配置 transports
const transports = [];

if (isVercel) {
  // Vercel 环境：只使用 Console
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  );
  console.log('✅ Logger: Vercel 模式（仅 Console 输出）');
} else {
  // 本地环境：使用文件 + Console
  const DailyRotateFile = require('winston-daily-rotate-file');
  
  // 确保日志目录存在
  const logsDir = path.join(process.cwd(), 'logs');
  
  // 错误日志
  transports.push(
    new DailyRotateFile({
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      format: logFormat,
      maxSize: '20m',
      maxFiles: '14d',
    })
  );
  
  // 综合日志
  transports.push(
    new DailyRotateFile({
      filename: path.join(logsDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      format: logFormat,
      maxSize: '20m',
      maxFiles: '14d',
    })
  );
  
  // Console 输出
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
  
  console.log('✅ Logger: 本地模式（文件 + Console 输出）');
}

// 创建 logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports,
  exitOnError: false,
});

// 捕获未处理的异常和拒绝
if (!isVercel) {
  logger.exceptions.handle(
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'exceptions.log') 
    })
  );
  
  logger.rejections.handle(
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'rejections.log') 
    })
  );
}

module.exports = logger;
