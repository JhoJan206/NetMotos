import sharp from 'sharp';
import { readdirSync, renameSync, unlinkSync } from 'fs';
import { join, parse } from 'path';

const dir = 'public/images/motos';
const files = readdirSync(dir).filter(f => f.endsWith('.png'));
const skip = new Set(['azul-ybrz-2023.png']);

for (const file of files) {
  if (skip.has(file)) continue;
  const input = join(dir, file);
  const name = parse(file).name;
  const output = join(dir, `${name}.webp`);
  try {
    await sharp(input).webp({ quality: 85 }).toFile(output);
    console.log(`OK: ${file} -> ${name}.webp`);
  } catch (e) {
    console.log(`FAIL: ${file} - ${e.message}`);
  }
}

// Re-encode nx500 (JPEG saved as .webp)
const nx500 = join(dir, 'honda-nx500.webp');
const tmp = join(dir, 'honda-nx500.tmp');
renameSync(nx500, tmp);
try {
  await sharp(tmp).webp({ quality: 85 }).toFile(nx500);
  console.log('OK: honda-nx500.webp re-encoded');
} catch (e) {
  renameSync(tmp, nx500);
  console.log(`FAIL: honda-nx500.webp - ${e.message}`);
}
try { unlinkSync(tmp); } catch (_) {}

console.log('Done!');
