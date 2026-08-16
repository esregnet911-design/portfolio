# 腾讯云大陆服务器部署说明

本项目已经可以在 Vercel 运行。迁移到腾讯云大陆服务器时，不改作品数据、不删除原始素材，只增加服务器部署配置。

## 推荐购买配置

- 产品：腾讯云轻量应用服务器 Lighthouse
- 地区：深圳、广州、上海优先，选择离主要访问者更近的大陆节点
- 系统：Ubuntu 22.04 LTS 或 Ubuntu 24.04 LTS
- CPU / 内存：2 核 2GB 起步；图片较多、访问量上升后建议 2 核 4GB
- SSD：60GB 起步，当前 `public/images` 约 240MB，`material` 约 256MB
- 带宽：4Mbps 起步；如果图片访问量较大，后续把图片迁移到 COS + CDN
- 购买时长：如果要做 ICP 备案，建议至少 3 个月包年包月

## 腾讯云控制台步骤

1. 进入腾讯云控制台，购买轻量应用服务器。
2. 镜像选择 Ubuntu LTS，不要选择 WordPress、宝塔等应用镜像。
3. 设置 SSH 密钥登录，保管好私钥。
4. 进入服务器详情页，记录公网 IP。
5. 打开防火墙，只保留：
   - TCP 22：SSH
   - TCP 80：HTTP
   - TCP 443：HTTPS
6. 不要开放 TCP 3000 到公网；Next.js 只监听 `127.0.0.1:3000`，由 Nginx 反向代理。

## 服务器初始化

```bash
sudo apt update
sudo apt install -y git curl nginx

# 安装 Node.js 22 LTS。可使用 NodeSource 或 nvm。
# NodeSource 示例：
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v
```

## 拉取项目

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone https://github.com/esregnet911-design/portfolio.git
cd portfolio
```

如果服务器访问 GitHub 慢，可以先在本地打包上传，或后续改用国内镜像仓库。

## 首次部署

```bash
cd /var/www/portfolio
bash scripts/deploy-server.sh
```

脚本会执行：

- 检查 Node.js
- `npm install`
- `npm run build`
- 安装 PM2
- 用 PM2 启动 `portfolio`
- 保存 PM2 进程
- 输出 PM2 开机自启动命令

如果 PM2 输出 `sudo env PATH=... pm2 startup ...`，复制那一整行再执行一次。

## Nginx 配置

复制模板：

```bash
sudo cp deploy/nginx/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
```

编辑域名：

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

把：

```nginx
server_name example.com www.example.com;
```

改成你的域名。如果还没有域名，测试阶段可以先写：

```nginx
server_name _;
```

检查并重载：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

测试：

```bash
curl -I http://127.0.0.1:3000
curl -I http://你的服务器公网IP
```

## HTTPS

有域名并完成 DNS 解析后，可以使用 Let's Encrypt：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

如果使用腾讯云免费 SSL 证书，也可以在腾讯云控制台申请证书，然后把证书文件配置进 Nginx。

没有域名时，先用公网 IP 测试 HTTP，不影响服务器部署验证。

## 手动更新网站

```bash
cd /var/www/portfolio
git pull --ff-only
npm install
npm run build
pm2 restart portfolio
```

## 未来自动部署

预留模板在：

```text
deploy/github-actions/tencent-deploy.yml.example
```

启用时复制到：

```text
.github/workflows/tencent-deploy.yml
```

然后在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：

- `TENCENT_SERVER_HOST`：服务器公网 IP
- `TENCENT_SERVER_USER`：SSH 用户名
- `TENCENT_SERVER_SSH_KEY`：私钥内容
- `TENCENT_SERVER_PORT`：默认 22

不要把服务器密码、私钥、腾讯云 SecretId / SecretKey 写进代码。

## 图片与 COS 预留

当前图片仍从：

```text
/public/images
```

读取。未来迁移到 COS + CDN 后，在服务器环境变量中设置：

```bash
NEXT_PUBLIC_ASSET_BASE_URL=https://assets.example.com
```

然后重新构建：

```bash
npm run build
pm2 restart portfolio
```

要求 COS/CDN 上保持同样路径结构，例如：

```text
https://assets.example.com/images/projects/tianlang/optimized/cover-1920.webp
```

## ICP 备案

阶段 A：服务器测试

- 可以先用公网 IP 测试部署是否成功。
- 不需要因为还没有域名而阻塞部署。

阶段 B：正式域名上线

- 如果使用中国大陆服务器 + 自定义域名，域名需要完成 ICP 备案。
- 腾讯云备案通常要求使用腾讯云中国境内服务器资源。
- 备案审核完成前，不要把正式域名解析到大陆服务器对外提供网站服务。
- Vercel 版本可以继续作为备用访问地址。

## 排查命令

```bash
pm2 status
pm2 logs portfolio
curl -I http://127.0.0.1:3000
sudo nginx -t
sudo systemctl status nginx
sudo tail -n 100 /var/log/nginx/error.log
```

## 验收清单

- 首页正常
- About 正常
- Works 正常
- 作品详情刷新不 404
- 图片无 404
- 手机响应式正常
- 动画正常
- PM2 显示 `portfolio` online
- Nginx 80 正常
- HTTPS 证书正常
