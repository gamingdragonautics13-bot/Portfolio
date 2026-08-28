import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code2, Layout, Sparkles, Camera, Database, ChevronRight, X, Layers, CheckCircle2 } from 'lucide-react';
import { abilitiesData } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';
import Skiper17 from '../components/ui/skiper-ui/skiper17';

const ICON_MAP = {
  Code2: Code2,
  Layout: Layout,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Camera: Camera,
  Database: Database,
};

const STATUS_COLORS = {
  'WORKING WITH': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'COMFORTABLE': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'EXPLORING': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'LEARNING': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
};

export default function AbilityProfile() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleSkillClick = (skill, categoryTitle) => {
    soundManager.playScanPulse();
    setSelectedSkill({ ...skill, category: categoryTitle });
  };

  return (
    <section id="abilities" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-widest uppercase">
          <Cpu className="w-3.5 h-3.5 text-spider-mint animate-pulse" />
          <span>SECTION 02 // SPIDER-SENSE DETECTED</span>
        </div>
        <h2
          data-spider-hover
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
        >
          ABILITY PROFILE <span className="text-spider-mint">//</span> TECH RADAR
        </h2>
        <p className="font-mono text-xs sm:text-sm text-spider-powder/80 tracking-wider">
          HONEST COMPETENCY MATRIX & CONTINUOUS LEARNING ARCHITECTURE (NO FAKE PERCENTAGES)
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {abilitiesData.map((cat, idx) => {
          const IconComponent = ICON_MAP[cat.icon] || Code2;
          const isActive = activeCategory === idx;
          return (
            <button
              key={cat.category}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(idx);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-spider-lavender/20 border-spider-lavender text-white shadow-spider-glow'
                  : 'glass-panel text-slate-400 border-white/10 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-spider-red' : 'text-slate-400'}`} />
              <span>{cat.category}</span>
            </button>
          );
        })}
      </div>

      {/* Skiper17 Animated Tech Radar Card Treatment */}
      <Skiper17
        skills={abilitiesData[activeCategory].skills}
        onSkillClick={(skill) => handleSkillClick(skill, abilitiesData[activeCategory].category)}
      />

      {/* Skill Detail Modal / Holographic Drawer */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-lg w-full p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-spider-lavender/40 shadow-2xl text-left space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-spider-lavender tracking-widest uppercase">
                    {selectedSkill.category}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                    {selectedSkill.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-2 rounded-full glass-panel border border-white/20 text-slate-300 hover:text-white hover:border-spider-red/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400">MASTERY TRAJECTORY:</span>
                <span
                  className={`px-2.5 py-1 rounded font-mono text-xs font-bold uppercase border ${
                    STATUS_COLORS[selectedSkill.status]
                  }`}
                >
                  {selectedSkill.status}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-mono text-[11px] text-spider-powder tracking-wider uppercase font-bold">
                  APPLIED OVERVIEW
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedSkill.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-[11px] text-slate-400">
                  SHUVARTHI DAS // ABILITY ARCHIVE
                </span>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-spider-red to-rose-600 font-display text-xs font-bold text-white shadow-spider-red"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
