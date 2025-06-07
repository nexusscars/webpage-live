const fs = require('fs');
const path = require('path');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const excludeFolders = ['.git', 'node_modules', '.github'];

function walkDir(dir, fileCallback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (!excludeFolders.includes(f)) walkDir(dirPath, fileCallback);
    } else {
      fileCallback(path.join(dir, f));
    }
  });
}

const imageFiles = [];
const allCode = [];

walkDir('.', file => {
  const ext = path.extname(file).toLowerCase();
  if (imageExtensions.includes(ext)) {
    imageFiles.push(file);
  } else if (['.html', '.js', '.css'].includes(ext)) {
    allCode.push(fs.readFileSync(file, 'utf8'));
  }
});

const fullCode = allCode.join('\n');

const unusedImages = imageFiles.filter(imgPath => {
  const fileName = path.basename(imgPath);
  return !fullCode.includes(fileName);
});

console.log('\nUnused image files:');
unusedImages.forEach(file => console.log(`🗑️  ${file}`));

if (unusedImages.length === 0) {
  console.log('\n✅ No unused images found.');
  process.exit(0);
} else {
  process.exit(1); // Fail job if unused images found
}
