'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';
import dynamic from 'next/dynamic';
import { 
  FileCode2, 
  Paintbrush, 
  FileJson, 
  FileText, 
  Code2, 
  Box, 
  Wind, 
  Hexagon, 
  Server, 
  Database, 
  Layers, 
  GitBranch, 
  GitCommit, 
  PenTool 
} from 'lucide-react';

// Dynamically load the PlanetScene component so it only runs on the client
// and doesn't break SSR since it uses canvas and external assets.
const PlanetScene = dynamic(() => import('./PlanetScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  ),
});

const SKILLS = [
  { name: 'HTML', level: 'Expert', progress: 95, icon: <FileCode2 size={20} className="text-orange-400" /> },
  { name: 'CSS', level: 'Expert', progress: 95, icon: <Paintbrush size={20} className="text-blue-400" /> },
  { name: 'JavaScript', level: 'Expert', progress: 90, icon: <FileJson size={20} className="text-yellow-400" /> },
  { name: 'TypeScript', level: 'Advanced', progress: 85, icon: <FileText size={20} className="text-blue-500" /> },
  { name: 'React', level: 'Expert', progress: 95, icon: <Code2 size={20} className="text-cyan-400" /> },
  { name: 'Next.js', level: 'Expert', progress: 90, icon: <Box size={20} className="text-white" /> },
  { name: 'Tailwind CSS', level: 'Expert', progress: 95, icon: <Wind size={20} className="text-teal-400" /> },
  { name: 'Node.js', level: 'Advanced', progress: 80, icon: <Hexagon size={20} className="text-green-500" /> },
  { name: 'Express.js', level: 'Advanced', progress: 80, icon: <Server size={20} className="text-slate-300" /> },
  { name: 'MongoDB', level: 'Advanced', progress: 85, icon: <Database size={20} className="text-green-400" /> },
  { name: 'Prisma', level: 'Advanced', progress: 80, icon: <Layers size={20} className="text-indigo-400" /> },
  { name: 'Git', level: 'Advanced', progress: 90, icon: <GitBranch size={20} className="text-orange-500" /> },
  { name: 'GitHub', level: 'Advanced', progress: 90, icon: <GitCommit size={20} className="text-white" /> },
  { name: 'Figma', level: 'Advanced', progress: 85, icon: <PenTool size={20} className="text-pink-400" /> },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-4 sm:px-6 relative z-10 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Content & Skills Grid */}
        <motion.div
          className="flex flex-col space-y-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header Section */}
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                 <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
                   My Skills
                 </span>
              </div>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight">
              Technologies That <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Power My Work
              </span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-xl font-light leading-relaxed">
              I am passionate about building modern, scalable, and high-performance web applications. My expertise spans the entire stack, allowing me to craft seamless digital experiences from intuitive user interfaces to robust backend architectures.
            </motion.p>
          </div>

          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            variants={containerVariants}
          >
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative p-4 rounded-2xl bg-[#0F172A]/40 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-[#0F172A]/60 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 cursor-default"
              >
                {/* Glass Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {skill.level}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-400/80 group-hover:text-blue-400 transition-colors">
                    {skill.progress}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 + (idx * 0.05), ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right Side: 3D Planet */}
        <motion.div 
          className="relative h-[400px] md:h-[600px] lg:h-[800px] w-full flex items-center justify-center lg:sticky lg:top-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Subtle glow behind the planet */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <PlanetScene />
        </motion.div>
        
      </div>
    </section>
  );
}
