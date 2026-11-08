import { ScenarioSituation } from '../types/fle';

export const SCENARIOS_LIST: ScenarioSituation[] = [
  {
    id: 'scen_01',
    domain: 'libre_service',
    domainTitle: 'Libre-service & Grande distribution',
    title: 'Renseigner un client et gérer une rupture en rayon',
    description: 'Vous êtes employé(e) commercial(e) au rayon épicerie. Un client cherche un article en promotion.',
    initialContext: 'Vous êtes en train de faire le facing du rayon quand un client s’approche avec un prospectus promotionnel.',
    dialogueNodes: [
      {
        nodeId: 'n1',
        interlocutorName: 'Monsieur Leroy',
        interlocutorRole: 'Client du magasin',
        interlocutorText: 'Bonjour madame / monsieur. Je cherche l’huile d’olive en promotion sur votre catalogue, mais l’étagère est totalement vide !',
        userPrompt: 'Comment réagissez-vous de manière professionnelle et polie ?',
        choices: [
          {
            text: '« Bonjour Monsieur. Laissez-moi regarder la référence. Je vais vérifier tout de suite dans la réserve si nous en avons encore en stock. »',
            isAppropriate: true,
            feedback: 'Excellente formule ! Formule de salutation polie, prise en charge immédiate et utilisation du futur proche (« je vais vérifier »).'
          },
          {
            text: '« S’il n’y en a plus, c’est qu’il n’y en a plus. Repassez demain matin. »',
            isAppropriate: false,
            feedback: 'Formulation trop abrupte et négative. En commerce, on vérifie toujours le stock en réserve ou l’on propose une alternative.'
          },
          {
            text: '« Je ne sais pas, ce n’est pas mon rayon, demandez à quelqu’un d’autre. »',
            isAppropriate: false,
            feedback: 'À éviter. Même si ce n’est pas votre rayon attitré, on accompagne le client vers un collègue ou le responsable.'
          }
        ]
      },
      {
        nodeId: 'n2',
        interlocutorName: 'Monsieur Leroy',
        interlocutorRole: 'Client du magasin',
        interlocutorText: 'Merci beaucoup ! En attendant, pouvez-vous me dire où se trouvent les caisses automatiques s’il vous plaît ?',
        userPrompt: 'Comment indiquez-vous la direction clairement au client ?',
        choices: [
          {
            text: '« Oui, bien sûr. Continuez tout droit jusqu’au bout de l’allée centrale, puis tournez à droite, elles sont juste en face de l’accueil. »',
            isAppropriate: true,
            feedback: 'Parfait ! Utilisation précise des repères spatiaux (tout droit, au bout de, à droite, en face de).'
          },
          {
            text: '« C’est là-bas derrière. Vous trouverez facilement. »',
            isAppropriate: false,
            feedback: 'Trop vague : le client risque de se perdre dans un grand hypermarché.'
          }
        ]
      }
    ]
  },
  {
    id: 'scen_02',
    domain: 'btp',
    domainTitle: 'BTP & Sécurité sur chantier',
    title: 'Rappel des consignes de sécurité obligatoires',
    description: 'Sur le chantier de rénovation, un nouvel ouvrier intérimaire commence sans ses gants ni ses lunettes.',
    initialContext: 'Le chef d’équipe vous demande d’accueillir Samir, nouvel intérimaire, et de vérifier qu’il respecte les consignes de sécurité.',
    dialogueNodes: [
      {
        nodeId: 'n1',
        interlocutorName: 'Samir',
        interlocutorRole: 'Ouvrier intérimaire',
        interlocutorText: 'Salut ! Je viens pour le coulage de la dalle de béton. On commence où ?',
        userPrompt: 'Vous remarquez qu’il n’a pas mis ses gants de protection ni ses lunettes. Que lui dites-vous ?',
        choices: [
          {
            text: '« Bienvenue Samir. Avant de commencer, mets tes gants et tes lunettes de sécurité. Sur ce chantier, le port des EPI complets est obligatoire pour tout le monde. »',
            isAppropriate: true,
            feedback: 'Très bien ! Accueil chaleureux combiné à un rappel ferme et clair des consignes de sécurité au travail.'
          },
          {
            text: '« Arrête tout ! Tu n’as rien compris, tu vas te faire virer si le patron te voit comme ça ! »',
            isAppropriate: false,
            feedback: 'Trop agressif. Expliquez la règle avec calme et professionnalisme.'
          },
          {
            text: '« Ce n’est pas grave pour les gants, fais juste attention au ciment. »',
            isAppropriate: false,
            feedback: 'Dangereux ! Le ciment peut causer de graves brûlures chimiques. La sécurité ne se négocie jamais sur un chantier.'
          }
        ]
      },
      {
        nodeId: 'n2',
        interlocutorName: 'Samir',
        interlocutorRole: 'Ouvrier intérimaire',
        interlocutorText: 'D’accord, merci du conseil. Où sont stockés les sacs de ciment et la bétonnière ?',
        userPrompt: 'Comment lui répondez-vous avec précision ?',
        choices: [
          {
            text: '« Les sacs sont sous la bâche bleue près du conteneur, et la bétonnière est branchée juste à côté du point d’eau. »',
            isAppropriate: true,
            feedback: 'Parfait ! Emploi précis des prépositions de lieu (sous, près de, juste à côté de).'
          },
          {
            text: '« Cherche un peu sur le chantier, tu verras bien. »',
            isAppropriate: false,
            feedback: 'Peu collaboratif pour l’intégration d’un nouveau collègue.'
          }
        ]
      }
    ]
  },
  {
    id: 'scen_03',
    domain: 'secretariat',
    domainTitle: 'Secrétariat & Accueil téléphonique',
    title: 'Prendre un message téléphonique professionnel',
    description: 'Au standard d’une entreprise, vous recevez un appel d’un fournisseur pour le directeur financier.',
    initialContext: 'Le téléphone sonne à 11h. Le directeur financier est absent car il participe à une réunion à la préfecture.',
    dialogueNodes: [
      {
        nodeId: 'n1',
        interlocutorName: 'Monsieur Diallo',
        interlocutorRole: 'Fournisseur externe',
        interlocutorText: 'Bonjour, entreprise LogiFrance, pourrais-je parler à Monsieur Vasseur s’il vous plaît ? C’est urgent au sujet de la livraison.',
        userPrompt: 'Comment répondez-vous avec professionnalisme et courtoisie ?',
        choices: [
          {
            text: '« Bonjour Monsieur. Monsieur Vasseur est actuellement en réunion à l’extérieur. Puis-je prendre vos coordonnées et un message pour qu’il vous rappelle dès son retour ? »',
            isAppropriate: true,
            feedback: 'Formule exemplaire ! Politesse, explication claire de l’indisponibilité et proposition proactive de prendre un message.'
          },
          {
            text: '« Non, il n’est pas là. Rappelez plus tard. »',
            isAppropriate: false,
            feedback: 'Beaucoup trop sec. Cela donne une mauvaise image de l’entreprise.'
          },
          {
            text: '« Je lui donne votre numéro si vous voulez, mais je ne garantis rien. »',
            isAppropriate: false,
            feedback: 'Manque d’assurance et formulation familière non professionnelle.'
          }
        ]
      },
      {
        nodeId: 'n2',
        interlocutorName: 'Monsieur Diallo',
        interlocutorRole: 'Fournisseur externe',
        interlocutorText: 'Très bien, je vous remercie. Je suis Monsieur Diallo de la société MétalPlus au 06 12 34 56 78.',
        userPrompt: 'Comment confirmez-vous que vous avez bien noté les informations ?',
        choices: [
          {
            text: '« C’est bien noté Monsieur Diallo : 06 12 34 56 78. Je lui transmets votre message immédiatement. Je vous souhaite une excellente journée. »',
            isAppropriate: true,
            feedback: 'Parfait ! Répéter le numéro permet de vérifier l’exactitude de la note, et la formule de clôture est impeccable.'
          },
          {
            text: '« Ouais, d’accord, au revoir. »',
            isAppropriate: false,
            feedback: 'Langage trop familier pour un standard d’entreprise.'
          }
        ]
      }
    ]
  },
  {
    id: 'scen_04',
    domain: 'sante',
    domainTitle: 'Santé & Aide à domicile',
    title: 'Rassurer une résidente et effectuer la transmission',
    description: 'Madame Mercier, 84 ans, a fait sonner la sonnette d’appel car elle a mal à la jambe.',
    initialContext: 'Vous êtes aide-soignant(e) de garde. Le voyant lumineux de la chambre 12 s’allume.',
    dialogueNodes: [
      {
        nodeId: 'n1',
        interlocutorName: 'Madame Mercier',
        interlocutorRole: 'Résidente en EHPAD',
        interlocutorText: 'Bonjour mon petit... J’ai essayé de me lever pour aller au fauteuil, mais ma jambe gauche me fait très mal ce matin.',
        userPrompt: 'Comment réagissez-vous pour sécuriser et rassurer la résidente ?',
        choices: [
          {
            text: '« Bonjour Madame Mercier. Ne bougez pas, restez bien assise sur le lit. Je vais vous aider à vous réinstaller confortablement et je préviens l’infirmière pour qu’elle examine votre jambe. »',
            isAppropriate: true,
            feedback: 'Idéal ! Attitude rassurante, consigne de prudence (« ne bougez pas ») et respect du rôle professionnel.'
          },
          {
            text: '« Vous savez bien qu’il ne faut jamais vous lever seule ! Vous n’écoutez jamais ! »',
            isAppropriate: false,
            feedback: 'Ton culpabilisant et infantilisant à proscrire avec les personnes vulnérables.'
          },
          {
            text: '« Prenez un comprimé dans votre pilulier et ça va passer. »',
            isAppropriate: false,
            feedback: 'Interdit : seul le médecin ou l’infirmier peut autoriser ou administrer un traitement supplémentaire.'
          }
        ]
      }
    ]
  },
  {
    id: 'scen_05',
    domain: 'periscolaire',
    domainTitle: 'Périscolaire & Garderie',
    title: 'Gérer la sortie d’un enfant et la sécurité des transmissions',
    description: 'À 17h15, un adulte inconnu se présente à la porte de l’école pour récupérer le petit Enzo.',
    initialContext: 'L’animateur est responsable du pointage de la sortie des élèves inscrits au périscolaire.',
    dialogueNodes: [
      {
        nodeId: 'n1',
        interlocutorName: 'Monsieur Fabre',
        interlocutorRole: 'Visiteur à la grille',
        interlocutorText: 'Bonjour ! Je suis le voisin des parents d’Enzo. Sa maman est coincée dans les bouchons et m’a demandé de venir le chercher.',
        userPrompt: 'Comment appliquez-vous le protocole de sécurité de l’école ?',
        choices: [
          {
            text: '« Bonjour Monsieur. Pour la sécurité d’Enzo, je dois d’abord vérifier si votre nom figure sur la liste des personnes autorisées dans notre cahier de liaison, et vous demander une pièce d’identité. »',
            isAppropriate: true,
            feedback: 'Règle d’or en périscolaire ! La sécurité des enfants exige une vérification systématique de la pièce d’identité et de l’autorisation parentale écrite.'
          },
          {
            text: '« D’accord, si vous êtes le voisin, Enzo peut partir avec vous. »',
            isAppropriate: false,
            feedback: 'Faute grave de sécurité ! On ne confie jamais un enfant sans autorisation écrite officielle des responsables légaux.'
          }
        ]
      }
    ]
  }
];
