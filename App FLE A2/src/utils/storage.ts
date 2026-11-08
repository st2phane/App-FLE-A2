import { UserStats } from '../types/fle';

const STORAGE_KEY = 'fle_a2_user_stats_v1';

const defaultStats: UserStats = {
  learnedVocabIds: [],
  bookmarkedVocabIds: [],
  completedExercisesIds: [],
  mistakeQuestionIds: [],
  quizHistory: [],
  xp: 0,
  lastActiveDate: new Date().toISOString(),
};

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStats,
      ...parsed,
      learnedVocabIds: Array.isArray(parsed.learnedVocabIds) ? parsed.learnedVocabIds : [],
      bookmarkedVocabIds: Array.isArray(parsed.bookmarkedVocabIds) ? parsed.bookmarkedVocabIds : [],
      completedExercisesIds: Array.isArray(parsed.completedExercisesIds) ? parsed.completedExercisesIds : [],
      mistakeQuestionIds: Array.isArray(parsed.mistakeQuestionIds) ? parsed.mistakeQuestionIds : [],
      quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
    };
  } catch (e) {
    console.error('Error loading stats', e);
    return defaultStats;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving stats', e);
  }
}

export function toggleLearnedVocab(vocabId: string): UserStats {
  const stats = loadUserStats();
  const exists = stats.learnedVocabIds.includes(vocabId);
  const updatedLearned = exists
    ? stats.learnedVocabIds.filter((id) => id !== vocabId)
    : [...stats.learnedVocabIds, vocabId];
  
  const xpDelta = exists ? -10 : 10;
  const newStats: UserStats = {
    ...stats,
    learnedVocabIds: updatedLearned,
    xp: Math.max(0, stats.xp + xpDelta),
    lastActiveDate: new Date().toISOString(),
  };
  saveUserStats(newStats);
  return newStats;
}

export function toggleBookmarkVocab(vocabId: string): UserStats {
  const stats = loadUserStats();
  const exists = stats.bookmarkedVocabIds.includes(vocabId);
  const updatedBookmarks = exists
    ? stats.bookmarkedVocabIds.filter((id) => id !== vocabId)
    : [...stats.bookmarkedVocabIds, vocabId];
  
  const newStats: UserStats = {
    ...stats,
    bookmarkedVocabIds: updatedBookmarks,
  };
  saveUserStats(newStats);
  return newStats;
}

export function markExerciseCompleted(exerciseId: string, xpEarned: number = 15): UserStats {
  const stats = loadUserStats();
  const alreadyDone = stats.completedExercisesIds.includes(exerciseId);
  const completed = alreadyDone ? stats.completedExercisesIds : [...stats.completedExercisesIds, exerciseId];
  
  const newStats: UserStats = {
    ...stats,
    completedExercisesIds: completed,
    xp: stats.xp + (alreadyDone ? 5 : xpEarned),
    lastActiveDate: new Date().toISOString(),
  };
  saveUserStats(newStats);
  return newStats;
}

export function recordQuizAttempt(
  category: string,
  score: number,
  total: number,
  mistakes: string[]
): UserStats {
  const stats = loadUserStats();
  const newAttempt = {
    id: 'quiz_' + Date.now(),
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
    category,
    score,
    total,
  };

  // Merge mistakes
  const currentMistakes = new Set(stats.mistakeQuestionIds);
  mistakes.forEach((m) => currentMistakes.add(m));

  const earnedXp = score * 10;

  const newStats: UserStats = {
    ...stats,
    quizHistory: [newAttempt, ...stats.quizHistory.slice(0, 19)], // keep last 20
    mistakeQuestionIds: Array.from(currentMistakes),
    xp: stats.xp + earnedXp,
    lastActiveDate: new Date().toISOString(),
  };
  saveUserStats(newStats);
  return newStats;
}

export function removeMistake(questionId: string): UserStats {
  const stats = loadUserStats();
  const newStats: UserStats = {
    ...stats,
    mistakeQuestionIds: stats.mistakeQuestionIds.filter((id) => id !== questionId),
  };
  saveUserStats(newStats);
  return newStats;
}

export function resetAllStats(): UserStats {
  saveUserStats(defaultStats);
  return defaultStats;
}
