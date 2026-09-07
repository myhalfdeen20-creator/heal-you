const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const regex = /\{savedIndex > 0 \? \([\s\S]*?\) : \([\s\S]*?(<button onClick=\{onStart\}[\s\S]*?Mulai Perjalananmu[\s\S]*?<\/button>)[\s\S]*?\)\}/;
html = html.replace(regex, '$1');

fs.writeFileSync('public/index.html', html);
console.log('Fixed button');
