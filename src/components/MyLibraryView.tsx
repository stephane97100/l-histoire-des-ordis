import { useState, useEffect } from 'react';
import { osList } from '../data/osData';
import { OSInfo } from '../types';
import { Bookmark, Heart, Star, Layers, Calendar, Cpu, Trash2, ArrowUpRight, Award, Trophy, Compass, ArrowRight } from 'lucide-react';

interface MyLibraryViewProps {
  onNavigateToOS: (osId: string) => void;
  onNavigateToComputer: (brandId: string) => void;
}

export default function MyLibraryView({ onNavigateToOS, onNavigateToComputer }: MyLibraryViewProps) {
  const [favoriteOSIds, setFavoriteOSIds] = useState<string[]>([]);
  const [favoriteComputerIds, setFavoriteComputerIds] = useState<string[]>([]);
  const [activeSegment, setActiveSegment] = useState<'all' | 'os' | 'computers'>('all');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedOS = localStorage.getItem('chronos_fav_os');
      if (savedOS) setFavoriteOSIds(JSON.parse(savedOS));

      const savedComputers = localStorage.getItem('chronos_fav_computers');
      if (savedComputers) setFavoriteComputerIds(JSON.parse(savedComputers));
    } catch (e) {
      console.warn("Could not read favorites from localStorage:", e);
    }
  }, []);

  // Update lists and persist
  const handleRemoveOS = (id: string) => {
    const nextList = favoriteOSIds.filter(item => item !== id);
    setFavoriteOSIds(nextList);
    localStorage.setItem('chronos_fav_os', JSON.stringify(nextList));
    // Trigger custom event to notify other components (like OSDetails)
    window.dispatchEvent(new Event('chronos_favorites_changed'));
  };

  const handleRemoveComputer = (id: string) => {
    const nextList = favoriteComputerIds.filter(item => item !== id);
    setFavoriteComputerIds(nextList);
    localStorage.setItem('chronos_fav_computers', JSON.stringify(nextList));
    window.dispatchEvent(new Event('chronos_favorites_changed'));
  };

  const clearAllFavorites = () => {
    setFavoriteOSIds([]);
    setFavoriteComputerIds([]);
    localStorage.removeItem('chronos_fav_os');
    localStorage.removeItem('chronos_fav_computers');
    window.dispatchEvent(new Event('chronos_favorites_changed'));
  };

  // Resolve matching lists
  const favoritedOSList = osList.filter(os => favoriteOSIds.includes(os.id));
  
  // Computer list (duplicating structural definition to avoid bundle limits)
  const allComputersMatch = [
    { id: 'amstrad', name: 'Amstrad CPC & CPC+', country: 'Royaume-Uni 🇬🇧', active: '1984-1993', cpu: 'Z80A @ 4 MHz', desc: 'L\'ordinateur crocodile coloré tout-en-un révolutionnaire, champion d\'Europe.' },
    { id: 'atari', name: 'Atari ST & Falcon', country: 'États-Unis 🇺🇸', active: '1985-1996', cpu: 'MC68000 & 68030', desc: 'La forge suprême de la MAO, équipée d\'usine de ports d\'interfaçage MIDI.' },
    { id: 'amiga-comm', name: 'Commodore & Amiga', country: 'États-Unis 🇺🇸', active: '1982-1994', cpu: '6510 / MC68000', desc: 'Le roi absolu du multitâche de salon et des puces d\'animation graphique.' },
    { id: 'thomson-corp', name: 'Thomson TO7/MO5', country: 'France 🇫🇷', active: '1982-1989', cpu: 'MC6809E @ 1 MHz', desc: 'Conçu en série pour équiper les écoles françaises de la République (Plan IPT).' },
    { id: 'zenith-ds', name: 'Zenith Data Systems', country: 'États-Unis 🇺🇸', active: '1979-1996', cpu: 'Intel x86 standard', desc: 'Equipementier militaire américain réputé et précurseur d\'écrans LCD néon.' },
    { id: 'olivetti-it', name: 'Olivetti Computer', country: 'Italie 🇮🇹', active: '1982-1997', cpu: 'Inte 8086 @ 8 MHz (M24)', desc: 'L\'élégance et le design d\'art plastique italien au service des banques.' },
    { id: 'sinclair-res', name: 'Sinclair Research', country: 'Royaume-Uni 🇬🇧', active: '1980-1986', cpu: 'Z80A @ 3.5 MHz', desc: 'Démocratiseur acharné du code à membrane bon marché, berceau du ZX Spectrum.' },
    { id: 'next-comp', name: 'NeXT Computers', country: 'États-Unis 🇺🇸', active: '1985-1993', cpu: 'MC68040 & DSP 56001', desc: 'Monolithes haut-de-gamme de magniésium noir, berceau de l\'Internet.' },
    { id: 'acorn-comp', name: 'Acorn Computers', country: 'Royaume-Uni 🇬🇧', active: '1978-1998', cpu: 'ARM2 & ARM3 RISC', desc: 'Inventeur d\'office du processeur RISC ARM qui bat aujourd\'hui dans tous les smartphones.' }
  ];
  const favoritedComputers = allComputersMatch.filter(b => favoriteComputerIds.includes(b.id));

  const totalFavoritesCount = favoritedOSList.length + favoritedComputers.length;

  // Derive simple Collector Rating based on favorites size
  const getCollectorRating = (count: number) => {
    if (count === 0) return { title: 'Curieux Néophyte', color: 'text-zinc-500 bg-zinc-950/30 border-zinc-900', phrase: 'Marquez vos précieux systèmes d\'exploitation favoris pour gonfler votre cabinet.' };
    if (count <= 2) return { title: 'Chercheur Amateur', color: 'text-indigo-400 bg-indigo-950/30 border-indigo-900/40', phrase: 'Vous commencez à meubler vos rayonnages d\'archéologue avec goût.' };
    if (count <= 5) return { title: 'Curateur du Silicium', color: 'text-amber-400 bg-amber-950/30 border-amber-900/40', phrase: 'Superbe collection, digne des plus grands conservateurs de musées industriels.' };
    return { title: 'Archéologue Légendaire', color: 'text-emerald-400 bg-emerald-950/30 border-emerald-900/40', phrase: 'Votre savoir et votre amour de la matière binaire sont admirables. Votre bibliothèque est une référence.' };
  };

  const rating = getCollectorRating(totalFavoritesCount);

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-6 text-left" id="my-library-panel">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <Bookmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              Ma Bibliothèque Retro
              <span className="text-[10px] font-mono bg-indigo-950/40 text-[#818cf8] border border-indigo-900/45 px-2 py-0.5 rounded">
                COLLECTEUR DE SAUVEGARDES
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Votre cabinet numérique d'époque. Retrouvez, comparez et lancez instantanément vos systèmes d'études préférés.</p>
          </div>
        </div>

        {totalFavoritesCount > 0 && (
          <button
            onClick={clearAllFavorites}
            className="text-xs px-2.5 py-1.5 text-zinc-500 hover:text-red-400 hover:bg-[#18181b] border border-transparent hover:border-red-950/30 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Vider la bibliothèque
          </button>
        )}
      </div>

      {/* Library Stats / Collector rating bento banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 bg-[#121215]/50 border border-white/[0.04] p-4 rounded-xl flex flex-col justify-between h-32">
          <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">OBJETS ENREGISTRÉS</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-white">{totalFavoritesCount}</span>
            <span className="text-xs text-zinc-500">sauvegardes d'études</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-normal mt-2">
            Répartition : {favoritedOSList.length} OS • {favoritedComputers.length} Machines.
          </p>
        </div>

        <div className="md:col-span-8 bg-[#121215]/50 border border-white/[0.04] p-4 rounded-xl flex flex-col justify-between h-32 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">GRADE DE L'ARCHÉOLOGUE</span>
            <span className={`text-[10px] font-mono font-bold uppercase border px-2.5 py-0.5 rounded ${rating.color}`}>
              🏆 {rating.title}
            </span>
          </div>
          <p className="text-xs text-zinc-350 leading-relaxed max-w-xl font-sans mt-2">
            {rating.phrase}
          </p>
          <div className="text-[10px] text-zinc-500 flex items-center gap-1.5 mt-2 border-t border-white/[0.02] pt-1">
            <span>📅</span>
            <span>Indexations persistées par navigateur local sécurisé.</span>
          </div>
        </div>
      </div>

      {/* Segment Controllers */}
      <div className="flex gap-2 border-b border-white/[0.04] pb-2 text-zinc-400">
        <button
          onClick={() => setActiveSegment('all')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activeSegment === 'all' ? 'bg-[#18181b] text-white' : 'hover:text-zinc-200'
          }`}
        >
          Tout ({totalFavoritesCount})
        </button>
        <button
          onClick={() => setActiveSegment('os')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activeSegment === 'os' ? 'bg-[#18181b] text-white' : 'hover:text-zinc-200'
          }`}
        >
          Systèmes d'exploitation ({favoritedOSList.length})
        </button>
        <button
          onClick={() => setActiveSegment('computers')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            activeSegment === 'computers' ? 'bg-[#18181b] text-white' : 'hover:text-zinc-200'
          }`}
        >
          Machines phares ({favoritedComputers.length})
        </button>
      </div>

      {/* Blank State */}
      {totalFavoritesCount === 0 && (
        <div className="border border-dashed border-white/[0.06] rounded-xl p-12 text-center text-zinc-500 flex flex-col items-center gap-3">
          <Heart className="w-10 h-10 text-zinc-700 animate-pulse" />
          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest font-mono">Dossier de Sauveteur Vierge</h4>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed mx-auto">
            Vous n'avez pas encore marqué de favoris. Utilisez l'icône de favori (⭐ ou ❤️) dans la vue principale des fiches pour épingler vos architectures primordiales et les afficher ici.
          </p>
        </div>
      )}

      {/* Grid displays of bookmarked elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Render Bookmarked OSs */}
        {(activeSegment === 'all' || activeSegment === 'os') &&
          favoritedOSList.map((os) => (
            <div
              key={`fav-os-${os.id}`}
              className="bg-[#121215]/85 border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between transition-all hover:border-indigo-500/20 relative group overflow-hidden"
            >
              {/* Retro Floppy Disk styled top strip */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-indigo-500" />
              
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 pl-0.5">{os.launchYear} • OS</span>
                  <button
                    onClick={() => handleRemoveOS(os.id)}
                    className="text-zinc-650 hover:text-red-400 transition-colors p-1"
                    title="Retirer des favoris"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">{os.name}</h4>
                  <p className="text-[10px] font-mono text-[#818cf8] mt-0.5 italic">{os.developer.split(' (')[0]}</p>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {os.summary}
                </p>

                <div className="border-t border-white/[0.04] pt-3 flex flex-wrap gap-1.5 text-[9px] font-mono text-zinc-500">
                  <span className="bg-[#0c0c0e] px-1.5 py-0.5 rounded border border-white/[0.04]">Noyau: {os.kernel.split(' (')[0]}</span>
                  <span className="bg-[#0c0c0e] px-1.5 py-0.5 rounded border border-white/[0.04]">Fils: {os.fileSystems[0]}</span>
                </div>
              </div>

              <div className="border-t border-white/[0.04] pt-4 mt-4 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ROM PRÊTE
                </span>
                <button
                  onClick={() => onNavigateToOS(os.id)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer transition-all uppercase text-[10px]"
                >
                  Ouvrir l'Index
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        }

        {/* Render Bookmarked Computer Brands */}
        {(activeSegment === 'all' || activeSegment === 'computers') &&
          favoritedComputers.map((b) => (
            <div
              key={`fav-comp-${b.id}`}
              className="bg-[#121215]/85 border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between transition-all hover:border-emerald-500/20 relative group overflow-hidden"
            >
              {/* Retro ROM cartridge styled top strip */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500" />

              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 pl-0.5">{b.active} • MACHINE</span>
                  <button
                    onClick={() => handleRemoveComputer(b.id)}
                    className="text-zinc-650 hover:text-red-400 transition-colors p-1"
                    title="Retirer des favoris"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">{b.name}</h4>
                  <p className="text-[10px] font-mono text-emerald-400 mt-0.5">{b.country}</p>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {b.desc}
                </p>

                <div className="border-t border-white/[0.04] pt-3 flex flex-wrap gap-1.5 text-[9px] font-mono text-zinc-500">
                  <span className="bg-[#0c0c0e] px-1.5 py-0.5 rounded border border-white/[0.04]">CPU: {b.cpu}</span>
                </div>
              </div>

              <div className="border-t border-white/[0.04] pt-4 mt-4 flex items-center justify-between">
                <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  DISQUETTE OK
                </span>
                <button
                  onClick={() => onNavigateToComputer(b.id)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer transition-all uppercase text-[10px]"
                >
                  Allumer ROM
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        }

      </div>

    </div>
  );
}
