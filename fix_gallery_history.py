import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Move PSYCH_GLOSSARY to the top (before GalleryScreen)
glossary_def = """
        const PSYCH_GLOSSARY = {
            "Somatic Grounding": "Teknik untuk menenangkan sistem saraf yang sedang panik (hyper-arousal) dengan fokus pada sensasi fisik, seperti memberikan kehangatan, tekanan (diselimuti), atau sentuhan fisik yang aman, sehingga mengembalikan otak ke realitas saat ini.",
            "Cognitive Restructuring": "Sebuah proses terapi untuk mengidentifikasi dan menantang pikiran-pikiran negatif atau irasional, kemudian menggantinya dengan pemikiran yang lebih logis, positif, dan berbasis bukti nyata.",
            "Crisis Intervention": "Tindakan segera dan terarah yang diberikan kepada seseorang yang sedang mengalami trauma atau krisis akut, bertujuan untuk mencegah kerusakan psikologis lebih lanjut dan mengembalikan stabilitas mental dasar.",
            "secure attachment": "Gaya kelekatan psikologis yang sehat, di mana seseorang merasa aman, nyaman, dan percaya diri dalam hubungan, serta mampu menjadi tempat bersandar yang menenangkan bagi orang lain tanpa rasa cemas atau takut ditinggalkan.",
            "Fungsi Eksekutif": "Kemampuan kognitif tingkat tinggi di otak (korteks prefrontal) yang mengatur perencanaan, fokus, pengendalian impuls, dan penyelesaian masalah secara terstruktur, terutama di bawah tekanan.",
            "disosiasi traumatis": "Mekanisme pertahanan mental ekstrem di mana seseorang 'memisahkan diri' dari kenyataan atau kesadarannya untuk menghindari rasa sakit akibat trauma emosional yang terlalu berat.",
            "behavioral-driven": "Pendekatan atau solusi yang digerakkan oleh tindakan/perilaku nyata, bukan sekadar teori atau kata-kata.",
            "mirror neurons": "Sel-sel saraf di otak yang bereaksi dan meniru emosi atau tindakan orang lain yang kita lihat, memungkinkan manusia untuk merasakan empati dan menyelaraskan perilaku secara kolektif.",
            "act of service": "Bahasa cinta atau ekspresi empati yang ditunjukkan melalui tindakan pelayanan atau pengabdian nyata kepada orang lain.",
            "coping mechanism": "Cara atau strategi sadar maupun tidak sadar yang digunakan seseorang untuk menghadapi, mengurangi, atau mentolerir stres dan masalah psikologis.",
            "trait": "Sifat bawaan atau karakteristik kepribadian yang menetap dan mendefinisikan identitas asli seseorang.",
            "disonansi kognitif": "Rasa tidak nyaman dan konflik batin yang parah akibat memegang dua atau lebih nilai, keyakinan, atau ide yang saling bertentangan secara bersamaan.",
            "behavioral reframing": "Mengubah cara pandang atau perasaan terhadap suatu masalah dengan cara mengubah tindakan atau perilaku fisik secara nyata, yang pada akhirnya akan merombak pola pikir.",
            "PTSD": "Gangguan Stres Pascatrauma; kondisi kesehatan mental yang dipicu oleh peristiwa traumatis masa lalu yang menyebabkan kecemasan parah, kilas balik, dan ketidakberdayaan.",
            "core wound": "Luka batin terdalam (sering terbentuk di masa lalu) yang menjadi akar dari ketakutan atau respons emosional negatif seseorang, seperti rasa takut diabaikan atau ditolak.",
            "mindfulness": "Praktik memusatkan perhatian penuh pada momen saat ini secara sadar, menerima perasaan dan pikiran tanpa menghakimi, sangat efektif menenangkan sistem saraf.",
            "Psychological Resilience": "Ketahanan mental atau kemampuan seseorang untuk bangkit kembali, beradaptasi, dan bahkan tumbuh menjadi lebih kuat setelah mengalami penderitaan atau trauma berat.",
            "strict healthy boundaries": "Batasan emosional dan fisik yang tegas, sehat, dan jelas untuk melindungi diri dari manipulasi, eksploitasi, atau pelanggaran nilai, tanpa kompromi berlebihan.",
            "people pleasing": "Kecenderungan untuk selalu berusaha menyenangkan orang lain dan mengorbankan diri sendiri, biasanya didasari oleh rasa takut akan penolakan atau konflik.",
            "Rejection": "Rasa sakit emosional akibat penolakan, pengasingan, atau tidak diterimanya seseorang oleh individu atau kelompok lain.",
            "Cognitive Reframing": "Teknik mengubah perspektif atau cara seseorang melihat dan memaknai sebuah peristiwa, merombak sudut pandang negatif menjadi makna yang memberdayakan dan positif.",
            "observational learning": "Proses belajar yang terjadi murni melalui pengamatan yang sangat teliti terhadap perilaku orang lain, merekam detail-detail kecil untuk ditiru atau dijaga dengan presisi.",
            "detail-oriented": "Kemampuan untuk sangat memperhatikan, merekam, dan mengeksekusi detail-detail kecil dengan tingkat akurasi yang tinggi."
        };
"""

