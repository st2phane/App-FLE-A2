import React, { useState, useMemo } from 'react';
import { VocabularyItem, UserStats, ThemeCategory, JobDomain, DailyDomain } from '../types/fle';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { AudioButton } from './AudioButton';
import { toggleLearnedVocab, toggleBookmarkVocab } from '../utils/storage';
import { 
  Bookmark, 
  CheckCircle2, 
  Search, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Layers,
  List
} from 'lucide-react';

interface VocabularyViewerProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onStartJobScenario?: (domain: string) => void;
}

export const VocabularyViewer: React.FC<VocabularyViewerProps> = ({
  stats,
  onUpdateStats,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ThemeCategory | 'favorites'>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Domains definition
  const jobDomains: { id: JobDomain; label: string }[] = [
    { id: 'libre_service', label: 'Libre-service' },
    { id: 'sante', label: 'Santé & Soins' },
    { id: 'periscolaire', label: 'Périscolaire' },
    { id: 'btp', label: 'BTP & Chantier' },
    { id: 'secretariat', label: 'Secrétariat' },
  ];

  const dailyDomains: { id: DailyDomain; label: string }[] = [
    { id: 'logement', label: 'Logement' },
    { id: 'transports', label: 'Transports' },
    { id: 'sante_quotidienne', label: 'Santé quotidienne' },
    { id: 'demarches', label: 'Démarches' },
    { id: 'courses', label: 'Courses' },
  ];

  // Filtering
  const filteredList = useMemo(() => {
    return VOCABULARY_LIST.filter((item) => {
      // Category filter
      if (selectedCategory === 'favorites') {
        if (!stats.bookmarkedVocabIds.includes(item.id)) return false;
      } else if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // Domain filter
      if (selectedDomain !== 'all') {
        if (item.domain !== selectedDomain) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(query);
        const matchDef = item.definition.toLowerCase().includes(query);
        const matchEx = item.exampleSentence.toLowerCase().includes(query);
        const matchLabel = item.domainLabel.toLowerCase().includes(query);
        if (!matchWord && !matchDef && !matchEx && !matchLabel) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedDomain, searchQuery, stats.bookmarkedVocabIds]);

  // Handle flashcard navigation
  const currentCard = filteredList[flashcardIndex] || filteredList[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % Math.max(1, filteredList.length));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredList.length) % Math.max(1, filteredList.length));
  };

  const handleToggleLearned = (id: string) => {
    const updated = toggleLearnedVocab(id);
    onUpdateStats(updated);
  };

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmarkVocab(id);
    onUpdateStats(updated);
  };

  const genderLabel = (type: VocabularyItem['genderOrType']) => {
    switch (type) {
      case 'm.': return 'Nom masculin';
      case 'f.': return 'Nom féminin';
      case 'v.': return 'Verbe d’action';
      case 'adj.': return 'Adjectif';
      case 'exp.': return 'Expression';
      case 'pl.': return 'Nom pluriel';
      default: return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Vocabulaire Pratique A2
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Révisez les mots et expressions indispensables pour communiquer en français au travail
          (commerce, santé, animation, bâtiment, bureau) et dans vos démarches du quotidien.
        </p>

        {/* Category Filter Buttons (Functional Segmented Control) */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedDomain('all'); setFlashcardIndex(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Tous les thèmes ({VOCABULARY_LIST.length})
          </button>
          <button
            onClick={() => { setSelectedCategory('travail'); setSelectedDomain('all'); setFlashcardIndex(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-colors ${
              selectedCategory === 'travail'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Monde du travail (Employé)
          </button>
          <button
            onClick={() => { setSelectedCategory('quotidien'); setSelectedDomain('all'); setFlashcardIndex(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-colors ${
              selectedCategory === 'quotidien'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Vie quotidienne & Logement
          </button>
          <button
            onClick={() => { setSelectedCategory('favorites'); setSelectedDomain('all'); setFlashcardIndex(0); }}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              selectedCategory === 'favorites'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Bookmark size={14} />
            <span>Mes favoris ({stats.bookmarkedVocabIds.length})</span>
          </button>
        </div>

        {/* Sub-domain filter buttons when category is work or daily */}
        {selectedCategory === 'travail' && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Métier :</span>
            <button
              onClick={() => { setSelectedDomain('all'); setFlashcardIndex(0); }}
              className={`px-2.5 py-1 text-xs rounded-md ${
                selectedDomain === 'all'
                  ? 'bg-indigo-100 text-indigo-900 font-semibold dark:bg-indigo-900/60 dark:text-indigo-200'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Tous les métiers
            </button>
            {jobDomains.map((job) => (
              <button
                key={job.id}
                onClick={() => { setSelectedDomain(job.id); setFlashcardIndex(0); }}
                className={`px-2.5 py-1 text-xs rounded-md ${
                  selectedDomain === job.id
                    ? 'bg-indigo-100 text-indigo-900 font-semibold dark:bg-indigo-900/60 dark:text-indigo-200'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {job.label}
              </button>
            ))}
          </div>
        )}

        {selectedCategory === 'quotidien' && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Thème :</span>
            <button
              onClick={() => { setSelectedDomain('all'); setFlashcardIndex(0); }}
              className={`px-2.5 py-1 text-xs rounded-md ${
                selectedDomain === 'all'
                  ? 'bg-emerald-100 text-emerald-900 font-semibold dark:bg-emerald-900/60 dark:text-emerald-200'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Tous les thèmes
            </button>
            {dailyDomains.map((dom) => (
              <button
                key={dom.id}
                onClick={() => { setSelectedDomain(dom.id); setFlashcardIndex(0); }}
                className={`px-2.5 py-1 text-xs rounded-md ${
                  selectedDomain === dom.id
                    ? 'bg-emerald-100 text-emerald-900 font-semibold dark:bg-emerald-900/60 dark:text-emerald-200'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {dom.label}
              </button>
            ))}
          </div>
        )}

        {/* Search bar and View mode switch */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setFlashcardIndex(0); }}
              placeholder="Rechercher un mot, un métier ou un exemple..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-1 self-end sm:self-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('flashcard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'flashcard'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers size={14} />
              <span>Cartes Mémo</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <List size={14} />
              <span>Liste & Fiches</span>
            </button>
          </div>
        </div>
      </div>

      {/* Zero State if empty */}
      {filteredList.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-10 text-center border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300 font-medium">Aucun mot ne correspond à votre recherche.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedDomain('all'); setSearchQuery(''); }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : viewMode === 'flashcard' && currentCard ? (
        /* Flashcard Mode */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              Carte <strong className="text-slate-900 dark:text-slate-100 font-bold">{flashcardIndex + 1}</strong> sur {filteredList.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-slate-500">{currentCard.domainLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{currentCard.difficulty}</span>
            </div>
          </div>

          {/* Flip Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden"
          >
            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between">
              {/* Clean metadata without pill capsules */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{genderLabel(currentCard.genderOrType)}</span>
                <span aria-hidden="true">·</span>
                <span>{currentCard.category === 'travail' ? 'Monde du travail' : 'Vie quotidienne'}</span>
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => handleToggleBookmark(currentCard.id)}
                  title={stats.bookmarkedVocabIds.includes(currentCard.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  className={`p-1.5 rounded-lg transition-colors ${
                    stats.bookmarkedVocabIds.includes(currentCard.id)
                      ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  <Bookmark size={18} fill={stats.bookmarkedVocabIds.includes(currentCard.id) ? 'currentColor' : 'none'} />
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleLearned(currentCard.id)}
                  title={stats.learnedVocabIds.includes(currentCard.id) ? 'Marqué comme acquis' : 'Marquer comme acquis'}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    stats.learnedVocabIds.includes(currentCard.id)
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CheckCircle2 size={15} />
                  <span>{stats.learnedVocabIds.includes(currentCard.id) ? 'Acquis' : 'À apprendre'}</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            {!isFlipped ? (
              /* Front of Card */
              <div className="py-8 text-center space-y-4">
                <div className="inline-block">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {currentCard.word}
                  </h2>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                  <AudioButton text={currentCard.word} size="lg" label="Écouter la prononciation" />
                </div>

                <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1 pt-4">
                  <RotateCw size={12} />
                  <span>Cliquez sur la carte pour voir la définition et l’exemple</span>
                </p>
              </div>
            ) : (
              /* Back of Card */
              <div className="py-4 space-y-5 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    Définition A2 claire
                  </h3>
                  <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {currentCard.definition}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/70 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Exemple en situation :
                    </span>
                    <AudioButton text={currentCard.exampleSentence} size="sm" />
                  </div>
                  <p className="text-sm text-slate-900 dark:text-slate-100 italic">
                    « {currentCard.exampleSentence} »
                  </p>
                </div>

                {currentCard.contextNote && (
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Conseil pro : </span>
                    {currentCard.contextNote}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Card Footer */}
            <div className="border-t border-slate-100 dark:border-slate-700/60 pt-3 flex items-center justify-between text-xs text-slate-400">
              <span>{isFlipped ? 'Définition & Contexte' : 'Français parlé & prononciation'}</span>
              <span className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400">
                <RotateCw size={13} />
                <span>{isFlipped ? 'Retourner le mot' : 'Afficher la solution'}</span>
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <ChevronLeft size={16} />
              <span>Précédent</span>
            </button>

            <button
              onClick={() => handleToggleLearned(currentCard.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm ${
                stats.learnedVocabIds.includes(currentCard.id)
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Sparkles size={16} />
              <span>{stats.learnedVocabIds.includes(currentCard.id) ? 'Je le connais déjà' : 'Je le sais ! (+10 XP)'}</span>
            </button>

            <button
              onClick={handleNextCard}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <span>Suivant</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Catalog List Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => {
            const isLearned = stats.learnedVocabIds.includes(item.id);
            const isBookmarked = stats.bookmarkedVocabIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-slate-800 rounded-xl p-5 border transition-all ${
                  isLearned
                    ? 'border-emerald-200 dark:border-emerald-900/50 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{item.domainLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{genderLabel(item.genderOrType)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{item.difficulty}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.word}
                      </h3>
                      <AudioButton text={item.word} size="sm" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isBookmarked ? 'Favori' : 'Ajouter aux favoris'}
                    >
                      <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleLearned(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isLearned
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isLearned ? 'Acquis' : 'Marquer comme appris'}
                    >
                      <CheckCircle2 size={18} fill={isLearned ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <p className="mt-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-start justify-between gap-2 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-lg">
                  <p className="text-xs text-slate-800 dark:text-slate-200 italic leading-snug">
                    « {item.exampleSentence} »
                  </p>
                  <AudioButton text={item.exampleSentence} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
