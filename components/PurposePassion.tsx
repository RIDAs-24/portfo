'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, TrendingUp } from 'lucide-react';

const cards = [
  {
    icon: <Lightbulb className="w-7 h-7 text-purple-400" />,
    color: 'purple',
    title: 'Driven by Innovation',
    description:
      'Exploring modern web technologies, AI integration, and performance optimization to push the boundaries of what is possible.',
  },
  {
    icon: <Sparkles className="w-7 h-7 text-indigo-400" />,
    color: 'indigo',
    title: 'User-Centric Design',
    description:
      'Creating intuitive, seamless, and premium user experiences that delight users and drive engagement.',
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-blue-400" />,
    color: 'blue',
    title: 'Continuous Growth',
    description:
      'Always learning and improving to build scalable and modern web applications that stand the test of time.',
  },
];

const borderColor: Record<string, string> = {
  purple: 'hover:border-purple-500/40 group-hover:bg-purple-500/5',
  indigo: 'hover:border-indigo-500/40 group-hover:bg-indigo-500/5',
  blue: 'hover:border-blue-500/40 group-hover:bg-blue-500/5',
};

const glowColor: Record<string, string> = {
  purple: 'from-purple-500/10',
  indigo: 'from-indigo-500/10',
  blue: 'from-blue-500/10',
};

const iconBg: Record<string, string> = {
  purple: 'bg-purple-500/10 border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  indigo: 'bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]',
  blue:   'bg-blue-500/10   border-blue-500/20   shadow-[0_0_20px_rgba(59,130,246,0.15)]',
};

export default function PurposePassion() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
              Purpose &amp; Passion
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight mb-5">
            Bridging the gap between{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
              design and engineering
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            I believe great software is both beautifully designed and technically excellent.
            My work sits at that intersection — crafting experiences that feel effortless yet scale without limits.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex items-start gap-6 p-7 rounded-2xl bg-white/[0.025] backdrop-blur-md border border-white/10 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-xl ${borderColor[card.color]}`}
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${glowColor[card.color]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Icon */}
              <div className={`shrink-0 w-14 h-14 rounded-xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${iconBg[card.color]}`}>
                {card.icon}
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
