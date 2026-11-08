export type ThemeCategory = 'quotidien' | 'travail' | 'grammaire';

export type JobDomain = 
  | 'libre_service' 
  | 'sante' 
  | 'periscolaire' 
  | 'btp' 
  | 'secretariat';

export type DailyDomain =
  | 'logement'
  | 'transports'
  | 'sante_quotidienne'
  | 'demarches'
  | 'courses';

export type GrammarTopic =
  | 'passe_compose_imparfait'
  | 'futur_proche_simple'
  | 'pronoms_cod_coi'
  | 'negation'
  | 'imperatif'
  | 'prepositions';

export interface VocabularyItem {
  id: string;
  word: string;
  genderOrType: 'm.' | 'f.' | 'v.' | 'adj.' | 'exp.' | 'pl.';
  definition: string;
  exampleSentence: string;
  contextNote?: string;
  category: ThemeCategory;
  domain: JobDomain | DailyDomain;
  domainLabel: string;
  difficulty: 'A2.1' | 'A2.2';
}

export interface GrammarPracticeExercise {
  id: string;
  prompt: string;
  context: string;
  sentenceBefore: string;
  blankAnswer: string;
  sentenceAfter: string;
  options: string[];
  explanation: string;
}

export interface GrammarRule {
  id: string;
  topic: GrammarTopic;
  title: string;
  shortDescription: string;
  ruleExplanation: string[];
  keyFormulas: { label: string; formula: string; example: string }[];
  comparisons?: { conceptA: string; conceptB: string; rows: { aspect: string; exampleA: string; exampleB: string }[] };
  commonMistakes: { incorrect: string; correct: string; tip: string }[];
  practiceExercises: GrammarPracticeExercise[];
}

export type ExerciseType = 'fill_in' | 'word_order' | 'matching';

export interface FillInExercise {
  id: string;
  type: 'fill_in';
  theme: string;
  context: string;
  sentenceBefore: string;
  blankAnswer: string;
  sentenceAfter: string;
  options: string[];
  explanation: string;
}

export interface WordOrderExercise {
  id: string;
  type: 'word_order';
  theme: string;
  context: string;
  scrambledWords: string[];
  correctSentence: string;
  translationOrMeaning: string;
}

export interface MatchingExercise {
  id: string;
  type: 'matching';
  theme: string;
  title: string;
  pairs: { id: string; left: string; right: string }[];
}

export type ExerciseItem = FillInExercise | WordOrderExercise | MatchingExercise;

export interface QuizQuestion {
  id: string;
  category: ThemeCategory;
  domainOrTopic: string;
  question: string;
  contextNote?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ScenarioStep {
  speaker: string;
  role: 'interlocutor' | 'user';
  text: string;
  audioPrompt?: string;
}

export interface ScenarioChoice {
  text: string;
  isAppropriate: boolean;
  feedback: string;
  nextStepIndex?: number;
}

export interface ScenarioSituation {
  id: string;
  domain: JobDomain | DailyDomain;
  domainTitle: string;
  title: string;
  description: string;
  initialContext: string;
  dialogueNodes: {
    nodeId: string;
    interlocutorName: string;
    interlocutorRole: string;
    interlocutorText: string;
    userPrompt: string;
    choices: ScenarioChoice[];
  }[];
}

export interface UserStats {
  learnedVocabIds: string[];
  bookmarkedVocabIds: string[];
  completedExercisesIds: string[];
  mistakeQuestionIds: string[];
  quizHistory: {
    id: string;
    date: string;
    category: string;
    score: number;
    total: number;
  }[];
  xp: number;
  lastActiveDate: string;
}
