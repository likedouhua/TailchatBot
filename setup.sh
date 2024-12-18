#!/bin/bash

# 检查 npm 是否已安装
if ! command -v npm &> /dev/null
then
    echo "npm 未安装，请先安装 Node.js 和 npm。"
    exit 1
fi

# 初始化 package.json 文件
echo "正在初始化 package.json 文件..."
npm init -y

# 安装所需的 npm 包
echo "正在安装 npm 包..."
npm install koa koa-router koa-bodyparser tailchat-client-sdk ajv

# 提示安装完成
echo "所有 npm 包已安装完毕。部署完毕"
