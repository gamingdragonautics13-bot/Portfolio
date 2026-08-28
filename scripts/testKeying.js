import fs from 'fs';
import { parseGIF, decompressFrames } from 'gifuct-js';

const buf = fs.readFileSync('public/assets/hologram-spider-animation.gif');
const gif = parseGIF(buf);
const frames = decompressFrames(gif, true);

let totalPixels = 0;
let transparentPixels = 0;
let spiderPixels = 0;

// Test frame 10
const frame = frames[10];
const patch = frame.patch;

for (let i = 0; i < patch.length; i += 4) {
  const r = patch[i];
  const g = patch[i + 1];
  const b = patch[i + 2];
  
  totalPixels++;
  // Calculate brightness / distance from black
  const brightness = Math.max(r, g, b);
  if (brightness < 20) {
    transparentPixels++;
  } else {
    spiderPixels++;
  }
}

console.log('Frame 10 Analysis:');
console.log('Total pixels:', totalPixels);
console.log('Transparent (background) pixels:', transparentPixels, `(${((transparentPixels/totalPixels)*100).toFixed(1)}%)`);
console.log('Spider (visible) pixels:', spiderPixels, `(${((spiderPixels/totalPixels)*100).toFixed(1)}%)`);
