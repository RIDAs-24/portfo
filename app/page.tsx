'use client';

import { motion } from 'framer-motion';
import { pageVariants } from '@/lib/animations';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import ProjectShowcase from '@/components/showcase/ProjectShowcase';
import Goals from '@/components/Goals';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <motion.main
      className="flex flex-col"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
      <Hero />
      <About />
      <Skills />
      <ProjectShowcase />
      <Goals />
      <Contact />
      <Footer />
    </motion.main>
  );
}
