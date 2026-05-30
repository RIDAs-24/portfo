'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // passive: true tells the browser this handler will never call preventDefault(),
    // allowing it to start scrolling immediately without waiting for JS.
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setIsMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const menuItems = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-4xl z-50 px-4 md:px-0">
      {/* Decorative Stars — CSS-animated, zero JS overhead */}
      {/* Previously these were 5× motion.div with repeat:Infinity — moved to CSS @keyframes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="star-1 absolute -top-4 -left-2 md:-left-8 w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)]" />
        <div className="star-2 absolute top-1/2 -right-4 md:-right-8 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,1)]" />
        <div className="star-3 absolute -bottom-5 left-[20%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        <div className="star-4 absolute -top-3 right-[30%] w-1.5 h-1.5 bg-red-400 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" />
        <div className="star-float absolute -bottom-3 right-[15%] w-1 h-1 bg-orange-300 rounded-full shadow-[0_0_8px_rgba(253,186,116,0.8)]" />
      </div>

      <motion.nav 
        className={`w-full px-6 py-3 flex justify-between items-center rounded-full transition-all duration-500 border border-white/10 ${
          isScrolled
            ? 'bg-[#0a0a1a]/70 backdrop-blur-xl shadow-[0_0_30px_rgba(14,165,233,0.15)] border-white/20'
            : 'bg-black/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          onClick={() => scrollToSection('home')}
          className="text-2xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent tracking-tighter transition-all duration-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          RS
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {menuItems.map((item, index) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-sm text-slate-300 hover:text-white transition-colors capitalize font-medium relative group px-2 py-1"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + index * 0.04 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)]" />
            </motion.button>
          ))}
          
          {/* Let's Talk Button */}
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="ml-4 px-6 py-2 text-sm font-semibold text-white bg-transparent border border-red-500/50 rounded-full relative overflow-hidden group hover:border-transparent transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white text-orange-100">
              Let&apos;s Talk
              <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse" />
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white relative z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-20 left-4 right-4 md:hidden bg-[#0a0a1a]/95 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(239,68,68,0.3)] rounded-3xl overflow-hidden z-40"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex flex-col p-6 gap-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-slate-300 hover:text-white transition-colors capitalize font-medium text-left text-lg py-3 border-b border-white/5 last:border-0 hover:pl-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: index * 0.04 }}
                >
                  {item}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="mt-4 py-3 text-center font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
