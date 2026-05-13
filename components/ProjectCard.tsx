'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Calendar, Users, Zap } from 'lucide-react';
import type { Project } from './ProjectShowcase';

interface Props {
  project: Project;
  onOpen: (p: Project) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Raw mouse motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smooth tilt transforms — this is the useMousePosition equivalent
  // implemented inline via Framer Motion's motion values + springs
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ perspective: 1200, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
    >
      {/* Animated gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Glass surface */}
      <div className="relative glass-card p-6 h-full flex flex-col gap-4 border border-white/10 min-h-[320px]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} border border-white/20`}
          >
            <project.icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300">
            {project.category}
          </span>
        </div>

        {/* Title & description */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.year}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {project.team}
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {project.status}
          </span>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded-full text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-white/10 flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Preview
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
