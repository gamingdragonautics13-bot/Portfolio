import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ExternalLink, Sparkles, Film, Image as ImageIcon, Eye } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';

export default function PhotoArchive({ onTriggerWebTransition }) {
  const handleOpenCarousel = () => {
    soundManager.playThwip();
    onTriggerWebTransition?.(personalInfo.photographyArchiveUrl);
  };

  return (
    <section id="archive" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-widest uppercase">
          <Camera className="w-3.5 h-3.5 text-spider-rose animate-pulse" />
          <span>SECTION 04 // DAILY BUGLE SPECIAL ASSIGNMENT</span>
        </div>
        <h2
          data-spider-hover
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
        >
          DAILY BUGLE <span className="text-spider-red">//</span> PHOTO ARCHIVE
        </h2>
        <p className="font-mono text-xs sm:text-sm text-spider-powder/80 tracking-wider">
          URBAN COMPOSITION, VISUAL NARRATIVES & SPIDER-MAN PERSPECTIVES
        </p>
      </div>

      {/* Main Photographic Archive Dossier Container */}
      <div className="relative rounded-3xl p-6 sm:p-10 glass-panel-glow border-2 border-white/15 overflow-hidden text-left space-y-8">
        {/* Background Film Perforations Effect */}
        <div className="absolute top-0 inset-x-0 h-4 flex items-center justify-around opacity-20 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-2 h-2.5 rounded-sm bg-white" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Column: Visual Storytelling Statement & Action */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-spider-red/20 text-spider-rose border border-spider-red/30 font-mono text-xs font-bold uppercase">
              <Film className="w-3.5 h-3.5" />
              <span>PRESS PHOTOGRAPHER DOSSIER // SHUVARTHI DAS</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              "Capturing moments between the rooftops — where city rhythms meet light and shadow."
            </h3>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Beyond engineering code and AI logic, photography is my core medium for observing perspectives, framing architecture, capturing vibrant human moments, and crafting aesthetic color stories.
            </p>

            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-spider-lavender/20 flex items-center justify-center text-spider-lavender shrink-0">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-spider-lavender font-bold block">
                  DAILY BUGLE CAROUSEL FEED
                </span>
                <span className="text-xs text-slate-400">
                  Full multi-shot editorial galleries, street compositions & cinematic portraits.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleOpenCarousel}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-spider-red via-rose-600 to-indigo-600 shadow-spider-red hover:shadow-spider-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                data-cursor
                data-cursor-text="GALLERY"
              >
                <Sparkles className="w-4 h-4 text-spider-lavender group-hover:rotate-45 transition-transform" />
                <span>OPEN PHOTOGRAPHY CAROUSEL</span>
                <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Daily Bugle Darkroom Visual Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={handleOpenCarousel}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden glass-panel border border-white/20 p-3 group cursor-pointer shadow-2xl hover:border-spider-lavender/50 transition-all duration-300"
              data-cursor
              data-cursor-text="EXPAND"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={personalInfo.assets.idCard}
                  alt="Daily Bugle Archive Folder"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />

                {/* Darkroom Red Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-spider-red/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Hover CTA Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-spider-red flex items-center justify-center text-white mb-2 shadow-spider-red">
                    <Eye className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="font-display font-bold text-sm text-white">VIEW CAROUSEL ARCHIVE</span>
                  <span className="font-mono text-[10px] text-spider-powder">THWIP TRANSITION →</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-slate-400 px-1">
                <span>DAILY BUGLE ARCHIVE #2026</span>
                <span className="text-spider-rose font-bold">CLICK TO EXPLORE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Film Perforations Effect */}
        <div className="absolute bottom-0 inset-x-0 h-4 flex items-center justify-around opacity-20 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-2 h-2.5 rounded-sm bg-white" />
          ))}
        </div>
      </div>
    </section>
  );
}
