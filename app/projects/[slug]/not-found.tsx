'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative z-10">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-3xl glass-card border border-white/10">
            <SearchX className="w-12 h-12 text-indigo-400" />
          </div>
        </div>

        {/* 404 */}
        <p className="text-8xl font-black text-gradient mb-2 leading-none">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">Project Not Found</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          The project you&apos;re looking for doesn&apos;t exist or may have been moved.
          Head back to the homepage to explore all projects.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#showcase"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
