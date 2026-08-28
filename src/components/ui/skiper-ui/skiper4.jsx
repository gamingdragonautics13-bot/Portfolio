import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../lib/ThemeContext';
import { cn } from '../../../lib/utils';

/**
 * Skiper4 Theme Toggle Component — Animated SVG theme toggler with Framer Motion.
 * Adapted from Skiper UI (@skiper-ui/skiper4).
 */

export const ThemeToggleButton2 = ({ className = '', onClick }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = (e) => {
    onClick?.(e);
    toggleTheme(e);
  };

  return (
    <button
      type="button"
      aria-label="Toggle Theme (Skiper4)"
      className={cn(
        'relative flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 border cursor-pointer select-none',
        isDark
          ? 'bg-slate-900/90 text-white border-spider-lavender/30 shadow-[0_0_15px_rgba(196,181,253,0.3)] hover:border-spider-red/60'
          : 'bg-white/95 text-slate-800 border-rose-300/80 shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:border-rose-400',
        className
      )}
      onClick={handleClick}
      data-cursor
      data-cursor-text={isDark ? 'LIGHT' : 'DARK'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="w-6 h-6"
      >
        <clipPath id="skiper-btn-2">
          <motion.path
            animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-2)">
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              rotate: isDark ? -100 : 0,
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
};

export const ThemeToggleButton3 = ({ className = '', onClick }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = (e) => {
    onClick?.(e);
    toggleTheme(e);
  };

  return (
    <button
      type="button"
      aria-label="Toggle Theme (Skiper4)"
      className={cn(
        'relative flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 border cursor-pointer select-none',
        isDark
          ? 'bg-slate-900/90 text-white border-spider-lavender/30 shadow-[0_0_15px_rgba(196,181,253,0.3)] hover:border-spider-red/60'
          : 'bg-white/95 text-slate-800 border-rose-300/80 shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:border-rose-400',
        className
      )}
      onClick={handleClick}
      data-cursor
      data-cursor-text={isDark ? 'LIGHT' : 'DARK'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="w-6 h-6"
      >
        <clipPath id="skiper-btn-3">
          <motion.path
            animate={{ y: isDark ? 14 : 0, x: isDark ? -11 : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            d="M0-11h25a1 1 0 0017 13v30H0Z"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-3)">
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
};

export default function Skiper4({ className = '' }) {
  const { isDark } = useTheme();

  return (
    <div className={cn('relative inline-flex items-center gap-2', className)}>
      <ThemeToggleButton2 className="w-10 h-10 p-2" />
      <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider uppercase opacity-75">
        {isDark ? 'NIGHT 🌃' : 'PASTEL 🎨'}
      </span>
    </div>
  );
}
