import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, HelpCircle, Layers, Cpu, Compass, HardDrive, KeyRound } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  category: 'architecture' | 'execution' | 'memory' | 'historical';
  categoryLabel: string;
  definition: string;
  simplifiedExplanation: string;
  metaphor: string;
  linkedOS: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'multitasking-preemptive',
    term: 'Multitâche préemptif',
    category: 'execution',
    categoryLabel: 'Ordonnancement & Exécution',
    definition: 'Mécanisme informatique par lequel le système d\'exploitation (via l\'ordonnanceur) alloue et retire de manière autoritaire du temps de calcul du microprocesseur à chaque programme actif. L\'ordinateur change d\'application des milliers de fois par seconde pour donner l\'illusion d\'une exécution parallèle absolue.',
    simplifiedExplanation: 'Contrairement au multitâche de salon primitif (coopératif), les applications ne décident pas quand laisser la main aux autres. Si l\'une d\'elles "boucle" à l\'infini dans un bogue, l\'OS l\'isole et l\'éteint sans perturber le reste de la machine.',
    metaphor: 'Un chef d\'orchestre autoritaire armé d\'un sablier qui siffle le changement d\'instrument toutes les secondes pour que personne ne joue trop longtemps ou ne monopolise la scène.',
    linkedOS: ['AmigaOS', 'BeOS', 'Windows NT', 'Linux', 'macOS (OS X)']
  },
  {
    id: 'multitasking-cooperative',
    term: 'Multitâche coopératif',
    category: 'execution',
    categoryLabel: 'Ordonnancement & Exécution',
    definition: 'Forme de multitâche où chaque programme informatique possède temporairement le processeur et doit volontairement exécuter une instruction de relâchement (comme un "yield") pour permettre à d\'autres programmes de tourner.',
    simplifiedExplanation: 'Dans ce mode, l\'OS est à la merci de la gentillesse des développeurs. Si un traitement dure trop longtemps ou qu\'un bogue fige une application, tout le système d\'exploitation (la souris, le clavier et l\'écran) se bloque en même temps.',
    metaphor: 'Une assemblée polie où chacun prend la parole et doit décider de lui-même de reposer le micro. Si un orateur s\'évanouit au micro, toute la réunion s\'arrête indéfiniment.',
    linkedOS: ['MS-DOS (avec Windows 3.1)', 'Mac OS Classic']
  },
  {
    id: 'kernel-monolithic',
    term: 'Noyau monolithique',
    category: 'architecture',
    categoryLabel: 'Architecture Système',
    definition: 'Conception d\'un système d\'exploitation où toutes les fonctions fondamentales (accès aux disques, gestion réseau, pilotes matériels de cartes graphiques, calendrier de tâches) sont imbriquées et s\'exécutent de concert dans la même adresse mémoire à privilèges élevés (l\'espace noyau).',
    simplifiedExplanation: 'Comme tout est regroupé dans un seul bloc unifié, la communication à l\'intérieur de l\'OS est extrêmement rapide. Par contre, si un seul élément secondaire (comme le pilote d\'une imprimante) rencontre une erreur grave, c\'est l\'intégralité du système qui plante immédiatement.',
    metaphor: 'Un immense château fort d\'un seul tenant. Ultra-robuste et ultra-rapide pour aller de la cuisine aux archives, mais si un incendie éclate dans la buanderie, tout le château brûle d\'un coup.',
    linkedOS: ['Linux', 'MS-DOS', 'SunOS / Solaris']
  },
  {
    id: 'kernel-microkernel',
    term: 'Micro-noyau',
    category: 'architecture',
    categoryLabel: 'Architecture Système',
    definition: 'Philosophie logicieller d\'OS visant à réduire les fonctions du noyau au strict minimum : transfert asynchrone de messages (IPC), gestion primaire de la mémoire virtuelle, et ordonnancement élémentaire. Tout le reste (gestion des fichiers, réseau, pilotes) tourne à l\'extérieur sous forme de petits serveurs utilisateurs isolés.',
    simplifiedExplanation: 'Si votre carte graphique ou votre système réseau plante, le système se contente de redémarrer le petit module concerné en tâche de fond. L\'ordinateur ne montre aucun écran bleu et continue de fonctionner sans interruption.',
    metaphor: 'Un village composé de petites chaumières spécialisées distantes. Si le boulanger brûle sa cuisine, sa maison brûle mais le cordonnier et le maire continuent de vaquer à leurs occupations.',
    linkedOS: ['BeOS', 'AmigaOS (Exec)', 'Atari TOS']
  },
  {
    id: 'kernel-hybrid',
    term: 'Noyau hybride',
    category: 'architecture',
    categoryLabel: 'Architecture Système',
    definition: 'Une architecture de noyau logicielle qui combine l\'organisation modulaire et sûre du micro-noyau avec des optimisations matérielles issues du noyau monolithique, en migrant notamment certains pilotes ou parties critiques du code réseau au sein de l\'espace mémoire Kernel privilégié.',
    simplifiedExplanation: 'C\'est le compromis moderne universel. Il tente de donner la rapidité d\'accès du monolithique tout en conservant une structure de code bien compartimentée et d\'agencement propre à la maintenance.',
    metaphor: 'Un palais royal cloisonné en appartements fermés, mais disposant de couloirs secrets très rapides où des coursiers privilégiés s\'élancent pour éviter d\'ouvrir les portes de sécurité.',
    linkedOS: ['Windows NT', 'macOS (XNU)']
  },
  {
    id: 'memory-protection',
    term: 'Mémoire protégée',
    category: 'memory',
    categoryLabel: 'Gestion de la Mémoire',
    definition: 'Technique logicielle et matérielle de répartition de la RAM (utilisant des mécanismes d\'adressage virtuel et de pagination MMU). Elle assigne une plage d\'adresses physiques étanches et inaliénables à chaque programme. Un processus a interdiction stricte de lire ou d\'écrire chez son voisin.',
    simplifiedExplanation: 'C\'est l\'invention ultime qui a sauvé les utilisateurs des crashs répétés. Avant la mémoire protégée, une application mal écrite pouvait, par inadvertance, écraser les données système du bureau et tout foudroyer.',
    metaphor: 'Un immeuble moderne où chaque colocataire possède sa clé individuelle et ne peut pas entrer chez les autres. Si la cuisine d\'un appartement est désordonnée, son bazar reste confiné chez lui.',
    linkedOS: ['Windows NT', 'macOS (OS X)', 'Linux', 'SunOS / Solaris', 'BeOS']
  },
  {
    id: 'file-system',
    term: 'Système de fichiers (File System)',
    category: 'memory',
    categoryLabel: 'Gestion de la Mémoire',
    definition: 'Structure d\'indexation et d\'allocation logique utilisée par un système d\'exploitation pour référencer, stocker, extraire et nommer les fichiers de manière organisée sur un disque dur, une bande ou une carte mémoire.',
    simplifiedExplanation: 'Le disque physique n\'est qu\'une immense suite de zéros et de uns. Le système de fichiers est le grand livre de bord qui dit : "Les données de tel fichier commencent à la case 450 et se terminent à la case 820, et son nom d\'affichage est Devoir.txt".',
    metaphor: 'L\'archiviste en chef d\'une immense bibliothèque de dossiers sans nom, tenant un registre unique répertoriant le tiroir exact et l\'étagère de chaque document.',
    linkedOS: ['MS-DOS (FAT16)', 'Windows (NTFS)', 'Linux (ext4)', 'BeOS (BFS)']
  },
  {
    id: 'kernel-space-vs-user-space',
    term: 'Espace Noyau vs Espace Utilisateur',
    category: 'architecture',
    categoryLabel: 'Architecture Système',
    definition: 'Dualité d\'exécution assurée par le processeur (anneaux de privilège, typiquement Ring 0 et Ring 3). L\'espace noyau contrôle directement d\'office le processeur et la mémoire. L\'espace utilisateur est régenté par des autorisations contrôlées par l\'OS pour empêcher les crashs de niveau matériel de détruire la machine.',
    simplifiedExplanation: 'Votre jeu préféré ou votre navigateur web tourne en espace utilisateur "restreint". S\'il veut dessiner à l\'écran ou écrire sur un disque d\'archives, il n\'a pas le droit de le faire seul : il doit demander gentiment à l\'OS de faire l\'action à sa place via des appels système (syscalls).',
    metaphor: 'Le directeur d\'usine (espace noyau) qui détient les clés de haute tension électrique, et les ouvriers d\'atelier (espace utilisateur) qui doivent lui demander d\'activer les interrupteurs blindés.',
    linkedOS: ['Windows NT', 'Linux', 'macOS (XNU)', 'SunOS / Solaris']
  },
  {
    id: 'midi-mao',
    term: 'Interface MIDI & MAO d\'époque',
    category: 'historical',
    categoryLabel: 'Impact Historique & Usages',
    definition: 'Musical Instrument Digital Interface (standard industriel de transmission de données musicales). Intégré d\'office à un niveau bas de carte d\'exécution électronique, il a provoqué la naissance de la Musique Assistée par Ordinateur (MAO) en transformant l\'ordinateur personnel en séquenceur physique multipiste.',
    simplifiedExplanation: 'L\'Atari ST fut doté d\'office en 1985 de fiches rondes MIDI en métal. Sans nécessiter l\'achat d\'une onéreuse carte son additionnelle de laboratoire, tout musicien de chambre pouvait y brancher des synthétiseurs physiques et piloter tout un orchestre électronique.',
    metaphor: 'Une partition de musique numérique circulant par câbles physiques que l\'ordinateur n\'envoie pas sous forme de sons enregistrés, mais d\'ordres mathématiques de notes universelles de musique.',
    linkedOS: ['Atari TOS']
  },
  {
    id: 'bomb-error',
    term: 'Les Bombes Système / Crises de Registre',
    category: 'historical',
    categoryLabel: 'Impact Historique & Usages',
    definition: 'Représentation picturale ou symbolique historique employée par certains systèmes d\'exploitation des années 80 (Macintosh, Atari ST) pour signifier qu\'une instruction CPU incorrecte (panique système ou violation de bus d\'adresse) s\'est glissée au cœur du traitement de la RAM.',
    simplifiedExplanation: 'Sur Atari STf, voir s\'afficher subitement des petites bombes noires en haut à gauche de l\'écran de salon signifiait qu\'un bug fatal venait de paralyser la machine. On comptait le nombre de bombes pour identifier l\'erreur (par exemple, 4 bombes pour une erreur de bus physique !).',
    metaphor: 'Une sirène d\'évacuation de panique hurlant à l\'usine que quelqu\'un a mélangé des boîtiers d\'engrenages incompatibles.',
    linkedOS: ['Atari TOS', 'Mac OS Classic']
  }
];

