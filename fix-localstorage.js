const fs = require('fs');
let content = fs.readFileSync('public/index.html', 'utf8');

// Wrap localStorage.getItem
content = content.replace(
  "const savedState = localStorage.getItem('healyou_ummul_mukminin_state');\n                if (savedState) {\n                    try {\n                        const parsed = JSON.parse(savedState);",
  `let savedState = null;
                try {
                    savedState = localStorage.getItem('healyou_ummul_mukminin_state');
                } catch (e) {
                    console.error("Gagal mengakses localStorage", e);
                }
                if (savedState) {
                    try {
                        const parsed = JSON.parse(savedState);`
);

// Wrap localStorage.setItem
content = content.replace(
  "localStorage.setItem('healyou_ummul_mukminin_state', JSON.stringify(stateToSave));\n            };",
  `try {
                    localStorage.setItem('healyou_ummul_mukminin_state', JSON.stringify(stateToSave));
                } catch (e) {
                    console.error("Gagal menyimpan state", e);
                }
            };`
);

content = content.replace(
  "localStorage.removeItem('healyou_ummul_mukminin_state');",
  `try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}`
);

fs.writeFileSync('public/index.html', content);
console.log('Fixed localStorage try/catch');
