const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const historyToggleRegex = /\{\/\* History\/Analysis Toggle \(Full width\) \*\/\}/;

const newMaknaBox = `{/* Makna Karakter (Full width) */}
                            <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-10 sm:p-14 slide-up stagger-4 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                                <h3 className="text-xs font-bold text-slate-400 mb-5 tracking-widest uppercase relative z-10">Makna Karakter Ini Untuk Jati Dirimu Hari Ini</h3>
                                <p className="text-slate-700 text-base sm:text-xl leading-relaxed font-semibold relative z-10" style={{color: primary.hex}}>
                                    {modernData.relevance}
                                </p>
                            </div>

                            {/* History/Analysis Toggle (Full width) */}`;

html = html.replace(historyToggleRegex, newMaknaBox);
fs.writeFileSync('public/index.html', html);
console.log('Makna Karakter Box inserted');
