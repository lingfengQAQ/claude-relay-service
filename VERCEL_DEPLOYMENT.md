# 🚀 Vercel 部署指南

完整的 Claude Relay Service 部署到 Vercel 教程，包含管理界面、多账号管理等所有功能。

---

## 📋 准备工作

- ✅ GitHub 账号
- ✅ Vercel 账号（用 GitHub 登录）
- ✅ Upstash 账号（免费 Redis）
- ⏱️ 大约需要 20 分钟

---

## 第一步：注册 Upstash Redis（5分钟）

### 1. 访问 Upstash

打开 https://upstash.com/ 并注册（用 GitHub 登录最快）

### 2. 创建 Redis 数据库

1. 点击 "Create Database"
2. 配置：
   - **Name**: `claude-relay`
   - **Type**: `Regional`（免费）
   - **Region**: 选择离你最近的（如 `ap-southeast-1` 新加坡）
   - **TLS**: 启用
3. 点击 "Create"

### 3. 获取连接信息

创建完成后，在数据库详情页找到：

```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxx...
```

**⚠️ 复制保存这两个值**，后面要用！

---

## 第二步：部署到 Vercel（3分钟）

### 1. 访问 Vercel

打开 https://vercel.com/

用 GitHub 账号登录

### 2. 导入项目

1. 点击 "Add New..." → "Project"
2. 选择你 Fork 的 `claude-relay-service` 仓库
3. 点击 "Import"

### 3. 配置环境变量

在 "Environment Variables" 部分添加以下变量：

#### 必填项

```bash
# Redis 配置（必填）
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxx...

# 管理员账号（必填）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的强密码

# Session 密钥（必填，随机字符串）
SESSION_SECRET=随机生成一个长字符串
```

**生成随机 SESSION_SECRET**：

```bash
# 在本地终端运行
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 可选项

```bash
# 端口（Vercel 会自动设置）
PORT=3000

# 日志级别
LOG_LEVEL=info

# 环境标识
NODE_ENV=production
```

### 4. 部署

点击 "Deploy" 按钮

等待 2-3 分钟，部署完成！

---

## 第三步：访问和配置（2分钟）

### 1. 获取部署 URL

部署完成后，Vercel 会给你一个 URL，类似：

```
https://claude-relay-service-xxx.vercel.app
```

### 2. 访问管理界面

打开浏览器访问：

```
https://你的项目.vercel.app/web
```

使用你设置的管理员账号登录：
- 用户名：`admin`
- 密码：你设置的密码

### 3. 添加 Claude 账户

1. 点击 "Claude 账户" 标签
2. 点击 "添加账户"
3. 点击 "生成授权链接"
4. 在新窗口完成 Claude 登录授权
5. 复制返回的 Authorization Code
6. 粘贴到管理界面完成添加

**注意**: 如果你在国内，这一步可能需要科学上网。

### 4. 创建 API Key

1. 点击 "API Keys" 标签
2. 点击 "创建新 Key"
3. 设置名称和限制
4. 保存并复制生成的 Key（`cr_` 开头）

---

## 第四步：使用（1分钟）

### Claude Code 配置

```bash
# Windows PowerShell
$env:ANTHROPIC_BASE_URL="https://你的项目.vercel.app"
$env:ANTHROPIC_API_KEY="cr_你的API密钥"

# Linux/Mac
export ANTHROPIC_BASE_URL="https://你的项目.vercel.app"
export ANTHROPIC_API_KEY="cr_你的API密钥"

# 测试
claude-code chat
```

### Cursor 配置

在 Cursor 设置中：

```json
{
  "anthropic.baseURL": "https://你的项目.vercel.app",
  "anthropic.apiKey": "cr_你的API密钥"
}
```

---

## 🎯 验证部署

### 测试 API

```bash
curl -X POST https://你的项目.vercel.app/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: cr_你的API密钥" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

应该返回 Claude 的响应。

---

## 🔧 常见问题

### 1. Redis 连接失败

**症状**：管理界面无法访问，显示 500 错误

**解决**：
1. 检查 Vercel 环境变量是否正确设置
2. 确认 Upstash Redis URL 和 Token 正确
3. 查看 Vercel 部署日志

### 2. OAuth 授权失败

**症状**：添加 Claude 账户时授权失败

**解决**：
1. 确保你的 Vercel URL 可以访问
2. 检查是否需要科学上网
3. 尝试使用无痕模式

### 3. API 请求超时

**症状**：Claude Code 请求超时

**解决**：
- Vercel Hobby 计划限制 10 秒执行时间
- 升级到 Pro 计划（60 秒）
- 或使用 VPS 部署

### 4. 日志查看

在 Vercel Dashboard：
1. 进入项目
2. 点击 "Logs" 标签
3. 查看实时日志

---

## 🚀 进阶配置

### 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名（如 `relay.example.com`）
3. 按提示配置 DNS（添加 CNAME 记录）
4. 等待 SSL 证书自动配置

### 性能优化

`vercel.json` 已配置：
- 新加坡和香港区域部署
- 60 秒函数超时
- 1024MB 内存

### 监控告警

1. 在 Vercel Dashboard 启用 "Analytics"
2. 配置 "Integrations" 连接 Slack/Discord
3. 设置错误告警

---

## 💰 成本估算

| 服务 | 免费额度 | 超出费用 |
|------|---------|---------|
| **Vercel Hobby** | 100GB 带宽/月 | 升级 Pro $20/月 |
| **Upstash Redis** | 10,000 命令/天 | $0.2/10万命令 |
| **总计** | 个人使用完全免费 | 重度使用 ~$20/月 |

---

## 📝 技术说明

### 项目修改

为了适配 Vercel，项目做了以下修改：

1. **添加 `vercel.json`**
   - 配置 Vercel 构建和路由
   - 设置函数超时和内存

2. **添加 `config/redis.vercel.js`**
   - 自动检测 Vercel 环境
   - Vercel 使用 Upstash Redis
   - 本地使用标准 ioredis

3. **添加 `src/utils/logger.vercel.js`**
   - Vercel 环境只使用 Console 日志
   - 本地环境使用文件日志

4. **更新 `package.json`**
   - 添加 `@upstash/redis` 依赖

### 环境检测

项目通过以下方式检测 Vercel 环境：

```javascript
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
```

### Redis 兼容性

Upstash Redis 与 ioredis 基本兼容，但有些差异：
- 使用 REST API 而非 TCP 连接
- 某些高级命令可能不支持
- 延迟略高于直连 Redis

---

## 🎉 完成！

现在你有了一个完全托管的 Claude Relay Service，享受：

✅ 零运维成本  
✅ 自动扩展  
✅ 全球 CDN  
✅ 自动 HTTPS  
✅ 完整管理界面  

---

## 📞 获取帮助

遇到问题？

1. 查看 [原项目 README](README.md)
2. 查看 [Vercel 文档](https://vercel.com/docs)
3. 查看 [Upstash 文档](https://docs.upstash.com/)
4. 提交 [GitHub Issue](https://github.com/Wei-Shaw/claude-relay-service/issues)

---

**祝部署顺利！** 🚀
