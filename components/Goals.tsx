'use client';

import { motion } from 'framer-motion';
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/animations';

const goalsData = [
  {
    icon: '🎯',
    title: 'Continuous Learning',
    description: "I am focused on improving my full stack development skills and building real-world projects that solve actual problems."
  },
  {
    icon: '🚀',
    title: 'Freelance Career',
    description: "My goal is to start a freelance career and work with international clients on modern web applications. I'm passionate about creating digital products that are functional, beautiful, and user-centric."
  }
];

export default function Goals() {
  return (
    <section id="goals" className="py-20 px-6 relative overflow-hidden z-10 section-optimized">

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12 gradient-text"
          variants={scrollRevealVariants}
        >
          Goals &amp; Vision
        </motion.h2>

        <motion.div className="space-y-8" variants={containerVariants}>
          {goalsData.map((goal, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl glass-card border border-white/10 hover:border-indigo-500/50 hover-lift"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4 items-start">
                {/* Removed: repeat:Infinity scale+rotate animation on emoji
                    Replaced with whileHover — only fires on interaction, zero idle cost */}
                <motion.span
                  className="text-3xl flex-shrink-0 cursor-default select-none"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {goal.icon}
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {goal.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
