import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from './soundManager';

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      return saved === 'light' ? 'light' : 'dark'; // Dark is default
    } catch {
      return 'dark';
    }
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
      console.warn('LocalStorage theme error:', e);
    }
  }, [theme]);

  const toggleTheme = (event) => {
    soundManager.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      setThemeState(nextTheme);
      return;
    }

    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? 0;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setThemeState(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: nextTheme === 'dark' ? clipPath.reverse() : clipPath,
        },
        {
          duration: 450,
          easing: 'ease-in-out',
          pseudoElement: nextTheme === 'dark' ? '::view-transition-old(root)' : '::view-transition-new(root)',
        }
      );
    });
  };

  const setTheme = (t) => {
    setThemeState(t === 'light' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
