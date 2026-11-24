import { useEffect, useRef, useState } from 'react';
import { Download, Loader2, Share2, Smartphone, Square, X } from 'lucide-react';
import type { AssessmentResult } from '../types';
import {
  canShareImageFile,
  generatePosterImage,
  type GeneratedPoster,
  type PosterFormat,
} from '../utils/exportPoster';
import { downloadBlob, formatFileSize } from '../utils/imageHelpers';
import { ModalShell } from './ModalShell';

interface PosterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AssessmentResult;
  userName: string;
  onShowToast: (message: string) => void;
}

export function PosterPreviewModal({
  isOpen,
  onClose,
  result,
  userName,
  onShowToast,
}: PosterPreviewModalProps) {
  const [format, setFormat] = useState<PosterFormat>('portrait');
  const [poster, setPoster] = useState<GeneratedPoster | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const activeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (activeUrlRef.current) {
        URL.revokeObjectURL(activeUrlRef.current);
        activeUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (activeUrlRef.current) {
        URL.revokeObjectURL(activeUrlRef.current);
        activeUrlRef.current = null;
      }
      setPoster(null);
      return;
    }

    let cancelled = false;
    setIsGenerating(true);
    setErrorMsg(null);

    generatePosterImage(result, userName, format)
      .then((generated) => {
        if (cancelled) {
          URL.revokeObjectURL(generated.previewUrl);
          return;
        }
        if (activeUrlRef.current) {
          URL.revokeObjectURL(activeUrlRef.current);
        }
        activeUrlRef.current = generated.previewUrl;
        setPoster(generated);
      })
      .catch(() => {
        if (!cancelled) {
          setErrorMsg('Gagal menyusun pratinjau poster. Silakan coba lagi.');
        }
      })
      .finally(() => {
        if (!cancelled) setIsGenerating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, format, result, userName]);

  const handleDownload = () => {
    if (!poster) return;
    downloadBlob(poster.blob, poster.filename);
    onShowToast(`Poster HD (${formatFileSize(poster.sizeBytes)}) berhasil diunduh.`);
  };

  const handleShareImage = async () => {
    if (!poster) return;
    try {
      const file = new File([poster.blob], poster.filename, { type: 'image/jpeg' });
      await navigator.share({
        title: `HealYou - ${result.primary.name}`,
        text: `Catatan refleksi karakterku di HealYou: ${result.primary.name}.`,
        files: [file],
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      handleDownload();
    }
  };

  const supportsFileShare = poster ? canShareImageFile(poster.blob, poster.filename) : false;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      zIndexClass="z-50"
      ariaLabel="Pratinjau & Simpan Poster"
    >
      <div className="bg-white border border-slate-200 max-w-xl w-full max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden slide-up">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="text-lg font-serif font-semibold text-slate-800">
              Simpan Poster Refleksi
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {poster
                ? `Resolusi HD ${poster.width} × ${poster.height}px · ${formatFileSize(poster.sizeBytes)}`
                : 'Menyiapkan gambar resolusi HD...'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup pratinjau poster"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-5 sm:px-6 pt-3.5 pb-2 flex items-center justify-center shrink-0">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setFormat('portrait')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                format === 'portrait'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Square className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Poster Ringkas</span>
            </button>
            <button
              type="button"
              onClick={() => setFormat('story')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                format === 'story'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Story (9:16)</span>
            </button>
          </div>
        </div>

        {/* Preview Canvas Container */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-3 bg-slate-50/80 flex items-center justify-center min-h-[300px]">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 py-16 text-slate-500">
              <Loader2 className="w-7 h-7 animate-spin text-[#5E5B80]" />
              <span className="text-xs font-medium">Menyusun poster HD...</span>
            </div>
          ) : errorMsg ? (
            <p className="text-sm text-red-600 font-medium text-center py-12">{errorMsg}</p>
          ) : poster ? (
            <img
              src={poster.previewUrl}
              alt={`Pratinjau poster ${result.primary.name}`}
              className="max-h-[54vh] w-auto rounded-2xl shadow-lg border border-slate-200/80 object-contain"
            />
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-2.5 shrink-0">
          {supportsFileShare && (
            <button
              type="button"
              onClick={handleShareImage}
              disabled={!poster || isGenerating}
              className="btn-secondary flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span>Bagikan Gambar</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleDownload}
            disabled={!poster || isGenerating}
            className="btn-primary flex-1 py-3 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Unduh JPG</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
