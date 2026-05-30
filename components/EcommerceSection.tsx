npm'use client';

import React from 'react';
import { motion } from 'framer-motion';
import EcommerceProjectCard from './EcommerceProjectCard';

const EcommerceSection = () => {
  return (
    <section id="featured-ecommerce" className="py-24 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Project 1 - <span className="text-gradient">E-commerce</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A showcase of my premium e-commerce solution, built with the latest technologies to provide a high-end shopping experience.
          </p>
        </motion.div>

        <div className="w-full flex justify-center">
          <EcommerceProjectCard />
        </div>
      </div>
    </section>
  );
};

export default EcommerceSection;
