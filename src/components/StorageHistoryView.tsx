import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Disc, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Code, 
  Cpu, 
  Layers, 
  HelpCircle, 
  Hourglass,
  Sparkles,
  RefreshCw,
  Sliders,
  Tv
} from 'lucide-react';

// Custom interface for the VRAM Interactive Pixel
interface RAMCell {
  address: number;
  value: number;
  color: string;
}

export default function StorageHistoryView() {
  // --- STATE FOR DISK FORMAT WAR ---
  const [activeFormat, setActiveFormat] = useState<'3inch' | '35inch'>('3inch');

  // --- STATE FOR INTERACTIVE PEEK & POKE RAM BOARD ---
  const vramStartAddress = 16384; // Classic microcomputer VRAM start (e.g. Sinclair, Thomson)
  const [ramCells, setRamCells] = useState<RAMCell[]>(() => {
    return Array.from({ length: 64 }, (_, i) => ({
      address: vramStartAddress + i,
      value: 0,
      color: '#0c0c0e' // empty black
    }));
  });
  const [selectedAddress, setSelectedAddress] = useState<number>(vramStartAddress);
  const [pokeValue, setPokeValue] = useState<number>(5); // Represents classic Color Indexes (0 to 7)
  const [lastExecutedMessage, setLastExecutedMessage] = useState<string>('Prêt pour manipulation directe.');

  // Color Mapping for BASIC colors
  const basicColors = [
    { name: 'Noir (0)', hex: '#0c0c0e' },
    { name: 'Bleu (1)', hex: '#2563eb' },
    { name: 'Rouge (2)', hex: '#dc2626' },
    { name: 'Magenta (3)', hex: '#c084fc' },
    { name: 'Vert (4)', hex: '#16a34a' },
    { name: 'Cyan (5)', hex: '#06b6d4' },
    { name: 'Jaune (6)', hex: '#eab308' },
    { name: 'Blanc (7)', hex: '#f8fafc' }
  ];

  const handlePoke = (addr: number, val: number) => {
    const clampedVal = Math.min(7, Math.max(0, val));
    setRamCells(prev => prev.map(cell => {
      if (cell.address === addr) {
        return {
          ...cell,
          value: clampedVal,
          color: basicColors[clampedVal].hex
        };
      }
      return cell;
    }));
    setLastExecutedMessage(`POKE ${addr},${clampedVal} effectué avec succès en Mémoire Vive !`);
  };

  const handleClearVram = () => {
    setRamCells(Array.from({ length: 64 }, (_, i) => ({
      address: vramStartAddress + i,
      value: 0,
      color: '#0c0c0e'
    })));
    setLastExecutedMessage('VRAM réinitialisée (tous les octets mis à 0).');
  };

  // --- STATE FOR CASSETTE TAPE LOADER ---
  const [isTapeRunning, setIsTapeRunning] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loaderLog, setLoaderLog] = useState<string>('CASSETTE DISPONIBLE : "L\'AIGLE D\'OR" (Aventure - 1984)');
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
  const [tapeReelRotation, setTapeReelRotation] = useState<number>(0);
  
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Synthesize Retro Tape Audio Loading sound (Frequencies alternating)
  const startTapeAudio = () => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Retro Tape Sound: high pitching frequencies
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime); // keep volume low and soft prevent ear fatigue
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      // Tape modulation sound
      const audioModulator = setInterval(() => {
        if (oscillatorRef.current && ctx.state === 'running') {
          // Rapid alternating screeching frequencies of old bands
          const freq = Math.random() > 0.5 ? 900 + Math.random() * 600 : 200 + Math.random() * 400;
          oscillatorRef.current.frequency.setValueAtTime(freq, ctx.currentTime);
        } else {
          clearInterval(audioModulator);
        }
      }, 80);

    } catch (e) {
      console.warn("Audio contexts limits:", e);
    }
  };

  const stopTapeAudio = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    } catch (e) {
      // Ignored
    }
  };

  // Handle Play tape simulation
  const handlePlayTape = () => {
    if (isTapeRunning) {
      // Stop Tape
      setIsTapeRunning(false);
      stopTapeAudio();
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
      setLoaderLog('Lecture interrompue. Données corrompues en mémoire !');
    } else {
      // Start Tape
      setIsTapeRunning(true);
      setLoadingProgress(0);
      setLoaderLog('RECHERCHE DU PROGRAMME ...');
      startTapeAudio();

      let currentStep = 0;
      loadingIntervalRef.current = setInterval(() => {
        setTapeReelRotation(prev => (prev + 12) % 360);
        currentStep += 1.5;
        if (currentStep >= 100) {
          currentStep = 100;
          setLoadingProgress(100);
          setIsTapeRunning(false);
          stopTapeAudio();
          if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
          setLoaderLog('FIN - CHARGEMENT REUSSI ! tapez RUN pour démarrer.');
          // Automatically register high score in the POKE window!
          handlePoke(16410, 6);
          handlePoke(16411, 4);
          handlePoke(16412, 6);
          handlePoke(16413, 1);
        } else {
          setLoadingProgress(currentStep);
          // Simulate retro console loading screen logs
          if (currentStep > 90) {
            setLoaderLog('CHARGEMENT SYSTEM BLOCK 3/3 (MÉMOIRE FIXÉE)');
          } else if (currentStep > 65) {
            setLoaderLog('OUVERTURE "L\'AIGLE D\'OR" (SCREEN 1 - DECOMPRESSION)');
          } else if (currentStep > 40) {
            setLoaderLog('BLOC TROUVÉ : "L\'AIGLE D\'OR" (32KB OK)');
          } else if (currentStep > 15) {
            setLoaderLog('SYNCHRONISATION BAUD EN COURS (CRITICAL HEADER OK)');
          }
        }
      }, 150);
    }
  };

  // Toggle sound mid flight
  useEffect(() => {
    if (isTapeRunning) {
      if (isSoundEnabled) {
        startTapeAudio();
      } else {
        stopTapeAudio();
      }
    }
    return () => stopTapeAudio();
  }, [isSoundEnabled]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
      stopTapeAudio();
    };
  }, []);

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-8 text-left" id="storage-history-panel">
      
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">Histoire Secrète de la Mémoire & des Supports</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Comment les pionniers optimisaient leurs megabytes de mémoire vive et s'affrontaient à coups de disquettes propriétaires.</p>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono text-left md:text-right">
          <span>SECTION : ARCHIVES DES TECHNIQUES LOGICIELLES</span>
        </div>
      </div>

      {/* HISTORIAN ESSAY INTRO */}
      <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 md:p-6 space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <span>📜</span> Carnet de l'Archéologue : Survivre avec quelques Kilooctets
        </h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
          Aujourd'hui, l'exécution d'un simple éditeur de code consomme des gigaoctets de mémoire vive. Mais de 1980 à 1988, 
          <strong> la RAM était le champ de bataille de l'ingéniosité humaine</strong>. Avec seulement 16 Ko, 48 Ko ou 64 Ko disponibles, le système d'exploitation n'était pas une couche protectrice isolée : il cohabitait de façon intime avec vos variables. Écrire un jeu vidéo impliquait de court-circuiter le processeur vidéo, de forger des briques de code binaire directement injectées en mémoire vive brute, et de stocker nos mondes imaginaires sur de banales cassettes magnétiques musicales dont le son strident modulait en octets physiques. Explorons ces techniques d'épaves d'hier.
        </p>
      </div>

      {/* THREE MAIN CHRONOLOGY TABS (OR CARDS GRID) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* SECTION 1: PEKING & POKING IN DIRECT RAM */}
        <div className="border border-white/[0.06] bg-[#121215] rounded-xl p-5 md:p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white font-sans flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              1. POKE et PEEK : Coder directement sur la RAM brute !
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed text-justify">
              Sur les micro-ordinateurs 8 bits (Amstrad CPC, MO5, Commodore 64, ZX Spectrum), il n'existait pas de "Driver". Pour afficher de la couleur sur la télévision cathodique, le programmeur <strong>"POKAIT"</strong> directement des valeurs hexadécimales dans la plage mémoire matérielle réservée à l'affichage : la <strong>VRAM (Video RAM)</strong>.
            </p>
            <div className="text-xs text-zinc-300 bg-black/40 p-3.5 rounded-lg border border-white/[0.04] space-y-2 font-sans">
              <p>
                💡 <span className="font-bold text-indigo-300">La syntaxe d'époque :</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-1 font-mono text-[11px]">
                <li><code className="text-emerald-400 font-bold">POKE adresse, valeur</code> : Écrit la valeur (0-255) dans l'adresse spécifiée.</li>
                <li><code className="text-indigo-400 font-bold">PEEK(adresse)</code> : Lit le contenu binaire actuel de l me'moire à cette adresse.</li>
              </ul>
              <p className="text-zinc-400 text-[11px] leading-relaxed mt-2 italic">
                En injectant ainsi du langage assembleur machine sous forme de blocs d'octets avec une boucle, on forçait l'ordinateur à contourner la lenteur du BASIC de Microsoft pour faire d'incroyables graphismes de jeux !
              </p>
            </div>
          </div>

          {/* INTERACTIVE BOARD SIMULATOR */}
          <div className="bg-[#09090b]/80 border border-white/[0.04] rounded-xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/[0.05] pb-2.5">
              <div>
                <span className="text-[11px] text-zinc-500 font-mono">SIMULATEUR DE TABLEAU VRAM (8x8 PIXELS)</span>
                <p className="text-xs text-white font-bold">Plage d'adresses active : {vramStartAddress} à {vramStartAddress + 63}</p>
              </div>
              <button 
                onClick={handleClearVram}
                className="px-2.5 py-1 text-[10px] font-mono hover:text-white bg-zinc-900 border border-white/[0.06] hover:border-red-500/40 rounded transition-all cursor-pointer"
              >
                Reset VRAM
              </button>
            </div>

            {/* Visual Grid representing VRAM cells */}
            <div className="grid grid-cols-8 gap-1.5 justify-center max-w-[280px] mx-auto sm:mx-0">
              {ramCells.map((cell) => {
                const isSelected = cell.address === selectedAddress;
                return (
                  <button
                    key={cell.address}
                    onClick={() => {
                      setSelectedAddress(cell.address);
                    }}
                    style={{ backgroundColor: cell.color }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded transition-all flex items-center justify-center text-[8px] font-mono font-bold cursor-pointer relative border ${
                      isSelected ? 'border-indigo-400 scale-110 shadow-lg shadow-indigo-500/10 z-10' : 'border-white/[0.1]'
                    }`}
                    title={`Adresse RAM : ${cell.address} | Valeur couleur : ${cell.value}`}
                  >
                    <span className={cell.value > 5 ? 'text-black' : 'text-zinc-500'}>
                      {cell.value}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RAM control panel for Poke values */}
            <div className="bg-[#121215]/80 p-3 rounded-lg border border-white/[0.04] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-zinc-500 font-mono text-[10px] mb-1">ADRESSE RAM CIBLE</label>
                  <select 
                    value={selectedAddress} 
                    onChange={(e) => {
                      setSelectedAddress(parseInt(e.target.value));
                    }}
                    className="w-full bg-[#0c0c0e] border border-white/[0.08] text-white rounded font-mono p-1 text-[11px] focus:outline-none focus:border-indigo-500"
                  >
                    {ramCells.map(c => (
                      <option key={c.address} value={c.address}>Adr {c.address} (Octet {c.address - vramStartAddress})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-500 font-mono text-[10px] mb-1">INJECTER VALEUR (COULEUR REGISTRE)</label>
                  <select 
                    value={pokeValue} 
                    onChange={(e) => {
                      setPokeValue(parseInt(e.target.value));
                    }}
                    className="w-full bg-[#0c0c0e] border border-white/[0.08] text-white rounded font-mono p-1 text-[11px] focus:outline-none focus:border-indigo-500"
                  >
                    {basicColors.map((col, idx) => (
                      <option key={idx} value={idx}>{col.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Poke Button trigger */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handlePoke(selectedAddress, pokeValue)}
                  className="w-full sm:w-auto px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-lg text-xs tracking-wide transition-all shadow-md shadow-indigo-950/40 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5" />
                  ENTRER POKE {selectedAddress}, {pokeValue}
                </button>
                <div className="text-[10px] font-mono text-emerald-400 italic flex-1 text-center sm:text-right">
                  {lastExecutedMessage}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: CASSETTE TAPE DATA MODULATION */}
        <div className="border border-white/[0.06] bg-[#121215] rounded-xl p-5 md:p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white font-sans flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-500" />
              2. Les Cassettes : Écouter la Musique des Données Digitales
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed text-justify">
              En 1982, un lecteur de disquette coûtait plus cher que l'ordinateur lui-même. La solution ? Utiliser le 
              <strong> lecteur à bande audio magnétique (K7)</strong> du salon ! 
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed text-justify">
              Puisque les bandes magnétiques n'enregistraient que de l'analogue, les circuits de l'ordinateur modulaient l'arbre binaire en modifiant les fréquences sonores : un son strident aigu pour un bit <span className="text-white font-mono font-bold font-sm">1</span>, et un son d'onde moyenne pour un bit <span className="text-white font-mono font-bold font-sm">0</span>. Le fameux grincement insupportable qui résonnait dans les haut-parleurs des télévisions cathodiques était la voix brute de la donnée binaire en pleine migration !
            </p>
          </div>

          <div className="bg-[#09090b]/80 border border-white/[0.04] rounded-xl p-4 space-y-4">
            
            {/* Visual diagram container of tape recorder */}
            <div className="bg-[#1c1c22] rounded-xl border border-[#30303b] p-4 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 font-mono text-[9px] text-zinc-500 tracking-wider">
                CASSETTE PLAYER MODEL REC-83
              </div>

              {/* Physical tape visual */}
              <div className="w-24 h-16 bg-[#121215] border border-[#2a2a35] rounded-md relative p-1.5 flex flex-col justify-between overflow-hidden flex-shrink-0">
                <div className="bg-yellow-800/80 rounded h-1 text-center text-[7px] text-black font-semibold uppercase leading-tight">
                  TAPE 1 - DATA
                </div>
                {/* Reels */}
                <div className="flex items-center justify-around py-1">
                  <div 
                    className="w-5 h-5 rounded-full border-4 border-dashed border-zinc-600 bg-black flex items-center justify-center"
                    style={{ transform: `rotate(${tapeReelRotation}deg)` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  </div>
                  <div 
                    className="w-5 h-5 rounded-full border-4 border-dashed border-zinc-600 bg-black flex items-center justify-center"
                    style={{ transform: `rotate(${tapeReelRotation}deg)` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  </div>
                </div>
                <div className="text-[6px] text-zinc-500 font-mono text-center">NORMAL BIAS - 60MIN</div>
              </div>

              {/* Controls and Audio triggers */}
              <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                <p className="text-[10px] font-mono text-amber-400">SUPPORT LOADER LOGS :</p>
                <div className="text-xs text-white bg-black/50 p-2 border border-white/[0.04] rounded-md font-mono min-h-[46px] flex items-center justify-center sm:justify-start">
                  <span className="text-red-400 animate-pulse text-[11px] text-left leading-tight">
                    {loaderLog}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
                  <button
                    onClick={handlePlayTape}
                    className={`px-3 py-1.5 rounded text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 cursor-pointer transition-all ${
                      isTapeRunning 
                        ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' 
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {isTapeRunning ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isTapeRunning ? 'STOP RECORDER' : 'PLAY CASSETTE'}
                  </button>

                  <button
                    onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                    className={`p-1.5 rounded border transition-all cursor-pointer ${
                      isSoundEnabled 
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-300' 
                        : 'bg-zinc-900 border-white/[0.08] text-zinc-500'
                    }`}
                    title={isSoundEnabled ? 'Son activé (Sifflement analogique)' : 'Sifflement analogique coupé'}
                  >
                    {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Loader progress bar screen simulation */}
            {isTapeRunning && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                  <span>CHARGEMENT ANALOGIQUE EN COURS...</span>
                  <span>{loadingProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-[#1c1c22] h-4 rounded border border-white/[0.06] overflow-hidden p-0.5 relative">
                  {/* Spectrum lines overlay like old game loader */}
                  <div className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-[0.2]">
                    <div className="h-0.5 w-full bg-red-400 animate-pulse" />
                    <div className="h-0.5 w-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.1s' }} />
                    <div className="h-0.5 w-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <motion.div 
                    className="h-full bg-amber-500 rounded-sm"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            )}

            <div className="text-[10px] text-zinc-500 italic mt-1 bg-zinc-950/40 p-2.5 rounded border border-white/[0.03]">
              ⚠️ <span className="font-semibold">Note de l'historien :</span> Un chargement entier de cassette de 48 Ko de données prenait en réalité environ <strong>12 à 15 minutes</strong> de sifflements sans fin. Un simple coup de téléphone ou un choc sur la table faisait rater le chargement !
            </div>

          </div>

        </div>

      </div>

      {/* THREE-INCH VS THRE-AND-A-HALF FORMAT WAR IN DETAILS */}
      <div className="border border-white/[0.06] bg-[#121215] rounded-xl p-5 md:p-6 space-y-6">
        
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <Disc className="w-5 h-5 text-rose-500" />
            3. Le Duel des Disquettes : L'Énigme du Format 3 Pouces contre 3,5 Pouces
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed text-justify">
            À l'orée des années 1980, le format géant de la souple disquette 5,25 pouces (celle de l'IBM PC ancestral) devenait obsolète car trop fragile et encombrante. Une féroce guerre de normalisation s'est ouverte entre différents consortiums industriels japonais et américains pour imposer le successeur compact.
          </p>
        </div>

        {/* Dynamic Selector tabs */}
        <div className="flex border-b border-white/[0.06] gap-2 pb-1">
          <button
            onClick={() => setActiveFormat('3inch')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
              activeFormat === '3inch'
                ? 'bg-[#18181b] text-rose-400 border-rose-500/30 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-white/[0.02]'
            }`}
          >
            Le format 3 Pouces d'Amstrad (CF2)
          </button>
          <button
            onClick={() => setActiveFormat('35inch')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
              activeFormat === '35inch'
                ? 'bg-[#18181b] text-indigo-400 border-indigo-500/30 font-bold'
                : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-white/[0.02]'
            }`}
          >
            Le format 3,5 Pouces de Sony (Amiga, Atari, PC)
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFormat}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.16 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Visual representation of the chosen format disk */}
            <div className="lg:col-span-4 flex justify-center">
              {activeFormat === '3inch' ? (
                /* HISTORIC HITACHI 3-INCH COMPACT FLOPPY CSS SCHEUMORPHIC DRAFT */
                <div className="w-48 h-60 bg-[#0d0d12] border border-zinc-700 rounded-lg p-3 shadow-2xl flex flex-col justify-between relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-zinc-800" />
                  <div className="bg-gradient-to-b from-blue-900 via-blue-950 to-zinc-950 border border-blue-900/40 rounded-md p-2 h-44 flex flex-col justify-between">
                    <div className="text-left font-mono">
                      <div className="text-[12px] font-black text-rose-400 leading-none">CF 2</div>
                      <div className="text-[8px] text-zinc-400">COMPACT FLOPPY DISK</div>
                    </div>
                    {/* Retro handwritten label mockup */}
                    <div className="bg-white border-2 border-zinc-500 px-2 py-1.5 rotate-[-1deg] text-black font-serif text-[9px] text-center font-bold tracking-tight shadow-md">
                      Amstrad CPC Games 1985
                    </div>
                    {/* Physical center hole */}
                    <div className="w-14 h-14 rounded-full bg-zinc-800 mx-auto border-4 border-solid border-[#1e1e24] flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-zinc-600 border border-zinc-900 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded bg-zinc-900" />
                      </div>
                    </div>
                  </div>
                  {/* Sliding protective shield (Non springing format) */}
                  <div className="h-10 bg-zinc-800 border-t border-zinc-700/60 rounded flex items-center justify-between px-3 text-[10px] text-zinc-500 font-mono">
                    <span>MAXELL</span>
                    <span className="text-[8px] bg-red-950 text-red-400 px-1 rounded">DOUBLE-SIDED</span>
                  </div>
                </div>
              ) : (
                /* SONY 3.5-INCH MICRO FLOPPY CSS SCHEUMORPHIC DRAFT */
                <div className="w-48 h-48 bg-[#18181f] border border-zinc-850 rounded-lg p-3.5 shadow-2xl flex flex-col justify-between relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  {/* Metal slide shutter at top right */}
                  <div className="absolute top-0 right-4 w-12 h-14 bg-zinc-400 border-x border-zinc-500 rounded-b flex items-center justify-center font-mono text-[7px] text-zinc-700">
                    <span>SLIDE</span>
                  </div>
                  {/* Center Hub */}
                  <div className="w-14 h-14 rounded-full bg-zinc-800 mx-auto mt-6 border-4 border-[#25252b] flex items-center justify-center shadow-inner">
                    <div className="w-8 h-8 rounded-full bg-zinc-400 flex items-center justify-center relative">
                      <div className="w-1.5 h-1.5 bg-zinc-800 absolute top-1 left-2 rounded-sm" />
                    </div>
                  </div>
                  {/* Front label */}
                  <div className="bg-[#2e2e3d] rounded p-2 text-left space-y-1 mt-3">
                    <div className="bg-white text-black px-1.5 py-1 text-[8px] font-mono leading-none font-bold rounded-sm shadow border border-zinc-300">
                      Amiga Workbench v1.3
                    </div>
                    <div className="flex items-center justify-between text-[7px] text-zinc-500 font-mono">
                      <span>CHINON MFG</span>
                      <span className="text-indigo-400 font-bold">880 KB</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content explanations with historical rigour */}
            <div className="lg:col-span-8 text-left space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#818cf8] font-bold">
                  {activeFormat === '3inch' ? 'Le Pari Économique de Hitachi & Amstrad' : 'L\'Union Hégémonique Globale de Sony'}
                </span>
                <h5 className="text-xl font-bold text-white tracking-tight">
                  {activeFormat === '3inch' 
                    ? "Compact Floppy CF2 3 Pouces : L'excentricité d'Amstrad" 
                    : "Micro Floppy 3,5 Pouces : La conquête rationnelle de Sony"}
                </h5>
              </div>

              {activeFormat === '3inch' ? (
                <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                  <p>
                    Conçu conjointement par <strong>Hitachi, Maxell et Matsushita</strong> au début des années 1980, le format 3" (3 pouces) n'était pas souple : la bande magnétique était logée au cœur d'un boîtier en plastique rigide très épais et solide, mesurant exactement 80 × 100 mm.
                  </p>
                  <p>
                    <strong>Pourquoi l'Amstrad CPC et l'Oric l'ont-ils adopté ?</strong> <br />
                    Amstrad ne l'a pas choisi pour ses performances supérieures, mais pour des raisons <strong>purement financières</strong> ! Alan Sugar, le patron opportuniste d'Amstrad, cherchait désespérément à vendre des ordinateurs incluant un lecteur de disquette pour s'imposer face aux chers modèles Commodore ou Atari. Hitachi, ayant perdu la guerre d'adoption initiale par d'autres géants industriels, se retrouvait avec des stocks massifs de lecteurs et de pièces 3". Hitachi a bradé sa technologie à Amstrad à un prix défiant toute concurrence. Sugar a signé l'accord, et Amstrad a équipé tous ses mythiques CPC 6128 de ces lecteurs étroits.
                  </p>
                  <p className="bg-red-950/20 p-3 rounded-lg border border-red-500/10 text-zinc-400 italic">
                    💀 <strong>Pourquoi ce format a péri :</strong> <br />
                    En plus d'être propriétaire, il coûtait une fortune à l'achat pour le consommateur (jusqu'à 4 ou 5 fois plus cher qu'une disquette 3,5" équivalente). Incroyablement, ces disquettes étaient double face mais le lecteur ne lisait qu'un côté à la fois ! Il fallait physiquement extirper la disquette, la retourner (Face A / Face B) comme un disque vinyle ou une cassette audio pour continuer sa partie !
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                  <p>
                    Introduit par le constructeur japonais <strong>Sony</strong> en 1981, le format 3,5" représentait l'aboutissement de la commodité et de l'intelligence industrielle.
                  </p>
                  <p>
                    <strong>Pourquoi l'Atari ST et l'Amiga l'ont-ils adopté ?</strong> <br />
                    Contrairement au format 3", la disquette de Sony disposait d'un <strong>volet de protection métallique coulissant monté sur ressort</strong>. Ainsi, dès que la disquette était extraite du lecteur, le volet se refermait automatiquement par effet de ressort, protégeant la délicate surface brune magnétique des poussières et des traces de doigts d'adolescents.
                  </p>
                  <p>
                    Sa densité était également bien supérieure. Quand la disquette 3" d'Amstrad plafonnait à 180 Ko par face, la version double face 3,5" offrait d'emblée de <strong>720 Ko</strong> (sur Atari ST et PC) à <strong>880 Ko</strong> d'espace de stockage sur l'Amiga 500 grâce au processeur d'affichage et de contrôle intelligent "Paula" de Jay Miner.
                  </p>
                  <p className="bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/10 text-zinc-400 italic">
                    🏆 <strong>Pourquoi elle est devenue légendaire :</strong> <br />
                    Le coup de génie commercial fut son adoption par Hewlett-Packard en 1982, puis par Steve Jobs sur le tout premier <strong>Apple Macintosh en 1984</strong>. Cette consécration a propulsé le 3,5" comme standard planétaire absolu (grimpant ensuite à 1,44 Mo). Son héritage est si puissant qu'aujourd'hui encore, alors que les enfants n'ont jamais tenu de support magnétique réels, <strong>la disquette 3,5" reste le symbole universel du bouton "Enregistrer" (Save)</strong> sur la quasi-totalité des logiciels modernes.
                  </p>
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
}
