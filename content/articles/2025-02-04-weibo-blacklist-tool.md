---
title: '如何使用微博黑名单管理工具'
date: 2025-02-04
category: '工具使用'
tags:
  - Python
  - Selenium
  - 自动化
  - 社交媒体
description: '详细介绍如何使用微博黑名单管理工具，包括安装、配置和使用方法'
author: '你的名字'
featured: true
status: 'published'
---

# 如何使用微博黑名单管理工具

微博黑名单管理工具是一款强大的Python脚本，帮助你轻松管理和维护微博黑名单。

## 功能特性

- 📤 导出黑名单（JSON/CSV/TXT三种格式）
- 🔇 一键拉黑单个用户
- 📋 批量拉黑（手动输入或文件导入）
- 🔐 Cookie自动登录

## 安装步骤

### 1. 安装依赖

\```bash
pip install selenium>=4.0.0 webdriver-manager>=4.0.0
\```

### 2. 配置Cookie（可选）

1. 登录微博网页版
2. 打开开发者工具（F12）
3. 复制Cookie值

## 使用方法

### 导出黑名单

\```bash
python weibo_blacklist_manager.py
# 选择: 1. 导出黑名单
\```

### 批量拉黑

创建一个文本文件 `blacklist.txt`：

\```text
1234567890 # 用户A
0987654321 # 用户B
\```

然后运行：

\```bash
python weibo_blacklist_manager.py
# 选择: 4. 批量拉黑（从文件导入）
\```

## 注意事项

- ⏰ 批量拉黑时建议间隔3-5秒
- 📊 微博有黑名单数量上限（通常2000-4000）
- 🔒 Cookie包含敏感信息，请妥善保管

## 总结

这个工具大大提高了管理微博黑名单的效率，让你能够更专注于享受社交媒体的乐趣。

---

项目地址：[GitHub](https://github.com/yourusername/weibo-blacklist-manager)
