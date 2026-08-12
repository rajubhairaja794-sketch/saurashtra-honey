import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpFiles = new Set();

function collectWebpFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) collectWebpFiles(path.join(dir, file.name));
    else if (file.name.endsWith('.webp')) webpFiles.add(file.name);
  }
}
collectWebpFiles(path.join(__dirname, 'src/assets'));
collectWebpFiles(path.join(__dirname, 'public/images'));

function updateReferences(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      if (file.name !== 'node_modules' && file.name !== 'dist' && file.name !== '.git') {
        updateReferences(path.join(dir, file.name));
      }
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.css') || file.name.endsWith('.html')) {
      const filePath = path.join(dir, file.name);
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      
      for (const webpFile of webpFiles) {
        const base = path.basename(webpFile, '.webp');
        const rePng = new RegExp(base + '\\.png', 'g');
        const reJpg = new RegExp(base + '\\.jpg', 'g');
        const reJpeg = new RegExp(base + '\\.jpeg', 'g');
        
        if (rePng.test(content) || reJpg.test(content) || reJpeg.test(content)) {
          content = content.replace(rePng, base + '.webp');
          content = content.replace(reJpg, base + '.webp');
          content = content.replace(reJpeg, base + '.webp');
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated references in ${filePath}`);
      }
    }
  }
}

updateReferences(path.join(__dirname, 'src'));
updateReferences(path.join(__dirname, 'public'));
