import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/images/motos';

const tasks = [
  'bajaj-pulsar-rs200-fi-abs.webp',
  'bajaj-pulsar-ns400z.webp',
  'bajaj-pulsar-ns160-fi-abs.webp',
  'bajaj-pulsar-n160-pro.webp',
  'bajaj-pulsar-n125-fi.webp',
];

async function main() {
  for (const name of tasks) {
    const fp = path.join(dir, name);
    if (!fs.existsSync(fp)) { console.log(name + ': NOT FOUND'); continue; }
    const oldSize = fs.statSync(fp).size;
    const img = sharp(fp);
    const meta = await img.metadata();
    const buf = await img.webp({ quality: 85, alphaQuality: 85, effort: 4 }).toBuffer();
    fs.writeFileSync(fp, buf);
    const newSize = fs.statSync(fp).size;
    const fmt = meta.format.toUpperCase();
    console.log(name + ': ' + fmt + ' ' + meta.width + 'x' + meta.height + ' ' + (oldSize/1024).toFixed(0) + 'KB -> WebP ' + (newSize/1024).toFixed(0) + 'KB');
  }
}
main().catch(e => console.error(e));
