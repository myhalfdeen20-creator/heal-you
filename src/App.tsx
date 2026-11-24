import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, RotateCcw, X } from 'lucide-react';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { AudioControls } from './components/AudioControls';
import { BreakScreen } from './components/BreakScreen';
import { DataEntryScreen } from './components/DataEntryScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { ModalShell } from './components/ModalShell';
import { ParallaxBackground } from './components/ParallaxBackground';
import { QuestionBoard } from './components/QuestionBoard';
import { ResultDashboard } from './components/ResultDashboard';
import { WelcomeScreen } from './components/WelcomeScreen';
import { RAW_QUESTIONS } from './data/questions';
import type { AmbientType, GameState } from './types';
import { audioEngine } from './utils/audioEngine';
import {
  CHUNK_SIZE,
  calculateAssessmentResult,
  clearPersistedState,
  countAnswered,
  createShuffledQuestionOrder,
  findFirstUnansweredIndex,
  loadPersistedState,
  resolveOrderedQuestions,
  savePersistedState,
} from './utils/scoring';

const TRANSITION_MS = 220;

export function App() {
  const initialSaved = useMemo(() => loadPersistedState(), []);

  const [questionOrder, setQuestionOrder] = useState<number[]>(
    () => initialSaved?.questionOrder ?? []
  );
  const [currentIndex, setCurrentIndex] = useState<number>(
    () => initialSaved?.currentIndex ?? 0
  );
  const [answerHistory, setAnswerHistory] = useState<Record<number, number>>(
    () => initialSaved?.answerHistory ?? {}
  );
  const [completedBreaks, setCompletedBreaks] = useState<number[]>(
    () => initialSaved?.completedBreaks ?? []
  );
  const [completedHabits, setCompletedHabits] = useState<number[]>(
    () => initialSaved?.completedHabits ?? []
  );
  const [userName, setUserName] = useState<string>(() => initialSaved?.userName ?? '');
  const [gameState, setGameState] = useState<GameState>(
    () => initialSaved?.gameState ?? 'welcome'
  );
  const [galleryReturnState, setGalleryReturnState] = useState<'welcome' | 'result'>('welcome');

  const [isFading, setIsFading] = useState(false);
  const isTransitioningRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [ambientType, setAmbientType] = useState<AmbientType>('wind');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const orderedQuestions = useMemo(
    () => (questionOrder.length > 0 ? resolveOrderedQuestions(questionOrder) : []),
    [questionOrder]
  );

  const answeredCount = useMemo(
    () => countAnswered(answerHistory, RAW_QUESTIONS.length),
    [answerHistory]
  );
  const isAssessmentComplete =
    orderedQuestions.length === RAW_QUESTIONS.length && answeredCount === RAW_QUESTIONS.length;

  const assessmentResult = useMemo(() => {
    if (orderedQuestions.length === 0) return null;
    return calculateAssessmentResult(orderedQuestions, answerHistory);
  }, [orderedQuestions, answerHistory]);

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3400);
  }, []);

  // Cleanup timers and audio on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
      audioEngine.stop();
    };
  }, []);

  // Persist compact session state automatically whenever meaningful data changes
  useEffect(() => {
    if (questionOrder.length !== RAW_QUESTIONS.length) return;
    savePersistedState({
      questionOrder,
      currentIndex,
      answerHistory,
      completedBreaks,
      completedHabits,
      userName,
      gameState,
    });
  }, [
    questionOrder,
    currentIndex,
    answerHistory,
    completedBreaks,
    completedHabits,
    userName,
    gameState,
  ]);

  const runTransition = useCallback((callback: () => void, scrollTop = true) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsFading(true);

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      callback();
      setIsFading(false);
      isTransitioningRef.current = false;
      transitionTimerRef.current = null;
      if (scrollTop) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }, TRANSITION_MS);
  }, []);

  const handleToggleAudio = useCallback(() => {
    if (isAudioPlaying) {
      audioEngine.stop();
      setIsAudioPlaying(false);
    } else {
      audioEngine.play(ambientType);
      setIsAudioPlaying(true);
    }
  }, [isAudioPlaying, ambientType]);

  const handleSelectAmbient = useCallback(
    (type: AmbientType) => {
      setAmbientType(type);
      if (isAudioPlaying) {
        audioEngine.setType(type);
      } else {
        audioEngine.play(type);
        setIsAudioPlaying(true);
      }
    },
    [isAudioPlaying]
  );

  const handleStartNew = useCallback(() => {
    runTransition(() => setGameState('data_entry'));
  }, [runTransition]);

  const handleSubmitUserData = useCallback(
    (name: string) => {
      const shuffledOrder = createShuffledQuestionOrder();
      runTransition(() => {
        setUserName(name);
        setQuestionOrder(shuffledOrder);
        setCurrentIndex(0);
        setAnswerHistory({});
        setCompletedBreaks([]);
        setCompletedHabits([]);
        setGameState('playing');
      });
    },
    [runTransition]
  );

  const handleResume = useCallback(() => {
    if (questionOrder.length !== RAW_QUESTIONS.length) {
      handleStartNew();
      return;
    }
    if (isAssessmentComplete) {
      runTransition(() => setGameState('result'));
      return;
    }
    const firstUnanswered = findFirstUnansweredIndex(answerHistory, RAW_QUESTIONS.length);
    const safeIdx =
      currentIndex >= RAW_QUESTIONS.length
        ? Math.max(0, firstUnanswered)
        : currentIndex;
    runTransition(() => {
      setCurrentIndex(safeIdx);
      setGameState('playing');
    });
  }, [
    questionOrder.length,
    isAssessmentComplete,
    answerHistory,
    currentIndex,
    handleStartNew,
    runTransition,
  ]);

  const handleAnswer = useCallback(
    (val: number) => {
      if (isTransitioningRef.current) return;
      if (orderedQuestions.length === 0) return;

      const updatedHistory: Record<number, number> = {
        ...answerHistory,
        [currentIndex]: val,
      };
      const total = orderedQuestions.length;
      const newAnsweredCount = countAnswered(updatedHistory, total);
      const nextIndex = currentIndex + 1;

      // Case 1: All 55 questions answered -> proceed to analyzing -> result
      if (newAnsweredCount === total) {
        runTransition(() => {
          setAnswerHistory(updatedHistory);
          setCurrentIndex(total);
          setGameState('analyzing');
        }, true);
        return;
      }

      // Case 2: Answered last question (#55), but earlier questions are still unanswered!
      if (nextIndex >= total) {
        const missingIdx = findFirstUnansweredIndex(updatedHistory, total);
        const remaining = total - newAnsweredCount;
        showToast(
          `Masih ada ${remaining} pertanyaan yang belum dijawab. Mengarahkan ke soal #${missingIdx + 1}.`
        );
        runTransition(() => {
          setAnswerHistory(updatedHistory);
          setCurrentIndex(Math.max(0, missingIdx));
          setGameState('playing');
        }, true);
        return;
      }

      // Case 3: Trigger break screen ONCE per 11-question chunk (at 11, 22, 33, 44)
      const isChunkBoundary = nextIndex % CHUNK_SIZE === 0 && nextIndex < total;
      const chunkNumber = Math.floor(nextIndex / CHUNK_SIZE);
      const shouldShowBreak =
        isChunkBoundary && !completedBreaks.includes(chunkNumber);

      runTransition(
        () => {
          setAnswerHistory(updatedHistory);
          setCurrentIndex(nextIndex);
          if (shouldShowBreak) {
            setCompletedBreaks((prev) => [...prev, chunkNumber]);
            setGameState('break');
          } else {
            setGameState('playing');
          }
        },
        shouldShowBreak
      );
    },
    [answerHistory, completedBreaks, currentIndex, orderedQuestions.length, runTransition, showToast]
  );

  const handlePrevious = useCallback(() => {
    if (currentIndex <= 0) return;
    const prevIdx = currentIndex - 1;
    runTransition(() => {
      setCurrentIndex(prevIdx);
      setGameState('playing');
    }, false);
  }, [currentIndex, runTransition]);

  const handleJumpToQuestion = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= orderedQuestions.length) return;
      runTransition(() => {
        setCurrentIndex(targetIndex);
        setGameState('playing');
      }, true);
    },
    [orderedQuestions.length, runTransition]
  );

  const handleAnalyzingComplete = useCallback(() => {
    runTransition(() => setGameState('result'), true);
  }, [runTransition]);

  const handleToggleHabit = useCallback(
    (idx: number) => {
      setCompletedHabits((prev) => {
        const exists = prev.includes(idx);
        const next = exists ? prev.filter((i) => i !== idx) : [...prev, idx];
        if (!exists) {
          showToast('Niat praktik harian berhasil ditandai dan tersimpan.');
        }
        return next;
      });
    },
    [showToast]
  );

  const handleOpenGalleryFrom = useCallback(
    (source: 'welcome' | 'result') => {
      setGalleryReturnState(source);
      runTransition(() => setGameState('gallery'), true);
    },
    [runTransition]
  );

  const handleResetConfirm = useCallback(() => {
    clearPersistedState();
    setQuestionOrder([]);
    setCurrentIndex(0);
    setAnswerHistory({});
    setCompletedBreaks([]);
    setCompletedHabits([]);
    setUserName('');
    setShowResetConfirm(false);
    setGameState('welcome');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    showToast('Sesi asesmen telah direset.');
  }, [showToast]);

  const safeQuestionIndex =
    orderedQuestions.length > 0
      ? Math.max(0, Math.min(orderedQuestions.length - 1, currentIndex))
      : 0;

  return (
    <div className="min-h-screen text-slate-700 selection:bg-indigo-100 selection:text-indigo-900 relative">
      <ParallaxBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <AudioControls
          isPlaying={isAudioPlaying}
          ambientType={ambientType}
          onTogglePlay={handleToggleAudio}
          onSelectType={handleSelectAmbient}
        />

        {gameState === 'welcome' && (
          <WelcomeScreen
            onStart={handleStartNew}
            onResume={handleResume}
            onReset={() => setShowResetConfirm(true)}
            onViewGallery={() => handleOpenGalleryFrom('welcome')}
            answeredCount={answeredCount}
            totalQuestions={RAW_QUESTIONS.length}
            hasSession={orderedQuestions.length === RAW_QUESTIONS.length && answeredCount > 0}
            isComplete={isAssessmentComplete}
            isFading={isFading}
          />
        )}

        {gameState === 'data_entry' && (
          <DataEntryScreen
            initialName={userName}
            onSubmit={handleSubmitUserData}
            onBack={() => runTransition(() => setGameState('welcome'))}
            isFading={isFading}
          />
        )}

        {gameState === 'playing' && orderedQuestions.length > 0 && (
          <QuestionBoard
            question={orderedQuestions[safeQuestionIndex]}
            currentIndex={safeQuestionIndex}
            totalQuestions={orderedQuestions.length}
            onAnswer={handleAnswer}
            onPrevious={handlePrevious}
            onBackToWelcome={() => runTransition(() => setGameState('welcome'))}
            currentAnswer={answerHistory[safeQuestionIndex]}
            answerHistory={answerHistory}
            onJumpToQuestion={handleJumpToQuestion}
            isFading={isFading}
          />
        )}

        {gameState === 'break' && (
          <BreakScreen
            chunkIndex={Math.floor(currentIndex / CHUNK_SIZE)}
            onContinue={() => runTransition(() => setGameState('playing'))}
            onBack={handlePrevious}
            isFading={isFading}
          />
        )}

        {gameState === 'analyzing' && (
          <AnalyzingScreen onComplete={handleAnalyzingComplete} isFading={isFading} />
        )}

        {gameState === 'result' && assessmentResult && (
          <ResultDashboard
            result={assessmentResult}
            userName={userName}
            completedHabits={completedHabits}
            onToggleHabit={handleToggleHabit}
            onShowToast={showToast}
            onReset={() => setShowResetConfirm(true)}
            onViewGallery={() => handleOpenGalleryFrom('result')}
            isFading={isFading}
          />
        )}

        {gameState === 'gallery' && (
          <GalleryScreen
            onBack={() =>
              runTransition(() =>
                setGameState(
                  galleryReturnState === 'result' && isAssessmentComplete ? 'result' : 'welcome'
                )
              )
            }
            backLabel={
              galleryReturnState === 'result' && isAssessmentComplete
                ? 'Kembali ke Hasil'
                : 'Kembali ke Halaman Awal'
            }
            isFading={isFading}
          />
        )}
      </div>

      {/* Reset Confirmation Modal */}
      <ModalShell
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        zIndexClass="z-50"
        ariaLabel="Konfirmasi Mulai Ulang"
      >
        <div className="bg-white border border-slate-200 max-w-sm w-full rounded-3xl p-6 sm:p-8 shadow-2xl text-center slide-up">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-serif font-semibold text-slate-800 mb-2">Mulai Ulang?</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Semua riwayat jawaban dan catatan praktik harian dari sesi ini akan dihapus agar kamu
            bisa memulai dari awal.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => setShowResetConfirm(false)}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleResetConfirm}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
            >
              Ya, Mulai Ulang
            </button>
          </div>
        </div>
      </ModalShell>

      {/* Top-center Toast (Never collides with bottom-right AudioControls) */}
      {toastMessage &&
        createPortal(
          <div
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[70] max-w-[92vw] px-4 py-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-medium shadow-xl flex items-center gap-2.5 border border-slate-700/70 slide-up"
            role="status"
            aria-live="polite"
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span className="text-slate-100">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-1 text-slate-400 hover:text-white transition-colors p-0.5 rounded-full cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

export default App;
