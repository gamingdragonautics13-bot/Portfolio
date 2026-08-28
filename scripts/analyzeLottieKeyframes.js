import fs from 'fs';

const raw = fs.readFileSync('4-5.json', 'utf8');
const lottie = JSON.parse(raw);

console.log('Lottie duration (frames):', lottie.op - lottie.ip, 'at', lottie.fr, 'fps =', (lottie.op - lottie.ip) / lottie.fr, 'seconds');
console.log('Number of layers:', lottie.layers?.length);

// Inspect first 5 layers with keyframes
for (let i = 0; i < Math.min(10, lottie.layers.length); i++) {
  const layer = lottie.layers[i];
  console.log(`Layer ${i} (${layer.nm || 'unnamed'}): type=${layer.ty}, inPoint=${layer.ip}, outPoint=${layer.op}`);
  if (layer.ks) {
    const ks = layer.ks;
    if (ks.o) console.log('  Opacity (o):', JSON.stringify(ks.o).slice(0, 100));
    if (ks.p) console.log('  Position (p):', JSON.stringify(ks.p).slice(0, 100));
    if (ks.s) console.log('  Scale (s):', JSON.stringify(ks.s).slice(0, 100));
    if (ks.r) console.log('  Rotation (r):', JSON.stringify(ks.r).slice(0, 100));
  }
}
