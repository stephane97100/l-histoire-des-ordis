import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Music, Swords, Star, Info, HelpCircle, Trophy, RefreshCw, Cpu, HardDrive, Zap, Gauge, ChevronRight, Clock, Activity, Layers, Sliders, Percent } from 'lucide-react';

interface PearlItem {
  id: string;
  title: string;
  category: 'game' | 'app' | 'clash' | 'hardware';
  subtitle: string;
  launchYear: string;
  hardware: string;
  description: string;
  factSheet: {
    label: string;
    value: string;
  }[];
  whyLegendary: string;
  legacyImpact: string;
  quote: string;
}

const pearlsData: PearlItem[] = [
  {
    id: 'xenon-2',
    title: 'Xenon 2: Megablast',
    category: 'game',
    subtitle: 'L\'apothéose du Shoot \'em Up organique 16-bits',
    launchYear: '1989',
    hardware: 'Amiga 500 / Atari ST',
    description: "Créé par l'équipe mythique de 'The Assembly Line' et édité par les Bitmap Brothers, Xenon 2: Megablast est le shoot 'em up à défilement vertical qui a défini le genre esthétique de l'époque. Face à une invasion de bio-technologies extraterrestres rongeant l'univers, le joueur pilote le chasseur Megablaster dans un océan de graphismes métalliques et organiques d'une finesse inouïe. Le jeu est resté célèbre pour son marchand d'arme extraterrestre cynique, 'Colin', une tête de mollusque géante vendant des lasers et des boucliers thermiques dans son échoppe spatiale.",
    factSheet: [
      { label: "Développeur", value: "The Assembly Line / Bitmap Brothers" },
      { label: "Compositeur", value: "Bomb the Bass (David Simenon)" },
      { label: "Palette", value: "16 à 32 couleurs simultanées (EGA/OCS)" },
      { label: "Particularité", value: "Possibilité de reculer légèrement le défilement" }
    ],
    whyLegendary: "Xenon 2 a prouvé au monde que les micro-ordinateurs 16-bits pouvaient égaler, voire surpasser la sensation sonore et visuelle des salles d'arcade. Sa bande-son, un sample électronique retentissant du morceau 'Megablast (Hip Hop on Precinct 13)' de Bomb the Bass, jouait en boucle grâce à l'échantillonnage de la machine. C'est l'un des premiers mariages réussis entre culture de clubbing électronique et jeu vidéo de salon.",
    legacyImpact: "Il a introduit de nombreux concepts modernes d'upgrade d'armes permanents et a imposé le style visuel 'steampunk/biomécanique' qui a influencé des dizaines de titres ultérieurs. Il reste l'un des plus grands souvenirs nostalgiques d'Atari ST et d'Amiga.",
    quote: "\"I'm Colin, the bargain hunter's alien! Buy something or get out of my cockpit!\""
  },
  {
    id: 'indiana-jones',
    title: 'Indiana Jones (Lucasfilm Games)',
    category: 'game',
    subtitle: 'La perfection narrative sous le moteur SCUMM',
    launchYear: '1989 - 1992',
    hardware: 'Amiga 500 / Atari ST / IBM PC',
    description: "Avec 'Indiana Jones et la Dernière Croisade' (1989) suivit de l'incontestable chef-d'œuvre absolu 'Indiana Jones et le Mystère de l'Atlantide' (1992), Lucasfilm Games a offert au duo Atari / Amiga ses plus belles heures d'aventures intéractives. Fonctionnant sous le fabuleux moteur SCUMM (Script Creation Utility for Maniac Mansion), ces jeux de type Point & Click (Pointer et Cliquer) ont transposé la magie cinématographique de George Lucas directement sur nos écrans de bureau en remplaçant l'interanalyseur de texte par un système intuitif de verbes d'actions.",
    factSheet: [
      { label: "Éditeur", value: "Lucasfilm Games / LucasArts" },
      { label: "Moteur", value: "SCUMM (V3 et V5)" },
      { label: "Système de jeu", value: "Point & Click avec énigmes à embranchements" },
      { label: "Atlantide", value: "Trois voies uniques (Wits, Fists ou Team)" }
    ],
    whyLegendary: "Ces jeux ont réussi l'impossible : proposer un jeu qui surpasse en qualité narrative la logique de ses propres films. L'Atlantide proposait une richesse inédite pour l'époque : trois scénarios alternatifs différents selon que le joueur privilégie la réflexion, l'action physique ou l'entraide avec l'archéologue Sophia Hapgood. La musique MIDI dynamique s'accordait en temps réel avec l'intensité dramatique de la pièce parcourue.",
    legacyImpact: "Ce diptyque a cimenté les règles scénaristiques du jeu d'aventure moderne et a montré que le micro-ordinateur était le support idéal pour des histoires longues et adultes, bien loin des simples jeux de plateforme instantanés des consoles de salon du même âge.",
    quote: "\"Sophia, si je ne m'abuse, cet orichalque ressemble fort à ce que les anciens appelaient le souffle de Poséidon...\""
  },
  {
    id: 'cubase-atari',
    title: 'Cubase (Steinberg V1.0)',
    category: 'app',
    subtitle: 'Le logiciel qui a démocratisé la MAO mondiale',
    launchYear: '1989',
    hardware: 'Atari 1040 ST / STe',
    description: "Créé par Karl Steinberg et Manfred Rürup en Allemagne, Cubase V1.0 a terrassé le monde de la production musicale. En dotant l'Atari ST de fiches d'entrées et de sorties d'interface MIDI standardisées intégrées à même la carrosserie de plastique, Atari a permis à Steinberg de concevoir un séquenceur musical d'une précision diabolique. Cubase lisait et envoyait des données musicales numériques de notes à des synthétiseurs externes en temps réel, sans qu'aucune coûteuse carte son ne soit requise au préalable pour le home-studio.",
    factSheet: [
      { label: "Créateur", value: "Steinberg Media Technologies" },
      { label: "Interfaces", value: "Fiches MIDI IN, MIDI OUT d'office" },
      { label: "Résolution", value: "96 ticks par noire (précision d'horloge)" },
      { label: "Technologie", value: "MTR (Multi-Track Recorder) numérique" }
    ],
    whyLegendary: "La clé du succès réside dans l'architecture matérielle interne de l'Atari ST. Les ports MIDI étaient directement câblés sur le processeur Motorola 68000 via les lignes d'interruptions physiques de haute priorité. Le signal avait une gigue temporelle (jitter) quasi-nulle, garantissant que le rythme de la composition du batteur ou les accords au synthé ne souffraient d'aucun 'lag' perceptible, ce qui n'était pas possible sur Mac ou sur les PC clones de l'époque.",
    legacyImpact: "Cubase a fait de l'Atari le chouchou absolu des stars de la Synthpop, de la Techno et de la Dance de la décennie suivante. De Jean-Michel Jarre à Daft Punk, en passant par Fatboy Slim, Tangerine Dream, Mike Oldfield et de nombreux groupes de Grunge, tous ont composé des lignes mythiques sur un Atari ST monochrome branché à une pile d'expandeurs MIDI.",
    quote: "\"Power without the price... Atari ST et Cubase ont offert à chaque musicien de chambre la puissance d'un orchestre national.\""
  },
  {
    id: 'sound-blaster',
    title: 'La Saga Sound Blaster',
    category: 'hardware',
    subtitle: 'Comment Creative Labs a sorti le PC branché de son mutisme',
    launchYear: '1987 - 2010',
    hardware: 'Bus ISA / PCI, ordinateurs de bureau compatibles IBM PC',
    description: "Pendant de longues années, le PC de salon n'émettait que d'infâmes bips rudimentaires grâce au « PC Speaker » interne. Tout a commencé à changer lorsqu'en vue d'introduire du son réel dans le monde de l'informatique grand public, Creative Labs a sorti le PC de son mutisme historique en concevant en 1987 la carte Creative Music System (C/MS).\n\nLa norme audio planétaire pour PC a ensuite été définitivement créée en 1989, avec le lancement de la toute première carte son Sound Blaster 1.0 qui a déclenché le début de la révolution audio de salon.\n\nDepuis lors, Creative Labs a pris l’habitude d’émerveiller la communauté lors de chaque lancement Sound Blaster majeur :\n• Sound Blaster 16 (1992) a apporté un son authentique de qualité CD (16 bits / 44.1 kHz) aux jeux vidéo, offrant enfin une ambiance réaliste pour Alone in the Dark ou Doom.\n• Sound Blaster Live! (1998) a fait de l'audio numérique multicanal spatialisé une réalité grand public grâce au célèbre processeur d’effets environnementaux EMU10K1.\n• La série Audigy (2003) a érigé de nouveaux standards de jeu grâce au son surround 7.1 immersif, transformant les salles d'ordinateurs en véritables Home Cinémas spectaculaires.\n• Sound Blaster X-Fi Titanium HD (2010) a repoussé encore les limites du développement matériel sur le terrain d'excellence des audiophiles.",
    factSheet: [
      { label: "Créateur", value: "Creative Technology (Singapour)" },
      { label: "Puce mythique (1.0)", value: "Yamaha YM3812 (FM OPL2)" },
      { label: "Rapport S/B (X-Fi)", value: "Jusqu'à 122 dB (ultra audiophile)" },
      { label: "Technologies phares", value: "Synthèse FM, EAX 3D, ASIO 2.0" }
    ],
    whyLegendary: "La Sound Blaster a résolu le plus grand problème du PC d'époque : son incapacité à reproduire des enregistrements réels, de la voix parlée et des sons d'ambiance. En équipant les cartes d'un convertisseur analogique-numérique (DAC) et d'un port joystick/MIDI, Creative a unifié le son de jeu sous un seul pilote universel.",
    legacyImpact: "Elle a imposé la norme matérielle de l'audio PC. Compatible Sound Blaster est devenu l'autocollant requis sur tous les boîtiers de jeux Dos et d'ordinateurs pendant plus d'une décennie.",
    quote: "\"Compatible Sound Blaster : les trois mots magiques qui ont libéré les bruitages et la parole dans l'histoire des ordinateurs.\""
  },
  {
    id: 'cartes-graphiques',
    title: 'L\'Étoile des Cartes Graphiques',
    category: 'hardware',
    subtitle: 'Comment nous sommes passés d\'une mémoire de 1 Mo aux monstres modernes',
    launchYear: '1981 - Présent',
    hardware: 'CGA, VGA, SVGA, VLB, PCI, AGP, PCI-Express',
    description: "Dans les années 80 et au début des années 90, la mémoire des cartes graphiques s'exprimait en kilo-octets (Ko) : de 16 Ko sur le fragile adaptateur CGA à 256 Ko sur le révolutionnaire standard VGA (320x200 pixels en 256 couleurs).\n\nPasser à une carte graphique dotée de 1 Mo entier de mémoire vidéo (comme les célèbres puces Cirrus Logic ou Tseng Labs ET4000 de l'ère SVGA en 1992) représentait une apothéose absolue de finesse. Ce Mo de RAM permettait d'afficher Windows 3.1 en haute définition (1024x768 pixels) en 256 couleurs simultanées, ou du 800x600 pixels en 'High Color' (65 536 couleurs !).\n\nLe grand saut technologique s'est opéré en 1996 avec le lancement de la légendaire puce accélératrice de calcul 3D : la 3dfx Voodoo Graphics (4 Mo de mémoire EDO active). Auparavant, le processeur central (CPU) devait calculer lui-même, pixel par pixel, chaque polygone et tracé géométrique d'un jeu, provoquant une surcharge féroce. La 3dfx a externalisé ce calcul en matériel grâce à son fill-rate d'ombrages, ses filtres de lissage bilatéraux et sa mémoire tampon d'axes géométriques.",
    factSheet: [
      { label: "Standard VGA (1987)", value: "256 Ko de RAM unifiée" },
      { label: "Révolution SVGA (1992)", value: "1 Mo de VRAM (Haute résolution 2D)" },
      { label: "Saut 3D Voodoo (1996)", value: "Coproducesseur dédié, 3dfx Glide" },
      { label: "Ère Moderne (GPU)", value: "Des dizaines de Go (GDDR), calcul parallèle" }
    ],
    whyLegendary: "Au-delà de la simple quantité de RAM, le passage aux cartes graphiques intelligentes a redéfini le rôle de la carte vidéo : de simple convertisseur affichant une grille de pixels statiques, elle est devenue un microprocesseur parallèle autonome infiniment plus rapide que le CPU pour traiter des flots massifs de calculs matriciels.",
    legacyImpact: "Ce glissement architectural a mené au GPU moderne. Ces processeurs ne dessinent plus seulement des polygones de jeux vidéo, ils exécutent aujourd'hui en parallèle les milliards d'opérations matricielles qui propulsent la révolution de l'Intelligence Artificielle générative.",
    quote: "\"1 Mo de VRAM pour triompher de Windows, 4 Mo pour s'envoler en 3D avec 3dfx, et désormais des dizaines de Gigaoctets pour simuler la lumière physique en temps réel.\""
  },
  {
    id: 'puissance-processeurs',
    title: 'La Bataille Atomique des Processeurs',
    category: 'hardware',
    subtitle: 'La course féroce des fondeurs et pourquoi le gigachoc des MHz est devenu obsolète',
    launchYear: '1975 - Présent',
    hardware: 'Intel x86, Motorola, IBM PowerPC, DEC Alpha, SUN SPARC, AMD',
    description: "L'émergence des ordinateurs personnels a vu s'affronter les plus brillants concepteurs de silicium du globe. \n\n• Motorola régnait sur l'Atari ST, l'Amiga, et l'Apple Macintosh originel avec l'emblématique MC68000. Doté d'un jeu d'instructions particulièrement soigné et d'un adressage interne plat de 32 bits, ce processeur était le chouchou des hackers.\n• Intel, de son côté, a assis les bases de l'omniprésence x86 (8086, 286, 386, 486, puis Pentium) pour propulser l'océan infini des compatibles IBM PC.\n• AMD s'est positionné pour contrecarrer Intel avec des clones abordables alternatifs extrêmement combatifs, avant de signer son chef-d'œuvre : l'architecture K7 Athlon (1999) qui franchira la barre historique de 1 GHz (1000 MHz) avant Intel !\n• En dehors de ces mondes grand public, les géants du calcul scientifique et professionnel régnaient. DEC (Digital Equipment Corporation) créait la légendaire puce Alpha, le processeur RISC pur le plus rapide de son époque. SUN Microsystems déployait l'architecture ultrasolide SPARC au cœur des stations géantes de CAO industrielle, alors qu'IBM guidait l'alliance d'Apple et Motorola autour du processeur PowerPC.\n\nPourquoi la course aux Megahertz (MHz) est aujourd'hui obsolète au profit de la RAM ?\nPendant des décennies, doubler la fréquence d'horloge physique d'une puce (passer de 33 MHz à 66 MHz) doublait immédiatement la vitesse d'exécution de vos programmes. Mais vers le début des années 2000, l'industrie a buté sur le « Mur de la Mémoire » (Memory Wall). \n\nAlors que les CPUs apprenaient à tourner à 3, puis 4 gigahertz (milliards de cycles par seconde), la mémoire RAM physique restait incapable de transporter les octets à une telle cadence d'horloge à travers la carte mère sans surchauffe. Résultat ? Votre super processeur passe désormais plus de 90 % de son temps inactif, à attendre désespérément d'être approvisionné en données depuis les puces de RAM lointaines.\n\nC'est pourquoi la vitesse de fréquence brute d'horloge n'est plus la priorité. L'efficacité moderne dépend de la quantité de RAM, de son débit intrinsèque, de la gestion intelligente de caches ultra-rapides intégrés à la puce (L1, L2, L3) agissant comme des tampons de proximité, et du partage de l'effort géométrique sur de multiples cœurs parallèles à basse tension.",
    factSheet: [
      { label: "Motorola 68000", value: "Registres polyvalents 32 bits, la perle de la 2D" },
      { label: "Intel vs AMD", value: "Bagarre mythique x86 (Athlon, Ryzen64, Threadripper)" },
      { label: "DEC Alpha & SUN", value: "Seigneurs du processeur RISC professionnel de calcul" },
      { label: "Le Goulot de la RAM", value: "Le goulot d'étranglement qui a tué la course au Hz magique" }
    ],
    whyLegendary: "Cette rivalité herculéenne entre l'approche d'architecture CISC (jeu d'instructions vaste, incarné par Intel) et RISC (instructions réduites optimisées) a abouti au meilleur des deux mondes : les x86 actuels traduisent en interne leurs instructions complexes en micro-opérations de type RISC décuplant l'efficacité opérationnelle.",
    legacyImpact: "Ce passage du Hz pur vers l'efficience mémorielle et la décharge de trafic d'interconnexion a donné naissance aux puces modernes ultra-optimisées de type ARM, ou Apple Silicon, où processeur et mémoire RAM vivent collés l'un à l'autre sur la même plaque de silicium.",
    quote: "\"Le processeur le plus rapide ne sert à rien s'il meurt de faim en attendant de recevoir ses données mémorisées dans la RAM.\""
  },
  {
    id: 'atari-vs-amiga',
    title: 'Amiga VS Atari ST',
    category: 'clash',
    subtitle: 'La guerre fratricide des microprocesseurs MC68000',
    launchYear: '1985 - 1993',
    hardware: 'Commodore Amiga (500, 1000) vs Atari (520ST, 1040ST)',
    description: "C'est l'une des guerres de clocher les plus hargneuses et créatives de toute l'histoire technologique. Pendant près d'une décennie, deux communautés de 'hackers', de dessinateurs et de programmeurs se sont affrontées de manière acharnée. D'un côté, l'Atari ST (conçu par les équipes de Jack Tramiel échappé de Commodore) offrant un ordinateur puissant, bon marché, et idéal pour la musique monochrome. De l'autre, le Commodore Amiga (chef-d'œuvre de Jay Miner) doté de processeurs spécialisés (Agnus, Denise, Paula) capables de prouesses d'animations et de traitements sonores à couper le souffle.",
    factSheet: [
      { label: "Camp Atari", value: "Précision MIDI, moniteur monochrome haute def, bas prix" },
      { label: "Camp Amiga", value: "Coprocesseurs vidéo (Blitter, Copper), son stéréo 4 voies Paula" },
      { label: "Jeux sortis", value: "Des milliers de disquettes piratées s'échangeant sous le manteau" },
      { label: "Culture démo", value: "La naissance de la Demo Scene (cracks intros et prouesse ASM)" }
    ],
    whyLegendary: "Ce combat permanent a stimulé l'excellence technique. Les hackers apprenaient l'assembleur Motorola 68000 pour pressurer les registres des puces graphiques au-delà des spécifications constructeur. C'est grâce à cette rivalité que sont nés l'art du tracking audio (.MOD sur Amiga) et le défilement fluide multi-parallaxe horizontal dans les jeux.",
    legacyImpact: "L'affrontement s'est éteint brusquement au milieu de la décennie 90 avec la faillite successive de Commodore (1994) et le démantèlement d'Atari. Aujourd'hui, cette guerre est considérée comme l'âge d'or originel de la créativité numérique amateur pré-Internet.",
    quote: "\"Les Amigaïstes se moquaient des sons étouffés du haut-parleur Atari, tandis que les Ataristes raillaient la lenteur du système graphique de l'Amiga sans moniteur digne de ce nom...\""
  }
];

