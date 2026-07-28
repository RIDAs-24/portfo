/**
 * Footer — static server component (no 'use client' needed).
 * The previous ✨ rotate was a Framer Motion repeat:Infinity animation which
 * kept a JS animation loop alive indefinitely. Replaced with a CSS animation
 * which runs on the compositor thread with zero JS overhead.
 */
export default function Footer() {
  return (
    <footer className="text-slate-300 dark:text-slate-400 py-12 relative overflow-hidden z-10">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <p className="mb-2 text-lg font-semibold">
          &copy; 2026 Rida Sbai. All rights reserved.
        </p>
        <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
          Built with React, Next.js, and Tailwind CSS
          {/* CSS wiggle — zero JS vs Framer Motion repeat:Infinity */}
          <span
            className="inline-block"
            style={{ animation: 'lamp-swing 3s ease-in-out infinite' }}
            aria-hidden="true"
          >
            ✨
          </span>
        </p>
      </div>
    </footer>
  );
}
