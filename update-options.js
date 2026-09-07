const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

html = html.replace(/"Sangat Tidak Akurat"/g, '"Sangat Tidak Sesuai"');
html = html.replace(/"Kurang Akurat"/g, '"Kurang Sesuai"');
html = html.replace(/"Akurat"/g, '"Sesuai"');
html = html.replace(/"Sangat Akurat"/g, '"Sangat Sesuai"');

fs.writeFileSync('public/index.html', html);
