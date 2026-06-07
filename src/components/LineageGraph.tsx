import { useState } from 'react';
import { lineages } from '../data/osData';
import { Lineage, LineageNode } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Info, Network, GitBranch, Binary, Disc, Layers } from 'lucide-react';

export default function LineageGraph() {
  const [selectedLineageId, setSelectedLineageId] = useState<string>(lineages[0].id);
  const [selectedNode, setSelectedNode] = useState<LineageNode | null>(null);

  const activeLineage = lineages.find((l) => l.id === selectedLineageId) || lineages[0];

  // Helper to draw node decorations
  const getNodeIcon = (type: LineageNode['type']) => {
    switch (type) {
      case 'ancestor':
        return <Binary className="w-4 h-4 text-rose-500" />;
      case 'group':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'os':
        return <Disc className="w-4 h-4 text-emerald-400" />;
      case 'os-variant':
        return <GitBranch className="w-4 h-4 text-amber-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getNodeTypeBadge = (type: LineageNode['type']) => {
    switch (type) {
      case 'ancestor':
        return <span className="text-[10px] bg-rose-950 font-mono text-rose-300 border border-rose-800 rounded px-1.5 py-0.5">Ancêtre Commun</span>;
      case 'group':
        return <span className="text-[10px] bg-indigo-950 font-mono text-indigo-300 border border-indigo-800 rounded px-1.5 py-0.5">Sous-Lignée</span>;
      case 'os':
        return <span className="text-[10px] bg-emerald-950 font-mono text-emerald-300 border border-emerald-800 rounded px-1.5 py-0.5">OS Majeur</span>;
      case 'os-variant':
        return <span className="text-[10px] bg-amber-950 font-mono text-amber-300 border border-amber-800 rounded px-1.5 py-0.5">Variante / Distro</span>;
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl" id="lineage-graph-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-5">
        <div>
          <h3 className="text-xl font-bold font-sans text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-[#818cf8]" />
            Lignées Architecturales & Arbres Généalogiques
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Découvrez comment les concepts et l'origine du code ont voyagé entre les systèmes d'exploitation.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-2">
          {lineages.map((lineage) => (
            <button
              key={lineage.id}
              id={`tab-lineage-${lineage.id}`}
              onClick={() => {
                setSelectedLineageId(lineage.id);
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border cursor-pointer ${
                selectedLineageId === lineage.id
                  ? 'bg-[#18181b] text-white border-white/[0.15] shadow-md shadow-black/20'
                  : 'bg-[#09090b] hover:bg-[#121215] text-zinc-300 border-white/[0.05]'
              }`}
            >
              {lineage.name.replace('La Lignée ', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[480px]">
        {/* Graph representation panel */}
        <div className="lg:col-span-7 bg-[#121215] border border-white/[0.06] rounded-xl p-6 relative overflow-hidden flex flex-col justify-start">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-[#0c0c0e]/80 border border-white/[0.06] rounded-lg px-2 py-1 text-[10px] font-mono text-zinc-450">
            <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-pulse"></span>
            Mode Arbre Chronologique
          </div>

          <div className="mb-4">
            <p className="text-xs text-[#818cf8] uppercase tracking-widest font-mono font-bold">Lignée Actuelle</p>
            <h4 className="text-lg font-bold text-white mt-1">{activeLineage.name}</h4>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{activeLineage.description}</p>
          </div>

          {/* Render historical tree flow */}
          <div className="flex flex-col gap-3 relative z-10 my-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {activeLineage.nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div key={node.id} className="relative flex items-stretch">
                  {/* Visual timeline connectors */}
                  {index < activeLineage.nodes.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-white/[0.06] z-0 pointer-events-none" />
                  )}
                  
                  {/* Dot/Icon indicator */}
                  <div 
                    className="mr-4 flex flex-col items-center justify-start pt-2 cursor-pointer select-none"
                    onClick={() => setSelectedNode(node)}
                    title={`Cliquer pour analyser ${node.label}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center z-10 border transition-all duration-350 ${
                      isSelected 
                        ? 'bg-[#818cf8] border-[#818cf8] scale-110 shadow-lg shadow-[#818cf8]/20' 
                        : 'bg-[#0c0c0e] border-white/[0.06] hover:border-[#818cf8]/45 hover:scale-105'
                    }`}>
                      {getNodeIcon(node.type)}
                    </div>
                  </div>

                  {/* Node Content Card */}
                  <div 
                    id={`node-card-${node.id}`}
                    onClick={() => setSelectedNode(node)}
                    className={`flex-1 transition-all duration-300 rounded-xl p-3 mb-2 text-left cursor-pointer border select-none ${
                      isSelected 
                        ? 'bg-[#18181b] border-[#818cf8]/60 shadow-md shadow-indigo-950/20' 
                        : 'bg-[#0c0c0e]/40 border-white/[0.04] hover:bg-[#0c0c0e]/80 hover:border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-100">{node.label}</span>
                          <span className="bg-slate-850 border border-slate-700 text-slate-300 text-[10px] font-mono rounded px-1.5 py-0.5">
                            {node.year}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{node.description}</p>
                      </div>
                      <div className="pt-0.5">
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                          isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'
                        }`} />
                      </div>
                    </div>
                    {node.children && node.children.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[10px] text-zinc-500 font-mono self-center">Influences directes :</span>
                        {node.children.map(childId => {
                          const childNode = activeLineage.nodes.find(n => n.id === childId);
                          return (
                            <button 
                              key={childId} 
                              onClick={(e) => {
                                e.stopPropagation(); // prevent card parent selection click trigger
                                if (childNode) {
                                  setSelectedNode(childNode);
                                }
                              }}
                              className="bg-[#09090b] hover:bg-[#15151a] text-[#818cf8] hover:text-white border border-white/[0.06] hover:border-indigo-400/40 py-0.5 px-2 rounded-full text-[9px] font-mono cursor-pointer transition-colors"
                              title={childNode ? `Explorer la fiche de ${childNode.label}` : undefined}
                            >
                              {childNode?.label || childId}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected info detail pane */}
        <div className="lg:col-span-5 bg-[#121215]/80 border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    {getNodeTypeBadge(selectedNode.type)}
                    <span className="text-xs font-mono font-bold text-[#818cf8] bg-indigo-950/20 border border-indigo-900/30 rounded-lg px-2 py-0.5">
                      {selectedNode.year}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-sans text-white mt-3 border-b border-white/[0.06] pb-2 flex items-center gap-2">
                    {selectedNode.label}
                  </h4>

                  <div className="space-y-4 mt-4">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Genèse et Mission</p>
                      <p className="text-sm text-zinc-300 mt-1 leading-relaxed">{selectedNode.description}</p>
                    </div>

                    <div className="bg-[#09090b]/40 border border-white/[0.05] rounded-lg p-3">
                      <h5 className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-1.5 mb-1.5">
                        <Info className="w-3.5 h-3.5" />
                        Remarque de l'Historien
                      </h5>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {selectedNode.type === 'ancestor' && "Cet ancêtre a forgé les bases logiques indispensables (fichiers, entrées/sorties) qui ont été recopiées d'abord de manière obscure avant de devenir des standards universels."}
                        {selectedNode.type === 'group' && "Il s'agit d'un point d'inflexion majeur où s'est opérée la rupture avec le matériel hérité pour embrasser des paradigmes modernes (C++, objets, réseau unifié)."}
                        {selectedNode.type === 'os' && "L'empreinte commerciale et l'expérience utilisateur de cet OS d'époque continuent d'avoir des incidences fortes sur les manières de concevoir le code aujourd'hui."}
                        {selectedNode.type === 'os-variant' && "Ce dérivé démontre la polyvalence extraordinaire de l'écriture modulaire open source permettant d'aboutir à des distributions hautement spécialisées."}
                      </p>
                    </div>

                    {selectedNode.children && selectedNode.children.length > 0 && (
                      <div className="bg-[#09090b]/80 border border-white/[0.04] rounded-lg p-3">
                        <h5 className="text-[10px] font-mono font-bold text-[#818cf8] uppercase tracking-wider mb-2">
                          🌱 Descendance & Influences directes :
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.children.map(childId => {
                            const childNode = activeLineage.nodes.find(n => n.id === childId);
                            return (
                              <button
                                key={childId}
                                onClick={() => {
                                  if (childNode) setSelectedNode(childNode);
                                }}
                                className="bg-[#0c0c0e] hover:bg-[#18181b] hover:border-indigo-400/40 text-indigo-300 hover:text-white border border-white/[0.06] py-1 px-2.5 rounded-lg text-[10px] font-mono cursor-pointer transition-all"
                                title={`Cliquer pour analyser la fiche de ${childNode?.label || childId}`}
                              >
                                {childNode?.label || childId} →
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-4 mt-6">
                  <p className="text-[11px] text-zinc-500 italic">
                    Astuce : Cliquez sur n'importe quel autre nœud de l'arbre sur la gauche pour décoder ses spécifications techniques.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto text-zinc-500">
                <Network className="w-12 h-12 text-zinc-700 stroke-[1.2] mb-3 animate-pulse" />
                <p className="text-sm font-semibold text-zinc-400">Sélectionnez un jalon technique</p>
                <p className="text-xs text-zinc-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
                  Cliquez sur l'un des nœuds de la lignée pour révéler l'impact historique de l'OS sur l'histoire contemporaine de l'informatique.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