# Remove the old PSYCH_GLOSSARY
# Find it dynamically
start_idx = content.find("const PSYCH_GLOSSARY = {")
end_idx = content.find("};", start_idx) + 2
content = content[:start_idx] + content[end_idx:]

# Insert it before `const GalleryScreen`
content = content.replace("const GalleryScreen = ({ onBack, isFading }) => {", glossary_def + "\n        const GalleryScreen = ({ onBack, isFading }) => {")

# 2. Add handleTermClick and activeGlossaryTerm to GalleryScreen
hook_code = """        const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);

        const handleTermClick = (rawTerm) => {
            let term = rawTerm.replace(/['()]/g, '').trim().toLowerCase();
            const match = Object.keys(PSYCH_GLOSSARY).find(k => k.toLowerCase() === term);
            if (match) {
                setActiveGlossaryTerm({ title: match, desc: PSYCH_GLOSSARY[match] });
            }
        };
"""
content = content.replace('const [selectedChar, setSelectedChar] = useState(null);', 'const [selectedChar, setSelectedChar] = useState(null);\n' + hook_code)

# 3. Add the modal for glossary in GalleryScreen
glossary_modal = """
                    {/* Glossary Modal */}
                    {activeGlossaryTerm && ReactDOM.createPortal(
                        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setActiveGlossaryTerm(null)}>
                            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
                            <div className="glass-panel max-w-sm w-full rounded-[2rem] p-8 sm:p-10 relative z-10 slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
                                <button onClick={() => setActiveGlossaryTerm(null)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <h4 className="text-xl font-serif text-slate-800 mb-4 pr-6">{activeGlossaryTerm.title}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    {activeGlossaryTerm.desc}
                                </p>
                            </div>
                        </div>,
                        document.body
                    )}"""
# Put it just before `</main>` in GalleryScreen. GalleryScreen returns `<main ...>`. So we can put it right before `</main>`.
content = content.replace("                    {/* Character Details Modal */}", glossary_modal + "\n                    {/* Character Details Modal */}")

# 4. Replace the text formatting in GalleryScreen's `selectedChar` modal
old_history_render = """                                        {selectedChar.history.split(/(?<=\\.)\\s+/).reduce((acc, sentence, idx, arr) => {
                                            if (idx % 2 === 0) {
                                                const para = [sentence, arr[idx + 1]].filter(Boolean).join(' ');
                                                acc.push(
                                                    <p key={idx} className={`mb-4 ${idx === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:float-left first-letter:leading-none' : ''}`}>
                                                        {para}
                                                    </p>
                                                );
                                            }
                                            return acc;
                                        }, [])}"""

new_history_render = """                                        {selectedChar.history.split(/(?<=\\.)\\s+/).reduce((acc, sentence, idx, arr) => {
                                            if (idx % 2 === 0) {
                                                const para = [sentence, arr[idx + 1]].filter(Boolean).join(' ');
                                                
                                                // Format psychological terms in quotes or parentheses to be highlighted
                                                const formattedPara = para.split(/('[^']+'|\\([^)]+\\))/g).map((part, i) => {
                                                    if (part.startsWith("'") && part.endsWith("'")) {
                                                        const cleanTerm = part.replace(/'/g, '').trim();
                                                        const hasMatch = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTerm.toLowerCase());
                                                        return <span key={i} onClick={() => handleTermClick(part)} className={`font-bold transition-opacity inline ${hasMatch ? 'underline decoration-dotted underline-offset-4 cursor-pointer hover:opacity-70' : ''}`} style={{color: selectedChar.hex}}>{cleanTerm}</span>;
                                                    }
                                                    if (part.startsWith("(") && part.endsWith(")")) {
                                                        const cleanTermParen = part.replace(/[()]/g, '').trim();
                                                        const hasMatchParen = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTermParen.toLowerCase());
                                                        return <span key={i} onClick={() => handleTermClick(part)} className={`font-medium transition-opacity inline ${hasMatchParen ? 'cursor-pointer hover:opacity-70 underline decoration-dotted underline-offset-4' : 'cursor-default'}`} style={{color: selectedChar.hex}}>{part}</span>;
                                                    }
                                                    return part;
                                                });

                                                acc.push(
                                                    <p key={idx} className={`mb-6 text-slate-600 text-justify leading-relaxed ${idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:leading-none' : ''}`}>
                                                        {formattedPara}
                                                    </p>
                                                );
                                            }
                                            return acc;
                                        }, [])}"""

content = content.replace(old_history_render, new_history_render)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Gallery history synchronized with main history formatting.")
