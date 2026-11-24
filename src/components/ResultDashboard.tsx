import { useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Download,
  FileText,
  Info,
  PlusCircle,
  RotateCcw,
  Share2,
  X,
} from 'lucide-react';
import { ARCHETYPE_MAP } from '../data/archetypes';
import { findGlossaryEntry } from '../data/glossary';
import {
  BLIND_SPOT_DATA,
  DAILY_PRACTICES,
  INTENSITY_DATA,
  MODERN_RELEVANCE,
  SYNTHESIS_DATA,
} from '../data/insights';
import type { AssessmentResult, GlossaryEntry } from '../types';
import { generateAssessmentPdf } from '../utils/exportPdf';
import { formatFileSize } from '../utils/imageHelpers';
import { CharacterAvatar } from './CharacterAvatar';
import { GlossaryText } from './GlossaryText';
import { ModalShell } from './ModalShell';
import { PosterPreviewModal } from './PosterPreviewModal';

type ResultTabId = 'inti' | 'peta' | 'aksi' | 'sirah';

interface ResultDashboardProps {
  result: AssessmentResult;
  userName: string;
  completedHabits: number[];
  onToggleHabit: (idx: number) => void;
  onShowToast: (message: string) => void;
  onReset: () => void;
  onViewGallery: () => void;
  isFading: boolean;
}

function splitArchetypeName(fullName: string): { main: string; sub: string | null } {
  const match = fullName.match(/^(.*?)\s*(\((.*?)\))?$/);
  return {
    main: match ? match[1].trim() : fullName,
    sub: match && match[2] ? match[2].trim() : null,
  };
}

function splitLeadSentence(text: string): { lead: string; rest: string } {
  const match = text.match(/^(.+?[.!?])(?:\s+([\s\S]+))?$/);
  if (!match) return { lead: text, rest: '' };
  return {
    lead: match[1].trim(),
    rest: (match[2] ?? '').trim(),
  };
}

function estimateReadMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 160));
}

