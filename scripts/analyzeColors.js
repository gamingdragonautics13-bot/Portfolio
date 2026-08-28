import fs from 'fs';
import { parseGIF, decompressFrames } from 'gifuct-js';

const buf = fs.readFileSync('public/assets/hologram-spider-animation.gif');
const gif = parseGIF(buf);
const frames = decompressFrames(gif, true);

// Check corners and edges which are guaranteed background
const sampleCorners = [
  0, // top-left
  (480 - 1) * 4, // top-right
  (270 - 1) * 480 * 4, // bottom-left
  (270 * 480 - 1) * 4 // bottom-right
];

console.log('Corner pixel values in frame 0:');
for (const idx of sampleCorners) {
  console.log(`Pixel at ${idx}: [R:${frames[0].patch[idx]}, G:${frames[0].patch[idx+1]}, B:${frames[0].patch[idx+2]}, A:${frames[0].patch[idx+3]}]`);
}

// Find min and max RGB for spider
let minSpiderR = 255, maxSpiderR = 0;
let minSpiderG = 255, maxSpiderG = 0;
let minSpiderB = 255, maxSpiderB = 0;

for (let i = 0; i < frames[0].patch.length; i += 4) {
  const r = frames[0].patch[i];
  const g = frames[0].patch[i+1];
  const b = frames[0].patch[i+2];
  if (Math.max(r, g, b) > 25) {
    minSpiderR = Math.min(minSpiderR, r);
    maxSpiderR = Math.max(maxSpiderR, r);
    minSpiderG = Math.min(minSpiderG, g);
    maxSpiderG = Math.max(maxSpiderG, g);
    minSpiderB = Math.min(minSpiderB, b);
    maxSpiderB = Math.max(maxSpiderB, b);
  }
}

console.log(`Spider RGB ranges: R(${minSpiderR}-${maxSpiderR}), G(${minSpiderG}-${maxSpiderG}), B(${minSpiderB}-${maxSpiderB})`);
