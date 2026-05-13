'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/animations';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-20" variants={scrollRevealVariants}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ready to bring your next idea to life? Feel free to reach out for collaborations or just a friendly hello.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Contact Info */}
          <motion.div className="lg:col-span-2 space-y-8" variants={containerVariants}>
            <div className="space-y-6">
              {[
                { icon: Mail, title: "Email", value: "sbairida55@gmail.com", link: "mailto:sbairida55@gmail.com" },
                { icon: MapPin, title: "Location", value: "Casablanca", link: null },
                { icon: Phone, title: "Phone", value: "0618644495", link: "tel:0618644495" },
                { 
                  icon: (props: any) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.6 5 5 0 0 0-.1-3.5s-1.1-.35-3.5 1.25a11.8 11.8 0 0 0-6 0C6.5 2.65 5.4 3 5.4 3a5 5 0 0 0-.1 3.5A5.2 5.2 0 0 0 4 10.1c0 5.22 3 6.42 6 6.76-.3.26-.6.76-.8 1.48-.7.3-2.5.9-3.6-1.02 0 0-.6-1.1-1.8-1.2 0 0-1 .1-.1.6 0 0 .8.6 1.3 1.8 0 0 .7 2.1 3.6 1.8V22" />
                    </svg>
                  ), 
                  title: "GitHub", 
                  value: "RIDAs-24",
                  link: "https://github.com/RIDAs-24"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a 
                    key={index} 
                    href={item.link || '#'} 
                    target={item.link?.startsWith('http') ? '_blank' : undefined}
                    rel={item.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    variants={itemVariants} 
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-colors">
                      <Icon className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{item.title}</p>
                      <p className="font-medium text-white">{item.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  submitted 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                    : 'bg-white text-black hover:bg-slate-200 active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : submitted ? (
                  'Message Sent Successfully!'
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}