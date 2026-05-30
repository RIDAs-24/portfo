'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  colorIndex: number; // pre-assigned, no per-frame calculation
}

interface WavePoint {
  x: number;
  baseY: number;
  phase: number;
  amplitude: number;
  speed: number;
}

const CONNECTION_DISTANCE = 140;
const NODE_COUNT = 45; // reduced from 70 — ~60% fewer connection checks (O(n²))

// Pre-defined color palette — no runtime lerp computation
const NODE_COLORS = [
  { r: 59,  g: 130, b: 246 }, // blue-500
  { r: 99,  g: 102, b: 241 }, // indigo-500
  { r: 139, g: 92,  b: 246 }, // violet-500
  { r: 168, g: 85,  b: 247 }, // purple-500
  { r: 192, g: 132, b: 252 }, // purple-400
] as const;

// Pre-computed color strings for flat strokeStyle (no createLinearGradient per pair)
const COLOR_STRINGS = NODE_COLORS.map(c => `${c.r},${c.g},${c.b}`);

// Wave base colors (pre-built strings)
const WAVE_COLORS = [
  'rgba(59,130,246,',
  'rgba(99,102,241,',
  'rgba(139,92,246,',
  'rgba(168,85,247,',
] as const;

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    canvas.style.willChange = 'transform'; // compositor hint

    // --- Create nodes with pre-assigned color index ---
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x:          Math.random() * W,
      y:          Math.random() * H,
      vx:         (Math.random() - 0.5) * 0.35,
      vy:         (Math.random() - 0.5) * 0.35,
      radius:     Math.random() * 1.8 + 1.2,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.018 + 0.008,
      colorIndex: i % NODE_COLORS.length,
    }));

    // --- Wave lines (horizontal sine) ---
    const waves = Array.from({ length: 4 }, (_, wi) => {
      const baseY = (H / 5) * (wi + 1);
      const pts: WavePoint[] = [];
      for (let x = -50; x <= W + 50; x += 8) {
        pts.push({
          x,
          baseY,
          phase:     (x / W) * Math.PI * 4,
          amplitude: 28 + Math.random() * 35,
          speed:     0.003 + Math.random() * 0.003,
        });
      }
      return { pts, colorStr: WAVE_COLORS[wi % WAVE_COLORS.length] };
    });

    let t = 0;

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 1;

      // ── WAVE FLOWS ──────────────────────────────────────────────
      // Single beginPath per wave — efficient batched drawing
      for (const { pts, colorStr } of waves) {
        ctx!.beginPath();
        let first = true;
        for (const p of pts) {
          const waveY = p.baseY + Math.sin(p.phase + t * p.speed) * p.amplitude;
          if (first) { ctx!.moveTo(p.x, waveY); first = false; }
          else ctx!.lineTo(p.x, waveY);
        }
        const opacity = 0.07 + 0.05 * Math.sin(t * 0.01);
        ctx!.strokeStyle = colorStr + opacity + ')';
        ctx!.lineWidth   = 1.0;
        ctx!.stroke();
      }

      // ── NODE MOVEMENT ────────────────────────────────────────────
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulsePhase += n.pulseSpeed;
      }

      // ── CONNECTIONS — flat rgba strokeStyle, no createLinearGradient ──
      // Per-frame gradient creation was the single biggest CPU cost; removed entirely.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          // Use squared distance to skip the expensive sqrt when possible
          const distSq = dx * dx + dy * dy;
          if (distSq > CONNECTION_DISTANCE * CONNECTION_DISTANCE) continue;

          const dist  = Math.sqrt(distSq);
          const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.35;
          // Use the midpoint node's pre-assigned color for this connection
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = `rgba(${COLOR_STRINGS[a.colorIndex]},${alpha.toFixed(3)})`;
          ctx!.lineWidth   = 0.7;
          ctx!.stroke();
        }
      }

      // ── NODES ────────────────────────────────────────────────────
      for (const n of nodes) {
        const col   = NODE_COLORS[n.colorIndex];
        const pulse = 0.6 + 0.4 * Math.sin(n.pulsePhase);

        // Outer glow (single radial gradient per node — cached by colorIndex is not needed; it's 1 per node not per pair)
        const glow = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
        glow.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${(0.28 * pulse).toFixed(3)})`);
        glow.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${col.r},${col.g},${col.b},${(0.85 * pulse).toFixed(3)})`;
        ctx!.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    // Debounced resize — avoids thrashing on every pixel change
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width  = W;
        canvas.height = H;
      }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.65 }}
    />
  );
}
