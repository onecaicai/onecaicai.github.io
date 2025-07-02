# 我的Hugo博客

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-success)](https://onecaicai.github.io)
[![Hugo](https://img.shields.io/badge/Hugo-v0.147.8-blue)](https://gohugo.io)
[![PaperMod](https://img.shields.io/badge/Theme-PaperMod-orange)](https://github.com/adityatelange/hugo-PaperMod)

基于Hugo静态站点生成器构建的个人博客，使用PaperMod主题，部署在GitHub Pages。

## 🚀 特性

- **快速响应**：Hugo静态站点生成，加载速度快
- **现代设计**：PaperMod主题，支持深色/浅色模式切换
- **搜索功能**：内置全文搜索
- **评论系统**：集成giscus评论功能
- **多语言支持**：中文界面
- **SEO优化**：自动生成sitemap和robots.txt
- **代码高亮**：支持多种编程语言语法高亮

## 📱 在线访问

访问地址：[https://onecaicai.github.io](https://onecaicai.github.io)

## 🛠️ 技术栈

- **静态站点生成器**：[Hugo](https://gohugo.io) v0.147.8+extended
- **主题**：[PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- **评论系统**：[giscus](https://giscus.app)
- **部署平台**：GitHub Pages
- **CI/CD**：GitHub Actions

## 📝 本地开发

### 环境要求

- Hugo v0.147.8+extended 或更高版本
- Git

### 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/onecaicai/onecaicai.github.io.git
   cd onecaicai.github.io
   ```

2. **初始化子模块**
   ```bash
   git submodule update --init --recursive
   ```

3. **本地预览**
   ```bash
   hugo server --buildDrafts
   ```
   
   访问 http://localhost:1313 预览博客

4. **构建静态文件**
   ```bash
   hugo --minify
   ```

## 📖 写作指南

### 创建新文章

```bash
hugo new posts/文章标题.md
```

### Front Matter 示例

```yaml
---
title: "文章标题"
date: 2025-01-01T00:00:00+08:00
draft: false
tags: ["标签1", "标签2"]
categories: ["分类"]
description: "文章描述"
---
```

## 🚀 部署

项目配置了自动部署：

1. 推送到 `main` 分支会自动触发GitHub Actions
2. 构建完成后自动部署到 `gh-pages` 分支
3. GitHub Pages从 `gh-pages` 分支提供服务

手动部署命令：
```bash
./deploy.sh
```

## 📁 项目结构

```
.
├── archetypes/          # 内容模板
├── assets/             # 静态资源（CSS、JS）
├── content/            # 内容文件
│   ├── posts/          # 博客文章
│   └── about/          # 关于页面
├── layouts/            # 布局模板
├── static/             # 静态文件
├── themes/             # 主题文件
├── hugo.toml           # Hugo配置文件
├── deploy.sh           # 部署脚本
└── README.md           # 项目说明
```

## ⚙️ 配置说明

主要配置文件：`hugo.toml`

- 基础设置：站点信息、语言、时区
- 主题配置：PaperMod主题定制
- 评论配置：giscus集成
- SEO配置：搜索引擎优化

## 🔧 自定义

### 添加自定义CSS

在 `assets/css/custom.css` 中添加自定义样式

### 添加自定义JavaScript

在 `assets/js/` 目录下添加JavaScript文件，并在配置中引用

## 📄 许可证

本项目内容采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可证。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个博客！

---

如果这个项目对你有帮助，请给个⭐️支持一下！
