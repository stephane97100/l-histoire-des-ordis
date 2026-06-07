import { useState } from 'react';
import { osList } from '../data/osData';
import { OSInfo, KernelType } from '../types';
import { exportOSToPDF } from '../utils/pdfExport';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Cpu, AlertCircle, Sparkles, BookOpen, Layers, Network, Award, HelpCircle } from 'lucide-react';

export default function OSDetails() {
  const [activeTab, setActiveTab] = useState<string>(osList[0].id);

  const activeOS = osList.find(os => os.id === activeTab) || osList[0];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'emerald': return 'text-emerald-400 bg-emerald-950/40 border-emerald-900/60';
      case 'amber': return 'text-amber-400 bg-amber-950/40 border-amber-900/60';
      case 'teal': return 'text-teal-400 bg-teal-950/40 border-teal-900/60';
      case 'blue': return 'text-blue-400 bg-blue-950/40 border-blue-900/60';
      case 'slate': return 'text-slate-300 bg-slate-950/40 border-slate-900';
      case 'orange': return 'text-orange-400 bg-orange-950/40 border-orange-900/60';
      case 'violet': return 'text-violet-400 bg-violet-950/40 border-violet-900/60';
      case 'rose': return 'text-rose-400 bg-rose-950/40 border-rose-900/60';
      default: return 'text-slate-300 bg-slate-950/40 border-slate-900';
    }
  };

  const getBorderColorClass = (color: string) => {
    switch (color) {
      case 'emerald': return 'border-emerald-500/30';
      case 'amber': return 'border-amber-500/30';
      case 'teal': return 'border-teal-500/30';
      case 'blue': return 'border-blue-500/30';
      case 'slate': return 'border-slate-550/30';
      case 'orange': return 'border-orange-500/30';
      case 'violet': return 'border-violet-500/30';
      case 'rose': return 'border-rose-500/30';
      default: return 'border-slate-800';
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl" id="os-details-section">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
        <BookOpen className="w-5 h-5 text-[#818cf8]" />
        <div>
          <h3 className="text-xl font-bold text-white font-sans">Index Encyclopédique des Systèmes</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Explorez en profondeur les spécifications conceptuelles de chaque architecture rédigées par l'historien.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side menu for OS selection */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 font-sans">
          {osList.map((os) => {
            const isActive = os.id === activeTab;
            return (
              <button
                key={os.id}
                id={`btn-os-select-${os.id}`}
                onClick={() => setActiveTab(os.id)}
                className={`flex-shrink-0 lg:flex-shrink-1 text-left px-4 py-3 rounded-xl transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-[#18181b] border-white/[0.12] text-white font-semibold'
                    : 'bg-[#0c0c0e]/40 border-white/[0.04] hover:bg-[#121215] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-sm">{os.name}</span>
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#818cf8]' : 'bg-transparent'}`} />
                </div>
                <div className="hidden lg:block text-[10px] text-zinc-500 mt-1 uppercase font-mono tracking-wider">
                  {os.launchYear} • {os.developer.split(' (')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side detailed contents panel */}
        <div className="lg:col-span-9 bg-[#121215] border border-white/[0.06] rounded-xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOS.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 text-left"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/[0.06] pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-mono font-bold uppercase border rounded-lg px-2.5 py-0.5 ${getColorClass(activeOS.color)}`}>
                      {activeOS.launchYear}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-2.5 py-0.5">
                      {activeOS.fullName}
                    </span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-white mt-2 font-sans tracking-tight">{activeOS.name}</h4>
                  <p className="text-sm text-[#818cf8] mt-1 font-sans italic">{activeOS.summary}</p>
                </div>

                <div className="flex flex-col md:items-end justify-between gap-3 text-right">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 font-mono">DÉVELOPPEUR</span>
                    <span className="text-sm font-semibold text-zinc-300 mt-1">{activeOS.developer}</span>
                  </div>
                  <button
                    onClick={() => exportOSToPDF(activeOS)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-[#18181b] hover:bg-[#202024] text-indigo-400 hover:text-indigo-300 rounded-lg transition-all flex items-center gap-1.5 border border-indigo-500/25 cursor-pointer shadow-md select-none mt-1"
                    title={`Télécharger la fiche pédagogique de ${activeOS.name} en PDF`}
                    id={`btn-export-pdf-${activeOS.id}`}
                  >
                    <span>📄</span>
                    <span>Exporter Fiche (PDF)</span>
                  </button>
                </div>
              </div>

               {/* Specs Bento Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0c0c0e]/60 border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#818cf8]">
                    <User className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Architecte(s)</span>
                  </div>
                  <p className="text-sm text-zinc-250 mt-2 font-semibold">
                    {activeOS.architects.join(', ')}
                  </p>
                </div>

                <div className="bg-[#0c0c0e]/60 border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#818cf8]">
                    <Cpu className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Noyau de l'OS</span>
                  </div>
                  <p className="text-sm text-zinc-250 mt-2 font-semibold">
                    {activeOS.kernel}
                  </p>
                  <p className="text-[10px] text-[#9ca3af] mt-1 leading-snug">{activeOS.kernelDetails}</p>
                </div>

                <div className="bg-[#0c0c0e]/60 border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#818cf8]">
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Systèmes de fichiers</span>
                  </div>
                  <p className="text-sm text-zinc-250 mt-2 font-semibold">
                    {activeOS.fileSystems.join(', ')}
                  </p>
                  <p className="text-[10px] text-[#9ca3af] mt-1">Abstraction logique des données.</p>
                </div>

                <div className="bg-[#0c0c0e]/60 border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#818cf8]">
                    <Network className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Hardware / CPU</span>
                  </div>
                  <p className="text-sm text-zinc-250 mt-2 font-semibold line-clamp-2">
                    {activeOS.architectureBasis}
                  </p>
                </div>
              </div>

              {/* Historian Narrative Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5 animate-scanline-light">
                      <Award className="w-3.5 h-3.5 text-[#818cf8]" />
                      Récit du chercheur d'époque
                    </h5>
                    <p className="text-sm text-zinc-305 mt-2 leading-relaxed whitespace-pre-wrap font-sans">
                      {activeOS.description}
                    </p>
                  </div>

                  {activeOS.survivalExplanation && (
                    <div className="p-4 bg-[#0a101d] border border-emerald-500/20 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
                        <span className="text-sm">🛡️</span> Facteurs de survie & de résistance à l'Histoire
                      </h5>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {activeOS.survivalExplanation}
                      </p>
                    </div>
                  )}

                  {/* Achievements and Key Innovations */}
                  <div className="p-4 bg-indigo-950/5 border border-[#818cf8]/15 rounded-xl">
                    <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#818cf8] animate-pulse" />
                      Apports Techniques & Innovations clés
                    </h5>
                    <ul className="text-xs text-zinc-400 space-y-2">
                      {activeOS.keyInnovations.map((innovation, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] mt-1.5 flex-shrink-0" />
                          <span>{innovation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Historian Side column with Anecdotes & Metadata */}
                <div className="md:col-span-4 space-y-4">
                  <div className="bg-[#09090b]/40 border border-white/[0.05] rounded-xl p-4">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      L'Anecdote de l'Historien
                    </h5>
                    <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed italic font-sans border-l-2 border-amber-900 pl-2.5">
                      "{activeOS.anecdote}"
                    </p>
                  </div>

                  <div className="bg-[#09090b]/20 border border-white/[0.05] rounded-xl p-4 text-xs text-zinc-500 leading-normal font-mono">
                    <span className="font-bold text-[#818cf8]">LICENCE :</span> {activeOS.license} <br/><br/>
                    <span className="font-bold text-[#818cf8]">FONDATIONS :</span> Basé ou fortement calqué sur {activeOS.architectureBasis.split(',')[0]}.
                  </div>
                </div>
              </div>

              {/* Version History / Milestones */}
              {activeOS.versions && activeOS.versions.length > 0 && (
                <div className="border-t border-white/[0.06] pt-6">
                  <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-4">
                    <Layers className="w-4 h-4 text-[#818cf8]" />
                    Chronologie des versions & jalons historiques
                  </h5>

                  <div className="space-y-3">
                    {activeOS.versions.map((ver, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-[#09090b]/30 border border-white/[0.05] hover:bg-[#09090b]/50 rounded-xl p-3.5 transition-colors">
                        <span className="bg-[#0c0c0e] border border-white/[0.06] text-[#818cf8] text-xs font-mono font-bold px-2 py-1 rounded-lg flex-shrink-0">
                          {ver.year}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-zinc-250">{ver.name}</p>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{ver.significance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Linux distribution showcase */}
              {activeOS.id === 'linux' && activeOS.linuxDistributions && (
                <div className="border-t border-white/[0.06] pt-6 space-y-6">
                  <div>
                    <h5 className="text-sm font-bold text-zinc-200 uppercase tracking-normal flex items-center gap-1.5 mb-1">
                      <Layers className="w-4 h-4 text-orange-400" />
                      Les Distributions Linux Historiques
                    </h5>
                    <p className="text-xs text-zinc-500 mb-3 leading-normal">Ces "ancêtres" distribuent le code de base et structurent la philosophie Linux depuis le début des années 90.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {activeOS.linuxDistributions.historical.map((dist, idx) => (
                        <div key={idx} className="bg-[#0c0c0e]/80 border border-[#818cf8]/10 hover:border-[#818cf8]/20 rounded-xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-bold text-sm text-orange-400">{dist.name}</span>
                              <span className="text-[10px] font-mono text-zinc-500 font-bold bg-[#09090b] py-0.5 px-2 rounded-lg border border-white/[0.06]">{dist.year}</span>
                            </div>
                            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{dist.description}</p>
                          </div>
                          <p className="text-[10px] text-zinc-500 border-t border-white/[0.06] mt-3 pt-2 italic leading-snug">
                            {dist.significance}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold text-zinc-200 uppercase tracking-normal flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4 text-[#818cf8]" />
                      Les Principales Distributions Linux d'Aujourd'hui
                    </h5>
                    <p className="text-xs text-zinc-500 mb-3 leading-normal">Aujourd'hui, ces distributions font autorité sur desktop, serveurs ou déploiement virtualisés modernes.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeOS.linuxDistributions.modern.map((dist, idx) => (
                        <div key={idx} className="bg-[#0c0c0e]/80 border border-[#818cf8]/15 hover:border-[#818cf8]/35 rounded-xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-bold text-sm text-[#818cf8]">{dist.name}</span>
                              <span className="text-[10px] font-mono text-zinc-500 font-bold">{dist.year}</span>
                            </div>
                            <p className="text-xs text-zinc-450 mt-2 font-semibold">Cible : {dist.targetAudience}</p>
                            <p className="text-xs text-zinc-350 mt-1 lines-clamp-3 leading-relaxed">{dist.description}</p>
                          </div>
                          <div className="border-t border-white/[0.06] mt-3 pt-2 text-[10px] text-zinc-500 leading-normal flex items-center gap-1">
                            <span>🚀</span>
                            <span>{dist.popularitySign}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
