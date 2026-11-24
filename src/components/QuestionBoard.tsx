import { useState } from 'react';
import { ChevronLeft, LayoutGrid, X } from 'lucide-react';
import { LIKERT_OPTIONS } from '../data/questions';
import type { QuestionItem } from '../types';
import { CHUNK_SIZE, countAnswered, findFirstUnansweredIndex } from '../utils/scoring';
import { ModalShell } from './ModalShell';

interface QuestionBoardProps {
  question: QuestionItem;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (val: number) => void;
  onPrevious: () => void;
  onBackToWelcome: () => void;
  currentAnswer?: number;
  answerHistory: Record<number, number>;
  onJumpToQuestion: (targetIndex: number) => void;
  isFading: boolean;
}

export function QuestionBoard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onPrevious,
  onBackToWelcome,
  currentAnswer,
  answerHistory,
  onJumpToQuestion,
  isFading,
}: QuestionBoardProps) {
  const [showQuestionList, setShowQuestionList] = useState(false);
  const answeredCount = countAnswered(answerHistory, totalQuestions);
  const firstUnanswered = findFirstUnansweredIndex(answerHistory, totalQuestions);

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-10 pb-24 px-4 sm:px-6 ${
        isFading ? 'question-exit' : 'question-enter'
      }`}
    >
      <section className="max-w-2xl w-full">
        {/* Top Header */}
        <header className="mb-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2 min-w-0">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2048] tracking-tight tabular-nums whitespace-nowrap">
                Pertanyaan {currentIndex + 1}
              </h1>
              <span className="text-xs sm:text-sm font-medium text-slate-400 tabular-nums whitespace-nowrap">
                dari {totalQuestions}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowQuestionList(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-indigo-200/80 bg-white/95 hover:bg-white text-xs sm:text-sm font-semibold text-[#4338CA] shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums"
              aria-label="Buka daftar soal"
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>
                Daftar ({answeredCount}/{totalQuestions})
              </span>
            </button>
          </div>

          {/* Segmented Progress Bar (5 Chunks of 11) */}
          <div
            className="grid grid-cols-5 gap-2 sm:gap-2.5 mt-4"
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-label={`Progres asesmen: ${answeredCount} dari ${totalQuestions} terjawab`}
          >
            {[0, 1, 2, 3, 4].map((segIdx) => {
              const chunkStart = segIdx * CHUNK_SIZE;
              const chunkEnd = chunkStart + CHUNK_SIZE;
              let chunkAnswered = 0;
              for (let i = chunkStart; i < chunkEnd; i++) {
                if (typeof answerHistory[i] === 'number') chunkAnswered += 1;
              }
              const isCurrent = currentIndex >= chunkStart && currentIndex < chunkEnd;
              const fillPct = Math.round((chunkAnswered / CHUNK_SIZE) * 100);

              return (
                <div
                  key={segIdx}
                  className={`h-2 rounded-full overflow-hidden relative ${
                    isCurrent ? 'bg-indigo-100 ring-1 ring-indigo-300/60' : 'bg-[#E5E7F2]'
                  }`}
                >
                  <div
                    className="h-full bg-[#201E43] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
              );
            })}
          </div>
        </header>

        {/* Secondary Navigation */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            {currentIndex > 0 ? (
              <>
                <button
                  type="button"
                  disabled={isFading}
                  onClick={onPrevious}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white/90 hover:bg-white text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-500" aria-hidden="true" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  disabled={isFading}
                  onClick={onBackToWelcome}
                  className="inline-flex items-center px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-white/70 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  Halaman awal
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={isFading}
                onClick={onBackToWelcome}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white/90 hover:bg-white text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>Halaman awal</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Card */}
        <article className="bg-white rounded-3xl border border-[#E5E7F2] p-6 sm:p-9 mb-5 shadow-sm flex items-center justify-center text-center min-h-[148px] sm:min-h-[168px]">
          <h2
            className="font-sans text-[#1E1B4B] text-base sm:text-xl font-semibold leading-relaxed max-w-xl mx-auto"
            aria-live="polite"
          >
            {question.t}
          </h2>
        </article>

        {/* Likert Answer Options */}
        <nav aria-label="Pilihan Jawaban" className="flex flex-col space-y-2.5 sm:space-y-3">
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = currentAnswer === opt.val;
            return (
              <button
                key={opt.val}
                type="button"
                disabled={isFading}
                onClick={() => onAnswer(opt.val)}
                className={`w-full rounded-2xl border transition-all duration-150 p-3 sm:p-3.5 flex items-center gap-3.5 sm:gap-4 cursor-pointer text-left disabled:pointer-events-none ${
                  isSelected
                    ? 'bg-[#F5F3FF] border-[#4338CA] ring-2 ring-[#4338CA]/20 shadow-sm'
                    : 'bg-white border-[#E5E7F2] hover:border-indigo-300 hover:shadow-sm'
                }`}
                aria-label={`Pilih ${opt.val}: ${opt.label}`}
                aria-pressed={isSelected}
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base shrink-0 tabular-nums transition-transform ${
                    opt.badgeBg
                  } ${opt.badgeText} ${isSelected ? 'scale-105 ring-2 ring-[#4338CA]/30' : ''}`}
                >
                  {opt.val}
                </div>
                <span className="font-semibold text-slate-800 text-sm sm:text-base leading-snug">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </nav>
      </section>

      {/* Question List Modal (Portal + Esc + Backdrop Close + Scroll Lock) */}
      <ModalShell
        isOpen={showQuestionList}
        onClose={() => setShowQuestionList(false)}
        ariaLabel="Daftar Pertanyaan"
      >
        <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-sans font-bold text-slate-800">Daftar Pertanyaan</h3>
              <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                Terjawab:{' '}
                <span className="font-semibold text-indigo-600">{answeredCount}</span> dari{' '}
                {totalQuestions} soal
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowQuestionList(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup daftar soal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs text-slate-500 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#EDE9FE] border border-indigo-300" />
                Terjawab
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white border-2 border-indigo-600" />
                Aktif
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
                Belum
              </span>
            </div>

            {firstUnanswered !== -1 && firstUnanswered !== currentIndex && (
              <button
                type="button"
                onClick={() => {
                  setShowQuestionList(false);
                  onJumpToQuestion(firstUnanswered);
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 cursor-pointer"
              >
                Ke soal belum dijawab (#{firstUnanswered + 1})
              </button>
            )}
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-11 gap-2 overflow-y-auto py-4 px-0.5 max-h-[50vh]">
            {Array.from({ length: totalQuestions }).map((_, qIdx) => {
              const isCurr = qIdx === currentIndex;
              const ans = answerHistory[qIdx];
              const hasAns = typeof ans === 'number';

              return (
                <button
                  key={qIdx}
                  type="button"
                  onClick={() => {
                    setShowQuestionList(false);
                    onJumpToQuestion(qIdx);
                  }}
                  className={`h-11 rounded-xl text-xs font-bold transition-colors flex flex-col items-center justify-center cursor-pointer tabular-nums ${
                    isCurr
                      ? 'ring-2 ring-indigo-600 bg-indigo-50 text-indigo-700'
                      : hasAns
                        ? 'bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#4338CA] border border-indigo-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                  aria-label={`Buka soal nomor ${qIdx + 1}${hasAns ? `, terjawab ${ans}` : ', belum dijawab'}`}
                >
                  <span>{qIdx + 1}</span>
                  {hasAns && <span className="text-[10px] opacity-75 font-medium">({ans})</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => setShowQuestionList(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </ModalShell>
    </main>
  );
}
