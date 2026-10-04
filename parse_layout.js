const fs = require('fs');
const lines = fs.readFileSync('temp_layout.txt', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('className="glass-panel') || line.includes('<!--') || line.includes('{/*')) {
        console.log(`${i + 1051}: ${line.trim()}`);
    }
}
