# 闪电猫 SpeedCAT 专属落地页

> 官方域名：[https://iflashcat.mom](https://iflashcat.mom)  
> 技术架构：Astro 7 + TypeScript + 原生现代 CSS

---

## 📖 项目简介

本项目为「闪电猫 SpeedCAT」单品牌专属落地页，包含公开参考套餐价格、流量规则、多端客户端订阅配置指南、节点常识与常见问题解答。

**特别声明**：本项目不是机场排行榜、不是导航网站，不包含任何第三方竞品推荐与对比，整站聚焦于闪电猫 SpeedCAT 服务。

---

## 🚀 技术特性

- **静态极速输出**：基于 Astro 7 静态引擎，全站预渲染为纯 HTML/CSS/JS，无需运行时后端与数据库支持。
- **单品牌数据集中管理**：所有套餐与资费在 `src/data/plans.ts` 统一管理，首页、独立套餐页与文章内价格数据同源联动。
- **SEO & 语义化**：每页具备唯一 Title、Description、H1 与标准 Canonical，集成 Schema.org 结构化数据（WebSite, Article, FAQPage, BreadcrumbList）。
- **符合标准协议**：自动化生成并校验 `sitemap.xml` 与 `robots.txt`。
- **移动端优先**：响应式支持 360px 至 1440px 视口，防样式丢失与横向溢出。

---

## 📦 项目结构

```
iflashcat.mom/
├── public/                 # 静态公开资源 (favicon.svg, robots.txt)
├── src/
│   ├── components/         # 模块化 UI 组件 (Header, Footer, Hero, Pricing, FAQ...)
│   ├── content/
│   │   └── guides/         # 7 篇原创深度技术文章 (800~1500 字)
│   ├── data/               # 核心数据源 (plans.ts, faq.ts, site.ts)
│   ├── layouts/            # 全局模板 (Layout.astro)
│   ├── pages/              # 页面路由 (/ , /pricing/, /guides/, /faq/)
│   └── styles/             # 全局样式系统 (global.css)
├── astro.config.mjs        # Astro 配置文件
├── package.json            # 依赖与脚本
└── tsconfig.json           # TypeScript 配置
```

---

## 🛠️ 本地开发与构建

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发模式
```bash
npm run dev
```

### 3. 生产静态构建
```bash
npm run build
```
构建产物输出至 `dist/` 目录。

### 4. 自动化测试
```bash
npm test
```
执行全站 470+ 项指标自动化检测与内部链接 404 排查。

---

## 🌐 推荐部署方式

- **Cloudflare Pages**：连接此 GitHub 仓库，Build command 填 `npm run build`，Build output 填 `dist`。
- **Vercel / Netlify**：直接导入仓库，框架选择 Astro。
- **Nginx / 静态空间**：将 `dist/` 目录文件上传至 Web 根目录即可。
