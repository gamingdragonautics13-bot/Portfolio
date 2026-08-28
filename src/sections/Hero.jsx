import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, ArrowDownRight, Compass, ShieldCheck, Zap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';
import { useTheme } from '../lib/ThemeContext';
import HeroJitterAnimation from '../components/HeroJitterAnimation';

export default function Hero({ onTriggerWebTransition }) {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const handleHeroHover = () => {
    setIsHovered(true);
    soundManager.playScanPulse();
  };

  const handleExploreProjects = (e) => {
    e.preventDefault();
    onTriggerWebTransition?.('#projects');
    const el = document.getElementById('projects');
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-spider-bg transition-colors duration-500"
    >
      {/* DARK MODE: Hero Page Animation Background */}
      {isDark && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-35 mix-blend-screen transition-opacity duration-500">
          <img
            src={personalInfo.assets.heroPageAnimation}
            alt="Hero Page Animation Background"
            className="w-full h-full object-cover filter brightness-110 contrast-105"
          />
        </div>
      )}

      {/* LIGHT MODE: Pastel Red + Pastel Blue Background Atmosphere */}
      {!isDark && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-500">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-rose-300/35 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-24 w-[550px] h-[550px] bg-sky-300/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-100/60 rounded-full blur-3xl" />
        </div>
      )}

      {/* Pastel Atmosphere Spheres */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-spider-lavender/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-spider-red/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-spider-powderBlue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 spider-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & Brand Narrative */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status & Identification Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-glow border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-spider-red animate-ping" />
            <span>EARTH-1301 // SECTOR: KOLKATA</span>
            <span className="text-slate-500">|</span>
            <span className="text-spider-mint">FIEM CSE (2026–2030)</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <span className="block font-mono text-xs sm:text-sm text-spider-powder tracking-[0.3em] uppercase">
              // TECH ENTREPRENEUR & DEVELOPER
            </span>
            <HeroJitterAnimation className="-ml-1 sm:-ml-2" />
          </motion.div>

          {/* Subtitle / Focus Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-2 text-xs font-mono text-slate-300"
          >
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-spider-lavender">
              CSE STUDENT
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-spider-powder">
              AI SYSTEMS
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-spider-rose">
              WEB ARCHITECTURE
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-spider-mint">
              PRODUCT BUILDER
            </span>
          </motion.div>

          {/* Primary Brand Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl text-balance"
          >
            "{personalInfo.primaryBrandStatement}"
          </motion.p>

          {/* Supporting Tagline Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="p-3.5 rounded-xl glass-panel border border-spider-lavender/20 flex items-center gap-3 max-w-xl"
          >
            <Zap className="w-5 h-5 text-spider-red shrink-0 animate-pulse" />
            <p className="font-mono text-xs text-slate-300 tracking-wide">
              <span className="text-spider-lavender font-bold">TACTICAL DIRECTIVE:</span> FROM IDEAS TO INTERACTIVE EXPERIENCES.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={handleExploreProjects}
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-spider-red via-rose-600 to-indigo-600 shadow-spider-red hover:shadow-spider-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              data-cursor
              data-cursor-text="WEB FILES"
            >
              <Sparkles className="w-4 h-4 text-spider-lavender group-hover:rotate-45 transition-transform" />
              <span>EXPLORE WEB FILES // PROJECTS</span>
              <span className="text-xs font-mono text-white/70">→</span>
            </button>

            <a
              href="#identity"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs tracking-wider text-slate-300 hover:text-white glass-panel hover:glass-panel-glow border border-white/10 hover:border-spider-lavender/40 transition-all duration-200"
              data-cursor
              data-cursor-text="IDENTITY"
            >
              <span>IDENTITY FILE</span>
              <ArrowDownRight className="w-4 h-4 text-spider-lavender" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Glass Framed Portrait with Spider-Sense Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] flex items-center justify-center cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleHeroHover}
            onMouseLeave={() => {
              setIsHovered(false);
              setMouseOffset({ x: 0, y: 0 });
            }}
            data-cursor
            data-cursor-text="SHUVARTHI"
          >
            {/* Outer Radiating Spider-Sense Hover Tingle Animation Graphic */}
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.12, 1.05] : [1, 1.04, 1],
                opacity: isHovered ? 1 : 0.65,
                rotate: isHovered ? [0, 3, -2, 0] : 0,
              }}
              transition={{
                duration: isHovered ? 1.8 : 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-10 z-0 pointer-events-none flex items-center justify-center"
            >
              <img
                src={personalInfo.assets.spiderSenseHover}
                alt="Spider Sense Tingling Energy"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(244,63,94,0.6)] drop-shadow-[0_0_35px_rgba(196,181,253,0.8)] mix-blend-screen"
              />
            </motion.div>

            {/* 3D Tilt Glass Frame */}
            <motion.div
              animate={{
                rotateX: -mouseOffset.y,
                rotateY: mouseOffset.x,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.1 }}
              className="relative z-10 w-[84%] h-[90%] rounded-3xl p-3 glass-panel-glow border-2 border-white/20 shadow-2xl overflow-hidden group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Top Glass Badge */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-spider-lavender border border-white/10 uppercase">
                  BIOMETRIC PROFILE
                </span>
                <span className="px-2 py-0.5 rounded bg-spider-red/80 text-[10px] font-mono text-white font-bold animate-pulse">
                  ACTIVE
                </span>
              </div>

              {/* Portrait Photo */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-900">
                <img
                  src={personalInfo.assets.heroPhoto}
                  alt="Shuvarthi Das — Tech Entrepreneur & Developer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />

                {/* Glass Reflection & Hologram Scanline */}
                <div className="absolute inset-0 bg-gradient-to-t from-spider-bg via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 hologram-overlay pointer-events-none" />
              </div>

              {/* Bottom Card Footer */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-left">
                <p className="font-display font-bold text-sm text-white">SHUVARTHI DAS</p>
                <p className="font-mono text-[10px] text-spider-powder/80 tracking-wider">
                  CSE // TECH ENTREPRENEUR & DEVELOPER
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
