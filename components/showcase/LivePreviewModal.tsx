'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, GitBranch, CheckCircle2 } from 'lucide-react';
import type { Project } from './data';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function LivePreviewModal({ project, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    // AnimatePresence handles smooth mount/unmount
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="panel"
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl
                glass-card border border-white/10 shadow-2xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 16 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              {/* Banner */}
              <div className={`relative h-36 rounded-t-3xl bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                    <project.icon className="w-9 h-9 text-white" />
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-7 space-y-5">
                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    <span className="text-xs text-slate-400 mt-0.5 block">{project.year} · {project.category}</span>
                  </div>
                  <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${
                    project.status === 'Live'
                      ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                      : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{project.longDescription}</p>

                {/* Highlights */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white mb-3">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs bg-indigo-500/10 border border-indigo-400/20 rounded-full text-indigo-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  ) : (
                    <span className="flex-1 flex items-center justify-center py-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-500 text-sm">
                      No live link yet
                    </span>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                    >
                      <GitBranch className="w-4 h-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