async function copyTextFallback(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function ResultDashboard({
  result,
  userName,
  completedHabits,
  onToggleHabit,
  onShowToast,
  onReset,
  onViewGallery,
  isFading,
}: ResultDashboardProps) {
  const { primary, secondary, lowest, scores } = result;
  const modernData = MODERN_RELEVANCE[primary.id];
  const practices = DAILY_PRACTICES[primary.id];
  const intensityObj = INTENSITY_DATA[primary.id];
  const isHighIntensity = primary.matchPercentage >= 85;
  const intensityText = isHighIntensity ? intensityObj.high : intensityObj.mod;
  const intensityShortStatus = isHighIntensity ? 'Waspada Overdrive' : 'Mengalir Alami';
  const intensityLabel = isHighIntensity
    ? 'Intensitas Tinggi · Waspada Overdrive'
    : 'Intensitas Terintegrasi · Mengalir Alami';
  const blindSpotText = BLIND_SPOT_DATA[lowest.id];

  const primaryNameParts = splitArchetypeName(primary.name);
  const secondaryNameParts = secondary ? splitArchetypeName(secondary.name) : null;
  const lowestNameParts = splitArchetypeName(lowest.name);

  const relevanceParts = splitLeadSentence(modernData.relevance);
  const blindSpotParts = splitLeadSentence(blindSpotText);
  const sirahReadMinutes = estimateReadMinutes(primary.history);

  const [activeTab, setActiveTab] = useState<ResultTabId>('inti');
  const [activeGlossary, setActiveGlossary] = useState<GlossaryEntry | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);

  const tabBarRef = useRef<HTMLDivElement>(null);

  const selectTab = (tab: ResultTabId, shouldScrollToTopOfTabs = false) => {
    setActiveTab(tab);
    if (shouldScrollToTopOfTabs && tabBarRef.current) {
      const rect = tabBarRef.current.getBoundingClientRect();
      if (rect.top < 16 || rect.top > window.innerHeight * 0.65) {
        const targetY = window.scrollY + rect.top - 12;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  };

  const openWisdomTerm = (rawTerm: string) => {
    const entry = findGlossaryEntry(rawTerm);
    if (entry) setActiveGlossary(entry);
  };

  const handleDownloadPDF = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);

    try {
      const { sizeBytes } = await generateAssessmentPdf(result, userName, completedHabits);
      onShowToast(`Rapor PDF vektor 2 halaman (${formatFileSize(sizeBytes)}) berhasil diunduh.`);
    } catch (error) {
      console.error('Gagal menghasilkan PDF:', error);
      onShowToast('Gagal menyusun PDF. Silakan coba lagi.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShare = async () => {
    const shareText = `Masya Allah! Melalui asesmen karakter di HealYou, karakterku paling dekat dengan teladan ${primary.name}.\n\n"${primary.shortSummary}"\n\nYuk, kenali cermin dirimu dan teladan agung Ummul Mukminin!`;
    const shareUrl = window.location.href;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'HealYou - Asesmen Ummul Mukminin',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    const copied = await copyTextFallback(`${shareText}\n\n${shareUrl}`);
    if (copied) {
      onShowToast('Teks & tautan hasil berhasil disalin ke clipboard.');
    } else {
      onShowToast('Tidak dapat menyalin otomatis. Salin tautan dari bilah alamat browser.');
    }
  };

  const sirahParagraphs = primary.history
    .split(/(?<=\.)\s+/)
    .reduce<string[]>((acc, sentence, idx, arr) => {
      if (idx % 2 === 0) {
        acc.push([sentence, arr[idx + 1]].filter(Boolean).join(' '));
      }
      return acc;
    }, []);

  const tabs: Array<{
    id: ResultTabId;
    label: string;
    mobileLabel: string;
    meta?: string;
    Icon: typeof Compass;
  }> = [
    { id: 'inti', label: 'Inti Diri', mobileLabel: 'Inti Diri', Icon: Compass },
    { id: 'peta', label: 'Peta & Skor', mobileLabel: 'Peta & Skor', meta: '11', Icon: BarChart3 },
    {
      id: 'aksi',
      label: 'Aksi Harian',
      mobileLabel: 'Aksi Harian',
      meta: `${completedHabits.length}/3`,
      Icon: CheckCircle2,
    },
    {
      id: 'sirah',
      label: 'Kisah Sirah',
      mobileLabel: 'Kisah Sirah',
      meta: `${sirahReadMinutes} mnt`,
      Icon: BookOpen,
    },
  ];

  const habitProgressPercent = Math.round((completedHabits.length / practices.length) * 100);

  return (
    <main
      className={`min-h-screen py-5 sm:py-8 lg:py-10 px-3.5 sm:px-6 lg:px-10 pb-24 ${
        isFading ? 'animate-exit' : 'animate-enter'
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
        {/* 1. COMPACT EDITORIAL HERO + QUICK ACTIONS */}
        <section className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-9 relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: primary.hex }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 lg:gap-9 text-center md:text-left">
            <div className="shrink-0">
              <CharacterAvatar
                id={primary.id}
                name={primary.name}
                colorHex={primary.hex}
                size="medium"
                eager
              />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-xs sm:text-sm font-semibold tracking-wide"
                style={{ color: primary.hex }}
              >
                {primary.epithet} ·{' '}
                <span className="tabular-nums font-bold">{primary.matchPercentage}% Kesesuaian</span>
              </p>

              <h1 className="font-serif mt-2 mb-3">
                <span className="block text-sm sm:text-base text-slate-500 font-sans font-medium">
                  {userName
                    ? `Halo ${userName}, karaktermu beresonansi dengan`
                    : 'Karakteristikmu beresonansi dengan'}
                </span>
                <span
                  className="block text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mt-1"
                  style={{ color: primary.hex }}
                >
                  {primaryNameParts.main}
                </span>
                {primaryNameParts.sub && (
                  <span
                    className="block text-sm sm:text-base font-medium mt-0.5 opacity-85"
                    style={{ color: primary.hex }}
                  >
                    {primaryNameParts.sub}
                  </span>
                )}
              </h1>

              <p className="text-slate-600 text-sm sm:text-[15px] leading-[1.7] max-w-[60ch] mx-auto md:mx-0">
                {primary.shortSummary}
              </p>

              <blockquote
                className="mt-3.5 text-sm sm:text-[15px] font-serif italic text-slate-700 leading-relaxed max-w-[58ch] mx-auto md:mx-0 md:border-l-2 md:pl-3.5"
                style={{ borderColor: `${primary.hex}66` }}
              >
                &ldquo;{modernData.validation}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Quick Action Strip inside Hero so PDF/Poster are immediately reachable */}
          <div className="relative z-10 mt-5 pt-4 sm:pt-5 border-t border-slate-200/75 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <p className="text-xs text-slate-500 text-center lg:text-left">
              Ingin baca santai nanti? Simpan <strong className="text-slate-700">Rapor PDF</strong>{' '}
              atau <strong className="text-slate-700">Poster HD</strong> terlebih dahulu.
            </p>
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowPosterModal(true)}
                className="btn-primary min-h-[44px] px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Simpan Poster</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="btn-secondary min-h-[44px] px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 whitespace-nowrap"
                style={{ color: primary.hex }}
              >
                <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{isGeneratingPdf ? 'Menyusun...' : 'Rapor PDF'}</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="col-span-2 sm:col-span-1 btn-secondary min-h-[44px] px-3.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                aria-label="Bagikan ringkasan hasil"
              >
                <Share2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. AT-A-GLANCE 10-SECOND SNAPSHOT STRIP */}
        <section
          aria-label="Ringkasan cepat hasil asesmen"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
        >
          {/* Snapshot 1: Secondary Character */}
          {secondary && secondaryNameParts && (
            <button
              type="button"
              onClick={() => selectTab('inti', true)}
              className="glass-panel rounded-2xl p-3.5 sm:p-4 text-left flex items-center gap-3 hover:bg-white transition-colors cursor-pointer group"
            >
              <CharacterAvatar
                id={secondary.id}
                name={secondary.name}
                colorHex={secondary.hex}
                size="xs"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pendamping ·{' '}
                  <span className="tabular-nums" style={{ color: secondary.hex }}>
                    {secondary.matchPercentage}%
                  </span>
                </p>
                <p className="text-sm font-serif font-semibold text-slate-800 truncate mt-0.5">
                  {secondaryNameParts.main}
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0"
                aria-hidden="true"
              />
            </button>
          )}

          {/* Snapshot 2: Intensity Scale */}
          <button
            type="button"
            onClick={() => selectTab('peta', true)}
            className="glass-panel rounded-2xl p-3.5 sm:p-4 text-left flex items-center gap-3 hover:bg-white transition-colors cursor-pointer group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-sm tabular-nums"
              style={{
                backgroundColor: isHighIntensity ? '#FEF3C7' : '#ECFDF5',
                color: isHighIntensity ? '#B45309' : '#047857',
              }}
            >
              {primary.matchPercentage}%
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Skala Intensitas
              </p>
              <p className="text-sm font-serif font-semibold text-slate-800 truncate mt-0.5">
                {intensityShortStatus}
              </p>
            </div>
            <ArrowRight
              className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0"
              aria-hidden="true"
            />
          </button>

          {/* Snapshot 3: Growth Space */}
          <button
            type="button"
            onClick={() => selectTab('peta', true)}
            className="glass-panel rounded-2xl p-3.5 sm:p-4 text-left flex items-center gap-3 hover:bg-white transition-colors cursor-pointer group"
          >
            <CharacterAvatar
              id={lowest.id}
              name={lowest.name}
              colorHex={lowest.hex}
              size="xs"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Ruang Bertumbuh ·{' '}
                <span className="tabular-nums text-slate-600">{lowest.matchPercentage}%</span>
              </p>
              <p className="text-sm font-serif font-semibold text-slate-800 truncate mt-0.5">
                {lowestNameParts.main}
              </p>
            </div>
            <ArrowRight
              className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0"
              aria-hidden="true"
            />
          </button>
        </section>

        {/* 3. STICKY 4-TAB THEMATIC NAVIGATION */}
        <div
          ref={tabBarRef}
          className="sticky top-2.5 sm:top-3 z-30 pt-0.5"
        >
          <div
            role="tablist"
            aria-label="Bagian detail hasil asesmen"
            className="bg-white/92 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-900/5 rounded-2xl p-1.5 grid grid-cols-2 sm:grid-cols-4 gap-1.5"
          >
            {tabs.map(({ id, label, mobileLabel, meta, Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  id={`tab-${id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`panel-${id}`}
                  onClick={() => selectTab(id, true)}
                  className={`min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                  style={isActive ? { backgroundColor: primary.hex } : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="sm:hidden">{mobileLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                  {meta && (
                    <span
                      className={`text-[11px] tabular-nums font-bold ${
                        isActive ? 'text-white/85' : 'text-slate-400'
                      }`}
                    >
                      · {meta}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. TAB PANELS — CLEAN, CALM, OPTIMAL LINE LENGTH */}
        <div className="pt-1">
          {/* TAB 1: INTI DIRI */}
          {activeTab === 'inti' && (
            <div
              id="panel-inti"
              role="tabpanel"
              aria-labelledby="tab-inti"
              className="space-y-4 sm:space-y-5 fade-in"
            >
              {/* Unified Two-Perspective Card: Makna Hari Ini & Di Mata Sekitar */}
              <section className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-9">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  <div className="lg:col-span-7">
                    <p
                      className="text-xs font-sans font-bold tracking-widest uppercase mb-2.5"
                      style={{ color: primary.hex }}
                    >
                      Makna Untuk Jati Dirimu Hari Ini
                    </p>
                    <div className="text-sm sm:text-[15.5px] leading-[1.8] max-w-[58ch] space-y-2">
                      <p className="font-medium text-slate-900">{relevanceParts.lead}</p>
                      {relevanceParts.rest && (
                        <p className="text-slate-600">{relevanceParts.rest}</p>
                      )}
                    </div>
                  </div>

                  <div
                    className="lg:col-span-5 rounded-2xl bg-slate-50/90 border border-slate-200/75 p-5 sm:p-6 border-l-[3px]"
                    style={{ borderLeftColor: primary.hex }}
                  >
                    <p className="text-xs font-sans font-bold text-slate-500 tracking-widest uppercase mb-2">
                      Di Mata Orang Sekitarmu
                    </p>
                    <p className="text-sm sm:text-[15px] text-slate-700 leading-[1.75] max-w-[50ch]">
                      {primary.roleDynamics}
                    </p>
                  </div>
                </div>
              </section>

              {/* 3 Kekuatan Inti — Indonesian Meaning First, Psychology Term Clickable Below */}
              <section className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-9">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-5">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif font-semibold text-slate-800">
                      3 Kekuatan Kognitif &amp; Emosional Utamamu
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Klik istilah psikologi di bawah tiap poin untuk penjelasan ringkasnya.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                  {primary.wisdom.map((w, idx) => {
                    const [term, ...restParts] = w.split(': ');
                    const desc = restParts.join(': ');
                    const hasEntry = Boolean(findGlossaryEntry(term));
                    return (
                      <article
                        key={idx}
                        className="rounded-2xl bg-white/90 border border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between gap-4"
                      >
                        <div>
                          <span
                            className="inline-block text-xs font-bold tabular-nums tracking-wider mb-2"
                            style={{ color: primary.hex }}
                          >
                            0{idx + 1}
                          </span>
                          <p className="text-sm sm:text-[15px] text-slate-800 font-medium leading-[1.7]">
                            {desc || w}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => openWisdomTerm(term)}
                            disabled={!hasEntry}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer disabled:cursor-default min-h-[32px] text-left"
                          >
                            <Info
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: primary.hex }}
                              aria-hidden="true"
                            />
                            <span
                              className={
                                hasEntry
                                  ? 'underline decoration-dotted underline-offset-4'
                                  : undefined
                              }
                            >
                              {term}
                            </span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* Harmoni Dua Karakter — Split into 2 Clear Side-by-Side Blocks (No 2-Color Single Paragraph) */}
              {secondary && secondaryNameParts && (
                <section className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-9">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-200/75">
                    <div className="flex items-center gap-3.5">
                      <div className="flex items-center -space-x-2 shrink-0">
                        <CharacterAvatar
                          id={primary.id}
                          name={primary.name}
                          colorHex={primary.hex}
                          size="xs"
                        />
                        <CharacterAvatar
                          id={secondary.id}
                          name={secondary.name}
                          colorHex={secondary.hex}
                          size="xs"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                          Perpaduan Harmoni Karaktermu
                        </p>
                        <h2 className="text-base sm:text-lg font-serif font-semibold text-slate-800 mt-0.5">
                          {primaryNameParts.main}{' '}
                          <span className="text-slate-400 font-sans font-normal mx-0.5">&amp;</span>{' '}
                          {secondaryNameParts.main}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div
                      className="rounded-2xl bg-white/85 border border-slate-200/80 p-4 sm:p-5 border-t-[3px]"
                      style={{ borderTopColor: primary.hex }}
                    >
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <p
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: primary.hex }}
                        >
                          Fondasi Utamamu
                        </p>
                        <span className="text-xs font-bold tabular-nums text-slate-500">
                          {primary.matchPercentage}%
                        </span>
                      </div>
                      <p className="text-sm sm:text-[15px] text-slate-700 leading-[1.75]">
                        {SYNTHESIS_DATA.primary[primary.id]}
                      </p>
                    </div>

                    <div
                      className="rounded-2xl bg-white/85 border border-slate-200/80 p-4 sm:p-5 border-t-[3px]"
                      style={{ borderTopColor: secondary.hex }}
                    >
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <p
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: secondary.hex }}
                        >
                          Sisi Penyeimbang
                        </p>
                        <span className="text-xs font-bold tabular-nums text-slate-500">
                          {secondary.matchPercentage}%
                        </span>
                      </div>
                      <p className="text-sm sm:text-[15px] text-slate-700 leading-[1.75]">
                        {SYNTHESIS_DATA.secondary[secondary.id]}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Next Tab Prompt */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => selectTab('peta', true)}
                  className="btn-secondary min-h-[44px] px-5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Lanjut: Peta &amp; Keseimbangan</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PETA & KESEIMBANGAN */}
          {activeTab === 'peta' && (
            <div
              id="panel-peta"
              role="tabpanel"
              aria-labelledby="tab-peta"
              className="space-y-4 sm:space-y-5 fade-in"
            >
              {/* Top Row: Intensity Scale + Ruang Bertumbuh side-by-side on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {/* Skala Intensitas */}
                <section className="glass-panel rounded-3xl p-5 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-xs font-sans font-bold text-slate-400 tracking-widest uppercase">
                          Skala Kedewasaan &amp; Intensitas
                        </p>
                        <h2 className="text-base sm:text-lg font-serif font-semibold text-slate-800 mt-1">
                          {intensityLabel}
                        </h2>
                      </div>
                      <span
                        className="text-2xl sm:text-3xl font-bold tabular-nums leading-none shrink-0"
                        style={{ color: primary.hex }}
                      >
                        {primary.matchPercentage}%
                      </span>
                    </div>

                    <div className="relative w-full bg-slate-200/80 rounded-full overflow-hidden h-2.5 mb-5">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${primary.matchPercentage}%`,
                          backgroundColor: primary.hex,
                        }}
                      />
                    </div>

                    <p className="text-sm sm:text-[15px] text-slate-700 leading-[1.8] max-w-[56ch]">
                      <GlossaryText
                        text={intensityText}
                        accentHex={primary.hex}
                        onSelectTerm={setActiveGlossary}
                      />
                    </p>
                  </div>
                </section>

                {/* Ruang Bertumbuh / Blind Spot */}
                <section className="rounded-3xl p-5 sm:p-7 bg-slate-800 border border-slate-700 text-slate-100 relative overflow-hidden shadow-lg flex flex-col justify-between">
                  <div
                    className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: lowest.hex }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <CharacterAvatar
                          id={lowest.id}
                          name={lowest.name}
                          colorHex={lowest.hex}
                          size="xs"
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-sans font-bold text-slate-400 tracking-widest uppercase">
                            Ruang Bertumbuh · Blind Spot
                          </p>
                          <h2 className="text-base sm:text-lg font-serif font-semibold text-white truncate mt-0.5">
                            {lowestNameParts.main}
                          </h2>
                        </div>
                      </div>
                      <span className="text-sm sm:text-base font-bold text-amber-300 tabular-nums shrink-0">
                        {lowest.matchPercentage}%
                      </span>
                    </div>

                    <div className="text-sm sm:text-[15px] leading-[1.8] max-w-[56ch] space-y-2">
                      <p className="text-white font-medium">{blindSpotParts.lead}</p>
                      {blindSpotParts.rest && (
                        <p className="text-slate-300">{blindSpotParts.rest}</p>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              {/* Full 11-Profile Map (Directly Visible, 2-Column on Desktop) */}
              <section className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-5">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif font-semibold text-slate-800">
                      Peta Lengkap 11 Profil Karakter
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Urutan kesesuaian dari resonansi tertinggi hingga ruang bertumbuhmu.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tabular-nums">
                    11 Profil
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {scores.map((item, idx) => {
                    const arch = ARCHETYPE_MAP[item.id];
                    const archParts = splitArchetypeName(arch.name);
                    const isPrimary = primary.id === item.id;
                    const isSecondary = secondary?.id === item.id;
                    const isLowest = lowest.id === item.id;
                    const roleTag = isPrimary
                      ? 'Utama'
                      : isSecondary
                        ? 'Pendamping'
                        : isLowest
                          ? 'Ruang Bertumbuh'
                          : null;

                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl p-3.5 sm:p-4 border transition-colors ${
                          isPrimary || isSecondary || isLowest
                            ? 'bg-white border-slate-300/90 shadow-xs'
                            : 'bg-white/60 border-slate-200/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 text-xs font-bold tabular-nums shrink-0 text-center ${
                              isPrimary
                                ? 'text-emerald-700'
                                : isSecondary
                                  ? 'text-amber-700'
                                  : 'text-slate-400'
                            }`}
                          >
                            #{idx + 1}
                          </span>
                          <CharacterAvatar
                            id={arch.id}
                            name={arch.name}
                            colorHex={arch.hex}
                            size="xs"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <h3 className="text-sm sm:text-[15px] font-serif font-semibold text-slate-800 truncate">
                                {archParts.main}
                              </h3>
                              <span
                                className="text-sm font-bold tabular-nums shrink-0"
                                style={{ color: arch.hex }}
                              >
                                {item.matchPercentage}%
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                              {roleTag && (
                                <span
                                  className="font-semibold mr-1.5"
                                  style={{ color: arch.hex }}
                                >
                                  {roleTag} ·
                                </span>
                              )}
                              {arch.epithet}
                            </p>
                            <div className="w-full bg-slate-200/75 rounded-full h-1.5 overflow-hidden mt-2">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${item.matchPercentage}%`,
                                  backgroundColor: arch.hex,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Next Tab Prompt */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => selectTab('aksi', true)}
                  className="btn-secondary min-h-[44px] px-5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Lanjut: 3 Aksi Harian</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: AKSI HARIAN */}
          {activeTab === 'aksi' && (
            <div
              id="panel-aksi"
              role="tabpanel"
              aria-labelledby="tab-aksi"
              className="space-y-4 sm:space-y-5 fade-in"
            >
              <section className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-9">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200/80">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-serif font-semibold text-slate-800">
                        3 Mikrotindakan Harian Untukmu
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Langkah kecil konkret untuk menjaga potensi {primaryNameParts.main} tetap
                        sehat dan seimbang.
                      </p>
                    </div>
                  </div>

                  <div className="sm:w-44 shrink-0">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5 tabular-nums">
                      <span className="text-slate-500">Niat Tertandai</span>
                      <span className="text-emerald-700">
                        {completedHabits.length}/{practices.length}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                        style={{ width: `${habitProgressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  {practices.map((item, idx) => {
                    const isDone = completedHabits.includes(idx);
                    return (
                      <article
                        key={idx}
                        className={`p-5 rounded-2xl border flex flex-col justify-between transition-colors ${
                          isDone
                            ? 'bg-emerald-50/75 border-emerald-200'
                            : 'bg-white/95 border-slate-200/85 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-2.5">
                            <span style={{ color: primary.hex }}>{item.tag}</span>
                            <span className="text-slate-400 tabular-nums">0{idx + 1}</span>
                          </div>
                          <h3 className="text-base font-serif font-semibold text-slate-800 mb-2.5 leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-[1.75]">{item.habit}</p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-200/70 space-y-2.5">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>Latihan Harian</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => onToggleHabit(idx)}
                            className={`w-full min-h-[44px] px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                              isDone
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isDone ? (
                              <>
                                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>Niat Ditandai</span>
                              </>
                            ) : (
                              <>
                                <PlusCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>Tandai Niat</span>
                              </>
                            )}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <p className="mt-5 text-xs text-slate-500 text-center sm:text-left">
                  Pilihan niatmu otomatis tersimpan di perangkat ini dan ikut tercetak pada Rapor
                  PDF.
                </p>
              </section>

              {/* Next Tab Prompt */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => selectTab('sirah', true)}
                  className="btn-secondary min-h-[44px] px-5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Lanjut: Kisah Sirah (~{sirahReadMinutes} mnt)</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: KISAH SIRAH (DEDICATED COMFORTABLE READING MODE) */}
          {activeTab === 'sirah' && (
            <div
              id="panel-sirah"
              role="tabpanel"
              aria-labelledby="tab-sirah"
              className="space-y-4 sm:space-y-5 fade-in"
            >
              <article className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12">
                <div className="max-w-[65ch] mx-auto">
                  <header className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 mb-6 border-b border-slate-200/80">
                    <CharacterAvatar
                      id={primary.id}
                      name={primary.name}
                      colorHex={primary.hex}
                      size="small"
                    />
                    <div className="min-w-0 text-center sm:text-left">
                      <p
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: primary.hex }}
                      >
                        Analisis Historis &amp; Keteladanan Sirah · ~{sirahReadMinutes} Menit Baca
                      </p>
                      <h2 className="text-xl sm:text-2xl font-serif font-semibold text-slate-800 mt-1">
                        {primary.name}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Istilah bergaris titik dapat diklik untuk membuka glosarium psikologi.
                      </p>
                    </div>
                  </header>

                  <div className="space-y-5 text-slate-700 text-[15px] sm:text-base lg:text-[17px] leading-[1.85] text-left">
                    {sirahParagraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:text-slate-900 first-letter:mr-2.5 first-letter:float-left first-letter:leading-none'
                            : ''
                        }
                      >
                        <GlossaryText
                          text={para}
                          accentHex={primary.hex}
                          onSelectTerm={setActiveGlossary}
                        />
                      </p>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm text-slate-500">
                      Ingin mengenal keteladanan 10 Ummul Mukminin lainnya?
                    </p>
                    <button
                      type="button"
                      onClick={onViewGallery}
                      className="btn-secondary min-h-[44px] px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Buka Galeri 11 Profil</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>

        {/* 5. COMPACT SECONDARY FOOTER ACTIONS */}
        <section className="pt-3 border-t border-slate-200/70">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onViewGallery}
              className="glass-panel min-h-[46px] py-3 px-5 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Lihat Galeri 11 Ummul Mukminin</span>
            </button>
            <button
              type="button"
              onClick={onReset}
              className="btn-secondary min-h-[46px] py-3 px-5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Mulai Ulang Asesmen</span>
            </button>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-xs pt-2 pb-4">
          Refleksi karakter terinspirasi dari keteladanan sirah nabawiyah dan pendekatan psikologi
          kepribadian.
        </footer>
      </div>

      {/* Glossary Modal */}
      <ModalShell
        isOpen={Boolean(activeGlossary)}
        onClose={() => setActiveGlossary(null)}
        zIndexClass="z-50"
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
            <h3 className="text-xl font-serif font-semibold text-slate-800 mb-3 pr-8">
              {activeGlossary.title}
            </h3>
            <p className="text-sm text-slate-600 leading-[1.75]">{activeGlossary.desc}</p>
          </div>
        )}
      </ModalShell>

      {/* HD Poster Preview & Download Modal */}
      <PosterPreviewModal
        isOpen={showPosterModal}
        onClose={() => setShowPosterModal(false)}
        result={result}
        userName={userName}
        onShowToast={onShowToast}
      />
    </main>
  );
}
