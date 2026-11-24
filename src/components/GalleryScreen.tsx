import { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ARCHETYPES } from '../data/archetypes';
import { findGlossaryEntry } from '../data/glossary';
import type { Archetype, GlossaryEntry } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { GlossaryText } from './GlossaryText';
import { ModalShell } from './ModalShell';

interface GalleryScreenProps {
  onBack: () => void;
  backLabel: string;
  isFading: boolean;
}

export function GalleryScreen({ onBack, backLabel, isFading }: GalleryScreenProps) {
  const [selectedChar, setSelectedChar] = useState<Archetype | null>(null);
  const [activeGlossary, setActiveGlossary] = useState<GlossaryEntry | null>(null);

  const openWisdomTerm = (rawTerm: string) => {
    const entry = findGlossaryEntry(rawTerm);
    if (entry) setActiveGlossary(entry);
  };

  return (
    <main
      className={`min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-12 pb-24 ${
        isFading ? 'animate-exit' : 'animate-enter'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-2 px-3 -ml-3 rounded-xl hover:bg-white/70"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{backLabel}</span>
          </button>
        </div>

        <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#5E5B80] mb-2">
            11 Teladan Mulia
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-800 mb-3">
            Galeri Ummul Mukminin
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Kenali ragam kekuatan karakter, keteladanan sejarah, dan hikmah psikologis dari para
            ibunda orang-orang mukmin.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHETYPES.map((char) => (
            <button
              key={char.id}
              type="button"
              onClick={() => setSelectedChar(char)}
              className="glass-panel rounded-3xl p-6 text-center flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl w-full h-full cursor-pointer group"
            >
              <CharacterAvatar id={char.id} name={char.name} colorHex={char.hex} size="medium" />

              <h2
                className="mt-5 text-xl font-serif font-semibold leading-snug"
                style={{ color: char.hex }}
              >
                {char.name}
              </h2>

              <p className="mt-2 mb-3 text-xs font-semibold text-slate-500 leading-snug max-w-[28ch]">
                {char.epithet}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed mb-6 text-left">
                {char.shortSummary}
              </p>

              <div className="mt-auto pt-4 w-full border-t border-slate-200/70 flex justify-center items-center gap-2">
                <span
                  className="text-xs font-semibold tracking-wide"
                  style={{ color: char.hex }}
                >
                  Baca Sejarah Lengkap
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  style={{ color: char.hex }}
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary py-3 px-8 rounded-2xl text-sm font-semibold flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{backLabel}</span>
          </button>
        </div>
      </div>

      {/* Character Detail Modal */}
      <ModalShell
        isOpen={Boolean(selectedChar)}
        onClose={() => setSelectedChar(null)}
        zIndexClass="z-50"
        ariaLabel={selectedChar ? `Detail ${selectedChar.name}` : 'Detail Karakter'}
      >
        {selectedChar && (
          <div className="bg-[#F9FAFC] border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedChar(null)}
              className="sticky top-0 float-right w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm cursor-pointer z-20"
              aria-label="Tutup detail karakter"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start mb-7 clear-none">
              <CharacterAvatar
                id={selectedChar.id}
                name={selectedChar.name}
                colorHex={selectedChar.hex}
                size="medium"
                eager
              />
              <div className="text-center sm:text-left flex-1 min-w-0 pr-0 sm:pr-8">
                <p
                  className="text-xs font-semibold leading-snug mb-1.5"
                  style={{ color: selectedChar.hex }}
                >
                  {selectedChar.epithet}
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 mb-3 leading-tight">
                  {selectedChar.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed text-left">
                  {selectedChar.shortSummary}
                </p>
              </div>
            </div>

            <div className="space-y-7">
              <section>
                <h4 className="text-xs font-sans font-bold tracking-widest uppercase text-slate-400 border-b border-slate-200 pb-2 mb-4">
                  Kisah Teladan & Refleksi Sejarah
                </h4>
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-left">
                  {selectedChar.history
                    .split(/(?<=\.)\s+/)
                    .reduce<string[]>((acc, sentence, idx, arr) => {
                      if (idx % 2 === 0) {
                        acc.push([sentence, arr[idx + 1]].filter(Boolean).join(' '));
                      }
                      return acc;
                    }, [])
                    .map((para, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-semibold first-letter:mr-2 first-letter:float-left first-letter:leading-none'
                            : ''
                        }
                      >
                        <GlossaryText
                          text={para}
                          accentHex={selectedChar.hex}
                          onSelectTerm={setActiveGlossary}
                        />
                      </p>
                    ))}
                </div>
              </section>

              <section>
                <h4 className="text-xs font-sans font-bold tracking-widest uppercase text-slate-400 border-b border-slate-200 pb-2 mb-3">
                  Karakter dalam Keseharian & Hubungan
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-left">
                  {selectedChar.roleDynamics}
                </p>
              </section>

              <section>
                <h4 className="text-xs font-sans font-bold tracking-widest uppercase text-slate-400 border-b border-slate-200 pb-2 mb-3">
                  Kekuatan Kognitif & Emosional
                </h4>
                <ul className="space-y-2.5">
                  {selectedChar.wisdom.map((w, idx) => {
                    const [term, desc] = w.split(': ');
                    const hasEntry = Boolean(findGlossaryEntry(term));
                    return (
                      <li key={idx}>
                        <button
                          type="button"
                          onClick={() => openWisdomTerm(term)}
                          disabled={!hasEntry}
                          className="w-full text-left p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-colors cursor-pointer disabled:cursor-default"
                        >
                          <span
                            className="block text-xs font-bold tracking-wide uppercase mb-1 underline decoration-dotted underline-offset-4"
                            style={{ color: selectedChar.hex }}
                          >
                            {term}
                          </span>
                          <span className="block text-sm text-slate-600 leading-relaxed">
                            {desc}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </div>
        )}
      </ModalShell>

      {/* Nested Glossary Modal */}
      <ModalShell
        isOpen={Boolean(activeGlossary)}
        onClose={() => setActiveGlossary(null)}
        zIndexClass="z-[60]"
        ariaLabel={activeGlossary ? `Penjelasan ${activeGlossary.title}` : 'Glosarium'}
      >
        {activeGlossary && (
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl slide-up">
            <button
              type="button"
              onClick={() => setActiveGlossary(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup glosarium"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-xs font-semibold text-[#5E5B80] mb-1">Glosarium Psikologi</p>
            <h4 className="text-xl font-serif font-semibold text-slate-800 mb-3 pr-8">
              {activeGlossary.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">{activeGlossary.desc}</p>
          </div>
        )}
      </ModalShell>
    </main>
  );
}
