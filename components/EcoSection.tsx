'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, BarChart3, ShieldCheck, Zap, ExternalLink } from 'lucide-react';

const EcoSection = () => {
  const projectLink = "https://eco-blush-ten.vercel.app";

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      title: "Real-time Analytics",
      description: "Track your carbon footprint and sustainability metrics in real-time with an intuitive, data-rich dashboard."
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-400" />,
      title: "Eco Insights",
      description: "Get AI-driven recommendations on how to optimize energy usage and reduce environmental impact."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
      title: "Compliance Ready",
      description: "Automated reporting features that keep your business compliant with global sustainability standards."
    },
    {
      icon: <Zap className="w-6 h-6 text-lime-400" />,
      title: "Performance First",
      description: "Built with Next.js and optimized for speed, ensuring a seamless experience across all devices."
    }
  ];

  return (
    <section id="eco" className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6"
          >
            <Leaf className="w-4 h-4" />
            <span>Introducing Eco Platform</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white"
          >
            Sustainability meets <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Performance</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white mb-10"
          >
            A production-ready SaaS application designed to help businesses track, analyze, and optimize their environmental impact. Built with a clean, minimalist UI for maximum efficiency.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-base hover:scale-105 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-all duration-300"
            >
              View Live Project <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 glass-card rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-300 relative z-10">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-white leading-relaxed relative z-10 group-hover:text-slate-200 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoSection;
