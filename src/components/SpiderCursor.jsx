import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SpiderCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [trailPositions, setTrailPositions] = useState([]);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'interactive', 'project'
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      setTrailPositions((prev) => [
        { x: clientX, y: clientY, id: Date.now() },
        ...prev.slice(0, 5)
      ]);

      // Check hovered element
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setCursorState('hover');
        const customText = target.getAttribute('data-cursor-text') || '';
        setCursorText(customText);
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Web Trail nodes */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={pos.id || index}
          initial={{ opacity: 0.6, scale: 0.8 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-spider-lavender/50 shadow-[0_0_8px_#c4b5fd]"
        />
      ))}

      {/* Main Reticle */}
      <motion.div
        animate={{
          x: mousePosition.x - (cursorText ? 28 : 12),
          y: mousePosition.y - (cursorText ? 28 : 12),
          scale: cursorState === 'hover' ? 1.25 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.1 }}
        className={`absolute pointer-events-none rounded-full flex items-center justify-center transition-colors duration-200 ${
          cursorText
            ? 'w-14 h-14 bg-spider-red/80 backdrop-blur-md border border-white/40 shadow-spider-red'
            : cursorState === 'hover'
            ? 'w-6 h-6 border-2 border-spider-lavender bg-spider-red/20 shadow-spider-glow'
            : 'w-6 h-6 border border-spider-lavender/60 bg-transparent'
        }`}
      >
        {cursorText ? (
          <span className="font-mono text-[9px] font-bold text-white tracking-widest uppercase">
            {cursorText}
          </span>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-spider-red" />
        )}
      </motion.div>
    </div>
  );
}
