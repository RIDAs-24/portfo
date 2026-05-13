/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'contact' | 'section' | 'dark';
  className?: string;
}

export default function AnimatedBackground({ variant = 'section', className = '' }: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Deep Space / Futuristic Dark Background */}
      <div className="absolute inset-0 bg-[#030014] transition-colors duration-700" />
      
      {/* Glowing Gradient Orbs (Orange, Red, Purple, Pink) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-30 mix-blend-screen filter blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(0,0,0,0) 70%)' }} // Vibrant Orange
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 40, -80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-20 mix-blend-screen filter blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(0,0,0,0) 70%)' }} // Bright Red
        animate={{
          x: [0, -80, 40, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 2 }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[10%] w-[55%] h-[55%] rounded-full opacity-20 mix-blend-screen filter blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(0,0,0,0) 70%)' }} // Deep Purple
        animate={{
          x: [0, 60, -100, 0],
          y: [0, -80, 60, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
      />

      <motion.div
        className="absolute bottom-[-20%] right-[20%] w-[60%] h-[60%] rounded-full opacity-20 mix-blend-screen filter blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(0,0,0,0) 70%)' }} // Sunset Pink
        animate={{
          x: [0, -50, 80, 0],
          y: [0, 50, -60, 0],
          scale: [1, 1.1, 0.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 7 }}
      />

      {/* Smooth Wave Motion */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute top-0 left-0">
          <motion.path
            d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
            fill="url(#wave-gradient)"
            animate={{
              d: [
                "M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z",
                "M0,50 Q25,70 50,50 T100,50 L100,100 L0,100 Z",
                "M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249,115,22,0.1)" />
              <stop offset="50%" stopColor="rgba(239,68,68,0.2)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Moving Light Particles / Glowing Stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{
              width: Math.random() * 2.5 + 1 + 'px',
              height: Math.random() * 2.5 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [0, Math.random() * -150 - 50],
              x: [0, Math.random() * 80 - 40],
              opacity: [0, Math.random() * 0.8 + 0.4, 0],
              scale: [0, Math.random() * 1.5 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* High Quality Blur Overlay (Global Noise for Atmosphere) */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
