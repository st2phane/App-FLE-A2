import { QuizQuestion } from '../types/fle';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // LIBRE-SERVICE
  // ==========================================
  {
    id: 'qz_ls_01',
    category: 'travail',
    domainOrTopic: 'Libre-service',
    question: 'Que signifie faire le « facing » dans un rayon de supermarché ?',
    contextNote: 'Tâche quotidienne en grande distribution',
    options: [
      'Avancer et aligner les articles au bord de l’étagère pour un rayon net',
      'Changer tous les prix sur les étiquettes électroniques',
      'Jeter les produits dont la date de consommation est dépassée',
      'Passer la serpillière dans l’allée centrale'
    ],
    correctIndex: 0,
    explanation: 'Le facing consiste à ramener les produits vers l’avant du rayonnage pour que le rayon paraisse toujours bien approvisionné et soigné.'
  },
  {
    id: 'qz_ls_02',
    category: 'travail',
    domainOrTopic: 'Libre-service',
    question: 'Que veut dire l’abréviation « DLC » sur un paquet de jambon frais ?',
    contextNote: 'Sécurité alimentaire',
    options: [
      'Date Limite de Consommation',
      'Droit Légal du Client',
      'Département de Livraison Centrale',
      'Dossier de Logistique et Conditionnement'
    ],
    correctIndex: 0,
    explanation: 'La DLC (Date Limite de Consommation) est la date impérative au-delà de laquelle la vente et la consommation présentent un danger sanitaire.'
  },
  {
    id: 'qz_ls_03',
    category: 'travail',
    domainOrTopic: 'Libre-service',
    question: 'Quel appareil utilise-t-on pour transporter une palette lourde de la réserve vers le magasin ?',
    contextNote: 'Matériel de manutention',
    options: [
      'Un transpalette',
      'Une bétonnière',
      'Un pilulier',
      'Un standard'
    ],
    correctIndex: 0,
    explanation: 'Le transpalette (manuel ou électrique) est l’outil de manutention indispensable pour déplacer les palettes de marchandises.'
  },

  // ==========================================
  // SANTÉ & SOINS
  // ==========================================
  {
    id: 'qz_san_01',
    category: 'travail',
    domainOrTopic: 'Santé & Aide à la personne',
    question: 'À l’hôpital ou en maison de retraite, qu’appelle-t-on la « transmission » ?',
    contextNote: 'Organisation de travail d’équipe',
    options: [
      'Le compte-rendu verbal ou écrit de l’état des patients passé à l’équipe suivante',
      'Le paiement du salaire de fin de mois',
      'Le nettoyage hebdomadaire des chambres',
      'La commande des nouveaux lits médicaux'
    ],
    correctIndex: 0,
    explanation: 'La transmission garantit la continuité des soins entre l’équipe de jour et l’équipe du soir/nuit.'
  },
  {
    id: 'qz_san_02',
    category: 'travail',
    domainOrTopic: 'Santé & Aide à la personne',
    question: 'À quoi sert un « pilulier » pour une personne âgée ?',
    contextNote: 'Suivi des traitements',
    options: [
      'À organiser et trier les médicaments par jour et moment de prise',
      'À mesurer la température et le pouls du résident',
      'À noter les rendez-vous dans le calendrier',
      'À ranger les draps propres et les serviettes'
    ],
    correctIndex: 0,
    explanation: 'Le pilulier évite les erreurs de dosage en compartimentant les médicaments pour chaque jour de la semaine.'
  },
  {
    id: 'qz_san_03',
    category: 'travail',
    domainOrTopic: 'Santé & Aide à la personne',
    question: 'Avant de quitter la chambre d’un résident, quelle précaution élémentaire devez-vous impérativement respecter ?',
    contextNote: 'Sécurité du patient',
    options: [
      'Placer la sonnette d’appel à portée immédiate de sa main',
      'Éteindre toutes les lumières et fermer la porte à clé',
      'Ouvrir la fenêtre en grand pendant 1 heure',
      'Changer systématiquement les rideaux'
    ],
    correctIndex: 0,
    explanation: 'La sonnette d’appel doit rester accessible pour que le résident puisse alerter l’équipe en cas de chute ou de malaise.'
  },

  // ==========================================
  // PÉRISCOLAIRE & ENFANCE
  // ==========================================
  {
    id: 'qz_per_01',
    category: 'travail',
    domainOrTopic: 'Périscolaire & Animation',
    question: 'Quel document sert à communiquer les informations et consignes entre les parents et les animateurs ?',
    contextNote: 'Communication école-famille',
    options: [
      'Le cahier de liaison',
      'Le devis commercial',
      'La quittance de loyer',
      'Le bon de livraison'
    ],
    correctIndex: 0,
    explanation: 'Le cahier de liaison permet de consigner les absences, les oublis ou les remarques importantes transmises aux parents.'
  },
  {
    id: 'qz_per_02',
    category: 'travail',
    domainOrTopic: 'Périscolaire & Animation',
    question: 'Avant de donner le goûter aux enfants, quelle vérification est cruciale pour la santé ?',
    contextNote: 'Sécurité alimentaire',
    options: [
      'Vérifier la fiche des allergies alimentaires de chaque enfant',
      'Compter le nombre de stylos dans la trousse',
      'Vérifier la météo du lendemain',
      'Demander le bulletin scolaire des enfants'
    ],
    correctIndex: 0,
    explanation: 'Certains enfants ont des allergies sévères (arachides, gluten, fruits à coque). La fiche médicale doit être scrupuleusement respectée.'
  },

  // ==========================================
  // BTP & CHANTIER
  // ==========================================
  {
    id: 'qz_btp_01',
    category: 'travail',
    domainOrTopic: 'BTP & Bâtiment',
    question: 'Que signifie l’abréviation professionnelle « EPI » sur un chantier ?',
    contextNote: 'Sécurité au travail',
    options: [
      'Équipements de Protection Individuelle',
      'Entreprise Publique d’Ingénierie',
      'Éléments Pour Immeuble',
      'Examen Périodique d’Installation'
    ],
    correctIndex: 0,
    explanation: 'Les EPI comprennent le casque de chantier, les chaussures de sécurité coquées, les gants et les lunettes de protection.'
  },
  {
    id: 'qz_btp_02',
    category: 'travail',
    domainOrTopic: 'BTP & Bâtiment',
    question: 'Comment appelle-t-on la structure métallique temporaire qui permet de travailler sur la façade d’un immeuble en hauteur ?',
    contextNote: 'Équipement de chantier',
    options: [
      'Un échafaudage',
      'Une tête de gondole',
      'Un standard',
      'Un brancard'
    ],
    correctIndex: 0,
    explanation: 'L’échafaudage permet aux ouvriers d’accéder aux étages en toute sécurité avec leur matériel.'
  },
  {
    id: 'qz_btp_03',
    category: 'travail',
    domainOrTopic: 'BTP & Bâtiment',
    question: 'Quel engin rotatif utilise-t-on pour mélanger le sable, les graviers, le ciment et l’eau ?',
    contextNote: 'Matériel de maçonnerie',
    options: [
      'Une bétonnière',
      'Une photocopieuse',
      'Un transpalette',
      'Une caisse enregistreuse'
    ],
    correctIndex: 0,
    explanation: 'La bétonnière permet de gâcher le béton ou le mortier de manière homogène.'
  },

  // ==========================================
  // SECRÉTARIAT & ACCUEIL
  // ==========================================
  {
    id: 'qz_sec_01',
    category: 'travail',
    domainOrTopic: 'Secrétariat & Accueil',
    question: 'Au téléphone, quelle formule est la plus professionnelle si votre responsable est occupé ?',
    contextNote: 'Politesse téléphonique',
    options: [
      '« Il est en réunion actuellement. Puis-je prendre un message pour qu’il vous rappelle ? »',
      '« Il n’a pas le temps, rappelez demain sans faute. »',
      '« Quittez pas, je vais voir s’il a envie de vous parler. »',
      '« Envoyez-lui une lettre recommandée. »'
    ],
    correctIndex: 0,
    explanation: 'Cette formule valorise l’entreprise, respecte l’interlocuteur et assure un suivi rigoureux.'
  },
  {
    id: 'qz_sec_02',
    category: 'travail',
    domainOrTopic: 'Secrétariat & Accueil',
    question: 'Comment appelle-t-on le document qui liste tous les sujets qui seront examinés pendant une réunion ?',
    contextNote: 'Organisation de réunion',
    options: [
      'L’ordre du jour',
      'Le bon de caisse',
      'La posologie',
      'Le constat d’accident'
    ],
    correctIndex: 0,
    explanation: 'L’ordre du jour est envoyé aux participants avant la réunion pour préparer chaque point de discussion.'
  },

  // ==========================================
  // GRAMMAIRE A2
  // ==========================================
  {
    id: 'qz_grm_01',
    category: 'grammaire',
    domainOrTopic: 'Passé composé vs Imparfait',
    question: 'Complétez : « Hier matin, pendant que je __________ le rayon, le chef est arrivé. »',
    contextNote: 'Contexte vs Événement',
    options: [
      'rangeais (Imparfait)',
      'ai rangé (Passé composé)',
      'vais ranger (Futur proche)',
      'rangerai (Futur simple)'
    ],
    correctIndex: 0,
    explanation: 'L’action secondaire durable en cours au moment où survient un événement bref s’exprime à l’imparfait.'
  },
  {
    id: 'qz_grm_02',
    category: 'grammaire',
    domainOrTopic: 'Pronoms compléments',
    question: 'Transformez avec un pronom : « Je parle aux nouveaux collègues. »',
    contextNote: 'Remplacement de « à + personnes au pluriel »',
    options: [
      'Je leur parle.',
      'Je les parle.',
      'Je lui parle.',
      'Je y parle.'
    ],
    correctIndex: 0,
    explanation: '« Parler à » demande un COI. Au pluriel, le pronom est « leur » (invariable, sans « s »).'
  },
  {
    id: 'qz_grm_03',
    category: 'grammaire',
    domainOrTopic: 'La négation complexe',
    question: 'Quel est le contraire de : « Il y a encore des cartons dans la réserve » ?',
    contextNote: 'Négation d’un état qui se termine',
    options: [
      'Il n’y a plus de cartons dans la réserve.',
      'Il n’y a jamais de cartons dans la réserve.',
      'Il n’y a rien de cartons dans la réserve.',
      'Il n’y a personne de cartons dans la réserve.'
    ],
    correctIndex: 0,
    explanation: 'Le contraire de « encore » est « ne... plus » pour indiquer la fin d’une réserve ou d’une situation.'
  },
  {
    id: 'qz_grm_04',
    category: 'grammaire',
    domainOrTopic: 'L’impératif de consigne',
    question: 'Quelle est la forme impérative correcte et polie adressée à une équipe ?',
    contextNote: 'Consignes de sécurité',
    options: [
      'Attachez vos casques et soyez prudents !',
      'Vous attachez vos casques et soyez prudents !',
      'Attaches tes casques et es prudent !',
      'Attacher vos casques et êtes prudents !'
    ],
    correctIndex: 0,
    explanation: 'À l’impératif, on ne met pas de pronom sujet « vous ». « Être » devient « soyez » à l’impératif.'
  },
  {
    id: 'qz_grm_05',
    category: 'grammaire',
    domainOrTopic: 'Prépositions de lieu',
    question: 'Complétez : « Cet après-midi, je dois aller ________ le dentiste, puis ________ la pharmacie. »',
    contextNote: 'Personne vs Lieu',
    options: [
      'chez / à',
      'à / chez',
      'au / en',
      'vers / sur'
    ],
    correctIndex: 0,
    explanation: 'On utilise « CHEZ » devant une personne ou un professionnel (« chez le dentiste »), et « À » devant un établissement (« à la pharmacie »).'
  },

  // ==========================================
  // VIE QUOTIDIENNE
  // ==========================================
  {
    id: 'qz_qot_01',
    category: 'quotidien',
    domainOrTopic: 'Logement & Papiers',
    question: 'Quel document prouve que vous avez bien payé votre loyer chaque mois ?',
    contextNote: 'Dossier administratif de logement',
    options: [
      'La quittance de loyer',
      'Le titre de transport',
      'Le devis estimatif',
      'L’ordonnance'
    ],
    correctIndex: 0,
    explanation: 'La quittance de loyer remise par le propriétaire prouve que la mensualité a été réglée et constitue un justificatif de domicile officiel.'
  },
  {
    id: 'qz_qot_02',
    category: 'quotidien',
    domainOrTopic: 'Transports en commun',
    question: 'Que devez-vous faire impérativement avant d’entrer dans le train avec un billet papier ?',
    contextNote: 'Règle SNCF',
    options: [
      'Composter votre billet dans la borne jaune',
      'Signer le billet devant le contrôleur',
      'Le scanner à la mairie',
      'Le déchirer en deux'
    ],
    correctIndex: 0,
    explanation: 'Composter (valider) le billet imprime la date et la gare de départ pour que le titre de transport soit valable.'
  }
];
