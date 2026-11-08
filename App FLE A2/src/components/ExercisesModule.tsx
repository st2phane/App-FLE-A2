import React, { useState } from 'react';
import { UserStats, FillInExercise, WordOrderExercise, MatchingExercise } from '../types/fle';
import { EXERCISES_LIST } from '../data/exercisesData';
import { markExerciseCompleted } from '../utils/storage';
import { AudioButton } from './AudioButton';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExercisesModuleProps {
  stats: UserStats;
  onUpdateStats: (stats: UserStats) => void;
}

export const ExercisesModule: React.FC<ExercisesModuleProps> = ({ stats, onUpdateStats }) => {
  const [exerciseTypeFilter, setExerciseTypeFilter] = useState<'all' | 'fill_in' | 'word_order' | 'matching'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtered exercises
  const filteredExercises = EXERCISES_LIST.filter(
    (ex) => exerciseTypeFilter === 'all' || ex.type === exerciseTypeFilter
  );

  const currentExercise = filteredExercises[currentIndex] || filteredExercises[0];

  // ==========================================
  // STATE FOR FILL-IN
  // ==========================================
  const [fillSelectedOption, setFillSelectedOption] = useState<string | null>(null);
  const [fillFeedback, setFillFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // ==========================================
  // STATE FOR WORD ORDER
  // ==========================================
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [orderFeedback, setOrderFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // ==========================================
  // STATE FOR MATCHING
  // ==========================================
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // pair ids
  const [matchingError, setMatchingError] = useState<boolean>(false);

  // Reset exercise states on switch
  const handleSelectExercise = (idx: number) => {
    setCurrentIndex(idx);
    setFillSelectedOption(null);
    setFillFeedback(null);
    setOrderedWords([]);
    setOrderFeedback(null);
    setSelectedLeft(null);
    setMatchedPairs([]);
    setMatchingError(false);
  };

  // Completion trigger
  const handleComplete = (exId: string, xp = 15) => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
    });
    const updated = markExerciseCompleted(exId, xp);
    onUpdateStats(updated);
  };

  // 1. Fill-in handler
  const handleFillOptionClick = (option: string, exercise: FillInExercise) => {
    if (fillFeedback === 'correct') return;
    setFillSelectedOption(option);
    if (option === exercise.blankAnswer) {
      setFillFeedback('correct');
      handleComplete(exercise.id, 15);
    } else {
      setFillFeedback('incorrect');
    }
  };

  // 2. Word order handlers
  const handleAddWord = (word: string) => {
    if (orderFeedback === 'correct') return;
    setOrderedWords([...orderedWords, word]);
    setOrderFeedback(null);
  };

  const handleRemoveWord = (indexToRemove: number) => {
    if (orderFeedback === 'correct') return;
    setOrderedWords(orderedWords.filter((_, idx) => idx !== indexToRemove));
    setOrderFeedback(null);
  };

  const handleCheckWordOrder = (exercise: WordOrderExercise) => {
    const builtSentence = orderedWords.join(' ').trim();
    if (builtSentence === exercise.correctSentence) {
      setOrderFeedback('correct');
      handleComplete(exercise.id, 20);
    } else {
      setOrderFeedback('incorrect');
    }
  };

  // 3. Matching handler
  const handleLeftClick = (pairId: string) => {
    if (matchedPairs.includes(pairId)) return;
    setSelectedLeft(pairId);
    setMatchingError(false);
  };

  const handleRightClick = (pairId: string, exercise: MatchingExercise) => {
    if (!selectedLeft) return;
    if (matchedPairs.includes(pairId)) return;

    if (selectedLeft === pairId) {
      const nextMatched = [...matchedPairs, pairId];
      setMatchedPairs(nextMatched);
      setSelectedLeft(null);
      setMatchingError(false);

      if (nextMatched.length === exercise.pairs.length) {
        handleComplete(exercise.id, 25);
      }
    } else {
      setMatchingError(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setMatchingError(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Exercices Interactifs A2
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Entraînez-vous avec des activités variées : textes à trous, reconstitution de phrases professionnelles
          et associations de termes et situations réelles.
        </p>

        {/* Filter buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => { setExerciseTypeFilter('all'); handleSelectExercise(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
              exerciseTypeFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Tous les exercices ({EXERCISES_LIST.length})
          </button>
          <button
            onClick={() => { setExerciseTypeFilter('fill_in'); handleSelectExercise(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
              exerciseTypeFilter === 'fill_in'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Textes à trous
          </button>
          <button
            onClick={() => { setExerciseTypeFilter('word_order'); handleSelectExercise(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
              exerciseTypeFilter === 'word_order'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Remise en ordre de phrases
          </button>
          <button
            onClick={() => { setExerciseTypeFilter('matching'); handleSelectExercise(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
              exerciseTypeFilter === 'matching'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Associations de paires
          </button>
        </div>
      </div>

      {/* Exercise Navigation Dots / Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Exercice {currentIndex + 1} / {filteredExercises.length}
          </span>
          {stats.completedExercisesIds.includes(currentExercise.id) && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} />
              <span>Validé</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentIndex === 0}
            onClick={() => handleSelectExercise(currentIndex - 1)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            Précédent
          </button>
          <button
            disabled={currentIndex === filteredExercises.length - 1}
            onClick={() => handleSelectExercise(currentIndex + 1)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Main Exercise Card Container */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Exercise Metadata */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {currentExercise.theme}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {currentExercise.type === 'fill_in' && 'Complétez la phrase'}
              {currentExercise.type === 'word_order' && 'Remettez les mots dans l’ordre'}
              {currentExercise.type === 'matching' && 'Reliez chaque élément'}
            </span>
          </div>

          <button
            onClick={() => handleSelectExercise(currentIndex)}
            title="Recommencer cet exercice"
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-medium"
          >
            <RotateCcw size={13} />
            <span>Réinitialiser</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* 1. FILL-IN TYPE EXERCISE */}
        {/* ==================================================== */}
        {currentExercise.type === 'fill_in' && (
          <div className="space-y-6">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Contexte : {currentExercise.context}
            </div>

            {/* Sentence with Gap */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 text-lg md:text-xl text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              <span>{currentExercise.sentenceBefore} </span>
              <span
                className={`inline-block px-3 py-1 mx-1.5 font-bold rounded-lg border-2 transition-all ${
                  fillFeedback === 'correct'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : fillFeedback === 'incorrect'
                    ? 'border-red-400 bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                    : 'border-dashed border-indigo-400 bg-indigo-50/50 text-indigo-700 min-w-[120px] text-center'
                }`}
              >
                {fillSelectedOption ? fillSelectedOption : '.........'}
              </span>
              <span> {currentExercise.sentenceAfter}</span>
            </div>

            {/* Options Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Choisissez le mot approprié :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentExercise.options.map((opt) => {
                  const isSelected = fillSelectedOption === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleFillOptionClick(opt, currentExercise)}
                      disabled={fillFeedback === 'correct'}
                      className={`p-3 text-sm md:text-base font-semibold rounded-xl border transition-all text-center ${
                        isSelected && fillFeedback === 'correct'
                          ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                          : isSelected && fillFeedback === 'incorrect'
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation / Feedback */}
            {fillFeedback && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  fillFeedback === 'correct'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                    : 'bg-red-50 dark:bg-red-950/30 border-red-200 text-red-900 dark:text-red-200'
                }`}
              >
                {fillFeedback === 'correct' ? (
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <XCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
                )}
                <div className="space-y-1 text-sm">
                  <div className="font-bold">
                    {fillFeedback === 'correct' ? 'Bravo ! Réponse exacte (+15 XP)' : 'Pas tout à fait. Essayez une autre option !'}
                  </div>
                  <p className="text-xs leading-relaxed">{currentExercise.explanation}</p>
                  {fillFeedback === 'correct' && (
                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-xs font-semibold">Écouter la phrase entière :</span>
                      <AudioButton
                        text={`${currentExercise.sentenceBefore} ${currentExercise.blankAnswer} ${currentExercise.sentenceAfter}`}
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* 2. WORD ORDER TYPE EXERCISE */}
        {/* ==================================================== */}
        {currentExercise.type === 'word_order' && (
          <div className="space-y-6">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Contexte : {currentExercise.context}
            </div>

            {/* Active constructed sentence drop area */}
            <div className="p-5 min-h-[90px] bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
              {orderedWords.length === 0 ? (
                <span className="text-sm text-slate-400 dark:text-slate-500 italic">
                  Cliquez sur les mots ci-dessous dans l’ordre pour construire la phrase...
                </span>
              ) : (
                orderedWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveWord(idx)}
                    className="px-3 py-1.5 text-sm font-semibold bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
                    title="Cliquez pour retirer ce mot"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            {/* Available words bank */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Banque de mots disponibles :
              </span>
              <div className="flex flex-wrap gap-2">
                {currentExercise.scrambledWords.map((word, idx) => {
                  // Count occurrences already used
                  const countInScrambled = currentExercise.scrambledWords.filter((w) => w === word).length;
                  const countInOrdered = orderedWords.filter((w) => w === word).length;
                  const isAvailable = countInOrdered < countInScrambled;

                  return (
                    <button
                      key={idx}
                      disabled={!isAvailable || orderFeedback === 'correct'}
                      onClick={() => handleAddWord(word)}
                      className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-all ${
                        !isAvailable
                          ? 'opacity-30 border-slate-200 bg-slate-100 cursor-not-allowed dark:bg-slate-800'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 shadow-sm'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Check Button & Feedback */}
            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={orderedWords.length === 0 || orderFeedback === 'correct'}
                onClick={() => handleCheckWordOrder(currentExercise)}
                className="px-5 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition-colors"
              >
                Vérifier la phrase
              </button>

              <button
                onClick={() => { setOrderedWords([]); setOrderFeedback(null); }}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                Effacer
              </button>
            </div>

            {orderFeedback && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  orderFeedback === 'correct'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                    : 'bg-red-50 dark:bg-red-950/30 border-red-200 text-red-900 dark:text-red-200'
                }`}
              >
                {orderFeedback === 'correct' ? (
                  <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <XCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
                )}
                <div className="space-y-1 text-sm">
                  <div className="font-bold">
                    {orderFeedback === 'correct' ? 'Parfaitement ordonné ! (+20 XP)' : 'L’ordre des mots n’est pas tout à fait correct.'}
                  </div>
                  <p className="text-xs">{currentExercise.translationOrMeaning}</p>
                  {orderFeedback === 'correct' && (
                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-xs font-semibold">Écouter la phrase :</span>
                      <AudioButton text={currentExercise.correctSentence} size="sm" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* 3. MATCHING TYPE EXERCISE */}
        {/* ==================================================== */}
        {currentExercise.type === 'matching' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {currentExercise.title}
            </p>

            {matchingError && (
              <div className="text-xs text-red-600 font-bold animate-shake flex items-center gap-1.5">
                <XCircle size={14} />
                <span>Ce n’est pas la bonne correspondance, réessayez !</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Éléments (Cliquez d’abord ici) :
                </span>
                {currentExercise.pairs.map((pair) => {
                  const isMatched = matchedPairs.includes(pair.id);
                  const isSelected = selectedLeft === pair.id;

                  return (
                    <button
                      key={pair.id}
                      disabled={isMatched}
                      onClick={() => handleLeftClick(pair.id)}
                      className={`w-full p-3.5 text-sm font-semibold rounded-xl border text-left transition-all ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : isSelected
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-300'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{pair.left}</span>
                        {isMatched && <CheckCircle2 size={16} className="text-emerald-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Correspondances (Puis cliquez sur la réponse) :
                </span>
                {/* Random or stable display of right choices */}
                {currentExercise.pairs.map((pair) => {
                  const isMatched = matchedPairs.includes(pair.id);

                  return (
                    <button
                      key={pair.id}
                      disabled={isMatched || !selectedLeft}
                      onClick={() => handleRightClick(pair.id, currentExercise)}
                      className={`w-full p-3.5 text-sm font-semibold rounded-xl border text-left transition-all ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : !selectedLeft
                          ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-indigo-400 hover:bg-indigo-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{pair.right}</span>
                        {isMatched && <CheckCircle2 size={16} className="text-emerald-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {matchedPairs.length === currentExercise.pairs.length && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 rounded-xl text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
                <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-sm">Félicitations ! Toutes les paires sont associées (+25 XP)</div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Vous maîtrisez ces correspondances clés du niveau A2.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