export default function AncientPearlsView() {
  const [activeTab, setActiveTab ] = useState<'all' | 'game' | 'app' | 'clash' | 'hardware'>('all');
  const [selectedPearlId, setSelectedPearlId] = useState<string>(pearlsData[0].id);

  const filteredPearls = pearlsData.filter(
    item => activeTab === 'all' || item.category === activeTab
  );

  const activePearl = pearlsData.find(item => item.id === selectedPearlId) || pearlsData[0];

  const getPearlBadgeColor = (category: string) => {
    switch (category) {
      case 'game': return 'bg-emerald-950/40 text-emerald-300 border-emerald-900/40';
      case 'app': return 'bg-indigo-950/40 text-indigo-300 border-indigo-900/40';
      case 'clash': return 'bg-amber-950/40 text-amber-300 border-amber-900/40';
      case 'hardware': return 'bg-blue-950/40 text-blue-300 border-blue-900/40';
      default: return 'bg-zinc-900 text-zinc-300';
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-6 text-left" id="ancient-pearls-panel">
      
      {/* Tab Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-600 to-amber-600 flex items-center justify-center shadow-lg">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">Les Anciennes Perles Logicielles & Matérielles</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Xenon 2, la révolution Cubase, Sound Blaster, la folie des GPU et la course mythique aux mégahertz.</p>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono text-left md:text-right">
          <span>CATALOGUE : TRÉSORS ET ÉFFONDREMENTS DU SILICIUM</span>
        </div>
      </div>

      {/* RIVALRY AND FALL ESSAY ROW */}
      <div className="bg-gradient-to-r from-red-950/20 via-orange-950/15 to-amber-950/20 border border-amber-500/20 rounded-xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚔️</span>
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
            Atari vs Amiga : Pourquoi ont-ils totalement disparu à l'ère moderne ?
          </h4>
        </div>
        
        <p className="text-xs text-zinc-300 leading-relaxed text-justify font-sans">
          Malgré des catalogues comptant <strong>des milliers de chefs-d'œuvre ludiques et créatifs</strong> développés par des générations d'adolescents en chambre, l'architecture Atari ST et Commodore Amiga s'est subitement effondrée au milieu des années 90, terrassée par deux vagues concurrentes foudroyantes : 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="space-y-1.5 bg-black/40 p-4 border border-white/[0.04] rounded-lg">
            <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider block">1. L'Assaut des Consoles de Salon</span>
            <p className="text-[11px] text-zinc-400 text-justify leading-relaxed">
              Des machines comme la <strong>Nintendo NES</strong>, la <strong>Sega Master System</strong>, puis de façon encore plus flagrante la <strong>Super NES</strong> et la <strong>Megadrive</strong> ont capturé le marché du jeu pur. En éliminant les temps de chargement de disquettes pénibles et les configurations complexes d'écrans grâce à un modèle plug-and-play instantané et peu onéreux, les consoles ont détrôné l'usage du micro-ordinateur familial pour les enfants.
            </p>
          </div>

          <div className="space-y-1.5 bg-black/40 p-4 border border-white/[0.04] rounded-lg">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">2. Le clone PC IBM modulaire</span>
            <p className="text-[11px] text-zinc-400 text-justify leading-relaxed">
              Pendant que Commodore et Atari conservaient des configurations figées et closes, le standard <strong>PC compatible</strong> est devenu une immense industrie ouverte d'assemblage. L'apparition de cartes graphiques <strong>VGA à 256 couleurs</strong>, de cartes sonores <strong>Sound Blaster</strong> indépendantes et surtout des microprocesseurs Intel 386 puis 486 a permis au PC d'évoluer de mois en mois. L'Atari et l'Amiga se sont fait dépasser techniquement de plein fouet.
            </p>
          </div>

          <div className="space-y-1.5 bg-black/40 p-4 border border-white/[0.04] rounded-lg">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">3. L'incapacité de gestion d'entreprise</span>
            <p className="text-[11px] text-zinc-400 text-justify leading-relaxed">
              Atari et Commodore ont été minés par une mauvaise gestion stratégique désastreuse. Commodore a été incapable de rentabiliser sa puce de nouvelle génération (AAA) et de s'attaquer au secteur du bureau professionnel. Atari a tenté vainement de sauter l'étape ultime de la 2D pour lancer sa console 64-bits Jaguar, un échec industriel cinglant qui précipitera sa dissolution financière fin 1996.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE COMPONENT SHIFT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Side Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex border-b border-white/[0.06] pb-1.5 gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-xs px-2.5 py-1.5 rounded-md font-semibold cursor-pointer transition-all ${
                activeTab === 'all' ? 'bg-[#18181b] text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`text-xs px-2.5 py-1.5 rounded-md font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === 'game' ? 'bg-[#18181b] text-emerald-400 border border-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Jeux
            </button>
            <button
              onClick={() => setActiveTab('app')}
              className={`text-xs px-2.5 py-1.5 rounded-md font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === 'app' ? 'bg-[#18181b] text-indigo-400 border border-indigo-500/10' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              Apps & MAO
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`text-xs px-2.5 py-1.5 rounded-md font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === 'hardware' ? 'bg-[#18181b] text-blue-400 border border-blue-500/10' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              Matériel
            </button>
            <button
              onClick={() => setActiveTab('clash')}
              className={`text-xs px-2.5 py-1.5 rounded-md font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === 'clash' ? 'bg-[#18181b] text-amber-400 border border-amber-500/10' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              Rivalité
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[380px] pr-1 scrollbar-thin select-none">
            {filteredPearls.map((item) => {
              const isSelected = item.id === selectedPearlId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPearlId(item.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#18181b] border-amber-500/35 text-white shadow-md'
                      : 'bg-[#0c0c0e]/30 border-white/[0.04] hover:bg-[#121215] text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{item.title}</span>
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded border ${getPearlBadgeColor(item.category)}`}>
                      {item.category === 'game' ? 'JEU' : item.category === 'app' ? 'MAO' : item.category === 'clash' ? 'RIVALITÉ' : 'MATÉRIEL'}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1 truncate">
                    {item.subtitle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Info Display */}
        <div className="lg:col-span-8 bg-[#121215] border border-white/[0.05] rounded-xl p-5 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activePearl.id}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.16 }}
              className="space-y-4"
            >
              
              {/* Header Title Information */}
              <div className="space-y-1 block">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono font-bold bg-amber-950/40 text-amber-300 border border-amber-900/40 rounded px-1.5 py-0.5">
                    PERIODE : {activePearl.launchYear}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 bg-black/40 border border-white/[0.06] rounded px-1.5 py-0.5">
                    Modèle de référence : {activePearl.hardware}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">{activePearl.title}</h4>
                <p className="text-xs text-amber-400 font-semibold italic">{activePearl.subtitle}</p>
              </div>

              {/* Core Description narration */}
              <p className="text-xs text-zinc-300 leading-relaxed text-justify whitespace-pre-line bg-black/10 p-3 rounded-lg border border-white/[0.02]">
                {activePearl.description}
              </p>

              {/* Dual grid highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Fact metrics sheet */}
                <div className="bg-[#09090b]/80 border border-white/[0.04] p-3.5 rounded-lg space-y-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                    📜 COMPOSANTES / ARCHIVES ClÉS
                  </span>
                  <div className="space-y-1.5">
                    {activePearl.factSheet.map((met, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] border-b border-white/[0.03] pb-1 gap-2">
                        <span className="text-zinc-500 font-medium whitespace-nowrap">{met.label}</span>
                        <span className="text-zinc-300 font-semibold text-right">{met.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Legendary */}
                <div className="bg-amber-950/10 border border-amber-900/15 p-3.5 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    ⭐️ COMPORTEMENT & IMPACT PATRIMOINE
                  </span>
                  <p className="text-[11px] text-zinc-300 leading-relaxed text-justify">
                    {activePearl.whyLegendary}
                  </p>
                </div>
              </div>

              {/* Legacy and Impact footer section */}
              <div className="bg-[#0a0a0c] border border-white/[0.06] p-3.5 rounded-xl space-y-1 relative">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                  🚀 SIGNATURE HISTORIQUE
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                  {activePearl.legacyImpact}
                </p>
              </div>

              {/* Quote card */}
              <div className="border-l-2 border-amber-500/85 pl-3.5 italic text-xs text-amber-200/90 py-1.5 font-sans bg-amber-500/[0.02] rounded-r-lg">
                {activePearl.quote}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Visual Divider separator */}
      <div className="border-t border-white/[0.06] pt-8" />

      {/* Integrated Processor Wars & Memory Wall Interactive Dashboard */}
      <ProcessorWarSection />

    </div>
  );
}

// ==========================================
// INTERACTIVE PROCESSOR COMPARATOR & MEMORY WALL SECTION
// ==========================================

interface ProcessorArchitecture {
  id: string;
  name: string;
  philosophy: 'CISC' | 'RISC' | 'Hybride';
  philosophyExpl: string;
  creator: string;
  iconText: string;
  flagshipCPUs: string;
  maxSpeedEra: string;
  primaryUsage: string;
  keyFeature: string;
  description: string;
  registerModel: string;
  color: string;
  badgeBg: string;
}

const processorsData: ProcessorArchitecture[] = [
  {
    id: 'intel',
    name: 'Intel x86',
    philosophy: 'CISC',
    philosophyExpl: 'Complex Instruction Set Computer : Un jeu d\'instructions riches de longueurs variables, conçu à l\'origine pour stocker de lourds programmes dans très peu de mémoire physique.',
    creator: 'Intel Corporation',
    iconText: 'x86',
    flagshipCPUs: 'Intel 80386, Pentium, Core i9',
    maxSpeedEra: '4.77 MHz (1978) à plus de 5.5 GHz (moderne)',
    primaryUsage: 'Compatibles IBM PC, serveurs d\'entreprise et Cloud, bureautique universelle',
    keyFeature: 'Microcode interne complexe et rétrocompatibilité matérielle absolue d\'une génération à l\'autre.',
    description: "L'épine dorsale de l'informatique moderne. Basé sur le modèle CISC, ses instructions d'origine minimisaient l'empreinte mémoire alors que la RAM coûtait une fortune. Pour rester compétitif face au RISC dans les années 95, Intel a conçu un décodeur interne traduisant à la volée ces instructions x86 complexes en micro-opérations RISC ultra-rapides.",
    registerModel: 'Registres segmentés et adressages relatifs (AX, BX, CX, DX) cumulables',
    color: 'from-blue-600 to-sky-500',
    badgeBg: 'bg-blue-950/40 text-blue-300 border-blue-900/40'
  },
  {
    id: 'motorola',
    name: 'Motorola 68000',
    philosophy: 'CISC',
    philosophyExpl: 'Complex Instruction Set Computer : Jeu d\'instructions orthogonal et régulier. Les données et adresses sont traitées de manière hautement logique, sans segmentation.',
    creator: 'Motorola',
    iconText: '68000 / m68k',
    flagshipCPUs: 'MC68000, MC68030, MC68060',
    maxSpeedEra: '7.16 MHz (Amiga 500) à 100 MHz (fin d\'ère)',
    primaryUsage: 'Commodore Amiga, Atari ST, Apple Macintosh 128k, Sega Megadrive',
    keyFeature: 'Espace d\'adressage plat de 32 bits natif facilitant énormément l\'écriture de code graphique direct.',
    description: "Le processeur légendaire apprécié des virtuoses de la démo scene et du hack en assembleur. Contrairement aux segments hachés du 8086 d'Intel, le 68000 de Motorola offrait un traitement linéaire limpide. Facile à manipuler en assembleur pur, c'était le compagnon rêvé des puces graphiques de l'Amiga pour orchestrer les parallaxes en temps réel.",
    registerModel: '8 registres de données (D0-D7) et 8 registres d\'adresse (A0-A7) génériques de 32 bits',
    color: 'from-pink-600 to-rose-500',
    badgeBg: 'bg-pink-950/40 text-pink-300 border-pink-900/40'
  },
  {
    id: 'ibm',
    name: 'IBM PowerPC',
    philosophy: 'RISC',
    philosophyExpl: 'Reduced Instruction Set Computer : Instructions simplifiées de taille rigoureusement fixe (32 bits), s\'exécutant presque toutes d\'office en un unique cycle d\'horloge.',
    creator: 'Alliance AIM (Apple, IBM, Motorola)',
    iconText: 'PPC',
    flagshipCPUs: 'PowerPC 601, G3, G4, G5',
    maxSpeedEra: '50 MHz (1993) à 2.5 GHz (2005)',
    primaryUsage: 'Apple Power Macintosh, Xbox 360, PlayStation 3, Wii',
    keyFeature: 'Moteur d\'exécution superscolaire capable de traiter jusqu\'à 3 instructions en parallèle.',
    description: "Créé par l'union sacrée d'Apple, IBM et Motorola pour détrôner le duopole 'Wintel' (Windows/Intel). Très en avance sur son temps, le PowerPC offrait une puissance de calcul brute par cycle supérieure aux x86 d'Intel. Il a fini par capituler en 2005 car l'enveloppe thermique requise par sa vitesse de calcul empêchait son intégration dans les nouveaux ordinateurs portables Mac de poche.",
    registerModel: '32 registres généraux de 32/64 bits indépendants du bus d\'adresse',
    color: 'from-purple-600 to-indigo-500',
    badgeBg: 'bg-purple-950/40 text-purple-300 border-purple-900/40'
  },
  {
    id: 'dec',
    name: 'DEC Alpha',
    philosophy: 'RISC',
    philosophyExpl: 'Reduced Instruction Set Computer : Architecture 64-bits ultra-pure, axée sur l\'élimination absolue de tout ralentissement de pipeline pour battre des records de fréquence.',
    creator: 'Digital Equipment Corp.',
    iconText: 'Alpha',
    flagshipCPUs: 'Alpha 21064, Alpha 21264',
    maxSpeedEra: '150 MHz (1992) à 1.4 GHz (2001)',
    primaryUsage: 'Supercalculateurs scientifiques, serveurs de calcul intense et d\'imagerie 3D',
    keyFeature: 'Premier microprocesseur 64-bits pur d\'exception commerciale du monde.',
    description: "Le DEC Alpha était la Rolls-Royce des processeurs des années 90, conçu sans concession budgétaire. Ses créateurs ont misé sur l'exécution spéculative des instructions et un silicum haut de gamme pour décrocher la couronne de la puce la plus véloce de l'histoire durant une décennie entière, réputée pour ses performances ahurissantes sur le calcul matriciel.",
    registerModel: 'Registres natifs larges de 64 bits et coprocesseurs mathématiques intégrés',
    color: 'from-emerald-600 to-teal-500',
    badgeBg: 'bg-emerald-950/40 text-emerald-300 border-emerald-900/40'
  },
  {
    id: 'sun',
    name: 'SUN SPARC',
    philosophy: 'RISC',
    philosophyExpl: 'Reduced Instruction Set Computer : Un design conçu spécialement pour maximiser la vitesse des environnements réseau multi-utilisateurs et grands serveurs d\'entreprises.',
    creator: 'Sun Microsystems / Fujitsu',
    iconText: 'SPARC',
    flagshipCPUs: 'microSPARC, SuperSPARC, UltraSPARC',
    maxSpeedEra: '20 MHz (1987) à plus de 4.2 GHz (moderne)',
    primaryUsage: 'Stations de travail Unix de recherche, bases de données critiques d\'envergure',
    keyFeature: 'Le système ingénieux de fenêtres de registres physiques empilées en matériel.',
    description: "L'architecture qui a propulsé l'âge d'or des systèmes SunOS/Solaris. Pour effacer la latence lors du passage d'arguments entre fonctions logicielles, SPARC incluait un anneau physique de registres s'ouvrant et se décalant dynamiquement pour offrir les paramètres instantanément en silicium, sans passer par la mémoire RAM lente.",
    registerModel: 'Fenêtres glissantes (Register Windows) de 128+ registres physiques d\'horodatage',
    color: 'from-cyan-600 to-sky-500',
    badgeBg: 'bg-cyan-950/40 text-cyan-300 border-cyan-900/40'
  },
  {
    id: 'amd',
    name: 'AMD x86-64',
    philosophy: 'Hybride',
    philosophyExpl: 'CISC / RISC Hybride : Une exécution interne ultra-découpée de type RISC pour exécuter le riche héritage d\'instructions x86 CISC.',
    creator: 'Advanced Micro Devices',
    iconText: 'AMD',
    flagshipCPUs: 'AMD K7 Athlon, Opteron, Ryzen',
    maxSpeedEra: '40 MHz (1991) à plus de 5.7 GHz (moderne)',
    primaryUsage: 'PC de jeux, serveurs d\'infrastructure cloud et calcul distribué moderne',
    keyFeature: 'Conception de l\'architecture x86-64 permettant d\'adresser plus de 4 Go de RAM en 64 bits.',
    description: "AMD s'est imposé comme un titan en franchissant en premier le cap du Gigahertz avec l'Athlon en 1999 (K7), humiliant Intel. AMD a ensuite sauvé le standard x86 en brevetant l'extension 64-bits 'AMD64' adoptée aujourd'hui par l'ensemble des puces PC du monde, prouvant la supériorité de sa recherche en conception de pipeline.",
    registerModel: '16 registres polyvalents 64 bits à usage universel et extensions de vectorisation',
    color: 'from-orange-600 to-amber-500',
    badgeBg: 'bg-orange-950/40 text-orange-300 border-orange-900/40'
  }
];

const timelineEpochs = [
  {
    epoch: "1980 - 1988",
    title: "L'Âge de l'Unisson",
    ratioText: "CPU et RAM synchrones",
    stats: "Fréquence : 4 à 16 MHz | RAM : 100 à 150 ns",
    explanation: "Dans les années 80, un processeur à 8 MHz exécutait une instruction toutes les 125 nanosecondes. Les puces de mémoire RAM de l'époque étaient parfaitement capables de délivrer les octets requis à cette même vitesse. Aucune mémoire cache n'était nécessaire : le processeur tournait « à l'unisson » direct avec la mémoire externe. L'efficacité des cycles d'horloge était de 100%.",
    consequence: "Rapport de force idéal mais vitesses modestes. Idéal pour débuter mais limitant pour l'écriture de programmes lourds."
  },
  {
    epoch: "1989 - 1998",
    title: "L'Envolée Asynchrone",
    ratioText: "Le CPU prend le large",
    stats: "Fréquence : 33 à 300 MHz | RAM : 60 ns (EDO / SDRAM)",
    explanation: "Les usines de gravure de silicium parviennent à décupler la fréquence du microprocesseur grâce à des puces de plus en plus miniaturisées. Mais la RAM, dont l'accès électrique dépend de matrices de condensateurs analogiques complexes, progresse très lentement. Pour éviter que le CPU ne passe sa vie à attendre la RAM, les fondeurs créent la mémoire cache L1 (quelques Ko intégrés dans le processeur) puis la cache L2 pour précharger et stocker les données répétitives.",
    consequence: "Le CPU commence à être plus rapide que la carte mère. L'asynchronie fait ses premiers ravages."
  },
  {
    epoch: "1999 - 2004",
    title: "Le Mur de la Mémoire",
    ratioText: "Le grand choc thermique du MHz",
    stats: "Fréquence : 1 GHz à 3.8 GHz | RAM : DDR-400 (200 MHz)",
    explanation: "Les constructeurs se lancent dans une course marketing frénétique et absurde au Gigahertz (GHz). La fréquence d'horloge est multipliée par 1000, mais la RAM ne progresse que d'un facteur 10. Les processeurs comme le Pentium 4 atteignent une barrière physique insurmontable : le « Memory Wall ». À 3.4 GHz, la puce passe plus de 80% de son temps totalement inactive à poireauter, attendant désespérément d'être approvisionnée par la RAM. Mettre plus de MHz ne sert plus à rien : c'est un moteur de formule 1 bloqué dans un bouchon routier.",
    consequence: "La course aux Mégahertz brut s'arrête brusquement. Mort de l'architecture excessivement gourmande d'Intel."
  },
  {
    epoch: "2005 - Présent",
    title: "L'Ère de l'Intelligence Intégrée",
    ratioText: "Largeur de bande et multicœurs",
    stats: "Fréquence : Stable à 3.5 - 5.0 GHz | RAM : DDR5, Caches 3D Stacked, Unified Memory",
    explanation: "Faute de pouvoir accélérer le temps de réponse brut de la RAM, l'industrie pivote radicalement. On arrête d'augmenter le MHz brut pour ne pas surchauffer les puces. On multiplie plutôt les cœurs de calcul (dual, quad, octa-cores) partageant l'effort. On intègre des caches gigantesques (jusqu'à 96 Mo de cache 3D V-Cache chez AMD), et on rapproche physiquement la RAM du CPU : c'est l'unification mémoire (SoC Apple Silicon M-series ou de serveurs) où processeur et mémoire partagent la même plaque de circuits imprimés, offrant des bandes passantes herculéennes de plus de 400 Go/s.",
    consequence: "L'abondance de RAM à très haut débit et l'optimisation des caches ont définitivement enterré la course aux MHz bruts."
  }
];

function ProcessorWarSection() {
  const [activeTab, setActiveTab] = useState<'compare' | 'timeline' | 'simulator'>('compare');
  const [selectedCpuId, setSelectedCpuId] = useState<string>('intel');
  const [cpuFreq, setCpuFreq] = useState<number>(1000); // 1000 MHz
  const [ramFreq, setRamFreq] = useState<number>(133); // 133 MHz
  const [selectedTimelineEpoch, setSelectedTimelineEpoch] = useState<number>(2); // Default to 1999-2004

  const activeCpu = processorsData.find(c => c.id === selectedCpuId) || processorsData[0];
  const activeEpoch = timelineEpochs[selectedTimelineEpoch];

  // Dynamic calculations for the bottleneck simulator
  const ratio = cpuFreq / ramFreq;
  let waitStatesObj = {
    waitCycles: 0,
    efficiency: 100,
    statusText: '',
    statusColor: 'text-emerald-400 border-emerald-900/40 bg-emerald-950/20',
    barColor: 'bg-emerald-500',
    diag: '',
  };

  if (ratio <= 1.25) {
    waitStatesObj = {
      waitCycles: 0,
      efficiency: 100,
      statusText: 'PROCESSEUR SYNCHRONE (Idéal)',
      statusColor: 'text-emerald-400 border-emerald-900/40 bg-emerald-950/20',
      barColor: 'bg-emerald-500',
      diag: "Harmonie absolue ! Le processeur et la mémoire RAM tournent à des rythmes similaires. Le CPU ne gaspille aucun cycle d'horloge à attendre (Wait States = 0). C'est le comportement typique de l'ère du micro-ordinateur 8-bits et début 16-bits (Atari, Amiga, PC XT/AT). Bien que la puissance globale reste basse, l'efficacité matérielle est de 100%.",
    };
  } else if (ratio < 4) {
    const cycleLoss = Math.round(ratio - 1);
    const eff = Math.round(100 / (1 + cycleLoss * 0.25));
    waitStatesObj = {
      waitCycles: cycleLoss,
      efficiency: eff,
      statusText: 'ASYNCHRONICITÉ MODÉRÉE',
      statusColor: 'text-yellow-400 border-yellow-900/40 bg-yellow-950/15',
      barColor: 'bg-yellow-500',
      diag: `Le processeur tourne plus vite que la mémoire RAM. Pour compenser ce retard de ${cycleLoss} cycle(s), le processeur doit faire de micro-pauses régulières. C'est l'époque du 486 DX2 et des premiers Pentium où l'introduction des mémoires caches de niveau 1 (L1 cache) permet de masquer une grande partie de ce retard en préchargeant les jeux d'instructions récurrents.`,
    };
  } else if (ratio < 12) {
    const cycleLoss = Math.round(ratio - 1);
    const eff = Math.round(100 / (1 + cycleLoss * 0.45));
    waitStatesObj = {
      waitCycles: cycleLoss,
      efficiency: eff,
      statusText: "GOULOT D'ÉTRANGLEMENT CRITIQUE",
      statusColor: 'text-orange-400 border-orange-900/40 bg-orange-950/20',
      barColor: 'bg-orange-500',
      diag: `Asynchronie marquée ! Le processeur accomplit ${Math.round(ratio)} cycles d'horloge pour un seul bus de RAM. Le processeur perd fréquemment l'élan de son pipeline de calcul car la RAM ne lui envoie pas les données assez vite (Wait States cumulatifs). L'efficacité chute à environ ${eff}% de la puissance crête possible.`,
    };
  } else {
    const cycleLoss = Math.round(ratio - 1);
    const eff = Math.max(5, Math.round(100 / (1 + cycleLoss * 0.75)));
    waitStatesObj = {
      waitCycles: cycleLoss,
      efficiency: eff,
      statusText: "FAMINE DE SILICIUM (Memory Wall)",
      statusColor: 'text-red-400 border-red-900/40 bg-red-950/20',
      barColor: 'bg-red-500',
      diag: `Le processeur s'asphyxie (Memory Wall atteint d'office) ! Le bus RAM est à bout de force. Le processeur tourne à un régime ultra-élevé mais passe ${100 - eff}% de son temps à l'arrêt complet (Wait States énormes). C'est le drame marketing du Pentium 4 : doubler la fréquence d'horloge brute en MHz n'apporte plus aucun gain réel de vélocité, le CPU tournant simplement plus vite... dans le vide !`,
    };
  }

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'st':
        setCpuFreq(8);
        setRamFreq(8);
        break;
      case 'p2':
        setCpuFreq(233);
        setRamFreq(66);
        break;
      case 'k7':
        setCpuFreq(1000);
        setRamFreq(133);
        break;
      case 'p4':
        setCpuFreq(3400);
        setRamFreq(200);
        break;
      case 'modern':
        setCpuFreq(4000);
        setRamFreq(400);
        break;
      default:
        break;
    }
  };

  const totalSlots = 16;
  const activeSlots = Math.max(1, Math.round((waitStatesObj.efficiency / 100) * totalSlots));

  return (
    <div className="bg-[#0e0e11] border border-white/[0.04] rounded-2xl p-6 space-y-6 text-left" id="processor-architectures-lab">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.05] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#818cf8] to-indigo-600 flex items-center justify-center shadow-lg">
            <Cpu className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              Laboratoire des Architectures de Processeurs
              <span className="text-xs font-mono font-bold bg-[#1d1d22] text-amber-400 border border-amber-400/10 px-2 py-0.5 rounded">
                CISC vs RISC & Mur de la Mémoire
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Explorez les micro-architectures mythiques et simulez l'étranglement physique de la course folle aux mégahertz bruts.</p>
          </div>
        </div>
      </div>

      {/* Lab Nav Sub Tabs */}
      <div className="flex border-b border-white/[0.06] pb-2 gap-3 overflow-x-auto scrollbar-none select-none">
        <button
          onClick={() => setActiveTab('compare')}
          className={`text-xs px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'compare' ? 'bg-[#18181b] border border-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          📊 Confrontation des 6 Géants
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`text-xs px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'simulator' ? 'bg-[#18181b] border border-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-400" />
          ⚠️ Simulateur de Goulot d'Étranglement (Memory Wall)
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`text-xs px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'timeline' ? 'bg-[#18181b] border border-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Clock className="w-4 h-4 text-purple-400" />
          ⏳ Frise Chronologique du Silicium
        </button>
      </div>

      {/* Render Panel */}
      <AnimatePresence mode="wait">
        
        {/* COMPONENT TAB 1: COMPARE */}
        {activeTab === 'compare' && (
          <motion.div
            key="tab-compare"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            <div className="bg-[#121215]/40 border border-white/[0.03] p-4 rounded-xl">
              <p className="text-xs text-zinc-300 leading-relaxed text-justify font-sans">
                Sélectionnez un fabricant mythique pour analyser ses choix de silicium, son jeu de registres et la philosophie globale (CISC vs RISC) qui a forgé le destin de ses microprocesseurs des années 1980 à nos jours.
              </p>
            </div>

            {/* Processor Buttons Row Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {processorsData.map((proc) => {
                const isSelected = proc.id === selectedCpuId;
                return (
                  <button
                    key={proc.id}
                    onClick={() => setSelectedCpuId(proc.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between h-20 relative overflow-hidden select-none ${
                      isSelected
                        ? 'bg-[#18181b] border-amber-500/50 text-white shadow-lg'
                        : 'bg-[#0c0c0e]/40 border-white/[0.04] hover:bg-[#121215] text-zinc-400'
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight font-sans block">{proc.name}</span>
                    <div className="flex items-center justify-between mt-auto w-full">
                      <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">{proc.iconText}</span>
                      <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-zinc-600'}`} />
                    </div>
                    {isSelected && (
                      <div className={`absolute top-0 right-0 w-8 h-8 opacity-10 bg-gradient-to-br ${proc.color} blur-md`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Spec Card Details Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column Description */}
              <div className="lg:col-span-8 bg-[#121215] border border-white/[0.05] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Microarchitecture : <span className="text-white font-bold">{activeCpu.name}</span>
                  </h4>
                  <span className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-md border ${activeCpu.badgeBg}`}>
                    TYPE : {activeCpu.philosophy}
                  </span>
                </div>
                
                {/* Short explanation card */}
                <div className="bg-black/30 p-4 border border-white/[0.03] rounded-lg">
                  <span className="text-[10px] font-mono text-amber-300 font-bold block uppercase mb-1">Philosophie de calcul</span>
                  <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                    {activeCpu.philosophyExpl}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed text-justify font-sans">
                  {activeCpu.description}
                </p>

                {/* Highlight Details list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="bg-[#09090b]/40 border border-white/[0.03] p-3.5 rounded-lg space-y-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      💾 Modèle de registres internes
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {activeCpu.registerModel}
                    </p>
                  </div>
                  <div className="bg-[#09090b]/40 border border-white/[0.03] p-3.5 rounded-lg space-y-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      ⚡ Atout d'ingénierie majeur
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {activeCpu.keyFeature}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column Specifications Identity Box */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="bg-[#121215] border border-white/[0.05] rounded-xl p-5 space-y-3.5 flex-1 select-none">
                  <div className="flex items-center gap-2 border-b border-white/[0.04] pb-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Fiche d'identité d'époque</span>
                  </div>
                  <div className="space-y-4 pt-1">
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase font-mono">Concepteur Originel</span>
                      <span className="text-xs font-semibold text-zinc-200">{activeCpu.creator}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase font-mono">Modèles phares célèbres</span>
                      <span className="text-xs font-semibold text-amber-300">{activeCpu.flagshipCPUs}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase font-mono">Plage horaire physique</span>
                      <span className="text-xs font-semibold text-zinc-200">{activeCpu.maxSpeedEra}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase font-mono">Usage préférentiel</span>
                      <span className="text-xs font-semibold text-zinc-300">{activeCpu.primaryUsage}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* COMPONENT TAB 2: BOTTLENECK SIMULATOR */}
        {activeTab === 'simulator' && (
          <motion.div
            key="tab-simulator"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            <div className="bg-amber-950/10 border border-amber-900/15 p-4 rounded-xl space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 font-mono uppercase">
                <Info className="w-4 h-4" />
                Pourquoi la course folle aux mégahertz s'est brisée ?
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Ce simulateur illustre le concept théorique du <strong>Mur de la Mémoire (Memory Wall)</strong>. 
                Pendant que les fondeurs augmentaient frénétiquement la fréquence du CPU (MHz), la vitesse de la RAM n'augmentait que très peu. Plus le CPU tourne vite par rapport à la RAM, plus il doit gaspiller des cycles d'horloge à l'arrêt, attendant de recevoir les données à traiter.
              </p>
            </div>

            {/* Presets Row */}
            <div className="flex flex-wrap items-center gap-2 select-none">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">PRESETS D'ÉPOQUE :</span>
              <button
                onClick={() => applyPreset('st')}
                className="text-[10px] font-mono font-bold px-2.5 py-1.5 rounded bg-black hover:bg-[#18181b] text-zinc-300 border border-white/[0.04] cursor-pointer"
              >
                Atari ST (8 MHz / RAM 8 MHz)
              </button>
              <button
                onClick={() => applyPreset('p2')}
                className="text-[10px] font-mono font-bold px-2.5 py-1.5 rounded bg-black hover:bg-[#18181b] text-zinc-300 border border-white/[0.04] cursor-pointer"
              >
                Pentium II (233 MHz / RAM 66 MHz)
              </button>
              <button
                onClick={() => applyPreset('k7')}
                className="text-[10px] font-mono font-bold px-2.5 py-1.5 rounded bg-black hover:bg-[#18181b] text-zinc-300 border border-white/[0.04] cursor-pointer"
              >
                Athlon K7 (1000 MHz / RAM 133 MHz)
              </button>
              <button
                onClick={() => applyPreset('p4')}
                className="text-[10px] font-mono font-bold px-2.5 py-1.5 rounded bg-black hover:bg-[#18181b] text-zinc-300 border border-white/[0.04] cursor-pointer"
              >
                Pentium 4 (3400 MHz / RAM 200 MHz)
              </button>
              <button
                onClick={() => applyPreset('modern')}
                className="text-[10px] font-mono font-bold px-2.5 py-1.5 rounded bg-black hover:bg-[#18181b] text-zinc-300 border border-white/[0.04] cursor-pointer"
              >
                Système Moderne (4000 MHz / Bus DDR)
              </button>
            </div>

            {/* Sliders and Visualizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#121215]/50 border border-white/[0.04] p-5 rounded-xl">
              
              {/* Sliders left */}
              <div className="lg:col-span-5 space-y-5">
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                  Paramètres Matériels
                </h5>

                {/* Slider A: CPU Freq */}
                <div className="space-y-2 bg-[#09090b]/50 p-4 border border-white/[0.02] rounded-lg">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Fréquence d'Horloge CPU</span>
                    <span className="text-amber-400 font-mono font-bold">{cpuFreq} MHz</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="4000"
                    step="8"
                    value={cpuFreq}
                    onChange={(e) => setCpuFreq(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-[#27272a]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                    <span>8 MHz (Atari/Amiga)</span>
                    <span>1 GHz (2000)</span>
                    <span>4 GHz (Pentium 4)</span>
                  </div>
                </div>

                {/* Slider B: RAM Freq */}
                <div className="space-y-2 bg-[#09090b]/50 p-4 border border-white/[0.02] rounded-lg">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Vitesse de Transfert RAM Bus</span>
                    <span className="text-blue-400 font-mono font-bold">{ramFreq} MHz</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="400"
                    step="4"
                    value={ramFreq}
                    onChange={(e) => setRamFreq(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 rounded-lg bg-[#27272a]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                    <span>8 MHz (Bus ST)</span>
                    <span>133 MHz (SDRAM)</span>
                    <span>400 MHz (DDR400)</span>
                  </div>
                </div>
              </div>

              {/* Graphical Visualizer right */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                {/* Visual statistics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#09090b] border border-white/[0.04] p-3.5 rounded-lg text-left select-none">
                    <span className="text-[10px] text-zinc-500 font-mono block">RATIO ASYNCHRONE CPU/RAM</span>
                    <span className="text-lg font-bold text-zinc-250 font-mono">
                      {ratio <= 1.05 ? '1 : 1 (Synchrone)' : `${ratio.toFixed(1)} : 1`}
                    </span>
                  </div>
                  <div className="bg-[#09090b] border border-white/[0.04] p-3.5 rounded-lg text-left select-none">
                    <span className="text-[10px] text-zinc-500 font-mono block">EFFICACITÉ DE CALCULS CPU</span>
                    <span className="text-lg font-black font-mono text-amber-400 flex items-center gap-1">
                      {waitStatesObj.efficiency}%
                      <Percent className="w-4 h-4 text-zinc-500" />
                    </span>
                  </div>
                </div>

                {/* The Cycle Block Visual Matrix */}
                <div className="bg-black/80 rounded-lg p-4 border border-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-zinc-500">Flux théorique de 16 cycles d'horloge</span>
                    <span className={`font-bold ${waitStatesObj.statusColor}`}>{waitStatesObj.statusText}</span>
                  </div>
                  
                  {/* Row of visual blocks */}
                  <div className="grid gap-1.5 py-1 select-none" style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}>
                    {Array.from({ length: totalSlots }).map((_, idx) => {
                      const idActive = idx < activeSlots;
                      return (
                        <div
                          key={idx}
                          className={`h-7 rounded transition-all duration-300 flex items-center justify-center text-[8px] font-mono font-bold ${
                            idActive 
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                              : 'bg-red-950/20 border border-red-500/20 text-red-400/60 animate-pulse'
                          }`}
                          title={idActive ? 'Cycle actif' : 'Cycle perdu (Wait State)'}
                        >
                          {idActive ? 'R' : 'W'}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between text-[9px] font-mono text-zinc-500 pt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/20 border border-emerald-500/40 inline-block" />
                      R : Calcul Utile (Actif)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-red-950/20 border border-red-500/30 inline-block animate-pulse" />
                      W : Attente RAM (Wait States)
                    </span>
                  </div>
                </div>

                {/* Diagnostis Text output */}
                <p className="text-[11px] text-zinc-300 leading-relaxed text-justify bg-black/30 border border-white/[0.02] p-3 rounded-lg">
                  {waitStatesObj.diag}
                </p>

              </div>

            </div>
          </motion.div>
        )}

        {/* COMPONENT TAB 3: TIMELINE */}
        {activeTab === 'timeline' && (
          <motion.div
            key="tab-timeline"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {/* Steps Timeline Grid Nav Selector */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 select-none">
              {timelineEpochs.map((ep, idx) => {
                const isSelected = idx === selectedTimelineEpoch;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTimelineEpoch(idx)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#18181b] border-purple-500/50 text-white shadow-lg'
                        : 'bg-[#0c0c0e]/30 border-white/[0.04] hover:bg-[#121215] text-zinc-500'
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">Étape {idx + 1}</span>
                    <div className="font-bold text-xs">{ep.epoch}</div>
                    <div className="text-[10px] text-zinc-400 mt-1 truncate">{ep.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Current Selected Epoch Detail Information Card */}
            <div className="bg-[#121215] border border-white/[0.05] rounded-xl p-5 md:p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1 block">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono font-bold bg-purple-950/40 text-purple-300 border border-purple-900/40 rounded px-1.5 py-0.5">
                    ÉPOQUE DE SILICIUM : {activeEpoch.epoch}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 bg-black/40 border border-white/[0.06] rounded px-1.5 py-0.5">
                    {activeEpoch.stats}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">{activeEpoch.title}</h4>
                <p className="text-xs text-purple-400 font-semibold italic">{activeEpoch.ratioText}</p>
              </div>

              {/* Main Text Explanation */}
              <p className="text-xs text-zinc-350 leading-relaxed text-justify whitespace-pre-line bg-black/20 p-4 rounded-lg border border-white/[0.02]">
                {activeEpoch.explanation}
              </p>

              {/* Consequence card */}
              <div className="border-l-2 border-purple-500/85 pl-3.5 italic text-xs text-purple-200/90 py-1.5 font-sans bg-purple-500/[0.02] rounded-r-lg">
                <strong>Conséquence historique :</strong> {activeEpoch.consequence}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

