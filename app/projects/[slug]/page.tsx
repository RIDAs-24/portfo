'use client';

import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Calendar,
  Zap,
  Tag,
} from 'lucide-react';
import { PROJECTS } from '@/components/showcase/data';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen py-12 px-6 relative z-10">
      {/* Fixed background blobs — match portfolio aesthetic */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-[120px]`}
        />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/10 opacity-10 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* ── Back Button ── */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Back to Projects
          </Link>
        </motion.div>

        {/* ── Hero Banner ── */}
        <motion.div
          {...fadeUp(0.08)}
          className={`relative rounded-3xl overflow-hidden h-56 md:h-72 mb-8 bg-gradient-to-br ${project.gradient}`}
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <project.icon className="w-14 h-14 text-white" />
            </div>
          </div>
          {/* Status badge */}
          <div className="absolute top-5 right-5">
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                project.status === 'Live'
                  ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                  : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
              }`}
            >
              {project.status}
            </span>
          </div>
        </motion.div>

        {/* ── Title + Meta ── */}
        <motion.div {...fadeUp(0.16)} className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
              {project.category}
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" /> {project.year}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Zap className="w-3 h-3" /> {project.status}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
            {project.longDescription}
          </p>
        </motion.div>

        {/* ── Main Content Grid ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left — Features & Description */}
          <div className="md:col-span-2 space-y-6">
            {/* Key Features */}
            <motion.div
              {...fadeUp(0.24)}
              className="glass-card rounded-2xl border border-white/10 p-6 space-y-4"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white">
                Key Features
              </p>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.32)}
              className="flex flex-col sm:flex-row gap-3"
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              ) : (
                <span className="flex-1 flex items-center justify-center py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-500 text-sm">
                  No live link yet
                </span>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  <GitBranch className="w-4 h-4" /> Source Code
                </a>
              )}
            </motion.div>
          </div>

          {/* Right — Tech Stack Sidebar */}
          <div className="space-y-6">
            <motion.div
              {...fadeUp(0.28)}
              className="glass-card rounded-2xl border border-white/10 p-6 space-y-4"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-indigo-400" /> Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-medium bg-indigo-500/10 border border-indigo-400/20 rounded-full text-indigo-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              {...fadeUp(0.36)}
              className="glass-card rounded-2xl border border-white/10 p-6 space-y-3"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white">
                Project Info
              </p>
              {[
                { label: 'Category', value: project.category },
                { label: 'Year', value: project.year },
                { label: 'Status', value: project.status },
                { label: 'Technologies', value: `${project.tech.length} used` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-xs font-semibold text-white">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Back Button ── */}
        <motion.div {...fadeUp(0.44)} className="mt-12 flex justify-center">
          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
