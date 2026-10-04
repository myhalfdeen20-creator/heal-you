const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Insert MODERN_RELEVANCE inside ResultDashboard
const resultDashStartRegex = /const ResultDashboard = \(\{ result, userName, onReset, onViewGallery, isFading \}\) => \{/;

const modernRelevanceStr = `const ResultDashboard = ({ result, userName, onReset, onViewGallery, isFading }) => {
            const MODERN_RELEVANCE = {
                "khadijah": {
                    validation: "Karaktermu adalah bukti bahwa dunia membutuhkan perempuan yang visioner, mandiri, dan tangguh sepertimu.",
                    relevance: "Jika saat ini kamu merasa memikul beban yang berat atau sering diandalkan oleh banyak orang, ketahuilah bahwa ketenangan dan kemandirianmu adalah warisan dari Khadijah. Jangan ragu pada kapasitasmu untuk memimpin, berbisnis, atau menjadi pilar utama keluarga. Dunia yang penuh kecemasan ini sangat bergantung pada tempat bersandar yang kokoh seperti dirimu."
                },
                "saudah": {
                    validation: "Kelapangan dadamu membuktikan bahwa kedamaian lebih berharga daripada memenangkan ego.",
                    relevance: "Di dunia modern yang terus mendorong kita untuk berkompetisi dan membandingkan diri, sifat mengalahmu sering kali disalahpahami sebagai kelemahan. Padahal, itu adalah manifestasi dari keamanan batin yang luar biasa seperti Saudah. Teruslah menjadi peredam konflik; kehadiranmu merawat keharmonisan yang didambakan banyak orang."
                },
                "aisyah": {
                    validation: "Rasa ingin tahumu yang tajam adalah cahaya yang menerangi kegelapan dan kebodohan di sekitarmu.",
                    relevance: "Jika saat ini kamu merasa terlalu kritis atau sering banyak bertanya di masyarakat yang terkadang masih meremehkan intelektualitas perempuan, ingatlah Aisyah. Kecerdasan analitisnyalah yang menjadikannya rujukan ribuan sahabat. Jangan pernah meredupkan rasa ingin tahumu; arahkanlah semangat kritismu itu untuk menyebarkan ilmu dan kebenaran."
                },
                "hafsah": {
                    validation: "Ketegasan dan keberanianmu bersuara adalah perisai bagi kebenaran dan keadilan.",
                    relevance: "Perempuan yang memiliki pendirian kuat sering kali dilabeli 'keras kepala'. Namun, sifat itu merupakan warisan Hafsah yang bertugas menjaga orisinalitas wahyu. Jangan takut untuk menetapkan batas dan bersuara tegas ketika prinsipmu diusik. Ketegasanmu adalah bentuk perlindungan diri dan integritas yang sangat dibutuhkan hari ini."
                },
                "zainab_khuzaymah": {
                    validation: "Kepedulian dan kedermawananmu adalah kehangatan bagi mereka yang terlupakan oleh dunia.",
                    relevance: "Jika kamu sering merasa 'terlalu perasa' atau terlalu mudah iba melihat penderitaan orang lain, ketahuilah bahwa empati itu adalah anugerah terbesar dari Zainab binti Khuzaymah, sang 'Ibu Orang-Orang Miskin'. Di era yang semakin individualis, kepedulianmu adalah oase. Namun ingatlah untuk tetap mengisi cangkirmu sendiri sebelum menuangkannya untuk orang lain."
                },
                "ummu_salamah": {
                    validation: "Kematangan berpikirmu menunjukkan bahwa kecantikan sejati bersumber dari intelektualitas dan kebijaksanaan.",
                    relevance: "Dalam budaya yang sering kali hanya menilai perempuan dari penampilan fisik, ketajaman logikamu menembus batas itu. Ummu Salamah terbukti mampu memberikan jalan keluar taktis saat perjanjian Hudaibiyah yang menyelamatkan umat. Jangan ragu membagikan gagasan-gagasan brilianmu; dunia membutuhkan pemimpin perempuan dengan nalar jernih sepertimu."
                },
                "zainab_jahsy": {
                    validation: "Kemahiran dan kemandirian tanganmu adalah bukti kemuliaan rasa syukur yang nyata.",
                    relevance: "Jika kamu merasa puas ketika menciptakan sesuatu dengan tanganmu sendiri (karya, bisnis kecil, atau kerajinan), banggalah. Zainab binti Jahsy adalah perempuan mandiri yang gemar menyamak kulit untuk disedekahkan. Dedikasi pada keahlian dan pekerjaanmu tidak mengurangi kefemininanmu; justru itu adalah bentuk tertinggi dari pemberdayaan diri."
                },
                "juwairiyah": {
                    validation: "Ketangguhanmu menunjukkan bahwa dari sebuah krisis bisa lahir berkah yang mengubah sejarah.",
                    relevance: "Jika kamu pernah melalui masa transisi yang sulit atau kehilangan besar, lihatlah Juwairiyah. Dia kehilangan keluarganya dalam perang, namun ketangguhannya bernegosiasi membebaskan ratusan kaumnya. Jangan biarkan masa lalu atau status sosial mendefinisikanmu; kemampuanmu beradaptasi akan membuka jalan keselamatan bukan hanya untuk dirimu, tapi juga orang lain."
                },
                "ummu_habibah": {
                    validation: "Keteguhan prinsipmu membuktikan bahwa keyakinan lebih berharga daripada zona nyaman yang sementara.",
                    relevance: "Mungkin kamu pernah merasa sendirian karena memilih jalan prinsip yang berbeda dari keluarga atau lingkungan sekitarmu. Ummu Habibah rela hidup terasing di Habasyah (Ethiopia) demi menjaga akidahnya, meski ayahnya adalah penguasa Quraisy. Teruslah berpegang pada prinsip kebenaranmu; kesetiaanmu pada nilai luhur pada akhirnya akan membawamu pada kemenangan."
                },
                "shafiyah": {
                    validation: "Kemampuanmu mengelola trauma masa lalu menjadikanmu perempuan dengan kepekaan dan pemaafan yang agung.",
                    relevance: "Bagi kamu yang pernah terluka oleh prasangka atau kehilangan, Shafiyah mengajarkan seni berdamai dengan luka (trauma healing). Dia mampu memaafkan dan mengubah rasa sakit menjadi kelembutan yang tulus. Keberanianmu memutus rantai kebencian dan memilih untuk menyayangi adalah puncak dari kedewasaan emosional yang sangat langka."
                },
                "maimunah": {
                    validation: "Ketulusan dan dedikasimu tanpa pamrih adalah lem yang merekatkan kembali ikatan yang terputus.",
                    relevance: "Kamu mungkin tidak suka menjadi sorotan, tapi kamu selalu ada ketika seseorang membutuhkan dukungan nyata. Maimunah adalah sosok yang rela menyerahkan dirinya untuk Nabi sebagai simbol rekonsiliasi. Kebaikan hatimu yang tak bersyarat adalah pengikat persaudaraan; jangan pernah merasa bahwa kebaikan kecilmu tidak berdampak besar bagi dunia."
                }
            };
            const modernData = MODERN_RELEVANCE[result.primary.id] || { validation: "", relevance: "" };
`;
html = html.replace(resultDashStartRegex, modernRelevanceStr);

// Insert validation text
const validationRegex = /<p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto font-medium z-10 mb-8">\s*\{primary\.shortSummary\}\s*<\/p>/;
const validationStr = `<p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto font-medium z-10 mb-6">
                                    {primary.shortSummary}
                                </p>
                                <p className="text-base sm:text-xl max-w-3xl mx-auto font-semibold z-10 mb-8 italic px-4" style={{color: primary.hex}}>
                                    "{modernData.validation}"
                                </p>`;
html = html.replace(validationRegex, validationStr);

// Insert the new Makna Karakter box right after Secondary Character block, before the Analisis Historis Block
const secCharRegex = /\{\/\* Secondary Character \(Full width\) \*\/\}([\s\S]*?)<\/div>\s*\)\}\s*\{\/\* Collapsible History \*\/\}/;

