import { ArrowRight, BookOpen, Leaf, RotateCcw } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface WelcomeScreenProps {
  onStart: () => void;
  onResume: () => void;
  onReset: () => void;
  onViewGallery: () => void;
  answeredCount: number;
  totalQuestions: number;
  hasSession: boolean;
  isComplete: boolean;
  isFading: boolean;
}

export function WelcomeScreen({
  onStart,
  onResume,
  onReset,
  onViewGallery,
  answeredCount,
  totalQuestions,
  hasSession,
  isComplete,
  isFading,
}: WelcomeScreenProps) {
  return (
    <main
      className={`min-h-screen flex items-center justify-center px-4 py-10 sm:px-8 sm:py-16 ${
        isFading ? 'animate-exit' : 'animate-enter'
      }`}
    >
      <article className="glass-panel max-w-3xl w-full rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-56 h-56 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-56 h-56 bg-purple-100/35 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <header className="text-center mb-8 sm:mb-10">
            <div className="mb-5">
              <BrandLogo />
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#5E5B80] mb-3">
              HealYou · Refleksi Karakter Perempuan
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-serif font-semibold text-slate-800 leading-tight tracking-tight max-w-2xl mx-auto">
              Menemukan Kembali Jati Diri Melalui Teladan Ummul Mukminin
            </h1>
          </header>

          <section className="max-w-prose mx-auto space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed text-left mb-8">
            <p>
              Di tengah derasnya ekspektasi dunia modern, kita sering kali kelelahan mencari tahu
              seperti apa sebenarnya sosok &ldquo;perempuan ideal&rdquo; itu. Padahal, petunjuk itu
              sudah Allah &#65019; bentangkan sejak lama.
            </p>
            <p>
              Melalui perjalanan hidup 11 Ummul Mukminin, kita belajar bahwa tidak ada satu standar
              kaku tentang menjadi perempuan. Karakter mereka begitu beragam: ada yang bersinar
              sebagai seorang intelektual, pebisnis tangguh, pengayom yang lembut, hingga seorang
              pejuang.
            </p>
            <p className="font-medium text-slate-700 pt-4 border-t border-slate-200/80">
              Asesmen ini hadir bukan sekadar sebagai tes kepribadian biasa. Ini adalah ruang aman
              untuk mengenali kembali potensi unik di dalam dirimu. Dengan memetakan karaktermu yang
              selaras dengan teladan para Ibunda, harapannya kamu bisa melangkah dengan lebih tenang,
              utuh, dan percaya diri sebagai seorang perempuan.
            </p>
          </section>

          <section
            className="max-w-prose mx-auto bg-slate-50/85 border border-slate-200/70 rounded-2xl p-5 sm:p-6 mb-8 text-left"
            role="note"
          >
            <h2 className="text-sm sm:text-base font-sans font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-[#5E5B80] shrink-0" aria-hidden="true" />
              <span>Sebagai Pengingat</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li className="flex gap-2.5">
                <span className="text-[#5E5B80] font-bold shrink-0" aria-hidden="true">
                  ·
                </span>
                <span>
                  Apa pun perasaanmu saat ini, semuanya valid. Kita tidak sedang menghakimi,
                  melainkan memeluk dan memahaminya.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-[#5E5B80] font-bold shrink-0" aria-hidden="true">
                  ·
                </span>
                <span>
                  Pilihlah jawaban yang paling jujur dari hatimu, tanpa perlu merasa harus menjadi
                  sempurna. Terdapat 55 pernyataan singkat dengan jeda istirahat berkala.
                </span>
              </li>
            </ul>
          </section>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {hasSession ? (
              <>
                <button
                  type="button"
                  onClick={onResume}
                  className="btn-primary w-full sm:w-auto px-7 py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>
                    {isComplete
                      ? 'Lihat Hasil Asesmen'
                      : `Lanjutkan Sesi (${answeredCount}/${totalQuestions})`}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="btn-secondary w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Mulai Ulang</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onStart}
                className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Mulai Perjalanan Mengenal Diri</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onViewGallery}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#4A4865] transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-slate-100/70"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Jelajahi Galeri 11 Ummul Mukminin</span>
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
