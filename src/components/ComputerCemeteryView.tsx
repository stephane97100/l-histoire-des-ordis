import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Cpu, HardDrive, RefreshCw, Layers, Monitor, Play, Heart, Search, Filter, Sparkles, Star, Film, Volume2, Award, X, BookOpen } from 'lucide-react';

interface ComputerBrand {
  id: string;
  name: string;
  country: string;
  statusYear: string; // Year they ceased computing or declared bankruptcy
  logoStyle: string; // Accent color or gradient
  iconText: string;
  mythicModels: string[];
  cpuType: string;
  soundGraphics: string;
  riseAndGlory: string;
  whyInCemetery: string;
  keyInnovation: string;
  epitaph: string;
  bootstrapScreen: {
    bg: string;
    text: string;
    title: string;
    message: string;
    beepsCount: number;
  };
}

const computerBrands: ComputerBrand[] = [
  {
    id: 'amstrad',
    name: 'Amstrad CPC & CPC+',
    country: 'Royaume-Uni 🇬🇧',
    statusYear: '1990 (CPC+) / 1993',
    logoStyle: 'from-red-600 to-rose-500',
    iconText: 'CPC',
    mythicModels: ['Amstrad CPC 464 (Lecteur cassette intégré)', 'CPC 6128 (Lecteur disquette 3")', '464+ / 6128+ (Gamme Plus)'],
    cpuType: 'Zilog Z80A @ 4 MHz',
    soundGraphics: 'Ay-3-8912 (3 voix), Palette de 27 à 32 couleurs (Plus)',
    riseAndGlory: 'Conçu par Alan Sugar comme une machine tout-en-un révolutionnaire. L\'Amstrad CPC incluait l\'unité centrale, le lecteur de sauvegarde et un moniteur dédié (couleur ou monochrome vert), réduisant le fouillis de câbles et le coût d\'accès. Il a conquis l\'Europe, formant des générations de développeurs de jeux vidéo.',
    whyInCemetery: 'Victime du saut technologique des machines 16-bits. La gamme "CPC+" (1990) avec sa console GX4000 a tenté de rivaliser avec les consoles SEGA et Nintendo, mais l\'architecture 8-bits sous-jacente était obsolète.',
    keyInnovation: 'Le concept d\'ordinateur domestique unifié clés en main sans nécessité de squatter la télévision familiale.',
    epitaph: 'Ci-gît le mythique ordinateur "crocodile" au lecteur de disques 3 pouces atypique, champion incontesté du jeu vidéo et de la programmation économique d\'Europe.',
    bootstrapScreen: {
      bg: 'bg-indigo-950',
      text: 'text-zinc-200',
      title: 'Amstrad Computer Zero-Boot',
      message: 'Amstrad CPC 6128 Keyboard v1.1\n(c) 1985 Amstrad Consumer Ltd\nBASIC 1.1 ROM Active\nReady.\n_',
      beepsCount: 1
    }
  },
  {
    id: 'atari',
    name: 'Atari (Série ST & Falcon)',
    country: 'États-Unis 🇺🇸',
    statusYear: '1993 (Falcon) / 1996 (Fusion)',
    logoStyle: 'from-teal-600 to-emerald-500',
    iconText: 'ST',
    mythicModels: ['Atari 520 ST (Jackintosh)', 'Atari 1040 STf', 'Mega STE', 'Atari Falcon 030 (32-bits pur)'],
    cpuType: 'Motorola 68000 (ST) / 68030 (Falcon)',
    soundGraphics: 'Yamaha YM2149 / DSP 56001 (Falcon 16-bit hi-fi)',
    riseAndGlory: 'Sous la gouverne de Jack Tramiel, Atari lance la série ST en 1985 ("Le Pouvoir sans le Prix"). Ses prises MIDI intégrées en standard en font la machine reine des studios musicaux mondiaux (utilisée par Jean-Michel Jarre, Daft Punk, etc.). Doté d\'une souris et d\'un OS en ROM rapide (TOS).',
    whyInCemetery: 'Des choix marketing hasardeux, le mépris du marché du PC compatible, et l\'échec commercial de la console 64-bits Atari Jaguar ont conduit à la ruine financière de la division matériel en 1996.',
    keyInnovation: 'L\'intégration directe de fiches matérielles de protocole MIDI pour piloter les synthétiseurs physiques.',
    epitaph: 'Ci-gît la forge suprême de la Musique Assistée par Ordinateur et la reine des Démo-Scènes graphiques à l\'esprit farouchement rebelle.',
    bootstrapScreen: {
      bg: 'bg-emerald-950',
      text: 'text-zinc-100',
      title: 'Atari System ROM Bootstrap',
      message: 'TOS v1.04 System loaded inside memory...\nGEM graphics engine initialized...\nAES display stack active.\nDesktop ready on SC1224 Monitor.\n_',
      beepsCount: 2
    }
  },
  {
    id: 'amiga-comm',
    name: 'Commodore & Amiga',
    country: 'États-Unis 🇺🇸',
    statusYear: '1994 (Faillite de Commodore)',
    logoStyle: 'from-orange-600 to-amber-500',
    iconText: 'Amiga',
    mythicModels: ['Commodore 64 (ordinateur le plus vendu)', 'Amiga 1000', 'Amiga 500 (Le mythe de salon)', 'Amiga 1200 (AGA)'],
    cpuType: 'MOS 6510 (C64) / Motorola 68000 & 68020 (Amiga)',
    soundGraphics: 'Puce SID (C64) • Denise, Agnus, Paula / Chipset AGA (Amiga)',
    riseAndGlory: 'Spécialiste mondial du divertissement et du graphisme vidéo. L\'Amiga 500 offrait un multitâche préemptif royal à un prix accessible. Ses puces customisées déchargeaient totalement le CPU Motorola pour animer les décors à 50 images par seconde en parallaxe, terrassant la concurrence d\'époque.',
    whyInCemetery: 'Une gestion administrative calamiteuse de Commodore, l\'absence de recherche et développement sur l\'architecture Amiga pendant l\'ascension des cartes graphiques PC SVGA ont provoqué la banqueroute finale en 1994.',
    keyInnovation: 'L\'utilisation de co-processeurs dédiés (Copper et Blitter) pour la manipulation matérielle d\'images animées.',
    epitaph: 'Ci-gît le paradis perdu de la créativité et de la fluidité multimédia, symbole d\'un âge d\'or où les ingénieurs façonnaient des puces de rêve.',
    bootstrapScreen: {
      bg: 'bg-indigo-900',
      text: 'text-amber-300',
      title: 'Bootstrap Amiga Exec',
      message: 'AmigaOS Kickstart v1.3 loaded.\nPlease insert Workbench diskette in DF0:...\nWaiting...\n_',
      beepsCount: 1
    }
  },
  {
    id: 'thomson-corp',
    name: 'Thomson',
    country: 'France 🇫🇷',
    statusYear: '1989 (Fin de la gamme micro)',
    logoStyle: 'from-blue-600 to-indigo-500',
    iconText: 'TO7',
    mythicModels: ['Thomson TO7 (Crayon optique de série)', 'Thomson MO5 (Châssis noir laqué / clavier gomme)', 'TO8 / TO9+'],
    cpuType: 'Motorola 6809E @ 1 MHz',
    soundGraphics: 'Générateur de son 1-bit / Palette 8 à 16 couleurs contraignante',
    riseAndGlory: 'Choisi par le gouvernement français pour équiper des dizaines de milliers d\'écoles dans le cadre du plan "Informatique pour Tous" en 1985. C\'était l\'ordinateur du premier contact de millions de Français avec un clavier, le langage BASIC et le fameux crayon optique pour cliquer sur l\'écran.',
    whyInCemetery: 'Le plan français de soutien étatique a biaisé le marché et empêché Thomson de créer des machines évolutives. À la fin du contrat école, Thomson a capitulé face à la standardisation massive des PC compatibles IBM.',
    keyInnovation: 'Le premier crayon optique grand public connecté en série pour dessiner directement sur les lentilles du téléviseur.',
    epitaph: 'Ci-gît le fier outil scolaire de l\'instruction publique française, dont les bips et les chargements cassettes résonnent encore au fond de nos mémoires d\'enfance.',
    bootstrapScreen: {
      bg: 'bg-[#0000a0]',
      text: 'text-[#00ffff]',
      title: 'Moniteur Thomson MO5/TO7',
      message: '* BASIC 1.0 * (C) 1984 SIMIV\n48632 OCTETS DE RAM LIBRE\nPRET.\n_',
      beepsCount: 1
    }
  },
  {
    id: 'zenith-ds',
    name: 'Zenith Data Systems',
    country: 'États-Unis 🇺🇸',
    statusYear: '1996 (Rachat par Packard Bell)',
    logoStyle: 'from-gray-700 to-slate-600',
    iconText: 'ZDS',
    mythicModels: ['Zenith Z-100 (Architecture double 8085 + 8088)', 'Zenith MinisPort', 'SupersPort (Léger portable à clapet)'],
    cpuType: 'Intel 8088 / 80286 / 80386',
    soundGraphics: 'Buzzer mono / Cartes MDA-CGA',
    riseAndGlory: 'Zenith Radio Corp, un fabricant légendaire de postes de télévision, crée sa filiale informatique ZDS en 1979. Ils décrochent le contrat pharaonique de la marine et de l\'armée américaine en proposant des ordinateurs portables de poche durcis et robustes de haute volée technologique.',
    whyInCemetery: 'L\'essor féroce des clones asiatiques bon marché à bas coût de production a sapé les marges de Zenith, contrainte à être cédée au groupe Bull puis démembrée par Packard Bell.',
    keyInnovation: 'Le développement précurseur d\'ordinateurs portatifs équipés d\'écrans LCD à rétroéclairage par néon fluorescent.',
    epitaph: 'Ci-gît le géant des écrans cathodiques et des ordinateurs robustes qui équipait les sous-marins et les états-majors avant la déferlante du PC jetable.',
    bootstrapScreen: {
      bg: 'bg-zinc-900',
      text: 'text-emerald-400',
      title: 'Zenith Data Systems BIOS',
      message: 'Zenith Monitor Version 4.12\nChecking RAM: 640K OK, 1024K EXT OK.\nBooting DOS from Drive A:...\nReady.\n_',
      beepsCount: 1
    }
  },
  {
    id: 'olivetti-it',
    name: 'Olivetti',
    country: 'Italie 🇮🇹',
    statusYear: '1997 (Cession de la branche PC)',
    logoStyle: 'from-[#005c5c] to-[#009c9c]',
    iconText: 'OLIV',
    mythicModels: ['Olivetti M20 (Étrange CPU Zilog 8001)', 'Olivetti M24 (Le clone PC survitaminé)', 'Olivetti Quaderno'],
    cpuType: 'Zilog Z8001 / Intel 8086 @ 8 MHz (M24)',
    soundGraphics: 'Générateur de sons standard, graphismes haute résolution 640x400 exclusifs',
    riseAndGlory: 'Célèbre pour ses machines à écrire au design raffiné, Olivetti secoue le monde du PC en 1984 avec le M24. Cet ordinateur, doté d\'un vrai CPU 8086 tournant deux fois plus vite que l\'IBM PC original, est adopté massivement par les banques européennes et licencié à AT&T aux USA.',
    whyInCemetery: 'Déficit d\'approvisionnement, retards chroniques sur les plateformes ordinateurs portables et incapacité à lutter contre la baisse radicale des prix menée par Compaq et Dell.',
    keyInnovation: 'L’introduction du design industriel d\'auteur et de l\'ergonomie plastique ultra-soignée de bureau.',
    epitaph: 'Ci-gît l\'élégance italienne du bureau, dont les châssis aux géométries d\'artistes abritaient les processeurs de calcul les plus véloces de leur génération.',
    bootstrapScreen: {
      bg: 'bg-slate-900',
      text: 'text-zinc-200',
      title: 'Olivetti Computer Bootstrap',
      message: 'M24 ROM BIOS v1.43\n(C) 1984 Ing. C. Olivetti & C. S.p.A.\nChecking interrupts: OK.\nPress F1 to enter setup.\n_',
      beepsCount: 1
    }
  },
  {
    id: 'sinclair-res',
    name: 'Sinclair Research',
    country: 'Royaume-Uni 🇬🇧',
    statusYear: '1986 (Marque vendue à Amstrad)',
    logoStyle: 'from-pink-600 to-rose-450',
    iconText: 'ZX',
    mythicModels: ['Sinclair ZX81 (A membrane)', 'ZX Spectrum (touches caoutchouc dites "gros boutons")', 'Sinclair QL (Processeur de luxe 68008)'],
    cpuType: 'Zilog Z80A @ 3.5 MHz / Motorola 68008',
    soundGraphics: 'Synthetiseur monophonique asthmatique / Couleurs explosives à contrainte d\'attributs (Spectrum)',
    riseAndGlory: 'La marque farfelue de Sir Clive Sinclair qui a démocratisé de force le code à domicile au Royaume-Uni. Le ZX81, vendu moins de 1000 francs en kit, a forcé toute une classe ouvrière britannique à apprendre le BASIC. Le ZX Spectrum a été le berceau absolu de l\'industrie anglaise du jeu.',
    whyInCemetery: 'L\'investissement désastreux de Clive Sinclair dans une voiture électrique miniature à trois roues sans permis (la "Sinclair C5") a vidé les caisses de l\'entreprise, forcée de vendre sa branche informatique à son rival Amstrad.',
    keyInnovation: 'Le premier ordinateur familial décent vendu sous la barre symbolique des 100 dollars mondiaux.',
    epitaph: 'Ci-gît l\'esprit excentrique et génial du bricolage informatique d\'outre-Manche, créateur de boîtiers légers à touches silencieuses et de cartouches d\'apprentissage.',
    bootstrapScreen: {
      bg: 'bg-zinc-800',
      text: 'text-zinc-100',
      title: 'Sinclair ZX Spectrum ROM',
      message: '(c) 1982 Sinclair Research Ltd\nLoaded Sinclair ROM v1.0\nReady.\n_',
      beepsCount: 1
    }
  },
  {
    id: 'next-comp',
    name: 'NeXT Computers',
    country: 'États-Unis 🇺🇸',
    statusYear: '1993 (Fin du matériel) / 1996 (Rachat)',
    logoStyle: 'from-amber-700 to-stone-850',
    iconText: 'NeXT',
    mythicModels: ['NeXT Cube (Châssis magnésium parfait)', 'NeXTstation (La plaque de pizza noire)'],
    cpuType: 'Motorola 68030 / 68040 & DSP 56001',
    soundGraphics: 'Audio hi-fi stéréo 16-bits native / Graphisme monochrome MegaPixel somptueux',
    riseAndGlory: 'Créé par Steve Jobs lors de son exil d\'Apple. NeXT a construit la Rolls-Royce des ordinateurs professionnels universitaires : châssis cubiques en magnésium pur de couleur noire, écran géant ultra-contrasté, OS Unix révolutionnaire programmé en Objective-C. C’est la puce de silicium sur laquelle Tim Berners-Lee a programmé le tout premier World Wide Web.',
    whyInCemetery: 'Le coût exorbitant des ordinateurs (environ 10 000 dollars de l\'époque) les rendait invendables en masse. NeXT a abandonné le matériel en 1993, mais son système d\'exploitation NeXTSTEP a été acheté par Apple en 1996 pour servir de fondation intime à Mac OS X (macOS).',
    keyInnovation: 'L’introduction du développement d\'applications par blocs visuels orientés objet dès les années 80.',
    epitaph: 'Ci-gît le monolithe de magnésium noir, temple du génie de Steve Jobs, berceau de l\'Internet moderne et précieux ancêtre caché de macOS et de l\'iPhone.',
    bootstrapScreen: {
      bg: 'bg-[#101010]',
      text: 'text-slate-300 font-sans',
      title: 'NeXT Mach Boot Loader',
      message: 'NeXT Computer, Inc.\nChecking memory channels: 16 MB OK.\nLoading NeXTSTEP kernel /mach_servers...\nNetwork address DHCP acquired.\nInit process started. Welcome to workspace.\n_',
      beepsCount: 2
    }
  },
  {
    id: 'acorn-comp',
    name: 'Acorn Computers',
    country: 'Royaume-Uni 🇬🇧',
    statusYear: '1998 (Fin de marque)',
    logoStyle: 'from-[#008c2a] to-[#2ecc71]',
    iconText: 'ACORN',
    mythicModels: ['BBC Micro (Pédagogie officiel UK)', 'Acorn Archimedes (Le monstre 32-bits)', 'Risc PC'],
    cpuType: 'MOS 6502 / ARM2 & ARM3 (Puces maison !)',
    soundGraphics: 'Synthèse sonore multivoix, puce vidéo ultra-rapide VIDC1',
    riseAndGlory: 'Surnommé "l\'Apple britannique", Acorn conçoit le BBC Micro en 1981, ouvrant la voie au code dans les écoles. En 1987, mécontent de la puissance du processeur Intel, l\'ingénieur Sophie Wilson conçoit une puce sur mesure d\'architecture simplifiée : l\'ARM. C\'est le premier processeur RISC commercial du monde.',
    whyInCemetery: 'Arrivés trop tard sur le marché des serveurs professionnels et écrasés par l\'hégémonie x86, les PC d\'Acorn ont disparu. Cependant, la filiale d\'Acorn spécialisée dans le processeur mobile (ARM Ltd) a conquis le monde. Ses microprocesseurs équipent aujourd\'hui 99% des smartphones !',
    keyInnovation: 'L\'invention historique et absolue de l\'architecture matérielle du microprocesseur ARM (Advanced RISC Machine).',
    epitaph: 'Ci-gît le plus grand père d\'esprits cachés : l\'ordinateur s\'est éteint, mais les puces ARM qu\'il a enfantées battent aujourd\'hui dans tous les téléphones de la planète.',
    bootstrapScreen: {
      bg: 'bg-zinc-900',
      text: 'text-[#00ff00]',
      title: 'Acorn RISC OS Loader',
      message: 'Acorn Archimedes 32-bit ARM System\n(C) 1987 Acorn Computers Ltd\nRISC OS 2.0 ROM initialized.\nARM2 CPU detected. Sound active.\n_',
      beepsCount: 1
    }
  }
];

