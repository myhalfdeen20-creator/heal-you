const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

html = html.replace(
    'Pengumpulan Data: Blok {currentChunkIndex} dari {totalChunks}',
    'Bagian {currentChunkIndex} dari {totalChunks}'
);

html = html.replace(
    'Sedang menyusun laporan klinis berdasarkan arsitektur profilmu...',
    'Menyusun pemahaman tentang dirimu...'
); // just in case it exists.

fs.writeFileSync('public/index.html', html);
