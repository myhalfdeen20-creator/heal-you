const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

const breakScreenRegex = /const BreakScreen = \({ chunkIndex, onContinue, isFading }\) => \([\s\S]*?<\/main>\n\s*\);/;

const newBreakScreen = `const BreakScreen = ({ chunkIndex, onContinue, isFading }) => {
            const affirmations = [
                "Terima kasih sudah berbagi sejauh ini. Tarik napas perlahan, istirahatkan pikiranmu sejenak, dan mari kita lanjutkan saat kamu siap.",
                "Kamu melakukan hal yang hebat dengan jujur pada dirimu sendiri. Ambil napas panjang, hembuskan perlahan, dan lepaskan sedikit bebanmu.",
                "Perjalanan mengenal diri ini tidak perlu terburu-buru. Nikmati jeda ini, tenangkan hatimu, dan kita lanjutkan jika kamu sudah merasa nyaman.",
                "Setiap jawabanmu membawamu selangkah lebih dekat dengan pemahaman diri yang lebih dalam. Tarik napas yang dalam, tenangkan pikiranmu.",
                "Tidak ada yang mengejarmu di sini. Rasakan udara yang masuk dan keluar, berikan ruang untuk dirimu bernapas sebelum melanjutkan perjalanan ini."
            ];
            
            // Gunakan chunkIndex - 1 agar selalu konsisten untuk break yang sama, dimodulo dengan jumlah afirmasi
            const message = affirmations[(chunkIndex - 1) % affirmations.length];

            return (
                <main className={\`min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-20 overflow-x-hidden \${isFading ? 'animate-exit' : 'animate-enter'}\`}>
                    <section className="glass-panel max-w-md w-full rounded-[2rem] p-12 sm:p-16 text-center slide-up" aria-labelledby="break-title">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-[1.5rem] mb-6 shadow-sm border border-white/50 overflow-hidden p-1" aria-hidden="true">
                            <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-[1.2rem]" onError={(e) => { e.target.onerror = null; e.target.src = '/logo-healyou.webp'; }} />
                        </div>
                        <h2 id="break-title" className="text-2xl font-serif text-slate-700 mb-4">Jeda Sejenak<br/>(Bagian {chunkIndex})</h2>
                        <p className="text-slate-600 text-sm mb-16 leading-relaxed font-medium">
                            {message}
                        </p>
                        <button onClick={onContinue} className="btn-primary whitespace-nowrap w-full py-4 rounded-3xl font-semibold">
                            Lanjutkan Perjalanan
                        </button>
                    </section>
                </main>
            );
        };`;

html = html.replace(breakScreenRegex, newBreakScreen);
fs.writeFileSync('public/index.html', html);
console.log('BreakScreen updated successfully');
