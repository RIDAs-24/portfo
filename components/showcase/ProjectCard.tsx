'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ExternalLink, Github, Calendar, Users, Zap } from 'lucide-react';
import type { Project } from './data';

interface Props {
  project: Project;
  onOpen: (p: Project) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for real-time cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smooth 3D tilt — driven by useMousePosition pattern
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 24,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ perspective: 1200, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      onClick={() => onOpen(project)}
    >
      {/* Gradient glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50
          group-hover:opacity-90 transition-opacity duration-500`}
      />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Card body */}
      <div className="relative glass-card border border-white/10 p-6 flex flex-col gap-4 h-full min-h-[300px]">

        {/* Icon + Category */}
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} border border-white/20`}>
            <project.icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-300">
            {project.category}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.year}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.category}</span>
          <span className={`flex items-center gap-1 font-semibold ${project.status === 'Live' ? 'text-emerald-400' : 'text-amber-400'}`}>
            <Zap className="w-3 h-3" />{project.status}
          </span>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[11px] bg-white/5 border border-white/10 rounded-full text-slate-300">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-white/10">
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Preview
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
