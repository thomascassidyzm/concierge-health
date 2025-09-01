import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 512, name: 'icon-512x512.png' }
];

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#0a0a0a"/>
  <path d="M256 440c-4.8 0-9.6-1.6-12.8-4.8C232 425.6 128 332.8 128 243.2c0-56 40-99.2 92.8-99.2 24 0 46.4 9.6 67.2 27.2 20.8-17.6 43.2-27.2 67.2-27.2 52.8 0 92.8 43.2 92.8 99.2 0 89.6-104 182.4-115.2 192-3.2 3.2-8 4.8-12.8 4.8z" fill="#FFE500"/>
</svg>`;

async function generateFavicons() {
  const publicDir = path.join(process.cwd(), 'public');
  
  for (const { size, name } of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name}`);
  }
  
  console.log('All favicons generated successfully!');
}

generateFavicons().catch(console.error);