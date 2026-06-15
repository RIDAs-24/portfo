import {
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Sparkles,
  Film,
  Leaf,
  LucideIcon,
} from 'lucide-react';

export interface Project {
  id: number;
  slug: string;
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
    slug: 'e-commerce-platform',
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
    slug: 'saas-admin-dashboard',
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
    slug: 'eco-platform',
    title: 'Eco Platform',
    description:
      'A modern SaaS platform for sustainability tracking and eco-friendly insights.',
    longDescription:
      'Eco is a production-ready SaaS application designed to help businesses track, analyze, and optimize their environmental impact. Featuring a clean, minimalist UI inspired by Stripe and Vercel, it offers real-time analytics dashboards, sustainability scoring, and actionable insights to drive eco-friendly decisions.',
    highlights: [
      'Real-time sustainability analytics dashboard',
      'Carbon footprint tracking and reporting',
      'Minimalist, performance-first UI',
      'Interactive data visualization with Recharts',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-emerald-500/30 to-green-500/30',
    icon: Leaf,
    category: 'Full-Stack',
    year: '2026',
    status: 'Live',
    link: 'https://eco-blush-ten.vercel.app',
    github: 'https://github.com',
  },
  {
    id: 5,
    slug: 'movie-discovery-app',
    title: 'Movie Discovery App',
    description:
      'A cinematic movie discovery platform powered by TMDB API with rich analytics and a premium dark UI.',
    longDescription:
      'A full-featured movie discovery application built with Next.js and the TMDB API. Features include detailed movie pages with trailers, box office analytics, genre market share charts, ratings, and smooth Framer Motion transitions throughout a premium dark glassmorphism interface.',
    highlights: [
      'TMDB API integration for live movie data',
      'Box Office & Genre analytics with Recharts',
      'Movie trailers via YouTube embed',
      'Smooth Framer Motion page transitions',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'TMDB API'],
    gradient: 'from-rose-500/30 to-orange-500/30',
    icon: Film,
    category: 'Full-Stack',
    year: '2026',
    status: 'Live',
    link: 'https://movie-discovery-app-lake.vercel.app',
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
