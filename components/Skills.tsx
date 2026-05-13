'use client';

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
    borderColor: 'group-hover:border-cyan-500/50',
    shadowColor: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'
  },
  backend: {
    icon: ServerCog,
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
    color: 'from-emerald-400 to-green-500',
    iconColor: 'text-emerald-400',
    glowColor: 'bg-emerald-500',
    borderColor: 'group-hover:border-emerald-500/50',
    shadowColor: 'group-hover:shadow-[0_0_30px_rgba(10,185,129,0.3)]'
  },
  languages: {
    icon: Braces,
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'SQL', 'Python'],
    color: 'from-purple-400 to-violet-500',
    iconColor: 'text-purple-400',
    glowColor: 'bg-purple-500',
    borderColor: 'group-hover:border-purple-500/50',
    shadowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
  },
  tools: {
    icon: Blocks,
    title: 'Tools',
    skills: ['Git & GitHub', 'VS Code', 'Figma', 'Docker'],
    color: 'from-amber-400 to-orange-500',
    iconColor: 'text-amber-400',
    glowColor: 'bg-orange-500',
    borderColor: 'group-hover:border-orange-500/50',
    shadowColor: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]'
  }
};

interface SkillCardProps {
  data: typeof skillsData.frontend;
}

function SkillCard({ data }: SkillCardProps) {
  const Icon = data.icon;
  
  return (
    <motion.div
      className={`bg-[#050510]/40 backdrop-blur-2xl border border-white/5 p-8 rounded-2xl group relative overflow-hidden transition-all duration-500 ${data.borderColor} ${data.shadowColor}`}
      variants={itemVariants}
      whileHover={{ y: -8 }}
    >
      {/* Animated Background Glow */}
      <div className={`absolute -inset-0.5 ${data.glowColor} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Inner Gradient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {[
          { x: "20%", y: "30%", dur: 2.5, delay: 0.2, op: 0.4, yMove: -30, xMove: 15 },
          { x: "80%", y: "60%", dur: 3.2, delay: 0.8, op: 0.6, yMove: -45, xMove: -20 },
          { x: "40%", y: "80%", dur: 2.8, delay: 1.5, op: 0.3, yMove: -25, xMove: 10 },
          { x: "70%", y: "20%", dur: 3.5, delay: 0.5, op: 0.5, yMove: -50, xMove: -15 },
          { x: "10%", y: "70%", dur: 2.2, delay: 1.1, op: 0.7, yMove: -35, xMove: 25 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${data.glowColor}`}
            initial={{ 
              x: p.x, 
              y: p.y,
              opacity: p.op 
            }}
            animate={{ 
              y: [null, p.yMove],
              x: [null, p.xMove],
              opacity: [null, 0] 
            }}
            transition={{ 
              duration: p.dur, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay 
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <motion.div
          className={`mb-6 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300 relative overflow-hidden`}
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          {/* Icon background glow */}
          <div className={`absolute inset-0 ${data.glowColor} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`} />
          <Icon className={`w-8 h-8 ${data.iconColor} relative z-10`} />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">
          {data.title}
        </h3>
        
        <ul className="space-y-3">
          {data.skills.map((skill, index) => (
            <motion.li
              key={index}
              className="text-slate-400 flex items-center gap-3 relative group/item"
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${data.color} shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover/item:scale-150 transition-transform duration-300`} />
              <span className="group-hover/item:text-white transition-colors duration-300">{skill}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative z-10 overflow-hidden">
      {/* Animated Background Colors */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-40 mix-blend-screen filter blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.8) 0%, rgba(0,0,0,0) 70%)' }}
          animate={{ x: [0, 100, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-40 mix-blend-screen filter blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.8) 0%, rgba(0,0,0,0) 70%)' }}
          animate={{ x: [0, -100, 0], y: [0, -100, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full opacity-30 mix-blend-screen filter blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.8) 0%, rgba(0,0,0,0) 70%)' }}
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[30%] w-[45%] h-[45%] rounded-full opacity-30 mix-blend-screen filter blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.8) 0%, rgba(0,0,0,0) 70%)' }}
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <motion.div
        className="max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
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
