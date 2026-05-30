'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/animations';
import { LayoutTemplate, ServerCog, Braces, Blocks } from 'lucide-react';

const skillsData = {
  frontend: {
    icon: LayoutTemplate,
    title: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS'],
    color: 'from-cyan-400 to-blue-500',
    iconColor: 'text-cyan-400',
    glowColor: 'bg-cyan-500',
    borderColor: 'group-hover:border-cyan-500/80',
    shadowColor: 'group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]'
  },
  backend: {
    icon: ServerCog,
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
    color: 'from-emerald-400 to-green-500',
    iconColor: 'text-emerald-400',
    glowColor: 'bg-emerald-500',
    borderColor: 'group-hover:border-emerald-500/80',
    shadowColor: 'group-hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]'
  },
  languages: {
    icon: Braces,
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'SQL', 'Python'],
    color: 'from-purple-400 to-violet-500',
    iconColor: 'text-purple-400',
    glowColor: 'bg-purple-500',
    borderColor: 'group-hover:border-purple-500/80',
    shadowColor: 'group-hover:shadow-[0_0_50px_rgba(168,85,247,0.4)]'
  },
  tools: {
    icon: Blocks,
    title: 'Tools',
    skills: ['Git & GitHub', 'VS Code', 'Figma', 'Docker'],
    color: 'from-amber-400 to-orange-500',
    iconColor: 'text-orange-500',
    glowColor: 'bg-orange-500',
    borderColor: 'group-hover:border-orange-500/80',
    shadowColor: 'group-hover:shadow-[0_0_50px_rgba(249,115,22,0.4)]'
  }
};

interface SkillCardProps {
  data: typeof skillsData.frontend;
}

// React.memo: prevents re-render when parent re-renders (no props change)
const SkillCard = memo(function SkillCard({ data }: SkillCardProps) {
  const Icon = data.icon;
  
  return (
    <motion.div
      className={`glass-card p-10 rounded-3xl group relative overflow-hidden transition-all duration-500 border border-white/5 bg-[#0a0a14]/60 backdrop-blur-md cursor-pointer hover:bg-[#10101a]/80 ${data.borderColor} ${data.shadowColor}`}
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated Background Glow — CSS transition, no RAF */}
      <div className={`absolute -inset-0.5 ${data.glowColor} blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500`} />
      
      {/* Inner Gradient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Removed: 5× motion.div floating particles per card (25 total Infinity animations)
          These animated even when the card was off-screen or not hovered. 
          Replaced with pure CSS hover effects for the same visual premium feel. */}
      
      <div className="relative z-10 flex flex-col h-full">
        <motion.div
          className="mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
          whileHover={{ rotate: 6, scale: 1.12 }}
        >
          {/* Icon background glow */}
          <div className={`absolute inset-0 ${data.glowColor} opacity-0 group-hover:opacity-35 blur-md transition-opacity duration-300`} />
          <Icon className={`w-10 h-10 ${data.iconColor} relative z-10`} />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">
          {data.title}
        </h3>
        
        <ul className="space-y-3">
          {data.skills.map((skill) => (
            <li
              key={skill}
              className="text-slate-400 flex items-center gap-3"
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${data.color} shadow-[0_0_8px_rgba(255,255,255,0.5)] flex-shrink-0`} />
              <span className="group-hover:text-white transition-colors duration-300">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative z-10 overflow-hidden section-optimized">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-20" variants={scrollRevealVariants}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit that enables me to build robust, scalable, and visually stunning digital products.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
          {Object.entries(skillsData).map(([key, data]) => (
            <SkillCard key={key} data={data} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
