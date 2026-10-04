const babel = require('@babel/core');
const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const code = scriptMatch[1];
  try {
    babel.transformSync(code, {
      presets: ['@babel/preset-react']
    });
    console.log("No syntax errors found.");
  } catch (err) {
    console.log(err.message);
  }
}
