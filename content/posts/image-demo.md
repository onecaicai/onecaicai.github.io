---
title: "图片插入方法演示"
date: 2025-07-02T10:30:00+08:00
draft: true
tags: ["Hugo", "教程", "图片"]
categories: ["技术"]
description: "演示在Hugo博客中插入图片的各种方法"
---

# Hugo博客图片插入方法大全

本文演示在Hugo博客中插入`static/img`目录下图片的各种方法。

## 方法一：标准Markdown语法

最简单的方式，适合大多数场景：

```markdown
![刘家峡风景](/img/liu-jia-xia.jpeg)
```

效果：
![刘家峡风景](/img/liu-jia-xia.jpeg)

## 方法二：Hugo Figure Shortcode

功能更强大，支持标题、说明等：

```markdown
{{< figure src="/img/liu-jia-xia.jpeg" title="刘家峡水库" caption="甘肃省刘家峡水库的美丽风景" alt="刘家峡水库风景照片" >}}
```

效果：
{{< figure src="/img/liu-jia-xia.jpeg" title="刘家峡水库" caption="甘肃省刘家峡水库的美丽风景" alt="刘家峡水库风景照片" >}}

## 方法三：控制图片大小

### 使用Figure Shortcode控制大小

```markdown
{{< figure src="/img/liu-jia-xia.jpeg" 
           title="自定义尺寸" 
           caption="图片宽度限制为400px"
           width="400" >}}
```

效果：
{{< figure src="/img/liu-jia-xia.jpeg" title="自定义尺寸" caption="图片宽度限制为400px" width="400" >}}

### 使用HTML控制大小

```html
<img src="/img/liu-jia-xia.jpeg" alt="刘家峡风景" style="width: 50%; max-width: 300px;">
```

效果：
<img src="/img/liu-jia-xia.jpeg" alt="刘家峡风景" style="width: 50%; max-width: 300px;">

## 方法四：居中显示

```html
<div style="text-align: center;">
    <img src="/img/liu-jia-xia.jpeg" alt="居中显示的图片" style="max-width: 60%;">
    <p><em>居中显示的图片效果</em></p>
</div>
```

效果：
<div style="text-align: center;">
    <img src="/img/liu-jia-xia.jpeg" alt="居中显示的图片" style="max-width: 60%;">
    <p><em>居中显示的图片效果</em></p>
</div>

## 🎯 最佳实践

### 1. 路径规则
- ✅ 正确：`/img/filename.jpg`
- ❌ 错误：`static/img/filename.jpg`
- ❌ 错误：`img/filename.jpg`

### 2. 文件命名建议
- 使用英文和数字，避免中文
- 使用连字符 `-` 而不是空格
- 示例：`my-photo-2025.jpg`

### 3. 推荐的图片格式
- `.jpg/.jpeg` - 照片
- `.png` - 图标、截图
- `.webp` - 现代浏览器，文件更小

### 4. 图片优化
- 控制文件大小（建议 < 500KB）
- 设置合适的尺寸
- 添加alt属性提升SEO

---

现在你就可以在博客中自由插入图片了！🎉
