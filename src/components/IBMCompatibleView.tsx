import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Cpu, Award, ShieldAlert, Sparkles, Server, FileText, CheckCircle2, XCircle, ArrowRight, RefreshCw, Layers, Compass, ExternalLink } from 'lucide-react';

interface CleanRoomStep {
  title: string;
  actor: string;
  description: string;
  legalStatus: string;
}

const cleanRoomSteps: CleanRoomStep[] = [
  {
    title: "1. Lecture & Autopsie de la Spécification",
    actor: "Équipe A (Les Analystes Juridiques)",
    description: "Cette équipe lit la ROM originale d'IBM et le manuel technique officiel d'IBM (qui contenait étrangement l'intégralité du code source imprimé de la BIOS !). Ils rédigent un cahier des charges décrivant uniquement les entrées, sorties et comportements exacts de chaque relais matériel, sans jamais copier une seule ligne de code d'assemblage.",
    legalStatus: "Totalement légal : L'analyse fonctionnelle d'un produit concurrent est protégée par le droit d'ingénierie inversée."
  },
  {
    title: "2. Isolation Absolue (Chambre Stérile)",
    actor: "La Barrière Juridique (Le Mur de Berlin)",
    description: "Une cloison hermétique sépare les deux équipes. Aucun membre de l'Équipe A n'a le droit de parler directement à un membre de l'Équipe B. Les seuls transferts autorisés se font par écrit sous la supervision d'avocats assermentés pour s'assurer qu'aucune information d'implémentation secrète d'IBM ne fuite.",
    legalStatus: "Crucial : C'est ce rempart strict qui prouve devant les tribunaux l'absence totale de violation de copyright."
  },
  {
    title: "3. Réécriture Indépendante (Clean Room)",
    actor: "Équipe B (Les Codeurs Vierges)",
    description: "Compo sée de développeurs n'ayant JAMAIS posé les yeux sur le code d'IBM ni travaillé sur le BIOS original. Ils traduisent les spécifications de l'Équipe A en assembleur 8086 flambant neuf. Si la spécification dit 'L'appel INT 13h doit lire le secteur de disquette', ils programment leur propre fonction pour y parvenir.",
    legalStatus: "Souverain : Le code produit est 100% original. IBM ne peut pas attaquer en justice pour contrefaçon."
  },
  {
    title: "4. Naissance du Clone Compatible",
    actor: "Compaq Computer (Novembre 1982)",
    description: "Le BIOS Compaq est né. Il est compatible à 100% avec tous les logiciels écrits pour l'IBM PC original (dont le célèbre tableur Lotus 1-2-3 et Flight Simulator). Compaq lance le 'Compaq Portable', déchaînant l'ère des compatibles IBM et brisant définitivement le monopole physique d'IBM sur sa propre norme.",
    legalStatus: "Historique : IBM intente un procès de plusieurs millions de dollars mais perd lamentablement, validant la légitimité universelle du clonage."
  }
];