const brandHoverStats: Record<string, { launchDate: string; peakShare: string; focus: string }> = {
  'amstrad': {
    launchDate: 'Avril 1984 (Lancement du CPC 464)',
    peakShare: '35% (Royaume-Uni, France & Espagne - Fin des années 1980)',
    focus: 'Ordinateur familial tout-en-un révolutionnaire à moniteur intégré.'
  },
  'atari': {
    launchDate: 'Juin 1985 (Série mythique 520 ST)',
    peakShare: '18% (Europe de l\'Ouest, Studios de musique & graphisme 1986-1990)',
    focus: 'La station reine incontestée de la M.A.O. professionnelle.'
  },
  'amiga-comm': {
    launchDate: 'Août 1982 (C64) / Juillet 1985 (Amiga 1000)',
    peakShare: '42% (Divertissement de salon et jeu vidéo avancé en Europe, 1988)',
    focus: 'Le pionnier absolu des chipsets graphiques et sonores dédiés.'
  },
  'thomson-corp': {
    launchDate: 'Novembre 1982 (TO7) / Novembre 1984 (MO5)',
    peakShare: '90% (Salles de classe de l\'instruction publique en France, 1985)',
    focus: 'Fer de lance du plan national "Plan Informatique pour Tous".'
  },
  'zenith-ds': {
    launchDate: 'Décembre 1979 (Filiale de Zenith Radio Corp)',
    peakShare: '22% (Marché professionnel, militaire et gouvernemental aux USA, 1988)',
    focus: 'Pionnier des terminaux micro-informatiques de terrain ultra-fiables.'
  },
  'olivetti-it': {
    launchDate: 'Mars 1982 (M20) / Mars 1984 (M24)',
    peakShare: '15% (Bureaux d\'affaires et institutions bancaires en Europe)',
    focus: 'Design industriel élégant couplé à un processeur très rapide.'
  },
  'sinclair-res': {
    launchDate: 'Mars 1981 (ZX81) / Avril 1982 (Spectrum)',
    peakShare: '48% (Ordinateurs domestiques d\'Europe et du Royaume-Uni, 1983-1984)',
    focus: 'Démocratisation radicale de l\'apprentissage de la programmation.'
  },
  'next-comp': {
    launchDate: 'Octobre 1988 (Le légendaire NeXT Cube)',
    peakShare: '2.5% (Stations professionnelles de pointe & Labos universitaires)',
    focus: 'La forge d\'Objective-C, de NeXTSTEP et du World Wide Web.'
  },
  'acorn-comp': {
    launchDate: 'Décembre 1981 (BBC Micro) / Juin 1987 (Archimedes)',
    peakShare: '15% (Secteur éducatif UK) • 99% (Héritage des technologies ARM modernes)',
    focus: 'L\'inventeur de l\'architecture matérielle RISC (ARM) moderne.'
  }
};

