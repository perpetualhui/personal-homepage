// scripts/generate-articles-data.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDirectory = path.join(__dirname, '../content/articles');
const outputDirectories = [
  path.join(__dirname, '../data'),
  path.join(__dirname, '../public/data')
];

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  // 中文按字符计算，英文按单词计算
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = content.split(/\s+/).filter(word => /[a-zA-Z]/.test(word)).length;
  const totalUnits = chineseChars + englishWords;
  return Math.max(1, Math.ceil(totalUnits / wordsPerMinute));
}

function getAllArticles() {
  if (!fs.existsSync(articlesDirectory)) {
    console.warn('⚠️  文章目录不存在，将创建空数据文件');
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('_'))
    .map(fileName => {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 提取文章ID（去掉日期前缀）
      const id = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

      const { data, content } = matter(fileContents);

      return {
        id,
        title: data.title || '未命名文章',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || '未分类',
        tags: data.tags || [],
        description: data.description || '',
        cover: data.cover,
        author: data.author || '你的名字',
        content,
        featured: data.featured || false,
        status: data.status || 'published',
        source: 'local',
        readingTime: calculateReadingTime(content)
      };
    });

  // 按日期排序（最新的在前）
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

function generateStatistics(articles) {
  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    drafts: articles.filter(a => a.status === 'draft').length,
    featured: articles.filter(a => a.featured).length,
    categories: {},
    tags: {}
  };

  articles.forEach(article => {
    // 统计分类
    if (!stats.categories[article.category]) {
      stats.categories[article.category] = 0;
    }
    stats.categories[article.category]++;

    // 统计标签
    article.tags.forEach(tag => {
      if (!stats.tags[tag]) {
        stats.tags[tag] = 0;
      }
      stats.tags[tag]++;
    });
  });

  return stats;
}

// 生成数据
console.log('🚀 开始生成文章数据...\n');

const allArticles = getAllArticles();
const publishedArticles = allArticles.filter(article => article.status === 'published');

// 生成统计信息
const stats = generateStatistics(allArticles);

// 确保输出目录存在
outputDirectories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 写入 JSON 文件到所有输出目录
outputDirectories.forEach(dir => {
  const outputPath = path.join(dir, 'articles.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(publishedArticles, null, 2)
  );
  console.log(`✅ 已生成: ${path.relative(process.cwd(), outputPath)}`);
});

// 生成统计信息文件
const statsPath = path.join(__dirname, '../data/article-stats.json');
fs.writeFileSync(
  statsPath,
  JSON.stringify(stats, null, 2)
);

// 输出结果
console.log('\n📊 文章统计:');
console.log(`   总文章数: ${stats.total}`);
console.log(`   已发布: ${stats.published}`);
console.log(`   草稿: ${stats.drafts}`);
console.log(`   精选: ${stats.featured}`);
console.log(`\n📁 分类统计:`);
Object.entries(stats.categories).forEach(([category, count]) => {
  console.log(`   ${category}: ${count}篇`);
});

const topTags = Object.entries(stats.tags)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

if (topTags.length > 0) {
  console.log(`\n🏷️  热门标签:`);
  topTags.forEach(([tag, count]) => {
    console.log(`   ${tag}: ${count}次`);
  });
}

console.log('\n✨ 文章数据生成完成！\n');