const newMaknaBox = `{/* Secondary Character (Full width) */}$1</div>
                            )}

                            {/* Makna Karakter (Full width) */}
                            <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-10 sm:p-14 slide-up stagger-4 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                                <h3 className="text-xs font-bold text-slate-400 mb-5 tracking-widest uppercase relative z-10">Makna Karakter Ini Untuk Jati Dirimu Hari Ini</h3>
                                <p className="text-slate-700 text-base sm:text-xl leading-relaxed font-semibold relative z-10" style={{color: primary.hex}}>
                                    {modernData.relevance}
                                </p>
                            </div>

                            {/* Collapsible History */}`;

html = html.replace(secCharRegex, newMaknaBox);

// Add the final closing message
const finalButtonsRegex = /<div className="mt-16 sm:mt-24 max-w-xl mx-auto flex flex-col gap-4">/;
const finalClosingMessage = `<div className="max-w-2xl mx-auto mt-16 sm:mt-24 mb-10 text-center slide-up stagger-5">
                            <p className="text-slate-500 text-sm sm:text-base font-medium italic">
                                "Rangkullah kekuatan alamimu. Karena Allah menciptakan keberagaman karakter perempuan agar dunia ini seimbang."
                            </p>
                        </div>
                        <div className="max-w-xl mx-auto flex flex-col gap-4">`;

html = html.replace(finalButtonsRegex, finalClosingMessage);

fs.writeFileSync('public/index.html', html);
console.log('ResultDashboard updated');
