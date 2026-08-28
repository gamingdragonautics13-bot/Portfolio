import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroJitterAnimation({ className = '' }) {
  const [replayKey, setReplayKey] = useState(0);

  const line1 = "SHUVARTHI";
  const line2 = "DAS";

  // Replay animation periodically or on interaction
  const triggerReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div
      onClick={triggerReplay}
      className={`relative inline-block cursor-pointer select-none space-y-1 sm:space-y-2 text-left ${className}`}
      title="Click to replay Jitter animation"
    >
      <h1 className="sr-only">SHUVARTHI DAS</h1>

      {/* LINE 1: SHUVARTHI */}
      <div className="flex flex-wrap items-baseline gap-x-0.5 sm:gap-x-1">
        {line1.split('').map((char, index) => (
          <motion.span
            key={`l1-${index}-${replayKey}`}
            initial={{
              opacity: 0,
              y: -30,
              scale: 0.2,
              rotate: (index % 2 === 0 ? -1 : 1) * 15,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 14,
              mass: 0.6,
              delay: index * 0.045, // Jitter staggered timing
            }}
            whileHover={{
              scale: 1.2,
              rotate: (index % 2 === 0 ? -12 : 12),
              y: -8,
              transition: { duration: 0.15 },
            }}
            className="inline-block font-glitch font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-none bg-gradient-to-r from-[#ff007f] via-[#a855f7] via-[#00d2ff] to-[#00f5a0] bg-clip-text text-transparent filter drop-shadow-[0_0_16px_rgba(255,0,127,0.7)] drop-shadow-[0_0_28px_rgba(0,210,255,0.7)]"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* LINE 2: DAS */}
      <div className="flex flex-wrap items-baseline gap-x-0.5 sm:gap-x-1">
        {line2.split('').map((char, index) => (
          <motion.span
            key={`l2-${index}-${replayKey}`}
            initial={{
              opacity: 0,
              y: -30,
              scale: 0.2,
              rotate: (index % 2 === 0 ? 1 : -1) * 15,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 14,
              mass: 0.6,
              delay: (line1.length + index) * 0.045, // Stagger follows Line 1
            }}
            whileHover={{
              scale: 1.25,
              rotate: (index % 2 === 0 ? 12 : -12),
              y: -8,
              transition: { duration: 0.15 },
            }}
            className="inline-block font-glitch font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-none bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#ff007f] bg-clip-text text-transparent filter drop-shadow-[0_0_16px_rgba(0,210,255,0.7)] drop-shadow-[0_0_28px_rgba(255,0,127,0.7)]"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
