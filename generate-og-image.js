import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgContent = fs.readFileSync(path.join(process.cwd(), 'public', 'og-image.svg'), 'utf8');

async function generateOGImage() {
  const publicDir = path.join(process.cwd(), 'public');
  
  await sharp(Buffer.from(svgContent))
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
    
  console.log('Generated og-image.png');
}

generateOGImage().catch(console.error);