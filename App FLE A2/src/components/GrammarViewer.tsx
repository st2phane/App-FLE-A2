import React, { useState } from 'react';
import { GrammarTopic, UserStats, GrammarPracticeExercise } from '../types/fle';
import { GRAMMAR_RULES } from '../data/grammarData';
import { AudioButton } from './AudioButton';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  BookOpen, 
  Lightbulb, 
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { markExerciseCompleted } from '../utils/storage';

interface GrammarViewerProps {
  stats?: UserStats;
  onUpdateStats?: (newStats: UserStats) => void;
}

export const GrammarViewer: React.FC<GrammarViewerProps> = ({ stats, onUpdateStats }) => {
  const [activeTopic, setActiveTopic] = useState<GrammarTopic>('passe_compose_imparfait');

  // Exercise states: map of exerciseId -> { selectedOption: string, isCorrect: boolean }
  const [answers, setAnswers] = useState<Record<string, { selected: string; isCorrect: boolean }>>({});

  const currentRule = GRAMMAR_RULES.find((r) => r.topic === activeTopic) || GRAMMAR_RULES[0];

  const handleSelectAnswer = (exercise: GrammarPracticeExercise, option: string) => {
    const isCorrect = option === exercise.blankAnswer;
    setAnswers((prev) => ({
      ...prev,
      [exercise.id]: { selected: option, isCorrect },
    }));

    if (isCorrect) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
      });
      if (onUpdateStats) {
        const updated = markExerciseCompleted(`gram_${exercise.id}`, 10);
        onUpdateStats(updated);
      }
    }
  };

  const handleResetExercise = (exerciseId: string) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Grammaire A2 Essentielle & Exercices
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Fiches claires et synthétiques accompagnées d’exercices d’application directe pour chaque leçon :
          les temps du passé, l’expression de l’avenir, les pronoms compléments, les négations et les consignes.
        </p>

        {/* Topic navigation tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {GRAMMAR_RULES.map((rule) => {
            const isActive = rule.topic === activeTopic;
            return (
              <button
                key={rule.topic}
                onClick={() => setActiveTopic(rule.topic)}
                className={`px-3 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {rule.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grammar Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-8">
        {/* Title & Short Summary */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-700/80 pb-5">
          <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">
            <BookOpen size={15} />
            <span>Règle officielle CECRL A2</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {currentRule.title}
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
            {currentRule.shortDescription}
          </p>
        </div>

        {/* Key Rules List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-500" />
            <span>Points clés à retenir</span>
          </h3>
          <ul className="space-y-2.5">
            {currentRule.ruleExplanation.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  0{idx + 1}.
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Formulas & Structures */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Structures & Formules modèles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRule.keyFormulas.map((f, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5"
              >
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  {f.label}
                </div>
                <div className="font-mono text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  {f.formula}
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs italic text-slate-700 dark:text-slate-300">
                    « {f.example} »
                  </span>
                  <AudioButton text={f.example} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table if present (e.g. Passé Composé vs Imparfait) */}
        {currentRule.comparisons && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Tableau comparatif : {currentRule.comparisons.conceptA} vs {currentRule.comparisons.conceptB}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Situation</th>
                    <th className="py-3 px-4 text-indigo-700 dark:text-indigo-300">{currentRule.comparisons.conceptA}</th>
                    <th className="py-3 px-4 text-emerald-700 dark:text-emerald-300">{currentRule.comparisons.conceptB}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                  {currentRule.comparisons.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                        {row.aspect}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-between gap-1">
                          <span className="italic text-slate-800 dark:text-slate-200">{row.exampleA}</span>
                          <AudioButton text={row.exampleA} size="sm" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-between gap-1">
                          <span className="italic text-slate-800 dark:text-slate-200">{row.exampleB}</span>
                          <AudioButton text={row.exampleB} size="sm" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Common Traps & Tips */}
        {currentRule.commonMistakes.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <span>Pièges fréquents à éviter</span>
            </h3>
            <div className="space-y-3">
              {currentRule.commonMistakes.map((mistake, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-2 text-xs md:text-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-red-600 dark:text-red-400 line-through">
                      ✗ {mistake.incorrect}
                    </span>
                    <ArrowRight size={14} className="hidden sm:inline text-slate-400" />
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                      ✓ {mistake.correct}
                      <AudioButton text={mistake.correct} size="sm" />
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    <strong>Pourquoi ?</strong> {mistake.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE PRACTICE EXERCISES ACCOMPANYING THE LESSON */}
        {/* ========================================================= */}
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles size={16} />
                <span>Pratique immédiate</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                Exercices d’application directe pour cette leçon
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Complétez les phrases en situation professionnelle pour ancrer la règle (+10 XP par bonne réponse).
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {currentRule.practiceExercises.map((exo, index) => {
              const state = answers[exo.id];
              const isAnswered = !!state;

              return (
                <div
                  key={exo.id}
                  className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700 space-y-4"
                >
                  {/* Exercise header */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        Exercice 0{index + 1}
                      </span>
                      <span aria-hidden="true" className="text-slate-400">·</span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{exo.prompt}</span>
                      <span aria-hidden="true" className="text-slate-400">·</span>
                      <span className="text-slate-500 italic">{exo.context}</span>
                    </div>

                    {isAnswered && (
                      <button
                        onClick={() => handleResetExercise(exo.id)}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-medium"
                        title="Recommencer cet exercice"
                      >
                        <RotateCcw size={12} />
                        <span>Recommencer</span>
                      </button>
                    )}
                  </div>

                  {/* Sentence with Gap */}
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm md:text-base text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                    <span>{exo.sentenceBefore} </span>
                    <span
                      className={`inline-block px-2.5 py-0.5 mx-1 font-bold rounded border ${
                        isAnswered && state.isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : isAnswered && !state.isCorrect
                          ? 'border-red-400 bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                          : 'border-dashed border-indigo-400 bg-indigo-50/40 text-indigo-700 min-w-[80px] text-center'
                      }`}
                    >
                      {isAnswered ? state.selected : '........'}
                    </span>
                    <span> {exo.sentenceAfter}</span>
                  </div>

                  {/* Options */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-500">
                      Sélectionnez la bonne forme :
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {exo.options.map((opt) => {
                        const isSelected = state?.selected === opt;
                        const isCorrectOption = opt === exo.blankAnswer;

                        return (
                          <button
                            key={opt}
                            disabled={isAnswered && state.isCorrect}
                            onClick={() => handleSelectAnswer(exo, opt)}
                            className={`p-2.5 text-xs md:text-sm font-semibold rounded-lg border transition-all text-center ${
                              isAnswered && isSelected && state.isCorrect
                                ? 'border-emerald-500 bg-emerald-600 text-white shadow-xs'
                                : isAnswered && isSelected && !state.isCorrect
                                ? 'border-red-500 bg-red-500 text-white'
                                : isAnswered && isCorrectOption
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback on answer */}
                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-lg border flex items-start gap-2.5 text-xs md:text-sm ${
                        state.isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                          : 'bg-red-50 dark:bg-red-950/30 border-red-200 text-red-900 dark:text-red-200'
                      }`}
                    >
                      {state.isCorrect ? (
                        <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
                      )}
                      <div className="space-y-1">
                        <div className="font-bold">
                          {state.isCorrect ? 'Exact ! Bonne application de la règle (+10 XP)' : 'Attention : ce n’est pas la forme attendue'}
                        </div>
                        <p className="text-xs leading-relaxed">{exo.explanation}</p>
                        {state.isCorrect && (
                          <div className="pt-1 flex items-center gap-2">
                            <span className="text-xs font-semibold">Prononciation complète :</span>
                            <AudioButton
                              text={`${exo.sentenceBefore} ${exo.blankAnswer} ${exo.sentenceAfter}`}
                              size="sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
