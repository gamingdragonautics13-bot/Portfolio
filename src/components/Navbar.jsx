import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Radio, Terminal, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/soundManager';
import Skiper4 from './ui/skiper-ui/skiper4';

const NAV_LINKS = [
  { label: 'IDENTITY', href: '#identity' },
  { label: 'ABILITIES', href: '#abilities' },
  { label: 'WEB FILES', href: '#projects' },
  { label: 'ARCHIVE', href: '#archive' },
  { label: 'INVESTIGATIONS', href: '#investigations' },
  { label: 'TRAJECTORY', href: '#trajectory' },
  { label: 'CHANNEL', href: '#channel' },
];

export default function Navbar({ onTriggerWebTransition }) {
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    soundManager.setSoundEnabled(nextState);
    if (nextState) {
      soundManager.playScanPulse();
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    soundManager.playClick();
    setMobileMenuOpen(false);

    const el = document.querySelector(href);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 bg-spider-bg/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Multiverse Node Status */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 group"
          data-cursor
          data-cursor-text="HOME"
        >
          <div className="relative w-8 h-8 rounded-lg glass-panel-glow border border-spider-lavender/30 flex items-center justify-center group-hover:border-spider-red/60 transition-colors">
            <Radio className="w-4 h-4 text-spider-red animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-spider-mint animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-glitch text-lg sm:text-xl tracking-wider uppercase bg-gradient-to-r from-[#ff3366] via-[#a855f7] via-[#38bdf8] to-[#34d399] bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(255,51,102,0.6)] drop-shadow-[0_0_22px_rgba(56,189,248,0.7)] group-hover:scale-105 transition-transform duration-300 inline-block">
                SHUVARTHI DAS
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-spider-red/20 text-spider-rose font-mono font-bold border border-spider-red/30 shadow-spider-red">
                1301
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-[0.22em] bg-gradient-to-r from-spider-rose via-spider-lavender to-spider-mint bg-clip-text text-transparent font-bold filter drop-shadow-[0_0_8px_rgba(196,181,253,0.6)] block uppercase">
              SPIDER-SOCIETY INTERFACE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full glass-panel border border-white/10 shadow-inner">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              data-cursor
              data-cursor-text="GOTO"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Skiper4 Theme Switcher + Sound Toggle + Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Skiper4 Animated Theme Switcher */}
          <Skiper4 />

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all border ${
              soundActive
                ? 'bg-spider-red/20 text-spider-rose border-spider-red/40 shadow-spider-red'
                : 'glass-panel text-slate-400 border-white/10 hover:text-slate-200'
            }`}
            data-cursor
            data-cursor-text="AUDIO"
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] hidden sm:inline">{soundActive ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg lg:hidden glass-panel border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-2 pb-6 glass-panel-glow border-b border-white/15 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3 rounded-xl font-mono text-xs tracking-widest text-slate-200 hover:bg-spider-red/15 hover:text-spider-lavender border border-transparent hover:border-spider-red/30 transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-spider-red text-[10px]">→</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
