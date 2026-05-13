'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag } from 'lucide-react';

const EcommerceProjectCard = () => {
  // Replace this with your actual e-commerce website link
 const projectLink = "https://ecom-omega-black.vercel.app";
  const techStack = [
    { name: 'React', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { name: 'Next.js', color: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
    { name: 'Tailwind', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { name: 'Framer Motion', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative max-w-md w-full"
    >
      {/* Dynamic Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-300" />

      {/* Main Card Body */}
      <div className="relative h-full glass-card rounded-[2.5rem] p-8 flex flex-col overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl">

        {/* Animated Background Mesh */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] group-hover:bg-indigo-600/20 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] group-hover:bg-purple-600/20 transition-colors duration-700" />

        {/* Icon & Status */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors duration-500">
            <ShoppingBag className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-lg shadow-indigo-500/20">
            Featured
          </span>
        </div>

        {/* Project Details */}
        <div className="relative z-10 flex-1">
          <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all duration-300">
            E-commerce Project
          </h3>
          <p className="text-slate-400 text-base leading-relaxed mb-8 group-hover:text-slate-300 transition-colors duration-300">
            A high-performance digital storefront featuring optimized checkout flows, real-time inventory management, and a stunning responsive interface.
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl border backdrop-blur-md ${tech.color} transition-all duration-300 hover:scale-105`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 pt-6 border-t border-white/10">
          <motion.a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-4.5 bg-white text-black rounded-2xl font-bold text-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 group/btn"
          >
            <span className="text-base">View Project</span>
            <ExternalLink className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default EcommerceProjectCard;
