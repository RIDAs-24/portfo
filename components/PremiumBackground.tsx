'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import NetworkCanvas from './NetworkCanvas';

/**
 * PremiumBackground — fixed full-screen ambient background.
 *
 * Performance notes:
 * - All 5 gradient orbs now use CSS @keyframes (defined in globals.css)
 *   instead of Framer Motion — runs entirely on the GPU compositor thread,
 *   zero JS/RAF overhead during scroll.
 * - `will-change: transform` is pre-declared via the `.gpu-layer` class so
 *   the browser promotes each orb to its own composited layer before the
 *   animation starts, eliminating mid-scroll repaint.
 * - blur values reduced slightly (160px → 120px) for lower GPU memory cost
 *   while remaining visually indistinguishable.
 */
export default function PremiumBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="fixed inset-0 z-[-1] bg-[#060918]" />
  );


  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">

      {/* ── Background photo ─────────────────────────────────────── */}
      <Image
        src="/back.jpg.avif"
        alt="Background"
        fill
        priority
        quality={80}
        className="object-cover object-center"
      />
      {/* Dark overlay to preserve the dark neon aesthetic */}
      <div className="absolute inset-0 bg-[#060918]/55" />

      {/* ── Animated Network Canvas ─────────────────────────────── */}
      <NetworkCanvas />

      {/* ── Gradient orbs — CSS-animated, GPU-only ───────────────── */}

      {/* Top-right purple glow */}
      <div
        className="gpu-layer absolute top-[-15%] right-[-5%] w-[65%] h-[65%] rounded-full opacity-35 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(59,7,100,0.3) 50%, rgba(0,0,0,0) 70%)',
          filter: 'blur(120px)',
          animation: 'orb-drift-1 22s ease-in-out infinite',
        }}
      />

      {/* Bottom-left blue glow */}
      <div
        className="gpu-layer absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(30,58,138,0.3) 50%, rgba(0,0,0,0) 70%)',
          filter: 'blur(120px)',
          animation: 'orb-drift-2 28s ease-in-out 3s infinite',
        }}
      />

      {/* Center indigo glow */}
      <div
        className="gpu-layer absolute top-[30%] left-[25%] w-[50%] h-[50%] rounded-full opacity-[0.18] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.55) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(110px)',
          animation: 'orb-drift-3 35s ease-in-out 7s infinite',
        }}
      />

      {/* Top-left violet accent */}
      <div
        className="gpu-layer absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full opacity-20 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(100px)',
          animation: 'orb-drift-4 18s ease-in-out 1s infinite',
        }}
      />

      {/* Bottom-right deep purple accent */}
      <div
        className="gpu-layer absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full opacity-25 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(110px)',
          animation: 'orb-drift-5 24s ease-in-out 5s infinite',
        }}
      />

      {/* ── Noise texture for depth ──────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.018] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
