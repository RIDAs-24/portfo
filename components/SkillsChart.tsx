'use client';

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
import { motion } from 'framer-motion';
import { useState } from 'react';

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

// Custom tooltip for recharts
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

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 border border-white/10 h-full flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Analytics</h3>
          <p className="text-xs text-slate-400">
            {chart === 'radar' ? 'Skill proficiency' : 'Weekly coding activity'}
          </p>
        </div>
        {/* Tab toggle — React useState */}
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

      <div className="flex-1 min-h-[260px]">
        {chart === 'radar' ? (
          <ResponsiveContainer width="100%" height="100%">
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
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar
                dataKey="hours"
                radius={[6, 6, 0, 0]}
                fill="url(#barGrad)"
              />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