export default function GlossaryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'architecture' | 'execution' | 'memory' | 'historical'>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(glossaryTerms[0].id);

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          term.simplifiedExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: GlossaryTerm['category']) => {
    switch (category) {
      case 'architecture': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'execution': return <Compass className="w-4 h-4 text-indigo-400" />;
      case 'memory': return <HardDrive className="w-4 h-4 text-amber-400" />;
      case 'historical': return <BookOpen className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-6 text-left" id="technical-glossary-panel">
      
      {/* Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-indigo-700 flex items-center justify-center shadow-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">Le Petit Glossaire d'Archéologie du Logiciel</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Démystifiez les termes complexes de l'ingénierie système grace à nos explications pédagogiques simplifiées et imagées.</p>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono tracking-wide">
          <span>MODULE : COMPRÉHENSION NOVICE & ACADÉMIQUE</span>
        </div>
      </div>

      {/* SEARCH AND FILTER COMPONENT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 animate-pulse" />
          <input
            type="text"
            placeholder="Rechercher un concept (ex: noyau, multitasking)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121215] border border-white/[0.06] focus:border-indigo-400 focus:outline-none rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 font-sans transition-all"
            id="glossary-search"
          />
        </div>

        {/* Category select buttons */}
        <div className="md:col-span-7 flex flex-wrap gap-1.5 md:justify-end">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm'
                : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            Tous les concepts
          </button>
          <button
            onClick={() => setSelectedCategory('architecture')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'architecture'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800/40 shadow-sm'
                : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Architecture
          </button>
          <button
            onClick={() => setSelectedCategory('execution')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'execution'
                ? 'bg-indigo-950 text-indigo-300 border-indigo-800/40 shadow-sm'
                : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Exécution
          </button>
          <button
            onClick={() => setSelectedCategory('memory')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'memory'
                ? 'bg-amber-950 text-amber-300 border-amber-800/40 shadow-sm'
                : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            Mémoire
          </button>
          <button
            onClick={() => setSelectedCategory('historical')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'historical'
                ? 'bg-rose-950 text-rose-300 border-rose-800/40 shadow-sm'
                : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Culture
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[400px]">
        
        {/* Left Side : list of terms with category badge */}
        <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1 select-none scrollbar-thin">
          <AnimatePresence>
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => {
                const isExpanded = expandedTermId === term.id;
                return (
                  <motion.div
                    key={term.id}
                    layoutId={`term-card-${term.id}`}
                    onClick={() => setExpandedTermId(term.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      isExpanded
                        ? 'bg-[#18181b] border-indigo-500/40 shadow-md shadow-indigo-950/10'
                        : 'bg-[#0c0c0e]/50 border-white/[0.04] hover:bg-[#121215]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(term.category)}
                          <span className="font-bold text-sm text-slate-100">{term.term}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 font-semibold">{term.categoryLabel}</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full self-center flex-shrink-0 ${isExpanded ? 'bg-indigo-400' : 'bg-transparent'}`} />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-500 text-xs">
                Aucun concept ne correspond à votre saisie. Essayez un autre mot !
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side : Selected Term Full Pedagogical Details Card */}
        <div className="lg:col-span-7 bg-[#121215] border border-white/[0.06] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {expandedTermId && glossaryTerms.find(term => term.id === expandedTermId) ? (
              (() => {
                const activeTerm = glossaryTerms.find(term => term.id === expandedTermId)!;
                return (
                  <motion.div
                    key={activeTerm.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="space-y-6 flex flex-col h-full justify-between"
                  >
                    
                    <div className="space-y-4">
                      {/* Category and Title */}
                      <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
                        <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.06]">
                          {getCategoryIcon(activeTerm.category)}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wide">
                            {activeTerm.categoryLabel}
                          </span>
                          <h4 className="text-lg font-bold text-white leading-tight">{activeTerm.term}</h4>
                        </div>
                      </div>

                      {/* Scientific rigorous definition */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#818cf8] uppercase tracking-wider block">Définition Académique</span>
                        <p className="text-xs text-zinc-350 leading-relaxed text-justify bg-[#09090b]/40 border border-white/[0.04] p-3 rounded-lg">
                          {activeTerm.definition}
                        </p>
                      </div>

                      {/* Simplified breakdown for absolute beginners */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">L'Explication Simplifiée (Novice)</span>
                        <p className="text-xs text-emerald-100/90 leading-relaxed text-justify font-sans">
                          {activeTerm.simplifiedExplanation}
                        </p>
                      </div>

                      {/* Pedagogical Metaphor */}
                      <div className="space-y-1.5 bg-amber-950/10 border border-amber-900/15 p-4 rounded-xl relative overflow-hidden">
                        <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block flex items-center gap-1.5">
                          💡 Image ou Métaphor du Quotidien
                        </span>
                        <p className="text-xs text-amber-200/90 leading-relaxed font-sans italic text-justify mt-1">
                          "{activeTerm.metaphor}"
                        </p>
                      </div>
                    </div>

                    {/* Linked OS list tags */}
                    <div className="border-t border-white/[0.05] pt-4 mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">SYSTÈMES LIÉS :</span>
                      {activeTerm.linkedOS.map((osName) => (
                        <span
                          key={osName}
                          className="bg-indigo-950/30 text-[#818cf8] border border-indigo-900/40 text-[9px] px-2.5 py-0.5 rounded-full font-mono"
                        >
                          {osName}
                        </span>
                      ))}
                    </div>

                  </motion.div>
                );
              })()
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto text-zinc-500">
                <HelpCircle className="w-12 h-12 text-zinc-700 stroke-[1.2] mb-3 animate-pulse" />
                <p className="text-sm font-semibold text-zinc-400 animate-bounce">Sélectionnez un concept technique</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
                  Cliquez sur l'un des termes dans la liste à gauche pour révéler ses explications détaillées, ses métaphores d'apprentissage et les systèmes associés.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
