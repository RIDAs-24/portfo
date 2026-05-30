'use client';

import { motion } from 'framer-motion';
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/animations';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden z-10 section-optimized">
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Large Heading & Photo/Graphic Placeholder */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Designing with <br/>
              <span className="text-gradient">Purpose & Passion</span>
            </h2>
            <div className="glass-panel p-2 rounded-[32px] relative overflow-hidden group shadow-2xl shadow-indigo-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 bg-slate-900/50">
                <Image
                  src="/img.png.jpg"
                  alt="Full Stack Developer Portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Bio text in glass cards */}
          <motion.div className="space-y-6 text-lg text-slate-400 leading-relaxed" variants={containerVariants}>
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <p>
                I am a Full Stack Developer focused on building high-performance web applications with modern technologies like React, Next.js, Node.js, and TypeScript.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <p>
                I specialize in turning ideas into real, functional, and user-friendly digital products. My goal is to grow as a professional freelancer and collaborate with clients worldwide on impactful projects.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <p>
                With a passion for clean code and elegant UI/UX design, I create digital solutions that not only work perfectly but also delight users with their interface and performance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
