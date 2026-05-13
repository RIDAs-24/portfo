'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-950 dark:from-black dark:to-slate-950 text-slate-300 dark:text-slate-400 py-12 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #6366f1, transparent)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

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
