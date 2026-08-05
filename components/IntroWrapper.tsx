'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Force scroll to top when intro starts
    window.scrollTo(0, 0);

    // Hide intro after a short delay (e.g., 2.5 seconds)
    const timer = setTimeout(() => {
      setShowIntro(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!isMounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            className="fixed inset-0 z-[99999] bg-[#020617] flex items-center justify-center"
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <h1 className="text-4xl md:text-6xl font-light text-white tracking-[0.3em] uppercase">
                Welcome
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 
        When intro is showing, we hide overflow on the main page to prevent scrolling.
        We still render the children so they are ready and preloaded when the intro fades out.
      */}
      <div 
        className={`transition-opacity duration-1000 ${
          showIntro ? "h-screen overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
