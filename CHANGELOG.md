# 变更日志

本文档记录博客的所有重要变更和更新。

## [1.0.0] - 2025-07-02

### 新增 ✨
- 初始化 Hugo 博客项目
- 集成 PaperMod 主题
- 配置 giscus 评论系统
- 添加中文语言支持
- 创建自动化部署脚本 (`deploy.sh`)
- 添加博客维护文档 (`BLOG_MAINTENANCE.md`)
- 设置 GitHub Pages 部署

### 配置 ⚙️
- 配置深色/浅色主题切换
- 启用搜索功能
- 设置目录显示 (TOC)
- 配置代码复制按钮
- 设置阅读时间估算
- 启用字数统计
- 配置面包屑导航

### 修复 🐛
- 修复生产环境配置问题 (`env = "production"`)
- 解决 GitHub Pages 404 错误
- 修复分支部署问题 (使用 gh-pages 分支)
- 解决 CSS/JS 资源加载问题

### 文件结构 📁
```
MyBloooger/
├── archetypes/          # 文章模板
├── assets/              # 资源文件
├── content/             # 博客内容
├── layouts/             # 布局模板
├── static/              # 静态资源
├── themes/PaperMod/     # 主题
├── hugo.toml           # 主配置
├── deploy.sh           # 部署脚本
├── BLOG_MAINTENANCE.md # 维护文档
└── CHANGELOG.md        # 变更日志
```

### 部署 🚀
- 使用 GitHub Pages 托管
- 采用 gh-pages 分支部署方式
- 创建自动化部署脚本

---

## 更新规范

### 版本号规则
采用语义化版本控制 (Semantic Versioning):
- **主版本号**: 不兼容的重大变更
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 变更分类
- **新增** ✨: 新功能或特性
- **修改** 🔄: 现有功能的修改
- **修复** 🐛: Bug 修复
- **删除** 🗑️: 删除的功能
- **配置** ⚙️: 配置相关变更
- **文档** 📝: 文档更新
- **部署** 🚀: 部署相关变更

### 提交信息格式
```
类型(范围): 简短描述

详细描述...
```

例如:
```
feat(comments): 添加 giscus 评论系统
fix(deploy): 修复 GitHub Pages 404 错误
docs(maintenance): 更新博客维护文档
```
