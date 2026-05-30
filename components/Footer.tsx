'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="text-slate-300 dark:text-slate-400 py-12 relative overflow-hidden z-10">

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.p
          className="mb-2 text-lg font-semibold"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &copy; 2026 Rida Sbai. All rights reserved.
        </motion.p>
        <motion.p
          className="text-sm text-slate-500 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Built with React, Next.js, and Tailwind CSS
          <motion.span
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ display: 'inline-block' }}
          >
            ✨
          </motion.span>
        </motion.p>
      </div>
    </footer>
  );
}
