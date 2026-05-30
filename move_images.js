import fs from 'fs';
import path from 'path';

const srcDir = './images';
const destDir = './public/images';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach(file => {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  console.log(`Copied ${file}`);
});
