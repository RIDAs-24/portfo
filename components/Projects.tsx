'use client';

import { motion } from 'framer-motion';
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/animations';
import { ExternalLink, Code2 } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  gradient: string;
  link?: string;
}

const projectsData: Project[] = [
  {
    title: 'Admin Dashboard',
    description: 'A modern analytics dashboard for managing users and system data with intuitive controls and real-time chart updates.',
    highlights: ['Data visualization', 'User management', 'Clean UI'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'Real-Time Chat App',
    description: 'A live messaging application with real-time communication, typing indicators, and a user-friendly interface.',
    highlights: ['Instant messaging', 'Online status', 'Simple UX design'],
    tech: ['Node.js', 'Socket.io', 'React', 'Express'],
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing skills, projects, and contact information with an award-winning modern design.',
    highlights: ['Responsive design', 'Cinematic animations', 'Glassmorphism'],
    tech: ['React', 'Next.js', 'Framer Motion', 'Tailwind'],
    gradient: 'from-orange-500/20 to-red-500/20'
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden glass-card h-full flex flex-col"
      variants={itemVariants}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Absolute Link Overlay for the whole card */}
      {project.link && (
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`View ${project.title}`}
        />
      )}

      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Project Image Placeholder */}
      <div className="relative h-64 overflow-hidden bg-black/40 border-b border-white/10">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-6xl tracking-widest uppercase mix-blend-overlay"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          Project {index + 1}
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="relative p-8 space-y-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-slate-300">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links - Higher z-index to stay interactive */}
        <div className="flex gap-4 pt-4 border-t border-white/10 relative z-20">
          {project.link ? (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 py-3 bg-white text-black rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          ) : (
            <button className="flex flex-1 items-center justify-center gap-2 py-3 bg-white text-black rounded-xl font-semibold hover:bg-slate-200 transition-colors">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </button>
          )}
          <button className="flex flex-1 items-center justify-center gap-2 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-colors">
            <Code2 className="w-4 h-4" /> Source
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative z-10">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-20" variants={scrollRevealVariants}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A showcase of my most recent and impactful projects. Each piece demonstrates my approach to solving complex problems with elegant code and beautiful design.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8 lg:gap-12" variants={containerVariants}>
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
