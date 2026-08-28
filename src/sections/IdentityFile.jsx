import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Award, MapPin, GraduationCap, Calendar, Compass, ExternalLink, Camera, MousePointerClick } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';

export default function IdentityFile({ onTriggerWebTransition }) {
  const [tiltOffset, setTiltOffset] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltOffset({ x: x * 18, y: y * 18 });
  };

  const handleIdCardClick = () => {
    soundManager.playThwip();
    onTriggerWebTransition?.(personalInfo.photographyArchiveUrl);
  };

  return (
    <section id="identity" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-widest uppercase">
          <Shield className="w-3.5 h-3.5 text-spider-red" />
          <span>SECTION 01 // ARCHIVE DOSSIER</span>
        </div>
        <h2
          data-spider-hover
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
        >
          IDENTITY FILE <span className="text-spider-red">//</span> 013
        </h2>
        <p className="font-mono text-xs sm:text-sm text-spider-powder/80 tracking-wider">
          CORE BIOMETRICS, ACADEMIC ORIGIN & BUILDER PHILOSOPHY
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Daily Bugle Press Pass ID Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className="relative w-full max-w-sm aspect-[2/3] cursor-pointer group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              setIsCardHovered(true);
              soundManager.playScanPulse();
            }}
            onMouseLeave={() => {
              setIsCardHovered(false);
              setTiltOffset({ x: 0, y: 0 });
            }}
            onClick={handleIdCardClick}
            data-cursor
            data-cursor-text="OPEN PRESS"
          >
            {/* Interactive "CLICK ME" Floating Holographic Badge */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                scale: isCardHovered ? 1.08 : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-spider-red to-rose-600 text-white font-mono text-xs font-bold shadow-spider-red border border-white/40 tracking-wider"
            >
              <MousePointerClick className="w-3.5 h-3.5 animate-bounce" />
              <span>CLICK ME // VIEW CAROUSEL</span>
            </motion.div>

            {/* Glowing Backdrop behind ID Card */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-spider-red/30 via-spider-lavender/20 to-spider-blue/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* 3D Interactive Card Frame */}
            <motion.div
              animate={{
                rotateX: -tiltOffset.y,
                rotateY: tiltOffset.x,
              }}
              transition={{ type: 'spring', damping: 22, stiffness: 220, mass: 0.1 }}
              className="relative z-10 w-full h-full rounded-2xl overflow-hidden glass-panel-glow border-2 border-white/25 shadow-2xl p-2.5 flex flex-col"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Daily Bugle ID Card Image */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/95">
                <img
                  src={personalInfo.assets.idCard}
                  alt="Daily Bugle Official Press Pass — Shuvarthi Das"
                  className="w-full h-full object-contain filter contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Holographic Security Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-spider-lavender/20 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 hologram-overlay pointer-events-none" />

                {/* Click to Access Photo Archive Banner */}
                <div className="absolute bottom-2 inset-x-2 p-2 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-center flex items-center justify-center gap-2 text-white">
                  <Camera className="w-3.5 h-3.5 text-spider-red" />
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-spider-powder">
                    PHOTOGRAPHY ARCHIVE ACCESS →
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <p className="mt-4 font-mono text-[11px] text-slate-400 text-center tracking-wider">
            [TAP / CLICK ID CARD TO ACCESS DAILY BUGLE PHOTO CAROUSEL]
          </p>
        </div>

        {/* Right Column: Personal Narrative & Metadata Grid */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Main Story Narrative Card */}
          <div className="p-6 sm:p-8 rounded-2xl glass-panel-glow border border-white/15 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] text-spider-lavender tracking-widest uppercase">
                  CLASSIFICATION: OPERATIVE BUILDER
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  The Story of a Curious Builder
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-spider-lavender/10 text-spider-lavender font-mono text-xs border border-spider-lavender/20">
                CSE 2026–2030
              </span>
            </div>

            <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
              {personalInfo.narrative.intro}
            </p>

            <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
              {personalInfo.narrative.philosophy}
            </p>

            <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
              {personalInfo.narrative.mission}
            </p>

            {/* Core Pillars */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="font-mono text-[10px] text-slate-400 block">FOCUS 01</span>
                <span className="font-display font-bold text-xs text-spider-lavender">Full-Stack Web</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="font-mono text-[10px] text-slate-400 block">FOCUS 02</span>
                <span className="font-display font-bold text-xs text-spider-rose">AI Interfaces</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="font-mono text-[10px] text-slate-400 block">FOCUS 03</span>
                <span className="font-display font-bold text-xs text-spider-powder">Creative Tech</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="font-mono text-[10px] text-slate-400 block">FOCUS 04</span>
                <span className="font-display font-bold text-xs text-spider-mint">Photography</span>
              </div>
            </div>
          </div>

          {/* Academic & Origin Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Institution */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-spider-powder">
                <GraduationCap className="w-4 h-4" />
                <span className="font-mono text-xs tracking-wider uppercase font-bold">EDUCATION & CAMPUS</span>
              </div>
              <p className="font-display font-bold text-sm text-slate-100">
                Future Institute of Engineering and Management (FIEM)
              </p>
              <p className="font-mono text-xs text-slate-400">
                MAKAUT — Maulana Abul Kalam Azad University of Technology
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-spider-mint">
                <Calendar className="w-3.5 h-3.5" />
                <span>B.Tech CSE | 1st Year (2026–2030)</span>
              </div>
            </div>

            {/* Location & Coordinates */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-spider-rose">
                <MapPin className="w-4 h-4" />
                <span className="font-mono text-xs tracking-wider uppercase font-bold">BASE OF OPERATIONS</span>
              </div>
              <p className="font-display font-bold text-sm text-slate-100">
                Kolkata, West Bengal, India
              </p>
              <p className="font-mono text-xs text-slate-400">
                Sonarpur / Greater Kolkata Tech Corridor
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-spider-lavender">
                <Compass className="w-3.5 h-3.5" />
                <span>MULTIVERSE NODE: EARTH-1301</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
