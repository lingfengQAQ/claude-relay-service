const path = require('path')
require('dotenv').config()

const config = {
  // 🌐 服务器配置
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV || 'production',
    trustProxy: true // Vercel 环境需要信任代理
  },

  // 🔐 安全配置
  security: {
    jwtSecret: process.env.JWT_SECRET || process.env.SESSION_SECRET || 'CHANGE-THIS-JWT-SECRET',
    adminSessionTimeout: parseInt(process.env.ADMIN_SESSION_TIMEOUT) || 86400000,
    apiKeyPrefix: process.env.API_KEY_PREFIX || 'cr_',
    encryptionKey: process.env.ENCRYPTION_KEY || process.env.SESSION_SECRET || 'CHANGE-THIS-KEY'
  },

  // 📊 Redis配置 - Vercel 使用 Upstash
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB) || 0,
    connectTimeout: 10000,
    commandTimeout: 5000,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    enableTLS: process.env.REDIS_ENABLE_TLS === 'true'
  },

  // 🔗 会话管理配置
  session: {
    stickyTtlHours: parseFloat(process.env.STICKY_SESSION_TTL_HOURS) || 1,
    renewalThresholdMinutes: parseInt(process.env.STICKY_SESSION_RENEWAL_THRESHOLD_MINUTES) || 0
  },

  // 🎯 Claude API配置
  claude: {
    apiUrl: process.env.CLAUDE_API_URL || 'https://api.anthropic.com/v1/messages',
    apiVersion: process.env.CLAUDE_API_VERSION || '2023-06-01',
    betaHeader: process.env.CLAUDE_BETA_HEADER || 'claude-code-20250219,oauth-2025-04-20',
    overloadHandling: {
      enabled: (() => {
        const minutes = parseInt(process.env.CLAUDE_OVERLOAD_HANDLING_MINUTES) || 0
        return Math.max(0, Math.min(minutes, 1440))
      })()
    }
  },

  // ☁️ Bedrock API配置
  bedrock: {
    enabled: process.env.CLAUDE_CODE_USE_BEDROCK === '1',
    defaultRegion: process.env.AWS_REGION || 'us-east-1',
    smallFastModelRegion: process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION,
    defaultModel: process.env.ANTHROPIC_MODEL || 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    smallFastModel: process.env.ANTHROPIC_SMALL_FAST_MODEL || 'us.anthropic.claude-3-5-haiku-20241022-v1:0',
    maxOutputTokens: parseInt(process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS) || 4096,
    maxThinkingTokens: parseInt(process.env.MAX_THINKING_TOKENS) || 1024,
    enablePromptCaching: process.env.DISABLE_PROMPT_CACHING !== '1'
  },

  // 🌐 代理配置
  proxy: {
    timeout: parseInt(process.env.DEFAULT_PROXY_TIMEOUT) || 600000,
    maxRetries: parseInt(process.env.MAX_PROXY_RETRIES) || 3,
    useIPv4: process.env.PROXY_USE_IPV4 !== 'false'
  },

  // ⏱️ 请求超时配置
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 600000,

  // 📈 使用限制
  limits: {
    defaultTokenLimit: parseInt(process.env.DEFAULT_TOKEN_LIMIT) || 1000000
  },

  // 📝 日志配置 - Vercel 只使用 Console
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dirname: '/tmp/logs', // Vercel 临时目录
    maxSize: '10m',
    maxFiles: 5
  },

  // 🔧 系统配置
  system: {
    cleanupInterval: parseInt(process.env.CLEANUP_INTERVAL) || 3600000,
    tokenUsageRetention: parseInt(process.env.TOKEN_USAGE_RETENTION) || 2592000000,
    healthCheckInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 60000,
    timezone: process.env.SYSTEM_TIMEZONE || 'Asia/Shanghai',
    timezoneOffset: parseInt(process.env.TIMEZONE_OFFSET) || 8,
    rateLimitCleanupInterval: parseInt(process.env.RATE_LIMIT_CLEANUP_INTERVAL) || 5
  },

  // 🎨 Web界面配置
  web: {
    title: process.env.WEB_TITLE || 'Claude Relay Service',
    description: process.env.WEB_DESCRIPTION || 'Multi-account Claude API relay service',
    logoUrl: process.env.WEB_LOGO_URL || '/assets/logo.png',
    enableCors: process.env.ENABLE_CORS === 'true',
    sessionSecret: process.env.SESSION_SECRET || 'CHANGE-THIS-SESSION-SECRET'
  },

  // 🔐 LDAP 认证配置
  ldap: {
    enabled: process.env.LDAP_ENABLED === 'true',
    server: {
      url: process.env.LDAP_URL || 'ldap://localhost:389',
      bindDN: process.env.LDAP_BIND_DN || '',
      bindCredentials: process.env.LDAP_BIND_PASSWORD || '',
      searchBase: process.env.LDAP_SEARCH_BASE || '',
      searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})',
      searchAttributes: ['dn', 'uid', 'cn', 'mail'],
      timeout: 5000,
      connectTimeout: 10000,
      tls: {
        rejectUnauthorized: process.env.LDAP_TLS_REJECT_UNAUTHORIZED !== 'false'
      }
    },
    userMapping: {
      username: 'uid',
      displayName: 'cn',
      email: 'mail'
    }
  },

  // 👥 用户管理配置
  userManagement: {
    enabled: process.env.USER_MANAGEMENT_ENABLED === 'true',
    defaultUserRole: 'user',
    userSessionTimeout: 86400000,
    maxApiKeysPerUser: 1,
    allowUserDeleteApiKeys: false
  },

  // 📢 Webhook通知配置
  webhook: {
    enabled: process.env.WEBHOOK_ENABLED !== 'false',
    urls: process.env.WEBHOOK_URLS ? process.env.WEBHOOK_URLS.split(',').map(url => url.trim()) : [],
    timeout: 10000,
    retries: 3
  },

  // 🛠️ 开发配置
  development: {
    debug: process.env.DEBUG === 'true',
    hotReload: false // Vercel 不支持热重载
  }
}

module.exports = config
