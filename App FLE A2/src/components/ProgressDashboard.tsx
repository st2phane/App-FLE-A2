import React from 'react';
import { UserStats } from '../types/fle';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { EXERCISES_LIST } from '../data/exercisesData';
import { QUIZ_QUESTIONS } from '../data/quizzesData';
import { removeMistake, resetAllStats } from '../utils/storage';
import { AudioButton } from './AudioButton';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Trash2,
  TrendingUp,
  Briefcase,
  BookOpen,
  Sparkles,
  FileCheck
} from 'lucide-react';

interface ProgressDashboardProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onNavigateTab: (tab: 'vocabulaire' | 'grammaire' | 'exercices' | 'scenarios' | 'quiz') => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  stats,
  onUpdateStats,
  onNavigateTab,
}) => {
  // Calculations
  const totalVocab = VOCABULARY_LIST.length;
  const learnedVocabCount = stats.learnedVocabIds.length;
  const vocabPercent = Math.round((learnedVocabCount / totalVocab) * 100);

  const totalExercises = EXERCISES_LIST.length;
  const completedExercisesCount = stats.completedExercisesIds.length;
  const exercisePercent = Math.round((completedExercisesCount / totalExercises) * 100);

  const averageQuizScore = stats.quizHistory.length > 0
    ? Math.round(
        (stats.quizHistory.reduce((acc, curr) => acc + (curr.score / curr.total), 0) /
          stats.quizHistory.length) * 100
      )
    : 0;

  // Level determination
  const getLevelInfo = (xp: number) => {
    if (xp >= 500) return { title: 'Niveau A2 Validé · Opérationnel Pro', badge: 'Expert Pro A2', color: 'text-emerald-600', max: 1000 };
    if (xp >= 250) return { title: 'Niveau A2 En Cours · Intermédiaire Autonome', badge: 'Praticien A2', color: 'text-indigo-600', max: 500 };
    return { title: 'Niveau A2 · Apprenti Débutant', badge: 'Apprenti A2', color: 'text-amber-600', max: 250 };
  };

  const level = getLevelInfo(stats.xp);

  // Mistakes notebook questions
  const mistakeQuestions = QUIZ_QUESTIONS.filter((q) => stats.mistakeQuestionIds.includes(q.id));

  const handleResolveMistake = (qId: string) => {
    const updated = removeMistake(qId);
    onUpdateStats(updated);
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser toutes vos statistiques et votre progression ?')) {
      const updated = resetAllStats();
      onUpdateStats(updated);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Mon Suivi de Progression A2
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Tableau de bord personnel d’apprentissage pour mesurer votre autonomie en français professionnel et quotidien.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <RotateCcw size={13} />
            <span>Réinitialiser mes progrès</span>
          </button>
        </div>
      </div>

      {/* Level Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-300 uppercase">
            <Sparkles size={16} />
            <span>Statut CECRL Actuel</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {level.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl">
            Vos révisions renforcent votre vocabulaire de spécialité, votre aisance avec le passé composé,
            vos réflexes de politesse au standard et sur le lieu de travail.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center min-w-[160px] shrink-0">
          <div className="text-xs text-indigo-200 font-medium">Total d’expérience</div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-white my-1">
            {stats.xp} <span className="text-base font-normal text-indigo-200">XP</span>
          </div>
          <div className="text-xs font-semibold text-indigo-300">{level.badge}</div>
        </div>
      </div>

      {/* 3 Main KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Vocabulaire Acquis
            </span>
            <BookOpen size={18} className="text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {learnedVocabCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ {totalVocab} mots</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, vocabPercent)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">
            {vocabPercent}% du vocabulaire A2 maîtrisé
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Exercices Réussis
            </span>
            <FileCheck size={18} className="text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {completedExercisesCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ {totalExercises} modules</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, exercisePercent)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">
            {completedExercisesCount > 0 ? `${exercisePercent}% des ateliers complétés` : 'Commencez vos premiers exercices'}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Moyenne aux Quiz
            </span>
            <Trophy size={18} className="text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {stats.quizHistory.length > 0 ? `${averageQuizScore}%` : '–'}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ({stats.quizHistory.length} série{stats.quizHistory.length > 1 ? 's' : ''})
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${averageQuizScore}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">
            {stats.quizHistory.length > 0 ? 'Taux de réussite global' : 'Aucun quiz effectué pour l’instant'}
          </p>
        </div>
      </div>

      {/* Carnet d'erreurs (Mistakes Notebook) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Mon Carnet d’Erreurs à Réviser</span>
              <span className="font-mono text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                {mistakeQuestions.length}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Retrouvez ici les notions où vous avez hésité lors des quiz pour les mémoriser définitivement.
            </p>
          </div>
        </div>

        {mistakeQuestions.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Votre carnet d’erreurs est vide !
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Toutes les notions testées ont été validées sans faute.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mistakeQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                      {q.domainOrTopic}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                      {q.question}
                    </h4>
                  </div>
                  <AudioButton text={q.question} size="sm" />
                </div>

                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs md:text-sm space-y-1">
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>Réponse correcte : {q.options[q.correctIndex]}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {q.explanation}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleResolveMistake(q.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors shadow-2xs"
                  >
                    <CheckCircle2 size={13} />
                    <span>C’est compris ! Retirer du carnet</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz History Table */}
      {stats.quizHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Historique des Séries Récentes
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Taux</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {stats.quizHistory.slice(0, 8).map((h) => {
                  const percent = Math.round((h.score / h.total) * 100);
                  return (
                    <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                      <td className="py-2.5 px-4 font-mono text-slate-500">{h.date}</td>
                      <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100 uppercase">
                        {h.category}
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {h.score} / {h.total}
                      </td>
                      <td className="py-2.5 px-4 font-mono">
                        <span
                          className={`font-semibold ${
                            percent >= 75
                              ? 'text-emerald-600'
                              : percent >= 50
                              ? 'text-amber-600'
                              : 'text-red-500'
                          }`}
                        >
                          {percent}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
