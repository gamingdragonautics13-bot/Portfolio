// Spider-Society Sound & Web Audio System with Background Music

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true; // SOUND ON BY DEFAULT
    this.thwipAudio = null;
    this.bgMusicAudio = null;
    this.initialized = false;
    this.listeners = new Set();

    if (typeof window !== 'undefined') {
      const handleFirstInteraction = () => {
        if (!this.initialized) {
          this.init();
        }
        if (this.soundEnabled) {
          this.playBgMusic();
        }
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
        window.removeEventListener('click', handleFirstInteraction);
      };

      window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
      window.addEventListener('keydown', handleFirstInteraction, { once: true });
      window.addEventListener('click', handleFirstInteraction, { once: true });
    }
  }

  init() {
    if (this.initialized) return;
    try {
      this.thwipAudio = new Audio('/assets/thwip.mp3');
      this.thwipAudio.preload = 'auto';
      this.thwipAudio.volume = 0.65;

      this.bgMusicAudio = new Audio('/assets/bg-music.mp3');
      this.bgMusicAudio.preload = 'auto';
      this.bgMusicAudio.loop = true;
      this.bgMusicAudio.volume = 0.35;

      this.initialized = true;
    } catch (err) {
      console.warn("Audio init fallback:", err);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.soundEnabled));
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    if (!this.initialized) {
      this.init();
    }
    if (enabled) {
      this.playBgMusic();
    } else {
      this.pauseBgMusic();
    }
    this.notify();
  }

  getSoundEnabled() {
    return this.soundEnabled;
  }

  playBgMusic() {
    try {
      if (!this.initialized) {
        this.init();
      }
      if (this.bgMusicAudio) {
        this.bgMusicAudio.play().catch(() => {
          // Autoplay policy prevented playback until interaction
        });
      }
    } catch (e) {
      // Graceful fallback
    }
  }

  pauseBgMusic() {
    try {
      if (this.bgMusicAudio) {
        this.bgMusicAudio.pause();
      }
    } catch (e) {
      // Graceful fallback
    }
  }

  playThwip() {
    if (!this.soundEnabled) return;
    try {
      if (!this.initialized) {
        this.init();
      }
      if (this.thwipAudio) {
        this.thwipAudio.currentTime = 0;
        this.thwipAudio.play().catch(() => {});
      }
    } catch (err) {
      console.warn("Sound play error:", err);
    }
  }

  playHoloBeep(freq = 600, type = 'sine', duration = 0.08) {
    if (!this.soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Graceful fallback
    }
  }

  playScanPulse() {
    this.playHoloBeep(880, 'triangle', 0.12);
  }

  playClick() {
    this.playHoloBeep(440, 'sine', 0.05);
  }
}

export const soundManager = new SoundManager();
