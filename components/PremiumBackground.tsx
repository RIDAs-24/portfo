'use client';

/**
 * PremiumBackground — fixed full-screen background.
 * Uses y.jpeg centered in the viewport with a professional dark overlay.
 *
 * No `mounted` guard needed: this component reads no browser APIs on render,
 * so SSR and client output are identical — no hydration mismatch possible.
 */
export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">

      {/* ── Deep dark base ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: '#060a10' }}
      />

      {/* ── Photo — centered, contained, not stretched ─────────────── */}
      <div
        className="absolute inset-0 gpu-layer"
        style={{
          backgroundImage: 'url(/y.jpeg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Soft dark fade on all 4 edges — blends photo into the page */}
      {/* Top */}
      <div className="absolute inset-x-0 top-0 h-48"
        style={{ background: 'linear-gradient(to bottom, #060a10 0%, transparent 100%)' }} />
      {/* Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to top, #060a10 0%, transparent 100%)' }} />
      {/* Left */}
      <div className="absolute inset-y-0 left-0 w-40"
        style={{ background: 'linear-gradient(to right, #060a10 0%, transparent 100%)' }} />
      {/* Right */}
      <div className="absolute inset-y-0 right-0 w-40"
        style={{ background: 'linear-gradient(to left, #060a10 0%, transparent 100%)' }} />

      {/* ── Dark overlay — keeps text legible ──────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(6, 10, 16, 0.55)' }}
      />

      {/* ── Subtle dot grid ────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.02,
        }}
      />

      {/* ── Twinkling Background Stars (Professional Touch) ────────── */}
      <div className="absolute inset-0 z-0">
        <div className="star-1 absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        <div className="star-2 absolute top-[25%] left-[80%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        <div className="star-3 absolute top-[40%] left-[5%] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        <div className="star-float absolute top-[55%] left-[75%] w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(147,197,253,0.8)]" />
        <div className="star-1 absolute top-[70%] left-[20%] w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
        <div className="star-2 absolute top-[85%] left-[85%] w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        <div className="star-3 absolute top-[15%] left-[50%] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        <div className="star-float absolute top-[45%] left-[30%] w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        <div className="star-1 absolute top-[80%] left-[60%] w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        <div className="star-2 absolute top-[35%] left-[90%] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        <div className="star-3 absolute top-[65%] left-[10%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <div className="star-float absolute top-[95%] left-[40%] w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_10px_rgba(147,197,253,0.8)]" />
      </div>

      {/* ── Right-Side White Glow Gradient ─────────────────────────── */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 md:w-1/3 z-10"
        style={{
          background: 'linear-gradient(to left, rgba(255,252,253,0.30) 0%, rgba(253,245,248,0.12) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
