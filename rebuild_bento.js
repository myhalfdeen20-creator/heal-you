const fs = require('fs');

const bentoLines = fs.readFileSync('bento_original.txt', 'utf8').split('\n');
const getBlock = (startStr, endStr) => {
    let start = -1;
    let end = -1;
    for (let i = 0; i < bentoLines.length; i++) {
        if (bentoLines[i].includes(startStr)) {
            start = i;
            break;
        }
    }
    if (start === -1) return '';
    for (let i = start + 1; i < bentoLines.length; i++) {
        if (bentoLines[i].includes(endStr)) {
            end = i;
            break;
        }
    }
    if (end === -1) return '';
    return bentoLines.slice(start, end).join('\n') + '\n';
};

let mainTop = getBlock('{/* Main Identity', '<div className="w-full max-w-2xl mx-auto bg-white/60');
mainTop += '                            </div>\n'; // Close the glass-panel

let skala = getBlock('<div className="w-full max-w-2xl mx-auto bg-white/60', '{/* Dinamika Relasional');
// Make Skala its own card
skala = `                            {/* Skala Kedewasaan & Intensitas (Fase 2) */}
                            <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-10 sm:p-14 slide-up stagger-2 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                                <h3 className="text-xs font-bold text-slate-400 mb-6 tracking-widest uppercase relative z-10 text-center">Seberapa Kuat Resonansi Saat Ini?</h3>
                                ${skala.replace(/<\/div>\s*<\/div>\s*$/, '</div>\n                                </div>\n                            </div>\n')}`;
// Wait, the Skala block from original is wrapped in two extra divs?
// original Skala ends with </div> </div> before ` {/* Dinamika Relasional `.
// Let's just fix it manually.
let skalaContent = getBlock('<div className="w-full max-w-2xl mx-auto', '{/* Dinamika Relasional');
// Remove the trailing </div></div> that belonged to the outer Main Identity if needed.
// Actually, let's just use regex on the full file.
