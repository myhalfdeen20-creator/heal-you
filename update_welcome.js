const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const welcomeIntroRegex = /<h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-700 mb-6 leading-\[1\.15\] tracking-tight">[\s\S]*?<\/h1>[\s\S]*?<\/header>[\s\S]*?<section className="slide-up stagger-2">[\s\S]*?<p className="text-slate-600 mb-16 leading-relaxed text-sm sm:text-base max-w-lg mx-auto font-medium">[\s\S]*?<\/p>/;

const newWelcomeIntro = `<h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-700 mb-6 leading-[1.15] tracking-tight">
                                Menemukan Kembali Jati Diri<br className="hidden sm:block" /> Melalui Teladan Ummul Mukminin
                            </h1>
                        </header>
                        
                        <section className="slide-up stagger-2">
                            <div className="space-y-4 text-slate-600 mb-12 leading-relaxed text-sm sm:text-base max-w-xl mx-auto font-medium">
                                <p>
                                    Di tengah derasnya ekspektasi dunia modern, tidak sedikit perempuan merasa kebingungan mencari bentuk sejati dari jati dirinya. Namun, Allah telah membentangkan petunjuk-Nya.
                                </p>
                                <p>
                                    Melalui 11 karakter Ummul Mukminin, kita ditunjukkan bahwa tidak ada satu definisi tunggal tentang "perempuan ideal". Ada yang intelektual, ada yang pebisnis, ada yang pengayom, dan ada yang pejuang. 
                                </p>
                                <p className="font-semibold text-slate-700 pt-2 border-t border-slate-200">
                                    Asesmen ini bukan sekadar tes kepribadian. Ini adalah perjalanan mengenali "kepingan jiwa" Anda yang serupa dengan teladan agung, untuk menguatkan kembali motivasi dan rasa percaya diri Anda sebagai seorang perempuan.
                                </p>
                            </div>`;

html = html.replace(welcomeIntroRegex, newWelcomeIntro);

const startBtnRegex = /<button onClick={onStart} className="btn-primary whitespace-nowrap w-full sm:w-auto px-10 py-4 rounded-\[2rem\] font-semibold flex items-center justify-center gap-3">\s*Mulai Perjalananmu <ArrowRightIcon aria-hidden="true" \/>\s*<\/button>/;
const newStartBtn = `<button onClick={onStart} className="btn-primary whitespace-nowrap w-full sm:w-auto px-10 py-4 rounded-[2rem] font-semibold flex items-center justify-center gap-3">
                                    Mulai Perjalanan Mengenal Diri <ArrowRightIcon aria-hidden="true" />
                                </button>`;
html = html.replace(startBtnRegex, newStartBtn);

fs.writeFileSync('public/index.html', html);
console.log('WelcomeScreen updated');
