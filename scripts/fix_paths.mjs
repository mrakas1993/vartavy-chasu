import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = content
    .replace(/["']\/images\//g, (match) => match[0] + './images/')
    .replace(/["']\/favicon\.svg["']/g, (match) => match[0] + './favicon.svg' + match[match.length - 1]);
  if (content !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(ts|tsx|html|css|json)$/.test(entry.name)) {
      processFile(full);
    }
  }
}

walk('src');
if (fs.existsSync('index.html')) {
  processFile('index.html');
}
