const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const bentoStart = html.indexOf('{/* BENTO GRID */}');
const bentoEnd = html.indexOf('{/* Actions */}');

if (bentoStart !== -1 && bentoEnd !== -1) {
    fs.writeFileSync('bento_original.txt', html.substring(bentoStart, bentoEnd));
    console.log('Extracted to bento_original.txt');
} else {
    console.log('Not found');
}
