'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';

// The nav labels → the section IDs they scroll to
const NAV_ITEMS: { label: string; id: string }[] = [
  { label: 'Home',     id: 'home'     },
  { label: 'About',   id: 'about'    },
  { label: 'Projects',id: 'projects' },
  { label: 'Eco',     id: 'eco'      },
  { label: 'Contact', id: 'contact'  },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll spy — highlights the current in-view section
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
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

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-4xl z-50 px-4 md:px-0">
      {/* Decorative Stars — CSS-animated, zero JS overhead */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="star-1 absolute -top-4 -left-2 md:-left-8 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
        <div className="star-2 absolute top-1/2 -right-4 md:-right-8 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,1)]" />
        <div className="star-3 absolute -bottom-5 left-[20%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        <div className="star-4 absolute -top-3 right-[30%] w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_10px_rgba(147,197,253,1)]" />
        <div className="star-float absolute -bottom-3 right-[15%] w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
      </div>

      <motion.nav
        className={`w-full px-6 py-3 flex justify-between items-center rounded-full transition-all duration-500 border border-white/10 ${
          isScrolled
            ? 'bg-[#0F172A]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.12)] border-white/15'
            : 'bg-[#0F172A]/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection('home')}
          className="text-2xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tighter transition-all duration-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          RS
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1 items-center">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium capitalize relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                whileHover={{ y: -1 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + index * 0.04 }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}

                {/* Active underline — animates in/out with layout */}
                <motion.span
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #3B82F6, #06B6D4)',
                    boxShadow: isActive ? '0 0 8px rgba(59,130,246,0.7)' : 'none',
                  }}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scaleX: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />

                {/* Subtle glow bg when active */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    }}
                    layoutId="nav-active-bg"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                )}
              </motion.button>
            );
          })}

          {/* Let's Talk Button */}
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-transparent border border-blue-500/50 rounded-full relative overflow-hidden group hover:border-transparent transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 text-blue-200 group-hover:text-white transition-colors duration-300">
              Let&apos;s Talk
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-300 relative z-50"
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
            className="absolute top-20 left-4 right-4 md:hidden bg-[#0F172A]/97 backdrop-blur-xl border border-blue-500/15 shadow-[0_0_40px_rgba(59,130,246,0.2)] rounded-3xl overflow-hidden z-40"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex flex-col p-6 gap-1">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeId === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative text-left text-lg font-medium py-3 px-3 rounded-xl border-b border-white/5 last:border-0 transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-blue-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: index * 0.04 }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-3">
                      {/* Active indicator dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]'
                            : 'bg-slate-600'
                        }`}
                      />
                      {item.label}
                    </span>

                    {/* Active left border accent */}
                    {isActive && (
                      <motion.span
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-blue-400 to-cyan-400"
                        layoutId="mobile-active-bar"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      />
                    )}
                  </motion.button>
                );
              })}

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="mt-4 py-3 text-center font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
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
