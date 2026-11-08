import { ExerciseItem } from '../types/fle';

export const EXERCISES_LIST: ExerciseItem[] = [
  // ===================================
  // EXERCICES À TROUS (FILL-IN)
  // ===================================
  {
    id: 'exo_fill_01',
    type: 'fill_in',
    theme: 'Commerce & Libre-service',
    context: 'Consigne du chef de rayon en grande surface',
    sentenceBefore: 'N’oublie pas de vérifier la',
    blankAnswer: 'DLC',
    sentenceAfter: 'des yaourts avant de les installer en tête de gondole.',
    options: ['DLC', 'EPI', 'CAF', 'quittance'],
    explanation: 'La DLC (Date Limite de Consommation) est la mention obligatoire sur les produits frais alimentaires périssables.'
  },
  {
    id: 'exo_fill_02',
    type: 'fill_in',
    theme: 'Santé & Aide à domicile',
    context: 'Organisation des soins du matin',
    sentenceBefore: 'Avant de quitter la chambre du patient, posez toujours la',
    blankAnswer: 'sonnette d’appel',
    sentenceAfter: 'sur la table de nuit à portée de sa main.',
    options: ['sonnette d’appel', 'bétonnière', 'facture', 'carte grise'],
    explanation: 'La sonnette d’appel permet à la personne vulnérable ou alitée d’appeler l’aide-soignante ou l’infirmière en cas de besoin.'
  },
  {
    id: 'exo_fill_03',
    type: 'fill_in',
    theme: 'BTP & Sécurité sur chantier',
    context: 'Règlement de sécurité sur le chantier',
    sentenceBefore: 'Chaque ouvrier doit obligatoirement porter ses',
    blankAnswer: 'EPI',
    sentenceAfter: 'dès qu’il franchit la barrière du chantier.',
    options: ['EPI', 'ordonnances', 'chèques', 'timbres'],
    explanation: 'Les EPI (Équipements de Protection Individuelle) comprennent le casque, les chaussures de sécurité, le gilet haute visibilité et les gants.'
  },
  {
    id: 'exo_fill_04',
    type: 'fill_in',
    theme: 'Secrétariat & Téléphone',
    context: 'Réception d’un appel téléphonique professionnel',
    sentenceBefore: 'Monsieur Bernard est en réunion. Voulez-vous que je',
    blankAnswer: 'prenne un message',
    sentenceAfter: 'pour qu’il vous rappelle dès qu’il sera disponible ?',
    options: ['prenne un message', 'fasse un balisage', 'déplace une palette', 'remplisse le ciment'],
    explanation: '« Prendre un message » est l’expression standard de secrétariat pour noter les coordonnées et la demande d’un appelant.'
  },
  {
    id: 'exo_fill_05',
    type: 'fill_in',
    theme: 'Grammaire A2 - Passé composé / Imparfait',
    context: 'Rapport d’incident professionnel',
    sentenceBefore: 'Pendant que nous',
    blankAnswer: 'rangions',
    sentenceAfter: 'les étagères, un client est venu demander un renseignement.',
    options: ['rangions', 'avons rangé', 'allons ranger', 'rangerons'],
    explanation: 'L’action de fond (le contexte continu) est à l’imparfait (« nous rangions »), interrompue par l’action ponctuelle au passé composé (« est venu »).'
  },
  {
    id: 'exo_fill_06',
    type: 'fill_in',
    theme: 'Grammaire A2 - Pronoms COD/COI',
    context: 'Discussion entre collègues au magasin',
    sentenceBefore: '– As-tu prévenu le chef de rayon ? – Oui, je',
    blankAnswer: 'lui',
    sentenceAfter: 'ai téléphoné il y a dix minutes.',
    options: ['lui', 'le', 'leur', 'y'],
    explanation: 'On dit « téléphoner À quelqu’un » (COI). Le pronom singulier qui remplace « au chef » est « lui ».'
  },
  {
    id: 'exo_fill_07',
    type: 'fill_in',
    theme: 'Périscolaire & Garderie',
    context: 'Consigne de transmission de fin d’après-midi',
    sentenceBefore: 'Si un parent vient chercher son enfant en retard, notez-le dans le',
    blankAnswer: 'cahier de liaison',
    sentenceAfter: 'pour que l’équipe du matin soit informée.',
    options: ['cahier de liaison', 'compteur', 'transpalette', 'pilulier'],
    explanation: 'Le cahier de liaison est l’outil de communication officiel entre les animateurs périscolaires, l’école et les parents.'
  },
  {
    id: 'exo_fill_08',
    type: 'fill_in',
    theme: 'Vie quotidienne - Logement',
    context: 'Démarche administrative pour un dossier',
    sentenceBefore: 'L’organisme demande votre dernière',
    blankAnswer: 'quittance de loyer',
    sentenceAfter: 'pour prouver que vous êtes à jour de vos paiements.',
    options: ['quittance de loyer', 'échafaudage', 'posologie', 'correspondance'],
    explanation: 'La quittance de loyer prouve le paiement mensuel de l’habitation et sert de justificatif de domicile en France.'
  },

  // ===================================
  // REMISE EN ORDRE DE PHRASES (WORD ORDER)
  // ===================================
  {
    id: 'exo_order_01',
    type: 'word_order',
    theme: 'Commerce & Libre-service',
    context: 'Organisation du travail du matin',
    scrambledWords: ['fait', 'Le', 'matin,', 'nous', 'chaque', 'faisons', 'le', 'facing', 'des', 'rayons.'],
    correctSentence: 'Chaque matin, nous faisons le facing des rayons.',
    translationOrMeaning: 'Règle professionnelle : avancer les produits au bord des étagères pour une présentation impeccable.'
  },
  {
    id: 'exo_order_02',
    type: 'word_order',
    theme: 'BTP & Sécurité',
    context: 'Consigne de sécurité stricte',
    scrambledWords: ['casque', 'Portez', 'votre', 'sur', 'le', 'toujours', 'chantier.'],
    correctSentence: 'Portez toujours votre casque sur le chantier.',
    translationOrMeaning: 'Impératif de politesse et de consigne de sécurité au travail.'
  },
  {
    id: 'exo_order_03',
    type: 'word_order',
    theme: 'Santé & Aide aux personnes',
    context: 'Transmission entre aides-soignants',
    scrambledWords: ['L’aide-soignante', 'a', 'la', 'noté', 'tension', 'dans', 'le', 'dossier.'],
    correctSentence: 'L’aide-soignante a noté la tension dans le dossier.',
    translationOrMeaning: 'Passé composé d’une action accomplie et consécutive au soin.'
  },
  {
    id: 'exo_order_04',
    type: 'word_order',
    theme: 'Secrétariat & Accueil',
    context: 'Formule polie au téléphone',
    scrambledWords: ['transfère', 'Je', 'vous', 'au', 'service', 'comptabilité.'],
    correctSentence: 'Je vous transfère au service comptabilité.',
    translationOrMeaning: 'Formule professionnelle standard de transfert d’appel téléphonique.'
  },
  {
    id: 'exo_order_05',
    type: 'word_order',
    theme: 'Périscolaire & Surveillance',
    context: 'Responsabilité de surveillance',
    scrambledWords: ['Les', 'animateurs', 'surveillent', 'la', 'cour', 'de', 'récréation.'],
    correctSentence: 'Les animateurs surveillent la cour de récréation.',
    translationOrMeaning: 'Présent de l’indicatif décrivant la tâche principale pendant la pause scolaire.'
  },

  // ===================================
  // ASSOCIATIONS DE PAIRES (MATCHING)
  // ===================================
  {
    id: 'exo_match_01',
    type: 'matching',
    theme: 'Vocabulaire professionnel : Outil & Métier',
    title: 'Associez chaque équipement ou document à son secteur professionnel :',
    pairs: [
      { id: 'p1', left: 'Transpalette & facing', right: 'Libre-service / Grande surface' },
      { id: 'p2', left: 'Pilulier & transmission', right: 'Santé & Aide à la personne' },
      { id: 'p3', left: 'Casque & échafaudage', right: 'BTP & Chantier' },
      { id: 'p4', left: 'Cahier de liaison & goûter', right: 'Périscolaire & Enfance' },
      { id: 'p5', left: 'Standard & transfert d’appel', right: 'Secrétariat & Accueil' },
    ]
  },
  {
    id: 'exo_match_02',
    type: 'matching',
    theme: 'Grammaire A2 : Pronoms et Verbes',
    title: 'Associez la question à la réponse correcte avec pronom complément :',
    pairs: [
      { id: 'm1', left: 'Tu as rangé le chariot ?', right: 'Oui, je l’ai rangé.' },
      { id: 'm2', left: 'Tu as parlé à la directrice ?', right: 'Oui, je lui ai parlé.' },
      { id: 'm3', left: 'Tu as prévenu les collègues ?', right: 'Oui, je les ai prévenus.' },
      { id: 'm4', left: 'Tu as téléphoné aux parents ?', right: 'Oui, je leur ai téléphoné.' },
    ]
  },
  {
    id: 'exo_match_03',
    type: 'matching',
    theme: 'Vie quotidienne : Démarches & Mots clés',
    title: 'Associez le document administratif à sa fonction :',
    pairs: [
      { id: 'd1', left: 'Quittance de loyer', right: 'Prouver le paiement de son logement' },
      { id: 'd2', left: 'Ordonnance médicale', right: 'Retirer des médicaments en pharmacie' },
      { id: 'd3', left: 'Formulaire Cerfa', right: 'Demander une prestation officielle' },
      { id: 'd4', left: 'Titre de transport composté', right: 'Voyager en règle dans le train' },
    ]
  }
];
