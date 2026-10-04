const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// There are double </></> tags because of previous double replace.
html = html.replace(/<\/>\s*<\/>/g, '</>');

fs.writeFileSync('public/index.html', html);
console.log('Cleaned stray fragment tags');
