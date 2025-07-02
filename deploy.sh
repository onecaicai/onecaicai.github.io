#!/bin/bash

# Hugo博客自动部署脚本

echo "🚀 开始部署Hugo博客..."

# 1. 构建网站
echo "📦 构建网站..."
hugo --minify --gc

# 2. 进入public目录
cd public

# 3. 如果已经是git仓库，先清理
if [ -d ".git" ]; then
    rm -rf .git
fi

# 4. 初始化git仓库
echo "🔧 初始化git仓库..."
git init
git add .
git commit -m "Deploy Hugo site - $(date '+%Y-%m-%d %H:%M:%S')"

# 5. 推送到gh-pages分支
echo "📤 推送到GitHub..."
git branch -M gh-pages
git remote add origin git@github.com:onecaicai/onecaicai.github.io.git
git push -f origin gh-pages

# 6. 返回项目根目录
cd ..

echo "✅ 部署完成！"
echo "�� 请访问：https://onecaicai.github.io"
