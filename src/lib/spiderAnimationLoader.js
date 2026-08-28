import { parseGIF, decompressFrames } from 'gifuct-js';

class SpiderAnimationLoader {
  constructor() {
    this.frames = [];
    this.loaded = false;
    this.loadingPromise = null;
    this.width = 480;
    this.height = 270;
  }

  async load() {
    if (this.loaded) return this.frames;
    if (this.loadingPromise) return this.loadingPromise;

    this.loadingPromise = (async () => {
      try {
        const res = await fetch('/assets/hologram-spider-animation.gif');
        const buffer = await res.arrayBuffer();
        const gif = parseGIF(buffer);
        const rawFrames = decompressFrames(gif, true);

        // Process every frame to isolate spider and remove black background
        const processedFrames = rawFrames.map((frame) => {
          const { width, height } = frame.dims;
          this.width = width;
          this.height = height;

          // Clone patch
          const patch = new Uint8ClampedArray(frame.patch);

          for (let i = 0; i < patch.length; i += 4) {
            const r = patch[i];
            const g = patch[i + 1];
            const b = patch[i + 2];

            const brightness = Math.max(r, g, b);

            if (brightness < 12) {
              // Completely transparent for black background
              patch[i + 3] = 0;
            } else if (brightness < 36) {
              // Smooth anti-aliased edge transition
              const alphaFactor = (brightness - 12) / (36 - 12);
              patch[i + 3] = Math.round(255 * alphaFactor);
            } else {
              patch[i + 3] = 255;
            }
          }

          const imgData = new ImageData(patch, width, height);

          // Create an offscreen canvas for high-performance blitting
          const offscreen = document.createElement('canvas');
          offscreen.width = width;
          offscreen.height = height;
          const ctx = offscreen.getContext('2d');
          ctx.putImageData(imgData, 0, 0);

          return {
            canvas: offscreen,
            delay: frame.delay || 60,
          };
        });

        this.frames = processedFrames;
        this.loaded = true;
        return this.frames;
      } catch (err) {
        console.error('Error loading holographic spider GIF frames:', err);
        return [];
      }
    })();

    return this.loadingPromise;
  }

  getFrames() {
    return this.frames;
  }

  isLoaded() {
    return this.loaded;
  }
}

export const spiderAnimationLoader = new SpiderAnimationLoader();
