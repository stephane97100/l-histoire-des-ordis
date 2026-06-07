/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import OSDetails from './components/OSDetails';
import LineageGraph from './components/LineageGraph';
import OSTerminalSimulator from './components/OSTerminalSimulator';
import ForgottenOSView from './components/ForgottenOSView';
import StorageHistoryView from './components/StorageHistoryView';
import OldLanguagesView from './components/OldLanguagesView';
import GlossaryView from './components/GlossaryView';
import AncientPearlsView from './components/AncientPearlsView';
import ComparisonTool from './components/ComparisonTool';
import ComputerCemeteryView from './components/ComputerCemeteryView';
import MyLibraryView from './components/MyLibraryView';
import IBMCompatibleView from './components/IBMCompatibleView';
import { exportTimelineToPDF } from './utils/pdfExport';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, BookOpen, Network, Terminal, History, ShieldAlert, Cpu, Award, Layers, Scroll, HelpCircle, Trophy, Monitor, Bookmark } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'lineages' | 'simulator' | 'forgotten' | 'cemetery' | 'storage' | 'languages' | 'glossary' | 'pearls' | 'library' | 'ibm-compatible'>('encyclopedia');

  // Multi-route navigation helpers for the MyLibrary callback
  const handleNavigateToOS = (osId: string) => {
    setActiveTab('encyclopedia');
    setTimeout(() => {
      // Find and select the OS inside OSDetails using pre-existing selectors or scroll to search block
      const selector = document.getElementById(`btn-os-select-${osId}`);
      if (selector) {
        selector.click();
      }
      const el = document.getElementById('os-details-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleNavigateToComputer = (brandId: string) => {
    setActiveTab('cemetery');
    setTimeout(() => {
      // Trigger selection inside the brand view matching clicked ID
      const card = document.getElementById(`cemetery-brand-${brandId}`);
      if (card) {
        card.click();
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const el = document.getElementById('computer-cemetery-panel');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#d1d5db] flex flex-col justify-between relative overflow-hidden font-sans" id="app-root">
      
      {/* Visual background atmospheric lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Top Header */}
      <header className="border-b border-white/[0.06] bg-[#0c0c0e]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 self-start lg:self-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-indigo-950/30">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#818cf8] uppercase bg-indigo-950/40 border border-indigo-900/40 rounded px-1.5 py-0.5">HISTOIRE IT</span>
              </div>
              <h1 className="text-lg font-bold font-sans text-white tracking-tight">CHRONOS OS EXPLORER</h1>
            </div>
          </div>

          {/* Desktop & Tablet Navigation: Responsive Flex-wrap bar */}
          <nav className="hidden md:flex flex-wrap items-center gap-1.5 justify-end max-w-full">
            <button
              onClick={() => setActiveTab('encyclopedia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'encyclopedia'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#818cf8]" />
              Index des Systèmes
            </button>
            <button
              onClick={() => setActiveTab('lineages')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'lineages'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#818cf8]" />
              Lignées Architecturales
            </button>
            <button
              onClick={() => setActiveTab('ibm-compatible')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'ibm-compatible'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-[#818cf8] hover:text-blue-300 border-transparent'
              }`}
              id="btn-nav-ibm"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              IBM Compatible
            </button>
            <button
              onClick={() => setActiveTab('forgotten')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'forgotten'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
              title="Le cimetière des Systèmes d'exploitation oubliés"
            >
              <History className="w-3.5 h-3.5 text-[#818cf8]" />
              Le Cimetière des OS
            </button>
            <button
              onClick={() => setActiveTab('cemetery')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'cemetery'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
              title="Le cimetière des marques d'ordinateurs légendaires"
              id="btn-nav-cemetery"
            >
              <Monitor className="w-3.5 h-3.5 text-rose-450" />
              Le Cimetière des Ordi
            </button>
            <button
              onClick={() => setActiveTab('pearls')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'pearls'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-amber-300 border-transparent'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Les Anciennes Perles
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'simulator'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#818cf8]" />
              Simulateur de Terminals
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'library'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40 animate-pulse'
                  : 'text-zinc-400 hover:text-emerald-300 border-transparent'
              }`}
              id="btn-nav-library"
            >
              <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
              Ma Bibliothèque
            </button>
            <button
              onClick={() => setActiveTab('languages')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'languages'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <Scroll className="w-3.5 h-3.5 text-[#818cf8]" />
              Les vieux langages
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'storage'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#818cf8]" />
              Mémoire & Archivage
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'glossary'
                  ? 'bg-[#18181b] text-white border-white/[0.12] shadow-sm shadow-black/40'
                  : 'text-zinc-400 hover:text-zinc-200 border-transparent'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#818cf8]" />
              Glossaire
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-10 relative z-10">
        
        {/* Historian Welcome Card Banner */}
        <section className="bg-gradient-to-r from-[#0c0c0e] via-[#0c0c0e] to-indigo-950/15 border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden text-left" id="welcome-historian-card">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-[#09090b] border border-white/[0.06] flex items-center justify-center flex-shrink-0 relative">
            <Award className="w-8 h-8 text-[#818cf8] animate-pulse" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0c0c0e]" title="Cabinet Historien Connecté" />
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-xl md:text-2xl font-black text-white font-sans tracking-tight">Le Cabinet d'Archéologie du Code</h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-4xl">
              Bienvenue, cher chercheur. Je suis historien spécialisé en informatique et systèmes d'exploitation. 
              Cette application interactive retrace l'âge d'or des systèmes majeurs de 1980 à nos jours : la sémantique 
              de <strong>MS-DOS</strong>, la féerie matérielle de l'<strong>Amiga</strong>, la précision du <strong>BASIC</strong>, la netteté sonore de l'<strong>Atari TOS</strong>, l'évolution industrielle de <strong>Windows</strong> et <strong>macOS</strong>, la prolifération libre des <strong>distributions Linux</strong> (historiques et contemporaines), le multitâche d'avant-garde de <strong>BeOS</strong>, et la puissance réseau souveraine de <strong>SunOS/Solaris</strong>. 
              Sélectionnez les onglets ci-dessous pour démystifier leurs architectures logiques primordiales.
            </p>
          </div>
        </section>

        {/* Mobile Swipe-friendly Tab Selectors Scroll Bar */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-3 custom-scrollbar select-none border-b border-white/[0.05] scroll-smooth">
          <button
            onClick={() => setActiveTab('encyclopedia')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'encyclopedia'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            📋 Index
          </button>
          <button
            onClick={() => setActiveTab('lineages')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'lineages'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            🗺️ Lignées
          </button>
          <button
            onClick={() => setActiveTab('ibm-compatible')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'ibm-compatible'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            💻 IBM Compatible
          </button>
          <button
            onClick={() => setActiveTab('forgotten')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'forgotten'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            🪦 Cimetière OS
          </button>
          <button
            onClick={() => setActiveTab('cemetery')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'cemetery'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            🖥️ Cimetière Ordi
          </button>
          <button
            onClick={() => setActiveTab('pearls')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'pearls'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            ✨ Pépites
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'simulator'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            🐚 Consoles
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'library'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            ⭐ Bibliothèque
          </button>
          <button
            onClick={() => setActiveTab('languages')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'languages'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            📜 Langages
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'storage'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            💾 Archiver
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-center cursor-pointer transition-all flex-shrink-0 border ${
              activeTab === 'glossary'
                ? 'bg-[#18181b] text-white border-white/[0.12]'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
          >
            📖 Glossaire
          </button>
        </div>

        {/* Selected Modular Tab Content View */}
        <section id="modular-tab-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            >
              {activeTab === 'encyclopedia' && <OSDetails />}
              {activeTab === 'lineages' && <LineageGraph />}
              {activeTab === 'ibm-compatible' && <IBMCompatibleView />}
              {activeTab === 'forgotten' && <ForgottenOSView />}
              {activeTab === 'cemetery' && <ComputerCemeteryView />}
              {activeTab === 'languages' && <OldLanguagesView />}
              {activeTab === 'storage' && <StorageHistoryView />}
              {activeTab === 'simulator' && <OSTerminalSimulator />}
              {activeTab === 'glossary' && <GlossaryView />}
              {activeTab === 'pearls' && <AncientPearlsView />}
              {activeTab === 'library' && (
                <MyLibraryView 
                  onNavigateToOS={handleNavigateToOS} 
                  onNavigateToComputer={handleNavigateToComputer} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Side-by-Side Dual Comparison Module (Always accessible below context) */}
        <section id="comparative-module-grid">
          <ComparisonTool />
        </section>

        {/* Quick Historian Timeline Milestones Card */}
        <section className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 text-left shadow-lg" id="historical-milestones">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#818cf8]" />
              <h3 className="text-lg font-bold text-white font-sans">Chronologie des Grandes Ruptures Technologiques</h3>
            </div>
            <button 
              onClick={() => exportTimelineToPDF()}
              className="px-3.5 py-1.5 text-xs font-semibold bg-[#18181b] hover:bg-[#202024] text-amber-400 hover:text-amber-300 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-amber-500/20 shadow-sm"
              title="Télécharger la frise en tant que document PDF imprimable"
              id="btn-export-timeline-pdf"
            >
              <span>📥</span>
              <span>Exporter la Frise (PDF)</span>
            </button>
          </div>

          <div className="relative border-l border-white/[0.08] ml-4 py-2 space-y-6">
            <div className="relative pl-6">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <p className="text-xs font-mono font-bold text-emerald-400">1981 — Standardisation du PC (MS-DOS)</p>
              <p className="text-xs text-zinc-400 mt-1">L'informatique sort des laboratoires universitaires pour envahir les bureaux d'entreprises grâce au format PC IBM d'Intel.</p>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <p className="text-xs font-mono font-bold text-indigo-400">1984/1985 — Révolution Ergonomique (Macintosh, Amiga & Atari ST)</p>
              <p className="text-xs text-zinc-400 mt-1">L'interface graphique foudroie les lignes de commande. Premier multitâche préemptif de salon de l'Amiga 1000 et MIDI de l'Atari.</p>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-orange-500" />
              <p className="text-xs font-mono font-bold text-orange-400">1991 — Révolution du Code Libre (GNU/Linux)</p>
              <p className="text-xs text-zinc-400 mt-1">Linus Torvalds publie le noyau Linux. Le modèle de développement international open source s'active et façonne les serveurs du monde entier.</p>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500" />
              <p className="text-xs font-mono font-bold text-blue-400">1993/2001 — Protection Mémoire & Stabilité (Architecture Windows NT/OS X)</p>
              <p className="text-xs text-zinc-400 mt-1">Disparition complète des structures d'exécution coopératives. Les noyaux industriels reprennent le dessus pour prémunir des écrans bleus et bombes Mac d'époque.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer bar */}
      <footer className="border-t border-white/[0.06] bg-[#0c0c0e] py-8 relative z-10 text-center font-mono text-[11px] text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p>
            Chronos OS Explorer • Une application à vocation historique et pédagogique rédigée d'après sources matérielles réelles.
          </p>
          <p className="text-zinc-650">
            Fait avec passion pour l'histoire des architectures informatiques • 1969-2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
