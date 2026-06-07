import { useState } from 'react';
import { osList } from '../data/osData';
import { OSInfo } from '../types';
import { Columns, Award, CheckCircle2, XCircle, ShieldCheck, Scale, RefreshCw, Cpu, Layers, Layout, Zap, Shield, Sparkles } from 'lucide-react';

export default function ComparisonTool() {
  const [os1Id, setOs1Id] = useState<string>(osList[0].id); // MS-DOS
  const [os2Id, setOs2Id] = useState<string>(osList[1].id); // AmigaOS

  const os1 = osList.find(o => o.id === os1Id) || osList[0];
  const os2 = osList.find(o => o.id === os2Id) || osList[1];

  // Dynamic values helper for Speed, Memory & Interface
  const getTechnicalMetrics = (id: string) => {
    switch (id) {
      case 'ms-dos':
        return {
          speed: "Performance maximale d'époque (Consomme < 10 Ko). Surcharge matérielle minimale. Pas de scheduler de fil de tâches, exécution brute.",
          memory: "Pas de protection d'adresse (MMU inexistante). Mémoire limitée aux 640 Ko conventionnels. Blocage critique immédiat si un processus corrompt l'allocation.",
          interface: "Ligne de commande textuelle (CLI) pure, gérée par l'invite COMMAND.COM monochrome. Navigation par raccourcis clavier rudimentaires."
        };
      case 'amiga':
        return {
          speed: "Fluidité exceptionnelle à 50 FPS. Le noyau Exec délègue de manière autonome l'image et le son stéréo à 4 voies à des puces partenaires, libérant 100% du CPU.",
          memory: "Multitâche préemptif en temps réel par passage de messages, optimisé pour 512 Ko de RAM. Absence de MMU menant aux célèbres alertes 'Guru Meditation'.",
          interface: "Sélecteur hybride : écran d'invite (Amiga Shell CLI) et environnement graphique multifenêtre couleur superposable (Workbench)."
        };
      case 'atari-tos':
        return {
          speed: "Vitesse d'allumage canonique (soudé sur puces de ROM physique, prêt en 3 secondes). Latence MIDI nulle, optimale pour Cubase ou Pro-24 d'époque.",
          memory: "Multitâche coopératif léger, absence de MMU matérielle. Crashs représentés visuellement par la célèbre apparition de bombes à l'écran.",
          interface: "Bureau graphique GEM (Graphics Environment Manager) de Digital Research, propre, efficace, et support d'office de la souris."
        };
      case 'windows':
        return {
          speed: "Modérée sur les versions 16/32-bits (couches de compatibilité MS-DOS). Exceptionnelle et calibrée sur serveurs professionnels avec l'architecture NT.",
          memory: "Protection MMU absolue et isolation complète des espaces de mémoire virtuelle par processus (Technologie NT moderne, anti-écrans bleus).",
          interface: "Interface fenêtrée classique avec menu Démarrer, documents glisser-déposer, barre de tâches universelle devenue la norme de fait."
        };
      case 'macos':
        return {
          speed: "Classic : réactive mais goulots de verrouillage coopératif. Modern (macOS) : vélocité haut de gamme profitant d'un moteur Quartz matériel.",
          memory: "Classic : allocation partagée précaire sujets aux blocages système. Modern : MMU hermétique unifiée héritée du noyau BSD Unix stable.",
          interface: "Bureau Finder révolutionnaire de renommée mondiale, dock d'applications animé, design Aqua translucide fluide, souris requise."
        };
      case 'linux':
        return {
          speed: "Redoutable. Équilibrage de threads hyper-optimisé via le planificateur complet (CFS), idéal pour serveurs lourds et calcul intensif.",
          memory: "Sûreté MMU industrielle étanche. Gestion avancée du fichier d'échange (Swap), mémoire partagée sécurisée contre tout crash logiciel.",
          interface: "Console de terminal (CLI Bash) par défaut, personnalisable à l'infini avec des environnements de bureaux graphiques (GNOME, KDE)."
        };
      case 'beos':
        return {
          speed: "Foudroyante. Conçu pour allouer de manière asymétrique chaque thread audio/vidéo sur son propre cœur CPU physique à basse latence.",
          memory: "MMU active. Structure robuste mariée à un système de fichiers BFS (Be File System) indexé en temps réel comme une base de données.",
          interface: "Tracker graphique épuré et ultra-rapide caractérisé par d'élégants onglets jaunes décalés facilitant le classement vertical."
        };
      case 'sun':
        return {
          speed: "Planifiée pour le calcul lourd. Excellente gestion des accès réseau simultanés (protocole NFS) sans aucune baisse de régime.",
          memory: "Protection extensible à haute tolérance de panne avec pagination de mémoire virtuelle intelligente pour stations scientifiques.",
          interface: "Bureau Unix OpenWindows/CDE épuré et professionnel axé sur le calcul matriciel intensif et le développement d'ingénierie."
        };
      case 'raspberry':
        return {
          speed: "Performante et agile, optimisée pour puces et cartes mères à processeur d'architecture ARM basse consommation.",
          memory: "Sûreté MMU stable assurée par le socle d'office Debian Linux. Prise en charge d'espace Swap additionnel sur carte MicroSD.",
          interface: "Saisie console Bash (Commandes bas niveau GPIO) et environnement de bureau PIXEL (LXDE) extrêmement léger."
        };
      default:
        return {
          speed: "Performance standard dépendant de la fréquence de l'horloge système d'époque.",
          memory: "Gestion de mémoire standard, isolation dépendante du processeur d'accueil.",
          interface: "Interface standardisée d'époque conforme aux fiches constructeurs."
        };
    }
  };

  const o1Metrics = getTechnicalMetrics(os1Id);
  const o2Metrics = getTechnicalMetrics(os2Id);

  // Helper check for Multitasking status
  const getMultitaskingLevel = (os: OSInfo) => {
    const text = os.kernelDetails.toLowerCase();
    if (text.includes('préemptif') || os.name === 'Linux' || os.name === 'macOS' || os.name === 'Windows' || os.id === 'beos' || os.id === 'sun' || os.id === 'raspberry') {
      return { status: 'Excellent', desc: 'Multitâche préemptif robuste avec scheduler matériel-logiciel', color: 'text-emerald-400' };
    }
    if (text.includes('coopératif') || os.id === 'atari-tos') {
      return { status: 'Modéré', desc: 'Multitâche coopératif (dépend de la courtoisie des logiciels)', color: 'text-yellow-400' };
    }
    return { status: 'Aucun', desc: 'Mono-tâche strict (le programme monopolise l\'intégralité du temps CPU)', color: 'text-rose-400' };
  };

  const getMemoryProtection = (os: OSInfo) => {
    if (os.id === 'ms-dos' || os.id === 'amiga' || os.id === 'atari-tos') {
      return { status: 'Inexistant', desc: 'Crash intégral du système s\'il y a dépassement d\'allocation adresse', icon: <XCircle className="w-4 h-4 text-rose-500" /> };
    }
    if (os.id === 'beos') {
      return { status: 'Avancé', desc: 'Excellente isolation mémorielle des processus mais kernel vulnérable', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> };
    }
    return { status: 'Total (MMU)', desc: 'Protection matérielle étanche unifiée par espace de mémoire virtuelle', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> };
  };

  const generateHistorianVerdict = (o1: OSInfo, o2: OSInfo) => {
    if (o1.id === o2.id) {
      return "Veuillez sélectionner deux systèmes d'exploitation différents pour dresser un diagnostic d'archéologie logicielle.";
    }

    const yearDiff = Math.abs(parseInt(o1.launchYear) - parseInt(o2.launchYear));
    let text = `Comparatif historique entre ${o1.name} (${o1.launchYear}) et ${o2.name} (${o2.launchYear}). `;

    if (yearDiff > 10) {
      text += `Ces systèmes appartiennent à deux époques technologiques distinctes séparées de ${yearDiff} ans d'innovation matérielle. `;
    }

    if (o1.id === 'ms-dos' && o2.id === 'amiga') {
      text += `L'AmigaOS représentait la science-fiction absolue à côté du rustique MS-DOS : son multitâche préemptif en ROM et ses circuits graphiques customisés ridiculisaient les micro-ordinateurs IBM compatibles de l'époque. Cependant, la politique industrielle redoutable de Microsoft a triomphé du génie matériel de Commodore.`;
    } else if (o1.id === 'beos' && o2.id === 'macos') {
      text += `BeOS était le grand rival de macOS (et Apple a failli l'acheter). BeOS gérait le multi-threading de manière infiniment plus poussée à la fin des années 90, mais NeXTSTEP de Steve Jobs l'a emporté commercialement, léguant son cœur UNIX stable à macOS.`;
    } else if ((o1.id === 'linux' || o1.id === 'sun') && (o2.id === 'linux' || o2.id === 'sun')) {
      text += `Deux géants d'inspiration UNIX. Alors que Solaris est le symbole de l'UNIX propriétaire hyper-optimisé pour les grands seigneurs de serveurs industriels des années 95-2000, Linux a conquis le monde par son modèle de gratuité absolue combinée à une contribution communautaire illimitée.`;
    } else {
      text += `D'un côté, nous observons le paradigme basé sur ${o1.architectureBasis.split(',')[0]} (développé par ${o1.developer.split(' (')[0]}), confronté à la philosophie ${o2.architectureBasis.split(',')[0]} (conçu par ${o2.developer.split(' (')[0]}). Leurs choix d'architectures de noyau (${o1.kernel} vs ${o2.kernel}) expliquent leurs différences de robustesse historiques face aux plantages logiciels.`;
    }

    return text;
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl" id="os-compare-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
        <div className="text-left">
          <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
            <Columns className="w-5 h-5 text-[#818cf8]" />
            Analyse Comparative de l'Historien
          </h3>
          <p className="text-xs text-zinc-400 mt-1">Sélectionnez deux systèmes d'exploitation pour évaluer leurs architectures logiques côte à côte.</p>
        </div>

        {/* Quick swap button */}
        <button 
          onClick={() => {
            const temp = os1Id;
            setOs1Id(os2Id);
            setOs2Id(temp);
          }}
          className="px-3 py-1.5 bg-[#18181b] hover:bg-[#202025] border border-white/[0.06] hover:border-white/[0.12] rounded-lg text-xs font-semibold text-zinc-300 flex items-center gap-1.5 cursor-pointer select-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Intervertir
        </button>
      </div>

      {/* Selectors grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#121215] border border-white/[0.05] rounded-xl p-3.5 flex flex-col font-sans text-left">
          <label className="text-[10px] text-zinc-550 font-mono font-bold mb-1.5 uppercase tracking-wider block">Système Source (A)</label>
          <select 
            value={os1Id} 
            onChange={(e) => setOs1Id(e.target.value)}
            className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none cursor-pointer"
          >
            {osList.map(o => (
              <option key={o.id} value={o.id}>{o.name} ({o.launchYear})</option>
            ))}
          </select>
        </div>

        <div className="bg-[#121215] border border-white/[0.05] rounded-xl p-3.5 flex flex-col font-sans text-left">
          <label className="text-[10px] text-zinc-550 font-mono font-bold mb-1.5 uppercase tracking-wider block">Système Cible (B)</label>
          <select 
            value={os2Id} 
            onChange={(e) => setOs2Id(e.target.value)}
            className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none cursor-pointer"
          >
            {osList.map(o => (
              <option key={o.id} value={o.id}>{o.name} ({o.launchYear})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Technical Side-by-Side Comparison Table (Compact & Elegant for desktop & responsive layout) */}
      <div className="border border-white/[0.06] rounded-xl bg-[#121215] overflow-x-auto select-none">
        <table className="w-full text-left border-collapse min-w-[650px] font-sans">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#0c0c0e]">
              <th className="p-4 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest w-1/4">Critère Technique</th>
              <th className="p-4 text-sm font-extrabold text-[#818cf8] w-3/8 text-left border-l border-white/[0.05]">
                {os1.name} <span className="text-[10px] font-mono font-bold text-zinc-500 ml-1">({os1.launchYear})</span>
              </th>
              <th className="p-4 text-sm font-extrabold text-pink-400 w-3/8 text-left border-l border-white/[0.05]">
                {os2.name} <span className="text-[10px] font-mono font-bold text-zinc-500 ml-1">({os2.launchYear})</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            
            {/* ROW 1: SPEED & OVERHEAD */}
            <tr className="hover:bg-white/[0.01]">
              <td className="p-4 align-top">
                <div className="flex items-center gap-2 text-[#818cf8]">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold text-zinc-300">Vitesse & Surcharge</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">Performance brute</p>
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify">
                {o1Metrics.speed}
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify">
                {o2Metrics.speed}
              </td>
            </tr>

            {/* ROW 2: MEMORY MANAGEMENT */}
            <tr className="hover:bg-white/[0.01]">
              <td className="p-4 align-top">
                <div className="flex items-center gap-2 text-[#818cf8]">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold text-zinc-300">Mémoire & Sûreté</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">RAM / Protection</p>
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify space-y-2">
                <div className="flex items-center gap-1.5">
                  {getMemoryProtection(os1).icon}
                  <span className="font-semibold text-zinc-200 text-[11px]">{getMemoryProtection(os1).status}</span>
                </div>
                <p>{o1Metrics.memory}</p>
                <div className="text-[10px] font-mono text-zinc-500 mt-1">Formats supports: {os1.fileSystems.join(', ')}</div>
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify space-y-2">
                <div className="flex items-center gap-1.5">
                  {getMemoryProtection(os2).icon}
                  <span className="font-semibold text-zinc-200 text-[11px]">{getMemoryProtection(os2).status}</span>
                </div>
                <p>{o2Metrics.memory}</p>
                <div className="text-[10px] font-mono text-zinc-500 mt-1">Formats supports: {os2.fileSystems.join(', ')}</div>
              </td>
            </tr>

            {/* ROW 3: USER INTERFACE STYLE */}
            <tr className="hover:bg-white/[0.01]">
              <td className="p-4 align-top">
                <div className="flex items-center gap-2 text-[#818cf8]">
                  <Layout className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold text-zinc-300">Interface Utilisateur</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">Ergonomie et saisie</p>
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify">
                {o1Metrics.interface}
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify">
                {o2Metrics.interface}
              </td>
            </tr>

            {/* ROW 4: SCHEDULER & PROCESSES */}
            <tr className="hover:bg-white/[0.01]">
              <td className="p-4 align-top">
                <div className="flex items-center gap-2 text-[#818cf8]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold text-zinc-300">Noyau & Scheduler</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">Multitâche logique</p>
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify space-y-1">
                <span className="font-semibold text-zinc-200 text-[11px] block">{os1.kernel}</span>
                <span className={`text-[10px] inline-block font-mono ${getMultitaskingLevel(os1).color}`}>{getMultitaskingLevel(os1).status}</span>
                <p className="text-[11px] text-zinc-400 mt-1">{os1.kernelDetails}</p>
              </td>
              <td className="p-4 text-xs text-zinc-350 leading-relaxed border-l border-white/[0.04] text-justify space-y-1">
                <span className="font-semibold text-zinc-200 text-[11px] block">{os2.kernel}</span>
                <span className={`text-[10px] inline-block font-mono ${getMultitaskingLevel(os2).color}`}>{getMultitaskingLevel(os2).status}</span>
                <p className="text-[11px] text-zinc-400 mt-1">{os2.kernelDetails}</p>
              </td>
            </tr>

            {/* ROW 5: ANCESTRY FOUNDATION */}
            <tr className="hover:bg-white/[0.01]">
              <td className="p-4 align-top">
                <div className="flex items-center gap-2 text-[#818cf8]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold text-zinc-300">Base Matérielle</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">Architecture CPU</p>
              </td>
              <td className="p-4 text-xs text-zinc-400 border-l border-white/[0.04]">
                {os1.architectureBasis}
              </td>
              <td className="p-4 text-xs text-zinc-400 border-l border-white/[0.04]">
                {os2.architectureBasis}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* General Historian Verdict */}
      <div className="mt-5 text-left border border-white/[0.06] bg-[#121215]/80 p-4 rounded-xl flex items-start gap-3">
        <Scale className="w-5 h-5 text-[#818cf8] flex-shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">Note de Comparaison de l'Historien</h5>
          <p className="text-xs text-zinc-400 mt-1 lines-clamp-4 leading-relaxed font-sans">
            {generateHistorianVerdict(os1, os2)}
          </p>
        </div>
      </div>
    </div>
  );
}
