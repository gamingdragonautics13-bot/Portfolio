import React from 'react';
import { Compass } from 'lucide-react';
import { trajectoryData } from '../data/portfolioData';
import Skiper19 from '../components/ui/skiper-ui/skiper19';

export default function FutureTrajectory() {
  return (
    <section id="trajectory" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5 text-spider-lavender animate-pulse" />
          <span>SECTION 06 // MISSION TIMELINE</span>
        </div>
        <h2
          data-spider-hover
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
        >
          FUTURE TRAJECTORY <span className="text-spider-lavender">//</span> ROADMAP
        </h2>
        <p className="font-mono text-xs sm:text-sm text-spider-powder/80 tracking-wider">
          GROUNDED MILESTONES: FROM COMPUTER SCIENCE FOUNDATIONS TO VENTURE BUILDING
        </p>
      </div>

      {/* Skiper19 Animated Scroll-Following Dynamic Web Stroke & Milestone Nodes */}
      <Skiper19 items={trajectoryData} />
    </section>
  );
}
