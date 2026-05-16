import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imageDirs = [
  'public/assets/images',
  'src/assets'
];

const MAX_WIDTH = 1920;
const QUALITY = 80;

async function compressImages() {
  for (const dir of imageDirs) {
    const fullPath = path.resolve(dir);
    if (!fs.existsSync(fullPath)) {
      console.log(`Directory ${dir} does not exist. Skipping...`);
      continue;
    }

    const files = fs.readdirSync(fullPath);
    for (const file of files) {
      const filePath = path.join(fullPath, file);
      const ext = path.extname(file).toLowerCase();

      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        try {
          const stats = fs.statSync(filePath);
          const originalSize = (stats.size / 1024 / 1024).toFixed(2);
          
          if (stats.size < 100 * 1024 && ext !== '.png') {
            // Skip small images unless they are PNGs (which we might want to optimize anyway)
            console.log(`Skipping small image: ${file} (${originalSize} MB)`);
            continue;
          }

          console.log(`Compressing ${file} (Original size: ${originalSize} MB)...`);

          const tempFilePath = filePath + '.tmp';
          const image = sharp(filePath);
          const metadata = await image.metadata();

          let pipeline = image;
          if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH);
          }

          if (ext === '.jpg' || ext === '.jpeg') {
            await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tempFilePath);
          } else if (ext === '.png') {
            await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(tempFilePath);
          } else if (ext === '.webp') {
            await pipeline.webp({ quality: QUALITY }).toFile(tempFilePath);
          }

          const newStats = fs.statSync(tempFilePath);
          const newSize = (newStats.size / 1024 / 1024).toFixed(2);

          if (newStats.size < stats.size) {
            fs.renameSync(tempFilePath, filePath);
            console.log(`Successfully compressed ${file}: ${originalSize} MB -> ${newSize} MB`);
          } else {
            fs.unlinkSync(tempFilePath);
            console.log(`Compression didn't reduce size for ${file}. Kept original.`);
          }
        } catch (error) {
          console.error(`Error compressing ${file}:`, error);
        }
      }
    }
  }
}

compressImages();
