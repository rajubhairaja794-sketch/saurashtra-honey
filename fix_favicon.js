import sharp from 'sharp';
import fs from 'fs';

async function fix() {
  const icoPath = 'public/favicon.ico';
  const stat = fs.statSync(icoPath);
  if (stat.size > 200 * 1024) {
    console.log("Optimizing favicon...");
    // Convert to 128x128 png, then just overwrite the ico (which browsers can still read as png if named ico, or we can just name it favicon.png and update index.html)
    // The safest is to resize it as a very small webp or png and rename the file.
    await sharp(icoPath).resize(128, 128).png().toFile('public/favicon.png');
    fs.unlinkSync(icoPath);
    console.log("Favicon optimized!");
  }
}
fix().catch(console.error);
