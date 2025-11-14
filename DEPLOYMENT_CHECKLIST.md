# ✅ Vercel 部署检查清单

部署前请确认以下所有项目：

---

## 📋 部署前准备

### 1. Upstash Redis

- [ ] 已注册 Upstash 账号
- [ ] 已创建 Redis 数据库
- [ ] 已获取 `UPSTASH_REDIS_REST_URL`
- [ ] 已获取 `UPSTASH_REDIS_REST_TOKEN`

### 2. 管理员账号

- [ ] 已设置管理员用户名
- [ ] 已设置强密码（至少 12 位，包含大小写字母、数字、特殊字符）
- [ ] 已生成 SESSION_SECRET（使用 `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`）

### 3. GitHub 仓库

- [ ] 已 Fork 原项目到你的 GitHub
- [ ] 仓库可见性设置正确（Public 或 Private）

---

## 🚀 Vercel 部署

### 1. 导入项目

- [ ] 已登录 Vercel
- [ ] 已导入 GitHub 仓库
- [ ] 已选择正确的分支（main）

### 2. 环境变量配置

#### 必填项

- [ ] `UPSTASH_REDIS_REST_URL` = `https://xxx.upstash.io`
- [ ] `UPSTASH_REDIS_REST_TOKEN` = `AXXXxxx...`
- [ ] `ADMIN_USERNAME` = `admin`
- [ ] `ADMIN_PASSWORD` = `你的强密码`
- [ ] `SESSION_SECRET` = `随机生成的长字符串`

#### 可选项

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3000`
- [ ] `LOG_LEVEL` = `info`

### 3. 部署设置

- [ ] 构建命令：默认（自动检测）
- [ ] 输出目录：默认
- [ ] Node.js 版本：18.x 或更高

### 4. 开始部署

- [ ] 点击 "Deploy" 按钮
- [ ] 等待部署完成（2-3 分钟）
- [ ] 检查部署日志无错误

---

## 🎯 部署后验证

### 1. 基础检查

- [ ] 访问 `https://你的项目.vercel.app/health` 返回 200
- [ ] 访问 `https://你的项目.vercel.app/web` 可以打开管理界面
- [ ] 可以使用管理员账号登录

### 2. 功能测试

- [ ] 可以添加 Claude 账户
- [ ] 可以创建 API Key
- [ ] API Key 可以正常调用

### 3. API 测试

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

- [ ] API 返回正常响应
- [ ] 响应时间合理（< 10 秒）

### 4. Claude Code 测试

```bash
# 设置环境变量
export ANTHROPIC_BASE_URL="https://你的项目.vercel.app"
export ANTHROPIC_API_KEY="cr_你的API密钥"

# 测试
claude-code chat
```

- [ ] Claude Code 可以正常连接
- [ ] 可以正常对话

---

## 🔧 常见问题排查

### Redis 连接失败

- [ ] 检查 Upstash URL 和 Token 是否正确
- [ ] 检查 Upstash Redis 数据库是否正常运行
- [ ] 查看 Vercel 部署日志

### 管理界面无法访问

- [ ] 检查 Vercel 部署状态
- [ ] 检查域名 DNS 解析（如果使用自定义域名）
- [ ] 清除浏览器缓存

### API 请求超时

- [ ] 检查 Claude 账户是否正常
- [ ] 检查 API Key 是否有效
- [ ] 升级到 Vercel Pro（60 秒超时）

### OAuth 授权失败

- [ ] 确认可以访问 Claude 官网
- [ ] 尝试使用无痕模式
- [ ] 检查是否需要科学上网

---

## 📊 监控和维护

### 日常检查

- [ ] 每周检查 Vercel 部署状态
- [ ] 每周检查 Upstash Redis 使用量
- [ ] 每月检查 API 使用统计

### 性能监控

- [ ] 启用 Vercel Analytics
- [ ] 配置错误告警
- [ ] 定期查看日志

### 安全维护

- [ ] 定期更新管理员密码
- [ ] 定期轮换 API Key
- [ ] 监控异常访问

---

## 🎉 部署完成

恭喜！你已经成功部署了 Claude Relay Service 到 Vercel。

### 下一步

1. 📖 阅读 [完整文档](VERCEL_DEPLOYMENT.md)
2. 🔧 配置自定义域名（可选）
3. 📊 启用监控和告警
4. 🚀 开始使用！

---

## 📞 获取帮助

遇到问题？

- 📖 查看 [部署文档](VERCEL_DEPLOYMENT.md)
- 📖 查看 [原项目 README](README.md)
- 🐛 提交 [GitHub Issue](https://github.com/Wei-Shaw/claude-relay-service/issues)

---

**祝使用愉快！** 🎊
