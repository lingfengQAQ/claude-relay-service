# ⚡ 快速部署到 Vercel

一键部署 Claude Relay Service 到 Vercel，零运维成本！

---

## 🚀 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lingfengQAQ/claude-relay-service)

点击按钮后：

1. **Fork 仓库**到你的 GitHub
2. **配置环境变量**（见下方）
3. **点击 Deploy**
4. **等待 2-3 分钟**完成部署

---

## 📋 必需的环境变量

在 Vercel 部署时，需要配置以下环境变量：

### 1. Upstash Redis（必填）

先在 [Upstash](https://upstash.com/) 创建免费 Redis 数据库，然后获取：

```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxx...
```

### 2. 管理员账号（必填）

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的强密码
```

### 3. Session 密钥（必填）

生成随机字符串：

```bash
# 在本地终端运行
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

然后设置：

```bash
SESSION_SECRET=生成的随机字符串
```

---

## 📖 详细教程

查看完整的部署教程：[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

包含：
- ✅ Upstash Redis 注册和配置
- ✅ Vercel 部署详细步骤
- ✅ 管理界面使用指南
- ✅ Claude Code 配置方法
- ✅ 常见问题解决方案
- ✅ 自定义域名配置

---

## 💰 成本

| 服务 | 免费额度 | 说明 |
|------|---------|------|
| Vercel Hobby | 100GB 带宽/月 | 个人使用完全免费 |
| Upstash Redis | 10,000 命令/天 | 足够个人使用 |
| **总计** | **$0/月** | 🎉 完全免费！ |

---

## 🎯 部署后

### 1. 访问管理界面

```
https://你的项目.vercel.app/web
```

### 2. 添加 Claude 账户

在管理界面添加你的 Claude 账户

### 3. 创建 API Key

生成 API Key 用于 Claude Code

### 4. 配置客户端

```bash
# Windows PowerShell
$env:ANTHROPIC_BASE_URL="https://你的项目.vercel.app"
$env:ANTHROPIC_API_KEY="cr_你的API密钥"

# Linux/Mac
export ANTHROPIC_BASE_URL="https://你的项目.vercel.app"
export ANTHROPIC_API_KEY="cr_你的API密钥"
```

---

## 🔧 本地开发

如果需要本地开发：

```bash
# 克隆仓库
git clone https://github.com/lingfengQAQ/claude-relay-service.git
cd claude-relay-service

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 启动开发服务器
npm run dev
```

---

## 📞 获取帮助

- 📖 [完整部署教程](VERCEL_DEPLOYMENT.md)
- 📖 [原项目文档](README.md)
- 🐛 [提交 Issue](https://github.com/Wei-Shaw/claude-relay-service/issues)

---

**祝部署顺利！** 🚀
