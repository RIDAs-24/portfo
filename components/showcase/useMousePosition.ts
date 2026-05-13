'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  x: number; // normalised -0.5 → 0.5
  y: number;
}

/**
 * useMousePosition
 * Tracks the cursor position relative to a DOM element.
 * Returns values normalised to [-0.5, 0.5] so callers can multiply
 * them directly by any rotation/translation magnitude.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   const { x, y } = useMousePosition(ref);
 */
export function useMousePosition(
  ref: React.RefObject<HTMLElement | null>
): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      });
    };
    const onLeave = () => setPos({ x: 0, y: 0 });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);

  return pos;
}

/**
 * useScrollProgress
 * Returns the page scroll progress as a value from 0 to 1.
 * Used to drive subtle parallax effects tied to scroll position.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
