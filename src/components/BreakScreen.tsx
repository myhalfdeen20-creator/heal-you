import { ArrowRight } from 'lucide-react';
import { BREAK_AFFIRMATIONS } from '../data/questions';
import { BrandLogo } from './BrandLogo';

interface BreakScreenProps {
  chunkIndex: number;
  onContinue: () => void;
  onBack: () => void;
  isFading: boolean;
}

export function BreakScreen({
  chunkIndex,
  onContinue,
  onBack,
  isFading,
}: BreakScreenProps) {
  const safeChunk = Math.max(1, chunkIndex);
  const message = BREAK_AFFIRMATIONS[(safeChunk - 1) % BREAK_AFFIRMATIONS.length];

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-4 py-10 sm:px-8 ${
        isFading ? 'animate-exit' : 'animate-enter'
      }`}
    >
      <section
        className="glass-panel max-w-md w-full rounded-3xl p-6 sm:p-10 text-center"
        aria-labelledby="break-title"
      >
        <div className="mb-5">
          <BrandLogo sizeClass="w-14 h-14 sm:w-16 sm:h-16" />
        </div>
        <p className="text-xs font-semibold tracking-widest uppercase text-[#5E5B80] mb-2 tabular-nums">
          Bagian {safeChunk} dari 5 selesai
        </p>
        <h2 id="break-title" className="text-2xl sm:text-3xl font-serif font-semibold text-slate-800 mb-4">
          Jeda Sejenak
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            disabled={isFading}
            onClick={onBack}
            className="btn-secondary w-full sm:w-auto px-5 py-3 rounded-2xl text-sm font-semibold cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            Soal Sebelumnya
          </button>
          <button
            type="button"
            disabled={isFading}
            onClick={onContinue}
            className="btn-primary flex-1 py-3 px-6 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <span>Lanjutkan</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}
