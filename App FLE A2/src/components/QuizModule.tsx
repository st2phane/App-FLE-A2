import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizzesData';
import { QuizQuestion, UserStats } from '../types/fle';
import { recordQuizAttempt } from '../utils/storage';
import { AudioButton } from './AudioButton';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award,
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModuleProps {
  stats: UserStats;
  onUpdateStats: (stats: UserStats) => void;
  onOpenDashboard: () => void;
}

type QuizCategoryFilter = 'mixte' | 'travail' | 'grammaire' | 'quotidien';

export const QuizModule: React.FC<QuizModuleProps> = ({ stats, onUpdateStats, onOpenDashboard }) => {
  const [selectedFilter, setSelectedFilter] = useState<QuizCategoryFilter>('mixte');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizMistakes, setQuizMistakes] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Start a new quiz session with 8 randomized or curated questions
  const startQuiz = (filter: QuizCategoryFilter) => {
    setSelectedFilter(filter);
    let pool = [...QUIZ_QUESTIONS];
    if (filter === 'travail') {
      pool = pool.filter((q) => q.category === 'travail');
    } else if (filter === 'grammaire') {
      pool = pool.filter((q) => q.category === 'grammaire');
    } else if (filter === 'quotidien') {
      pool = pool.filter((q) => q.category === 'quotidien');
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(8, shuffled.length));

    setQuizQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizMistakes([]);
    setIsFinished(false);
    setIsQuizActive(true);
  };

  const currentQ = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionIndex === currentQ.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setQuizMistakes((prev) => [...prev, currentQ.id]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished quiz!
      const finalScore = score + (selectedOptionIndex === currentQ?.correctIndex ? 0 : 0);
      setIsFinished(true);
      if (score >= Math.ceil(quizQuestions.length * 0.7)) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
      const updated = recordQuizAttempt(
        selectedFilter,
        score,
        quizQuestions.length,
        quizMistakes
      );
      onUpdateStats(updated);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Quiz Ludiques A2
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Testez vos connaissances en situation réelle : vocabulaire des métiers, grammaire opérationnelle
          et vie courante. Obtenez vos explications immédiates et gagnez des points d’expérience.
        </p>
      </div>

      {!isQuizActive ? (
        /* Quiz Selection Menu */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mode 1: Mixte */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={16} />
                  <span>Grand Test A2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Grand Quiz A2 Mixte
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  Un panaché de 8 questions mêlant le monde du travail (libre-service, santé, BTP, accueil),
                  les règles de grammaire et les démarches quotidiennes.
                </p>
              </div>
              <button
                onClick={() => startQuiz('mixte')}
                className="w-full py-3 px-4 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors text-center"
              >
                Démarrer le quiz mixte (8 questions)
              </button>
            </div>

            {/* Mode 2: Métiers */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Award size={16} />
                  <span>Spécial Métiers</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Quiz Monde du Travail
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  Concentrez-vous sur les 5 secteurs professionnels : libre-service, aide à domicile/santé,
                  périscolaire, chantier BTP et secrétariat.
                </p>
              </div>
              <button
                onClick={() => startQuiz('travail')}
                className="w-full py-3 px-4 font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-sm transition-colors text-center"
              >
                Démarrer le quiz métiers (8 questions)
              </button>
            </div>

            {/* Mode 3: Grammaire */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <BookOpen size={16} />
                  <span>Grammaire & Conjugaison</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Quiz Grammaire A2
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  Maîtrisez le passé composé vs imparfait, les pronoms compléments COD/COI, la négation
                  et les prépositions de lieu et de temps.
                </p>
              </div>
              <button
                onClick={() => startQuiz('grammaire')}
                className="w-full py-3 px-4 font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-colors text-center"
              >
                Démarrer le quiz grammaire (8 questions)
              </button>
            </div>

            {/* Mode 4: Quotidien */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <HelpCircle size={16} />
                  <span>Vie Quotidienne</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Quiz Vie Quotidienne & Démarches
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  Logement, quittance de loyer, transports en commun, pharmacie et démarches administratives.
                </p>
              </div>
              <button
                onClick={() => startQuiz('quotidien')}
                className="w-full py-3 px-4 font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-colors text-center"
              >
                Démarrer le quiz quotidien (8 questions)
              </button>
            </div>
          </div>
        </div>
      ) : isFinished ? (
        /* Quiz Finished Screen */
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 text-center space-y-6 max-w-xl mx-auto">
          <div className="inline-flex p-4 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Trophy size={48} />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Quiz Terminé !
            </h2>
            <p className="text-sm text-slate-500">
              Voici votre bilan sur cette série de questions A2
            </p>
          </div>

          {/* Score Box */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-mono text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {score} / {quizQuestions.length}
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {score >= 7
                ? 'Excellent résultat ! Le niveau A2 est solide sur ces notions.'
                : score >= 5
                ? 'Bon travail ! Quelques notions restent à consolider.'
                : 'Poursuivez vos révisions ! Le carnet d’erreurs vous aidera à progresser.'}
            </p>
            <div className="text-xs text-slate-500 pt-1">
              +{score * 10} points d’expérience (XP) enregistrés dans votre progression
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(selectedFilter)}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Rejouer un quiz</span>
            </button>
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              Voir mon carnet de progression
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Display */
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          {/* Header with question counter and quit */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Question {currentQuestionIndex + 1} sur {quizQuestions.length}</span>
              <span aria-hidden="true">·</span>
              <span className="text-indigo-600 dark:text-indigo-400">{currentQ.domainOrTopic}</span>
            </div>

            <button
              onClick={() => setIsQuizActive(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Quitter le quiz
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            {currentQ.contextNote && (
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {currentQ.contextNote}
              </span>
            )}
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {currentQ.question}
              </h2>
              <AudioButton text={currentQ.question} size="sm" />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let style = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30';
              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  style = 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'border-red-400 bg-red-50/90 dark:bg-red-950/40 text-red-950 dark:text-red-100';
                } else {
                  style = 'border-slate-200 dark:border-slate-700 opacity-50 bg-slate-50 dark:bg-slate-800/40';
                }
              } else if (isSelected) {
                style = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-300';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${style}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm md:text-base font-medium">{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrectAnswer && (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                      <XCircle size={18} className="text-red-600 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action button: Validate or Next */}
          <div className="pt-2">
            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOptionIndex === null}
                onClick={handleSubmitAnswer}
                className="w-full py-3 px-4 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition-colors"
              >
                Valider ma réponse
              </button>
            ) : (
              <div className="space-y-4">
                {/* Explanation Card */}
                <div
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    selectedOptionIndex === currentQ.correctIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                      : 'bg-red-50 dark:bg-red-950/30 border-red-200 text-red-900 dark:text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedOptionIndex === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 size={18} className="text-emerald-600" />
                        <span>Exact ! (+10 XP)</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-red-600" />
                        <span>Ce n’est pas la bonne réponse</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 px-4 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>
                    {currentQuestionIndex + 1 < quizQuestions.length
                      ? 'Question suivante'
                      : 'Voir mon score final'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
