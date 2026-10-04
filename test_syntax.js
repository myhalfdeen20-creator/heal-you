const babel = require('@babel/core');
const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Extract the script tag content
const scriptContent = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/)[1];

try {
  babel.transformSync(scriptContent, {
    presets: ['@babel/preset-react']
  });
  console.log("Syntax is VALID");
} catch (e) {
  console.error("Syntax ERROR:", e.message);
}
