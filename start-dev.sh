#!/bin/bash

# 停止现有的Hugo进程
echo "停止现有的Hugo进程..."
pkill -f "hugo server"

# 清理public目录
echo "清理public目录..."
rm -rf public

# 启动开发服务器
echo "启动开发服务器..."
hugo server --config hugo.dev.toml --buildDrafts --buildFuture --port 1313 --bind 0.0.0.0

echo "开发服务器已启动，访问地址: http://localhost:1313/"
