const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Fonts
html = html.replace(/Plus\+Jakarta\+Sans/g, 'Nunito');
html = html.replace(/Playfair\+Display/g, 'Lora');
html = html.replace(/'Plus Jakarta Sans'/g, "'Nunito'");
html = html.replace(/'Playfair Display'/g, "'Lora'");

// 2. CSS variables and Colors
html = html.replace(/#334155/g, '#475569'); // softer text
html = html.replace(/#2C3E35/g, '#5C7C6A'); // softer primary btn
html = html.replace(/#1F2C25/g, '#466352'); // softer primary hover
html = html.replace(/text-slate-800/g, 'text-slate-700'); // softer headings

// 3. Welcome Screen Copy
html = html.replace(
    'Arsitektur Psikologis &<br className="hidden sm:block" /> Ketahanan Mental Ummul Mukminin',
    'Menemukan Kedamaian Diri &<br className="hidden sm:block" /> Teladan Ummul Mukminin'
);
html = html.replace(
    'Ruang refleksi ini memadukan presisi historiografi Islam, analisis psikologi klinis modern (CBT/IFS), dan logika sistem arsitektur. Melalui kuesioner ini, kita akan membedah "kode sumber" (source code) ketahanan mental, regulasi emosi, dan kecerdasan kognitifmu yang beresonansi dengan karakteristik agung istri-istri Nabi Muhammad SAW.',
    'Selamat datang di ruang aman untuk merenung. Mari bersama-sama menyusuri kembali perjalanan emosimu, mengenali kekuatan aslimu, dan menemukan resonansi ketenangan batin yang terinspirasi dari keanggunan serta ketangguhan para istri Nabi Muhammad SAW.'
);
html = html.replace(
    '<LeafIcon aria-hidden="true" /> Paradigma Refleksi',
    '<LeafIcon aria-hidden="true" /> Sebagai Pengingat Lembut'
);
html = html.replace(
    'Validasi Utuh: Setiap emosi dan trauma divalidasi, tidak di-represi, melainkan di-refactor menjadi kekuatan.',
    'Apapun perasaanmu saat ini, semuanya valid. Kita tidak sedang menghakimi, melainkan memeluk dan memahaminya.'
);
html = html.replace(
    'Jawablah berbasis respons insting aslimu (root cause behavior), bukan proyeksi ideal normatif.',
    'Pilihlah jawaban yang paling jujur dari hatimu, tanpa perlu merasa harus menjadi sempurna.'
);
html = html.replace(
    'Mulai Pemetaan Karakter',
    'Mulai Perjalananmu'
);

// 4. Break Screen Copy
html = html.replace(
    'Blok Analisis {chunkIndex} Selesai',
    'Jeda Sejenak (Bagian {chunkIndex})'
);
html = html.replace(
    'Sistem sedang memproses input data psikologismu. Pertahankan objektivitas dan kejujuran di blok pertanyaan berikutnya.',
    'Terima kasih sudah berbagi sejauh ini. Tarik napas perlahan, istirahatkan pikiranmu sejenak, dan mari kita lanjutkan saat kamu siap.'
);
html = html.replace(
    'Lanjutkan Pemrosesan',
    'Lanjutkan Perjalanan'
);

// 5. Question Board Copy
html = html.replace(
    'Soal {currentIndex + 1} <span className="mx-2 opacity-50">/</span> {totalQuestions}',
    'Langkah {currentIndex + 1} <span className="mx-2 opacity-50">/</span> {totalQuestions}'
);

// 6. Fix Button styling to be rounder
html = html.replace(/rounded-2xl/g, 'rounded-[2rem]');
html = html.replace(/rounded-xl/g, 'rounded-3xl');

// Save
fs.writeFileSync('public/index.html', html);
console.log('Successfully updated UX strings and styles.');
