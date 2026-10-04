const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const openingDivs = (html.match(/<div/g) || []).length;
const closingDivs = (html.match(/<\/div/g) || []).length;

console.log(`Opening divs: ${openingDivs}`);
console.log(`Closing divs: ${closingDivs}`);
