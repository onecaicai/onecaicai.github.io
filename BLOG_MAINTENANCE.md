# OneCai's Blog 维护文档

> 📝 **文档更新时间**: 2025年07月02日  
> 🔧 **Hugo版本**: v0.147.8+extended  
> 🎨 **主题**: PaperMod  
> 🌐 **部署方式**: GitHub Pages (gh-pages分支)

---

## 🏗️ 博客架构概览

### 技术栈
- **静态站点生成器**: Hugo v0.147.8+extended
- **主题**: PaperMod (位于 `themes/PaperMod/`)
- **部署平台**: GitHub Pages
- **评论系统**: giscus (已配置，需启用)
- **语言**: 中文 (zh-CN)

### 分支结构
- **main**: 源代码分支，包含Hugo配置和内容文件
- **gh-pages**: 部署分支，包含构建后的静态HTML文件
- **master**: 历史分支，不再使用

---

## 📁 项目结构

```
MyBloooger/
├── archetypes/          # 文章模板
├── assets/              # 资源文件 (CSS, JS)
├── content/             # 博客内容
│   ├── posts/          # 文章目录
│   ├── about/          # 关于页面
│   └── _index.md       # 首页内容
├── layouts/             # 自定义布局模板
├── static/              # 静态资源
├── themes/PaperMod/     # 主题文件
├── hugo.toml           # Hugo主配置文件
├── deploy.sh           # 部署脚本
└── BLOG_MAINTENANCE.md # 本维护文档
```

---

## ⚙️ 当前配置详情

### Hugo 配置 (hugo.toml)

#### 基本信息
- **站点地址**: https://onecaicai.github.io
- **站点标题**: OneCai's Blog
- **语言**: zh-cn
- **环境**: production

#### 功能特性
- ✅ 评论系统 (giscus)
- ✅ 深色/浅色主题切换
- ✅ 搜索功能
- ✅ 目录显示 (TOC)
- ✅ 代码复制按钮
- ✅ 阅读时间估算
- ✅ 字数统计
- ✅ 面包屑导航

#### 导航菜单
1. 🏠 首页
2. 🏷️ 标签
3. 📂 分类
4. ⏱ 时间轴
5. 🔍 搜索
6. 🙋🏻‍♂️ 关于

#### giscus 评论配置
- **仓库**: onecaicai/onecaicai.github.io
- **仓库ID**: R_kgDOPEzSrg
- **分类**: Announcements
- **分类ID**: DIC_kwDOPEzSrs4CsV18
- **映射方式**: pathname
- **语言**: zh-CN

---

## 🚀 日常使用流程

### 1. 启动本地开发服务器

```bash
# 方式1: 标准启动 (推荐)
hugo server --buildDrafts

# 方式2: 指定端口
hugo server --buildDrafts --port 1314

# 方式3: 绑定所有网络接口
hugo server --buildDrafts --bind 0.0.0.0 --port 1313
```

本地预览地址: http://localhost:1313

### 2. 创建新文章

```bash
# 使用默认模板
hugo new posts/文章标题.md

# 使用特定模板
hugo new --kind tech-tutorial posts/技术教程.md
hugo new --kind review posts/产品评测.md
hugo new --kind ai-analysis posts/AI分析.md
```

### 3. 编辑内容
- 文章路径: content/posts/
- 页面路径: content/about/
- 首页内容: content/_index.md

### 4. 本地预览
在本地服务器运行状态下，修改文件会自动重新构建和刷新页面。

---

## 📦 部署流程

### 自动部署 (推荐)

使用部署脚本一键部署:

```bash
./deploy.sh
```

脚本功能:
1. 🔧 构建静态网站 (hugo --minify --gc)
2. 📁 进入 public 目录
3. 🗂️ 初始化 git 仓库
4. 📤 推送到 gh-pages 分支
5. ✅ 完成部署

### 手动部署

