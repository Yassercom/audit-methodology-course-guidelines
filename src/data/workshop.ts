export const COSO_LIST = [
  { id: "env", label: "Environnement de contrôle" },
  { id: "risk", label: "Évaluation des risques" },
  { id: "act", label: "Activités de contrôle" },
  { id: "info", label: "Information et communication" },
  { id: "pil", label: "Pilotage" },
];

export interface Exercise {
  id: string;
  tab: string;
  title: string;
  icon: string;
  observation: string;
  facts: { v: string; l: string }[];
  derived: { v: string; l: string }[];
  axes: { t: string; hint: string }[];
  corrige: {
    coso: { id: string; direct: boolean; why: string }[];
    dys: { t: string; d: string }[];
    tests: string[];
    calculs: string[];
    p: number;
    i: number;
    justP: string;
    justI: string;
    alt: string;
    frap: { constat: string; cause: string[]; conseq: string[]; reco: { a: string; r: string; d: string }[] };
  };
}

export const exercises: Exercise[] = [
  {
    id: "frap1",
    tab: "FRAP 1 · Gestion du carburant",
    title: "FRAP 1 — Gestion du carburant",
    icon: "⛽",
    observation:
      "Le régisseur des dépenses gère à la fois la commande des bons de carburant, leur distribution aux chauffeurs et la tenue du registre de suivi. Aucun contrôle du kilométrage des véhicules n'est effectué. La consommation a augmenté de 38 % en un an (+ 420 000 MAD) sans augmentation du parc automobile.",
    facts: [
      { v: "85 M MAD", l: "Budget annuel de la commune" },
      { v: "+ 38 %", l: "Consommation de carburant en un an" },
      { v: "420 000 MAD", l: "Surcoût constaté" },
      { v: "0 véhicule", l: "d'augmentation du parc automobile" },
    ],
    derived: [
      { v: "≈ 0,49 %", l: "Poids du surcoût dans le budget annuel (420 000 ÷ 85 000 000)" },
      { v: "3 fonctions", l: "cumulées par un seul agent : commande, distribution, tenue du registre" },
    ],
    axes: [
      { t: "Absence de séparation des tâches", hint: "Quelles fonctions sont cumulées ? Pourquoi sont-elles incompatibles ?" },
      { t: "Absence de contrôle du kilométrage", hint: "Quel rapprochement devient impossible ? Quel indicateur manque ?" },
      { t: "Augmentation des dépenses", hint: "Que signifie une hausse de 38 % sans hausse du parc ? Que n'a-t-on pas détecté ?" },
    ],
    corrige: {
      coso: [
        { id: "act", direct: true, why: "Violation la plus directe : aucune séparation des tâches (commande / distribution / tenue du registre confiées au même agent) et aucun contrôle du kilométrage. Ce sont précisément les « procédures concrètes » citées par le cours." },
        { id: "pil", direct: true, why: "Une hausse de 38 % de la consommation en un an n'a été ni détectée ni analysée en cours d'année : il n'y a pas de surveillance continue des consommations." },
        { id: "env", direct: false, why: "L'organisation confie trois fonctions incompatibles à un seul agent : la répartition des responsabilités n'a pas été pensée (organigramme, délégation, attribution des tâches)." },
        { id: "info", direct: false, why: "Le registre de suivi est tenu par la personne qui commande et distribue : l'information n'est pas indépendante et donc peu fiable ; aucune donnée de kilométrage ne remonte." },
        { id: "risk", direct: false, why: "Le risque de surconsommation ou de détournement de carburant n'a manifestement pas été identifié ni traité dans la cartographie des risques de la commune." },
      ],
      dys: [
        { t: "Absence de séparation des tâches", d: "Le régisseur commande, distribue et enregistre : il contrôle seul tout le cycle. Personne ne vérifie son travail ; une erreur, ou une fraude, ne peut pas être détectée par construction." },
        { t: "Absence de contrôle du kilométrage", d: "Impossible de rapprocher les litres distribués des kilomètres parcourus, donc de calculer la consommation par véhicule et de repérer un usage anormal (usage non professionnel, revente de bons, erreurs)." },
        { t: "Augmentation des dépenses non expliquée", d: "+ 38 % (+ 420 000 MAD) sans augmentation du parc : aucun facteur d'activité connu ne l'explique. À vérifier en phase de terrain : évolution du prix du carburant (facteur externe) et du nombre de kilomètres réellement parcourus." },
      ],
      tests: [
        "Rapprocher les bons commandés, les bons distribués et les écritures du registre (rapprochements documentaires).",
        "Constituer un échantillon de bons et rapprocher litres distribués / kilométrage des véhicules (sondage).",
        "Obtenir une confirmation écrite du fournisseur ou de la station-service sur les volumes livrés (circularisation).",
        "Assister à une distribution de bons aux chauffeurs (observation physique) et interroger les chauffeurs (entretiens).",
      ],
      calculs: [
        "Poids du surcoût : 420 000 ÷ 85 000 000 ≈ 0,49 % du budget annuel.",
        "Ordre de grandeur (hypothèse : tout le surcoût vient de la hausse de 38 %) : consommation N-1 ≈ 420 000 ÷ 0,38 ≈ 1 105 000 MAD, consommation N ≈ 1 525 000 MAD. Calcul indicatif, à confirmer par les données comptables.",
      ],
      p: 5,
      i: 4,
      justP:
        "P = 5 : il n'existe aucun contrôle compensatoire et la faiblesse est permanente. Surtout, l'anomalie est déjà visible dans les chiffres (+ 38 % sans hausse du parc) : le risque est quasi certain, voire déjà avéré.",
      justI:
        "I = 4 : surcoût identifié de 420 000 MAD sur un seul poste, susceptible de se renouveler chaque année ; risque de fraude impossible à détecter ; risque juridique pour les gestionnaires et atteinte à la fiabilité des comptes. On ne retient pas 5 car le montant reste limité (≈ 0,5 %) par rapport au budget de 85 M MAD et ne compromet pas la continuité du service.",
      alt: "Une cotation 5 × 3 = 15 (risque élevé) est défendable si l'on pondère l'impact par le poids du montant dans le budget. L'essentiel est la cohérence de l'argumentation.",
      frap: {
        constat:
          "Sur la période auditée, la consommation de carburant de la commune a augmenté de 38 % en un an, soit un surcoût de 420 000 MAD, sans augmentation du parc automobile. Le régisseur des dépenses assure seul la commande des bons de carburant, leur distribution aux chauffeurs et la tenue du registre de suivi. Aucun contrôle du kilométrage des véhicules n'est effectué.",
        cause: [
          "Absence de procédure formalisant la séparation des tâches de commande, de distribution et de suivi du carburant.",
          "Absence de dispositif de suivi du kilométrage (carnets de bord, relevés à chaque remise de bons).",
          "Absence de suivi et d'analyse périodiques des consommations par la hiérarchie.",
        ],
        conseq: [
          "Financière : surcoût de 420 000 MAD non justifié, susceptible de se reproduire chaque année.",
          "Risque de fraude ou de détournement (usage non professionnel, revente de bons) non détectable.",
          "Juridique : dépenses difficiles à justifier lors d'un contrôle ; responsabilité du régisseur et de l'ordonnateur exposée.",
          "Opérationnelle : données de gestion du parc automobile non fiables.",
        ],
        reco: [
          { a: "Répartir les fonctions de commande, de distribution et de tenue/contrôle du registre entre des agents distincts (a minima, confier le contrôle du registre à un agent indépendant du régisseur).", r: "Directeur général des services (ou responsable désigné par le président de la commune)", d: "1 mois" },
          { a: "Instaurer un carnet de bord par véhicule et un relevé du kilométrage à chaque remise de bons, avec rapprochement mensuel litres / kilomètres.", r: "Responsable du parc automobile", d: "2 mois" },
          { a: "Mettre en place un tableau de bord mensuel des consommations par véhicule, avec seuils d'alerte, transmis à la direction.", r: "Directeur général des services", d: "3 mois" },
        ],
      },
    },
  },
  {
    id: "frap2",
    tab: "FRAP 2 · Gestion des subventions",
    title: "FRAP 2 — Gestion des subventions",
    icon: "🤲",
    observation:
      "Sur 15 associations ayant reçu des subventions communales (total : 1,2 million de MAD), 9 n'ont fourni aucun rapport moral ou financier de l'exercice précédent, en violation de la convention de partenariat.",
    facts: [
      { v: "1,2 M MAD", l: "Subventions communales versées" },
      { v: "15", l: "Associations concernées" },
      { v: "9", l: "Associations sans rapport moral ni financier" },
      { v: "85 M MAD", l: "Budget annuel de la commune" },
    ],
    derived: [
      { v: "60 %", l: "Associations sans justificatifs (9 ÷ 15)" },
      { v: "≈ 1,4 %", l: "Poids des subventions dans le budget annuel (1,2 ÷ 85)" },
    ],
    axes: [
      { t: "Absence de rapports moraux et financiers", hint: "Que ne peut-on plus vérifier ? Quelle proportion d'associations est concernée ?" },
      { t: "Non-respect des conventions de partenariat", hint: "Qui a manqué à ses obligations ? La commune a-t-elle exercé son rôle de suivi ?" },
    ],
    corrige: {
      coso: [
        { id: "act", direct: true, why: "Aucune vérification des justificatifs de l'exercice précédent n'a conditionné l'octroi ou le suivi des subventions : le contrôle préalable, procédure concrète, est absent." },
        { id: "info", direct: true, why: "Les rapports moraux et financiers ne circulent pas des associations vers la commune : l'information nécessaire au suivi (financière et opérationnelle) n'est pas disponible." },
        { id: "pil", direct: true, why: "Le non-respect de la convention n'a ni été détecté, ni relancé, ni sanctionné : le suivi de l'exécution des conventions est défaillant." },
        { id: "env", direct: false, why: "La responsabilité du suivi des conventions n'est probablement pas clairement attribuée ; la culture de redevabilité vis-à-vis de l'argent public est insuffisante." },
        { id: "risk", direct: false, why: "Le risque lié aux bénéficiaires de subventions (utilisation non conforme, absence de justification) n'a pas été identifié ni traité." },
      ],
      dys: [
        { t: "Absence de rapports moraux et financiers", d: "9 associations sur 15 (60 %) n'ont fourni aucun rapport moral (activités réalisées) ni financier (emploi des fonds) de l'exercice précédent : la commune ne peut ni vérifier l'utilisation des fonds ni mesurer les résultats obtenus." },
        { t: "Non-respect des conventions de partenariat", d: "La convention impose une obligation de reddition que les 9 associations n'ont pas respectée. Le dysfonctionnement est aussi du côté de la commune, qui n'a pas exigé ni relancé. À vérifier en phase de terrain : de nouvelles subventions ont-elles été versées malgré l'absence de rapports ?" },
        { t: "Absence de suivi et de conséquence", d: "Aucun mécanisme de relance, de suspension ou de recouvrement n'apparaît dans le cas : l'absence de reddition n'entraîne aucune conséquence (point à confirmer par entretiens et examen des conventions)." },
      ],
      tests: [
        "Examiner les 15 conventions de partenariat : obligations de reddition, échéances, clauses applicables en cas de manquement (rapprochements documentaires).",
        "Confronter la liste des subventions versées avec les dossiers de justificatifs reçus (rapprochement).",
        "Interroger les agents chargés du suivi et un échantillon de responsables d'associations (entretiens).",
        "Vérifier le calendrier des versements par rapport à la réception des rapports de l'exercice précédent.",
      ],
      calculs: [
        "9 ÷ 15 = 60 % des associations sans justificatifs ; 6 sur 15 (40 %) en ont fourni.",
        "Poids des subventions : 1,2 M ÷ 85 M ≈ 1,4 % du budget annuel.",
        "Hypothèse pédagogique (le cas ne donne pas les montants par association) : à répartition uniforme, 1,2 M ÷ 15 = 80 000 MAD par association, soit jusqu'à 9 × 80 000 = 720 000 MAD sans justificatifs. À confirmer par les données réelles.",
      ],
      p: 4,
      i: 4,
      justP:
        "P = 4 : le défaut de reddition est déjà avéré pour 60 % des associations et rien n'indique de dispositif de relance ni de sanction. Un emploi non conforme des fonds est donc probable ; on ne retient pas 5 car aucun détournement n'est établi.",
      justI:
        "I = 4 : 1,2 M MAD de fonds publics concernés, avec une part potentiellement importante non justifiée (jusqu'à 720 000 MAD sous l'hypothèse d'une répartition uniforme) ; risque juridique (conventions non respectées), atteinte à la transparence et à l'égalité de traitement entre associations. Pas de 5 : le montant représente environ 1,4 % du budget global.",
      alt: "Une cotation 5 × 3 = 15 (risque élevé) est défendable si l'on considère le défaut de justificatifs comme certain mais d'impact modéré. Toute cotation cohérente et argumentée est acceptable.",
      frap: {
        constat:
          "Sur 15 associations ayant bénéficié de subventions communales pour un montant total de 1,2 million de MAD, 9 (soit 60 %) n'ont fourni aucun rapport moral ou financier de l'exercice précédent, en violation de la convention de partenariat.",
        cause: [
          "Absence de procédure de contrôle préalable (vérification des justificatifs de l'exercice précédent avant tout nouveau versement).",
          "Absence de suivi de l'exécution des conventions : pas d'agent ou de service désigné, pas de calendrier de relance.",
          "Absence de conséquence prévue ou appliquée en cas de manquement (suspension, mise en demeure…), à confirmer en phase de terrain.",
        ],
        conseq: [
          "Financière : impossibilité de s'assurer de l'emploi conforme de fonds publics ; jusqu'à 720 000 MAD potentiellement non justifiés selon l'hypothèse de répartition uniforme.",
          "Juridique : conventions de partenariat non respectées, exposant les gestionnaires en cas de contrôle externe.",
          "Opérationnelle et d'image : impossibilité d'évaluer l'utilité des subventions ; inégalité de traitement entre associations ; atteinte à la transparence.",
        ],
        reco: [
          { a: "Mettre en demeure les 9 associations de produire leurs rapports moral et financier et suspendre tout nouveau versement tant qu'ils ne sont pas fournis.", r: "Président de la commune, via le service en charge des associations", d: "1 mois" },
          { a: "Formaliser une procédure conditionnant tout versement de subvention à la production des rapports de l'exercice précédent (check-list de dossier).", r: "Directeur général des services (ou responsable désigné)", d: "3 mois" },
          { a: "Désigner un agent chargé du suivi des conventions et établir un tableau de bord annuel (rapports reçus / non reçus) transmis au président.", r: "Directeur général des services", d: "3 mois" },
          { a: "Rappeler dans les conventions les conséquences d'un manquement à l'obligation de reddition (sous réserve du cadre juridique applicable).", r: "Service juridique ou responsable désigné", d: "Prochaine campagne de subventions" },
        ],
      },
    },
  },
];
