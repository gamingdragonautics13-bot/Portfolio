import React from 'react';
import { useTheme } from '../lib/ThemeContext';
import { personalInfo } from '../data/portfolioData';

export default function PortfolioBodyBackground() {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* DARK MODE: Global Fixed Project Section Background Video */}
      {isDark && (
        <div className="w-full h-full relative opacity-30 mix-blend-screen transition-opacity duration-700">
          <video
            src={personalInfo.assets.projectBgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter contrast-115 brightness-110"
          />
          {/* Ambient Lighting & Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-spider-bg/60 via-transparent to-spider-bg/85" />
        </div>
      )}

      {/* LIGHT MODE: Pastel Red + Pastel Blue Atmospheric Atmosphere */}
      {!isDark && (
        <div className="w-full h-full relative opacity-60 transition-opacity duration-700">
          <div className="absolute top-1/4 -left-40 w-[650px] h-[650px] bg-rose-200/40 rounded-full blur-3xl" />
          <div className="absolute top-2/3 -right-40 w-[700px] h-[700px] bg-sky-200/45 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-3xl" />
        </div>
      )}

      {/* Spider Society Web Grid Overlay */}
      <div className="absolute inset-0 spider-grid-pattern opacity-25 pointer-events-none" />
    </div>
  );
}
