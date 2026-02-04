// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  icon?: string;
  cover?: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  featured?: boolean;
  status?: 'active' | 'maintenance' | 'archived';
}
