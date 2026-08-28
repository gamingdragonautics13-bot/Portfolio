import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { soundManager } from '../../../lib/soundManager';
import { cn } from '../../../lib/utils';

/**
 * Skiper19 Component — SVG Dynamic Stroke Follow Scroll Progress
 * Adapted from Skiper UI (@skiper-ui/skiper19) for the Multiverse Roadmap.
 */

export default function Skiper19({ items = [], className = '' }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const strokeColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ['#f43f5e', '#c4b5fd', '#38bdf8', '#6ee7b7']
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full py-8 space-y-12 select-none', className)}
    >
      {/* Skiper19 Animated Dynamic SVG Web Path */}
      <div className="absolute inset-0 pointer-events-none overflow-visible flex justify-center z-0">
        <svg
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
          className="w-full h-full max-w-4xl opacity-80 filter drop-shadow-[0_0_12px_rgba(196,181,253,0.6)] drop-shadow-[0_0_24px_rgba(244,63,94,0.4)]"
          fill="none"
        >
          {/* Faint Guide Track */}
          <path
            d="M 50 0 Q 30 150, 50 250 T 50 500 T 50 750 L 50 800"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* Active Skiper19 Animated Drawing Stroke */}
          <motion.path
            d="M 50 0 Q 30 150, 50 250 T 50 500 T 50 750 L 50 800"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              pathLength,
            }}
          />
        </svg>
      </div>

      {/* Trajectory Milestone Cards Grid */}
      <div className="relative z-10 space-y-10 sm:space-y-14">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => soundManager.playClick()}
              className={`relative flex items-center justify-between md:justify-normal ${
                isEven ? 'md:flex-row-reverse' : ''
              } gap-6 sm:gap-10 group`}
            >
              {/* Center Multiverse Milestone Hub Node */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full glass-panel-glow border-2 border-spider-lavender flex items-center justify-center text-white z-20 group-hover:scale-125 group-hover:border-spider-red transition-all duration-300 shadow-[0_0_20px_rgba(196,181,253,0.5)]">
                <div className="w-2.5 h-2.5 rounded-full bg-spider-red animate-ping" />
              </div>

              {/* Trajectory Content Glass Card */}
              <div
                className="ml-12 sm:ml-0 w-full sm:w-[calc(50%-3rem)] p-6 sm:p-7 rounded-3xl glass-panel-interactive border border-white/10 text-left space-y-3.5 hover:border-spider-lavender/40 hover:shadow-spider-glow transition-all duration-300"
                data-cursor
                data-cursor-text="ROADMAP"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs font-bold text-spider-lavender tracking-wider uppercase">
                    {item.phase}
                  </span>
                  <span
                    className={cn(
                      'px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border',
                      item.status === 'IN PROGRESS'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                        : item.status === 'VISION'
                        ? 'bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                        : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                    )}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-spider-powder transition-colors">
                  {item.milestone}
                </h3>

                <p className="font-mono text-xs text-spider-rose flex items-center gap-1.5">
                  <span>LOC:</span>
                  <span className="text-slate-300">{item.institution}</span>
                </p>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