```bash
# 1. 构建网站
hugo --minify --gc

# 2. 部署到GitHub Pages
cd public
git init
git add .
git commit -m "Deploy Hugo site - $(date '+%Y-%m-%d %H:%M:%S')"
git branch -M gh-pages
git remote add origin git@github.com:onecaicai/onecaicai.github.io.git
git push -f origin gh-pages
cd ..
```

### 源码管理

```bash
# 提交源码到main分支
git add .
git commit -m "更新描述"
git push origin main
```

---

## 🔧 配置文件说明

### 重要配置项

#### 环境设置
```toml
env = "production"  # 生产环境,确保CSS/JS正确加载
```

#### 主题配置
```toml
defaultTheme = "dark"        # 默认深色主题
disableThemeToggle = false   # 允许主题切换
```

#### 功能开关
```toml
comments = true              # 启用评论
ShowToc = true              # 显示目录
ShowCodeCopyButtons = true   # 显示代码复制按钮
ShowReadingTime = true       # 显示阅读时间
```

---

## 🌐 GitHub Pages 配置

### 当前设置
- **Source**: Deploy from a branch
- **Branch**: gh-pages
- **Folder**: / (root)

### 访问地址
- **主站**: https://onecaicai.github.io
- **GitHub仓库**: https://github.com/onecaicai/onecaicai.github.io

---

## 🛠️ 故障排除

### 常见问题

#### 1. 页面显示空白/404
**原因**: GitHub Pages配置错误或分支问题
**解决方案**:
1. 检查GitHub Pages设置是否为 gh-pages 分支
2. 重新运行 ./deploy.sh 部署
3. 确认 hugo.toml 中 env = "production"

#### 2. 本地服务器端口被占用
**解决方案**:
```bash
# 查找占用进程
lsof -ti:1313

# 结束进程
kill -9 $(lsof -ti:1313)

# 或使用其他端口
hugo server --port 1314
```

#### 3. 主题样式丢失
**原因**: 环境配置错误
**解决方案**:
确保 hugo.toml 中:
```toml
env = "production"
```

#### 4. giscus评论不显示
**检查清单**:
- [ ] GitHub仓库已启用 Discussions
- [ ] giscus GitHub App 已安装
- [ ] 仓库ID和分类ID正确
- [ ] 仓库是公开的

---

## 📝 内容管理

### 文章前置信息 (Front Matter)

```yaml
---
title: "文章标题"
date: 2025-07-02T00:00:00+08:00
lastmod: 2025-07-02T00:00:00+08:00
draft: false
author: "OneCai"
tags: ["标签1", "标签2"]
categories: ["分类"]
description: "文章描述"
showToc: true
TocOpen: false
hidemeta: false
comments: true
disableShare: false
searchHidden: false
---
```

### 可用文章模板
1. **default.md**: 默认文章模板
2. **tech-tutorial.md**: 技术教程模板
3. **review.md**: 评测文章模板
4. **ai-analysis.md**: AI分析文章模板
5. **weekly-summary.md**: 周报模板

---

## 🔄 版本更新记录

### v1.0.0 (2025-07-02)
- ✅ 初始化Hugo博客
- ✅ 配置PaperMod主题
- ✅ 启用giscus评论系统
- ✅ 配置GitHub Pages部署
- ✅ 创建自动化部署脚本
- ✅ 修复生产环境配置问题
- ✅ 解决分支部署问题
- ✅ 创建博客维护文档

---

## 📞 技术支持

### 有用的资源
- **Hugo官方文档**: https://gohugo.io/documentation/
- **PaperMod主题文档**: https://github.com/adityatelange/hugo-PaperMod
- **giscus配置**: https://giscus.app/zh-CN
- **GitHub Pages文档**: https://docs.github.com/pages

### 联系方式
如有技术问题，可以在博客相关文章下留言或通过社交媒体联系。

---

*📝 本文档将随博客配置变更而持续更新*
