import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, Linkedin, Github, Instagram, Copy, Check, ExternalLink, Radio, MessageSquare } from 'lucide-react';
import { personalInfo, socialNodes } from '../data/portfolioData';
import { soundManager } from '../lib/soundManager';

const ICON_MAP = {
  Linkedin: Linkedin,
  Github: Github,
  Instagram: Instagram,
  Mail: Mail,
  Phone: Phone,
};

export default function OpenChannel({ onTriggerWebTransition }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSocialClick = (url) => {
    soundManager.playThwip();
    onTriggerWebTransition?.(url);
  };

  return (
    <section id="channel" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-spider-lavender/30 text-xs font-mono text-spider-lavender tracking-widest uppercase">
          <Radio className="w-3.5 h-3.5 text-spider-red animate-pulse" />
          <span>SECTION 07 // SECURE COMMUNICATION</span>
        </div>
        <h2
          data-spider-hover
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
        >
          OPEN CHANNEL <span className="text-spider-red">//</span> NETWORK NODES
        </h2>
        <p className="font-mono text-xs sm:text-sm text-spider-powder/80 tracking-wider">
          INITIATE CONTACT, COLLABORATE ON PROJECTS, OR CONNECT ACROSS PLATFORMS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Dispatch Transmission Card */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-white/15 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] text-spider-lavender tracking-widest uppercase block">
                  TRANSMISSION HUB
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  Let's Build Something Together
                </h3>
              </div>
              <span className="w-3 h-3 rounded-full bg-spider-mint animate-ping" />
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Whether you want to discuss technology, collaborate on an AI or web project, explore product ideas, or just talk Spider-Man and creative engineering — my channel is always open.
            </p>

            {/* Quick Copy Action Badges */}
            <div className="space-y-3 pt-2">
              {/* Email */}
              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-spider-red/20 flex items-center justify-center text-spider-red shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="font-mono text-[10px] text-slate-400 block tracking-wider uppercase">
                      EMAIL ADDRESS
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-mono text-xs sm:text-sm text-white hover:text-spider-lavender transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="p-2.5 rounded-xl glass-panel hover:glass-panel-glow border border-white/10 text-slate-300 hover:text-white shrink-0 transition-all"
                  title="Copy Email"
                  data-cursor
                  data-cursor-text="COPY"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-spider-mint" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-spider-powderBlue/20 flex items-center justify-center text-spider-powder shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="font-mono text-[10px] text-slate-400 block tracking-wider uppercase">
                      PHONE CONTACT
                    </span>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="font-mono text-xs sm:text-sm text-white hover:text-spider-lavender transition-colors truncate block"
                    >
                      +91 {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="p-2.5 rounded-xl glass-panel hover:glass-panel-glow border border-white/10 text-slate-300 hover:text-white shrink-0 transition-all"
                  title="Copy Phone"
                  data-cursor
                  data-cursor-text="COPY"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-spider-mint" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Spider-Society Network Nodes Grid */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <span className="font-mono text-xs text-spider-powder tracking-wider uppercase font-bold block mb-2">
            SELECT A NETWORK NODE TO CONNECT:
          </span>

          <div className="space-y-3">
            {socialNodes.map((node) => {
              const IconComp = ICON_MAP[node.icon] || ExternalLink;
              return (
                <div
                  key={node.name}
                  onClick={() => handleSocialClick(node.url)}
                  className="p-4 sm:p-5 rounded-2xl glass-panel-interactive border border-white/10 flex items-center justify-between cursor-pointer group"
                  data-cursor
                  data-cursor-text="CONNECT"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${node.accent}18`,
                        color: node.accent,
                        border: `1px solid ${node.accent}33`,
                      }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-slate-400 block tracking-widest uppercase">
                        {node.thematicLabel}
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-spider-lavender transition-colors">
                        {node.name}
                      </h4>
                      <span className="font-mono text-xs text-slate-400">
                        {node.handle}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full glass-panel border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-spider-lavender transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
