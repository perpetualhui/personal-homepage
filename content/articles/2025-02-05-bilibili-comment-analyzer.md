---
title: 'B站评论区热词分析工具介绍'
date: 2025-02-05
category: '数据分析'
tags:
  - Python
  - Jieba
  - SnowNLP
  - 数据分析
  - NLP
description: '自动抓取B站视频评论，进行关键词统计和情感分析'
author: '你的名字'
featured: true
status: 'published'
---

# B站评论区热词分析工具介绍

想了解某个B站视频的观众在讨论什么？这个工具可以帮你自动抓取评论，生成可视化报告。

## 功能特性

- ✅ 抓取B站视频评论
- ✅ 中文分词和词频统计（基于jieba）
- ✅ 关键词提取（TF-IDF算法）
- ✅ 情感分析（正面/中性/负面）
- ✅ 生成精美的HTML可视化报告

## 安装依赖

\```bash
pip install requests jieba snownlp
\```

## 使用方法

### 基本使用

\```bash
python bilibili_comment_analyzer.py
\```

按提示输入：
1. B站视频ID（如：BV1xx411c7mD）
2. 要抓取的评论数量（默认1000）

### 获取视频ID

视频ID就是URL中的BV号：
- URL: `https://www.bilibili.com/video/BV1xx411c7mD`
- ID: `BV1xx411c7mD`

## 报告内容

生成的HTML报告包含：

- **统计概览**：总评论数、平均情感指数
- **情感分布**：正面/中性/负面评论比例
- **热门关键词**：Top 30高频关键词
- **代表性评论**：最正面和最负面的评论

## 技术原理

### 关键词提取

使用jieba的TF-IDF算法：
- TF (Term Frequency): 词频
- IDF (Inverse Document Frequency): 逆文档频率

### 情感分析

使用SnowNLP库：
- 返回0-1之间的情感得分
- \> 0.6: 正面
- < 0.4: 负面
- 0.4-0.6: 中性

## 总结

这个工具非常适合UP主和内容创作者了解观众反馈，也适合数据分析师进行社交媒体研究。

---

项目地址：[GitHub](https://github.com/yourusername/bilibili-comment-analyzer)
