import type { IconType } from 'react-icons';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import {
  SiBootstrap,
  SiCss,
  SiDocker,
  SiDotnet,
  SiElectron,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiMongodb,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiSupabase,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

export interface TechItem {
  id: string;
  name: string;
  Icon: IconType;
  brandColor: string;
}

export interface TechCategory {
  id: string;
  labelVi: string;
  labelEn: string;
  summary: string;
  items: TechItem[];
}

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    id: 'backend',
    labelVi: 'Backend & Hệ thống',
    labelEn: 'Backend',
    summary: 'C#, .NET 10, NodeJS, Express.js',
    items: [
      { id: 'csharp', name: 'C#', Icon: TbBrandCSharp, brandColor: '#68217A' },
      { id: 'dotnet', name: '.NET 10', Icon: SiDotnet, brandColor: '#512BD4' },
      { id: 'nodejs', name: 'NodeJS', Icon: SiNodedotjs, brandColor: '#339933' },
      { id: 'express', name: 'Express.js', Icon: SiExpress, brandColor: '#404040' },
    ],
  },
  {
    id: 'frontend',
    labelVi: 'Frontend & Giao diện',
    labelEn: 'Frontend & UI',
    summary: 'TypeScript, React, HTML5, CSS3, Tailwind CSS, Bootstrap',
    items: [
      { id: 'ts', name: 'TypeScript', Icon: SiTypescript, brandColor: '#3178C6' },
      { id: 'react', name: 'React', Icon: SiReact, brandColor: '#087EA4' },
      { id: 'html5', name: 'HTML5', Icon: SiHtml5, brandColor: '#E34F26' },
      { id: 'css3', name: 'CSS3', Icon: SiCss, brandColor: '#1572B6' },
      { id: 'tailwind', name: 'Tailwind CSS', Icon: SiTailwindcss, brandColor: '#06B6D4' },
      { id: 'bootstrap', name: 'Bootstrap', Icon: SiBootstrap, brandColor: '#7952B3' },
    ],
  },
  {
    id: 'database',
    labelVi: 'Cơ sở dữ liệu & Dịch vụ',
    labelEn: 'Database & Backend Services',
    summary: 'MongoDB, PostgreSQL, Supabase, Firebase, Redis',
    items: [
      { id: 'mongodb', name: 'MongoDB', Icon: SiMongodb, brandColor: '#47A248' },
      { id: 'postgres', name: 'PostgreSQL', Icon: SiPostgresql, brandColor: '#336791' },
      { id: 'supabase', name: 'Supabase', Icon: SiSupabase, brandColor: '#3ECF8E' },
      { id: 'firebase', name: 'Firebase', Icon: SiFirebase, brandColor: '#FFA000' },
      { id: 'redis', name: 'Redis', Icon: SiRedis, brandColor: '#DC382D' },
    ],
  },
  {
    id: 'api',
    labelVi: 'Tài liệu API & Kiểm thử',
    labelEn: 'API Documentation & Testing',
    summary: 'Swagger, OpenAPI, Postman',
    items: [
      { id: 'swagger', name: 'Swagger', Icon: SiSwagger, brandColor: '#67B924' },
      { id: 'openapi', name: 'OpenAPI', Icon: SiOpenapiinitiative, brandColor: '#6BA539' },
      { id: 'postman', name: 'Postman', Icon: SiPostman, brandColor: '#FF6C37' },
    ],
  },
  {
    id: 'tools',
    labelVi: 'Công cụ & Quy trình',
    labelEn: 'Tools & Workflow',
    summary: 'Docker, Git, GitHub, Visual Studio Code, Electron',
    items: [
      { id: 'docker', name: 'Docker', Icon: SiDocker, brandColor: '#2496ED' },
      { id: 'git', name: 'Git', Icon: SiGit, brandColor: '#F05032' },
      { id: 'github', name: 'GitHub', Icon: SiGithub, brandColor: '#24292E' },
      { id: 'vscode', name: 'Visual Studio Code', Icon: VscVscode, brandColor: '#007ACC' },
      { id: 'electron', name: 'Electron', Icon: SiElectron, brandColor: '#2F8A9C' },
    ],
  },
];
