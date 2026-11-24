import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Leaf } from 'lucide-react';

interface DataEntryScreenProps {
  initialName?: string;
  onSubmit: (name: string) => void;
  onBack: () => void;
  isFading: boolean;
}

export function DataEntryScreen({
  initialName = '',
  onSubmit,
  onBack,
  isFading,
}: DataEntryScreenProps) {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = name.trim();
    if (cleaned) {
      onSubmit(cleaned);
    }
  };

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-4 py-10 sm:px-8 ${
        isFading ? 'animate-exit' : 'animate-enter'
      }`}
    >
      <section className="glass-panel max-w-md w-full rounded-3xl p-6 sm:p-10 relative">
        <div className="mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1.5 px-2.5 -ml-2.5 rounded-xl hover:bg-slate-100/80"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Halaman Awal</span>
          </button>
        </div>

        <div className="text-center">
          <div
            className="inline-flex items-center justify-center w-12 h-12 bg-[#5E5B80]/10 rounded-2xl text-[#5E5B80] mb-5"
            aria-hidden="true"
          >
            <Leaf className="w-5 h-5" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-800 mb-2">
            Siapa Namamu?
          </h1>
          <p className="text-slate-500 text-sm mb-7 leading-relaxed">
            Nama ini akan digunakan untuk menyapamu dan dicetak pada catatan refleksi hasil asesmen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="participant-name" className="sr-only">
                Nama panggilanmu
              </label>
              <input
                id="participant-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama panggilanmu..."
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium focus:border-[#5E5B80] transition-colors"
                required
                autoFocus
                maxLength={30}
                autoComplete="given-name"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="btn-primary w-full py-3.5 px-6 rounded-2xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Lanjutkan Perjalanan</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
