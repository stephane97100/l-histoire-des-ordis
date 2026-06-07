import { OSInfo, Lineage, ForgottenOS } from '../types';

export const osList: OSInfo[] = [
  {
    id: 'ms-dos',
    name: 'MS-DOS',
    fullName: 'Microsoft Disk Operating System',
    developer: 'Microsoft (et originellement Seattle Computer Products sous le nom QDOS)',
    launchYear: '1981',
    architects: ['Tim Paterson', 'Bill Gates', 'Paul Allen'],
    kernel: 'Aucun (Monoprogramme)',
    kernelDetails: 'Pas de noyau moderne, execution directe au plus près du matériel, pas de protection mémoire.',
    license: 'Propriétaire / Commercial (Aujourd\'hui code source partagé des premières versions)',
    fileSystems: ['FAT12', 'FAT16'],
    architectureBasis: 'CP/M (structure logicielle inspirée de Gary Kildall), Intel x86',
    summary: 'Le système d\'exploitation en ligne de commande qui a propulsé l\'ère du PC IBM et a assis l\'empire Microsoft.',
    description: `Acheté par Microsoft à Tim Paterson (Seattle Computer Products) sous le nom de QDOS (Quick and Dirty Operating System) pour 50 000 $, MS-DOS a été licencié à IBM pour son nouveau Personal Computer (PC) en 1981. 

C'est un système textuel, mono-tâche et mono-utilisateur. Chaque commande s'exécute directement en mémoire conventionnelle (les fameux premiers 640 Ko). Malgré ses limitations techniques, sa simplicité et sa standardisation sur l'architecture x86 d'Intel en ont fait le standard mondial de l'informatique professionnelle et du jeu vidéo sur PC pendant près de 15 ans.`,
    historicalSignificance: 'Il a établi la suprématie de l\'architecture matérielle compatible IBM PC et a financé toute l\'histoire ultérieure de Microsoft (notamment le développement de Windows).',
    keyInnovations: [
      'Structure de commandes par fichiers .BAT (Scripte batch)',
      'Abstraction des fichiers d\'E/S via des pilotes matériels simples',
      'Le BIOS comme couche standard d\'interfaçage'
    ],
    anecdote: 'Le contrat du siècle négocié par Bill Gates spécifiait que Microsoft gardait le droit de vendre MS-DOS à d\'autres constructeurs (les clones de PC). IBM, persuadé que l\'argent était dans le matériel, a accepté, signant ainsi son propre détrônement par rapport à Microsoft.',
    color: 'emerald',
    versions: [
      { name: 'PC DOS 1.0', year: '1981', significance: 'Sortie initiale avec l\'IBM PC, supporte uniquement les disquettes simple face de 160 Ko.' },
      { name: 'MS-DOS 2.0', year: '1983', significance: 'Support des disques durs, introduction des répertoires hiérarchiques (empruntés à UNIX).' },
      { name: 'MS-DOS 3.3', year: '1987', significance: 'La version la plus stable de l\'ère du PC classique, support des disquettes 1.44 Mo.' },
      { name: 'MS-DOS 5.0', year: '1991', significance: 'Optimisation de la mémoire haute (LOADHIGH/DEVICEHIGH), éditeur de texte en plein écran (EDIT).' },
      { name: 'MS-DOS 6.22', year: '1994', significance: 'Dernière version autonome majeure, célèbre pour ScanDisk et l\'utilitaire de compression DoubleSpace.' }
    ]
  },
  {
    id: 'amiga',
    name: 'AmigaOS',
    fullName: 'AmigaOS',
    developer: 'Commodore International (créé par Amiga Inc.)',
    launchYear: '1985',
    architects: ['Jay Miner', 'Carl Sassenrath', 'RJ Mical'],
    kernel: 'Microkernel',
    kernelDetails: 'Le noyau Exec (nanokernel) implémente un multitâche préemptif en temps réel ultra-rapide par messagerie.',
    license: 'Propriétaire',
    fileSystems: ['OFS (Old File System)', 'FFS (Fast File System)'],
    architectureBasis: 'Motorola 68000 & puces graphiques customisées (Agnes, Denise, Paula)',
    summary: 'Une merveille d\'ingénierie qui a introduit le multitâche préemptif et le multimédia haute fidélité auprès du grand public dès la décennie 1980.',
    description: `Lancé en 1985 avec l'Amiga 1000, AmigaOS était en avance de dix ans sur son temps. Alors que Windows et Mac OS étaient monotâches ou utilisaient un multitâche coopératif fragile, AmigaOS proposait un multitâche préemptif en temps réel, grâce à un matériel dédié conçu par le légendaire Jay Miner et une architecture logicielle extrêmement raffinée par Carl Sassenrath (l'architecture Exec).

Il se structure en deux parties : le Kickstart en ROM (qui contient Exec et les bibliothèques de base) et le Workbench (l'interface graphique de bureau en disquette ou disque dur). Le système gérait des graphismes colorés et du son 4 voix 8-bits de manière fluide alors que les PC n'émettaient que des bips asthmatiques.`,
    historicalSignificance: 'Il a posé les bases de l\'informatique multimédia, de la création vidéo grand public (Video Toaster) et de la culture du jeu micro-informatique de salon des années 80-90.',
    keyInnovations: [
      'Multitâche préemptif en temps réel autonome avec passage de messages sans copie mémoire',
      'Interface graphique Workbench avec écrans superposables indépendants (chaque application pouvait avoir sa propre résolution d\'écran)',
      'Bibliothèques chargées dynamiquement (.library) partagées en mémoire'
    ],
    anecdote: 'Le concepteur en chef de l\'architecture matérielle, Jay Miner, venait d\'Atari où il avait conçu les puces des Atari 2600 et Atari 800. Il a caché le nom de son chien "Mitchy" gravé à l\'intérieur du plastique du boîtier de l\'Amiga 1000 à côté des signatures de l\'équipe technique !',
    color: 'amber',
    versions: [
      { name: 'AmigaOS 1.0/1.3', year: '1985', significance: 'Lancement de l\'Amiga 1000 et 500, interface contrastée bleue et orange devenue mythique.' },
      { name: 'AmigaOS 2.0', year: '1990', significance: 'Refonte graphique majeure du Workbench (style gris/bleu moderne), introduction de l\'interface standardisée 3D look.' },
      { name: 'AmigaOS 3.0/3.1', year: '1992', significance: 'Support des puces AGA (Amiga 1200 / 4000) et introduction des types de données système (Datatypes) universels.' },
      { name: 'AmigaOS 4.0', year: '2004', significance: 'Migration vers l\'architecture matérielle PowerPC moderne (Post-Commodore).' }
    ]
  },
  {
    id: 'atari-tos',
    name: 'Atari TOS',
    fullName: 'Atari TOS (Tramiel Operating System / The Operating System)',
    developer: 'Atari Corporation',
    launchYear: '1985',
    architects: ['Jack Tramiel', 'Shiraz Shivji', 'Landon Dyer'],
    kernel: 'Monolithic',
    kernelDetails: 'Noyau ultra-rapide gravé en ROM, intégrant GEMDOS pour la gestion de fichiers et les abstractions.',
    license: 'Propriétaire',
    fileSystems: ['TOS File System (compatible FAT16)', 'GEMDOS'],
    architectureBasis: 'Motorola 68000, GEM (Graphics Environment Manager de Digital Research)',
    summary: 'Le système d\'exploitation "Jackintosh", gravé directement dans la ROM de la série légendaire Atari ST.',
    description: `Conçu sous la direction féroce de Jack Tramiel (ex-Commodore, repreneur d'Atari), l'Atari ST devait concurrencer le Macintosh mais pour une fraction de son coût. L'OS, surnommé familièrement TOS, bootait de manière quasi instantanée en moins de 3 secondes car l'intégralité du code résidait dans des puces ROM sur la carte mère.

L'interface graphique de TOS s'appelle GEM (Graphics Environment Manager), développée par Digital Research. Elle offrait un bureau de style fenêtré monochrome de haute résolution ou couleur moyenne. Très populaire chez les musiciens grâce aux prises MIDI intégrées en standard sur le ST, ce système a défini le paysage de la production musicale en studio pendant deux décennies.`,
    historicalSignificance: 'Il a démocratisé la PAO (Publication Assistée par Ordinateur) et la M.A.O. (Musique Assistée par Ordinateur), servant de berceau à des logiciels comme Cubase et Logic.',
    keyInnovations: [
      'Boot immédiat depuis la ROM matérielle',
      'Compatibilité de formatage de disquette directe avec MS-DOS (FAT16 ST-standard)',
      'Prise en charge bas niveau immédiate du protocole MIDI directement par l\'OS'
    ],
    anecdote: 'Le "T" de TOS fait officiellement référence à "The Operating System", mais en interne, toute l\'équipe y voyait "Tramiel Operating System", en hommage au tempérament tempétueux et impitoyable du patron Jack Tramiel.',
    color: 'teal',
    versions: [
      { name: 'TOS 1.0 (Disk/ROM)', year: '1985', significance: 'Première mondiale sur l\'Atari 520ST. Chargé depuis disquette au début, puis immédiatement déplacé en ROM.' },
      { name: 'TOS 1.04 "Rainbow"', year: '1989', significance: 'Nombreuses corrections de bugs, correction du défilement et icône de dossier de couleurs vives.' },
      { name: 'TOS 2.06', year: '1991', significance: 'Introduit sur l\'Atari STE, support du boot sur disque dur amélioré et interface plus élégante.' },
      { name: 'MultiTOS (TOS 4.x)', year: '1993', significance: 'Tentative d\'introduire le multitâche préemptif officiel pour l\'Atari Falcon 030 et l\'Atari TT.' }
    ]
  },
  {
    id: 'windows',
    name: 'Windows',
    fullName: 'Microsoft Windows (Lignées 16-bit, 9x et NT)',
    developer: 'Microsoft',
    launchYear: '1985',
    architects: ['Dave Cutler', 'Bill Gates', 'Nathan Myhrvold'],
    kernel: 'Hybrid',
    kernelDetails: 'Noyau hybride Windows NT (depuis NT 3.1) doté d\'une grande portabilité matérielle et d\'une protection mémoire totale. C\'est l\'opposé du mode MS-DOS coopératif des versions 16/32-bits (95/98/ME).',
    license: 'Propriétaire / Commercial',
    fileSystems: ['FAT16', 'FAT32', 'NTFS (haute sécurité, journalisé)'],
    architectureBasis: 'Intel x86, x64, ARM, VMS (Influence conceptuelle du système d\'exploitation VAX/VMS)',
    summary: 'D\'un simple gestionnaire de fenêtres pour MS-DOS à l\'environnement d\'exploitation le plus répandu au monde sur ordinateur de bureau.',
    description: `L'histoire de Windows se divise en deux embranchements historiques fondamentaux d'une importance capitale pour le chercheur :

1. **La branche MS-DOS / Hybride (1985-2000) :** Windows 1.x, 2.x, 3.x, puis Windows 95, 98 et ME. Ces systèmes ne sont pas de véritables OS autonomes au début, mais des enveloppes graphiques multitâches coopératives posées sur MS-DOS. Windows 95 a scellé l'hégémonie de Microsoft en réunissant de manière hybride 16/32-bits l'interface graphique avancée et le sous-système DOS sous le capot.

2. **La branche Windows NT (New Technology) (1993 à aujourd'hui) :** Écrit de zéro par Dave Cutler (ancien cerveau de Digital Equipment Corporation), Windows NT a abandonné l'héritage d'MS-DOS au profit d'une architecture client-serveur de noyau hybride, avec adressage 32 bits pur, multiprocesseur et protection mémoire de qualité industrielle. Cette branche a conquis le grand public avec Windows XP (2001) et continue aujourd'hui avec Windows 10 et 11.`,
    historicalSignificance: 'Il s\'agit du standard de fait de l\'informatique personnelle et d\'entreprise (estimé à 75%+ de parts de marché desktop) et de la plateforme historique absolue du jeu de divertissement vidéo.',
    keyInnovations: [
      'Le registre Windows (base de données unifiée pour toute la configuration des fichiers de l\'OS)',
      'L\'API Win32 robuste assurant une compatibilité binaire ascendante sur plusieurs décennies',
      'Le modèle DirectX / Direct3D permettant le contrôle direct des cartes graphiques 3D'
    ],
    anecdote: 'Dave Cutler détestait UNIX et toutes ses copies. Pour concevoir Windows NT, il a repris l\'esprit de VMS. D\'ailleurs, si l\'on décale d\'une lettre dans l\'alphabet les lettres de VMS (V->W, M->N, S->T), on obtient presque magiquement WNT - Windows NT !',
    color: 'blue',
    survivalExplanation: 'Microsoft a pérennisé la domination de Windows grâce à une philosophie absolue de compatibilité descendante (Backward Compatibility) permettant à de vieux logiciels industriels ou comptables d\'époque de tourner sans encombre sur Windows 11. De plus, sa suprématie est cimentée par des contrats de licences massifs avec les constructeurs tiers (monopole d\'intégration OEM) et le déploiement planétaire d\'outils professionnels clés comme la suite Office et l\'annuaire d\'infrastructure Active Directory.',
    versions: [
      { name: 'Windows 1.0 / 3.1', year: '1985-1992', significance: 'Passage des fenêtres juxtaposées aux fenêtres superposables et triomphe commercial mondial avec la version 3.1.' },
      { name: 'Windows 95', year: '1995', significance: 'Menu Démarrer, Barre des tâches, Plug-and-Play et intégration du Bureau en 32 bits.' },
      { name: 'Windows NT 4.0 / 2000', year: '1996-2000', significance: 'Stabilité professionnelle totale, annuaire Active Directory pour les grands parcs d\'entreprises.' },
      { name: 'Windows XP', year: '2001', significance: 'Fusion des branches grand public (9x) et professionnelle (NT) sous un noyau ultra-robuste.' },
      { name: 'Windows 7', year: '2009', significance: 'Correction des errances de Vista, plébiscité pour son ergonomie claire et sa légèreté.' },
      { name: 'Windows 10 / 11', year: '2015-2021', significance: 'OS comme service, intégration du sous-système Linux (WSL), virtualisation sécurisée par défaut.' }
    ]
  },
  {
    id: 'macos',
    name: 'macOS',
    fullName: 'Apple Macintosh System / Mac OS / OS X / macOS',
    developer: 'Apple Inc.',
    launchYear: '1984',
    architects: ['Steve Jobs', 'Andy Hertzfeld', 'Bill Atkinson', 'Avie Tevanian'],
    kernel: 'Hybrid',
    kernelDetails: 'Noyau XNU (X is Not Unix) basé sur le micro-noyau Mach de Carnegie Mellon et une forme dérivée de BSD UNIX.',
    license: 'Propriétaire / Commercial (Noyau open source sous le nom Darwin)',
    fileSystems: ['MFS (Macintosh File System)', 'HFS (Hierarchical File System)', 'APFS (Apple File System optimized for SSD)'],
    architectureBasis: 'Classic (Motorola 68000/PowerPC) pui Modern UNIX (NeXTSTEP, BSD, Intel x86 et Apple Silicon ARM)',
    summary: 'Le parangon de l\'expérience utilisateur graphique et de l\'ajustement matériel-logiciel, passé de l\'artisanat coopératif à la puissance industrielle d\'UNIX.',
    description: `Tout comme Windows, l'histoire d'Apple est divisée par une faille sismique historique :

1. **Le Système Classic (1984-2001) :** Système 1 à Mac OS 9. Conçu à l'origine en 1984 pour tenir sur une disquette simple face de 400 Ko et s'exécuter dans 128 Ko de mémoire. Ce fut la première commercialisation massive et réussie d'une interface graphique avec souris, corbeille et barres de menus. Mais le système souffrait d'un grave défaut : pas de multitâche préemptif authentique et pas de protection mémoire (une application qui plante gelait tout le Macintosh).

2. **La Renaissance Mac OS X / macOS (2001 à aujourd'hui) :** Aux abois à la fin des années 90, Apple a racheté NeXT et a intégré son système d'exploitation NeXTSTEP. C'était la création d'OS X par Avie Tevanian. Sous l'interface graphique élégante (Aqua) rougeoyait désormais un cœur de lave UNIX de qualité industrielle : le noyau XNU combinant Mach et BSD. macOS allie ainsi la simplicité légendaire du Mac à la robustesse absolue des systèmes serveurs.`,
    historicalSignificance: 'Il a établi l\'ordinateur personnel comme un objet d\'art et de design et est devenu le bastion informatique des développeurs et créateurs du monde entier.',
    keyInnovations: [
      'Démocratisation mondiale de l\'ordinateur guidé entièrement à la souris et par métaphore du bureau',
      'Moteur graphique Quartz basé sur PDF pour un affichage et des polices lissés de haute précision',
      'L\'API de transition "Carbon" et la plateforme Cocoa de NeXTSTEP orientée objet pure'
    ],
    anecdote: 'Le premier ordinateur Macintosh en 1984 ne possédait aucun ventilateur de refroidissement par choix esthétique intransigeant de Steve Jobs, ce qui provoquait d\'importantes surchauffes mais le rendait totalement silencieux, tel un appareil zen.',
    color: 'slate',
    survivalExplanation: 'Apple a survécu à un déclin quasi fatal à la fin des années 1990 en opérant un mariage d\'anthologie : greffer l\'ergonomie visuelle soignée du Mac sur les fondations Unix de NeXTSTEP (le noyau XNU hyper-stable conjoint de Mach et BSD). La marque s\'impose en contrôlant horizontalement le couple matériel-logiciel (comme on le voit aujourd\'hui avec ses microprocesseurs maison haute performance Apple Silicon M1/M2/M3) et en créant un effet de synergie ultra-cohérent avec ses autres appareils mobiles grand public (iPhone, iPad).',
    versions: [
      { name: 'System 1', year: '1984', significance: 'Naissance officielle du Macintosh. Introduit le finder, le bureau graphique et les polices proportionnelles.' },
      { name: 'System 7', year: '1991', significance: 'Introduction du multitâche coopératif en arrière-plan, support de la couleur globale et alias de fichiers.' },
      { name: 'Mac OS 9', year: '1999', significance: 'Ultime avatar du "Classic Mac OS" avec début de support internet intégré (Sherlock).' },
      { name: 'Mac OS X 10.0 Cheetah', year: '2001', significance: 'Transformation UNIX de NeXTSTEP, introduction de l\'interface "Aqua" brillante comme de l\'eau.' },
      { name: 'Mac OS X 10.4 Tiger', year: '2005', significance: 'Sortie historique majeure : spotlight, dashboard, transition matérielle vers Intel x86.' },
      { name: 'macOS 11 Big Sur / macOS 14 Sonoma', year: '2020-2023', significance: 'Transition d\'architecture vers Apple Silicon ARM (M1/M2/M3) avec des performances par watt hors norme.' }
    ]
  },
  {
    id: 'linux',
    name: 'Linux',
    fullName: 'Le Système GNU/Linux et ses distributions',
    developer: 'Linus Torvalds, la Free Software Foundation et la communauté Open Source globale',
    launchYear: '1991',
    architects: ['Linus Torvalds', 'Richard Stallman', 'Ian Murdock', 'Patrick Volkerding'],
    kernel: 'Monolithic',
    kernelDetails: 'Noyau monolithique modulaire capable de charger ou décharger des pilotes matériels à chaud.',
    license: 'GPLv2 (General Public License, exigeant le partage du code dérivé)',
    fileSystems: ['ext2', 'ext3', 'ext4', 'Btrfs', 'ZFS'],
    architectureBasis: 'UNIX POSIX (réécriture autonome de Linus Torvalds inspirée de Minix)',
    summary: 'Le noyau open source libre devenu l\'épine dorsale technologique de l\'Internet moderne, des serveurs, des supercalculateurs et des smartphones.',
    description: `En août 1991, un étudiant finlandais de 21 ans nommé Linus Torvalds envoie un message historique sur un forum Usenet : il annonce qu'il développe un système d'exploitation libre "juste comme un hobby, pas un projet professionnel sérieux". Il recréait les fonctionnalités UNIX standard sur son PC 386.

En combinant ce noyau (le Kernel Linux) avec les utilitaires libres déjà écrits par Richard Stallman pour le projet GNU (compilateur GCC, shell Bash), le monde a vu naître le premier système d'exploitation entièrement libre et performant : GNU/Linux. Au lieu d'un produit unique, sa nature libre a permis à des entités d'éditer des assemblages d'applications thématiques appelés "distributions" (les fameuses Distros) pour répondre à des besoins d'utilisateurs distincts.`,
    historicalSignificance: 'Il fait tourner 100% des 500 supercalculateurs les plus puissants du monde, la majorité des serveurs web (Cloud Apache/Nginx), l\'infrastructure d\'Android et la quasi-totalité des conteneurs virtualisés (Docker, Kubernetes).',
    keyInnovations: [
      'Modèle de développement communautaire décentralisé massif via Git (conçu par Linus lui-même)',
      'Le concept de gestionnaire de paquets centralisé (ancêtres immédiats des App Store actuels)',
      'Conteneurisation native (cgroups, namespaces) pour le Cloud Computing'
    ],
    anecdote: 'Le choix de la mascotte officielle de Linux, le manchot Tux, vient du fait que Linus Torvalds s\'est fait pincer le doigt par un petit manchot lors d\'une visite dans un zoo en Australie.',
    color: 'orange',
    survivalExplanation: 'Linux a triomphé dans le monde entier grâce aux garanties uniques de l\'Open Source régenté par la licence libre GPLv2 : aucune entreprise privée ne peut s\'emparer du système ou imposer des frais exclusifs pour son utilisation. Cette neutralité a poussé les plus grandes multinationales (IBM, Intel, Google, Amazon, Microsoft) à s\'unir pour le financer et le codévelopper. Son architecture hyper-modulaire, sa flexibilité et sa gratuité totale l\'ont imposé comme le moteur incontestable de tous les serveurs Internet, du Cloud global, des conteneurs légers et de la quasi-totalité des appareils connectés de la planète.',
    versions: [
      { name: 'Noyau Linux 0.01', year: '1991', significance: 'Première publication brute du code source (10 000 lignes) par Linus Torvalds, exclusif à l\'Intel 386.' },
      { name: 'Noyau Linux 1.0.0', year: '1994', significance: 'Première version stable officielle. Support de l\'adressage x86 pur et protocole réseau TCP/IP de base.' },
      { name: 'Noyau Linux 2.0.0', year: '1996', significance: 'Prise en charge majeure du multiprocesseur symétrique (SMP) et portage sur architectures alternatives (Motorola, Alpha).' },
      { name: 'Noyau Linux 2.4.0', year: '2001', significance: 'Support natif de l\'USB, du système de fichiers journalisé ext3, et de la gestion de volumes logiques (LVM).' },
      { name: 'Noyau Linux 2.6.0', year: '2003', significance: 'Intégration du planificateur processeur O(1) hautes performances, support de la préemption de noyau et architecture ALSA pour l\'audio.' },
      { name: 'Noyau Linux 3.0', year: '2011', significance: 'Changement de schéma de numérotation pour célébrer les 20 ans du projet. Améliorations de performances de bas niveau.' },
      { name: 'Noyau Linux 4.0 / 5.0', year: '2015-2019', significance: 'Introduction du Livepatching (mise à jour du noyau sans aucun redémarrage) et support approfondi de l\'architecture 64-bits ARM.' },
      { name: 'Noyau Linux 6.0 / 6.6 LTS', year: '2022-2023', significance: 'Adoption officielle du langage Rust pour l\'écriture sécurisée des pilotes de périphériques, et optimisation pour l\'informatique hybride.' }
    ],
    linuxDistributions: {
      historical: [
        {
          name: 'Slackware',
          year: '1993',
          description: 'Créée par Patrick Volkerding. C\'est la plus ancienne distribution encore active aujourd\'hui.',
          significance: 'Garde une philosophie très proche du monde Unix pur : pas de fioritures graphiques automatiques, configuration manuelle par fichiers textes uniquement.'
        },
        {
          name: 'Debian GNU/Linux',
          year: '1993',
          description: 'Fondée par Ian Murdock (le nom "Debian" est la fusion du prénom de sa petite amie Debra et de son propre prénom Ian).',
          significance: 'Le parangon du logiciel libre strict et du développement démocratique. Introduit les paquets .deb (apt), servant de socle à Ubuntu.'
        },
        {
          name: 'Red Hat Enterprise Linux (RHEL)',
          year: '1994 (Red Hat Linux classique)',
          description: 'La première version commercialisée à destination des entreprises avec support technique payant de haute qualité.',
          significance: 'Standard industriel des centres de données professionnels, à l\'origine du format .rpm et du gestionnaire d\'installation Anaconda.'
        }
      ],
      modern: [
        {
          name: 'Ubuntu',
          year: '2004',
          description: 'Créée par Mark Shuttleworth (Canonical) avec la devise philosophique africaine : "L\'humanité aux autres".',
          targetAudience: 'Débutants, développeurs, serveurs de cloud rapide.',
          popularitySign: 'A démocratisé Linux auprès du grand public en rendant l\'installation d\'un système Linux aussi simple et assistée qu\'un Windows.'
        },
        {
          name: 'Fedora',
          year: '2003',
          description: 'Distribution parrainée par Red Hat servant de laboratoire d\'innovation de pointe.',
          targetAudience: 'Administrateurs système, développeurs modernes et amateurs de nouveautés technologiques.',
          popularitySign: 'Toujours la première à adopter les technologies standard d\'avant-garde comme Wayland (affichage graphique) ou de nouveaux noyaux.'
        },
        {
          name: 'Arch Linux',
          year: '2002',
          description: 'Distribution minimaliste basée sur le principe de simplicité technique pure ("Keep It Simple Stupid").',
          targetAudience: 'Utilisateurs expérimentés qui veulent construire leur OS brique par brique.',
          popularitySign: 'Système "Rolling Release" (mises à jour permanentes sans réinstallation globale) célèbre pour son Wiki qui fait office d\'encyclopédie de l\'OS.'
        },
        {
          name: 'Linux Mint',
          year: '2006',
          description: 'Dérivée d\'Ubuntu, elle se refuse au dogmatisme et fournit par défaut tous les codecs propriétaires pour l\'utilisateur.',
          targetAudience: 'Transfuges de Windows cherchant un bureau classique, sobre et productif immédiatement.',
          popularitySign: 'Propose son propre environnement Cinnamon très traditionnel, léger et immédiatement fonctionnel.'
        },
        {
          name: 'Alpine Linux',
          year: '2005',
          description: 'Distribution miniature axée sur la sécurité extrême et utilisant la bibliothèque C musl au lieu de glibc.',
          targetAudience: 'Développeurs Cloud, ingénieurs d\'infrastructure de micro-services virtualisés.',
          popularitySign: 'Poids plume absolu (environ 5 Mo de taille de conteneur de base), c\'est l\'image standard de déploiement de l\'ère Docker.'
        }
      ]
    }
  },
  {
    id: 'beos',
    name: 'BeOS',
    fullName: 'Be Operating System',
    developer: 'Be Inc.',
    launchYear: '1995',
    architects: ['Jean-Louis Gassée', 'Steve Sakoman'],
    kernel: 'Microkernel',
    kernelDetails: 'Propre micro-noyau modulaire multitâche préemptif avec support symétrique multiprocesseur.',
    license: 'Propriétaire',
    fileSystems: ['BFS (Be File System - premier système de fichiers indexé par base de données)'],
    architectureBasis: 'PowerPC puis Intel x86, architecture propriétaire orientée traitement média en temps réel',
    summary: 'Le système d\'exploitation culte des années 90, conçu dès le départ pour le multimédia intensif et le traitement direct des flux vidéo.',
    description: `Suite à son départ conflictuel d'Apple, le français Jean-Louis Gassée décide de créer la "BeBox" assortie d'un nouveau système d'exploitation révolutionnaire : BeOS. Contrairement aux OS classiques, alourdis par l'obligation de maintenir la compatibilité avec le passé, BeOS a été écrit à la fin des années 1990 avec une liberté totale.

Sa spécialité absolue est le multimédia. L'ensemble du système d'exploitation exploite une approche novatrice : chaque création de fenêtre, flux audio, mouvement de souris ou élément matériel génère un processus logiciel indépendant (Multi-threading massif). Sur une machine bi-processeur des années 90, BeOS pouvait lire 12 vidéos QuickTime simultanément sans la moindre saccade pendant que l'utilisateur déplaçait frénétiquement les fenêtres, là où Windows XP ou Mac OS 9 se figeaient complètement.`,
    historicalSignificance: 'BeOS a failli être racheté par Apple pour devenir la base de Mac OS X. Apple lui a finalement préféré NeXTSTEP pour une question de prix, scellant le destin commercial de Be. Mais ses concepts de fichiers de métadonnées de hautes performances et son architecture threadée vivent aujourd\'hui dans Haiku (son clone moderne open source).',
    keyInnovations: [
      'Le système de fichiers BFS (Be File System) indexé en temps réel comme une base de données SQL pour chercher des fichiers par métadonnées d\'artiste ou d\'e-mail',
      'API système écrite entièrement en C++ orientée objet',
      'Multi-threading agressif où chaque fenêtre ou vue s\'exécute dans son propre thread de processeur dédié'
    ],
    anecdote: 'Jean-Louis Gassée demandait 400 millions de dollars à Apple pour son rachat en 1996. Gil Amelio, alors patron d\'Apple, en offrait 100 millions tout au plus. Devant cette impasse, Apple s\'est tournée vers Steve Jobs qui a su vendre NeXTSTEP pour 429 millions de dollars.',
    color: 'violet',
    versions: [
      { name: 'BeOS DR8 (Developer Release)', year: '1996', significance: 'Premières versions publiques sur ordinateur BeBox bi-processeur PowerPC.' },
      { name: 'BeOS R3', year: '1998', significance: 'Portage historique de l\'OS sur l\'architecture Intel x86 de grande consommation, permettant son utilisation sur des PC ordinaires.' },
      { name: 'BeOS R5 (Personal Edition)', year: '2000', significance: 'La version légendaire, gratuite pour usage personnel, programmable et capable de booter depuis une session de Windows existante.' },
      { name: 'Haiku R1 (Bêta)', year: '2018-2024', significance: 'Projet communautaire moderne et libre réécrivant entièrement BeOS à l\'identique en y ajoutant le support des matériels modernes.' }
    ]
  },
  {
    id: 'sun',
    name: 'SunOS / Solaris',
    fullName: 'SunOS & Solaris Operating System',
    developer: 'Sun Microsystems (Aujourd\'hui Oracle Corporation)',
    launchYear: '1982',
    architects: ['Bill Joy', 'Andy Bechtolsheim', 'Vinod Khosla', 'Scott McNealy'],
    kernel: 'Monolithic',
    kernelDetails: 'Noyau ultra-industriel monolithique modulaire Unix System V Release 4 dote de capacités de clustering incomparables.',
    license: 'Propriétaire / Commercial (Tentative d\'Open Source avec OpenSolaris en 2005)',
    fileSystems: ['UFS', 'ZFS (Zettabyte File System - le système de fichiers ultime de l\'informatique professionnelle)'],
    architectureBasis: 'UNIX BSD puis UNIX SVR4, stations de travail Sun SPARC et processeurs x86',
    summary: 'Le géant d\'acier informatique des serveurs d\'entreprises des années 90, inventeur des réseaux modernes et des technologies clés du cloud.',
    description: `Sun Microsystems a été fondée sur l'affirmation visionnaire "The Network is the Computer" (Le Réseau est l\'Ordinateur). Son système d'exploitation, SunOS, a d'abord reposé sur des bases UNIX BSD très populaires développées par Bill Joy (également inventeur de l'éditeur de texte vi et du protocole TCP/IP de Berkeley).

Dans les années 90, SunOS s'est transformé en **Solaris** en basculant vers la branche professionnelle UNIX System V. C'était le système d'exploitation aristocratique pour stations de travail scientifiques de haut vol et gros serveurs de bases de données de banques ou telecoms. Solaris a apporté au monde des révolutions d'ingénierie qui font encore foi aujourd'hui, comme le système d'exploitation dynamique DTrace et le système de fichier indestructible ZFS.`,
    historicalSignificance: 'Solaris a introduit Java, le système de fichiers réseau universel NFS, l\'unification du protocole Internet, et a constitué la fondation de l\'Internet originel avec ses serveurs Web SPARC robustes.',
    keyInnovations: [
      'Le système de stockage ZFS intégrant la protection contre l\'usure silencieuse des disques, la gestion intégrée par volumes et les snapshots instantanés',
      'DTrace (Dynamic Tracing) permettant de profiler l\'OS et de traquer des goulots d\'étranglement directement en production sans arrêter de serveurs',
      'Solaris Zones : le tout premier système d\'isolation applicative de type container bien avant Docker'
    ],
    anecdote: 'C\'est sur les serveurs Sun Microsystems exécutant Solaris que l\'inventeur de Java, James Gosling, a formalisé le langage de programmation révolutionnaire destiné à unifier de multiples systèmes d\'exploitation sous un dénominateur commun portable.',
    color: 'rose',
    survivalExplanation: 'Bien que confiné à un rôle d\'infrastructure de niche de haute criticité depuis son rachat par Oracle, Solaris survit dans les systèmes financiers bancaires et de télécommunications. Sa résilience découle de chefs-d\'œuvre techniques inégalés en termes de sûreté des données : le système de stockage dynamique ZFS (qui répare les pannes de bits silencieuses à la volée) et l\'outil DTrace de diagnostic en pleine production sans la moindre interruption de service. Son héritage libre se perpétue également via l\'écosystème open source de la fondation illumos (SmartOS/OmniOS).',
    versions: [
      { name: 'SunOS 1.0', year: '1982', significance: 'Sortie initiale basée sur Unix BSD, configurée pour les premiers ordinateurs de bureau Sun-1.' },
      { name: 'SunOS 4.1.3', year: '1992', significance: 'L\'âge d\'or de la version d\'inspiration BSD pure, vénérée des spécialistes réseaux de l\'époque.' },
      { name: 'Solaris 2.0 (SunOS 5.0)', year: '1992', significance: 'Mutation majeure vers UNIX System V Release 4, support complet du multiprocesseur symétrique.' },
      { name: 'Solaris 10', year: '2005', significance: 'Introduction magistrale de DTrace, ZFS, des Zones sécurisées et de la gestion de services automatiques (SMF).' },
      { name: 'Solaris 11', year: '2011', significance: 'Première version sous l\'égide d\'Oracle, orientée cloud computing d\'entreprise et virtualisation accrue.' }
    ]
  },
  {
    id: 'raspberry',
    name: 'Raspberry Pi OS',
    fullName: 'Raspberry Pi OS (anciennement Raspbian)',
    developer: 'Raspberry Pi Foundation & communauté Debian/Linux',
    launchYear: '2012',
    architects: ['Eben Upton', 'Mike Thompson', 'Peter Green'],
    kernel: 'Monolithic',
    kernelDetails: 'Basé sur le noyau Linux, hautement optimisé pour l\'architecture d\'instruction ARM RISC de petite taille et les ressources contraintes.',
    license: 'Open Source (GPL & autres)',
    fileSystems: ['ext4', 'ext3', 'FAT32'],
    architectureBasis: 'Debian GNU/Linux, ARM',
    summary: 'Le système d\'exploitation officiel monocarte qui a démocratisé l\'apprentissage de la programmation, l\'IoT, la robotique et le bidouillage matériel planétaire.',
    description: `Développé à l'origine en 2012 sous le nom indépendant de Raspbian par des bénévoles puis adopté officiellement par la Fondation Raspberry Pi d'Eben Upton, Raspberry Pi OS est une distribution Linux basée sur Debian, spécialement conçue pour les micro-ordinateurs monocartes de la gamme Raspberry Pi équipés de processeurs ARM (depuis les cœurs 32 bits initiaux jusqu'aux architectures 64 bits de pointe actuelles).

Il s'exécute le plus souvent depuis une simple carte mémoire MicroSD amovible et propose PIXEL (Pi Improved Xwindows Environment, Lightweight), un environnement de bureau graphique extrêmement économe en ressources basé sur Openbox et LXDE avec un look moderne, poli et chaleureux. C'est l'OS idéal des laboratoires d'écoles, de la domotique, de la robotique et du prototypage d'appareils intelligents grâce à un interfaçage matériel direct très facile.`,
    historicalSignificance: 'Il a réintroduit l\'esprit "pédagogie de la bidouille" hérité des ordinateurs 8 bits des années 80 dans les classes du monde entier, permettant d\'apprendre Linux, Python et l\'électronique sur un circuit disponible pour à peine 35 dollars.',
    keyInnovations: [
      'Environnement graphique PIXEL extrêmement fluide accéléré par le GPUBroadcom matériel',
      'Portage optimisé armhf prenant en compte les opérations en virgule flottante matérielle',
      'Intégration et dialogue direct avec les broches GPIO (General Purpose Input/Output) par script system et Python'
    ],
    anecdote: 'La fondation Raspberry Pi pensait initialement concevoir et écouler seulement 10 000 petites cartes dans les écoles britanniques pour inciter les élèves de lycée à s\'inscrire en informatique à l\'Université de Cambridge. Aujourd\'hui, plus de 45 millions d\'unités ont trouvé preneur !',
    color: 'pink',
    survivalExplanation: 'Le Raspberry Pi OS a garanti son insolite pérennité en couplant le noyau GNU/Linux Debian (réputé pour sa tolérance de brique en béton) aux micro-ordinateurs monocartes de la Fondation Raspberry Pi d\'Eben Upton. Grâce à une standardisation d\'interfaçage directe inégalée (les broches physiques GPIO de programmation d\'appareils) et un coût matériel dérisoire, il est devenu le socle hégémonique universel des laboratoires d\'écoles, de l\'apprentissage scolaire, de la domotique et des projets autonomes de l\'Internet des Objets (IoT).',
    versions: [
      { name: 'Raspbian Wheezy', year: '2012', significance: 'Première version finale officielle basée sur Debian 7.0 Wheezy avec support matériel ARMv6 d\'origine.' },
      { name: 'Raspbian Jessie', year: '2015', significance: 'Refonte basée sur Debian 8.0 Jessie, et introduction par défaut du système d\'initialisation standard systemd.' },
      { name: 'Raspbian Stretch / Bureau PIXEL', year: '2016-2017', significance: 'Lancement du magnifique environnement de bureau graphique PIXEL pour un rendu élégant, incluant RealVNC par défaut.' },
      { name: 'Raspberry Pi OS Buster', year: '2019', significance: 'Le système perd son nom de "Raspbian" pour devenir "Raspberry Pi OS". Prise en charge officielle de l\'architecture 64 bits et de la nouvelle carte Raspberry Pi 4.' },
      { name: 'Raspberry Pi OS Bookworm', year: '2023', significance: 'Basé sur Debian 12 Bookworm, transition intégrale du serveur d\'affichage classique X11 vers Wayland (via Wayfire) pour des graphismes ultra fluides.' }
    ]
  }
];

