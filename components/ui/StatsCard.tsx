// components/ui/StatsCard.tsx
'use client';

import React from 'react';

interface StatsCardProps {
  articleCount?: number;
  projectCount?: number;
  toolCount?: number;
  publishedThisYear?: number;
}

export default function StatsCard({
  articleCount = 0,
  projectCount = 0,
  toolCount = 0,
  publishedThisYear = 0
}: StatsCardProps) {
  const stats = [
    { label: '文章总数', value: articleCount, icon: '📝' },
    { label: '开发项目', value: projectCount, icon: '🛠️' },
    { label: 'AI 工具', value: toolCount, icon: '🤖' },
    { label: '今年发布', value: publishedThisYear, icon: '📅' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4">📊 统计信息</h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-white/60 flex items-center gap-2">
              <span>{stat.icon}</span>
              <span className="text-sm">{stat.label}</span>
            </span>
            <span className="text-white font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
