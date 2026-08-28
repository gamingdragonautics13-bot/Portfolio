import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Sparkles, Zap } from 'lucide-react';
import { soundManager } from '../lib/soundManager';

export default function IntroSequence({ onEnter }) {
  const [stage, setStage] = useState(0); // 0: black screen / init, 1: web shoot, 2: name reveal, 3: ready to enter
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStage(3);
      return;
    }

    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnter = () => {
    soundManager.setSoundEnabled(true);
    soundManager.playThwip();
    soundManager.playBgMusic();
    onEnter();
  };

  const handleSkip = () => {
    soundManager.setSoundEnabled(true);
    soundManager.playBgMusic();
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#06070e] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Web-Shooter Video / Particle Grid */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <video
          src="/assets/web-intro.mp4"
          autoPlay
          muted
          playsInline
          loop
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Spider-Sense Aesthetic Grid Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-spider-bg/60 via-transparent to-spider-bg/90 pointer-events-none" />
      <div className="absolute inset-0 spider-grid-pattern opacity-30 pointer-events-none" />

      {/* Skip Intro Button */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={handleSkip}
          className="px-4 py-1.5 text-xs font-mono tracking-widest text-slate-400 hover:text-spider-lavender border border-slate-700/60 hover:border-spider-lavender/50 rounded-full glass-panel transition-all"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Central Sequence Content */}
      <div className="relative z-10 max-w-2xl w-full px-6 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="init"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="w-12 h-12 mx-auto rounded-full border border-spider-lavender/20 border-t-spider-red animate-spin" />
              <p className="font-mono text-xs text-spider-lavender/70 tracking-[0.3em] uppercase">
                CALIBRATING SPIDER-SOCIETY INTERFACE...
              </p>
            </motion.div>
          )}

          {stage >= 1 && stage < 3 && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-spider-red/40 bg-spider-red/10 text-spider-rose font-mono text-xs tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-spider-red animate-ping" />
                NEURAL PROTOCOL DETECTED // EARTH-1301
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-spider-lavender to-spider-powder">
                SHUVARTHI DAS
              </h1>

              <p className="font-mono text-sm sm:text-base text-spider-powder/80 tracking-[0.25em] uppercase">
                PORTFOLIO // 2026 EDITION
              </p>
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 flex flex-col items-center"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-spider-red via-spider-lavender to-spider-blue opacity-50 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
                
                <div className="relative p-6 rounded-2xl glass-panel-glow border border-white/15 max-w-lg">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-left">
                    <div>
                      <span className="font-mono text-[10px] text-spider-lavender/60 tracking-widest uppercase block">CLASSIFICATION</span>
                      <span className="font-display font-bold text-sm text-slate-100">B.TECH CSE BUILDER // FIEM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-spider-mint/20 text-spider-mint border border-spider-mint/30">
                      SYS ONLINE
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-50 tracking-tight mb-2">
                    SHUVARTHI DAS
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed text-balance">
                    "I turn ideas into interactive experiences — combining code, AI, design, and product thinking to build things worth exploring."
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={handleEnter}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-spider-red via-rose-600 to-indigo-600 shadow-spider-red hover:shadow-spider-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-spider-lavender group-hover:rotate-45 transition-transform" />
                  <span>ENTER THE SPIDER-VERSE</span>
                  <span className="font-mono text-xs text-white/70">→</span>
                </button>
              </div>

              <p className="font-mono text-[11px] text-slate-400 tracking-wider">
                HEADPHONES RECOMMENDED // INTERACTION ENABLED
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-500 pointer-events-none">
        <span>FIEM // MAKAUT (2026–2030)</span>
        <span className="hidden sm:inline">KOLKATA, WEST BENGAL</span>
        <span>LAT: 22.5726° N, 88.3639° E</span>
      </div>
    </motion.div>
  );
}
