const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const resultVarsRegex = /const \{ primary, secondary, radarData \} = result;/;
const resultVarsReplacement = `const { primary, secondary, radarData, scores } = result;
            const lowestChar = scores && scores.length > 0 ? scores[scores.length - 1] : null;
            const lowestCharArch = lowestChar ? ARCHETYPES.find(a => a.id === lowestChar.id) : null;
            
            const BLIND_SPOT_DATA = {
                "khadijah": "Kamu mungkin terbiasa mengandalkan dirimu sendiri untuk segalanya. Namun, mandiri bukan berarti tidak butuh bantuan. Cobalah pinjam ketenangan Khadijah untuk berani mendelegasikan tugas dan membiarkan dirimu bersandar pada orang lain sesekali.",
                "saudah": "Dalam upayamu memegang kendali, kamu mungkin sering merasa tegang atau sulit memaafkan kesalahan kecil. Sesekali, pinjamlah kelapangan dada dan humor Saudah; belajarlah untuk mengalah dan menertawakan ketidaksempurnaan dunia.",
                "aisyah": "Di balik kematangan emosionalmu, tampaknya kamu sering menahan diri untuk bertanya atau meragukan sesuatu karena takut dianggap menyusahkan. Padahal, dunia ini membutuhkan rasa ingin tahumu. Cobalah pinjam sedikit keberanian Aisyah untuk sesekali bersuara, karena pertanyaanmu juga berharga.",
                "hafsah": "Kedermawanan hatimu sungguh indah, namun terkadang hal itu membuatmu lupa membangun batasan diri (boundaries). Jangan takut untuk berkata 'tidak'. Sesekali, gunakan ketegasan Hafsah untuk melindungi energi batinmu sendiri dari ekspektasi orang lain.",
                "zainab_khuzaymah": "Kekuatan logikamu sangat luar biasa, tapi hati-hati agar tidak membuatmu terasa dingin. Izinkan dirimu merasakan kerentanan. Pinjamlah kelembutan empati Zainab binti Khuzaymah untuk sesekali menyelami perasaan orang lain tanpa harus selalu memberikan solusi.",
                "ummu_salamah": "Kamu sangat perasa dan mudah terbawa oleh emosi atau kepanikan di sekitarmu. Saat badai datang, cobalah berhenti sejenak. Pinjamlah kematangan berpikir Ummu Salamah untuk mengambil jarak, berpikir taktis, dan tidak gegabah dalam merespons.",
                "zainab_jahsy": "Kamu banyak menghabiskan waktu memikirkan orang lain hingga melupakan karya dan potensimu sendiri. Sesekali, pinjamlah kemandirian Zainab binti Jahsy; temukan hobi, karya, atau kebanggaan dari apa yang bisa diciptakan oleh tanganmu sendiri.",
                "juwairiyah": "Rutinitas yang aman adalah zona nyamanmu, tapi dunia terus berubah. Ketika krisis atau hal tak terduga datang, jangan langsung menolak. Pinjamlah kelenturan mental Juwairiyah untuk melihat peluang dan berkah di balik setiap ujian.",
                "ummu_habibah": "Kamu sangat fleksibel dan mudah menyesuaikan diri, namun pastikan kamu tidak kehilangan warna aslimu demi diterima. Pinjamlah keteguhan iman Ummu Habibah; belajarlah untuk berani berdiri di atas prinsipmu sendiri, meski itu membuatmu berbeda.",
                "shafiyah": "Tampaknya kamu sering memendam luka atau menyimpan dendam terhadap masa lalu yang belum selesai. Hal ini sangat menguras batinmu. Pinjamlah kebesaran hati Shafiyah untuk memulai proses memaafkan; bukan demi mereka, tapi demi kebebasan jiwamu sendiri.",
                "maimunah": "Kamu mungkin terlalu fokus pada pencapaian individu atau pengakuan dari luar. Sesekali, turunlah dari panggung. Pinjamlah ketulusan sunyi Maimunah untuk melakukan satu kebaikan kecil tanpa nama, sekadar untuk merasakan kedamaian dari memberi tanpa pamrih."
            };
            const blindSpotText = lowestChar ? BLIND_SPOT_DATA[lowestChar.id] : "";
`;
html = html.replace(resultVarsRegex, resultVarsReplacement);

const maknaBoxRegex = /\{\/\* Makna Karakter \(Full width\) \*\/\}[\s\S]*?<\/div>/;

const replacementMaknaBox = `{/* Makna Karakter (Full width) */}
                            <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-10 sm:p-14 slide-up stagger-4 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                                <h3 className="text-xs font-bold text-slate-400 mb-5 tracking-widest uppercase relative z-10">Makna Karakter Ini Untuk Jati Dirimu Hari Ini</h3>
                                <p className="text-slate-700 text-base sm:text-xl leading-relaxed font-semibold relative z-10" style={{color: primary.hex}}>
                                    {modernData.relevance}
                                </p>
                            </div>

                            {/* Ruang Bertumbuh / Blind Spot (Full width) */}
                            {lowestCharArch && (
                                <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-10 sm:p-14 slide-up stagger-4 flex flex-col relative overflow-hidden bg-slate-800 border border-slate-700">
                                    <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{backgroundColor: lowestCharArch.hex}}></div>
                                    <h3 className="text-xs font-bold text-slate-400 mb-5 tracking-widest uppercase relative z-10 flex items-center gap-3">
                                        Pesan dari Ruang Sepi di Hatimu
                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">Ruang Bertumbuh</span>
                                    </h3>
                                    <p className="text-slate-200 text-base sm:text-xl leading-relaxed font-medium relative z-10">
                                        {blindSpotText}
                                    </p>
                                </div>
                            )}`;

html = html.replace(maknaBoxRegex, replacementMaknaBox);

fs.writeFileSync('public/index.html', html);
console.log('Blind Spot Phase 3 implemented');