export default function ComputerCemeteryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [activeBrandId, setActiveBrandId] = useState<string | null>(null);
  const [expandedBrandId, setExpandedBrandId] = useState<string | null>(null);
  const [modalBrand, setModalBrand] = useState<ComputerBrand | null>(null);
  
  // Interactive Monitor Simulation State
  const [powerState, setPowerState] = useState<'off' | 'beep' | 'on'>('off');
  const [powerLogs, setPowerLogs] = useState('');
  const [beepsPlayed, setBeepsPlayed] = useState(false);

  // Filter lists
  const countries = ['All', 'Royaume-Uni 🇬🇧', 'États-Unis 🇺🇸', 'France 🇫🇷', 'Italie 🇮🇹'];
  
  const filteredBrands = computerBrands.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.mythicModels.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          b.cpuType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || b.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const activeBrand = computerBrands.find(b => b.id === activeBrandId) || null;

  const handlePowerOn = (brand: ComputerBrand) => {
    setActiveBrandId(brand.id);
    setPowerState('beep');
    setBeepsPlayed(false);
    setPowerLogs('BOOTSTRAPPENT DU CONDENSATEUR DIRECT... GENERATION D\'IMPULSIONS...');
    
    // Play virtual tactile beeps using Web Audio API safely
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      let count = brand.bootstrapScreen.beepsCount;
      const playBeep = () => {
        if (count <= 0) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
        count--;
        if (count > 0) {
          setTimeout(playBeep, 200);
        }
      };
      playBeep();
    } catch (e) {
      // AudioContext fails silently or isn't allowed, which is expected inside frames.
    }

    setTimeout(() => {
      setPowerState('on');
      setPowerLogs(brand.bootstrapScreen.message);
    }, 1100);
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-6 text-left" id="computer-cemetery-panel">
      
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-505 to-stone-700 bg-gradient-to-tr from-stone-600 to-stone-400 flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-zinc-900 font-bold" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              Le Cimetière des Machines Légendaires
              <span className="text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/40 px-2 py-0.5 rounded">
                RECONVERSION & CRASH MATÉRIEL
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Hommage technique et historique aux fabricants d'ordinateurs d'anthologie balayés par le temps et la compatibilité.</p>
          </div>
        </div>
        <div className="text-xs text-zinc-550 font-mono text-left md:text-right">
          <span>CLASSIFICATION : MUSÉE DU SILICIUM</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#121215]/60 border border-white/[0.04] p-3 rounded-xl select-none">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une marque, un processeur, ou un modèle (CPC, ST, TO7, Amiga, ARM...)"
            className="w-full bg-[#0c0c0e]/80 border border-white/[0.06] rounded-lg pl-10 pr-4 py-2 text-xs text-zinc-200 outline-none placeholder-zinc-600"
          />
        </div>
        <div className="md:col-span-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500 flex-shrink-0" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-[#0c0c0e]/80 border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-zinc-300 outline-none cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'Origine : Tous les pays' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left side brands cards list, Right side monitor simulator */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Side: Responsive Bento Grid list */}
        <div className="xl:col-span-8 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredBrands.length === 0 ? (
            <div className="bg-[#121215]/30 border border-white/[0.04] p-8 text-center rounded-xl text-xs text-zinc-500">
              Aucun fabricant historique ne correspond à vos filtres de recherche.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBrands.map((b) => {
                const isActive = activeBrandId === b.id;
                return (
                  <div
                    key={b.id}
                    className={`bg-[#121215]/50 border rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 select-none relative group ${
                      isActive 
                        ? 'border-indigo-500/40 bg-indigo-950/5 shadow-indigo-950/10' 
                        : 'border-white/[0.04] hover:border-indigo-500/20 hover:bg-[#121215] hover:shadow-lg hover:shadow-black/20'
                    }`}
                  >
                    {/* Hover Stats Diagnostic HUD Overlay */}
                    <div className="absolute inset-0 bg-[#07070a]/98 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-between p-5 z-20 border border-white/[0.08] lg:border-indigo-500/20 rounded-xl pointer-events-none transform scale-[0.98] group-hover:scale-100">
                      <div className="space-y-4 text-left">
                        <div className="flex justify-between items-center border-b border-white/[0.06] pb-2">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-[#818cf8] uppercase flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                            QUICK-ARCHIVE DETECTÉ
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500">
                            {b.id.toUpperCase()} // REG-ROM
                          </span>
                        </div>
                        <div className="space-y-3 pt-1">
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-zinc-500 font-mono block uppercase">● Date de Lancement</span>
                            <span className="text-xs font-bold text-white font-sans flex items-center gap-1">
                              📅 {brandHoverStats[b.id]?.launchDate || 'Inconnue'}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-zinc-500 font-mono block uppercase">● Part de Marché au Sommet (Peak)</span>
                            <span className="text-xs font-bold text-amber-400 font-sans flex items-center gap-1">
                              📈 {brandHoverStats[b.id]?.peakShare || 'N/A'}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-zinc-500 font-mono block uppercase">● Focus Stratégique / Héritage</span>
                            <span className="text-[11px] text-zinc-350 leading-relaxed font-sans block pt-0.5">
                              {brandHoverStats[b.id]?.focus || b.keyInnovation}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-white/[0.05] pt-2 text-[9px] font-mono text-zinc-500 flex justify-between items-center">
                        <span>EST. DE STATUT • HORS SERVICE</span>
                        <span className="text-red-400/80 font-bold">† {b.statusYear.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      {/* Top ribbon */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">{b.country}</span>
                        <span className="text-[10px] font-mono text-red-400 font-bold bg-red-950/30 px-2 py-0.5 rounded border border-red-500/10">
                          † {b.statusYear}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="text-left">
                        <h4 className="text-lg font-black text-white flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${b.logoStyle}`} />
                          {b.name}
                        </h4>
                        <p className="text-[10px] font-mono text-zinc-450 uppercase mt-0.5 tracking-wide">
                          CPU: {b.cpuType.split(' @')[0]} • Audio: {b.soundGraphics.split(' (')[0].split(' •')[0]}
                        </p>
                      </div>

                      {/* History story */}
                      <div className="space-y-1.5">
                        <p className={`text-xs text-zinc-350 leading-relaxed text-justify transition-all duration-300 ${
                          expandedBrandId === b.id ? '' : 'line-clamp-4'
                        }`}>
                          {b.riseAndGlory}
                        </p>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/[0.02]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedBrandId(expandedBrandId === b.id ? null : b.id);
                            }}
                            className="text-[10px] text-blue-400 hover:text-blue-300 font-bold font-mono transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
                          >
                            {expandedBrandId === b.id ? '▴ Réduire' : '▾ Lire la suite'}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalBrand(b);
                            }}
                            className="text-[10px] text-zinc-400 hover:text-amber-400 font-bold font-mono transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
                            title="Ouvrir la fiche d'histoire complète dans un panneau de lecture"
                          >
                            📖 Fiche Historique
                          </button>
                        </div>
                      </div>

                      {/* Mythic models tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {b.mythicModels.map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono text-zinc-400 bg-[#0c0c0e]/80 border border-white/[0.05] rounded px-2 py-0.5"
                          >
                            {m.split(' (')[0]}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Button trigger bootstrap */}
                    <div className="border-t border-white/[0.04] pt-4 mt-4 flex items-center justify-between gap-4">
                      <span className="text-[10px] text-zinc-530 font-mono italic">Cliquez pour allumer la ROM</span>
                      <button
                        onClick={() => handlePowerOn(b)}
                        className={`text-xs px-3.5 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                          isActive 
                            ? 'bg-indigo-500 text-white border-transparent'
                            : 'bg-[#0c0c0e] hover:bg-[#15151a] text-zinc-300 border-white/[0.06] hover:border-white/[0.15]'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        Alimenter System
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Retro system Bootstraper monitor console simulator */}
        <div className="xl:col-span-4 flex flex-col gap-5 justify-between">
          
          {/* Virtual CRT Monitor */}
          <div className="border border-white/[0.06] bg-[#0c0c0e] rounded-xl p-5 flex-1 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3">
              <span className="text-[10px] text-zinc-530 font-mono flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${powerState !== 'off' ? 'bg-indigo-400 animate-pulse' : 'bg-zinc-700'}`} />
                MONITEUR RETRO CRT v2.8 (EMU)
              </span>
              <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">
                {activeBrand ? activeBrand.iconText : 'AUCUN'}
              </span>
            </div>

            {/* Simulated Glass screen area */}
            <div className={`flex-1 rounded-lg border p-4 font-mono transition-all duration-300 relative flex flex-col items-center justify-center text-center overflow-y-auto ${
              activeBrand && powerState === 'on' 
                ? `${activeBrand.bootstrapScreen.bg} ${activeBrand.bootstrapScreen.text} border-transparent shadow-inner`
                : powerState === 'beep'
                ? 'bg-zinc-800 text-zinc-400 border-zinc-650'
                : 'bg-[#030304] text-zinc-700 border-zinc-900'
            }`}>
              {/* Scanlines overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_95%)] pointer-events-none z-10" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white/[0.02] animate-[scanline_10s_linear_infinite] pointer-events-none z-10" />

              {/* Monitor message */}
              {powerState === 'off' ? (
                <div className="space-y-2 select-none">
                  <Monitor className="w-10 h-10 text-zinc-800 mx-auto animate-pulse" />
                  <p className="text-[10px] uppercase font-bold text-zinc-600 font-mono tracking-wider">ÉCRAN HORS TENSION</p>
                  <p className="text-[10px] text-zinc-550 max-w-[210px] mx-auto leading-normal">
                    Sélectionnez un ordinateur historique à gauche et cliquez sur <strong className="text-zinc-500">"Alimenter System"</strong> pour simuler son boot ROM.
                  </p>
                </div>
              ) : powerState === 'beep' ? (
                <div className="space-y-2 animate-pulse font-mono flex flex-col items-center select-none">
                  <Volume2 className="w-8 h-8 text-amber-500 animate-bounce" />
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">{activeBrand?.bootstrapScreen.beepsCount} BEEP(S) SYSTEME DE SÉRIE...</p>
                  <p className="text-[9px] text-zinc-500">{powerLogs}</p>
                </div>
              ) : (
                <div className="text-left w-full h-full flex flex-col justify-between font-mono text-[11px] leading-relaxed relative z-20">
                  <span className="text-[10px] font-black uppercase text-zinc-500 border-b border-white/[0.06] pb-1 block mb-2 tracking-wide">
                    {activeBrand?.bootstrapScreen.title}
                  </span>
                  <div className="flex-1 whitespace-pre-line select-text">
                    {powerLogs}
                  </div>
                  <div className="border-t border-white/[0.05] pt-2 mt-4 text-[9px] text-zinc-500/80 italic flex items-center justify-between">
                    <span>STATUS: ALLUMÉ</span>
                    <span>COUDE ELECTRANE OK</span>
                  </div>
                </div>
              )}
            </div>

            {/* Power control bottom */}
            {activeBrand && (
              <div className="border-t border-white/[0.06] pt-3 mt-3 flex justify-between items-center bg-[#09090b]/50 p-2 rounded-lg text-xs font-mono">
                <span className="text-zinc-500">Allumage de secours :</span>
                {powerState !== 'off' ? (
                  <button
                    onClick={() => {
                      setPowerState('off');
                      setPowerLogs('');
                    }}
                    className="p-1 px-2.5 bg-red-950/40 hover:bg-red-950 text-red-400 rounded cursor-pointer border border-red-900/30 font-bold uppercase text-[9px]"
                  >
                    Couper Courant
                  </button>
                ) : (
                  <button
                    onClick={() => handlePowerOn(activeBrand)}
                    className="p-1 px-2.5 bg-indigo-950/40 hover:bg-indigo-950 text-indigo-400 rounded cursor-pointer border border-indigo-900/30 font-bold uppercase text-[9px]"
                  >
                    Allumer
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Tribute Anecdote Detail Badge panel */}
          {activeBrand && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="bg-[#121215] border border-white/[0.05] rounded-xl p-4 space-y-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-400" />
                    Focus Innovation majeure
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1">{activeBrand.keyInnovation}</p>
                </div>

                <div className="border-t border-white/[0.04] pt-3">
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    Pourquoi il a péri
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1 text-justify">{activeBrand.whyInCemetery}</p>
                </div>

                <div className="bg-black/35 p-3 rounded-lg border border-white/[0.02] border-l-2 border-amber-500/60 pl-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-mono tracking-widest block">Épitaphe de l'Historien</span>
                  <p className="text-xs text-zinc-400 mt-1 italic font-sans">"{activeBrand.epitaph}"</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

        </div>

      </div>

      {/* Immersive Archive Modal */}
      <AnimatePresence>
        {modalBrand && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="cemetery-archive-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalBrand(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#0c0c0e] border border-white/[0.08] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col font-sans"
            >
              {/* Top Banner Accent */}
              <div className={`h-2 bg-gradient-to-r ${modalBrand.logoStyle}`} />
              
              {/* Header */}
              <div className="p-6 border-b border-white/[0.06] flex items-start justify-between gap-4 bg-gradient-to-b from-[#121215] to-[#0c0c0e]">
                <div className="text-left space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#818cf8] uppercase bg-indigo-950/40 border border-indigo-900/40 rounded px-2 py-0.5">
                      ARCHIVE NUMÉRIQUE
                    </span>
                    <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/30 border border-red-900/30 px-2 py-0.5 rounded">
                      † Hors-Service en {modalBrand.statusYear}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${modalBrand.logoStyle}`} />
                    {modalBrand.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Provenance : {modalBrand.country} • CPU : <span className="text-indigo-300">{modalBrand.cpuType}</span>
                  </p>
                </div>
                
                <button
                  onClick={() => setModalBrand(null)}
                  className="p-1.5 rounded-lg bg-[#18181b] hover:bg-[#202025] border border-white/[0.06] text-zinc-400 hover:text-white cursor-pointer transition-all self-start"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Body Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-left custom-scrollbar flex-1 select-text">
                
                {/* Rise & Glory: Full Description */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-[#818cf8] font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    L'Épopée & L'Âge d'Or de la Machine
                  </h4>
                  <p className="text-xs text-zinc-200 leading-relaxed text-justify bg-[#121215]/40 border border-white/[0.04] p-4.5 rounded-xl whitespace-pre-line shadow-inner">
                    {modalBrand.riseAndGlory}
                  </p>
                </div>
                
                {/* Mid details grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Specifications */}
                  <div className="bg-[#121215]/60 border border-white/[0.04] p-4 rounded-xl space-y-2">
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 animate-pulse" />
                      Composants de Légende
                    </h5>
                    <ul className="text-xs text-zinc-450 divide-y divide-white/[0.03] space-y-2 pt-1 font-mono">
                      <li className="flex justify-between py-1.5 gap-2">
                        <span className="text-zinc-500 font-bold">Processeur</span>
                        <span className="text-zinc-300 text-right font-medium">{modalBrand.cpuType}</span>
                      </li>
                      <li className="flex justify-between py-1.5 gap-2">
                        <span className="text-zinc-500 font-bold">Audio & Vidéo</span>
                        <span className="text-zinc-300 text-right font-medium">{modalBrand.soundGraphics}</span>
                      </li>
                      <li className="flex justify-between py-1.5 gap-1.5">
                        <span className="text-zinc-500 font-bold">Modèles Clés</span>
                        <span className="text-zinc-300 text-right text-[10px] leading-tight font-sans max-w-[200px]">{modalBrand.mythicModels.map(m => m.split(' (')[0]).join(', ')}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Why failure */}
                  <div className="bg-red-950/10 border border-red-900/15 p-4 rounded-xl space-y-2">
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Pourquoi elle est au Cimetière
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed text-justify pt-1">
                      {modalBrand.whyInCemetery}
                    </p>
                  </div>
                </div>

                {/* Main Innovation */}
                <div className="bg-[#121215]/40 border border-white/[0.04] p-4.5 rounded-xl space-y-1.5">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    L'Héritage Technologique
                  </h4>
                  <p className="text-xs text-zinc-350 leading-relaxed">
                    {modalBrand.keyInnovation}
                  </p>
                </div>

                {/* Historian Epitaph */}
                <div className="bg-gradient-to-r from-red-950/10 to-transparent p-4 rounded-xl border border-white/[0.04] border-l-2 border-red-500/60 font-sans">
                  <span className="text-[10px] font-bold text-[#818cf8] uppercase font-mono tracking-widest block">Épitaphe</span>
                  <p className="text-xs text-zinc-405 mt-1 italic leading-relaxed">"{modalBrand.epitaph}"</p>
                </div>

              </div>
              
              {/* Footer Actions */}
              <div className="p-4 bg-[#121215] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-[10px] font-mono text-zinc-500 text-left">
                  Archéologie numérique • Cabinet de l'Historien Informatique
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handlePowerOn(modalBrand);
                      setModalBrand(null);
                    }}
                    className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Simuler le Boot ROM
                  </button>
                  <button
                    onClick={() => setModalBrand(null)}
                    className="px-4 py-2 bg-[#1c1c22] hover:bg-[#25252d] text-zinc-300 font-semibold text-xs rounded-lg transition-all border border-white/[0.05] cursor-pointer"
                  >
                    Fermer la Fiche
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
