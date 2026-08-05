'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function MagneticButton({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 flex justify-center pointer-events-none">
        <motion.nav
          onMouseMove={handleMouseMove}
          className={`pointer-events-auto relative flex items-center justify-between px-4 md:px-6 py-3 mx-auto rounded-full transition-all duration-700 ease-out group ${
            isMenuOpen
              ? 'w-full max-w-5xl bg-transparent border-transparent'
              : isScrolled
              ? 'w-full md:w-[85%] max-w-4xl bg-slate-950/60 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'w-full max-w-5xl bg-transparent border-transparent'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden md:block"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  250px circle at ${mouseX}px ${mouseY}px,
                  rgba(59, 130, 246, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Glass reflection line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Logo */}
          <MagneticButton onClick={() => scrollToSection('home')} className="relative z-20 flex items-center pl-2">
            <motion.span 
              className="inline-block text-2xl font-black bg-gradient-to-r from-white via-cyan-100 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] tracking-tighter"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              Rida.
            </motion.span>
          </MagneticButton>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 relative z-20">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group/link ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active Indicator Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Active Dot */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-dot"
                      className="absolute -bottom-1 inset-x-0 mx-auto w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Hover Underline */}
                  {!isActive && (
                    <span className="absolute left-4 right-4 bottom-1.5 h-[1px] scale-x-0 bg-gradient-to-r from-transparent via-slate-300 to-transparent transition-transform duration-300 origin-center group-hover/link:scale-x-100 opacity-50" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block relative z-20 pr-1">
            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="relative flex items-center justify-center px-6 py-2 overflow-hidden rounded-full font-medium text-sm group/btn shadow-[0_0_20px_rgba(37,99,235,0.0)] hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-shadow duration-500"
            >
              <div className="absolute inset-0 bg-[#0F172A] border border-white/10 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-cyan-500/80 to-blue-600/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="absolute top-0 -left-[100%] w-1/2 h-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1 }}
              />
              
              <span className="relative z-20 flex items-center gap-2 text-slate-200 group-hover/btn:text-white transition-colors duration-300">
                Let's Talk
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }} 
              className="w-5 h-[1.5px] bg-white block rounded-full" 
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} 
              className="w-5 h-[1.5px] bg-white block rounded-full" 
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }} 
              className="w-5 h-[1.5px] bg-white block rounded-full" 
            />
          </button>
        </motion.nav>
      </header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#030712]/95 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Background glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center gap-8 w-full px-6 relative z-10">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className={`relative group px-6 py-2 flex items-center justify-center text-3xl font-medium tracking-tight ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                      
                      {isActive && (
                        <motion.div 
                          layoutId="mobile-active-text"
                          className="absolute -inset-x-4 -inset-y-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}
              
              <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ delay: 0.1 + NAV_ITEMS.length * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 className="mt-8 w-full max-w-[250px]"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg relative overflow-hidden group shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-shadow duration-300"
                >
                  <motion.div 
                    className="absolute top-0 -left-[100%] w-1/2 h-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 0.5 }}
                  />
                  <span className="relative z-20">Let's Talk</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