export default function IBMCompatibleView() {
  const [activeSubTab, setActiveSubTab] = useState<'cloning' | 'apple-survival' | 'simulation'>('cloning');
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Interactive Simulation variables
  const [biosInterruption, setBiosInterruption] = useState<'int10' | 'int13' | 'int21' | 'int15'>('int10');
  const [biosBrand, setBiosBrand] = useState<'ibm' | 'phoenix' | 'compaq_clean' | 'bad_copy'>('compaq_clean');

  const getInterruptionOutput = (interrupt: string, brand: string) => {
    if (brand === 'bad_copy') {
      return {
        status: 'FÉLÉ (Crash)',
        badgeColor: 'bg-red-950/40 text-red-400 border-red-900/40',
        message: `BIOS ERROR STACK UNDERFLOW at INT ${interrupt === 'int10' ? '10h' : interrupt === 'int13' ? '13h' : interrupt === 'int15' ? '15h' : '21h'}.\nRegistres corrompus : AX=00FFh BX=F000h\nLe système d'exploitation plante violemment (L'application requiert des adresses de ROM propriétaires d'IBM qui n'existent pas ici !)`,
        beeps: 3
      };
    }
    
    switch (interrupt) {
      case 'int10': // Video
        return {
          status: 'SUCCÈS (Compatible)',
          badgeColor: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40',
          message: `INT 10h execution successful (${brand === 'ibm' ? 'IBM True ROM' : brand === 'compaq_clean' ? 'Compaq Clean BIOS v1.1' : 'Phoenix Technologies BIOS v4.0'})\nAH = 0Eh (Write Text in Teletype Mode)\nAL = 'A' (ASCII 65)\nBH = Page 0, BL = Accent color 0Fh.\nOutput: Le caractère 'A' s'affiche avec succès en mode texte 80x25.`,
          beeps: 1
        };
      case 'int13': // Disk read
        return {
          status: 'SUCCÈS (Compatible)',
          badgeColor: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40',
          message: `INT 13h execution successful (${brand === 'ibm' ? 'IBM True ROM' : brand === 'compaq_clean' ? 'Compaq Clean BIOS v1.1' : 'Phoenix Technologies BIOS v4.0'})\nAH = 02h (Read Diskette Sector)\nAL = 1 sector, CH = Track 0, CL = Sector 1 (Boot Record)\nDL = Diskette Drive A:\nStatus returned: CF = 0 (No Errors), Sector loaded safely in memory segment ES:BX.`,
          beeps: 1
        };
      case 'int21': // DOS services
        return {
          status: 'SUCCÈS (Compatible)',
          badgeColor: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40',
          message: `INT 21h execution successful (${brand === 'ibm' ? 'IBM True ROM' : brand === 'compaq_clean' ? 'Compaq Clean BIOS v1.1' : 'Phoenix Technologies BIOS v4.0'})\nAH = 4Ch (Terminate Process with Return Code)\nAL = 00h (Normal exit code)\nControl returned successfully to command interpreter COMMAND.COM. Buffer flushed.`,
          beeps: 1
        };
      case 'int15': // Cassette / System calls (Where true IBM ROM had proprietary code)
        if (brand === 'compaq_clean' || brand === 'phoenix') {
          return {
            status: 'ÉMULÉ (Ok)',
            badgeColor: 'bg-yellow-950/40 text-yellow-300 border-yellow-900/45',
            message: `INT 15h redirection executed by Virtualization (${brand === 'compaq_clean' ? 'Compaq' : 'Phoenix'})\nAH = C0h (Get Configuration Parameters)\nLe BIOS intercepte la demande et renvoie de fausses coordonnées d'identité indiquant au système d'exploitation qu'aucune platine de cassette IBM d'origine n'est branchée.\nLe système d'exploitation ignore l'absence et continue sans crasher.`,
            beeps: 2
          };
        }
        return {
          status: 'SUCCÈS (Compatible)',
          badgeColor: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40',
          message: `INT 15h executing directly on IBM Hardware.\nAH = C0h (Get Configuration Parameters)\nSystem ROM returns exact signature [Model code FCh (IBM PC/AT), submodel 01h, BIOS revision 00h].\nCassette tape motor initialized in background. Ready.`,
          beeps: 1
        };
      default:
        return { status: 'UNKNOWN', badgeColor: 'bg-zinc-800', message: 'Ready.', beeps: 0 };
    }
  };

  const currentResult = getTechnicalMetrics(biosInterruption, biosBrand);

  function getTechnicalMetrics(inter: string, brand: string) {
    return getInterruptionOutput(inter, brand);
  }

  const handleTestSimulation = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      let count = currentResult.beeps;
      const playBeep = () => {
        if (count <= 0) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(currentResult.status.includes('FÉLÉ') ? 220 : 900, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
        count--;
        if (count > 0) {
          setTimeout(playBeep, 150);
        }
      };
      playBeep();
    } catch(e) {
      // AudioContext failure expected inside restrictive iframes
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-6 text-left" id="ibm-compatible-study-panel">
      
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <Server className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              L'Affaire "IBM Compatible" & Le Destin d'Apple
              <span className="text-[10px] font-mono bg-blue-950/40 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded">
                STANDARDISATION VS INDÉPENDANCE
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Enquête historique : Comment l'ingénierie inversée a créé le PC universel et pourquoi Apple a été le seul rescapé.</p>
          </div>
        </div>
      </div>

      {/* Nav Sub Tabs */}
      <div className="flex border-b border-white/[0.06] pb-2 gap-3 overflow-x-auto scrollbar-none select-none">
        <button
          onClick={() => setActiveSubTab('cloning')}
          className={`text-xs px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeSubTab === 'cloning' ? 'bg-[#18181b] border border-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-blue-400" />
          ⚡ Le Hold-Up de Compaq (Reverse Engineering)
        </button>
        <button
          onClick={() => setActiveSubTab('apple-survival')}
          className={`text-xs px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeSubTab === 'apple-survival' ? 'bg-[#18181b] border border-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          🍎 La Trilogie Captive : Comment Apple a survécu
        </button>
        <button
          onClick={() => setActiveSubTab('simulation')}
          className={`text-xs px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-2 ${
            activeSubTab === 'simulation' ? 'bg-[#18181b] border border-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Cpu className="w-4 h-4 text-emerald-400" />
          📟 Laboratoire des Interruptions BIOS
        </button>
      </div>

      {/* Render Sub Panels */}
      <AnimatePresence mode="wait">
        
        {/* SUB TAB 1: THE CLONING REVOLUTION */}
        {activeSubTab === 'cloning' && (
          <motion.div
            key="sub-cloning"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            {/* Context introduction */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#121215]/50 border border-white/[0.04] p-5 rounded-xl">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold bg-blue-950/30 px-2 py-0.5 rounded border border-blue-900/30 uppercase inline-block">LA GENÈSE</span>
                <h4 className="text-lg font-extrabold text-white">L'Erreur d'Architecture d'IBM ou la Boîte de Pandore</h4>
                <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                  En 1980, pressé par l'essor fulgurant d'Apple et de Tandy, le géant international <strong>IBM</strong> décide de concevoir son premier ordinateur personnel en un temps record de 12 mois. Pour aller vite, l'équipe menée par Don Estridge brise tous les dogmes d'IBM. Au lieu de concevoir leurs propres circuits sur mesure, ils assemblent l'ordinateur à partir d'éléments sur étagère : un processeur <strong>Intel 8088</strong>, un système d'exploitation acheté à Microsoft (<strong>PC-DOS / MS-DOS</strong>), et un bus ouvert dont les plans sont rendus publics.
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                  <strong>Le piège machiavélique :</strong> La seule chose qu'IBM brevette est son précieux firmware de démarrage, le <strong>BIOS</strong> (Basic Input/Output System) soudé en ROM physique. Sans ce BIOS d'origine, aucun ordinateur concurrent ne peut prétendre faire tourner les logiciels écrits pour l'IBM PC. La forteresse d'IBM paraissait imprenable, jusqu'à ce que trois ingénieurs de Houston (les fondateurs de Compaq) se réunissent dans un restaurant de tartes pour dessiner la méthode juridique ultime : la <strong>Clean-Room Reverse Engineering</strong>.
                </p>
              </div>

              {/* Informative side panel */}
              <div className="lg:col-span-3 lg:col-start-10 bg-black/40 border border-white/[0.05] p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">LES PROTAGONISTES</span>
                  <div className="space-y-3 pt-1">
                    <div>
                      <span className="text-[10px] text-blue-400 font-bold block">IBM Corporation</span>
                      <p className="text-[10px] text-zinc-400">Le roi détrôné de son propre standard ouvert.</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-400 font-bold block">Compaq Computer</span>
                      <p className="text-[10px] text-zinc-400">Premier à cloner légalement le BIOS en 1982.</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold block">Phoenix & Award</span>
                      <p className="text-[10px] text-zinc-400">Vendeurs de BIOS clones à toutes les usines du monde.</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/[0.05] pt-3 mt-4 text-[9px] text-zinc-500 font-mono flex items-center gap-1">
                  <span>ℹ️</span> Source : "The Compaq Story", Smithsonian Institution.
                </div>
              </div>
            </div>

            {/* Interactive Clean Room Stepper graph */}
            <div className="space-y-4">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                Interactivité : Anatomie de l'Ingénierie Inverse "Clean Room"
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 select-none">
                {cleanRoomSteps.map((step, idx) => {
                  const isSelected = idx === currentStep;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-950/20 border-blue-500/50 text-white shadow-lg shadow-blue-950/10'
                          : 'bg-[#0c0c0e]/30 border-white/[0.04] hover:bg-[#121215] text-zinc-500'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">ÉTAPE {idx + 1}</span>
                      <div className="font-bold text-xs">{step.title.split('. ')[1]}</div>
                    </button>
                  );
                })}
              </div>

              {/* Step info Display card */}
              <div className="bg-[#121215]/80 border border-white/[0.06] rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/2 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold bg-blue-950/30 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded">
                      INTERACTEUR : {cleanRoomSteps[currentStep].actor}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      {cleanRoomSteps[currentStep].legalStatus}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{cleanRoomSteps[currentStep].title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed text-justify whitespace-pre-line bg-black/20 p-4 rounded-lg border border-white/[0.02]">
                    {cleanRoomSteps[currentStep].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Impact & Verdict section */}
            <div className="bg-red-950/10 border border-red-900/15 p-4 rounded-xl space-y-2">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1 font-mono uppercase">
                <ShieldAlert className="w-4 h-4" />
                La Conséquence de la standardisation
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Grâce au revers de Compaq et à la mise en vente de BIOS universels par <strong>Phoenix Technologies</strong>, n'importe quelle usine (notamment à Taiwan, en Corée et aux USA avec Dell et Gateway) a pu assembler des clones d'ordinateurs PC compatibles IBM bon marché. 
                Les prix ont chuté de 60%. Ce raz-de-marée a instantanément broyé tous les systèmes d'exploitation propriétaires d'architectures alternatives : l'<strong>Amiga</strong>, l'<strong>Atari ST</strong>, l'<strong>Amstrad CPC</strong> et les machines <strong>Thomson</strong> ont tous été évincés car impossibles à standardiser dans le milieu de l'entreprise.
              </p>
            </div>

          </motion.div>
        )}

        {/* SUB TAB 2: APPLE THE SOLE SURVIVOR */}
        {activeSubTab === 'apple-survival' && (
          <motion.div
            key="sub-apple"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            <div className="bg-[#121215]/50 border border-white/[0.04] p-5 rounded-xl space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/30 uppercase inline-block font-mono">LA SURVIE SANS CONCESSION</span>
              <h4 className="text-lg font-extrabold text-white">Pourquoi Apple a-t-il été l'unique rescapé du rouleau compresseur ?</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                À la fin des années 1980, le rouleau compresseur des clones compatibles IBM / MS-DOS capte plus de 90% des parts de marché informatique mondial de bureau. Apple, alors isolé avec sa politique de système d'exploitation fermé intimement marié à des composants matériels propriétaires coûteux, évite de justesse de couler dans les mêmes profondeurs que Commodore ou Atari. 
                Le secret de cette résilience historique réside dans une convergence technologique exceptionnelle que les historiens nomment la <strong>La Sainte Trilogie de la PAO (DTP - Desktop Publishing)</strong>.
              </p>
            </div>

            {/* Graphic Comparison of Strategic pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="bg-black/40 border border-[#818cf8]/20 p-5 rounded-xl space-y-3 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/2 rounded-full blur-xl" />
                <span className="text-[9px] font-mono text-indigo-400 font-bold block uppercase tracking-widest text-[9px]">Pillier 1 : Le Rendu Typographique</span>
                <h5 className="text-sm font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Adobe PostScript
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Créé par John Warnock et Charles Geschke (fondateurs de l'éditeur Adobe), le <strong>PostScript</strong> est un langage de description de page vectoriel. Il permet de décrire parfaitement des courbes géométriques d'une courbe typographique sans aucune pixellisation, quelle que soit la résolution d'impression. Steve Jobs signe l'achat d'une licence exclusive de 2,5 millions de dollars de PostScript pour le Macintosh.
                </p>
              </div>

              <div className="bg-black/40 border border-pink-500/20 p-5 rounded-xl space-y-3 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/2 rounded-full blur-xl" />
                <span className="text-[9px] font-mono text-pink-400 font-bold block uppercase tracking-widest text-[9px]">Pillier 2 : Le Hardwear de Confiance</span>
                <h5 className="text-sm font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  Apple LaserWriter (1985)
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Apple commercialise la première imprimante laser individuelle abordable de haute définition (300 PPP), embarquant son propre processeur Motorola 68000 interne dédié uniquement à exécuter le code PostScript d'Adobe. Un document complexe conçu sur l'écran noir et blanc impeccable du Macintosh s'imprime en papier glacé identique à un tirage professionnel industriel.
                </p>
              </div>

              <div className="bg-black/40 border border-emerald-500/20 p-5 rounded-xl space-y-3 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/2 rounded-full blur-xl" />
                <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-widest text-[9px]">Pillier 3 : L'Outil Intrépide</span>
                <h5 className="text-sm font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Aldus PageMaker
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Le logiciel qui a consolidé le concept d'auto-édition à l'écran : le <strong>WYSIWYG</strong> (What You See Is What You Get). L'utilisateur ajuste les blocs typographiques au millimètre, intègre des logos dessinés à la souris avec Adobe Illustrator, et envoie le tout sans aucune connaissance en programmation à l'imprimante LaserWriter.
                </p>
              </div>

            </div>

            {/* Historians key analysis */}
            <div className="bg-[#121215] border border-white/[0.05] rounded-xl p-5 md:p-6 space-y-3 text-left">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">Note de l'étude d'Archéologie du Silicium :</h5>
              <p className="text-xs text-zinc-350 leading-relaxed text-justify font-sans">
                <strong>Le Bastion de la Création :</strong> Grâce à ce brevet d'auto-édition (PAO), le Macintosh est devenu l'équipement obligatoire et indiscutable de toutes les agences de publicité, imprimeries, rédactions de presse et studios de graphistes créatifs d'Europe et d'Amérique. Là où le PC compatible d'IBM régnait sur les froids calculs statistiques d'Excel, Apple a sécurisé un territoire créatif de haute marge financière, impénétrable par ses concurrents.
              </p>
              <p className="text-xs text-zinc-450 leading-relaxed text-justify font-mono">
                "Si Apple n'avait pas consolidé ce monopole sur le graphisme, les polices de caractères vectorielles dynamiques et la PAO entre 1985 et 1990, la marque aurait irrémédiablement disparu du marché du matériel bien avant le retour triomphal de Steve Jobs avec l'iMac en 1997." - <em>Source: Steve Jobs par Walter Isaacson, Chapitre 16.</em>
              </p>
            </div>

          </motion.div>
        )}

        {/* SUB TAB 3: BIOS INTERRUPTION SIMULATOR LAB */}
        {activeSubTab === 'simulation' && (
          <motion.div
            key="sub-sim"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            <div className="bg-[#121215]/40 border border-white/[0.03] p-4 rounded-xl">
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                <strong>Le Défi de la Compatibilité :</strong> Pour faire tourner MS-DOS ou des jeux comme Flight Simulator, un ordinateur clone devait intercepter parfaitement les vecteurs d'interruptions du microprocesseur assemblés par IBM. Choisissez une interruption et un fabricant de BIOS pour tester l'intégrité de l'exécution en temps réel.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#121215]/50 border border-white/[0.04] p-5 rounded-xl">
              
              {/* Controls left */}
              <div className="lg:col-span-5 space-y-5 flex flex-col justify-between select-none">
                <div className="space-y-4">
                  
                  {/* Selector A: Interruption */}
                  <div className="space-y-2 bg-[#09090b]/50 p-4 border border-white/[0.02] rounded-lg">
                    <label className="text-xs text-zinc-400 font-bold block">1. Vecteur d'Interruption CPU à solliciter</label>
                    <div className="grid grid-cols-1 gap-1.5 pt-1.5">
                      <button
                        onClick={() => setBiosInterruption('int10')}
                        className={`text-left text-[11px] font-mono p-2.5 rounded-lg border transition-all cursor-pointer ${
                          biosInterruption === 'int10' 
                            ? 'bg-blue-950/30 text-blue-400 border-blue-900/40' 
                            : 'bg-black text-zinc-500 border-transparent hover:text-zinc-300'
                        }`}
                      >
                        🔥 INT 10h (Services d'Affichage Vidéo de base)
                      </button>
                      <button
                        onClick={() => setBiosInterruption('int13')}
                        className={`text-left text-[11px] font-mono p-2.5 rounded-lg border transition-all cursor-pointer ${
                          biosInterruption === 'int13' 
                            ? 'bg-blue-950/30 text-blue-400 border-blue-900/40' 
                            : 'bg-black text-zinc-500 border-transparent hover:text-zinc-300'
                        }`}
                      >
                        💾 INT 13h (Opérations de lecture Disquettes bas-niveau)
                      </button>
                      <button
                        onClick={() => setBiosInterruption('int21')}
                        className={`text-left text-[11px] font-mono p-2.5 rounded-lg border transition-all cursor-pointer ${
                          biosInterruption === 'int21' 
                            ? 'bg-blue-950/30 text-[#818cf8] border-indigo-900/40' 
                            : 'bg-black text-zinc-500 border-transparent hover:text-zinc-300'
                        }`}
                      >
                        ⚙️ INT 21h (Appels Services de MS-DOS de Microsoft)
                      </button>
                      <button
                        onClick={() => setBiosInterruption('int15')}
                        className={`text-left text-[11px] font-mono p-2.5 rounded-lg border transition-all cursor-pointer ${
                          biosInterruption === 'int15' 
                            ? 'bg-blue-950/30 text-blue-450 border-blue-900/30' 
                            : 'bg-black text-zinc-500 border-transparent hover:text-zinc-300'
                        }`}
                      >
                        🔌 INT 15h (Authentification matérielle de signature IBM)
                      </button>
                    </div>
                  </div>

                  {/* Selector B: Bios target */}
                  <div className="space-y-2 bg-[#09090b]/50 p-4 border border-white/[0.02] rounded-lg">
                    <label className="text-xs text-zinc-400 font-bold block">2. Constructeur du BIOS récepteur</label>
                    <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                      <button
                        onClick={() => setBiosBrand('ibm')}
                        className={`text-center text-[10px] font-mono font-bold p-2 rounded-lg border transition-all cursor-pointer ${
                          biosBrand === 'ibm' 
                            ? 'bg-indigo-500 text-white border-transparent' 
                            : 'bg-black text-zinc-400 border-white/[0.05] hover:text-zinc-200'
                        }`}
                      >
                        IBM Original True ROM
                      </button>
                      <button
                        onClick={() => setBiosBrand('compaq_clean')}
                        className={`text-center text-[10px] font-mono font-bold p-2 rounded-lg border transition-all cursor-pointer ${
                          biosBrand === 'compaq_clean' 
                            ? 'bg-indigo-500 text-white border-transparent' 
                            : 'bg-black text-zinc-400 border-white/[0.05] hover:text-zinc-200'
                        }`}
                      >
                        Compaq Clean Room BIOS
                      </button>
                      <button
                        onClick={() => setBiosBrand('phoenix')}
                        className={`text-center text-[10px] font-mono font-bold p-2 rounded-lg border transition-all cursor-pointer ${
                          biosBrand === 'phoenix' 
                            ? 'bg-indigo-500 text-white border-transparent' 
                            : 'bg-black text-zinc-400 border-white/[0.05] hover:text-zinc-200'
                        }`}
                      >
                        Phoenix Technologies
                      </button>
                      <button
                        onClick={() => setBiosBrand('bad_copy')}
                        className={`text-center text-[10px] font-mono font-bold p-2 rounded-lg border transition-all cursor-pointer ${
                          biosBrand === 'bad_copy' 
                            ? 'bg-red-500 text-white border-transparent' 
                            : 'bg-black text-zinc-400 border-white/[0.05] hover:text-zinc-200'
                        }`}
                      >
                        Clone low-cost (Sans Test)
                      </button>
                    </div>
                  </div>

                </div>

                <button
                  onClick={handleTestSimulation}
                  className="w-full bg-[#18181b] hover:bg-[#202025] border border-white/[0.08] hover:border-white/[0.15] text-amber-400 py-3 rounded-xl font-bold font-mono text-xs cursor-pointer transition-all active:scale-[0.99]"
                >
                  ⚡ ÉXÉCUTER LE PIEU D'INSTRUCTION BIOS (BEEP)
                </button>
              </div>

              {/* Console output right */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                <div className="bg-black/95 border border-white/[0.06] rounded-xl p-5 font-mono text-[11px] leading-relaxed flex-1 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex justify-between items-center border-b border-white/[0.05] pb-2 mb-3">
                      <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        MONITEUR COMMANDE LOGIQUE BIOS
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${currentResult.badgeColor}`}>
                        {currentResult.status}
                      </span>
                    </div>

                    <p className="text-zinc-400 whitespace-pre-line text-justify leading-relaxed">
                      {currentResult.message}
                    </p>
                  </div>

                  <div className="border-t border-white/[0.05] pt-2 mt-4 text-[9px] text-[#818cf8] flex items-center justify-between">
                    <span>Espace d'adressage: SEGMENT F000h</span>
                    <span>OPÉRATION OK (EMULATEUR RETRO PC)</span>
                  </div>
                </div>

                <div className="bg-[#121215] border border-white/[0.04] p-3.5 rounded-xl text-left">
                  <span className="text-[10px] font-bold uppercase font-mono text-zinc-450 block">Le Saviez-Vous ?</span>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Les compagnies d'assemblage d'ordinateurs clones achetaient une licence chez <strong>Phoenix Technologies</strong> pour environ 290 000 $. Phoenix leur livrait alors un code BIOS certifié et 100% propre de tout procès contre IBM, démocratisant instantanément le standard PC dans le monde.
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
