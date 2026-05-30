'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PurposePassion() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden section-optimized">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-slate-950 -z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-900/20 to-slate-950 -z-10"></div>
      
      {/* Soft Purple Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -translate-y-1/2 -z-10 mix-blend-screen"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl lg:max-w-none text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Purpose & Passion
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Bridging the gap between futuristic design and scalable engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Right Side: Premium Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-first lg:order-last relative w-full aspect-square lg:aspect-[4/5] rounded-[32px] overflow-hidden group shadow-2xl shadow-purple-900/20 border border-purple-500/10"
          >
            {/* The Generated Image */}
            <Image
              src="/purpose-passion.png"
              alt="Futuristic Developer Workspace"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Overlay Gradient for readability and styling */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-purple-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Inner Glow Border */}
            <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none"></div>
          </motion.div>

          {/* Left Side: Three Stacked Glassmorphism Cards */}
          <div className="flex flex-col gap-6 lg:gap-8 order-last lg:order-first">
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative p-8 rounded-[24px] bg-white/[0.02] backdrop-blur-md border border-white/10 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex gap-5 items-start relative z-10">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-purple-500/20 group-hover:border-purple-500/50 group-hover:scale-105 transition-all duration-500 shadow-lg shadow-purple-900/20">
                  <Image src="/icon-innovation.png" alt="Innovation" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Driven by Innovation
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                    Exploring modern web technologies, AI integration, and performance optimization.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-8 rounded-[24px] bg-white/[0.02] backdrop-blur-md border border-white/10 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex gap-5 items-start relative z-10">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-indigo-500/20 group-hover:border-indigo-500/50 group-hover:scale-105 transition-all duration-500 shadow-lg shadow-indigo-900/20">
                  <Image src="/icon-design.png" alt="User-Centric Design" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    User-Centric Design
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                    Creating intuitive, seamless, and premium user experiences.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative p-8 rounded-[24px] bg-white/[0.02] backdrop-blur-md border border-white/10 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex gap-5 items-start relative z-10">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-blue-500/20 group-hover:border-blue-500/50 group-hover:scale-105 transition-all duration-500 shadow-lg shadow-blue-900/20">
                  <Image src="/icon-growth.png" alt="Continuous Growth" fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Continuous Growth
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                    Always learning and improving to build scalable and modern web applications.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
