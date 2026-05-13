'use client';

import { motion } from 'framer-motion';
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/animations';

const goalsData = [
  {
    icon: '🎯',
    title: 'Continuous Learning',
    description: 'I am focused on improving my full stack development skills and building real-world projects that solve actual problems.'
  },
  {
    icon: '🚀',
    title: 'Freelance Career',
    description: 'My goal is to start a freelance career and work with international clients on modern web applications. I\'m passionate about creating digital products that are functional, beautiful, and user-centric.'
  }
];

export default function Goals() {
  return (
    <section id="goals" className="py-20 px-6 bg-gradient-to-br from-white via-purple-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        className="absolute -top-40 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12 gradient-text"
          variants={scrollRevealVariants}
        >
          Goals & Vision
        </motion.h2>

        <motion.div className="space-y-8" variants={containerVariants}>
          {goalsData.map((goal, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl bg-white/70 dark:bg-slate-800/50 backdrop-blur border border-white/40 dark:border-slate-700/40 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-md hover:shadow-lg hover-lift"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4 items-start">
                <motion.span
                  className="text-3xl flex-shrink-0"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {goal.icon}
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {goal.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
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
