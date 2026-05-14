'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Layers } from 'lucide-react';
import { PROJECTS, ALL_TECHS, type Project } from './data';
import ProjectCard from './ProjectCard';
import LivePreviewModal from './LivePreviewModal';
import SkillsChart from './SkillsChart';

// Reusable animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function ProjectShowcase() {
  // ── State ─────────────────────────────────────────────────────────────
  // Active tech filter tag (useState)
  const [activeFilter, setActiveFilter] = useState<string>('All');
  // Currently open project for the modal (useState)
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // ── Derived data ──────────────────────────────────────────────────────
  // useMemo: re-filters only when activeFilter changes — avoids redundant work
  const filtered = useMemo<Project[]>(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="showcase"
      aria-label="Project Showcase"
      className="py-28 px-6 relative z-10"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-3">
            Interactive Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Selected{' '}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            Click any card to open a live preview. Use the filter to explore
            by technology.
          </p>
        </motion.div>

        {/* ── Tech Filter Bar ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {ALL_TECHS.map((tag) => (
            <motion.button
              key={tag}
              id={`filter-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setActiveFilter(tag)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeFilter === tag
                  ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Left — project cards (2/3 width) */}
          <div className="lg:col-span-2">
            {/* AnimatePresence: smooth re-render when filter changes */}
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  className="flex flex-col items-center justify-center py-24 text-slate-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Layers className="w-8 h-8 mb-3 opacity-40" />
                  <p className="text-sm">No projects match this filter.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeFilter}
                  className="grid sm:grid-cols-2 gap-5"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {filtered.map((p) => (
                    <ProjectCard key={p.id} project={p} onOpen={setActiveProject} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — sticky analytics sidebar (1/3 width) */}
          <div className="lg:col-span-1 flex flex-col gap-5 lg:sticky lg:top-24">
            <SkillsChart />

            {/* Stats card */}
            <motion.div
              variants={fadeUp}
              className="glass-card rounded-2xl border border-white/10 p-5 space-y-3"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white">
                At a Glance
              </p>
              {[
                { label: 'Total Projects', value: PROJECTS.length },
                {
                  label: 'Live in Production',
                  value: PROJECTS.filter((p) => p.status === 'Live').length,
                },
                {
                  label: 'Technologies Used',
                  value: new Set(PROJECTS.flatMap((p) => p.tech)).size,
                },
                { label: 'Currently Showing', value: filtered.length },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-sm font-bold text-white">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Modal — controlled by React useState ── */}
      <LivePreviewModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
