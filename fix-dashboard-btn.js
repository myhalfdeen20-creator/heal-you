const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

html = html.replace('Eksekusi Pemetaan Ulang', 'Mulai Ulang Refleksi');
html = html.replace('Ekspor Laporan Analisis', 'Simpan Catatan Perjalanan');

fs.writeFileSync('public/index.html', html);
