import fs from 'fs';
import https from 'https';
import path from 'path';

const filesToFind = [
  { file: 'File:Skaryna Bible.jpg', output: 'skaryna_bible.jpg' },
  { file: 'File:Cross of Euphrosyne of Polotsk 1.jpg', output: 'cross_euphrosyne.jpg' },
  { file: 'File:Brest Fortress Entrance.jpg', output: 'brest_fortress.jpg' },
  { file: 'File:Soviet partisans in Belarus 1944.jpg', output: 'partisans_ww2.jpg' },
  { file: 'File:Soviet partisan radio sever.jpg', output: 'radio_sever.jpg' },
  { file: 'File:BKA satellite model.jpg', output: 'bka_satellite.jpg' }
];

const destDir = path.resolve('public/images');

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'PatriotByBot/1.0 (student@edu.by)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'PatriotByBot/1.0 (student@edu.by)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function searchAndDownload(query, outputName) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
  const res = await getJson(searchUrl);
  if (!res.query || !res.query.pages) {
    console.log(`No search result for ${query}`);
    return false;
  }
  const pages = Object.values(res.query.pages);
  const info = pages[0]?.imageinfo?.[0];
  if (!info || !info.url) {
    console.log(`No url for ${query}`);
    return false;
  }
  console.log(`Found ${outputName}: ${info.url}`);
  await download(info.url, path.join(destDir, outputName));
  console.log(`Downloaded ${outputName}`);
  return true;
}

const queries = [
  { q: 'Francysk Skaryna', out: 'skaryna_woodcut.jpg' },
  { q: 'Cross of Euphrosyne of Polotsk', out: 'cross_euphrosyne.jpg' },
  { q: 'Brest Fortress', out: 'brest_fortress.jpg' },
  { q: 'Soviet partisans Belarus', out: 'partisans_ww2.jpg' },
  { q: 'Marina Vasilevskaya', out: 'vasilevskaya.jpg' },
  { q: 'Soyuz MS', out: 'soyuz_spacecraft.jpg' }
];

for (const item of queries) {
  try {
    await searchAndDownload(item.q, item.out);
  } catch (e) {
    console.error(`Error ${item.out}:`, e.message);
  }
}
