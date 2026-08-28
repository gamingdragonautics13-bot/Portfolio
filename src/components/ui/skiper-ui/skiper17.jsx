import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Shield, Zap } from 'lucide-react';
import { cn } from '../../../lib/utils';

/**
 * Skiper17 Component — Stacking 3D Card Animation with GSAP ScrollTrigger
 * Adapted from Skiper UI (@skiper-ui/skiper17).
 */

const STATUS_COLORS = {
  'WORKING WITH': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'COMFORTABLE': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'EXPLORING': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'LEARNING': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
};

export const Skiper17CardStack = ({
  skills,
  onSkillClick,
  className = '',
}) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current.filter(Boolean);
      const totalCards = cardElements.length;

      if (totalCards === 0) return;

      // Initialize cards
      gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0, opacity: 1 });

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cardElements[i], { y: '60%', scale: 0.95, rotation: (i % 2 === 0 ? 3 : -3), opacity: 0.85 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 0.7,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.92,
            rotation: (i % 2 === 0 ? -3 : 3),
            opacity: 0.6,
            duration: 1,
            ease: 'power2.out',
          },
          i
        );

        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          i
        );
      }

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [skills] }
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full py-6 space-y-6', className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => onSkillClick(skill)}
            className="group relative p-6 rounded-2xl glass-panel-interactive border border-white/10 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-spider-lavender/40 hover:shadow-spider-glow text-left"
            data-cursor
            data-cursor-text="INSPECT"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                  NODE 0{i + 1}
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border',
                    STATUS_COLORS[skill.status] || 'bg-white/10 text-white'
                  )}
                >
                  {skill.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-white group-hover:text-spider-lavender transition-colors">
                {skill.name}
              </h3>

              <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
                {skill.desc}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-slate-400 group-hover:text-spider-rose transition-colors font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-spider-red" />
                <span>SPIDER-SENSE TELEMETRY</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Skiper17({ skills = [], onSkillClick }) {
  return (
    <div className="w-full">
      <Skiper17CardStack skills={skills} onSkillClick={onSkillClick} />
    </div>
  );
}
