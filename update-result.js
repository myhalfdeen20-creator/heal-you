const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

html = html.replace(
    'Arsitektur Sistemmu<br />Berpusat Pada',
    'Karakteristikmu<br />Beresonansi dengan'
);
html = html.replace(
    /Arsitektur_Psikologis_/g,
    'Catatan_Perjalanan_'
);
html = html.replace(
    'Dinamika Relasional & Eksekusi',
    'Dinamika Relasional & Keseharian'
);
html = html.replace(
    'Blueprint Klinis & Kognitif',
    'Kekuatan Kognitif & Emosional'
);

// We should also replace the background color and shadows in some glass panels to make it a bit warmer if possible.
// Currently it's rgba(255, 255, 255, 0.75). That's fine.

fs.writeFileSync('public/index.html', html);
console.log('ResultDashboard updated.');
