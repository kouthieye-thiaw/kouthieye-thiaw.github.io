/* Données des projets — modifier ici pour ajouter / corriger un projet.
   cover / images : nom du fichier dans assets/img (sans "-sm" ni ".webp"), ou un fichier .svg ;
   une image peut aussi s'écrire { src, cap } pour avoir une légende */
window.PROJECTS = [
  {
    id: 'tri', featured: true, univers: ['automatisme', 'energie'], cat: 'perso', isNew: 'nouveau · simulation',
    title: 'Ligne de tri par poids — Factory I/O, CODESYS et QElectroTech',
    short: 'Une ligne qui pèse des cartons et les trie en trois classes : programme Ladder structuré en Grafcet, liaison Modbus TCP avec la simulation et schéma électrique complet.',
    year: '2026', frame: 'Projet personnel · automatisme industriel', duration: 'Octobre – novembre 2026', role: 'Seul, de la scène au schéma',
    cover: 'tri-1', alt: 'Scène Factory I/O « Sorting by Weight » : tapis d’entrée, balance, trieur au croisement et trois tapis de sortie',
    film: { src: 'assets/video/tri-montage.mp4', poster: 'assets/video/tri-montage-poster.webp', length: '1 min 20', label: 'La ligne en simulation, la liaison Modbus, le Grafcet, le Ladder et les six folios du schéma. Seuls les passages où tout fonctionne ont été gardés ; les plans marqués ×1,2 sont accélérés.' },
    images: [
      { src: 'tri-1', cap: 'La scène Factory I/O « Sorting by Weight » : tapis d’entrée, balance, trieur et trois tapis de sortie' },
      { src: 'tri-2', cap: 'Mappage Modbus TCP : capteurs en coils 0 à 13, poids en holding register 0, actionneurs en inputs 0 à 10' },
      { src: 'tri-3', cap: 'Grafcet de la ligne : 5 étapes, le cycle revient en X1 après chaque tri' },
      { src: 'tri-4', cap: 'Ladder, réseaux 1 à 4 : Marche par auto-maintien, Raz, voyants Start et Stop' },
      { src: 'tri-5', cap: 'Ladder, réseaux 5 et 6 : classe Moyen et capteur du tapis choisi' },
      { src: 'tri-6', cap: 'Ladder, réseaux 7 à 16 : transitions et désactivations du Grafcet (SET / RESET)' },
      { src: 'tri-7', cap: 'Ladder, réseaux 17 à 19 : pesée de 1 s (TON), comparaisons LT 450 et GT 625' },
      { src: 'tri-8', cap: 'Ladder, réseaux 20 à 24 : admission d’un seul carton par la barrière d’entrée' },
      { src: 'tri-9', cap: 'Ladder, réseaux 25 à 33 : tapis KM1 à KM5 et trieur YV1 à YV3' },
      { src: 'tri-10', cap: 'Ladder, réseaux 34 à 37 : compteurs CTU et afficheur de poids' }
    ],
    schema: {
      title: 'Schéma électrique · 6 folios QElectroTech',
      note: 'Dessiné pour un vrai automate Schneider M241 (TM241CE24R) : puissance, alimentation 24 V, entrées, sorties et chaîne de sécurité. Cliquez sur un folio pour l’agrandir.',
      folios: [
        { src: 'tri-11', cap: 'Folio 1 · puissance : 5 départs moteur directs (sectionneur-fusible, KM1 à KM5, relais thermiques F1 à F5), moteurs couplés en étoile, disjoncteur Q4 vers la commande' },
        { src: 'tri-12', cap: 'Folio 2 · alimentation G1 230 V AC → 24 V DC et automate Schneider M241 (TM241CE24R)' },
        { src: 'tri-13', cap: 'Folio 3 · entrées I0 à I7 : arrêt d’urgence et Stop en NF, Start, Reset, sélecteur, capteurs PNP 3 fils' },
        { src: 'tri-14', cap: 'Folio 4 · entrées I8 à I13 : six capteurs PNP 3 fils' },
        { src: 'tri-15', cap: 'Folio 5 · sorties relais : arrêt d’urgence et contacts des relais thermiques F1 à F5 en série, puis bobines KM1 à KM5 et voyant H1' },
        { src: 'tri-16', cap: 'Folio 6 · sorties transistor protégées par un fusible : trieur YV1 à YV3 et voyant H2' }
      ]
    },
    figures: [
      { v: 5, u: '', l: 'étapes de Grafcet, un seul carton traité à la fois' },
      { v: 37, u: '', l: 'réseaux Ladder dans le programme final' },
      { v: 6, u: '', l: 'folios de schéma électrique sous QElectroTech' }
    ],
    context: 'Un projet personnel pour me former à l’automatisme industriel. Dans la scène Factory I/O « Sorting by Weight », un tapis amène des cartons de 8, 10 et 15 kg sur une balance (signal 0–10 V), puis un trieur à roues escamotables les envoie à gauche, à droite ou tout droit. La ligne est une simulation ; le schéma électrique, lui, est pensé pour un vrai automate Schneider M241.',
    missions: [
      'Relier CODESYS V3.5 SP22 (Control Win, serveur) à Factory I/O (client) en Modbus TCP : capteurs en coils, poids mis à l’échelle ×100 dans un registre, actionneurs en entrées',
      'Structurer le programme en Grafcet à 5 étapes avec des bobines SET / RESET : attente, chargement d’un seul carton, pesée, transfert, dégagement',
      'Programmer en Ladder la marche par auto-maintien, l’arrêt, l’arrêt d’urgence, le Reset et les voyants Start et Stop',
      'Stabiliser la pesée par une temporisation TON de 1 s, puis classer le carton : petit sous 450, grand au-dessus de 625, moyen entre les deux',
      'N’admettre qu’un carton à la fois par la barrière d’entrée (mémoires Vu et Passe, dégagement de 0,5 s)',
      'Commander les tapis KM1 à KM5 et le trieur YV1 à YV3, compter les cartons de chaque classe avec trois CTU et afficher le poids',
      'Dessiner le schéma sous QElectroTech : 5 départs moteur en démarrage direct, alimentation 230 V AC → 24 V DC, automate TM241CE24R, entrées PNP et barrières réflex NF, sorties relais et transistor, chaîne de sécurité'
    ],
    learned: [
      { pb: 'La liaison Modbus ne passait pas', fix: 'Passerelle non configurée, carte réseau à 0.0.0.0, tailles des zones Modbus : résolu pas à pas.' },
      { pb: 'L’auto-maintien ne tenait pas', fix: 'J’ai compris la différence entre le bouton, qui ne donne qu’une impulsion, et la mémoire Marche.' },
      { pb: 'Le poids, instable, était lu trop tôt', fix: 'Une temporisation TON de 1 s avant la lecture.' },
      { pb: 'Deux cartons se retrouvaient sur le trieur', fix: 'Un Grafcet qui ne traite qu’un carton à la fois, et une seule admission par la barrière d’entrée.' },
      { pb: 'Les gros cartons déclenchaient plusieurs capteurs', fix: 'Seul le capteur du tapis choisi est pris en compte.' },
      { pb: 'Une barrière réflex était lue à l’envers', fix: 'J’ai vérifié sa polarité réelle en ligne, puis corrigé le programme.' },
      { pb: 'Le tri à gauche et à droite restait bloqué', fix: 'La balance continue d’avancer pendant le dégagement.' },
      { pb: 'Des erreurs de câblage dans le schéma', fix: 'Courts-circuits entre phases et entre + et 0 V, COM des sorties côté 0 V, fusible en parallèle : tous trouvés et corrigés.' }
    ],
    skills: ['Ladder', 'Grafcet SET / RESET', 'Modbus TCP', 'Temporisations et compteurs', 'Schéma électrique', 'Mise au point en ligne'],
    tools: ['CODESYS V3.5 SP22', 'Factory I/O', 'QElectroTech', 'Schneider M241 · TM241CE24R'],
    docs: []
  },
  {
    id: 'exail', featured: true, univers: ['energie', 'electronique'], cat: 'elec',
    title: 'Stage — Exail Quantum Systems',
    short: 'Sept alimentations bas bruit « Bornus » produites et un synthétiseur de fréquence AOM à base de DDS intégré, testé et livré.',
    year: '2026', frame: 'Stage · Exail, Gradignan', duration: '7 avril – 12 juin 2026 · 10 semaines', role: 'Stagiaire en intégration électronique',
    cover: 'exail-1', alt: 'Baie électronique Exail réalisée pendant le stage',
    images: ['exail-1', 'exail-13', 'exail-14', 'exail-5', 'exail-4', 'exail-15', 'exail-16', 'exail-7', 'exail-17', 'exail-3', 'exail-18', 'exail-19', 'exail-20', 'exail-21', 'exail-22', 'exail-9', 'exail-12', 'exail-11', 'exail-10', 'exail-2', 'exail-6', 'exail-8', 'attestation-exail'],
    figures: [
      { v: 7, u: '', l: 'alimentations Bornus produites et validées' },
      { v: 18, p: '±', u: 'V', l: 'et ±6 V bas bruit, depuis le secteur 230 V' },
      { v: 4, u: '', l: 'sorties RF du synthétiseur AOM' },
      { v: 110, u: 'MHz', l: 'mesurés à −5,9 dBm à l’analyseur de spectre' }
    ],
    context: 'Dix semaines au pôle production d’Exail Quantum Systems, à Gradignan, qui conçoit des gravimètres quantiques à atomes froids. Les lasers de ces instruments exigent des alimentations très bien filtrées et des sources RF précises : j’ai intégré, testé et livré deux systèmes destinés aux bancs de test internes.',
    missions: [
      'Produire sept alimentations « Bornus » : filtre CEM et interrupteur secteur, alimentation à découpage Vox Power 600 W réglée à +18, −18, +6 et −6 V, carte filtre en π (CLC) pour le bas bruit',
      'Dimensionner la protection et le refroidissement : fusible 4 A (600 W / 230 V ≈ 2,6 A) et ventilateur 47 m³/h, soit un échauffement de l’air d’environ 3,8 °C',
      'Assembler la mécanique d’après le plan 3D (eDrawings) : frein-filet, serrage au couple, câblage d’après le plan Excel et câble management',
      'Vérifier chaque tension au multimètre selon la procédure, puis apposer l’étiquette de validation et la traçabilité (version, trigramme KTH, date)',
      'Intégrer le synthétiseur de fréquence AOM : carte séquenceur à DDS AD9959 (DAC 10 bits) pilotée en SPI par une Raspberry Pi 3B+, carte quartz 100 MHz, carte de distribution +6 V protégée par diodes Schottky',
      'Tester le synthétiseur : consommation (< 0,6 A), communication réseau en Telnet, puissance des 4 sorties RF (AOM0, AOM1, Cooler, Repumper) à l’analyseur de spectre, GPIO',
      'Assembler la mécanique et l’alimentation d’une RLS, l’un des systèmes laser d’Exail'
    ],
    skills: ['Intégration électronique', 'Lecture de plans 3D', 'Câble management', 'Procédures de test', 'RF', 'Traçabilité', 'Rigueur en production'],
    tools: ['DDS', 'Raspberry Pi', 'SPI', 'Telnet', 'Analyseur de spectre', 'Multimètre', 'eDrawings', 'Clé dynamométrique'],
    docs: [
      { label: 'Rapport de stage (PDF)', href: 'assets/pdf/rapport-stage-exail.pdf' },
      { label: 'Attestation de fin de stage', href: 'assets/pdf/attestation-stage-exail.pdf' }
    ]
  },
  {
    id: 'linfan', featured: true, univers: [], cat: 'perso',
    title: 'Linfan — mon IA privée, 100 % locale',
    short: 'Un assistant IA qui tourne entièrement sur mon PC : modèle Qwen 3.6 35B, mémoire longue, et des outils pour lire, chercher et ranger mes fichiers.',
    year: '2026', frame: 'Projet personnel', duration: 'Octobre 2026', role: 'Conception, configuration et interface',
    cover: 'ia-1', coverFit: 'contain', alt: 'Accueil de Linfan : « Salut Kouthieye ! », suggestions et zone de saisie',
    images: ['ia-1', 'ia-2', 'ia-3', 'ia-4', 'ia-5'],
    figures: [
      { v: 35, u: 'Md', l: 'de paramètres : le modèle Qwen 3.6, exécuté en local avec Ollama' },
      { v: 0, u: '', l: 'donnée envoyée en ligne : tout reste sur le PC' },
      { v: 62, u: 'Go', l: 'de RAM sur le portable qui fait tourner le modèle' }
    ],
    context: 'En dehors de l’IUT, je m’intéresse aux nouvelles technologies et à la façon d’y appliquer l’IA. Je voulais un assistant qui m’aide vraiment au quotidien (cours, électronique, candidatures, documents) sans envoyer mes données personnelles sur les serveurs d’un service en ligne. D’où Linfan : une IA qui tourne entièrement sur mon ordinateur, que j’ai choisie, configurée et dotée de sa propre interface pour qu’elle travaille pour moi.',
    missions: [
      'Choisir le modèle : Qwen 3.6 35B, assez puissant pour raisonner, expliquer un circuit ou rédiger en français, tout en tenant dans la mémoire de mon PC',
      'L’installer et le servir en local avec Ollama, accessible uniquement depuis la machine (127.0.0.1)',
      'Écrire ses consignes : répondre en français, ne jamais rien envoyer en ligne, ne jamais supprimer un fichier (corbeille à la place), demander confirmation avant toute action importante, ne jamais inventer un chiffre',
      'Lui donner une mémoire longue : « retiens que… » ajoute une ligne datée dans un fichier de mémoire, « résume la conversation » écrit un journal',
      'Développer son interface en Python, sans dépendance : conversations, mode réflexion, pièces jointes PDF et Word, lancement comme une application avec la commande linfan',
      'Lui donner des outils : chercher un fichier dans un index du disque (SQLite), lire un document, regarder une image, proposer un plan de rangement que je valide',
      'Ajouter des missions autonomes : de gros chantiers (ranger tout un dossier) qu’elle mène seule, avec un journal pour tout annuler',
      'Brancher aussi un mode agent (OpenCode) sur le même modèle, avec une permission à valider pour chaque modification'
    ],
    skills: ['IA générative', 'LLM en local', 'Prompt système', 'Python', 'Conception d’interface', 'Protection des données', 'Autonomie'],
    tools: ['Ollama', 'Qwen 3.6 35B', 'Python', 'SQLite', 'OpenCode', 'HTML / CSS / JavaScript', 'Linux'],
    docs: []
  },
  {
    id: 'sql', featured: false, univers: ['automatisme'], cat: 'data', isNew: true,
    title: 'Base de données Northwind — SQL & Python',
    short: 'Administrer une base MySQL, écrire requêtes et vues, puis les exploiter dans un script Python.',
    year: '2026', frame: 'BUT 3 · Ressource Base de données', duration: 'TP, séances 1 à 5', role: 'Travail individuel',
    cover: 'sql.svg', alt: 'Schéma relationnel de la base Northwind',
    images: ['sql.svg'],
    terminal: true,
    figures: [
      { v: 77, u: '', l: 'produits dans la base' },
      { v: 8, u: '', l: 'catégories analysées' },
      { v: 518, u: '', l: 'lignes dans la vue v_stat_produit' }
    ],
    context: 'Série de TP sur un serveur MariaDB / MySQL (Debian, accès SSH) : création et administration d’une base, puis analyse rétroactive de Northwind, la modélisation d’une centrale d’achat où des clients passent des commandes.',
    missions: [
      'Créer une base et attribuer les droits d’un utilisateur (CREATE DATABASE, GRANT)',
      'Tester l’intégrité : clés primaires et clés étrangères',
      'Importer des fichiers CSV, sauvegarder et restaurer la base avec mysqldump',
      'Retrouver le modèle de Northwind par ingénierie inverse (concepteur phpMyAdmin)',
      'Écrire des requêtes : jointures, GROUP BY, COUNT / MIN / MAX, DATE_FORMAT, LIMIT',
      'Créer les vues v_stat_produit et v_stat_annee (chiffre d’affaires par produit et par année)',
      'Développer un menu console en Python (mysql.connector) : catégories, recherche LIKE, statistiques de ventes',
      'Construire un tableau croisé dynamique à partir d’un export CSV'
    ],
    skills: ['Modélisation relationnelle', 'Requêtes SQL', 'Vues', 'Scripts Python', 'Administration'],
    tools: ['MySQL / MariaDB', 'phpMyAdmin', 'Python', 'mysql.connector', 'SSH · Debian'],
    docs: []
  },
  {
    id: 'radio', featured: true, univers: ['electronique'], cat: 'rf',
    title: 'Radiogoniométrie — antenne HB9CV',
    short: 'Une antenne directionnelle accordée à 144 MHz pour une chasse au renard sur le campus.',
    year: '2026', frame: 'SAÉ4 · GEII ESE', duration: 'Mars 2026', role: 'Projet en équipe',
    cover: 'radio-1', alt: 'Antenne HB9CV 144 MHz posée sur une table, tablette SDR au premier plan',
    images: ['radio-1', 'radio-2'],
    figures: [
      { v: 144, u: 'MHz', l: 'fréquence de résonance' }
    ],
    context: 'Lors d’un événement organisé par l’IUT de Bordeaux, chaque groupe a construit son antenne pour une compétition de « chasse au renard » : retrouver des balises radio cachées sur le campus grâce à la radiogoniométrie.',
    missions: [
      'Construire une antenne HB9CV résonnant à 144 MHz',
      'Ajuster l’adaptation d’impédance à l’aide de l’abaque de Smith',
      'Mesurer et valider l’antenne au VNA',
      'Localiser les balises avec une radio logicielle (SDR) et GNU Radio'
    ],
    skills: ['Construction mécanique', 'Abaque de Smith', 'Adaptation d’impédance', 'Radiogoniométrie'],
    tools: ['VNA', 'SDR', 'GNU Radio'],
    docs: []
  },
  {
    id: 'modulation', featured: true, univers: ['electronique'], cat: 'rf',
    title: 'Modulation d’amplitude — du GBF au spectre',
    short: 'Moduler une porteuse, lire son enveloppe à l’oscilloscope puis ses raies latérales en FFT.',
    year: '2026', frame: 'TP · IUT de Bordeaux', duration: 'Mars 2026', role: 'Travaux pratiques',
    cover: 'mod-1', alt: 'Oscilloscope Keysight : signal modulant en vert et signal modulé en amplitude en jaune',
    images: ['mod-1', 'mod-2'],
    videos: [
      { src: 'assets/video/mod-banc.mp4', poster: 'assets/video/mod-banc-poster.webp', step: '01', tag: 'banc', label: 'Le banc : GBF, alimentations et oscilloscope' },
      { src: 'assets/video/mod-fft.mp4', poster: 'assets/video/mod-fft-poster.webp', step: '02', tag: 'FFT', label: 'Le spectre : porteuse et raies latérales' }
    ],
    videosNote: 'Filmé en TP le 6 mars 2026 : réglage des signaux au GBF, puis lecture du spectre en FFT, où les raies latérales s’écartent de la porteuse quand la fréquence du signal modulant augmente.',
    figures: [
      { v: 3, u: '', l: 'raies dans le spectre : la porteuse et ses deux bandes latérales' }
    ],
    context: 'En TP, j’ai réalisé et caractérisé une modulation d’amplitude : un signal modulant basse fréquence fait varier l’amplitude d’une porteuse. Le but est de relier ce que l’on voit dans le domaine temporel, l’enveloppe, à ce que l’on mesure dans le domaine fréquentiel, la porteuse entourée de ses raies latérales.',
    missions: [
      'Générer la porteuse et le signal modulant au générateur de fonctions (GBF)',
      'Câbler le modulateur sur plaque d’essai, alimenté par les alimentations de laboratoire',
      'Afficher à l’oscilloscope le signal modulant et le signal modulé : l’enveloppe reproduit le message',
      'Mesurer l’enveloppe aux curseurs pour évaluer le taux de modulation',
      'Passer en FFT sur l’oscilloscope : repérer la porteuse et les raies latérales à fc ± fm, puis suivre leur écart quand fm varie'
    ],
    skills: ['Modulation d’amplitude', 'Analyse spectrale (FFT)', 'Mesure à l’oscilloscope', 'Montage sur plaque d’essai'],
    tools: ['Oscilloscope Keysight DSOX1202A', 'GBF', 'Alimentations de laboratoire', 'Multimètre'],
    docs: []
  },
  {
    id: 'vna', featured: false, univers: ['electronique'], cat: 'rf',
    title: 'Datasheet RF — diviseur de Wilkinson',
    short: 'Caractériser au VNA un composant RF inconnu, puis en rédiger la datasheet.',
    year: '2026', frame: 'Électronique RF · BUT 2', duration: 'Mars 2026', role: 'Binôme avec Dionísio Hebo',
    cover: 'vna-1', alt: 'Diviseur de Wilkinson en technologie microruban dans son boîtier',
    images: ['vna-1', 'vna-2', 'vna-3', 'vna-4', 'vna-5', 'vna-6'],
    figures: [
      { v: -3.56, d: 2, u: 'dB', l: 'S21 mesuré au VNA' },
      { v: 1.3, d: 1, u: 'GHz', l: 'borne haute de la bande (300 kHz – 1,3 GHz)' },
      { v: 50, u: 'Ω', l: 'impédance nominale sur les trois ports' }
    ],
    context: 'Sans information préalable, nous avons caractérisé plusieurs dispositifs RF (atténuateur 3 dB, diviseur de Wilkinson, filtre passe-bas) à l’analyseur de réseau vectoriel, puis rédigé la datasheet complète du diviseur de Wilkinson.',
    missions: [
      'Calibrer le VNA avec la procédure SOLT (Short, Open, Load, Thru)',
      'Mesurer les paramètres S et l’impédance sur l’abaque de Smith',
      'Simuler le circuit microruban sous Usimics et comparer mesure et simulation',
      'Rédiger une datasheet technique et un compte rendu de 12 pages'
    ],
    skills: ['Paramètres S', 'Abaque de Smith', 'Lignes λ/4 microruban', 'Rédaction technique'],
    tools: ['VNA', 'Usimics', 'Kit de calibration SOLT'],
    docs: [
      { label: 'Datasheet — diviseur de Wilkinson', href: 'assets/pdf/datasheet-wilkinson.pdf' },
      { label: 'Compte rendu VNA', href: 'assets/pdf/compte-rendu-vna.pdf' }
    ]
  },
  {
    id: 'coffre', featured: false, univers: ['electronique'], cat: 'rf',
    title: 'Coffre-fort — analyse & rejeu de signal',
    short: 'Intercepter, démoduler et reconstituer la trame d’une clé électronique.',
    year: '2026', frame: 'Sécurité embarquée · BUT 2', duration: 'Mars 2026', role: 'Projet en équipe',
    cover: 'coffre-1', alt: 'Coffre-fort de laboratoire ouvert à côté d’une HackRF One',
    images: ['coffre-1', 'coffre-2', 'coffre-3', 'coffre-4'],
    figures: [],
    context: 'Étude de la sécurité d’un coffre-fort de laboratoire : en analysant le signal radio émis par sa clé électronique, nous avons démontré qu’il était possible de le reproduire pour déclencher l’ouverture.',
    missions: [
      'Capter le signal de la clé avec une radio logicielle (HackRF One)',
      'Observer le spectre à l’analyseur de spectre',
      'Démoduler, isoler et analyser la trame émise',
      'Reconstituer la trame à l’identique et la renvoyer pour déverrouiller le coffre'
    ],
    skills: ['Modulation / démodulation', 'Analyse de trame', 'Sécurité embarquée', 'Traitement du signal'],
    tools: ['HackRF One', 'Analyseur de spectre R&S FSP'],
    docs: []
  },
  {
    id: 'geo', featured: false, univers: ['electronique'], cat: 'embed',
    title: 'Géolocalisation — distance entre cartes',
    short: 'Une communication client / serveur entre cartes pour mesurer la distance qui les sépare.',
    year: '2026', frame: 'Systèmes communicants · BUT 2', duration: 'Mars 2026', role: 'Projet en équipe',
    cover: 'geo-1', alt: 'Deux cartes électroniques séparées par un mètre ruban',
    images: ['geo-1', 'geo-2', 'geo-3'],
    figures: [],
    context: 'Développement d’un système de suivi et de géolocalisation en temps réel, validé au mètre ruban sur la paillasse.',
    missions: [
      'Mettre en place une communication client / serveur entre cartes STM32',
      'Déterminer précisément la distance qui sépare les cartes',
      'Intégrer des modules GPS et transmettre les données',
      'Visualiser les coordonnées sur une interface cartographique'
    ],
    skills: ['Systèmes communicants', 'IoT', 'Validation expérimentale'],
    tools: ['STM32', 'GPS', 'Client / serveur'],
    docs: []
  },
  {
    id: 'drone', featured: true, univers: ['automatisme', 'electronique'], cat: 'auto',
    title: 'Drone Parrot — modélisation & PID',
    short: 'Identifier la dynamique d’un drone, régler ses correcteurs PID et le piloter via son jumeau numérique.',
    year: '2025', frame: 'AOP S3 · GEII ESE', duration: 'Semestre 3 · BUT 2', role: 'Compte rendu individuel · groupe B1',
    cover: 'drone.svg', alt: 'Schéma du drone, de sa réponse indicielle et de sa boucle PID',
    images: ['drone.svg', 'drone-1', 'drone-2', 'drone-3', 'drone-4', 'drone-5', 'drone-6', 'drone-7', 'drone-8'],
    figures: [
      { v: 0.7, d: 1, u: 's', l: 'retard pur identifié (Wi-Fi + motorisation)' },
      { v: 70, u: 'ms', l: 'période d’échantillonnage du correcteur numérique' },
      { v: 2.94, d: 2, u: 's', l: 'constante de temps de l’axe roll' }
    ],
    context: 'AOP du semestre 3 sur le drone Parrot Bebop 2, dans une transition vers le Parrot Anafi : modéliser sa dynamique, synthétiser ses correcteurs et exploiter l’hyperréalité, c’est-à-dire la synchronisation permanente entre le drone réel et son jumeau numérique 3D.',
    missions: [
      'Réaliser des essais indiciels en boucle ouverte (échelon de commande) et exporter les mesures en CSV',
      'Identifier les axes pitch et roll sous MATLAB : tfest, modèle « boîte noire » à 6 pôles et 4 zéros, retard pur de 0,7 s',
      'Corriger l’offset initial des mesures et calculer gain statique et constante de temps (roll : K = 61,23 ; τ = 2,94 s)',
      'Calculer les correcteurs PID avec pidtune puis les discrétiser (c2d) à la période de 70 ms',
      'Analyser l’architecture réseau en Python : serveur UDP (port 22000) et serveur TCP multithread',
      'Proposer des évolutions de l’hyperréalité : champs de potentiel, retour de force, commande prédictive (MPC)'
    ],
    skills: ['Identification de systèmes', 'Correcteur PID', 'Discrétisation', 'Réseaux UDP / TCP', 'Jumeau numérique'],
    tools: ['MATLAB', 'Python', 'Parrot Bebop 2 / Anafi', 'Supervision Visual Basic'],
    docs: [
      { label: 'Compte rendu AOP drones', href: 'assets/pdf/compte-rendu-aop-drones.pdf' }
    ]
  },
  {
    id: 'identif', featured: false, univers: ['automatisme', 'energie'], cat: 'auto',
    title: 'Identification de systèmes — thermique et moteur CC',
    short: 'Passer du système réel à son modèle : un système thermique et un moteur à courant continu identifiés au premier ordre.',
    year: '2025', frame: 'BUT 2 · S3 · automatique, TP1 et TP2', duration: 'Décembre 2025', role: 'Binôme avec Joris Coppi',
    cover: 'identif-1', alt: 'Banc du moteur à courant continu : moteur, génératrice tachymétrique et carte de commande',
    images: ['identif-1', 'identif-2', 'identif-3', 'identif-4', 'identif-5', 'identif-6', 'identif-7'],
    figures: [
      { v: 132.1, d: 1, u: 's', l: 'constante de temps du système thermique (K = 0,54)' },
      { v: 29.2, d: 1, u: 'ms', l: 'constante de temps du moteur CC, par la réponse indicielle' },
      { v: 3, u: 'Hz', l: 'fréquence de coupure du moteur relevée au diagramme de Bode' }
    ],
    context: 'Deux TP pour passer du système physique à son modèle mathématique : un système thermique piloté par Arduino, puis un moteur à courant continu identifié en « boîte noire ». Dans les deux cas, un premier ordre H(p) = K / (1 + τp), dont on extrait K et τ par la mesure, avant de dimensionner une commande.',
    missions: [
      'Relever la réponse indicielle du système thermique sur l’interface Arduino, puis calculer K = 0,54 et τ = 132,1 s par la méthode des 63 %',
      'Tracer son diagramme de Bode sous Matlab et établir son schéma bloc',
      'Commander en boucle ouverte (consigne 40 °C), puis observer l’effet d’une perturbation au ventilateur',
      'Passer en boucle fermée en ajoutant le calcul de l’erreur dans le programme : la perturbation est compensée',
      'Identifier le moteur CC par un échelon de rapport cyclique de 20 % à 40 % : cinq acquisitions moyennées sous Matlab, modèle validé avec lsim (K = 10,44 ; τ = 29,2 ms)',
      'L’identifier aussi en fréquentiel, de 0,2 à 33,7 Hz : gain ≈ 32,5 dB, coupure ≈ 3 Hz, τ ≈ 53 ms',
      'Expliquer l’écart entre les deux méthodes par les frottements secs, et retenir le modèle temporel pour l’asservissement'
    ],
    skills: ['Identification de systèmes', 'Réponse indicielle', 'Diagramme de Bode', 'Boucle ouverte et fermée', 'Transformée de Laplace'],
    tools: ['Matlab', 'Arduino', 'Génératrice tachymétrique', 'Schémas blocs'],
    docs: [
      { label: 'Compte rendu S3 (PDF)', href: 'assets/pdf/cr-automatique-s3.pdf' }
    ]
  },
  {
    id: 'regul', featured: true, univers: ['automatisme', 'electronique'], cat: 'auto',
    title: 'Régulation P et PI — moteur sur STM32 et système thermique',
    short: 'Dimensionner un correcteur sous Matlab, le coder en C sur STM32 et annuler l’erreur statique grâce à l’action intégrale.',
    year: '2026', frame: 'BUT 2 · S4 · automatique, TP1 et TP2', duration: 'Février 2026', role: 'Binôme avec Joris Coppi',
    cover: 'regul-3', coverFit: 'contain', alt: 'Relevé de vitesse du moteur et de sa commande sur l’interface de la carte STM32',
    images: ['regul-3', 'regul-2', 'regul-4', 'regul-5', 'regul-6', 'regul-1', 'regul-7', 'regul-8', 'regul-9', 'regul-10', 'regul-11'],
    figures: [
      { v: 270, u: 'pas', l: 'erreur statique avec un simple correcteur P (C0 = 0,2), annulée par le PI' },
      { v: 80, u: '°', l: 'marge de phase imposée au PI du moteur, à 90 rad/s' },
      { v: 3, u: '', l: 'correcteurs PI calculés et testés sur le système thermique' }
    ],
    context: 'Suite de l’identification : le moteur, modélisé par H(p) = 32 / (1 + 0,02p), doit suivre une consigne de vitesse, et c’est sa carte STM32 qui calcule la commande PWM. Un second TP compare correcteurs P et PI sur le système thermique, de la théorie à l’essai réel.',
    missions: [
      'Établir la fonction de transfert en boucle fermée (théorème de Mason) et étudier l’effet du gain C0 sous Matlab',
      'Montrer qu’un temps de montée de 1 µs exigerait C0 ≈ 1875 et saturerait le hacheur : objectif physiquement impossible',
      'Avec C0 = 0,2, calculer puis mesurer l’erreur statique : environ 270 pas pour une consigne de 2000',
      'Dimensionner un correcteur PI (ωc = 90 rad/s, marge de phase 80°) et le valider sur le diagramme de Nichols',
      'Discrétiser le PI par Euler en une récurrence u(k) = u(k−1) + C0i(1 + Te/Ti)ε(k) − C0i·ε(k−1), puis la coder en C dans l’interruption périodique du STM32',
      'Vérifier sur le banc que la vitesse tient la consigne et rejette un freinage, puis confirmer sous Simulink',
      'Sur le système thermique : correcteur P (temps de réponse 28 s, erreur 1,7 °C), puis trois PI comparés selon la marge de phase (60° ou 30°) et ωu'
    ],
    skills: ['Correcteurs P et PI', 'Théorème de la valeur finale', 'Diagramme de Nichols', 'Discrétisation', 'Commande numérique'],
    tools: ['Matlab', 'Simulink', 'STM32', 'Langage C', 'Arduino'],
    docs: [
      { label: 'Compte rendu S4 (PDF)', href: 'assets/pdf/cr-automatique-s4.pdf' }
    ]
  },
  {
    id: 'banc', featured: true, univers: ['automatisme', 'electronique'], cat: 'auto',
    title: 'Banc de mesure automatisé sous Python',
    short: 'Piloter un générateur et un multimètre en Python pour tracer seul la caractéristique I = f(U) d’une diode.',
    year: '2026', frame: 'BUT 2 · S3 · informatique de spécialité', duration: 'Janvier 2026 · 3 séances', role: 'Binôme avec Louison Prevost-Bonnefille',
    cover: 'banc-1', alt: 'Banc de mesure : générateur Siglent, multimètre Keysight et montage de la diode sur sa platine',
    images: ['banc-1', 'banc-2', 'banc-6', 'banc-5', 'banc-3', 'banc-4'],
    videos: [
      { src: 'assets/video/banc-balayage.mp4', poster: 'assets/video/banc-balayage-poster.webp', step: '06', tag: 'balayage', label: 'Le balayage en direct, accéléré ×2' }
    ],
    videosNote: 'Le script fait monter la tension du générateur pas à pas ; à chaque palier, le multimètre relève le courant. Quasi nul au départ, il grimpe brusquement une fois le seuil de la diode franchi.',
    figures: [
      { v: 20, u: '', l: 'points de mesure de 0 à 1 V, sans intervention manuelle' },
      { v: 0.6, d: 1, u: 'V', l: 'tension de seuil relevée sur la diode au silicium' },
      { v: 470, u: 'Ω', l: 'résistance de protection en série avec la diode' }
    ],
    context: 'En informatique de spécialité, nous avons automatisé un banc de mesure : un script Python pilote par USB un générateur Siglent SDG1032X et un multimètre Keysight 34460A, puis relève et trace la caractéristique courant-tension d’une diode. Deux marques d’appareils, un seul programme.',
    missions: [
      'Identifier les instruments et lire leurs datasheets pour connaître leurs commandes',
      'Vérifier la liaison USB et l’IDN de chaque appareil avec Keysight Interactive IO',
      'Lister les ressources VISA en Python avec pyvisa (ResourceManager, list_resources)',
      'Câbler le montage : diode et résistance de 470 Ω, multimètre en ampèremètre puis en voltmètre, générateur en tension continue (DC offset)',
      'Valider la communication par une mesure ponctuelle en SCPI (MEAS:VOLT:DC?, MEAS:CURR:DC?)',
      'Automatiser un balayage de 0 à 1 V en 20 points, puis tracer I = f(U) avec numpy et matplotlib',
      'Analyser la courbe : courant quasi nul jusqu’à 0,6 V, puis croissance exponentielle ; corriger la polarité du courant mesuré'
    ],
    skills: ['Automatisation de mesures', 'Commandes SCPI', 'Python', 'Instrumentation', 'Caractérisation de composants'],
    tools: ['Python', 'pyvisa', 'numpy', 'matplotlib', 'VS Code', 'Keysight Interactive IO', 'Multimètre Keysight 34460A', 'GBF Siglent SDG1032X'],
    docs: [
      { label: 'Compte rendu (PDF)', href: 'assets/pdf/compte-rendu-banc-python.pdf' }
    ]
  },
  {
    id: 'sumo', featured: false, univers: ['electronique'], cat: 'embed',
    title: 'Robot Sumo autonome',
    short: 'Concevoir de zéro un robot de combat à partir d’un cahier des charges.',
    year: '2025', frame: 'SAÉ3 · GEII ESE', duration: 'BUT 2 · 2025 – 2026', role: 'Projet en équipe',
    cover: 'sumo-2', alt: 'Prototype du robot sumo branché sur sa platine d’essai',
    images: ['sumo-2', 'sumo-3'],
    figures: [],
    context: 'Projet de deuxième année : concevoir un robot sumo à partir de zéro, dans le respect d’un cahier des charges, pour affronter les robots des autres équipes sur le dohyo.',
    missions: [
      'Analyser le cahier des charges et sélectionner les composants (fiches techniques)',
      'Programmer le robot en C++ sur Arduino',
      'Détecter l’adversaire avec des capteurs à ultrasons',
      'Router la carte de puissance (pont en H) sous KiCad',
      'Concevoir le châssis en impression 3D'
    ],
    skills: ['Travail d’équipe', 'Recherche documentaire', 'Esprit de synthèse'],
    tools: ['Arduino', 'C++', 'KiCad', 'Impression 3D'],
    docs: []
  },
  {
    id: 'stm32', featured: false, univers: ['electronique'], cat: 'embed',
    title: 'Traitement du signal audio sur STM32',
    short: 'Une chaîne audio temps réel en C sur STM32F4 : échantillonnage à 44,1 kHz, volume, écho et notes de musique, sous interruptions et DMA.',
    year: '2025', frame: 'BUT 2 · S3 · systèmes embarqués', duration: 'Novembre 2025', role: 'Binôme avec Dionísio Hebo',
    cover: 'stm32-1', alt: 'Carte STM32 reliée à un smartphone qui enregistre le signal sonore',
    images: ['stm32-1', 'stm32-2', 'stm32-3'],
    figures: [
      { v: 44.1, d: 1, u: 'kHz', l: 'fréquence d’échantillonnage tenue par le Timer 4 sous interruption' },
      { v: 440, u: 'Hz', l: 'premier signal carré produit par le DAC, entre 1 et 2 V' },
      { v: 8, u: 'notes', l: 'de do à do, choisies au bouton, en carré ou en dents de scie' }
    ],
    context: 'Module de traitement du signal audio sur cible embarquée : une carte du département GEII construite autour d’un STM32F4, avec entrées jack, micro et GBF, sortie DAC, écran OLED et boutons. Objectif : acquérir un son, le traiter et le restituer en temps réel.',
    missions: [
      'Cadencer l’échantillonnage à 44,1 kHz avec le Timer 4 sous interruption, vérifié à l’oscilloscope',
      'Choisir l’entrée audio (jack, micro, GBF) par un bouton en interruption externe',
      'Lancer à chaque période 4 conversions de l’ADC par DMA, appliquer le volume et restituer le son au DAC',
      'Afficher volume et potentiomètres sur l’écran OLED depuis la boucle principale, sans perturber le son',
      'Créer un effet d’écho avec un tampon de 44 100 échantillons, à paramètres fixes puis réglés aux potentiomètres',
      'Générer un carré de 440 Hz, puis les notes de do à do en carré ou en dents de scie'
    ],
    learned: [
      { pb: 'Le son ne devait pas craquer pendant l’affichage', fix: 'Le traitement tourne dans les interruptions, l’écran se met à jour dans la boucle principale.' },
      { pb: 'Le retard de l’écho n’est pas devenu réglable, et le filtrage numérique n’a pas été terminé', fix: 'Le compte rendu le dit franchement : ce sont les deux points à reprendre.' }
    ],
    skills: ['Langage C', 'Interruptions et timers', 'ADC, DAC et DMA', 'Traitement numérique du signal'],
    tools: ['STM32F4', 'STM32CubeMX', 'HAL', 'Écran OLED SSD1306', 'Oscilloscope'],
    docs: [
      { label: 'Compte rendu (Google Drive)', href: 'https://drive.google.com/file/d/1h6_qheif3mEM6mqWYxK-5iC8rhYxPU5z/view' }
    ]
  },
  {
    id: 'rpi', featured: true, univers: ['electronique', 'automatisme'], cat: 'embed',
    title: 'Bras robotisé piloté par une Raspberry Pi',
    short: 'Une application en C sur Raspberry Pi qui reçoit des ordres par liaison série et commande les servomoteurs et l’électroaimant d’un bras à trois axes.',
    year: '2025', frame: 'BUT 2 · S3 · informatique industrielle', duration: 'Novembre 2025', role: 'Binôme avec Louison',
    cover: 'rpi-1', alt: 'Le bras robotisé à trois axes sur son socle, et son électroaimant en bout de bras',
    images: [
      { src: 'rpi-1', cap: 'Le bras à trois axes et, à droite, l’électroaimant monté en bout d’avant-bras' },
      { src: 'rpi-2', cap: 'Test de la liaison série : l’application, lancée en root, ouvre /dev/ttyUSB0 et reçoit une trame de 4 octets' },
      { src: 'rpi.svg', cap: 'Le principe : le PC envoie les consignes, la Raspberry Pi pilote les servomoteurs' }
    ],
    videos: [
      { src: 'assets/video/rpi-servos.mp4', poster: 'assets/video/rpi-servos-poster.webp', step: '01', tag: 'servos', label: 'Le bras passe d’une position à l’autre' },
      { src: 'assets/video/rpi-bras.mp4', poster: 'assets/video/rpi-bras-poster.webp', step: '02', tag: 'matériel', label: 'Servomoteurs, câblage et électroaimant' }
    ],
    videosNote: 'Le PC envoie les consignes par liaison série ; la Raspberry Pi les traduit en impulsions de 1000 à 2000 µs pour chaque servomoteur.',
    figures: [
      { v: 19200, u: 'bauds', l: 'liaison série en mode brut (RAW) sur /dev/ttyUSB0' },
      { v: 4, u: 'octets', l: 'par trame, lus en bloquant pour rester synchronisé' },
      { v: 3, u: 'axes', l: 'pilotés par servomoteurs, plus un électroaimant' }
    ],
    context: 'Module d’informatique industrielle du semestre 3 : concevoir le système embarqué d’un bras robotisé à trois axes. Un PC envoie les consignes de position par liaison série ; une application en C sur la Raspberry Pi les traduit en commandes pour les servomoteurs et l’électroaimant.',
    missions: [
      'Configurer les GPIO avec la bibliothèque pigpio : une broche d’activation et une broche de signal PWM par servomoteur',
      'Ouvrir la liaison série /dev/ttyUSB0 à 19200 bauds en mode brut (termios), pour recevoir tout octet de 0 à 255 sans altération',
      'Recevoir des trames de 4 octets, assemblées octet par octet',
      'Convertir une consigne sur 16 bits (0 à 65535) en impulsion de 1000 à 2000 µs, avec une plage propre à chaque articulation pour éviter les collisions',
      'Charger au démarrage les angles de cinématique inverse, calculés à l’avance dans un fichier CSV, pour répondre sans latence',
      'Filmer les tests de communication et de mouvement pour valider toute la chaîne de commande'
    ],
    learned: [
      { pb: 'L’initialisation de pigpio échouait', fix: 'La bibliothèque exige les droits administrateur : le programme se lance en root.' },
      { pb: 'Des octets désynchronisés faisaient bouger le bras au hasard', fix: 'Une lecture bloquante qui attend strictement les 4 octets de la trame.' }
    ],
    skills: ['Langage C', 'Linux embarqué', 'Liaison série UART', 'PWM et servomoteurs', 'GPIO'],
    tools: ['Raspberry Pi', 'pigpio', 'termios', 'Langage C', 'Servomoteurs', 'Électroaimant'],
    docs: [
      { label: 'Compte rendu (Google Drive)', href: 'https://drive.google.com/file/d/1piVdvsl0gVwcMKb_jBekLRYEAPoDCJjY/view' }
    ]
  },
  {
    id: 'carte', featured: true, univers: ['electronique'], cat: 'elec',
    title: 'Carte de signalisation pour robot mobile',
    short: 'De la schématique à la carte gravée, soudée et testée : mon premier PCB.',
    year: '2025', frame: 'SAÉ1 & SAÉ2 · IUT de Rouen', duration: 'BUT 1 · 2024 – 2025', role: 'Projet individuel',
    cover: 'carte-1', alt: 'Routage KiCad de la carte de signalisation',
    images: ['carte-1', 'carte-2', 'carte-3', 'carte-4', 'carte-5', 'carte-6', 'carte-7', 'carte-8', 'carte-9'],
    videos: [
      { src: 'assets/video/fab-gravure.mp4', poster: 'assets/video/fab-gravure-poster.webp', step: '03', tag: 'gravure', label: 'Insolation & gravure de la carte' },
      { src: 'assets/video/fab-test.mp4', poster: 'assets/video/fab-test-poster.webp', step: '05', tag: 'test', label: 'Test sous tension, sondes en place' }
    ],
    videosNote: 'Deux étapes de la fabrication, filmées pendant la SAÉ : la plaque passe à la gravure, puis la carte est testée sous tension, sondes en place.',
    figures: [
      { v: 5, u: 'V', l: 'alimentation régulée (L7805)' },
      { v: 20, u: 'p.', l: 'de rapport technique' }
    ],
    context: 'Carte électronique de signalisation destinée à un robot mobile : niveau de batterie indiqué par LEDs, tension et vitesse des roues affichées sur un écran LCD I2C, alimentation régulée 5 V.',
    missions: [
      'Suivre un cahier des charges et planifier le projet (diagramme de Gantt)',
      'Étudier chaque fonction : régulateur L7805, comparateurs TL082, portes NAND à trigger de Schmitt, transistors PN2222A',
      'Simuler l’oscillateur astable sous PSpice',
      'Router la carte sous KiCad en respectant les contraintes imposées (faces, empreintes, diamètres des pastilles)',
      'Fabriquer la carte : impression, insolation, gravure, perçage, soudure',
      'Tester au multimètre et à l’oscilloscope, puis l’implanter sur un robot suiveur de ligne programmé sous Arduino',
      'Rédiger le rapport technique de fonctionnement et de dépannage'
    ],
    skills: ['Analyse fonctionnelle', 'Routage PCB', 'Fabrication', 'Procédure de test'],
    tools: ['KiCad', 'PSpice', 'Arduino', 'Oscilloscope', 'Multimètre'],
    docs: [
      { label: 'Rapport technique SAÉ2', href: 'assets/pdf/rapport-sae2-carte.pdf' }
    ]
  },
  {
    id: 'fpga', featured: false, univers: ['electronique'], cat: 'elec',
    title: 'Circuit logique sur FPGA — VHDL',
    short: 'Décrire, simuler et déployer un circuit logique sur un FPGA Altera.',
    year: '2025', frame: 'SAÉ2 · IUT de Rouen', duration: 'BUT 1 · 2025', role: 'Travail en groupe',
    cover: 'fpga.svg', alt: 'Chronogramme et blocs logiques d’un circuit VHDL',
    images: ['fpga.svg'],
    figures: [],
    context: 'Programmation en VHDL d’un circuit logique, de sa description jusqu’au déploiement sur une carte FPGA Altera.',
    missions: [
      'Décrire le circuit en VHDL',
      'Simuler son comportement sous ModelSim',
      'Compiler, synthétiser et déployer sur cible matérielle avec Quartus',
      'Dimensionner un affichage 7 segments multiplexé (feuille de calculs)'
    ],
    skills: ['Logique numérique', 'Simulation', 'Synthèse'],
    tools: ['VHDL', 'Quartus', 'ModelSim', 'FPGA Altera'],
    docs: [
      { label: 'Feuille de calculs — affichage multiplexé', href: 'assets/pdf/calculs-affichage-multiplexe.pdf' }
    ]
  },
  {
    id: 'auto', featured: false, univers: ['energie', 'automatisme'], cat: 'auto',
    title: 'Automatisme & armoires électriques',
    short: 'Grafcet, câblage d’armoires et départs moteurs asynchrones.',
    year: '2025', frame: 'BUT 1 · IUT de Rouen', duration: '2024 – 2025', role: 'Travaux pratiques',
    cover: 'auto-1', alt: 'Platine de câblage électrique en régime IT',
    images: ['auto-1',
      { src: 'auto-5', cap: 'Maquette Merlin Gerin « Régime TT/TN » câblée en TP de régimes de neutre' },
      { src: 'auto-6', cap: 'Régime TT/TN : une autre configuration de câblage' },
      { src: 'auto-7', cap: 'Le boîtier TT/TN de la maquette et ses cordons de mesure' },
      { src: 'auto-8', cap: 'Maquette « Régime IT » et son afficheur' },
      { src: 'auto-9', cap: 'Repérage des conducteurs sur la terre fictive' },
      { src: 'auto-10', cap: 'Maquette d’automatisme : commutateurs, voyants, arrêt d’urgence et automate' },
      { src: 'auto-11', cap: 'Entrées sur commutateurs, voyants rouge, orange et vert, arrêt d’urgence' },
      'auto-2', 'auto-3', 'auto-4'],
    figures: [],
    context: 'Travaux pratiques d’électrotechnique et d’automatisme : du schéma électrique industriel au câblage, puis à la programmation d’automates.',
    missions: [
      'Lire et réaliser des schémas électriques industriels',
      'Câbler des armoires électriques et des départs moteurs asynchrones',
      'Programmer des automates en Grafcet et en Ladder sous Automgen',
      'Travailler en sécurité (préhabilitation électrique)'
    ],
    skills: ['Schéma électrique', 'Câblage', 'Grafcet', 'Ladder', 'Préhabilitation électrique'],
    tools: ['Automgen', 'Automate programmable', 'Régime IT'],
    docs: []
  }
];

