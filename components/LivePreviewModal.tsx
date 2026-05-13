'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from './ProjectShowcase';

interface Props {
  project: Project | null;
  onClose: () => void;
}

/**
 * LivePreviewModal
 * Uses AnimatePresence so the modal mounts/unmounts with a cinematic spring animation.
 * The open/close state is managed entirely by the parent via React useState.
 */
export default function LivePreviewModal({ project, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-white/10 shadow-2xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {/* Gradient header banner */}
              <div
                className={`relative h-40 rounded-t-3xl bg-gradient-to-br ${project.gradient} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`p-5 rounded-2xl bg-white/10 border border-white/20`}>
                    <project.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 mt-2 inline-block">
                      {project.category}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      project.status === 'Live'
                        ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                        : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">{project.longDescription}</p>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-widest">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-widest">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs bg-indigo-500/10 border border-indigo-400/20 rounded-full text-indigo-300 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-3 pt-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-slate-200 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
