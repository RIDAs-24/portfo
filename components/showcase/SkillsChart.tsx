'use client';

import { useState } from 'react';
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
  // useState controls which chart tab is visible
  const [tab, setTab] = useState<Tab>('radar');

  return (
    <motion.div
      className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
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

      {/* Chart area */}
      <div className="h-52">
        {tab === 'radar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Radar dataKey="value" stroke="#818cf8" fill="#818cf8" fillOpacity={0.22} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ACTIVITY_DATA} barSize={22}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="hours" fill="url(#barGrad)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
