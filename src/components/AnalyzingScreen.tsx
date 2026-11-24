import { useEffect, useRef, useState } from 'react';
import { BrandLogo } from './BrandLogo';

interface AnalyzingScreenProps {
  onComplete: () => void;
  isFading: boolean;
}

const PHRASES = [
  'Menghubungkan jejak pilihanmu...',
  'Mengenali cermin karaktermu...',
  'Menyusun catatan refleksi jiwamu...',
];

export function AnalyzingScreen({ onComplete, isFading }: AnalyzingScreenProps) {
  const [textIndex, setTextIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTextIndex((prev) => {
        if (prev < PHRASES.length - 1) return prev + 1;
        window.clearInterval(interval);
        return prev;
      });
    }, 1050);

    const timer = window.setTimeout(() => {
      onCompleteRef.current();
    }, PHRASES.length * 1050 + 500);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-4 py-10 ${
        isFading ? 'animate-exit' : 'animate-enter'
      }`}
    >
      <section className="glass-panel max-w-md w-full rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center">
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-slate-200/80 rounded-full" />
          <div className="absolute inset-0 border-4 border-[#5E5B80] rounded-full border-t-transparent animate-spin" />
          <BrandLogo sizeClass="w-16 h-16" roundedClass="rounded-full" />
        </div>

        <h2
          className="text-xl sm:text-2xl font-serif font-medium text-slate-800 min-h-[3.5rem] flex items-center justify-center transition-opacity duration-300"
          aria-live="polite"
        >
          {PHRASES[textIndex]}
        </h2>
        <p className="text-slate-400 mt-3 text-xs font-semibold tracking-widest uppercase">
          Menyusun Hasil
        </p>
      </section>
    </main>
  );
}
