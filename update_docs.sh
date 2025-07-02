#!/bin/bash

# 博客维护文档更新脚本

echo "📝 更新博客维护文档..."

# 获取当前日期
CURRENT_DATE=$(date '+%Y年%m月%d日')

# 获取Hugo版本
HUGO_VERSION=$(hugo version | grep -o 'v[0-9.]*+[a-z]*')

echo "当前日期: $CURRENT_DATE"
echo "Hugo版本: $HUGO_VERSION"

# 更新维护文档中的时间戳
sed -i.bak "s/> 📝 \*\*文档更新时间\*\*: .*/> 📝 \*\*文档更新时间\*\*: $CURRENT_DATE  /" BLOG_MAINTENANCE.md

# 清理备份文件
rm -f BLOG_MAINTENANCE.md.bak

echo "✅ 维护文档已更新"

# 询问是否要添加变更日志条目
echo ""
read -p "是否要添加新的变更日志条目? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "请输入版本号 (如: 1.0.1):"
    read VERSION
    
    echo "请输入变更描述:"
    read DESCRIPTION
    
    # 在CHANGELOG.md的第一个[版本号]行之前插入新条目
    NEW_ENTRY="## [$VERSION] - $CURRENT_DATE\n\n### 修改 🔄\n- $DESCRIPTION\n\n---\n"
    
    # 使用临时文件插入新条目
    awk -v new_entry="$NEW_ENTRY" '
    /^## \[/ && !inserted {
        print new_entry
        inserted = 1
    }
    { print }
    ' CHANGELOG.md > CHANGELOG.md.tmp && mv CHANGELOG.md.tmp CHANGELOG.md
    
    echo "✅ 变更日志已更新"
fi

echo ""
echo "📋 下一步操作:"
echo "1. 检查文档内容是否正确"
echo "2. 运行: git add BLOG_MAINTENANCE.md CHANGELOG.md"
echo "3. 运行: git commit -m \"docs: 更新维护文档\""
echo "4. 运行: git push origin main"
