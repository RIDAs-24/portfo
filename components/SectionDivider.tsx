'use client';

import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="relative w-full py-16 flex items-center justify-center overflow-hidden opacity-80">
      
      {/* Subtle Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative flex items-center w-full max-w-4xl px-8">
        {/* Left Line */}
        <motion.div 
          className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-blue-400/50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "right" }}
        />
        
        {/* Center Element */}
        <motion.div 
          className="mx-6 relative flex items-center justify-center"
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="w-3 h-3 rotate-45 border border-blue-400/50 bg-[#0F172A] shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
          <div className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
        </motion.div>
        
        {/* Right Line */}
        <motion.div 
          className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-blue-500/20 to-blue-400/50"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}
