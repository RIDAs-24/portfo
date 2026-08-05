'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  width?: 'w-full' | 'w-auto' | string;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '',
  width = 'w-full' 
}: ScrollRevealProps) {
  
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      // Triggers animation when element is 100px into the viewport
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.9, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] // Luxurious cubic bezier easing
      }}
      className={`${className} ${width}`}
    >
      {children}
    </motion.div>
  );
}
