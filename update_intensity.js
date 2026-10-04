const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Inject INTENSITY_DATA right after SYNTHESIS_DATA
const synthesisDataRegex = /const SYNTHESIS_DATA = \{[\s\S]*?\}\s*};\s*/;

const intensityData = `const INTENSITY_DATA = {
                "khadijah": {
                    high: "Tarikan energi Khadijah di dalam dirimu sangatlah kuat. Ingatlah, menjadi pilar bagi banyak orang itu melelahkan. Orang sekuat dirimu pun sangat berhak untuk memiliki ruang menangis dan bersandar.",
                    mod: "Binar ketenangan Khadijah mulai mekar dalam dirimu. Teruslah rawat kemandirianmu; pelan namun pasti, kamu sedang bertumbuh menjadi pondasi yang kokoh bagi sekitarmu."
                },
                "saudah": {
                    high: "Kapasitasmu mengalah sangat dominan. Namun ingatlah, menjaga perasaan orang lain tidak boleh dibayar dengan mengorbankan kebahagiaanmu sendiri. Kamu berhak menetapkan batas.",
                    mod: "Sikap lapang dada Saudah mulai mewarnai hari-harimu. Teruslah asah kedewasaan ini, karena kemampuan meredam ego adalah kunci kedamaian jangka panjang."
                },
                "aisyah": {
                    high: "Rasa ingin tahumu berdegup sangat kencang. Terkadang pikiran yang terlalu aktif bisa memicu kecemasan (overthinking). Berikan jeda untuk pikiranmu beristirahat dan nikmati ketenangan.",
                    mod: "Ketajaman nalar Aisyah sedang bertumbuh dalam dirimu. Teruslah bertanya dan mencari tahu; dunia selalu membutuhkan perempuan yang berani mencari kebenaran."
                },
                "hafsah": {
                    high: "Ketegasan prinsipmu sangat kokoh. Ingatlah bahwa tidak semua hal harus dilawan atau dipertahankan dengan keras. Sisakan sedikit ruang kompromi agar kamu tidak kehabisan energi.",
                    mod: "Keberanian Hafsah untuk bersuara mulai terbangun di dalam dirimu. Teruslah latih ketegasanmu, perlahan kamu akan mahir melindungi apa yang berharga bagimu."
                },
                "zainab_khuzaymah": {
                    high: "Empatimu meluap-luap. Sangat mudah bagimu untuk menyerap penderitaan orang lain hingga kamu sendiri kelelahan (compassion fatigue). Ingatlah untuk mengisi gelasmu sendiri sebelum menuangkannya.",
                    mod: "Benih kepedulian Zainab binti Khuzaymah mulai berakar kuat di hatimu. Teruslah rawat kepekaanmu; kebaikan-kebaikan kecilmu akan menjadi penyelamat bagi banyak orang."
                },
                "ummu_salamah": {
                    high: "Kematangan taktismu mendominasi. Saking rasionalnya, kadang kamu lupa memvalidasi perasaanmu sendiri. Izinkan dirimu untuk sesekali rapuh, tidak semua hal harus segera diselesaikan.",
                    mod: "Kebijaksanaan Ummu Salamah sedang mekar perlahan. Teruslah asah kemampuanmu melihat masalah dari berbagai sudut pandang; nalar jernihmu sedang dilatih."
                },
                "zainab_jahsy": {
                    high: "Daya dorong kemandirianmu sangat luar biasa. Namun, jangan sampai produktivitas menjadi satu-satunya sumber harga dirimu. Kamu tetap berharga meski sedang tidak melakukan apa-apa.",
                    mod: "Semangat kemandirian Zainab binti Jahsy mulai terlihat jelas. Teruslah berkarya dan temukan kebanggaan pada usahamu sendiri; kemandirian sejati sedang kamu bangun."
                },
                "juwairiyah": {
                    high: "Daya juang dan adaptasimu sangat pekat. Kamu sudah terbiasa melewati krisis, tapi ingatlah bahwa kamu tidak harus selalu dalam mode 'bertahan hidup' (survival mode). Izinkan dirimu bernapas lega.",
                    mod: "Ketangguhan mental Juwairiyah mulai terasah di dalam dirimu. Teruslah berlatih lentur menghadapi keadaan; setiap tantangan sedang membentukmu menjadi lebih kuat."
                },
                "ummu_habibah": {
                    high: "Keteguhan imanmu mengakar sangat dalam. Berada di jalan yang berbeda dengan mayoritas memang melelahkan dan sepi. Jangan lupa untuk mencari lingkungan yang satu frekuensi denganmu.",
                    mod: "Prinsip-prinsip Ummu Habibah mulai kokoh dalam pijakanmu. Teruslah berani tampil beda demi kebenaran; integritasmu sedang diuji dan ditempa menjadi lebih baik."
                },
                "shafiyah": {
                    high: "Kelembutan hatimu dalam memaafkan sangat mendominasi. Pastikan kebesaran hatimu tidak dimanfaatkan oleh orang yang sama berulang kali. Berdamai dengan masa lalu tidak berarti membiarkan dirimu terluka lagi.",
                    mod: "Kapasitas batin Shafiyah mulai meluas di hatimu. Teruslah latih seni melepaskan; setiap maaf yang kamu berikan sedang membebaskan jiwamu dari beban masa lalu."
                },
                "maimunah": {
                    high: "Dedikasimu tanpa pamrih sangat kuat. Saking tulusnya, kamu sering lupa mengapresiasi dirimu sendiri. Ingat, mengakui dan merayakan kebaikanmu sendiri bukanlah sebuah kesombongan.",
                    mod: "Ketulusan Maimunah mulai memancar dari setiap tindakanmu. Teruslah menjadi perekat kebaikan; peran-peran sunyimu kelak akan memberikan dampak yang sangat besar."
                }
            };
`;

const match = html.match(synthesisDataRegex);
if (match) {
    html = html.replace(match[0], match[0] + intensityData);
}

// 2. Replace the percentage bar UI
const percentageUIRegex = /<div className="w-full max-w-md mx-auto bg-white\/40 p-5 rounded-3xl border border-white backdrop-blur-sm relative z-10 shadow-\[0_8px_32px_-12px_rgba\(0,0,0,0\.05\)\]">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newPercentageUI = `<div className="w-full max-w-2xl mx-auto bg-white/60 p-6 sm:p-8 rounded-[2rem] border border-white backdrop-blur-md relative z-10 shadow-xl mt-4">
                                    <div className="flex flex-col mb-6">
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Skala Kedewasaan & Intensitas</span>
                                            <div className="text-right">
                                                <span className="text-3xl font-black leading-none" style={{color: primary.hex}}>{primary.matchPercentage || 0}%</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-slate-200/50 rounded-full overflow-hidden h-3 shadow-inner">
                                            <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: \`\${primary.matchPercentage || 0}%\`, backgroundColor: primary.hex }}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-100/50">
                                        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed text-left sm:text-justify hyphens-auto">
                                            {(primary.matchPercentage >= 85) ? INTENSITY_DATA[primary.id].high : INTENSITY_DATA[primary.id].mod}
                                        </p>
                                    </div>
                                </div>
                            </div>`;

html = html.replace(percentageUIRegex, newPercentageUI);

fs.writeFileSync('public/index.html', html);
console.log('Intensity Phase 2 implemented');
