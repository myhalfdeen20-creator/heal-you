import { useEffect, useRef, useState } from 'react';
import { CloudRain, Trees, Volume2, VolumeX, Waves, Wind, X } from 'lucide-react';
import type { AmbientType } from '../types';

interface AudioControlsProps {
  isPlaying: boolean;
  ambientType: AmbientType;
  onTogglePlay: () => void;
  onSelectType: (type: AmbientType) => void;
}

const SOUND_OPTIONS: Array<{
  id: AmbientType;
  name: string;
  Icon: typeof Wind;
}> = [
  { id: 'wind', name: 'Angin', Icon: Wind },
  { id: 'ocean', name: 'Ombak', Icon: Waves },
  { id: 'rain', name: 'Gerimis', Icon: CloudRain },
  { id: 'forest', name: 'Hutan', Icon: Trees },
];

export function AudioControls({
  isPlaying,
  ambientType,
  onTogglePlay,
  onSelectType,
}: AudioControlsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [menuOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {menuOpen && (
        <div className="w-52 bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/90 rounded-2xl p-3 slide-up">
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-700">Suara Ambien</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup menu audio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onTogglePlay}
            className={`w-full mb-2.5 px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-[#5E5B80] text-white hover:bg-[#4A4865]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{isPlaying ? 'Audio Aktif' : 'Audio Nonaktif'}</span>
            <span>{isPlaying ? 'Matikan' : 'Nyalakan'}</span>
          </button>

          <div className="grid grid-cols-2 gap-1.5">
            {SOUND_OPTIONS.map(({ id, name, Icon }) => {
              const active = ambientType === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectType(id)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#5E5B80]/12 text-[#4A4865] font-semibold border border-[#5E5B80]/30'
                      : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`h-11 px-3.5 rounded-full backdrop-blur-md shadow-lg border flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#5E5B80] border-[#5E5B80] text-white hover:bg-[#4A4865]'
            : 'bg-white/95 border-slate-200 text-slate-600 hover:text-[#4A4865] hover:border-slate-300'
        }`}
        aria-label="Pengaturan suara ambien"
        aria-expanded={menuOpen}
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        <span className="hidden sm:inline whitespace-nowrap">
          {isPlaying ? 'Ambien Aktif' : 'Suara'}
        </span>
      </button>
    </div>
  );
}
