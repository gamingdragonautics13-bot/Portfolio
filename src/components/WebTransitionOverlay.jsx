import React, { useEffect, useRef } from 'react';
import { soundManager } from '../lib/soundManager';

export default function WebTransitionOverlay({ isTransitioning, onComplete, targetUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isTransitioning) return;

    soundManager.playThwip();
    const canvas = canvasRef.current;
    if (!canvas) {
      const timer = setTimeout(() => onComplete?.(targetUrl), 450);
      return () => clearTimeout(timer);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const maxFrames = 22;
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight;
    const targets = [
      { x: 0, y: 0 },
      { x: window.innerWidth * 0.25, y: 0 },
      { x: window.innerWidth * 0.5, y: 0 },
      { x: window.innerWidth * 0.75, y: 0 },
      { x: window.innerWidth, y: 0 },
      { x: 0, y: window.innerHeight * 0.4 },
      { x: window.innerWidth, y: window.innerHeight * 0.4 },
      { x: 0, y: window.innerHeight * 0.7 },
      { x: window.innerWidth, y: window.innerHeight * 0.7 },
      { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    ];

    let animId;
    const render = () => {
      frame++;
      const progress = Math.min(frame / 12, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw web strands
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = `rgba(244, 63, 94, ${0.9 - progress * 0.3})`;
      ctx.shadowColor = '#c4b5fd';
      ctx.shadowBlur = 12;

      targets.forEach((target) => {
        const curX = startX + (target.x - startX) * progress;
        const curY = startY + (target.y - startY) * progress;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // Connect cross strands
        if (progress > 0.5) {
          ctx.beginPath();
          ctx.arc(curX, curY, (progress - 0.5) * 8, 0, Math.PI * 2);
          ctx.fillStyle = '#bae6fd';
          ctx.fill();
        }
      });

      if (frame < maxFrames) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.(targetUrl);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isTransitioning, onComplete, targetUrl]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-spider-bg/30 backdrop-blur-xs transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10 px-4 py-2 rounded-full glass-panel-glow border border-spider-red/40 text-spider-lavender text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-spider-red">
        <span className="w-2 h-2 rounded-full bg-spider-red shadow-[0_0_8px_#f43f5e]" />
        <span>THWIP // TRAVERSING DIMENSIONS</span>
      </div>
    </div>
  );
}
