import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

async function main() {
  console.log('Starting dev server on port 5173...');
  const devServer = spawn('npx', ['vite', '--port', '5173'], {
    shell: true,
    cwd: process.cwd()
  });

  await new Promise(r => setTimeout(r, 2000));

  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 960 });

    // Set localStorage BEFORE any page script runs
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('patriot_unlocked', JSON.stringify([1, 2, 3, 4]));
      localStorage.setItem('patriot_completed', JSON.stringify([1, 2, 3]));
      localStorage.setItem('patriot_lang', 'by');
    });

    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));

    // Navigate to Quest view
    const navButtons = await page.$$('header nav button');
    for (const b of navButtons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text.includes('Квэст') || text.includes('Квест')) {
        await b.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 600));

    // Click Epoch 4 button (2024 / Космас)
    const buttons = await page.$$('button');
    let epoch4Found = false;
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text.includes('2024') || text.includes('Космас') || text.includes('Космос')) {
        console.log('Found Epoch 4 tab:', text.trim());
        await b.click();
        epoch4Found = true;
        break;
      }
    }
    if (!epoch4Found) {
      console.warn('Epoch 4 button not found among buttons!');
    }
    await new Promise(r => setTimeout(r, 600));

    // Complete dialog steps to get into the 3D space docking minigame
    for (let i = 0; i < 8; i++) {
      const dialogBtn = await page.$('main button.bg-slate-900');
      if (dialogBtn) {
        console.log(`Clicking dialog next step ${i + 1}...`);
        await dialogBtn.click();
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // Wait for Three.js WebGL scene to load Earth, stars, ISS and Soyuz MS-25
    console.log('Waiting for 3D scene rendering...');
    await new Promise(r => setTimeout(r, 2500));

    // Capture screenshot of the 3D Cosmic Space Docking viewport
    await page.screenshot({ path: 'scripts/overdrive_3d_preview.png' });
    console.log('Saved preview to scripts/overdrive_3d_preview.png');

    // Trigger RCS Thrusters via keyboard ArrowUp and ArrowLeft
    await page.keyboard.press('ArrowUp');
    await new Promise(r => setTimeout(r, 150));
    await page.screenshot({ path: 'scripts/overdrive_3d_thruster.png' });
    console.log('Saved thruster preview to scripts/overdrive_3d_thruster.png');

    await browser.close();
  } finally {
    if (devServer.pid) {
      spawn('taskkill', ['/pid', devServer.pid.toString(), '/f', '/t'], { shell: true });
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
