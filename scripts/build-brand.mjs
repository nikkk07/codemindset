/**
 * Generates the raster brand assets from the confirmed logo geometry:
 *   app/icon.svg, app/apple-icon.png, app/favicon.ico,
 *   public/brand/codemindset-logo-512.png, public/brand/codemindset-mark.svg,
 *   public/og/default.png (1200×630 social image).
 *
 * The outputs are committed, so builds do not run this script. Re-run it only when the logo changes:
 *   npm run brand
 * Text in the social image is rendered with the Inter typeface (the logo's font), which must be
 * installed locally (fontconfig). sharp is a devDependency.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = (...p) => path.join(root, ...p);

const C = {
  purple: '#8B5CF6',
  purple600: '#7C3AED',
  purple800: '#5B21B6',
  ink: '#0B0B0F',
  text: '#44414D',
  white: '#FFFFFF',
  tint: '#F4F0FF',
};

/** Logo mark paths in their original coordinate space (x 20–380, y 18–190). */
const MARK = `<path d="M20 76 L124 31 L124 65 L66 91 L124 117 L124 151 L20 106 Z"/><path d="M380 76 L276 31 L276 65 L334 91 L276 117 L276 151 L380 106 Z"/><path d="M231 18 L267 18 L169 190 L133 190 Z"/>`;

/** Square icon: the mark centred on a rounded tile. */
const squareIcon = (size, { bg = C.white, fill = C.purple, radius = 0.22 } = {}) => {
  const pad = 0.14; // of the side
  const inner = 1 - pad * 2;
  const scale = (inner * 400) / 360; // in a 400-unit square
  const markH = 172 * scale;
  const tx = 400 * pad - 20 * scale;
  const ty = (400 - markH) / 2 - 18 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 400 400">${
    bg ? `<rect width="400" height="400" rx="${400 * radius}" fill="${bg}"/>` : ''
  }<g fill="${fill}" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})">${MARK}</g></svg>`;
};

const brand = out('public', 'brand');
await fs.mkdir(brand, { recursive: true });
await fs.mkdir(out('public', 'og'), { recursive: true });

// Vector mark and browser icon.
await fs.writeFile(
  path.join(brand, 'codemindset-mark.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 18 360 172"><g fill="${C.purple}">${MARK}</g></svg>`,
);
await fs.writeFile(out('app', 'icon.svg'), squareIcon(64, { bg: C.tint }));

// Square logo for structured data (Google requires ≥112px).
await sharp(Buffer.from(squareIcon(512, { bg: C.white, radius: 0 })))
  .png()
  .toFile(path.join(brand, 'codemindset-logo-512.png'));
await sharp(Buffer.from(squareIcon(180, { bg: C.tint, radius: 0 })))
  .png()
  .toFile(out('app', 'apple-icon.png'));

// favicon.ico containing 16, 32 and 48 px PNGs.
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) =>
    sharp(Buffer.from(squareIcon(s, { bg: C.tint })))
      .png()
      .toBuffer(),
  ),
);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = Buffer.concat(
  pngs.map((png, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i] % 256, 0);
    e.writeUInt8(sizes[i] % 256, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  }),
);
await fs.writeFile(out('app', 'favicon.ico'), Buffer.concat([header, dir, ...pngs]));

// Social sharing image 1200×630.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.white}"/>
  <rect x="0" y="530" width="1200" height="100" fill="${C.purple800}"/>
  <g fill="${C.purple}" transform="translate(84 92) scale(0.36)">${MARK}</g>
  <text x="240" y="140" font-family="Inter Display, Inter" font-size="64" font-weight="600" fill="${C.ink}">CodeMindset</text>
  <text x="242" y="180" font-family="Inter" font-size="20" font-weight="500" letter-spacing="5" fill="${C.text}">THINK IN ALGORITHM</text>
  <text x="84" y="330" font-family="Inter Display, Inter" font-size="66" font-weight="700" fill="${C.ink}">Websites, apps &amp; software</text>
  <text x="84" y="412" font-family="Inter Display, Inter" font-size="66" font-weight="700" fill="${C.purple600}">that grow your business.</text>
  <text x="84" y="590" font-family="Inter" font-size="28" font-weight="600" fill="${C.white}">Indian IT services company  ·  www.codemindset.in</text>
</svg>`;
await sharp(Buffer.from(og))
  .png()
  .toFile(out('public', 'og', 'default.png'));

console.log('Brand assets written.');
