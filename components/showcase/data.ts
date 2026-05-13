import {
  Globe,
  MessageSquare,
  Layers,
  BookOpen,
  Cpu,
  LayoutTemplate,
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
    id: 1,
    title: 'Portfolio Website',
    description:
      'This very site — built with Next.js App Router, Framer Motion, and a Bento Grid layout.',
    longDescription:
      'A premium developer portfolio featuring cinematic hero animations, a filterable project showcase, custom React hooks for parallax effects, and a Recharts analytics sidebar. Deployed on Vercel with 100 Lighthouse scores.',
    highlights: [
      'Framer Motion AnimatePresence transitions',
      'Custom useMousePosition parallax hook',
      'Recharts skill proficiency radar',
      'Bento Grid layout with glassmorphism',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-sky-500/30 to-indigo-500/30',
    icon: Globe,
    category: 'Frontend',
    year: '2025',
    status: 'Live',
    github: 'https://github.com',
  },
  {
    id: 2,
    title: 'Real-Time Chat',
    description:
      'WebSocket-powered chat with typing indicators, presence, and emoji reactions.',
    longDescription:
      'Full-stack messaging app using Socket.io for sub-100ms delivery, MongoDB for history, and a React frontend with optimistic UI. Supports rooms, @mentions, file sharing, and read receipts.',
    highlights: [
      'Sub-100ms Socket.io messaging',
      'Typing indicators & online presence',
      'Persistent history with MongoDB',
      'File sharing with Cloudinary',
    ],
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    gradient: 'from-emerald-500/30 to-teal-500/30',
    icon: MessageSquare,
    category: 'Full-Stack',
    year: '2024',
    status: 'Live',
    github: 'https://github.com',
  },
  {
    id: 3,
    title: 'Task Manager',
    description:
      'Kanban-style project board with drag-and-drop, labels, and team collaboration.',
    longDescription:
      'A Notion-inspired task manager with a Next.js App Router frontend, Prisma + PostgreSQL backend, and real-time updates. Features drag-and-drop via dnd-kit, subtasks, due dates, and email notifications.',
    highlights: [
      'Drag-and-drop via dnd-kit',
      'Real-time collaboration with Pusher',
      'Prisma ORM + PostgreSQL',
      'Next.js Server Actions for mutations',
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
    gradient: 'from-violet-500/30 to-purple-500/30',
    icon: LayoutTemplate,
    category: 'Full-Stack',
    year: '2024',
    status: 'Live',
    github: 'https://github.com',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description:
      'Location-aware weather app with 7-day forecast and animated condition icons.',
    longDescription:
      'Consumes the OpenWeatherMap API with SWR for smart caching and revalidation. Features geolocation, unit switching, an hourly chart with Recharts, and smooth CSS transitions for weather condition backgrounds.',
    highlights: [
      'Geolocation + OpenWeatherMap API',
      'SWR for data fetching & caching',
      'Recharts hourly forecast chart',
      'Animated weather condition themes',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    gradient: 'from-cyan-500/30 to-blue-500/30',
    icon: Cpu,
    category: 'Frontend',
    year: '2024',
    status: 'Live',
    github: 'https://github.com',
  },
  {
    id: 5,
    title: 'MDX Blog Platform',
    description:
      'Content-driven blog with MDX, syntax highlighting, and a full-text search.',
    longDescription:
      'A developer blog built on Next.js with MDX for rich content, Contentlayer for type-safe frontmatter, and Algolia for full-text search. Includes a reading-time estimate, table of contents, and social share buttons.',
    highlights: [
      'MDX + Contentlayer type-safe posts',
      'Algolia full-text search',
      'Shiki syntax highlighting',
      'Auto-generated open-graph images',
    ],
    tech: ['Next.js', 'MDX', 'TypeScript', 'Tailwind CSS'],
    gradient: 'from-orange-500/30 to-amber-500/30',
    icon: BookOpen,
    category: 'Frontend',
    year: '2025',
    status: 'In Progress',
    github: 'https://github.com',
  },
  {
    id: 6,
    title: 'UI Component Library',
    description:
      '40+ accessible, animated components built on Radix UI with full Storybook docs.',
    longDescription:
      'An open-source React component library combining Radix UI primitives with Tailwind CSS styling. Every component ships with TypeScript generics, WCAG 2.1 AA accessibility, Framer Motion variants, and Storybook stories.',
    highlights: [
      '40+ Radix UI accessible primitives',
      'Framer Motion animation variants',
      'Full Storybook documentation',
      'Automated visual regression tests',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-fuchsia-500/30 to-rose-500/30',
    icon: Layers,
    category: 'Library',
    year: '2025',
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
