// components/projects/ProjectSidebar.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';

interface ProjectSidebarProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export default function ProjectSidebar({ projects, title = '🛠️ 我的项目', subtitle = '展示我的开源项目' }: ProjectSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-6">
      {/* 标题 */}
      <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-600`}>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
      </div>

      {/* 项目卡片列表 */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
