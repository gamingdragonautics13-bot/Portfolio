import fs from 'fs';
import { parseGIF, decompressFrames } from 'gifuct-js';

const buf = fs.readFileSync('public/assets/hologram-spider-animation.gif');
const gif = parseGIF(buf);
const frames = decompressFrames(gif, true);

console.log('GIF Info:');
console.log('Frame count:', frames.length);
if (frames.length > 0) {
  console.log('Dimensions:', frames[0].dims);
  console.log('Delay (ms):', frames[0].delay);
  console.log('Sample pixels (first 10 RGBA):', Array.from(frames[0].patch.slice(0, 40)));
}
