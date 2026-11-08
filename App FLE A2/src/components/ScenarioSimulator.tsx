import React, { useState } from 'react';
import { SCENARIOS_LIST } from '../data/scenariosData';
import { ScenarioSituation, ScenarioChoice, UserStats } from '../types/fle';
import { AudioButton } from './AudioButton';
import { 
  Briefcase, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Building2,
  HeartPulse,
  HardHat,
  GraduationCap,
  Store
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { markExerciseCompleted } from '../utils/storage';

interface ScenarioSimulatorProps {
  stats: UserStats;
  onUpdateStats: (stats: UserStats) => void;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ stats, onUpdateStats }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS_LIST[0].id);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);
  const [isScenarioFinished, setIsScenarioFinished] = useState(false);

  const scenario = SCENARIOS_LIST.find((s) => s.id === activeScenarioId) || SCENARIOS_LIST[0];
  const currentNode = scenario.dialogueNodes[currentNodeIndex];

  const domainIcons: Record<string, React.ReactNode> = {
    libre_service: <Store size={18} className="text-amber-500" />,
    sante: <HeartPulse size={18} className="text-red-500" />,
    periscolaire: <GraduationCap size={18} className="text-emerald-500" />,
    btp: <HardHat size={18} className="text-orange-500" />,
    secretariat: <Building2 size={18} className="text-blue-500" />,
  };

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    setCurrentNodeIndex(0);
    setSelectedChoice(null);
    setIsScenarioFinished(false);
  };

  const handleChoose = (choice: ScenarioChoice) => {
    setSelectedChoice(choice);
    if (choice.isAppropriate) {
      // Check if there is next node or finished
      if (currentNodeIndex + 1 < scenario.dialogueNodes.length) {
        // More nodes
      } else {
        setIsScenarioFinished(true);
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
        const updated = markExerciseCompleted(`scenario_${scenario.id}`, 25);
        onUpdateStats(updated);
      }
    }
  };

  const handleNextStep = () => {
    if (currentNodeIndex + 1 < scenario.dialogueNodes.length) {
      setCurrentNodeIndex((prev) => prev + 1);
      setSelectedChoice(null);
    }
  };

  const handleRestart = () => {
    setCurrentNodeIndex(0);
    setSelectedChoice(null);
    setIsScenarioFinished(false);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Situations Professionnelles Réelles
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Simulateur interactif de dialogue pour les métiers : commerce, santé, périscolaire,
          BTP et accueil. Choisissez les réponses professionnelles, polies et respectueuses des consignes.
        </p>

        {/* Work Domain Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {SCENARIOS_LIST.map((sc) => {
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {domainIcons[sc.domain] || <Briefcase size={16} />}
                <span>{sc.domainTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Workspace */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Scenario Header Info */}
        <div className="border-b border-slate-100 dark:border-slate-700/80 pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {scenario.domainTitle} · Étape {currentNodeIndex + 1}/{scenario.dialogueNodes.length}
            </span>
            <button
              onClick={handleRestart}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-medium"
            >
              <RotateCcw size={13} />
              <span>Recommencer la scène</span>
            </button>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {scenario.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
            {scenario.description}
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300">
            <strong>Mise en situation :</strong> {scenario.initialContext}
          </div>
        </div>

        {/* Interlocutor Speech Bubble */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {currentNode.interlocutorName}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ({currentNode.interlocutorRole})
              </span>
            </div>
            <AudioButton text={currentNode.interlocutorText} size="sm" label="Écouter" />
          </div>

          <div className="p-5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl rounded-tl-sm border border-indigo-100 dark:border-indigo-900/50 text-slate-900 dark:text-slate-100 text-base md:text-lg leading-relaxed font-medium">
            « {currentNode.interlocutorText} »
          </div>
        </div>

        {/* User Prompt & Decision Choices */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <MessageSquare size={15} className="text-indigo-600" />
            <span>{currentNode.userPrompt}</span>
          </div>

          <div className="space-y-3">
            {currentNode.choices.map((choice, idx) => {
              const isSelected = selectedChoice === choice;
              return (
                <div
                  key={idx}
                  onClick={() => !selectedChoice?.isAppropriate && handleChoose(choice)}
                  role="button"
                  tabIndex={selectedChoice?.isAppropriate ? -1 : 0}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !selectedChoice?.isAppropriate) {
                      e.preventDefault();
                      handleChoose(choice);
                    }
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    isSelected && choice.isAppropriate
                      ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-300'
                      : isSelected && !choice.isAppropriate
                      ? 'border-red-400 bg-red-50/80 dark:bg-red-950/40 text-red-950 dark:text-red-100 ring-2 ring-red-300'
                      : selectedChoice?.isAppropriate
                      ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 opacity-60 cursor-default'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm md:text-base leading-relaxed font-medium">
                      {choice.text}
                    </p>
                    <div onClick={(e) => e.stopPropagation()} className="shrink-0">
                      <AudioButton text={choice.text} size="sm" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback on Selected Choice */}
        {selectedChoice && (
          <div
            className={`p-5 rounded-xl border space-y-3 ${
              selectedChoice.isAppropriate
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 text-amber-900 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedChoice.isAppropriate ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span>Réaction professionnelle et adaptée !</span>
                </>
              ) : (
                <>
                  <AlertCircle size={18} className="text-amber-600" />
                  <span>Réaction à corriger :</span>
                </>
              )}
            </div>

            <p className="text-xs md:text-sm leading-relaxed">
              {selectedChoice.feedback}
            </p>

            {/* Next step button if appropriate and more nodes exist */}
            {selectedChoice.isAppropriate && !isScenarioFinished && (
              <div className="pt-2">
                <button
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors"
                >
                  <span>Continuer le dialogue</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Final Scenario Conclusion Screen */}
        {isScenarioFinished && (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 rounded-2xl text-center space-y-3">
            <div className="inline-flex p-3 bg-emerald-100 text-emerald-700 rounded-full">
              <Sparkles size={28} />
            </div>
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
              Mise en situation validée avec succès ! (+25 XP)
            </h3>
            <p className="text-xs md:text-sm text-emerald-700 dark:text-emerald-300 max-w-lg mx-auto">
              Vous avez su répondre avec le vocabulaire approprié, la politesse et le respect
              des règles professionnelles françaises.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Rejouer ce scénario
              </button>
              {SCENARIOS_LIST.findIndex((s) => s.id === activeScenarioId) < SCENARIOS_LIST.length - 1 && (
                <button
                  onClick={() => handleSelectScenario(SCENARIOS_LIST[SCENARIOS_LIST.findIndex((s) => s.id === activeScenarioId) + 1].id)}
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Scénario métier suivant
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
