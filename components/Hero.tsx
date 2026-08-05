'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { containerVariants, textRevealVariants, glowVariants } from '@/lib/animations';
import { ArrowRight, Download } from 'lucide-react';

const scrollToSection = (id: string) => {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Column — Image & Name */}
        {/* Removed filter:blur from initial/animate — blur on large elements forces full repaint.
            Now uses opacity+scale only which the compositor handles without touching layout. */}
        <motion.div
          className="lg:col-span-5 relative flex flex-col justify-center items-center w-full mt-12 lg:mt-0 lg:-translate-y-16 order-first"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="relative w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[350px] aspect-square rounded-full overflow-hidden border border-blue-500/25 shadow-[0_0_40px_rgba(59,130,246,0.25)] group">
            {/* Professional blue overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-cyan-500/10 to-blue-400/20 mix-blend-color z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />
            
            {/* next/image replaces raw <img> — auto lazy-load, AVIF/WebP, proper size hints */}
            <Image
              src="/a.jpg"
              alt="Rida Sbai"
              fill
              priority
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 350px"
              className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105 brightness-105 contrast-105 saturate-110"
            />
            
            {/* Glass effect overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent z-10 pointer-events-none" />
          </div>

          <h2 className="mt-8 text-3xl sm:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-center uppercase drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
            Rida Sbai
          </h2>
        </motion.div>

        {/* Right Column — Text Content */}
        <motion.div
          className="lg:col-span-7 text-left space-y-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Glowing Badge */}
          <motion.div className="flex justify-start mb-4" variants={textRevealVariants}>
            <div className="glass-panel px-5 py-2 rounded-full flex items-center gap-3 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] bg-[#0F172A]/60 backdrop-blur-md">
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
              <span className="text-sm font-semibold text-blue-100 tracking-wide uppercase">AI &amp; Full Stack Engineer</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tighter leading-tight lg:leading-none"
              variants={textRevealVariants}
            >
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 pb-4 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                Full Stack Developer
              </span>
            </motion.h1>
          </div>

          {/* Hero Description */}
          <div className="overflow-hidden mt-6">
            <motion.p 
              className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-light"
              variants={textRevealVariants}
            >
              Architecting intelligent, scalable, and high-performance digital experiences. 
              Transforming complex problems into elegant, futuristic web solutions using bleeding-edge technologies.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div 
            variants={textRevealVariants} 
            className="flex flex-col sm:flex-row gap-6 justify-start pt-6"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 via-white to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.3)] w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-start gap-6 pt-8"
            variants={textRevealVariants}
          >
            <a href="https://github.com/RIDAs-24" target="_blank" rel="noopener noreferrer" className="group relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-slate-300 group-hover:text-white transition-colors">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="group relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-slate-300 group-hover:text-white transition-colors">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="group relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-slate-300 group-hover:text-white transition-colors">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.97H5.059z"/>
                </svg>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
