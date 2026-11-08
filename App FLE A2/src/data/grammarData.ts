import { GrammarRule } from '../types/fle';

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'gram_01',
    topic: 'passe_compose_imparfait',
    title: 'Passé composé vs Imparfait',
    shortDescription: 'Distinguer une action précise et terminée d’une situation ou habitude passée.',
    ruleExplanation: [
      'Le Passé Composé exprime une action ponctuelle, délimitée dans le temps, terminée, ou une succession d’événements.',
      'L’Imparfait sert à décrire le décor, la météo, l’ambiance, l’état physique ou émotionnel, ou une habitude répétée dans le passé.',
      'Astuce pratique : Posez-vous la question : Est-ce une action précise (« Tout à coup, le client est entré ») ou le contexte (« Il pleuvait et le magasin était calme ») ?'
    ],
    keyFormulas: [
      {
        label: 'Passé Composé (Avoir)',
        formula: 'Sujet + AVOIR au présent + Participe passé',
        example: 'J’ai vérifié les étiquettes ce matin.'
      },
      {
        label: 'Passé Composé (Être : verbes de mouvement + pronominaux)',
        formula: 'Sujet + ÊTRE au présent + Participe passé (accordé en genre/nombre)',
        example: 'Elle est arrivée à 8 heures sur le chantier.'
      },
      {
        label: 'Imparfait',
        formula: 'Radical de « nous » au présent + -ais, -ais, -ait, -ions, -iez, -aient',
        example: 'Quand je travaillais à l’accueil, je recevais beaucoup d’appels.'
      }
    ],
    comparisons: {
      conceptA: 'Passé Composé (Action ponctuelle)',
      conceptB: 'Imparfait (Décor / Habitude)',
      rows: [
        {
          aspect: 'Événement vs Contexte',
          exampleA: 'Le téléphone a sonné à 14h30.',
          exampleB: 'J’étais en train d’écrire un courriel.'
        },
        {
          aspect: 'Action terminée vs Durée non délimitée',
          exampleA: 'Nous avons fini le chantier vendredi.',
          exampleB: 'Le chantier durait depuis des mois.'
        },
        {
          aspect: 'Rupture vs État d’esprit',
          exampleA: 'L’alarme s’est déclenchée soudainement.',
          exampleB: 'Les ouvriers portaient tous leur casque.'
        }
      ]
    },
    commonMistakes: [
      {
        incorrect: 'Hier, je faisais mes courses à 15h et je rentrais.',
        correct: 'Hier, j’ai fait mes courses à 15h et je suis rentré(e).',
        tip: 'Ce sont des actions précises et achevées : utilisez le passé composé.'
      },
      {
        incorrect: 'Elle a été malade, alors elle n’est pas venue.',
        correct: 'Elle était malade (état), alors elle n’est pas venue (action).',
        tip: 'L’état de santé continu s’exprime naturellement à l’imparfait.'
      }
    ],
    practiceExercises: [
      {
        id: 'gpex_pc_01',
        prompt: 'Action interrompue par un événement soudain',
        context: 'Rapport d’activité en magasin',
        sentenceBefore: 'Pendant que l’employé',
        blankAnswer: 'rangeait',
        sentenceAfter: 'le rayon, un carton est tombé de l’étagère.',
        options: ['rangeait', 'a rangé', 'va ranger', 'rangera'],
        explanation: 'L’action de fond continue (« rangeait ») est à l’imparfait, coupée par l’action ponctuelle au passé composé (« est tombé »).'
      },
      {
        id: 'gpex_pc_02',
        prompt: 'Accord du participe passé avec l’auxiliaire être',
        context: 'Arrivée sur le lieu de travail',
        sentenceBefore: 'La nouvelle directrice',
        blankAnswer: 'est arrivée',
        sentenceAfter: 'à huit heures et quart ce matin.',
        options: ['est arrivée', 'a arrivé', 'arrivait', 'est arrivé'],
        explanation: 'Le verbe « arriver » se conjugue avec l’auxiliaire « être » au passé composé et s’accorde avec le sujet féminin « la directrice » (-ée).'
      },
      {
        id: 'gpex_pc_03',
        prompt: 'Habitude passée vs Événement daté',
        context: 'Expérience professionnelle passée',
        sentenceBefore: 'L’année dernière, je',
        blankAnswer: 'travaillais',
        sentenceAfter: 'dans un supermarché à Lyon tous les samedis.',
        options: ['travaillais', 'ai travaillé', 'travaille', 'vais travailler'],
        explanation: '« Tous les samedis » exprime une habitude répétée dans le passé : on utilise l’imparfait (« je travaillais »).'
      }
    ]
  },
  {
    id: 'gram_02',
    topic: 'futur_proche_simple',
    title: 'Futur proche & Futur simple',
    shortDescription: 'Exprimer des projets immédiats au travail ou des prévisions à long terme.',
    ruleExplanation: [
      'Le Futur Proche s’utilise très couramment à l’oral pour une action imminente ou un projet très concret déjà décidé.',
      'Le Futur Simple s’emploie pour des projets lointains, des promesses, des consignes écrites formelles ou la météo.',
      'Formation du Futur Simple : Infinitif complet + terminaisons : -ai, -as, -a, -ons, -ez, -ont.'
    ],
    keyFormulas: [
      {
        label: 'Futur Proche',
        formula: 'ALLER au présent + Verbe à l’infinitif',
        example: 'Je vais contacter le responsable logistique tout de suite.'
      },
      {
        label: 'Futur Simple',
        formula: 'Infinitif (ou radical irrégulier) + -ai, -as, -a, -ons, -ez, -ont',
        example: 'Demain, l’équipe terminera la livraison avant midi.'
      }
    ],
    comparisons: {
      conceptA: 'Futur Proche (Oral / Court terme)',
      conceptB: 'Futur Simple (Écrit / Formel / Long terme)',
      rows: [
        {
          aspect: 'Intention immédiate',
          exampleA: 'Attention, le pot de peinture va tomber !',
          exampleB: 'Dans dix ans, la ville construira une nouvelle ligne.'
        },
        {
          aspect: 'Conversation au bureau',
          exampleA: 'Je vais vous transférer son appel.',
          exampleB: 'Nous vous confirmerons le rendez-vous par écrit.'
        }
      ]
    },
    commonMistakes: [
      {
        incorrect: 'Je vais aller à la pharmacie demain.',
        correct: 'Je vais à la pharmacie demain. / J’irai à la pharmacie.',
        tip: 'Évitez de répéter « aller aller » ; le présent ou futur simple est plus élégant.'
      }
    ],
    practiceExercises: [
      {
        id: 'gpex_fut_01',
        prompt: 'Action orale immédiate au bureau',
        context: 'Accueil téléphonique professionnel',
        sentenceBefore: 'Ne quittez pas, je',
        blankAnswer: 'vais transférer',
        sentenceAfter: 'votre appel au service des commandes tout de suite.',
        options: ['vais transférer', 'transférerais', 'transférais', 'ai transféré'],
        explanation: 'Pour une action orale imminente dans l’instant, on utilise le futur proche : aller au présent + infinitif (« je vais transférer »).'
      },
      {
        id: 'gpex_fut_02',
        prompt: 'Engagement et promesse professionnelle écrite',
        context: 'Courriel de confirmation administrative',
        sentenceBefore: 'Dès réception de vos pièces justificatives, nous vous',
        blankAnswer: 'enverrons',
        sentenceAfter: 'votre attestation officielle.',
        options: ['enverrons', 'allons envoyer', 'envoyons', 'avions envoyé'],
        explanation: 'Dans un écrit formel, le futur simple du verbe envoyer (« nous enverrons ») exprime l’engagement officiel.'
      },
      {
        id: 'gpex_fut_03',
        prompt: 'Avertissement de sécurité immédiat',
        context: 'Alerte sur chantier BTP',
        sentenceBefore: 'Reculez vite ! La grue',
        blankAnswer: 'va soulever',
        sentenceAfter: 'cette poutre en acier.',
        options: ['va soulever', 'soulèvera', 'soulevait', 'a soulevé'],
        explanation: 'L’imminence du danger dans les secondes qui suivent s’exprime par le futur proche (« va soulever »).'
      }
    ]
  },
  {
    id: 'gram_03',
    topic: 'pronoms_cod_coi',
    title: 'Les pronoms compléments (COD et COI)',
    shortDescription: 'Remplacer un nom de personne ou d’objet pour ne pas répéter (le, la, les, lui, leur).',
    ruleExplanation: [
      'Le COD (Complément d’Objet Direct) remplace un nom direct (sans préposition "à"). Formes : le, la, l’, les.',
      'Le COI (Complément d’Objet Indirect) remplace une personne précédée de la préposition « à ». Formes : lui (singulier), leur (pluriel).',
      'Position : Le pronom se place TOUJOURS AVANT le verbe conjugué (ou entre l’auxiliaire « aller » et l’infinitif).'
    ],
    keyFormulas: [
      {
        label: 'COD (Le / La / Les)',
        formula: 'Verbe + Quelque chose / Quelqu’un → Sujet + [le/la/les] + Verbe',
        example: 'Tu ranges le transpalette ? → Oui, je LE range.'
      },
      {
        label: 'COI (Lui / Leur)',
        formula: 'Verbe + À quelqu’un → Sujet + [lui/leur] + Verbe',
        example: 'Tu as téléphoné au chef d’équipe ? → Oui, je LUI ai téléphoné.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Je téléphone à lui pour lui demander.',
        correct: 'Je lui téléphone pour lui demander.',
        tip: 'Le pronom COI « lui » se place avant le verbe en français.'
      },
      {
        incorrect: 'Je vois leur tous les matins.',
        correct: 'Je les vois tous les matins (voir quelqu’un = COD : les).',
        tip: '« Leur » s’utilise seulement si le verbe se construit avec « à » (parler à, téléphoner à).'
      }
    ],
    practiceExercises: [
      {
        id: 'gpex_pro_01',
        prompt: 'Remplacement d’un objet direct au pluriel (COD)',
        context: 'Gestion des stocks en supermarché',
        sentenceBefore: '– As-tu vérifié les étiquettes de prix ? – Oui, je',
        blankAnswer: 'les',
        sentenceAfter: 'ai toutes contrôlées une par une.',
        options: ['les', 'leur', 'lui', 'en'],
        explanation: '« Contrôler les étiquettes » est direct (pas de « à »). Le pronom COD pluriel est « les ».'
      },
      {
        id: 'gpex_pro_02',
        prompt: 'Remplacement d’une personne précédée de « à » (COI)',
        context: 'Communication avec le responsable de chantier',
        sentenceBefore: '– Tu as expliqué le problème au chef d’équipe ? – Oui, je',
        blankAnswer: 'lui',
        sentenceAfter: 'ai expliqué la situation ce matin.',
        options: ['lui', 'le', 'leur', 'y'],
        explanation: 'On dit « expliquer À quelqu’un ». Au singulier pour une personne, le pronom COI est « lui ».'
      },
      {
        id: 'gpex_pro_03',
        prompt: 'Remplacement de plusieurs personnes précédées de « à » (COI pluriel)',
        context: 'Consignes en milieu périscolaire',
        sentenceBefore: '– As-tu donné les autorisations aux parents ? – Oui, je',
        blankAnswer: 'leur',
        sentenceAfter: 'ai remis les documents à la sortie.',
        options: ['leur', 'les', 'lui', 'en'],
        explanation: '« Donner à qui ? » aux parents (pluriel). Le pronom COI pluriel est « leur » (invariable).'
      }
    ]
  },
  {
    id: 'gram_04',
    topic: 'negation',
    title: 'La négation complexe (ne... plus, jamais, rien, personne)',
    shortDescription: 'Nuancer la négation au quotidien et dans le cadre professionnel.',
    ruleExplanation: [
      'Ne... pas : négation simple (« Je ne sais pas »).',
      'Ne... plus : arrêt d’une habitude ou rupture (« Il n’y a plus de stock »).',
      'Ne... jamais : fréquence nulle, contraire de « toujours » (« Je ne suis jamais en retard »).',
      'Ne... rien : absence de chose (« Je n’ai rien compris à la consigne »).',
      'Ne... personne : absence d’humain (« Il n’y a personne à l’accueil »).'
    ],
    keyFormulas: [
      {
        label: 'Structure au présent',
        formula: 'Sujet + NE (N’) + Verbe + [plus / jamais / rien / personne]',
        example: 'Nous ne trouvons rien dans cette réserve.'
      },
      {
        label: 'Au Passé Composé (Attention à PERSONNE)',
        formula: 'Ne + Auxiliaire + [rien/jamais/plus] + Participe passé, MAIS : Ne + Auxiliaire + Participe + PERSONNE',
        example: 'Je n’ai RIEN vu, mais je n’ai vu PERSONNE.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Je n’ai personne vu dans le couloir.',
        correct: 'Je n’ai vu personne dans le couloir.',
        tip: '« Personne » se place toujours après le participe passé au passé composé.'
      }
    ],
    practiceExercises: [
      {
        id: 'gpex_neg_01',
        prompt: 'Rupture de stock / Changement d’état',
        context: 'Inventaire des fournitures médicales',
        sentenceBefore: 'Il n’y a',
        blankAnswer: 'plus',
        sentenceAfter: 'de masques chirurgicaux dans le tiroir, il faut ouvrir un nouveau carton.',
        options: ['plus', 'jamais', 'rien', 'personne'],
        explanation: '« Ne... plus » signifie qu’il y en avait avant, mais qu’il n’en reste plus aujourd’hui.'
      },
      {
        id: 'gpex_neg_02',
        prompt: 'Absence totale d’êtres humains',
        context: 'Visite des locaux en fin de journée',
        sentenceBefore: 'Je suis monté au deuxième étage mais je n’ai trouvé',
        blankAnswer: 'personne',
        sentenceAfter: 'dans les bureaux.',
        options: ['personne', 'rien', 'plus', 'aucun'],
        explanation: 'Pour exprimer l’absence d’individus, on utilise « ne... personne » (qui se place après le participe au passé composé).'
      },
      {
        id: 'gpex_neg_03',
        prompt: 'Fréquence nulle (contraire de « toujours »)',
        context: 'Règle de ponctualité professionnelle',
        sentenceBefore: 'Cet employé est exemplaire : il n’arrive',
        blankAnswer: 'jamais',
        sentenceAfter: 'en retard à sa prise de service.',
        options: ['jamais', 'rien', 'personne', 'pas encore'],
        explanation: 'Le contraire de « toujours » ou « souvent » est « ne... jamais ».'
      }
    ]
  },
  {
    id: 'gram_05',
    topic: 'imperatif',
    title: 'L’impératif pour donner des consignes',
    shortDescription: 'Donner des instructions claires, des règles de sécurité et des conseils de travail.',
    ruleExplanation: [
      'L’impératif s’utilise sans pronom sujet (tu, nous, vous).',
      'Au travail avec un collègue ou un client, on utilise presque toujours la forme de politesse : VOUS (-ez).',
      'Règle spéciale verbes en -ER à la 2e personne (tu) : pas de « s » final (ex: « Regarde ! », pas « Regardes »).'
    ],
    keyFormulas: [
      {
        label: 'Consigne polie professionnelle (Vous)',
        formula: 'Verbe conjugué avec vous (sans sujet)',
        example: 'Attachez votre ceinture de sécurité et portez vos gants.'
      },
      {
        label: 'Interdiction de sécurité',
        formula: 'Ne + Verbe impératif + pas',
        example: 'Ne touchez pas aux câbles électriques dénudés.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Vous signez ici s’il vous plaît.',
        correct: 'Signez ici, s’il vous plaît. (ou : Veuillez signer ici).',
        tip: 'À l’impératif, supprimez le pronom sujet « vous ».'
      }
    ],
    practiceExercises: [
      {
        id: 'gpex_imp_01',
        prompt: 'Consigne de sécurité sur échafaudage',
        context: 'Directives sur chantier BTP',
        sentenceBefore: '',
        blankAnswer: 'Attachez',
        sentenceAfter: 'votre harnais de sécurité avant de monter sur l’échafaudage !',
        options: ['Attachez', 'Vous attachez', 'Attacher', 'Attaches'],
        explanation: 'À l’impératif avec « vous », on utilise la terminaison -ez sans pronom sujet (« Attachez »).'
      },
      {
        id: 'gpex_imp_02',
        prompt: 'Protocole d’hygiène en cuisine / cantine',
        context: 'Hygiène périscolaire',
        sentenceBefore: '',
        blankAnswer: 'Lavez-vous',
        sentenceAfter: 'les mains à l’eau et au savon avant de servir le repas.',
        options: ['Lavez-vous', 'Vous lavez', 'Te laves', 'Laver vous'],
        explanation: 'Pour un verbe pronominal à l’impératif affirmatif, le pronom réfléchi se place après le verbe avec un trait d’union (« Lavez-vous »).'
      },
      {
        id: 'gpex_imp_03',
        prompt: 'Interdiction impérative en milieu hospitalier',
        context: 'Sécurité incendie et soins',
        sentenceBefore: 'En cas d’urgence, ne',
        blankAnswer: 'prenez',
        sentenceAfter: 'pas l’ascenseur, utilisez l’escalier de secours.',
        options: ['prenez', 'prendre', 'prenez-vous', 'prends'],
        explanation: 'À la forme négative de l’impératif : Ne + Verbe (vous) + pas (« ne prenez pas »).'
      }
    ]
  },
  {
    id: 'gram_06',
    topic: 'prepositions',
    title: 'Prépositions de lieu et de temps (chez, à, en, depuis, pendant)',
    shortDescription: 'Se repérer dans l’espace et dans le temps pour les démarches et les rendez-vous.',
    ruleExplanation: [
      'CHEZ + personne, profession ou nom de lieu habité (« chez le médecin », « chez le garagiste »).',
      'À / AU / EN + lieu inanimé (« à la pharmacie », « à l’hôpital », « au supermarché »).',
      'DEPUIS : action commencée dans le passé et qui CONTINUE aujourd’hui (« Je travaille ici depuis 2 ans »).',
      'PENDANT : durée complète et délimitée d’une action (« J’ai fait un stage pendant 3 mois »).'
    ],
    keyFormulas: [
      {
        label: 'Lieu : Chez vs À',
        formula: 'Chez + Personne / À/Au + Bâtiment ou Institution',
        example: 'Je vais chez le dentiste puis à la caisse d’allocations familiales.'
      },
      {
        label: 'Temps : Depuis vs Pendant',
        formula: 'Depuis + Présent (continue) / Pendant + Passé (achevé)',
        example: 'J’habite en France depuis 2024. J’ai attendu pendant 20 minutes.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Je vais au médecin demain matin.',
        correct: 'Je vais chez le médecin demain matin.',
        tip: 'Le médecin est une personne : on emploie « chez ».'
      },
      {
        incorrect: 'Je travaille ici pendant 3 ans (et je continue).',
        correct: 'Je travaille ici depuis 3 ans.',
        tip: 'Si l’action est toujours en cours au moment où on parle, on utilise « depuis ».'
      }
    ],
    practiceExercises: [
      {
        id: 'gpex_prep_01',
        prompt: 'Préposition de lieu avec un praticien',
        context: 'Visite médicale d’aptitude',
        sentenceBefore: 'Elle a rendez-vous à 15 heures',
        blankAnswer: 'chez',
        sentenceAfter: 'le médecin du travail pour sa visite médicale.',
        options: ['chez', 'au', 'à', 'dans'],
        explanation: 'Le médecin est une personne : on emploie obligatoirement « chez » (« chez le médecin »).'
      },
      {
        id: 'gpex_prep_02',
        prompt: 'Durée continue qui se poursuit dans le présent',
        context: 'Ancienneté dans l’entreprise',
        sentenceBefore: 'Monsieur Diallo travaille dans ce magasin de libre-service',
        blankAnswer: 'depuis',
        sentenceAfter: 'cinq ans.',
        options: ['depuis', 'pendant', 'il y a', 'pour'],
        explanation: 'Le verbe est au présent (« travaille ») et l’action continue aujourd’hui : on utilise « depuis ».'
      },
      {
        id: 'gpex_prep_03',
        prompt: 'Durée délimitée et terminée dans le passé',
        context: 'Formation qualifiante',
        sentenceBefore: 'L’année dernière, elle a suivi une formation en secrétariat',
        blankAnswer: 'pendant',
        sentenceAfter: 'six mois.',
        options: ['pendant', 'depuis', 'dans', 'envers'],
        explanation: 'La formation est terminée dans le passé : la durée complète s’exprime avec « pendant ».'
      }
    ]
  }
];
