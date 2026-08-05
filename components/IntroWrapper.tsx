'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSequence from './IntroSequence';

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Force scroll to top when intro starts
    window.scrollTo(0, 0);
  }, []);

  const handleFinish = () => {
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!isMounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            className="fixed inset-0 z-[99999] bg-[#020617]"
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <IntroSequence onFinish={handleFinish} />
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
