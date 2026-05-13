'use client';

import { motion } from 'framer-motion';
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/animations';
import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovators Inc.',
    period: '2022 - Present',
    description: 'Led the development of scalable microservices, mentored junior developers, and improved system architecture resulting in a 40% performance boost.'
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Solutions',
    period: '2020 - 2022',
    description: 'Built interactive and responsive web applications using React and Tailwind CSS. Collaborated closely with UI/UX designers to bring mockups to life.'
  },
  {
    title: 'Web Developer Intern',
    company: 'Creative Agency',
    period: '2019 - 2020',
    description: 'Assisted in building client websites, implementing animations, and optimizing frontend assets for faster load times.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative z-10">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-20" variants={scrollRevealVariants}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            My career path and the valuable experiences I&apos;ve gained along the way.
          </p>
        </motion.div>

        <div className="relative border-l border-white/10 pl-8 ml-4 md:ml-8 space-y-12">
          {/* Animated Timeline Glow */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
            style={{ originY: 0 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          {experienceData.map((exp, index) => (
            <motion.div key={index} className="relative group" variants={itemVariants}>
              {/* Timeline Dot */}
              <motion.div 
                className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-indigo-500 z-10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-white transition-colors" />
              </motion.div>

              <div className="glass-card p-8 rounded-2xl relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        {exp.title}
                      </h3>
                      <p className="text-indigo-400 font-medium text-lg mt-1 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> {exp.company}
                      </p>
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
