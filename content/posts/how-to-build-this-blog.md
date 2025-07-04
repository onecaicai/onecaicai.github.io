---
title: "这个博客是怎么搭建起来的"
date: 2025-07-01T18:03:13+08:00
draft: false
author: "OneCai"
tags: ["Hugo", "博客搭建", "PaperMod"]
categories: ["操作记录"]
summary: "小白按照教程搭建Hugo博客，蹭GitHub的免费空间。"
description: "这篇文章将详细介绍我是如何搭建这个Hugo博客的。"
keywords: ["Hugo", "博客搭建", "PaperMod"]
---

## 算是前言

很多年前，我也折腾过博客—— WordPress 。

刚工作不久那会，买了台便宜的小主机，注册了域名，备案还不算严格。搭建起网站，记录下初入职场时的各种点滴。写得最多的，是工作中遇到的技术问题、解决方法，还有一些积累下来的经验体会。偶尔转载些在网上看到的文字，比如当年流行、觉得句句在理的“心灵鸡汤”。

当时还动过念头，想拉几个朋友一起写博客，每人一个账号，分享各自的经历和思考。可惜这个想法只停留在了脑海里。慢慢地，能写的内容越来越少，更新也停了下来，前后短短几个月时间，Google广告没流量。

后来新浪博客、网易 LOFTER 正火，接着又是腾讯微博、新浪微博、饭否、Google Buzz……信息平台越来越多，140 字以内的内容成了主流，“长东西”消退。

如今，在短视频横行的时代，偶尔看到那些还在坚持写字的独立博客，佩服佩服，他们的文章列表一拉到底，是一篇又一篇的记录，几万字的内容啊，真实可贵。

查看Wordpress导出的备份 Markdown 文件，真正手动敲字的还是有几片水文的。

有些后悔，当年没有坚持写下去。

现在，也还不算太晚。

![刘家峡风景](/img/liu-jia-xia.jpeg "刘家峡水库景色")


## 搭建过程

- 思路：模仿 `https://qwenlm.github.io` 和<a href="https://www.shaohanyun.top" target="_blank">田少晗的个人博客</a>这两个博客
- 工具：豆包（在我这里算是大材小用了）。

### 1. 安装Hugo

安装Hugo并创建本地博客文件，这个操作在网上有很多，或者直接看Hugo的安装文档。

电脑系统在通过brew安装Hugo时报错，把安装源更换为国内源解决了这个问题。

### 2. 主题

- 按照 `https://qwenlm.github.io`  博客设置主题，报错了几次没有解决，通过浏览器下载了`hugo-PaperMod-master`文件，把这个文件重命名为PaperMod，再修改`hugo.toml`文件。

### 3. 自定修改

> #### 字体

**主字体**: 霞鹜文楷 (LXGW WenKai)

**字体导入**: CDN方式 (`lxgw-wenkai@1.315.0`)

**字体层级**: LXGW WenKai → 霞鹜文楷 → 楷体 → KaiTi → STKaiti → serif

> #### 主题

**默认主题**: 暗色主题

**语言**: 中文 (zh-cn)

**主题**: PaperMod

**默认模式**: 暗色主题 (`defaultTheme = "dark"`)

**主题切换**: 已启用 (`disableThemeToggle = false`)

**Profile模式**: 已禁用，首页显示文章列表



> #### 排版设置

**正文字体大小**: 16px

**行距**: 28px

**字间距**: 0.5px

**段落间距**: 16px

**标题字体大小**: H1至H6分别为28px、20px、18px、16px、15px、14px

> #### 图片样式

**最大宽度**: 650px

**居中显示**: 自动margin

**圆角**: 8px

**阴影**: 悬停时增强效果

**缩放**: 悬停时1.02倍


## 关于维护

借助AI生成两个本地脚本，一个是启动本地服务的，一个是发布到GitHub的。

> 本地启动脚本

```
#!/bin/bash

# 博客本地服务启动脚本
# 用法: ./start_blog.sh

echo "🚀 启动Hugo博客本地服务..."

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BLOG_DIR="$SCRIPT_DIR/MyBloooger"

# 检查博客目录是否存在
if [ ! -d "$BLOG_DIR" ]; then
    echo "❌ 错误: 博客目录不存在: $BLOG_DIR"
    echo "   请确保在包含 MyBloooger 目录的文件夹中运行此脚本"
    exit 1
fi

# 进入博客目录
cd "$BLOG_DIR"

# 固定使用1313端口
PORT=1313

# 检查端口是否被占用，如果被占用则直接终止
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  检测到端口 $PORT 被占用，正在强制终止相关进程..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null
    sleep 2
    echo "✅ 进程已终止"
fi

echo "📂 博客目录: $BLOG_DIR"
echo "🌐 启动端口: $PORT"
echo ""

# 清理缓存和构建产物
echo "🧹 清理缓存和构建产物..."
rm -rf public/ resources/ .hugo_build.lock
echo "✅ 清理完成"

# 强制重新构建一次（确保最新内容）
echo "🔄 强制重新构建博客..."
hugo --buildDrafts --minify
echo "✅ 重新构建完成"

# 再次清理构建产物（避免冲突）
rm -rf public/ resources/

# 启动Hugo服务器
echo "🚀 启动Hugo服务器..."
echo "   本地地址: http://localhost:$PORT"
echo "   局域网地址: http://$(ipconfig getifaddr en0):$PORT"
echo "   按 Ctrl+C 停止服务"
echo "   🔥 每次文件变更都会自动重新构建"
echo ""

hugo server --buildDrafts --port $PORT --bind 0.0.0.0 --disableFastRender

```