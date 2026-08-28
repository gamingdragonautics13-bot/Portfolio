import fs from 'fs';

const raw = fs.readFileSync('4-5.json', 'utf8');
const lottie = JSON.parse(raw);

console.log('Lottie properties:');
console.log('v:', lottie.v);
console.log('fr (frame rate):', lottie.fr);
console.log('ip (in point):', lottie.ip);
console.log('op (out point):', lottie.op);
console.log('w:', lottie.w, 'h:', lottie.h);
console.log('nm (name):', lottie.nm);
console.log('layers count:', lottie.layers?.length);
if (lottie.layers) {
  console.log('layer names:', lottie.layers.map(l => l.nm));
}
if (lottie.assets) {
  console.log('assets count:', lottie.assets.length);
  console.log('asset ids:', lottie.assets.map(a => a.id));
}
