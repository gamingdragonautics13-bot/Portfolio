import React from 'react';
import { Radio, ArrowUp, Sparkles, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';

export default function Footer() {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-spider-bg/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand & Society Signature */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Radio className="w-4 h-4 text-spider-red animate-pulse" />
            <span className="font-glitch text-base tracking-wider uppercase bg-gradient-to-r from-[#ff3366] via-[#a855f7] via-[#38bdf8] to-[#34d399] bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(255,51,102,0.6)]">
              SHUVARTHI DAS
            </span>
            <span className="font-mono text-xs text-spider-lavender font-bold">// SPIDER-SOCIETY</span>
          </div>
          <p className="font-mono text-xs text-slate-400">
            FIEM Sonarpur // MAKAUT CSE (2026–2030) — Kolkata, India
          </p>
          <p className="font-mono text-[11px] text-spider-powder/80">
            "NOT JUST WRITING CODE. BUILDING EXPERIENCES."
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel-glow border border-spider-lavender/30 text-xs font-mono text-spider-lavender hover:text-white hover:border-spider-red/50 transition-all"
          data-cursor
          data-cursor-text="TOP"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
