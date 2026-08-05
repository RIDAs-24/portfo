'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for performant 60fps tracking (no React state re-renders)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Check if device is touch-based to disable cursor
    const checkMobile = () => {
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsMobile(isTouch);
      if (!isTouch) {
        document.body.classList.add('hide-default-cursor');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Track mouse movement
    const moveCursor = (e: MouseEvent) => {
      if (isHidden) setIsHidden(false);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-magnetic]');
      
      setIsHovered(!!interactiveEl);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Passive listener for maximum performance
    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('hide-default-cursor');
    };
  }, [cursorX, cursorY, isHidden]);

  if (isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-default-cursor, .hide-default-cursor * {
          cursor: none !important;
        }
      `}} />
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isHidden ? 0.5 : (isHovered ? 1.5 : 1),
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Soft Purple/Blue Neon Glow (Cyber Futuristic Effect) */}
        <motion.div 
          className="absolute rounded-full blur-[12px] mix-blend-screen bg-gradient-to-tr from-purple-500 to-blue-500"
          animate={{
            width: isHovered ? 48 : 40,
            height: isHovered ? 48 : 40,
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Minimal White Dot */}
        <motion.div 
          className="relative bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          animate={{
            width: isHovered ? 4 : 6,
            height: isHovered ? 4 : 6,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
