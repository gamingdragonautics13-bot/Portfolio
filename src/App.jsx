import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './lib/ThemeContext';
import IntroSequence from './components/IntroSequence';
import SpiderCursor from './components/SpiderCursor';
import HolographicSpiderCanvas from './components/HolographicSpiderCanvas';
import WebTransitionOverlay from './components/WebTransitionOverlay';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import IdentityFile from './sections/IdentityFile';
import AbilityProfile from './sections/AbilityProfile';
import WebShooterFiles from './sections/WebShooterFiles';
import PhotoArchive from './sections/PhotoArchive';
import ActiveInvestigations from './sections/ActiveInvestigations';
import FutureTrajectory from './sections/FutureTrajectory';
import OpenChannel from './sections/OpenChannel';
import Footer from './components/Footer';
import PortfolioBodyBackground from './components/PortfolioBodyBackground';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [transitionState, setTransitionState] = useState({
    isTransitioning: false,
    targetUrl: null,
  });

  const handleTriggerWebTransition = (targetUrl) => {
    setTransitionState({
      isTransitioning: true,
      targetUrl: targetUrl || null,
    });
  };

  const handleTransitionComplete = (targetUrl) => {
    setTransitionState({
      isTransitioning: false,
      targetUrl: null,
    });

    if (targetUrl) {
      if (targetUrl.startsWith('#')) {
        const el = document.querySelector(targetUrl);
        if (el) {
          const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
      } else {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-spider-bg text-slate-100 overflow-x-hidden selection:bg-spider-red selection:text-white transition-colors duration-500">
        {/* Intro Cinematic Sequence */}
        <AnimatePresence>
          {showIntro && (
            <IntroSequence onEnter={() => setShowIntro(false)} />
          )}
        </AnimatePresence>

        {/* Global Interactive Elements */}
        <SpiderCursor />
        <HolographicSpiderCanvas />
        <WebTransitionOverlay
          isTransitioning={transitionState.isTransitioning}
          targetUrl={transitionState.targetUrl}
          onComplete={handleTransitionComplete}
        />

        {/* Main Portfolio Experience */}
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            <Navbar onTriggerWebTransition={handleTriggerWebTransition} />

            <main className="flex-grow">
              {/* SECTION 01: Hero with dedicated heroPageAnimation / Light atmosphere */}
              <Hero onTriggerWebTransition={handleTriggerWebTransition} />

              {/* REST OF PORTFOLIO: All sections with dedicated 'project section bg' background */}
              <div className="relative">
                <PortfolioBodyBackground />
                <div className="relative z-10 space-y-12 sm:space-y-16">
                  <IdentityFile onTriggerWebTransition={handleTriggerWebTransition} />
                  <AbilityProfile />
                  <WebShooterFiles onTriggerWebTransition={handleTriggerWebTransition} />
                  <PhotoArchive onTriggerWebTransition={handleTriggerWebTransition} />
                  <ActiveInvestigations />
                  <FutureTrajectory />
                  <OpenChannel onTriggerWebTransition={handleTriggerWebTransition} />
                </div>
              </div>
            </main>

            <Footer />
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}