export const lineages: Lineage[] = [
  {
    id: 'unix-legacy',
    name: 'La Lignée UNIX & Dérivés Institutionnels',
    description: 'Systèmes de recherche et réseaux professionnels des années 1970/1980, basés sur le partage de temps, l\'accès multi-utilisateur et la philosophie du tout-fichier.',
    color: 'slate',
    icon: 'Terminal',
    rootNode: 'unix-bell',
    nodes: [
      { id: 'unix-bell', label: 'Research UNIX (Bell Labs)', year: '1969', type: 'ancestor', lineageId: 'unix-legacy', children: ['bsd-unix', 'system-v'], description: 'Créé originellement en assembleur puis réécrit en C par Ken Thompson et Dennis Ritchie aux laboratoires Bell.' },
      { id: 'bsd-unix', label: 'BSD UNIX (Berkeley)', year: '1977', type: 'group', lineageId: 'unix-legacy', children: ['sunos', 'nextstep'], description: 'Branche universitaire de Berkeley avec l\'intégration historique des protocoles TCP/IP pour Internet.' },
      { id: 'system-v', label: 'UNIX System V (AT&T)', year: '1983', type: 'group', lineageId: 'unix-legacy', children: ['solaris'], description: 'Version officielle commerciale d\'AT&T posant les bases des standards UNIX industriels.' },
      { id: 'sunos', label: 'SunOS (BSD base)', year: '1982', type: 'os', lineageId: 'unix-legacy', children: [], description: 'Système d\'exploitation de Sun Microsystems, orienté station de travail haute performance.' },
      { id: 'solaris', label: 'Solaris (System V base)', year: '1992', type: 'os', lineageId: 'unix-legacy', children: [], description: 'Fusion commerciale de SunOS avec la branche System V d\'AT&T.' },
      { id: 'nextstep', label: 'NeXTSTEP (Objective-C Match/BSD)', year: '1989', type: 'group', lineageId: 'unix-legacy', children: ['macos-modern'], description: 'Créé par NeXT (compagnie de Steve Jobs), combinant le micro-noyau Mach avec des abstractions BSD et une élégante interface orientée objet.' },
      { id: 'macos-modern', label: 'macOS (XNU / Modern Apple)', year: '2001', type: 'os', lineageId: 'unix-legacy', description: 'Né du rachat de NeXT par Apple, fusionnant NeXTSTEP à la structure interne d\'Apple.' }
    ]
  },
  {
    id: 'linux-ecosystem',
    name: 'La Lignée Libre & Collaboratrice (Linux)',
    description: 'Noyau open source écrit par Linus Torvalds en 1991, associé aux outils libres GNU pour former des systèmes indépendants hautement adaptables.',
    color: 'orange',
    icon: 'Cpu',
    rootNode: 'linux-kernel-p',
    nodes: [
      { id: 'linux-kernel-p', label: 'Noyau Linux 0.01 / GNU Projet', year: '1991', type: 'ancestor', lineageId: 'linux-ecosystem', children: ['slackware', 'debian', 'redhat'], description: 'Le noyau libre de Linus Torvalds fusionné avec la suite d\'utilitaires système du projet GNU par Richard Stallman.' },
      { id: 'slackware', label: 'Slackware Linux (La Vénérable)', year: '1993', type: 'os', lineageId: 'linux-ecosystem', children: [], description: 'Plus ancienne distribution Linux encore active, maintenant le respect scrupuleux des configurations Unix brutes.' },
      { id: 'debian', label: 'Debian GNU/Linux', year: '1993', type: 'os', lineageId: 'linux-ecosystem', children: ['ubuntu', 'raspberry'], description: 'Standard démocratique libre par excellence, inventeur de l\'archive logicielle .deb et du gestionnaire d\'installation apt.' },
      { id: 'redhat', label: 'Red Hat Enterprise Linux (RHEL)', year: '1994', type: 'os', lineageId: 'linux-ecosystem', children: ['fedora'], description: 'Pilier commercial de Linux en entreprise, inventeur du gestionnaire de paquets RPM.' },
      { id: 'ubuntu', label: 'Ubuntu (Canonical)', year: '2004', type: 'os-variant', lineageId: 'linux-ecosystem', children: ['mint'], description: 'Dérivé de Debian, il a rendu Linux accessible aux particuliers grâce à une interface préconfigurée polie.' },
      { id: 'fedora', label: 'Fedora Project', year: '2003', type: 'os-variant', lineageId: 'linux-ecosystem', description: 'Laboratoire d\'innovation rapide sponsorisé directement par Red Hat.' },
      { id: 'mint', label: 'Linux Mint', year: '2006', type: 'os-variant', lineageId: 'linux-ecosystem', description: 'Variante grand public de bureau moderne et traditionnelle dérivée d\'Ubuntu.' },
      { id: 'raspberry', label: 'Raspberry Pi OS (Raspbian)', year: '2012', type: 'os-variant', lineageId: 'linux-ecosystem', description: 'La distribution Debian la plus célèbre du monde embarqué, optimisée pour puces ARM et bidouilles GPIO.' }
    ]
  },
  {
    id: 'dos-windows-line',
    name: 'La Lignée CP/M, DOS et Microsoft Windows',
    description: 'De l\'informatique grand public sur micro-processeur 8 bits aux géants industriels de bureau 32/64 bits actuels.',
    color: 'blue',
    icon: 'Monitor',
    rootNode: 'cpm-anc',
    nodes: [
      { id: 'cpm-anc', label: 'CP/M (Gary Kildall)', year: '1974', type: 'ancestor', lineageId: 'dos-windows-line', children: ['msdos-orig'], description: 'Le premier système d\'exploitation universel pour micro-ordinateurs 8 bits (processeur Intel 8088), conçu par le chercheur Gary Kildall.' },
      { id: 'msdos-orig', label: 'MS-DOS (Tim Paterson / Microsoft)', year: '1981', type: 'os', lineageId: 'dos-windows-line', children: ['win-16bit'], description: 'Le système mono-utilisateur textuel standard qui propulse et démocratise le compatible IBM PC.' },
      { id: 'win-16bit', label: 'Windows (16-bits / 1.x-3.1)', year: '1985', type: 'group', lineageId: 'dos-windows-line', children: ['win-9x', 'win-nt-branch'], description: 'Enveloppe et gestionnaire d\'applications graphique pour le système d\'exploitation MS-DOS.' },
      { id: 'win-9x', label: 'Windows 9x (95, 98, ME)', year: '1995', type: 'os', lineageId: 'dos-windows-line', description: 'Système hybride 16/32-bits intégrant l\'ergonomie globale d\'un bureau moderne toujours bâti sur un sous-système DOS.' },
      { id: 'win-nt-branch', label: 'Windows NT (Lignée Moderne)', year: '1993', type: 'group', lineageId: 'dos-windows-line', children: ['win-xp-11'], description: 'Noyau d\'industrie écrit de zéro par Dave Cutler, doté d\'une immunité totale aux crashs mémoire.' },
      { id: 'win-xp-11', label: 'Windows XP / 10 / 11', year: '2001', type: 'os', lineageId: 'dos-windows-line', description: 'La fusion finale du grand public et du noyau NT sécurisé qui domine le marché de bureau actuel.' }
    ]
  },
  {
    id: 'alt-media-line',
    name: 'La Lignée Multimédia Alternative & Matériel Dédié',
    description: 'Architectures novatrices écrites de zéro pour exploiter des matériels uniques (puces customisées, multi-processeurs) sans le fardeau du passé.',
    color: 'purple',
    icon: 'Radio',
    rootNode: 'alt-root',
    nodes: [
      { id: 'alt-root', label: 'Architectures sur mesure des Années 80', year: '1983', type: 'ancestor', lineageId: 'alt-media-line', children: ['amiga-exec', 'atari-tos-node', 'beos-node'], description: 'L\'essor des micro-ordinateurs grand public équipés de processeurs Motorola 68000 et de coprocesseurs d\'accélération.' },
      { id: 'amiga-exec', label: 'AmigaOS (Kickstart & ROM Exec)', year: '1985', type: 'os', lineageId: 'alt-media-line', description: 'Un roi du traitement graphique et sonore préemptif multitâche d\'une rapidité insolente pour l\'époque.' },
      { id: 'atari-tos-node', label: 'Atari TOS / Bureau GEM', year: '1985', type: 'os', lineageId: 'alt-media-line', description: 'Gravé directement en ROM, doté d\'une vitesse de boot foudroyante et d\'une intégration MAO professionnelle.' },
      { id: 'beos-node', label: 'BeOS (Jean-Louis Gassée)', year: '1995', type: 'os', lineageId: 'alt-media-line', description: 'Écrit de zéro à l\'âge d\'or du format CD-ROM pour traiter en multi-thread massif la vidéo haute résolution.' }
    ]
  }
];

