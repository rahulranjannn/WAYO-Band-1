import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const files = fs.readdirSync(publicDir);

async function processImages() {
    for (const file of files) {
        if (file.endsWith('.png')) {
            const filePath = path.join(publicDir, file);
            const name = path.parse(file).name;

            let width = 1200;
            let quality = 80;

            if (file.includes('hero')) {
                width = 1600;
            } else if (file.includes('logo') || file.includes('favi')) {
                width = 400;
            }

            // Default version
            await sharp(filePath)
                .resize({ width, withoutEnlargement: true })
                .webp({ quality })
                .toFile(path.join(publicDir, `${name}.webp`));

            // Mobile version for srcset
            if (width >= 1200) {
                await sharp(filePath)
                    .resize({ width: 480 })
                    .webp({ quality: 75 })
                    .toFile(path.join(publicDir, `${name}-480.webp`));

                await sharp(filePath)
                    .resize({ width: 1080 })
                    .webp({ quality: 80 })
                    .toFile(path.join(publicDir, `${name}-1080.webp`));
            }
            console.log(`Processed ${file}`);
        }
    }
}

processImages().catch(console.error);
