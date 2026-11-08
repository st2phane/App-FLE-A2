import React from 'react';
import { UserStats } from '../types/fle';
import { setGlobalSpeechRate, getGlobalSpeechRate } from '../utils/speech';

export type NavTab = 'vocabulaire' | 'grammaire' | 'exercices' | 'scenarios' | 'quiz' | 'dashboard';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  stats: UserStats;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, stats }) => {
  const [speechSpeed, setSpeechSpeed] = React.useState<number>(getGlobalSpeechRate());

  const handleToggleSpeed = () => {
    const nextSpeed = speechSpeed === 0.9 ? 1.0 : 0.9;
    setSpeechSpeed(nextSpeed);
    setGlobalSpeechRate(nextSpeed);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectTab('vocabulaire')}
          className="text-left font-bold text-lg md:text-xl tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          FLE Pro A2
        </button>

        {/* Zone 2: Navigation Links (Single-line, concise) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('vocabulaire')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'vocabulaire'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Vocabulaire
          </button>
          <button
            onClick={() => onSelectTab('grammaire')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'grammaire'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Grammaire
          </button>
          <button
            onClick={() => onSelectTab('exercices')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'exercices'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Exercices
          </button>
          <button
            onClick={() => onSelectTab('scenarios')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'scenarios'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Situations Pro
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'quiz'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Quiz A2
          </button>
        </nav>

        {/* Zone 3: Primary Action / Status */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleToggleSpeed}
            title="Ajuster la vitesse de prononciation audio"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Vitesse audio :</span>
            <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">
              {speechSpeed === 0.9 ? '0.9x (Claire)' : '1.0x (Normale)'}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3.5 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-indigo-700 text-white shadow-sm'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            <span>Mon Suivi</span>
            <span className="font-mono text-xs bg-indigo-500/40 px-1.5 py-0.5 rounded text-indigo-50">
              {stats.xp} XP
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for easy thumb tap */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 px-2 py-2 text-xs bg-slate-50/90 dark:bg-slate-900/90 overflow-x-auto">
        <button
          onClick={() => onSelectTab('vocabulaire')}
          className={`px-2 py-1 whitespace-nowrap ${
            activeTab === 'vocabulaire' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Vocabulaire
        </button>
        <button
          onClick={() => onSelectTab('grammaire')}
          className={`px-2 py-1 whitespace-nowrap ${
            activeTab === 'grammaire' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Grammaire
        </button>
        <button
          onClick={() => onSelectTab('exercices')}
          className={`px-2 py-1 whitespace-nowrap ${
            activeTab === 'exercices' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Exercices
        </button>
        <button
          onClick={() => onSelectTab('scenarios')}
          className={`px-2 py-1 whitespace-nowrap ${
            activeTab === 'scenarios' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Situations
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          className={`px-2 py-1 whitespace-nowrap ${
            activeTab === 'quiz' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Quiz
        </button>
      </div>
    </header>
  );
};