/* Les trois univers : textes, compétences et vignettes animées (assets/js/univers.js) */
window.UNIVERS = [
  {
    id: 'energie', n: '01', title: 'Énergie & électrotechnique', short: 'énergie',
    lead: 'Convertir, distribuer et commander l’énergie électrique : alimentations, machines, départs moteurs et schémas. Je simule en TP, je câble sur banc et je mesure, jusqu’aux alimentations bas bruit sur secteur 230 V que j’ai produites en stage.',
    skills: ['Conversion AC/DC et DC/DC', 'Hacheurs et onduleurs (MLI)', 'Machines synchrones et asynchrones', 'Départs moteurs', 'Schémas électriques · QElectroTech', 'Régimes de neutre', 'Préhabilitation électrique', 'Matlab / Simulink · ISIS'],
    docs: [
      { title: 'TP1 · machine synchrone en alternateur', date: '7 octobre 2025', tool: 'ISIS', href: 'https://drive.google.com/file/d/1ulVCNVOhKR60oLZRExytfKoYwt3iYikv/view', open: '',
        summary: 'Simulation d’une machine synchrone monophasée à excitation indépendante, utilisée en alternateur pour une application de type hydrolienne. À vide, 120 V efficaces à 50 Hz pour 1500 tr/min : la machine est tétrapolaire. Puis essais en court-circuit et en charge.',
        learned: 'Identifier une machine par ses essais : constante E = K·Ie, impédance synchrone, comportement en charge.' },
      { title: 'TP2 · machine asynchrone triphasée', date: '14 octobre 2025', tool: 'Matlab / Simulink', href: 'https://drive.google.com/file/d/1xVIweNoQdM5_pA3YYyNaH8KhgMkUFdHJ/view', open: '',
        summary: 'Démarrage, fonctionnement en charge et alimentation par un onduleur de tension MLI. À U/f constant (400 V à 50 Hz, 320 V à 40 Hz, 240 V à 30 Hz), le couple maximum reste à 81,05 N·m.',
        learned: 'Pourquoi la commande U/f garde le couple maximum constant, et comment un onduleur MLI fabrique de l’alternatif à partir du continu.' },
      { title: 'TP3 · hacheur série', date: '21 octobre 2025', tool: 'ISIS (Proteus)', href: 'https://drive.google.com/file/d/1p5IuVJ2q_yCyACFfDBKKX1IKhnqcy9V3/view', open: '',
        summary: 'Hacheur abaisseur sur charge résistive : la tension moyenne suit le rapport cyclique, un condensateur réduit l’ondulation, et la charge fait passer de la conduction continue à la conduction discontinue (régime critique vers 40 Ω).',
        learned: 'Le comportement réel d’un convertisseur DC/DC : rôle du rapport cyclique, du filtrage et de la charge.' }
    ],
    photos: [
      { src: 'auto-5', cap: 'Maquette Merlin Gerin « Régime TT/TN » câblée en TP' },
      { src: 'auto-8', cap: 'Maquette « Régime IT » et son afficheur' },
      { src: 'auto-7', cap: 'Le boîtier TT/TN et ses cordons de mesure' },
      { src: 'auto-9', cap: 'Repérage des conducteurs sur la terre fictive' }
    ],
    vignettes: [
      { type: 'redressement', title: 'Redressement double alternance', line: 'pont de Graetz · les diodes conduisent deux à deux' },
      { type: 'triphase', title: 'Réseau triphasé', line: 'trois phases déphasées de 120°' },
      { type: 'moteur', title: 'Moteur asynchrone', line: 'champ tournant · glissement du rotor' },
      { type: 'hacheur', title: 'Hacheur série', line: 'la valeur moyenne suit le rapport cyclique' },
      { type: 'depart', title: 'Départ moteur direct', line: 'la commande 24 V ferme KM1, le moteur démarre', open: 'auto' },
      { type: 'phaseurs', title: 'Diagramme de Fresnel', line: 'tension, courant et déphasage φ' }
    ]
  },
  {
    id: 'electronique', n: '02', title: 'Électronique & systèmes embarqués', short: 'électronique',
    lead: 'Concevoir, fabriquer et programmer des cartes : du schéma KiCad à la carte gravée et testée, du microcontrôleur au bras robotisé, jusqu’aux mesures RF au VNA.',
    skills: ['KiCad · routage et fabrication', 'STM32 · Arduino · C', 'Raspberry Pi · C · Linux', 'FPGA · VHDL', 'RF · VNA · antennes · SDR', 'Oscilloscope · analyseur de spectre', 'Liaisons série · SPI'],
    docs: [
      { title: 'Traitement du signal audio sur STM32', date: '26 novembre 2025', tool: 'STM32F4 · C', href: 'https://drive.google.com/file/d/1h6_qheif3mEM6mqWYxK-5iC8rhYxPU5z/view', open: 'stm32',
        summary: 'Chaîne audio temps réel : échantillonnage à 44,1 kHz par timer et DMA, volume, écho et notes de musique générées au DAC.',
        learned: 'Séparer le temps réel (interruptions) de l’interface (boucle principale) pour que le son ne craque pas.' },
      { title: 'Contrôle d’un bras robotisé sur Raspberry Pi', date: '26 novembre 2025', tool: 'Raspberry Pi · C', href: 'https://drive.google.com/file/d/1piVdvsl0gVwcMKb_jBekLRYEAPoDCJjY/view', open: 'rpi',
        summary: 'Application en C : liaison série à 19200 bauds en mode brut, trames de 4 octets, consignes converties en impulsions de 1000 à 2000 µs pour les servomoteurs.',
        learned: 'Une lecture bloquante de trames complètes évite les mouvements erratiques ; pigpio impose les droits root.' }
    ],
    vignettes: [
      { type: 'pcb', title: 'Carte électronique', line: 'le courant circule dans les pistes', open: 'carte' },
      { type: 'mli', title: 'Commande MLI', line: 'un sinus comparé à une porteuse triangulaire', open: 'regul' },
      { type: 'scope', title: 'Modulation d’amplitude', line: 'porteuse et enveloppe à l’oscilloscope', open: 'modulation' },
      { type: 'uart', title: 'Liaison série', line: 'UART à 19200 bauds · trames de 4 octets', open: 'rpi' },
      { type: 'bras', title: 'Bras robotisé', line: 'Raspberry Pi · servomoteurs · électroaimant', open: 'rpi' },
      { type: 'antenne', title: 'Antenne directive', line: 'HB9CV accordée à 144 MHz', open: 'radio' }
    ]
  },
  {
    id: 'automatisme', n: '03', title: 'Automatisme & informatique industrielle', short: 'automatisme',
    lead: 'Faire fonctionner des machines : programme automate en Ladder, Grafcet, réseau Modbus, régulation et scripts de mesure, du cahier des charges jusqu’à la ligne qui tourne.',
    skills: ['CODESYS · Ladder · ST', 'Grafcet', 'Modbus TCP', 'Factory I/O', 'Automgen', 'Régulation P / PI · Matlab · Simulink', 'Python · pyvisa · SQL', 'Diagnostic et maintenance'],
    docs: [
      { title: 'TP de maintenance · diagnostic', date: '15 octobre 2025', tool: 'Matlab / Simulink', href: 'https://drive.google.com/file/d/18cCFxbRWnSw6YQ3KojtMv1yTNzLf9hu7/view', open: '',
        summary: 'Localiser la porte défaillante parmi les 26 portes NAND d’un additionneur 2 bits, en testant du niveau le plus haut au plus bas : la porte NAND124 était collée à 0. Après remplacement, la sortie redevient identique à la référence.',
        learned: 'Une démarche de diagnostic hiérarchique, qui réduit le nombre de tests.' }
    ],
    photos: [
      { src: 'auto-10', cap: 'Maquette d’automatisme : commutateurs, voyants, arrêt d’urgence et automate' },
      { src: 'auto-11', cap: 'Commutateurs d’entrée, voyants et arrêt d’urgence' },
      { src: 'auto-2', cap: 'L’automate et ses modules d’entrées-sorties' }
    ],
    vignettes: [
      { type: 'ladder', title: 'Ladder', line: 'l’auto-maintien de la mémoire Marche', open: 'tri' },
      { type: 'grafcet', title: 'Grafcet', line: '5 étapes · un seul carton à la fois', open: 'tri' },
      { type: 'tri', title: 'Ligne de tri par poids', line: 'petit à gauche · moyen à droite · grand tout droit', open: 'tri' },
      { type: 'pupitre', title: 'Pupitre opérateur', line: 'voyants, afficheur de poids, arrêt d’urgence', open: 'tri' },
      { type: 'modbus', title: 'Modbus TCP', line: 'CODESYS serveur · Factory I/O client', open: 'tri' },
      { type: 'boucle', title: 'Régulation PI', line: 'la sortie rejoint la consigne, sans erreur statique', open: 'regul' }
    ]
  }
];

/* Éditorial noir & blanc (assets/img/edito/edito-NN.webp) — séance du 23 mai 2026 */
window.EDITO = [
  { file: 'edito-01', alt: 'Portrait de face en noir et blanc, chemise rayée et foulard' },
  { file: 'edito-02', alt: 'Profil en noir et blanc, veste de costume et chemise rayée' },
  { file: 'edito-03', alt: 'Profil en noir et blanc, manteau et gilet pied-de-poule' },
  { file: 'edito-04', alt: 'Silhouette en pied, blazer clair et short' },
  { file: 'edito-05', alt: 'Trois-quarts en noir et blanc, regard baissé' },
  { file: 'edito-06', alt: 'Gros plan en noir et blanc, regard vers l’objectif' }
];
