const fs = require('fs');
const babel = require('@babel/standalone');

const html = fs.readFileSync('public/index.html', 'utf8');
const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const code = scriptMatch[1];
  try {
    babel.transform(code, { presets: ['react'] });
    console.log('Babel successfully compiled the code.');
  } catch (err) {
    console.error('Babel compilation failed:', err.message);
  }
} else {
  console.log('No babel script found.');
}
