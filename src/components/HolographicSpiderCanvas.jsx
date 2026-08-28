import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spiderAnimationLoader } from '../lib/spiderAnimationLoader';

export default function HolographicSpiderCanvas() {
  const [frames, setFrames] = useState([]);
  const [clickSpiders, setClickSpiders] = useState([]);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Load GIF frames once
  useEffect(() => {
    spiderAnimationLoader.load().then((loadedFrames) => {
      if (loadedFrames && loadedFrames.length > 0) {
        setFrames(loadedFrames);
      }
    });
  }, []);

  // Global Animation Loop for Frame Stepping (runs ONLY when clickSpiders exist)
  const isAnyClickSpiderActive = clickSpiders.length > 0;

  useEffect(() => {
    if (frames.length === 0 || !isAnyClickSpiderActive) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    let lastTime = performance.now();
    const frameDelay = frames[0]?.delay || 60;

    const loop = (now) => {
      if (now - lastTime >= frameDelay) {
        currentFrameRef.current = (currentFrameRef.current + 1) % frames.length;
        lastTime = now;
      }
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [frames, isAnyClickSpiderActive]);

  // Helper to check if element or its parent contains readable text
  const isTextElement = (el) => {
    if (!el || el === document.body || el === document.documentElement) return false;
    const tagName = el.tagName ? el.tagName.toLowerCase() : '';
    const isTextTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'label', 'li', 'strong', 'em', 'b', 'i', 'code', 'small'].includes(tagName);
    const hasTextClass = el.className && typeof el.className === 'string' && (el.className.includes('font-') || el.className.includes('text-'));
    const hasDirectText = Array.from(el.childNodes || []).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);

    return isTextTag || hasTextClass || hasDirectText;
  };

  // Global Click Trigger for Spiders on Text
  useEffect(() => {
    const handleClick = (e) => {
      let target = e.target;
      while (target && target !== document.body && !isTextElement(target)) {
        target = target.parentElement;
      }

      if (target && target !== document.body) {
        const clickId = Date.now() + Math.random();
        const newClickSpider = {
          id: clickId,
          x: Math.max(10, Math.min(window.innerWidth - 110, e.clientX - 45)),
          y: Math.max(10, Math.min(window.innerHeight - 80, e.clientY - 45)),
          angle: (Math.random() - 0.5) * 45,
        };

        setClickSpiders((prev) => [...prev.slice(-4), newClickSpider]);

        setTimeout(() => {
          setClickSpiders((prev) => prev.filter((s) => s.id !== clickId));
        }, 2200);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (frames.length === 0 || clickSpiders.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Click-Triggered Crawling Spiders (Appears ONLY when clicking text, then smoothly disappears) */}
      <AnimatePresence>
        {clickSpiders.map((spider) => (
          <ClickSpiderItem
            key={spider.id}
            spider={spider}
            frames={frames}
            currentFrame={currentFrameRef.current}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Subcomponent for each click-triggered crawling spider
function ClickSpiderItem({ spider, frames, currentFrame }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || frames.length === 0) return;
    const curCanvas = frames[currentFrame % frames.length]?.canvas;
    if (curCanvas) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(curCanvas, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [currentFrame, frames]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, x: spider.x, y: spider.y, rotate: spider.angle }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.4, 1.1, 1, 0.7],
        x: spider.x + (Math.random() - 0.5) * 50,
        y: spider.y - 30,
      }}
      transition={{ duration: 2.1, ease: 'easeInOut' }}
      className="absolute w-28 h-16 pointer-events-none"
      style={{
        filter: 'drop-shadow(0 0 15px rgba(244, 63, 94, 0.8)) drop-shadow(0 0 25px rgba(56, 189, 248, 0.85))',
      }}
    >
      <canvas
        ref={canvasRef}
        width={480}
        height={270}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
