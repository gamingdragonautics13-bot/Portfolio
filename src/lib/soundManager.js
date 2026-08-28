// Spider-Society Sound & Web Audio System

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = false;
    this.thwipAudio = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.thwipAudio = new Audio('/assets/thwip.mp3');
      this.thwipAudio.preload = 'auto';
      this.thwipAudio.volume = 0.65;
      this.initialized = true;
    } catch (err) {
      console.warn("Audio init fallback:", err);
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    if (enabled && !this.initialized) {
      this.init();
    }
  }

  getSoundEnabled() {
    return this.soundEnabled;
  }

  playThwip() {
    if (!this.soundEnabled) return;
    try {
      if (!this.thwipAudio) {
        this.init();
      }
      if (this.thwipAudio) {
        this.thwipAudio.currentTime = 0;
        this.thwipAudio.play().catch(e => {
          console.log("Audio play prevented:", e);
        });
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
