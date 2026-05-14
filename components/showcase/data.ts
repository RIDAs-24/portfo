import {
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tech: string[];
  gradient: string;
  icon: LucideIcon;
  category: string;
  year: string;
  status: 'Live' | 'In Progress';
  link?: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 2,
    title: 'E-Commerce Platform',
    description:
      'A highly polished, premium e-commerce application with a modern glassmorphism aesthetic.',
    longDescription:
      'A robust Next.js 16 e-commerce platform built for high performance and exceptional user experience. It features seamless external navigation, responsive design with soft shadows, and properly optimized images to avoid hydration issues.',
    highlights: [
      'Next.js 16 App Router architecture',
      'Glassmorphism UI with soft shadows',
      'Optimized image loading & hydration',
      'Responsive design and smooth animations',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    gradient: 'from-emerald-500/30 to-teal-500/30',
    icon: ShoppingCart,
    category: 'Full-Stack',
    year: '2026',
    status: 'Live',
    link: 'https://ecom-omega-black.vercel.app',
    github: 'https://github.com',
  },
  {
    id: 3,
    title: 'SaaS Admin Dashboard',
    description:
      'Enterprise-level standalone SaaS Admin Dashboard with data-rich interfaces.',
    longDescription:
      'A production-grade, fully responsive administrative dashboard. Implements a modular component architecture, global state management via Context API for themes, and features premium micro-interactions alongside interactive Recharts analytical data.',
    highlights: [
      'Interactive analytical Recharts',
      'Global state management (Context)',
      'Data-rich user management interface',
      'Smooth Framer Motion transitions',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    gradient: 'from-violet-500/30 to-purple-500/30',
    icon: LayoutDashboard,
    category: 'Full-Stack',
    year: '2026',
    status: 'Live',
    link: 'https://dashboard-beige-one-82.vercel.app',
    github: 'https://github.com',
  },
  {
    id: 4,
    title: 'AI Prompt Studio',
    description:
      'Placeholder for a future project focused on AI prompt engineering and generative content.',
    longDescription:
      'An upcoming application designed to streamline the creation, testing, and management of AI prompts for LLMs. Will feature a playground interface, version control for prompts, and integration with popular AI APIs.',
    highlights: [
      'Interactive prompt playground',
      'Integration with OpenAI API',
      'Prompt versioning and history',
      'Collaborative workspaces',
    ],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-fuchsia-500/30 to-rose-500/30',
    icon: Sparkles,
    category: 'Frontend',
    year: '2026',
    status: 'In Progress',
    github: 'https://github.com',
  },
];

export const ALL_TECHS = [
  'All',
  ...Array.from(new Set(PROJECTS.flatMap((p) => p.tech))),
];

export const RADAR_DATA = [
  { subject: 'React', value: 95 },
  { subject: 'Next.js', value: 90 },
  { subject: 'TypeScript', value: 88 },
  { subject: 'Node.js', value: 80 },
  { subject: 'UI/UX', value: 85 },
  { subject: 'DevOps', value: 70 },
];

export const ACTIVITY_DATA = [
  { day: 'Mon', hours: 6 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 9 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 3 },
];
