const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const modernDataRegex = /const modernData = MODERN_RELEVANCE\[result\.primary\.id\] \|\| \{ validation: "", relevance: "" \};/;

const synthesisData = `const modernData = MODERN_RELEVANCE[result.primary.id] || { validation: "", relevance: "" };

            const SYNTHESIS_DATA = {
                primary: {
                    "khadijah": "Kamu memancarkan ketenangan, visi yang tajam, dan kemandirian seperti Khadijah, menjadi pilar kokoh tempat banyak orang bersandar.",
                    "saudah": "Kamu memiliki kelapangan dada dan keikhlasan luar biasa seperti Saudah, selalu mengutamakan kedamaian dan menghindari konflik yang tidak perlu.",
                    "aisyah": "Kamu dianugerahi rasa ingin tahu yang tinggi dan kecerdasan analitis seperti Aisyah, selalu haus akan pemahaman dan berani mencari kebenaran.",
                    "hafsah": "Kamu memegang teguh prinsip dengan ketegasan dan keberanian layaknya Hafsah, tidak ragu menetapkan batasan demi melindungi apa yang benar.",
                    "zainab_khuzaymah": "Kamu memiliki kelembutan hati dan empati yang sangat dalam seperti Zainab binti Khuzaymah, selalu tergerak untuk merangkul mereka yang terluka.",
                    "ummu_salamah": "Kamu memancarkan kematangan berpikir dan keanggunan intelektual seperti Ummu Salamah, mampu memberikan jalan keluar logis di saat-saat krisis.",
                    "zainab_jahsy": "Kamu adalah sosok yang sangat mandiri dan produktif seperti Zainab binti Jahsy, menemukan kebanggaan dan rasa syukur melalui karya nyata tanganmu sendiri.",
                    "juwairiyah": "Kamu memiliki ketangguhan dan kemampuan beradaptasi yang luar biasa seperti Juwairiyah, mampu mengubah krisis atau masa sulit menjadi titik balik yang membawa berkah.",
                    "ummu_habibah": "Kamu berdiri teguh di atas keyakinanmu seperti Ummu Habibah, rela menempuh jalan yang sunyi atau tidak populer demi mempertahankan prinsip hidupmu.",
                    "shafiyah": "Kamu memiliki kepekaan emosional tingkat tinggi dan kebesaran hati seperti Shafiyah, mampu mengubah rasa sakit masa lalu menjadi pemaafan dan kelembutan yang tulus.",
                    "maimunah": "Kamu adalah perekat yang tulus dan penuh dedikasi seperti Maimunah, senantiasa berbuat baik tanpa pamrih dan tanpa perlu menjadi pusat perhatian."
                },
                secondary: {
                    "khadijah": "Namun yang membuatmu istimewa adalah caramu merespons dinamika. Kamu menyeimbangkannya dengan naluri perlindungan dan kemandirian Khadijah, memastikan bahwa apa pun yang terjadi, kamu tetap memiliki pijakan yang aman.",
                    "saudah": "Namun yang membuatmu istimewa adalah caramu menghadapi dunia. Kamu membungkus energi tersebut dengan kelapangan dada dan selera humor layaknya Saudah, menjadikanmu sosok yang mudah didekati dan menyejukkan.",
                    "aisyah": "Namun yang membuatmu istimewa adalah caramu memproses situasi. Kamu melengkapinya dengan ketajaman analisis dan semangat kritis Aisyah, sehingga kamu tidak mudah terbawa arus tanpa memahami alasan logis di baliknya.",
                    "hafsah": "Namun yang membuatmu istimewa adalah caramu menjaga diri. Kamu membentenginya dengan ketegasan dan prinsip kuat layaknya Hafsah, memastikan bahwa energimu tidak dimanfaatkan oleh orang yang salah.",
                    "zainab_khuzaymah": "Namun yang membuatmu istimewa adalah caramu menyalurkan energi. Semuanya pada akhirnya bermuara pada empati dan kepedulian tulus layaknya Zainab binti Khuzaymah, di mana kamu selalu memprioritaskan rasa kemanusiaan.",
                    "ummu_salamah": "Namun yang membuatmu istimewa adalah caramu mengambil keputusan. Kamu membingkainya dengan nalar logis dan kematangan taktis Ummu Salamah, menjauhkanmu dari reaksi emosional yang gegabah.",
                    "zainab_jahsy": "Namun yang membuatmu istimewa adalah caramu berekspresi. Kamu mewujudkannya melalui kerja keras dan kemandirian Zainab binti Jahsy, lebih suka membuktikan diri lewat tindakan nyata dan karya.",
                    "juwairiyah": "Namun yang membuatmu istimewa adalah kelenturan mentalmu. Saat berhadapan dengan tembok buntu, kamu meminjam ketangguhan adaptasi Juwairiyah, mencari celah peluang dari setiap tantangan yang ada.",
                    "ummu_habibah": "Namun yang membuatmu istimewa adalah akar pijakanmu. Saat dunia memintamu berkompromi, kamu menarik garis batas tegas dengan keteguhan iman Ummu Habibah, menolak mengorbankan nilai dasar yang kamu yakini.",
                    "shafiyah": "Namun yang membuatmu istimewa adalah kapasitas batinmu. Di saat kamu berhak untuk marah atau kecewa, kamu memilih meresponsnya dengan kelembutan dan kebijaksanaan Shafiyah, menolak siklus energi negatif.",
                    "maimunah": "Namun yang membuatmu istimewa adalah caramu menjaga keharmonisan. Kamu melakukannya dengan ketulusan yang sunyi layaknya Maimunah, mengabdi pada kebaikan tanpa menuntut pengakuan atau validasi panggung."
                }
            };`;

html = html.replace(modernDataRegex, synthesisData);

const oldSecondaryTextRegex = /<p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Sifat Pendamping & Kemampuan Beradaptasi<\/p>\s*<h3 className="text-xl font-serif text-slate-700 mb-2">\{secondary\.name\}<\/h3>\s*<p className="text-sm text-slate-600 leading-relaxed font-medium">\s*Sistem arsitektur psikologismu juga didukung oleh modul <span className="font-semibold" style={{color: secondary\.hex}}>\{secondary\.epithet\}<\/span> layaknya karakteristik \{secondary\.name\.split\(' '\)\[0\]\}\.\s*<\/p>/;

const newSynthesisText = `<p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Perpaduan Harmoni Karaktermu</p>
                                        <h3 className="text-xl font-serif text-slate-700 mb-4">{mainName} <span className="text-slate-300 font-sans font-light mx-1">&</span> {secondary.name.split(' ')[0]}</h3>
                                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium text-justify hyphens-auto">
                                            <span style={{color: primary.hex}} className="font-semibold">{SYNTHESIS_DATA.primary[primary.id]}</span>{' '}
                                            <span style={{color: secondary.hex}} className="font-semibold">{SYNTHESIS_DATA.secondary[secondary.id]}</span>
                                        </p>`;

html = html.replace(oldSecondaryTextRegex, newSynthesisText);

fs.writeFileSync('public/index.html', html);
console.log('Synthesis implemented successfully');
