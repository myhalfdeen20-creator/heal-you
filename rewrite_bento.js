const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const bentoStart = html.indexOf('{/* BENTO GRID */}');
const bentoEnd = html.indexOf('{/* Actions */}');

if (bentoStart === -1 || bentoEnd === -1) {
    console.error('Bento grid not found');
    process.exit(1);
}

const bentoContent = html.substring(bentoStart, bentoEnd);

// 1. Extract pieces using regex / string splitting
// Main Identity Top (from start of Main Identity to just before Skala Kedewasaan)
const mainIdentityMatch = bentoContent.match(/\{\/\* Main Identity \(\w+.*?\*\/\}[\s\S]*?<div className="w-full max-w-2xl/);
if (!mainIdentityMatch) throw new Error("Main Identity not found");
let mainIdentityHTML = mainIdentityMatch[0].replace(/<div className="w-full max-w-2xl$/, '');
// Need to close the Main Identity div!
mainIdentityHTML += '                            </div>\n';

// Skala Kedewasaan
const skalaMatch = bentoContent.match(/<div className="w-full max-w-2xl[\s\S]*?\{\/\* Dinamika Relasional/);
if (!skalaMatch) throw new Error("Skala not found");
// Wrap it in its own glass-panel
let skalaHTML = `                            {/* Skala Kedewasaan & Intensitas (Fase 2) */}
                            <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-10 sm:p-14 slide-up stagger-2 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                                <h3 className="text-xs font-bold text-slate-400 mb-6 tracking-widest uppercase relative z-10 text-center">Seberapa Kuat Resonansi Saat Ini?</h3>
                                <div className="w-full max-w-2xl mx-auto relative z-10">
` + skalaMatch[0].replace(/\{\/\* Dinamika Relasional$/, '').replace(/<\/div>\s*<\/div>\s*$/, '</div>\n                                </div>\n                            </div>\n');

// Makna Karakter
const maknaMatch = bentoContent.match(/\{\/\* Makna Karakter \(\w+.*?\*\/\}[\s\S]*?(?=\{\/\* Ruang Bertumbuh)/);
if (!maknaMatch) throw new Error("Makna not found");
let maknaHTML = maknaMatch[0];

// Remove the duplicate Makna if any exists after Ruang Bertumbuh
let bentoWithoutDuplicateMakna = bentoContent.replace(/<h3 className="text-xs font-bold text-slate-400 mb-5 tracking-widest uppercase relative z-10">Makna Karakter Ini Untuk Jati Dirimu Hari Ini<\/h3>[\s\S]*?<\/div>\s*\{\/\* History/, '{/* History');

// Ruang Bertumbuh
const ruangMatch = bentoWithoutDuplicateMakna.match(/\{\/\* Ruang Bertumbuh[\s\S]*?(?=\{\/\* History)/);
if (!ruangMatch) throw new Error("Ruang not found");
let ruangHTML = ruangMatch[0];

// Dinamika Relasional & Kognitif
const dinamikaMatch = bentoContent.match(/\{\/\* Dinamika Relasional[\s\S]*?(?=\{\/\* Secondary Character)/);
if (!dinamikaMatch) throw new Error("Dinamika not found");
let dinamikaHTML = dinamikaMatch[0];

// Secondary Character
const secondaryMatch = bentoContent.match(/\{\/\* Secondary Character[\s\S]*?(?=\{\/\* Makna Karakter)/);
if (!secondaryMatch) throw new Error("Secondary not found");
let secondaryHTML = secondaryMatch[0];

// History
const historyMatch = bentoWithoutDuplicateMakna.match(/\{\/\* History\/Analysis Toggle[\s\S]*$/);
if (!historyMatch) throw new Error("History not found");
let historyHTML = historyMatch[0];

// Assemble new Bento
let newBento = `{/* BENTO GRID */}
                        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 relative z-10 pb-20">
${mainIdentityHTML}
${maknaHTML}
${skalaHTML}
${dinamikaHTML}
${secondaryHTML}
${ruangHTML}
${historyHTML}
`;

html = html.substring(0, bentoStart) + newBento + html.substring(bentoEnd);
fs.writeFileSync('public/index.html', html);
console.log('Restructured Bento Layout');
