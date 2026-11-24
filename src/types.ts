export type ArchetypeId =
  | 'khadijah'
  | 'saudah'
  | 'aisyah'
  | 'hafshah'
  | 'ummusalamah'
  | 'zainabkhuzaimah'
  | 'zainabjahsy'
  | 'juwairiyah'
  | 'ummuhabibah'
  | 'shafiyyah'
  | 'maimunah';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  epithet: string;
  hex: string;
  shortSummary: string;
  history: string;
  roleDynamics: string;
  wisdom: string[];
}

export interface QuestionItem {
  id: number;
  a: ArchetypeId;
  t: string;
}

export type GameState =
  | 'welcome'
  | 'data_entry'
  | 'playing'
  | 'break'
  | 'analyzing'
  | 'result'
  | 'gallery';

export type AmbientType = 'wind' | 'ocean' | 'rain' | 'forest';

export interface ScoreEntry {
  id: ArchetypeId;
  name: string;
  fullName: string;
  hex: string;
  score: number;
  matchPercentage: number;
  fivesCount: number;
  foursCount: number;
}

export interface ArchetypeResultItem extends Archetype {
  score: number;
  matchPercentage: number;
}

export interface AssessmentResult {
  primary: ArchetypeResultItem;
  secondary: ArchetypeResultItem | null;
  lowest: ArchetypeResultItem;
  scores: ScoreEntry[];
}

export interface DailyPractice {
  title: string;
  tag: string;
  habit: string;
}

export interface GlossaryEntry {
  title: string;
  desc: string;
}

export interface PersistedAssessmentState {
  version: 2;
  questionOrder: number[];
  currentIndex: number;
  answerHistory: Record<number, number>;
  completedBreaks: number[];
  completedHabits: number[];
  userName: string;
  gameState: GameState;
  lastSaved: string;
}
