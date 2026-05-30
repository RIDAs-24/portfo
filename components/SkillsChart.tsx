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

const radarData = [
  { subject: 'React', value: 95 },
  { subject: 'Next.js', value: 90 },
  { subject: 'TypeScript', value: 88 },
  { subject: 'Node.js', value: 82 },
  { subject: 'UI/UX', value: 85 },
  { subject: 'DevOps', value: 70 },
];

const activityData = [
  { day: 'Mon', hours: 6 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 9 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 3 },
];

type ChartType = 'radar' | 'bar';

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { subject?: string; day?: string } }> }) => {
  if (active && payload?.length) {
    const label = payload[0].payload.subject || payload[0].payload.day;
    return (
      <div className="px-3 py-2 rounded-xl bg-black/80 border border-white/10 text-white text-sm">
        <span className="font-semibold">{label}:</span> {payload[0].value}
        {payload[0].payload.subject ? '%' : 'h'}
      </div>
    );
  }
  return null;
};

export default function SkillsChart() {
  const [chart, setChart] = useState<ChartType>('radar');

  // ResizeObserver-based mount guard: waits for the container to have real
  // positive dimensions before rendering Recharts. This prevents the
  // "width(-1) and height(-1) should be greater than 0" error that occurs
  // when charts render during SSR, hydration, or before flex/grid settles.
  const [isMounted, setIsMounted] = useState(false);
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
      className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="text-lg font-bold text-white">Analytics</h3>
          <p className="text-xs text-slate-400">
            {chart === 'radar' ? 'Skill proficiency' : 'Weekly coding activity'}
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {(['radar', 'bar'] as ChartType[]).map((t) => (
            <button
              key={t}
              onClick={() => setChart(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                chart === t
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'radar' ? 'Skills' : 'Activity'}
            </button>
          ))}
        </div>
      </div>

      {/* Fixed pixel height prevents ResponsiveContainer from measuring 0 or -1.
          Never use flex-1 or h-full when the parent chain has no fixed height. */}
      <div
        ref={containerRef}
        className="w-full min-w-0"
        style={{ height: '260px' }}
      >
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            {chart === 'radar' ? (
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#818cf8"
                  fill="#818cf8"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            ) : (
              <BarChart data={activityData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar
                  dataKey="hours"
                  radius={[6, 6, 0, 0]}
                  fill="url(#barGradRoot)"
                />
                <defs>
                  <linearGradient id="barGradRoot" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