export const architectureData = {
  multitasking: [
    { name: 'Mono-tâche', value: 1, label: 'Un seul processus à la fois' },
    { name: 'Coopératif', value: 2, label: 'Les applications partagent volontairement le processeur' },
    { name: 'Préemptif', value: 3, label: 'Le système contrôle fermement l\'allocation de temps machine (Robuste)' }
  ],
  memoryProtection: [
    { name: 'Aucune', value: 1, label: 'Toute application peut écraser la mémoire d\'une autre' },
    { name: 'Basique', value: 2, label: 'Isolation simple ou segmentée' },
    { name: 'Totale (Matérielle/MMU)', value: 3, label: 'Mémoire virtuelle totalement sécurisée par processus (Anti-Crash)' }
  ]
};

export const forgottenOSList: ForgottenOS[] = [
  {
    id: 'philips-vg5000',
    name: 'Microsoft ROM BASIC (Philips VG5000)',
    machine: 'Philips VG5000',
    launchYear: '1984',
    developer: 'Philips / RTC (Conception matérielle) et Microsoft (ROM BASIC)',
    cpu: 'Zilog Z80A @ 4 MHz',
    ram: '16 Ko (extensible à 64 Ko)',
    osInterfaceType: 'Text / BASIC',
    summary: 'Le micro-ordinateur français des années 80 dont le système d\'exploitation était directement l\'interpréteur Microsoft BASIC.',
    detailedHistory: 'Lancé en 1984 sous la marque Philips, le VG5000 est un ordinateur conçu pour concurrencer les machines familiales anglaises et françaises (comme le Thomson MO5). Son "système d\'exploitation" est d\'une grande simplicité radicale, typique des architectures 8 bits de cette décennie : au démarrage, aucun disque dur ou interface graphique complexe ne se lance, mais un interpréteur BASIC de Microsoft gravé dans les 24 Ko de la mémoire ROM de la carte mère. C\'est cet interpréteur BASIC v1.0, adapté par Microsoft, qui gère tout à la fois : la saisie au clavier "gomme", l\'affichage de caractères semi-graphiques de 40 colonnes sur 25 lignes, la gestion des fichiers sur magnétophone à cassette externe, et l\'allocation de la mémoire vive (RAM) disponible de 16 Ko. Malgré un marketing axé sur la pédagogie et l\'apprentissage de la programmation à l\'école, le VG5000 fut pénalisé par des capacités graphiques très limitées et un clavier peu pratique, le poussant rapidement vers l\'oubli face au triomphe des Amstrad CPC et Thomson.',
    whyForgotten: 'La machine souffrait d\'une puce graphique semi-graphique obsolète (le processeur vidéo EF9345) incapable de gérér des graphismes bitmap complexes pour les jeux de divertissement. De plus, son clavier à touches en caoutchouc souple (touches dites "gomme") rendait la saisie de lignes de codes calvaireuse face à des concurrents mieux équipés.',
    anecdote: 'Le VG5000 bootait directement avec le fameux message "VG5000 BASIC V1.0  (C) 1984 MICROSOFT". L\'ordinateur ne disposait pas de processeur de sons dédié : pour émettre un bip sonore, l\'interpréteur BASIC sollicitait brièvement le microprocesseur Zilog Z80 pour qu\'il agite manuellement une membrane piezzo-électrique interne !',
    basicCommands: [
      { cmd: 'PRINT "HELLO VG5000"', out: 'HELLO VG5000\n\nOK' },
      { cmd: 'PRINT FRE(0)', out: '14316\n\nOK  (Affiche le nombre d\'octets de RAM libres pour programmer)' },
      { cmd: '10 FOR I=1 TO 5: PRINT "*";: NEXT I\nRUN', out: '*****\n\nOK' },
      { cmd: 'CLOAD "JEU"', out: 'LOADING JEU...\nFOUND: JEU\n\nOK  (Simule le chargement fastidieux d\'un programme depuis une cassette)' }
    ]
  },
  {
    id: 'thomson-basic',
    name: 'Moniteur ROM & Microsoft BASIC (Thomson MO5 / TO7)',
    machine: 'Thomson MO5 / TO7 / TO7-70',
    launchYear: '1982',
    developer: 'Thomson SIMIV (SMI)',
    cpu: 'Motorola 6809E @ 1 MHz',
    ram: '48 Ko (MO5), 24 Ko (TO7)',
    osInterfaceType: 'Text / BASIC',
    summary: 'Le fer de lance du légendaire programme français "Plan Informatique pour Tous" de 1985.',
    detailedHistory: 'Les ordinateurs Thomson MO5 et TO7 représentent l\'une des tentatives les plus audacieuses d\'alphabétisation informatique nationale. Conçus en France et construits d\'après l\'architecture puissante du processeur 8 bits Motorola 6809E, ils ne possédaient pas de système d\'exploitation de fichiers classique, mais un "Moniteur" ou "Éditeur" système en ROM, cohabitant de façon intime avec l\'interpréteur BASIC de Microsoft (baptisé BASIC 1.0). Ce moniteur en ROM gérait l\'initialisation matérielle au boot, l\'accès direct aux ports cartouches mémoires ("MEMO7"), la lecture audio des bandes magnétiques sur le "Lecteur de Cassette Thomson" et l\'affichage graphique de 320x200 pixels en 8 ou 16 couleurs avec de sévères contraintes de proximité de couleurs. C\'est l\'OS sur lequel toute une génération d\'écoliers français a appris l\'informatique en écrivant des instructions "GOTO" et en déplaçant un crayon optique sur l\'écran en verre.',
    whyForgotten: 'Limités par leur architecture 8 bits très spécifique et l\'absence de standardisation avec l\'IBM PC (qui a colonisé les bureaux), ces micros n\'ont pas survécu à la fin du réseau éducatif national pour lequel ils avaient été massivement optimisés.',
    anecdote: 'Le TO7 se distinguait par un logement supérieur accueillant des cartouches d\'extension logicielles matérielles et, de manière incroyable, un dispositif de "crayon optique" (Lightpen) connecté directement au châssis. Ce stylo détectait le passage du faisceau d\'électrons de la télévision cathodique permettant de cliquer sur l\'écran bien avant l\'avènement des écrans tactiles modernes !',
    basicCommands: [
      { cmd: 'COLOR 4,1\nPRINT "PLAN INFORMATIQUE POUR TOUS"', out: 'PLAN INFORMATIQUE POUR TOUS\n\nOK  (Écrit en caractères rouges sur fond bleu ciel d\'époque)' },
      { cmd: 'LOCATE 10,12: PRINT "M05 ROBUSTE"', out: '          M05 ROBUSTE\n\nOK' },
      { cmd: 'PLAY "DO-RE-MI"', out: 'OK  (Joue les trois notes sur le synthétiseur monophonique 1-bit interne)' }
    ]
  },
  {
    id: 'sinclair-qdos',
    name: 'Sinclair QDOS',
    machine: 'Sinclair QL (Quantum Leap)',
    launchYear: '1984',
    developer: 'Sinclair Research Ltd',
    cpu: 'Motorola 68008 @ 7.5 MHz',
    ram: '128 Ko (extensible à 640 Ko)',
    osInterfaceType: 'Hybrid CLI',
    summary: 'Un système d\'exploitation multitâche préemptif étonnamment en avance sur son temps, destiné aux professionnels mais ruiné par son support physique.',
    detailedHistory: 'Le Sinclair QL (Quantum Leap), lancé en 1984 par Sir Clive Sinclair, devait être la révolution de l\'informatique de bureau en proposant un processeur semi-16 bits Motorola 68008 et surtout un système d\'exploitation extraordinaire résidant en ROM : QDOS (Quick Disk Operating System), conçu principalement par Tony Tebby de Sinclair. QDOS offrait des choses inconcevables pour l\'époque dans cette gamme de prix : un multitâche préemptif complet en temps réel, une gestion de fenêtres multiples redimensionnables, et un interpréteur BASIC structuré ultra-puissant appelé "SuperBASIC". Chaque programme tournait de façon isolée sous forme de job système. Malheureusement, la machine subit d\'épouvantables retards de conception et, pire encore, utilisait comme support de stockage par défaut les terrifiants "Microdrives" : des cartouches de bande magnétique en boucle continue extrêmement fragiles qui tombaient en panne après quelques lectures, ruinant la crédibilité professionnelle du système.',
    whyForgotten: 'Le succès foudroyant de l\'IBM PC avec MS-DOS d\'un côté, et de l\'Apple Macintosh de l\'autre, a écrasé le Sinclair QL. De plus, l\'hostilité des utilisateurs professionnels envers la mauvaise fiabilité légendaire des cassettes Microdrive a scellé l\'arrêt de mort de la machine.',
    anecdote: 'Face au mépris officiel d\'IBM et d\'Apple, Sir Clive Sinclair fit livrer le tout premier ordinateur Sinclair QL directement au 10 Downing Street pour en faire cadeau personnel à la Première ministre britannique Margaret Thatcher comme fleuron de la haute technologie de sa Majesté !',
    basicCommands: [
      { cmd: 'JOBS', out: 'Job ID    Name          Priority\n0         SuperBASIC    1\n1         Editor_Job    16\n\n(Affiche l\'arbre des processus en cours d\'exécution dans ce noyau multitâche)' },
      { cmd: 'FORMAT mdv1_test', out: 'Formatting Microdrive 1...\nSector count: 212 / 215 OK  (Lance le formatage magnétique du Microdrive)' },
      { cmd: 'WINDOW 220,150,10,10 : BORDER 1', out: 'OK  (Redimensionne la fenêtre active de travail et dessine une bordure fine)' }
    ]
  },
  {
    id: 'commodore-geos',
    name: 'GEOS (Graphic Environment OS)',
    machine: 'Commodore 64 / 128 & Apple II',
    launchYear: '1986',
    developer: 'Berkeley Softworks',
    cpu: 'MOS Technology 6510 @ 1 MHz',
    ram: '64 Ko',
    osInterfaceType: 'Graphics GUI',
    summary: 'Le tour de force de faire tourner une interface graphique inspirée du Macintosh dans seulement 64 Ko de RAM.',
    detailedHistory: 'En 1986, le Commodore 64 est l\'ordinateur de salon le plus vendu au monde, mais il reste confiné à un écran d\'accueil textuel bleu foncé rustique. C\'est alors que la start-up Berkeley Softworks lance GEOS (Graphic Environment Operating System). C\'est un choc technologique absolu : sans ajouter la moindre barrette de RAM, GEOS transforme le Commodore 64 en un clone miniature du Macintosh d\'Apple. GEOS offre un bureau graphique complet manipulable à la souris (ou au joystick), une Corbeille, des menus déroulants, des icônes d\'outils, un gestionnaire thermique, et une suite de logiciels graphiques sensationnels d\'une légèreté folle : "geoWrite" (un traitement de texte WYSIWYG gérant de multiples polices de caractères lissées) et "geoPaint" (un outil de dessin libre). GEOS a été programmé avec un génie d\'optimisation en assembleur 6502 pur par Brian Dougherty et son équipe, en tirant parti du chargement dynamique d\'overlays logiciels en mémoire au besoin.',
    whyForgotten: 'La transition mondiale inéluctable vers les machines 16/32 bits équipées d\'au moins 1 Mo de RAM (comme l\'Atari ST, l\'Amiga, et les PC 286/386) a rendu obsolète l\'acrobatie technique d\'optimisation de GEOS sur des machines 8 bits aux ressources asphyxiées.',
    anecdote: 'GEOS est devenu si populaire qu\'il a été fourni en standard par Commodore avec toutes les cartouches d\'extensions de mémoire et les derniers modèles de Commodore 64C fabriqués. C\'est l\'un des rares systèmes d\'exploitation de tierce partie à avoir redonné une seconde jeunesse commerciale de 5 ans à un ordinateur déjà considéré comme dépassé par l\'industrie !',
    basicCommands: [
      { cmd: 'LOAD "GEOS",8,1', out: 'LOADING GEOS...\nREADY.\n\n(La commande magique pour écraser l\'interpréteur de code standard du C64 et booter le bureau graphique)' }
    ]
  },
  {
    id: 'bell-plan9',
    name: 'Plan 9 from Bell Labs',
    machine: 'Stations x86 / NeXT / SPARC',
    launchYear: '1992',
    developer: 'AT&T Bell Laboratories',
    cpu: 'Diverses architectures (Multiprocesseur portable)',
    ram: '8 Mo minimum',
    osInterfaceType: 'Hybrid CLI',
    summary: 'Le successeur académique conceptuel d\'UNIX poussant la philosophie des fichiers réseaux au firmament absolue.',
    detailedHistory: 'Créé au début des années 1990 par les concepteurs originels d\'UNIX eux-mêmes (Ken Thompson, Rob Pike, Dennis Ritchie) au sein des mythiques laboratoires Bell d\'AT&T, Plan 9 a été conçu pour résoudre les limites conceptuelles d\'UNIX à l\'ère des réseaux de données distribués. Le dogme de Plan 9 est simple : "Tout est un fichier", et tout est partagé à distance via un protocole réseau universel unique baptisé 9P. Sous Plan 9, non seulement vos disques durs sont des fichiers, mais vos fenêtres graphiques, votre processeur actif, votre carte d\'interface réseau, et vos connexions claviers le sont aussi. Une machine sans puissance peut importer le dossier "/proc" (processeur) d\'un supercalculateur distant et exécuter ses opérations de manière transparente. Bien qu\'il ait comporté des innovations fondamentales (comme l\'encodage universel UTF-8 ou le bus d\'affichage graphique 8½), Plan 9 est resté un projet trop académique, confidentiel et complexe pour détrôner UNIX devenu standardisé sous les traits de BSD et Linux.',
    whyForgotten: 'Trop en avance sur les débits réseaux réels de 1992 et trop universitaire dans son approche d\'administration complexe, Plan 9 a été étouffé par la montée en puissance de GNU/Linux qui reprenait un modèle UNIX plus traditionnel et facile à appréhender.',
    anecdote: 'Le nom de "Plan 9" fait explicitement référence au pire film de nanar de science-fiction de série B de l\'histoire du cinéma d\'Édouard Wood Jr : "Plan 9 from Outer Space" (1959). C\'est pour cela que la mascotte officielle du bureau Plan 9 est un lapin extraterrestre rose très facétieux nommé Glenda !',
    basicCommands: [
      { cmd: 'cat /net/tcp/status', out: 'srv01 10.0.0.1:80 established\nsrv02 10.0.0.1:443 established\n\n(Affiche l\'état matériel des sockets réseau directement représentés par de simples fichiers répertoires)' },
      { cmd: 'mount -a /srv/cloud_cpu /proc', out: 'Mounting remote computing power...\nOK  (Simule l\'importation transparente d\'un microprocesseur distant dans son propre arbre de processus local !)' }
    ]
  }
];

