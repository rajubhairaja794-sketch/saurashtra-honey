import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const dirs = ['src/assets', 'public/images/heritage', 'public/images/bg_illustrations', 'public/images/trust'];
  for (const dir of dirs) {
    const fullDir = path.join(__dirname, dir);
    if (!fs.existsSync(fullDir)) continue;
    
    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const filePath = path.join(fullDir, file);
        const stat = fs.statSync(filePath);
        if (stat.size > 200 * 1024) { // > 200kb
          const parsed = path.parse(filePath);
          const newPath = path.join(fullDir, parsed.name + '.webp');
          console.log(`Converting ${filePath} to webp...`);
          await sharp(filePath)
            .webp({ quality: 80, effort: 6 })
            .toFile(newPath);
          console.log(`Removing original ${filePath}...`);
          fs.unlinkSync(filePath);
        }
      }
    }
  }
}
optimizeImages().catch(console.error);
