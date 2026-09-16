import fs from 'fs';
import https from 'https';
import path from 'path';

const images = [
  {
    name: 'skaryna_portrait.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Francysk_Skaryna.jpg'
  },
  {
    name: 'cross_euphrosyne.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Cross_of_Euphrosyne_of_Polotsk.jpg'
  },
  {
    name: 'brest_fortress.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Brest_Hero-Fortress_Memorial_01.jpg'
  },
  {
    name: 'partisans_ww2.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Soviet_partisans_in_Belarus_1943.jpg'
  },
  {
    name: 'partizan_medal.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Medal_Partisan_of_the_Patriotic_War_1st_Class.png'
  },
  {
    name: 'vasilevskaya.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Marina_Vasilevskaya_%28March_2024%29.jpg'
  },
  {
    name: 'radio_sever.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sever_radio_front.jpg'
  }
];

const destDir = path.resolve('public/images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'PatriotByBot/1.0 (educational contest project; contact: student@edu.by)'
        }
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Status ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    );
    req.on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

for (const img of images) {
  const destPath = path.join(destDir, img.name);
  try {
    console.log(`Downloading ${img.name}...`);
    await download(img.url, destPath);
    console.log(`Saved ${img.name}`);
  } catch (err) {
    console.error(`Failed ${img.name}:`, err.message);
  }
}
