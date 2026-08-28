import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Terminal, Activity, ArrowUpRight } from 'lucide-react';
import { activeInvestigationsData } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';

export default function ActiveInvestigations() {
  return (
    <section id="investigations" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-widest uppercase">
          <Search className="w-3.5 h-3.5 text-spider-powder animate-pulse" />
          <span>SECTION 05 // ACTIVE INVESTIGATIONS</span>
        </div>
        <h2
          data-spider-hover
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
        >
          CURRENT INTERESTS <span className="text-spider-powder">//</span> RESEARCH
        </h2>
        <p className="font-mono text-xs sm:text-sm text-spider-powder/80 tracking-wider">
          EVOLVING HORIZONS, INTELLECTUAL CURIOSITIES & CREATIVE EXPLORATIONS
        </p>
      </div>

      {/* Grid of Research Investigation Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeInvestigationsData.map((inv, index) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            onMouseEnter={() => soundManager.playClick()}
            className="group relative p-6 rounded-3xl glass-panel-interactive border border-white/10 flex flex-col justify-between space-y-4 text-left overflow-hidden"
            data-cursor
            data-cursor-text="INSPECT"
          >
            {/* Top Bar with Code & Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-spider-lavender tracking-widest font-bold">
                {inv.code}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase"
                style={{
                  backgroundColor: `${inv.accent}15`,
                  color: inv.accent,
                  border: `1px solid ${inv.accent}40`,
                }}
              >
                {inv.status}
              </span>
            </div>

            {/* Title & Summary */}
            <div className="space-y-2">
              <h3
                data-spider-hover
                className="font-display font-bold text-xl text-white group-hover:text-spider-lavender transition-colors flex items-center justify-between"
              >
                <span>{inv.title}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-spider-rose group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {inv.summary}
              </p>
            </div>

            {/* Bottom Status Pulse */}
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <div
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: inv.accent }}
              />
              <span>TELEMETRY RECORDED // LIVE EXPLORATION</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
