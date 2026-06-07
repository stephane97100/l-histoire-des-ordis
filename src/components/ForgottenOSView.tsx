import { useState } from 'react';
import { forgottenOSList } from '../data/osData';
import { ForgottenOS } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Trash2, Cpu, HardDrive, Cpu as IconCpu, Hourglass, Award, Monitor, Play, Sparkles } from 'lucide-react';

const forgottenOSHoverStats: Record<string, { releaseDate: string; peakShare: string }> = {
  'philips-vg5000': {
    releaseDate: 'Octobre 1984',
    peakShare: '5.5% (Marché d\'initiation en France)'
  },
  'thomson-basic': {
    releaseDate: 'Novembre 1982',
    peakShare: '90% (Secteur Éducatif Français, 1985)'
  },
  'sinclair-qdos': {
    releaseDate: 'Janvier 1984',
    peakShare: '2.8% (Ordinateurs semi-professionnels au Royaume-Uni)'
  },
  'commodore-geos': {
    releaseDate: 'Février 1986',
    peakShare: '12% (Mise à niveau bureau graphique sur C64/C128)'
  },
  'bell-plan9': {
    releaseDate: 'Novembre 1992',
    peakShare: '1% (Labos AT&T et Réseaux Académiques mondiaux)'
  }
};

export default function ForgottenOSView() {
  const [selectedId, setSelectedId] = useState<string>(forgottenOSList[0].id);
  const [simulatedCommand, setSimulatedCommand] = useState<string>('');
  const [outputScreen, setOutputScreen] = useState<string>('Tapez ou sélectionnez une commande historique ci-dessous pour l\'exécuter...');

  const activeOS = forgottenOSList.find(os => os.id === selectedId) || forgottenOSList[0];

  const handleRunCommand = (cmd: string, output: string) => {
    setSimulatedCommand(cmd);
    setOutputScreen('');
    let i = 0;
    const interval = setInterval(() => {
      setSimulatedCommand((prev) => cmd.substring(0, i + 1));
      i++;
      if (i >= cmd.length) {
        clearInterval(interval);
        setTimeout(() => {
          setOutputScreen(output);
        }, 150);
      }
    }, 25);
  };

  // Dedicated styling for the retro screen based on the machine
  const getRetroScreenStyle = (id: string) => {
    switch (id) {
      case 'philips-vg5000':
        return {
          bg: 'bg-[#1e1ea8]',
          text: 'text-amber-300 font-mono text-xs',
          border: 'border-blue-700',
          title: 'PROMPT PHILIPS VG5000 (1984)',
          prompt: 'OK '
        };
      case 'thomson-basic':
        return {
          bg: 'bg-[#0000a0]',
          text: 'text-[#00ffff] font-mono text-xs',
          border: 'border-blue-900',
          title: 'BASIC 1.0 THOMSON (1982)',
          prompt: 'OK '
        };
      case 'sinclair-qdos':
        return {
          bg: 'bg-[#101010]',
          text: 'text-zinc-200 font-mono text-xs',
          border: 'border-[#df2020]/40',
          title: 'Sinclair QDOS shell (1984)',
          prompt: 'F1-F2 SELECT: '
        };
      case 'commodore-geos':
        return {
          bg: 'bg-[#f0f0f0]',
          text: 'text-black font-sans text-xs',
          border: 'border-zinc-400',
          title: 'GEOS v1.3 Desktop (1986)',
          prompt: 'GEOS: '
        };
      case 'bell-plan9':
        return {
          bg: 'bg-[#2b1b36]',
          text: 'text-[#aee8e8] font-mono text-xs',
          border: 'border-[#552e66]',
          title: 'Plan 9 Rio Windowing System',
          prompt: '% '
        };
      default:
        return {
          bg: 'bg-black',
          text: 'text-emerald-400 font-mono text-xs',
          border: 'border-zinc-800',
          title: 'Retro System Emulator',
          prompt: '> '
        };
    }
  };

  const crt = getRetroScreenStyle(activeOS.id);

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-6 text-left" id="forgotten-os-panel">
      
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">Le Cimetière des OS Éteints</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Ces ordinateurs et systèmes atypiques que la marche du temps a évincés ou oubliés au bord de la route.</p>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono text-left md:text-right">
          <span>CLASSIFICATION : ARCHÉOLOGIE LOGICIELLE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Navigation (Menu of Forgotten Systems) */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 scrollbar-thin">
          {forgottenOSList.map((os) => {
            const isSelected = os.id === selectedId;
            const stats = forgottenOSHoverStats[os.id] || { releaseDate: os.launchYear, peakShare: 'N/A' };
            return (
              <button
                key={os.id}
                onClick={() => {
                  setSelectedId(os.id);
                  setSimulatedCommand('');
                  setOutputScreen('Sélectionnez une commande ci-dessous pour voir l\'exécution dans le terminal...');
                }}
                className={`flex-shrink-0 lg:flex-shrink-1 text-left px-4 py-3 rounded-xl transition-all duration-300 border cursor-pointer group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-950/25 to-rose-950/25 border-rose-500/40 text-white font-semibold shadow-md shadow-red-950/20'
                    : 'bg-[#0c0c0e]/40 border-white/[0.04] hover:border-white/[0.1] hover:bg-[#121215] text-zinc-400 hover:text-[#d1d5db]'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-sm truncate max-w-[170px] lg:max-w-none">{os.machine}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                </div>
                <div className="hidden lg:block text-[10px] text-zinc-500 mt-0.5 tracking-wide group-hover:text-zinc-300 transition-colors duration-200">
                  {os.launchYear} • {os.developer.split(' / ')[0]}
                </div>

                {/* Advanced Revealable Hover Stats on Desktop */}
                <div className="hidden lg:block max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden mt-0 group-hover:mt-2.5 pt-0 group-hover:pt-2 border-t border-dashed border-white/[0.08] space-y-1">
                  <div className="flex flex-col text-[10px] font-mono">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold">📅 Sortie</span>
                    <span className="text-indigo-300 font-bold">{stats.releaseDate}</span>
                  </div>
                  <div className="flex flex-col text-[10px] font-mono pt-1">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold">📈 Sommet (Peak)</span>
                    <span className="text-amber-400 font-bold leading-tight">{stats.peakShare}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side Main Details & Simulation Console */}
        <div className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOS.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              {/* Header Box */}
              <div className="border border-white/[0.05] bg-[#121215] rounded-xl p-5 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase bg-rose-950/40 text-rose-300 border border-rose-900/40 rounded px-2 py-0.5">
                      {activeOS.launchYear}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-[#0c0c0e] border border-white/[0.06] rounded px-2 py-0.5">
                      Interface: {activeOS.osInterfaceType}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{activeOS.name}</h4>
                  <p className="text-xs text-rose-400 font-medium italic">{activeOS.summary}</p>
                </div>
                <div className="text-xs text-zinc-550 border-l border-white/[0.08] pl-4 space-y-1">
                  <p><span className="text-zinc-500 font-mono">CONSTRUCTEUR :</span> <span className="text-zinc-300">{activeOS.developer}</span></p>
                  <p><span className="text-zinc-500 font-mono">PROCESSEUR :</span> <span className="text-zinc-340">{activeOS.cpu}</span></p>
                  <p><span className="text-zinc-500 font-mono">RAM ORIGINALE :</span> <span className="text-zinc-340">{activeOS.ram}</span></p>
                </div>
              </div>

              {/* Narrative & Why Forgotten Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Historical narration */}
                <div className="space-y-3 bg-[#121215]/50 border border-white/[0.04] rounded-xl p-5">
                  <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5 border-b border-white/[0.05] pb-2">
                    <Award className="w-3.5 h-3.5 text-rose-400" />
                    Histoire & Concept
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                    {activeOS.detailedHistory}
                  </p>
                </div>

                {/* Why forgotten */}
                <div className="space-y-4">
                  <div className="bg-red-950/10 border border-red-900/20 rounded-xl p-5 space-y-2">
                    <h5 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono flex items-center gap-1.5 border-b border-red-950/40 pb-2">
                      <Hourglass className="w-3.5 h-3.5 animate-spin-slow" />
                      Pourquoi l'Histoire l'a-t-elle écarté ?
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {activeOS.whyForgotten}
                    </p>
                  </div>

                  <div className="bg-[#09090b]/40 border border-white/[0.05] rounded-xl p-5">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      Anecdote Croustillante
                    </h5>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed italic border-l-2 border-amber-900/60 pl-3">
                      "{activeOS.anecdote}"
                    </p>
                  </div>
                </div>

              </div>

              {/* Interactive Virtual CRT Emulator of retro Basic */}
              <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-[#161619] shadow-inner">
                
                {/* CRT Terminal Header */}
                <div className="bg-[#1e1e24] border-b border-white/[0.06] px-4 py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="font-mono text-zinc-400 text-[11px] ml-2 font-bold tracking-tight">{crt.title}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono">SIMULATION LIVE</span>
                  </div>
                </div>

                {/* CRT Tube Display Area */}
                <div className={`p-6 ${crt.bg} relative min-h-[170px] flex flex-col justify-between overflow-hidden shadow-2xl`}>
                  
                  {/* Subtle physical scanlines shadow effect */}
                  <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.035]" />
                  <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    {/* Welcome message */}
                    <div className={`${crt.text} opacity-80 whitespace-pre-line text-left`}>
                      {activeOS.id === 'philips-vg5000' && `VG5000 BASIC V1.0\n(C) 1984 MICROSOFT\n\n14316 BYTES FREE\n`}
                      {activeOS.id === 'thomson-basic' && `CRAYON OPTIQUE DE CONNECTÉ\nTHOMSON BASIC 1.0 (C) 1982 MICROSOFT\n\n`}
                      {activeOS.id === 'sinclair-qdos' && `Sinclair QDOS v1.03 (C) 1984\nSuperBASIC shell launched.\n`}
                      {activeOS.id === 'commodore-geos' && `geos 1.3 - Boot Sequence Successful\nReady to simulate virtual 8-bit GUI processes.\n`}
                      {activeOS.id === 'bell-plan9' && `Glenda the Plan 9 mascot greets you.\nTCP/IP stack configured with 9P protocol.\n`}
                    </div>

                    {/* Actual terminal interactive entry simulation */}
                    <div className={crt.text}>
                      <div className="flex items-center gap-1">
                        <span>{crt.prompt}</span>
                        <span className="font-bold border-r-2 border-current animate-blink pr-1">{simulatedCommand}</span>
                      </div>
                      
                      {outputScreen && (
                        <div className="mt-3 opacity-95 whitespace-pre-line bg-black/20 p-2.5 rounded border border-white/[0.03] text-left leading-relaxed">
                          {outputScreen}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mini interaction deck (Click command list) */}
                <div className="bg-[#121215] p-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Play className="w-3.5 h-3.5 text-rose-500" />
                    <span className="font-semibold">Commandes interactives d'époque disponibles :</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeOS.basicCommands && activeOS.basicCommands.map((command, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleRunCommand(command.cmd, command.out)}
                        className="px-3 py-1.5 text-[11px] font-mono font-bold bg-[#18181b] border border-white/[0.06] hover:border-rose-500/40 text-zinc-300 hover:text-white rounded-lg transition-all text-left cursor-pointer"
                      >
                        {command.cmd}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
