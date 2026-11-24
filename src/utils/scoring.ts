import { ARCHETYPES, ARCHETYPE_MAP } from '../data/archetypes';
import { RAW_QUESTIONS } from '../data/questions';
import type {
  ArchetypeId,
  AssessmentResult,
  GameState,
  PersistedAssessmentState,
  QuestionItem,
  ScoreEntry,
} from '../types';

export const STORAGE_KEY = 'healyou_ummul_mukminin_state';
export const CHUNK_SIZE = 11;
export const MAX_SCORE_PER_ARCHETYPE = 25; // 5 questions * 5 points

export function createShuffledQuestionOrder(): number[] {
  const order = RAW_QUESTIONS.map((q) => q.id);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function resolveOrderedQuestions(questionOrder: number[]): QuestionItem[] {
  if (questionOrder.length !== RAW_QUESTIONS.length) {
    return RAW_QUESTIONS;
  }
  const resolved: QuestionItem[] = [];
  for (const id of questionOrder) {
    const q = RAW_QUESTIONS[id];
    if (!q) return RAW_QUESTIONS;
    resolved.push(q);
  }
  return resolved;
}

export function countAnswered(answerHistory: Record<number, number>, total: number): number {
  let count = 0;
  for (let i = 0; i < total; i++) {
    const v = answerHistory[i];
    if (typeof v === 'number' && v >= 1 && v <= 5) count++;
  }
  return count;
}

export function findFirstUnansweredIndex(
  answerHistory: Record<number, number>,
  total: number
): number {
  for (let i = 0; i < total; i++) {
    const v = answerHistory[i];
    if (typeof v !== 'number' || v < 1 || v > 5) return i;
  }
  return -1;
}

/**
 * Computes deterministic assessment results directly from answerHistory + ordered questions.
 * Uses fair multi-level tie-breaking (total score -> count of 5s -> count of 4s)
 * instead of silently favoring whichever archetype happens to appear first in the array.
 */
export function calculateAssessmentResult(
  orderedQuestions: QuestionItem[],
  answerHistory: Record<number, number>
): AssessmentResult {
  const totals: Record<ArchetypeId, { score: number; fives: number; fours: number }> = {
    khadijah: { score: 0, fives: 0, fours: 0 },
    saudah: { score: 0, fives: 0, fours: 0 },
    aisyah: { score: 0, fives: 0, fours: 0 },
    hafshah: { score: 0, fives: 0, fours: 0 },
    ummusalamah: { score: 0, fives: 0, fours: 0 },
    zainabkhuzaimah: { score: 0, fives: 0, fours: 0 },
    zainabjahsy: { score: 0, fives: 0, fours: 0 },
    juwairiyah: { score: 0, fives: 0, fours: 0 },
    ummuhabibah: { score: 0, fives: 0, fours: 0 },
    shafiyyah: { score: 0, fives: 0, fours: 0 },
    maimunah: { score: 0, fives: 0, fours: 0 },
  };

  orderedQuestions.forEach((q, idx) => {
    const val = answerHistory[idx];
    if (typeof val === 'number' && val >= 1 && val <= 5) {
      totals[q.a].score += val;
      if (val === 5) totals[q.a].fives += 1;
      if (val === 4) totals[q.a].fours += 1;
    }
  });

  const scores: ScoreEntry[] = ARCHETYPES.map((arch) => {
    const stat = totals[arch.id];
    return {
      id: arch.id,
      name: arch.name.split(' ')[0],
      fullName: arch.name,
      hex: arch.hex,
      score: stat.score,
      matchPercentage: Math.round((stat.score / MAX_SCORE_PER_ARCHETYPE) * 100),
      fivesCount: stat.fives,
      foursCount: stat.fours,
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.fivesCount !== a.fivesCount) return b.fivesCount - a.fivesCount;
    return b.foursCount - a.foursCount;
  });

  const top = scores[0];
  const runnerUp = scores[1];
  const bottom = scores[scores.length - 1];

  const primary = {
    ...ARCHETYPE_MAP[top.id],
    score: top.score,
    matchPercentage: top.matchPercentage,
  };

  const secondary =
    runnerUp && top.score - runnerUp.score <= 3
      ? {
          ...ARCHETYPE_MAP[runnerUp.id],
          score: runnerUp.score,
          matchPercentage: runnerUp.matchPercentage,
        }
      : null;

  const lowest = {
    ...ARCHETYPE_MAP[bottom.id],
    score: bottom.score,
    matchPercentage: bottom.matchPercentage,
  };

  return { primary, secondary, lowest, scores };
}

const VALID_STATES: GameState[] = [
  'welcome',
  'data_entry',
  'playing',
  'break',
  'analyzing',
  'result',
  'gallery',
];

export function loadPersistedState(): PersistedAssessmentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;

    let questionOrder: number[] = [];

    if (
      parsed.version === 2 &&
      Array.isArray(parsed.questionOrder) &&
      parsed.questionOrder.length === RAW_QUESTIONS.length
    ) {
      questionOrder = parsed.questionOrder.map(Number);
    } else if (
      Array.isArray(parsed.questions) &&
      parsed.questions.length === RAW_QUESTIONS.length
    ) {
      // Backward-compatible migration from legacy v1 storage that saved full question text
      const textToId = new Map(RAW_QUESTIONS.map((q) => [q.t, q.id]));
      const mapped = (parsed.questions as Array<{ t?: string }>)
        .map((q) => (q.t ? textToId.get(q.t) : undefined))
        .filter((id): id is number => typeof id === 'number');
      if (mapped.length === RAW_QUESTIONS.length) {
        questionOrder = mapped;
      }
    }

    if (questionOrder.length !== RAW_QUESTIONS.length) {
      return null;
    }

    const answerHistory: Record<number, number> = {};
    if (parsed.answerHistory && typeof parsed.answerHistory === 'object') {
      for (const [k, v] of Object.entries(parsed.answerHistory as Record<string, unknown>)) {
        const idx = Number(k);
        const val = Number(v);
        if (
          Number.isInteger(idx) &&
          idx >= 0 &&
          idx < RAW_QUESTIONS.length &&
          val >= 1 &&
          val <= 5
        ) {
          answerHistory[idx] = val;
        }
      }
    }

    const rawIndex = typeof parsed.currentIndex === 'number' ? parsed.currentIndex : 0;
    const currentIndex = Math.max(0, Math.min(RAW_QUESTIONS.length, rawIndex));
    const userName = typeof parsed.userName === 'string' ? parsed.userName.slice(0, 30) : '';
    const completedBreaks = Array.isArray(parsed.completedBreaks)
      ? parsed.completedBreaks.filter((n): n is number => typeof n === 'number')
      : [];
    const completedHabits = Array.isArray(parsed.completedHabits)
      ? parsed.completedHabits.filter((n): n is number => typeof n === 'number')
      : [];

    const allAnswered = countAnswered(answerHistory, RAW_QUESTIONS.length) === RAW_QUESTIONS.length;
    let gameState: GameState = VALID_STATES.includes(parsed.gameState as GameState)
      ? (parsed.gameState as GameState)
      : 'welcome';

    // Never restore directly into a broken/incomplete result or out-of-bounds playing state
    if ((gameState === 'result' || gameState === 'analyzing') && !allAnswered) {
      gameState = 'playing';
    }
    if (gameState === 'playing' && currentIndex >= RAW_QUESTIONS.length) {
      gameState = allAnswered ? 'result' : 'playing';
    }
    if (gameState === 'analyzing' && allAnswered) {
      gameState = 'result';
    }

    return {
      version: 2,
      questionOrder,
      currentIndex:
        gameState === 'playing' && currentIndex >= RAW_QUESTIONS.length
          ? Math.max(0, findFirstUnansweredIndex(answerHistory, RAW_QUESTIONS.length))
          : currentIndex,
      answerHistory,
      completedBreaks,
      completedHabits,
      userName,
      gameState,
      lastSaved: typeof parsed.lastSaved === 'string' ? parsed.lastSaved : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function savePersistedState(state: Omit<PersistedAssessmentState, 'version' | 'lastSaved'>): void {
  try {
    const payload: PersistedAssessmentState = {
      version: 2,
      ...state,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota or private-mode errors gracefully
  }
}

export function clearPersistedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
