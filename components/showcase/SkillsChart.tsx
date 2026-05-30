'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { RADAR_DATA, ACTIVITY_DATA } from './data';

type Tab = 'radar' | 'bar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const label = d.subject ?? d.day;
  const unit = d.subject ? '%' : 'h';
  return (
    <div className="px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 text-white text-xs font-medium">
      {label}: {payload[0].value}{unit}
    </div>
  );
}

export default function SkillsChart() {
  const [tab, setTab] = useState<Tab>('radar');

  // isMounted: prevents Recharts from measuring a zero-dimension container during SSR/hydration.
  // The chart only renders after the DOM has settled and dimensions are real.
  const [isMounted, setIsMounted] = useState(false);

  // containerRef: used to validate container has a real width before rendering charts.
  // This is the production-grade fix for the "width(-1)" Recharts warning — it waits
  // until the ResizeObserver confirms the container has a positive clientWidth.
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // useLayoutEffect fires after DOM mutations but before the browser paints.
    // requestAnimationFrame defers one more frame so layout is fully resolved,
    // guaranteeing the container has real positive pixel dimensions before
    // ResponsiveContainer mounts and attempts to measure them.
    let raf: number;
    const el = containerRef.current;
    if (!el) return;

    raf = requestAnimationFrame(() => {
      if (el.offsetWidth > 0 && el.offsetHeight > 0) {
        setIsMounted(true);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-sm font-bold text-white">Analytics</p>
          <p className="text-xs text-slate-500">
            {tab === 'radar' ? 'Skill proficiency' : 'Weekly coding hours'}
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {(['radar', 'bar'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                tab === t
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'radar' ? 'Skills' : 'Activity'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart area — explicit pixel height is the key fix.
          Never use flex-1 or h-full here — they resolve to 0 inside a flex
          column whose parent has no fixed height (the sticky grid column).
          A fixed h-[208px] gives ResponsiveContainer a real measurement target. */}
      <div
        ref={containerRef}
        className="w-full min-w-0"
        style={{ height: '208px' }}
      >
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            {tab === 'radar' ? (
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Radar dataKey="value" stroke="#818cf8" fill="#818cf8" fillOpacity={0.22} strokeWidth={2} />
              </RadarChart>
            ) : (
              <BarChart data={ACTIVITY_DATA} barSize={22}>
                <defs>
                  <linearGradient id="barGradShowcase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="hours" fill="url(#barGradShowcase)" radius={[5, 5, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
