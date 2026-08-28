import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ExternalLink, Terminal, Shield, Zap, Globe, FlaskConical, Layers, Activity } from 'lucide-react';
import { projectsData, personalInfo } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';

export default function WebShooterFiles({ onTriggerWebTransition }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projectsData[activeProjectIndex];

  const handleSelectProject = (idx) => {
    soundManager.playClick();
    setActiveProjectIndex(idx);
  };

  const handleLaunchProject = (url) => {
    soundManager.playThwip();
    onTriggerWebTransition?.(url);
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Lighting Spheres */}
      <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-spider-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-spider-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-widest uppercase">
              <FlaskConical className="w-3.5 h-3.5 text-spider-red animate-pulse" />
              <span>SECTION 03 // MULTIVERSE LAB CONTAINER</span>
            </div>
            <h2
              data-spider-hover
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
            >
              WEB-SHOOTER FILES <span className="text-spider-rose">//</span> 07 NODES
            </h2>
            <p className="font-mono text-xs sm:text-sm text-spider-powder/80 tracking-wider">
              OPERATIONAL SOFTWARE, INTERACTIVE APPS & SPIDER-SOCIETY UTILITIES
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-spider-mint glass-panel px-3 py-1.5 rounded-full border border-spider-mint/30 self-start md:self-auto">
            <Activity className="w-3.5 h-3.5 animate-spin" />
            <span>7 OF 7 APPS LIVE & DEPLOYED</span>
          </div>
        </div>

        {/* Multiverse Universe Node Bar / Test Tube Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {projectsData.map((project, idx) => {
            const isSelected = activeProjectIndex === idx;
            return (
              <button
                key={project.id}
                onClick={() => handleSelectProject(idx)}
                className={`group relative flex-shrink-0 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 border text-left ${
                  isSelected
                    ? 'glass-panel-glow border-spider-lavender shadow-spider-glow scale-[1.03]'
                    : 'glass-panel border-white/10 hover:border-white/25 opacity-75 hover:opacity-100'
                }`}
                data-cursor
                data-cursor-text="SWITCH"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? project.tubeAccent : '#94a3b8',
                    boxShadow: isSelected ? `0 0 10px ${project.tubeAccent}` : 'none',
                  }}
                />
                <div>
                  <span className="font-mono text-[9px] text-slate-400 block tracking-widest uppercase">
                    {project.universe}
                  </span>
                  <span className="font-display font-bold text-xs text-white group-hover:text-spider-lavender transition-colors">
                    {project.originalName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Laboratory Capsule / Project Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D Test Tube / Futuristic Lab Container */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            <div className="relative w-full max-w-sm test-tube-container p-6 flex flex-col items-center justify-between min-h-[420px] shadow-2xl">
              {/* Top Cap */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-spider-red animate-ping" />
                  <span className="font-mono text-[10px] text-spider-powder tracking-widest uppercase font-bold">
                    SPECIMEN: {activeProject.universe}
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeProject.status}
                </span>
              </div>

              {/* Center Hologram Energy Sphere & Project Badge */}
              <div className="my-8 flex flex-col items-center text-center space-y-4">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center relative transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle, ${activeProject.tubeAccent}33 0%, transparent 70%)`,
                    border: `1px solid ${activeProject.tubeAccent}66`,
                    boxShadow: `0 0 35px ${activeProject.tubeAccent}44`,
                  }}
                >
                  <Globe
                    className="w-12 h-12 animate-pulse"
                    style={{ color: activeProject.tubeAccent }}
                  />
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow" />
                </div>

                <div>
                  <span className="font-mono text-[11px] text-spider-lavender tracking-widest uppercase block">
                    {activeProject.number}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    {activeProject.originalName}
                  </h3>
                </div>
              </div>

              {/* Bottom Chamber Controls */}
              <div className="w-full pt-4 border-t border-white/15 text-center">
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  POWERED BY {activeProject.technologies[0]} // {activeProject.technologies[1]}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Holographic Project Dossier & Quick Launch Interface */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-white/15 space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-spider-lavender tracking-widest uppercase block">
                    CLASSIFICATION
                  </span>
                  <p className="font-display font-bold text-sm sm:text-base text-spider-powder">
                    {activeProject.classification}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
                  {activeProject.universe}
                </span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                {activeProject.themedName}
              </h3>

              <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                {activeProject.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[11px] text-spider-lavender tracking-wider uppercase font-bold block">
                  CORE CAPABILITIES // TELEMETRY:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeProject.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5 text-spider-red shrink-0" />
                      <span className="font-mono text-xs text-slate-200">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Stack Badges */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[11px] text-slate-400 tracking-wider uppercase font-bold block">
                  TECH STACK & DEPLOYMENT:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-spider-lavender/10 border border-spider-lavender/25 text-xs font-mono text-spider-lavender"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="font-mono text-[11px] text-slate-400">
                <span>TARGET: </span>
                <span className="text-spider-mint truncate max-w-xs inline-block align-bottom">
                  {activeProject.url}
                </span>
              </div>

              <button
                onClick={() => handleLaunchProject(activeProject.url)}
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-spider-red via-rose-600 to-indigo-600 shadow-spider-red hover:shadow-spider-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                data-cursor
                data-cursor-text="LAUNCH"
              >
                <Sparkles className="w-4 h-4 text-spider-lavender group-hover:rotate-45 transition-transform" />
                <span>ACCESS PROJECT // THWIP</span>
                <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
