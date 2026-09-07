const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
async function run() {
  const files = fs.readdirSync('public/avatars').filter(f => f.endsWith('.png'));
  for (const f of files) {
    try {
      const img = await loadImage('public/avatars/' + f);
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const buf = canvas.toBuffer('image/png');
      fs.writeFileSync('public/avatars/' + f, buf);
      console.log('Converted', f);
    } catch(e) {
      console.log('Error', f, e);
    }
  }
}
run();
