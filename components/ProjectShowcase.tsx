'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  MessageSquare,
  ShoppingCart,
  BarChart3,
  Globe,
  Layers,
  LucideIcon,
} from 'lucide-react';
import { containerVariants, scrollRevealVariants } from '@/lib/animations';
import ProjectCard from './ProjectCard';
import LivePreviewModal from './LivePreviewModal';
import SkillsChart from './SkillsChart';

// ─── Types ──────────────────────────────────────────────────────────────────
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
  team: string;
  status: 'Live' | 'In Progress';
  link?: string;
  github?: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Admin Dashboard',
    description: 'Modern analytics dashboard with real-time charts, user management, and dark/light mode.',
    longDescription:
      'A fully-featured admin dashboard built with Next.js App Router and Recharts. It features real-time data visualisation, role-based access control, a responsive bento-grid layout, and an optimistic UI for instant feedback on CRUD actions.',
    highlights: [
      'Real-time Recharts data visualisation',
      'Role-based access control (RBAC)',
      'Optimistic UI updates with React 19',
      'Full dark / light theme system',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    gradient: 'from-purple-500/30 to-pink-500/30',
    icon: BarChart3,
    category: 'Full-Stack',
    year: '2024',
    team: 'Solo',
    status: 'Live',
    github: 'https://github.com',
  },
  {
    id: 2,
    title: 'Real-Time Chat App',
    description: 'WebSocket-powered live messaging with typing indicators, online presence, and emoji reactions.',
    longDescription:
      'Built with Node.js + Socket.io on the backend and React on the frontend, this chat app delivers sub-100ms message delivery, persistent chat history via MongoDB, and a beautiful, mobile-first UI.',
    highlights: [
      'Sub-100ms WebSocket messaging',
      'Typing indicators & online presence',
      'Persistent history with MongoDB',
      'Mobile-first responsive design',
    ],
    tech: ['Node.js', 'Socket.io', 'React', 'MongoDB', 'Express'],
    gradient: 'from-emerald-500/30 to-teal-500/30',
    icon: MessageSquare,
    category: 'Full-Stack',
    year: '2024',
    team: 'Solo',
    status: 'Live',
    github: 'https://github.com',
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-stack shop with cart, Stripe payments, and an admin panel for inventory management.',
    longDescription:
      'A production-grade e-commerce site with a Next.js storefront, Stripe Checkout integration, Prisma ORM for the database layer, and a custom admin panel for managing products, orders, and customers.',
    highlights: [
      'Stripe Checkout & webhooks',
      'Prisma ORM + PostgreSQL',
      'Next.js Server Actions for cart',
      'Admin panel for inventory & orders',
    ],
    tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL', 'TypeScript'],
    gradient: 'from-orange-500/30 to-red-500/30',
    icon: ShoppingCart,
    category: 'Full-Stack',
    year: '2025',
    team: 'Solo',
    status: 'Live',
    link: 'https://your-ecommerce.vercel.app',
    github: 'https://github.com',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Award-winning personal portfolio with Framer Motion animations and a Bento Grid layout.',
    longDescription:
      'The very site you are on — built with Next.js App Router, Tailwind CSS v4, and Framer Motion. It features a cinematic hero, animated skill charts, and a bento-grid project showcase that demonstrates advanced React state management.',
    highlights: [
      'Bento-grid Framer Motion layout',
      'AnimatePresence modal system',
      'Custom useMousePosition hook',
      'Recharts skill analytics panel',
    ],
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Recharts'],
    gradient: 'from-sky-500/30 to-indigo-500/30',
    icon: Globe,
    category: 'Frontend',
    year: '2025',
    team: 'Solo',
    status: 'Live',
  },
  {
    id: 5,
    title: 'Component Library',
    description: 'A shareable UI kit of 40+ accessible, animated components with Storybook docs.',
    longDescription:
      'An open-source React component library built on Radix UI primitives and styled with Tailwind CSS. Every component is WCAG 2.1 AA accessible, has a Storybook story, and ships with TypeScript generics for full type safety.',
    highlights: [
      '40+ accessible Radix UI primitives',
      'Full Storybook documentation',
      'TypeScript generics throughout',
      'Automated visual regression tests',
    ],
    tech: ['React', 'Radix UI', 'Tailwind CSS', 'Storybook', 'TypeScript'],
    gradient: 'from-fuchsia-500/30 to-purple-500/30',
    icon: Layers,
    category: 'Library',
    year: '2025',
    team: 'Open Source',
    status: 'In Progress',
    github: 'https://github.com',
  },
  {
    id: 6,
    title: 'SaaS Starter Kit',
    description: 'Production-ready Next.js boilerplate with auth, billing, teams, and a landing page.',
    longDescription:
      'A complete SaaS foundation that ships with Next-Auth v5, Stripe subscriptions, team workspaces, an onboarding flow, and a polished marketing landing page — so you can launch in days, not months.',
    highlights: [
      'Next-Auth v5 with OAuth & magic link',
      'Stripe subscriptions & billing portal',
      'Team workspaces & invitations',
      'Transactional email via Resend',
    ],
    tech: ['Next.js', 'Next-Auth', 'Stripe', 'Prisma', 'Resend'],
    gradient: 'from-rose-500/30 to-pink-500/30',
    icon: LayoutGrid,
    category: 'Full-Stack',
    year: '2025',
    team: 'Solo',
    status: 'In Progress',
    github: 'https://github.com',
  },
];

// All unique tech tags across projects
const ALL_TAGS = ['All', ...Array.from(new Set(PROJECTS.flatMap((p) => p.tech)))];

// ─── Component ───────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  // Active tech filter — drives useMemo re-computation
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Selected project for the Live Preview modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /**
   * useMemo: only re-runs the filter when activeFilter changes.
   * This is the "React State Management" showcase moment — the grid
   * re-animates via AnimatePresence every time filtered list changes.
   */
  const filteredProjects = useMemo<Project[]>(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="showcase" className="py-32 px-6 relative z-10">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* ── Section header ── */}
        <motion.div className="text-center mb-16" variants={scrollRevealVariants}>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4">
            Interactive Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Selected{' '}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Each project is a live example of advanced React patterns — click any card to open the live preview.
          </p>
        </motion.div>

        {/* ── Tech Stack Filter Bar ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-14"
          variants={scrollRevealVariants}
        >
          {ALL_TAGS.map((tag) => (
            <motion.button
              key={tag}
              id={`filter-${tag.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeFilter === tag
                  ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Bento Grid + Chart ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project cards — AnimatePresence for smooth mount/unmount */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeFilter}
                className="grid sm:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProjects.length === 0 ? (
                  <motion.div
                    key="empty"
                    className="sm:col-span-2 flex flex-col items-center justify-center py-20 text-slate-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Layers className="w-10 h-10 mb-3 opacity-40" />
                    <p className="text-sm">No projects match this filter.</p>
                  </motion.div>
                ) : (
                  filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpen={setSelectedProject}
                    />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Analytics sidebar — sticky on large screens */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <SkillsChart />

              {/* Live stat card */}
              <motion.div
                className="glass-card rounded-2xl p-6 border border-white/10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  At a Glance
                </h4>
                {[
                  { label: 'Total Projects', value: PROJECTS.length },
                  { label: 'Live in Production', value: PROJECTS.filter((p) => p.status === 'Live').length },
                  { label: 'Unique Technologies', value: new Set(PROJECTS.flatMap((p) => p.tech)).size },
                  { label: 'Years of Experience', value: '3+' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{label}</span>
                    <span className="text-sm font-bold text-white">{value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Live Preview Modal — managed by React useState ── */}
      <LivePreviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
