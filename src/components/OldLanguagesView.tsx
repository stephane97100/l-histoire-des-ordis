import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Cpu, Code2, Scroll, Sparkles, HelpCircle, AlertOctagon, Terminal } from 'lucide-react';

interface LanguageDetail {
  id: string;
  name: string;
  year: string;
  creator: string;
  mainPurpose: string;
  sampleCode: string;
  sampleExplanation: string;
  historianVerdict: string;
  whySunk: string;
  legacyStatus: string;
}

const oldLanguagesData: LanguageDetail[] = [
  {
    id: 'fortran',
    name: 'FORTRAN (Formula Translation)',
    year: '1957',
    creator: 'John Backus (IBM)',
    mainPurpose: 'Calcul scientifique intensif et physique nucléaire.',
    sampleCode: `C     ROOTS OF QUADRATIC EQUATION USING FORTRAN IV
      READ (5, 100) A, B, C
  100 FORMAT (3F10.4)
      DISCR = B**2 - 4.0*A*C
      IF (DISCR) 10, 20, 30
   10 WRITE (6, 200)
  200 FORMAT (' COMPLEX ROOTS DETECTED')
      STOP
   20 WRITE (6, 300) -B/(2.0*A)
  300 FORMAT (' DOUBLE ROOT IS ', F10.4)
      STOP
   30 ROOT1 = (-B + SQRT(DISCR))/(2.0*A)
      ROOT2 = (-B - SQRT(DISCR))/(2.0*A)
      WRITE (6, 400) ROOT1, ROOT2
  400 FORMAT (' ROOTS ARE ', 2F10.4)
      END`,
    sampleExplanation: "Ce code Fortran IV résout une équation du second degré. Remarquez la présence de la lettre 'C' en colonne 1 pour signifier un commentaire, l'obligation stricte d'écrire le code entre les colonnes 7 et 72 (héritage des cartes perforées de 80 colonnes), et le fameux 'IF arithmétique' à trois branches (saut vers la ligne 10 si négatif, 20 si nul, 30 si positif).",
    whySunk: "Le Fortran a souffert de sa rigidité historique. Né pour manipuler des tableaux mathématiques, il était extrêmement médiocre pour manipuler des chaînes de caractères, des structures de données complexes ou créer des interfaces. Les règles géométriques des cartes perforées (commencer l'instruction à la colonne 7) sont devenues insupportables pour les programmeurs à l'ère des éditeurs de fichiers libres.",
    legacyStatus: "Il n'est pas totalement mort ! Les codes de prédiction météo mondiaux, de physique moléculaire et d'ingénierie aérospatiale font toujours appel à Fortran 90 / 2018. Les bibliothèques mathématiques comme BLAS ou LAPACK, enfouies tout au fond de l'intelligence artificielle d'aujourd'hui (comme NumPy ou PyTorch), s'appuient toujours sur ces routines ultra-rapides compilées en Fortran.",
    historianVerdict: "Fortran n'a pas péri par incapacité technique, mais par spécialisation extrême. Il a cédé sa place d'enseignement au Pascal de Wirth, puis sa suprématie de calcul général au C et à Python."
  },
  {
    id: 'cobol',
    name: 'COBOL (Common Business-Oriented Language)',
    year: '1959',
    creator: 'Grace Hopper & Le comité CODASYL',
    mainPurpose: 'Gestion de bases de données commerciales, comptabilité administrative et bancaire.',
    sampleCode: `IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO-WORLD-BANK.

ENVIRONMENT DIVISION.
INPUT-OUTPUT SECTION.

DATA DIVISION.
WORKING-STORAGE SECTION.
01 WS-CUSTOMER-NAME PIC X(20) VALUE "JEAN DUPONT".
01 WS-ACCOUNT-BALANCE PIC 9(5)V99 VALUE 15000.50.

PROCEDURE DIVISION.
DISPLAY-BALANCE-PARA.
    DISPLAY "BIENVENUE SPECIAL CHEZ COBOL BANK".
    DISPLAY "SOLDE DU COMPTE POUR " WS-CUSTOMER-NAME " : ".
    DISPLAY WS-ACCOUNT-BALANCE " EUR.".
    STOP RUN.`,
    sampleExplanation: "Un Hello World bancaire en COBOL standard. Remarquez l'écriture volontariste inspirée de la grammaire de la langue anglaise, conçue pour que les directeurs financiers sans connaissances techniques puissent relire les lignes. Le typage 'PIC X(20)' définit une image mémoire fixe de 20 caractères alphanumériques.",
    whySunk: "La verbosité titanesque du COBOL l'a rendu impopulaire pour la nouvelle vague de micro-ordinateurs et d'applications Web. Écrire des centaines de lignes rien que pour déclarer l'environnement ('DIVISION') et définir manuellement l'emplacement de chaque caractère en mémoire devenait une corvée insupportable par rapport à la légèreté du langage C ou de SQL.",
    legacyStatus: "Un colosse de l'ombre. Aujourd'hui en 2026, on estime que plus de **220 milliards de lignes de code COBOL** sont en activité dans le monde. Plus de 70% des transactions bancaires quotidiennes mondiales et 95% des retraits dans les distributeurs de billets dépendent de programmes COBOL qui tournent sur de surpuissants Mainframes Maintenus par IBM.",
    historianVerdict: "Grace Hopper a voulu un langage proche de l'anglais commercial. Mais cette sémantique verbeuse a fini par isoler COBOL dans un ghetto industriel. Les jeunes générations refusent de l'apprendre, créant une pénurie critique d'ingénieurs au point de payer des fortunes les experts retraités pour maintenir le squelette de notre finance moderne."
  },
  {
    id: 'basic',
    name: 'BASIC (Beginners All-purpose Symbolic Instruction Code)',
    year: '1964',
    creator: 'John Kemeny & Thomas Kurtz',
    mainPurpose: 'Apprendre la programmation sans prérequis mathématiques.',
    sampleCode: `10 REM *** JEU DE DEVIN ET HISTOIRE DU BASIC ***
20 COLOR 14, 1
30 PRINT "DIVINATION NUMERIQUE"
40 SECRET = INT(RND(1) * 10) + 1
50 PRINT "DEVINEZ LE NOMBRE COMPRIS ENTRE 1 ET 10 :"
60 INPUT GUESS
70 IF GUESS = SECRET THEN GOTO 100
80 PRINT "MAUVAIS NUMERO ! L'ORDINATEUR AVAIT RETENU :"; SECRET
90 GOTO 40
100 PRINT "BRAVO ! VOUS COMPRENEZ LE BASIC COMPLIQUÉ"
110 END`,
    sampleExplanation: "Ce code BASIC classique contient des numéros de ligne (obligatoires sur les interpréteurs primitifs en mémoire ROM) et fait usage de l'instruction conditional 'GOTO'. À l'époque, vous deviez spécifier manuellement l'étiquette de ligne pour chaque embranchement.",
    whySunk: "Le BASIC a succombé à son absence originelle de structure. Les numéros de ligne et les sauts inconditionnels 'GOTO' créaient ce que l'éminent informaticien Edsger Dijkstra décrivit comme du **'Code Spaghetti'** : des programmes entrelacés impossibles à déboguer ou à faire évoluer au-delà de 200 lignes.",
    legacyStatus: "Il a légué une descendance royale : le Visual Basic de Microsoft dans les années 90, puis le VBA (Visual Basic for Applications) qui régit toujours en secret les fichiers Excel et macros macro-économiques complexes des départements de gestion du monde entier.",
    historianVerdict: "Le BASIC a accompli son œuvre d'éducation des masses : il a permis l'éclosion de dizaines de milliers de hackers autodidactes. Son effondrement est survenu lorsque l'industrie a exigé des langages structurés par modules (comme le C ou le Pascal) pour concevoir des logiciels complexes sans s'emmêler les pinceaux."
  },
  {
    id: 'lisp',
    name: 'LISP (List Processing)',
    year: '1958',
    creator: 'John McCarthy (MIT)',
    mainPurpose: 'Traitement symbolique et balbutiements de l\'Intelligence Artificielle.',
    sampleCode: `;;   RECURSIVE HELLO WORLD AND MATHEMATICAL MULTIPLY IN LISP
(defun factorielle (n)
  (if (<= n 1)
      1
      (* n (factorielle (- n 1)))))

(format t "Factorielle de 5 : ~D~%" (factorielle 5))`,
    sampleExplanation: "Écrit en Lisp pur. Toute la syntaxe repose sur des structures de Listes délimitées par des parenthèses avec une notation préfixée: '(+ 2 3)' au lieu de '2 + 3'. Remarquez l'absence de boucles traditionnelles, tout se résout élégamment par récursivité.",
    whySunk: "Une barrière psychologique d'écriture de parenthèses (surnommé avec dérision *'Lost In Stupid Parentheses'*) et un besoin exubérant de RAM pour la gestion de sa ramasse-miettes (Garbage Collector) à une époque où chaque octet était compté. Les machines n'avaient pas la puissance requise pour compiler convenablement les arbres syntaxiques abstraits propres à LISP.",
    legacyStatus: "Lisp survit sous la forme de dialectes légendaires comme **Emacs Lisp** (le moteur interne de l'éditeur GNU Emacs) et surtout **Clojure** (utilisé sur la machine virtuelle Java pour des applications de traitement asynchrone hautement parallèles).",
    historianVerdict: "LISP était incroyablement en avance, préconisant le concept d'autosimilarité (le code est lui-même une donnée ou 'homoiconicité') dès 1958. Sa relative mise à l'écart grand public est due au triomphe matériel des processeurs à pile séquentielle optimisés pour le langage C, sur lesquels Lisp s'exécutait avec de grandes pénalités de rapidité."
  },
  {
    id: 'algol',
    name: 'ALGOL (Algorithmic Language)',
    year: '1958',
    creator: 'Un comité conjoint académique International',
    mainPurpose: 'Uniformiser la description logique des algorithmes scientifiques.',
    sampleCode: `procedure Absmax(a) Size:(n, m) Result:(y) Subscripts:(i, k);
    value n, m; array a; integer n, m, i, k; real y;
begin
    integer p, q;
    y := 0; p := q := 1;
    for p:=1 step 1 until n do
        for q:=1 step 1 until m do
            if abs(a[p, q]) > y then
                begin y := abs(a[p, q]);
                    i := p; k := q
                end
end absmax;`,
    sampleExplanation: "Syntaxe formelle d'ALGOL 60. C'est l'un des premiers langages à introduire le bloc structuré par les mots-clés 'begin' et 'end', l'opérateur d'affectation typé ':=', et les portées locales de variables comme 'integer p, q'.",
    whySunk: "Il a été victime de sa conception trop académique et universitaire. Conçu comme une notation abstraite de tableau blanc par des chercheurs, il n'avait pas l'appui d'un constructeur hégémonique (comme IBM pour Fortran) et manquait d'instructions standards d'Entrée/Sortie (pour écrire directement sur une console ou un fichier), rendant sa mise en œuvre matérielle cauchemardesque.",
    legacyStatus: "Disparu à 100% de la production active, mais il s'agit pourtant du **véritable patriarche génétique de la syntaxe moderne**. Pascal, C, C++, Java, Rust et C# découlent directement de l'arborescence structurelle impulsée par ALGOL.",
    historianVerdict: "Considéré par les puristes comme le plus beau monument de l'histoire des compilateurs. ALGOL a défini la grammaire algorithmique qu'utilise encore la quasi-totalité de l'humanité de la programmation moderne."
  }
];

export default function OldLanguagesView() {
  const [selectedLangId, setSelectedLangId] = useState<string>(oldLanguagesData[0].id);
  const activeLang = oldLanguagesData.find(lang => lang.id === selectedLangId) || oldLanguagesData[0];

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl space-y-8 text-left" id="old-languages-panel">
      
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center shadow-lg">
            <Scroll className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">Les Vieux Langages de la Genèse</h3>
            <p className="text-xs text-zinc-400 mt-0.5">FORTRAN, COBOL, BASIC... Exploration critique de l'âge d'or et des facteurs de disparition des premiers compilateurs.</p>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono text-left md:text-right">
          <span>CLASSIFICATION : PALÉONTOLOGIE DU SOUFFLE BINAIRE</span>
        </div>
      </div>

      {/* HISTORIAN INTRO */}
      <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-5 md:p-6 space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <span>📖</span> Dissertation Historique : Pourquoi ces géants ont-ils quitté la scène ?
        </h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
          Contrairement aux espèces biologiques, les vieux langages de programmation ne s'éteignent pas par manque d'efficacité pure. Ils s'effacent par <strong>mutation structurelle</strong>. 
          Les premiers compilateurs des années 50 et 60 ont été forgés pour répondre à d'effroyables contraintes matérielles ou académiques spécifiques. À cette époque, la mémoire se comptait en cartes perforées physiques ou en tubes à vide magnétiques. <br /><br />
          À mesure que les ordinateurs se sont émancipés pour gérer du texte récursif, du réseau, des fichiers dynamiques et des microprocesseurs standardisés, ces dialectes historiques ont été heurtés par d'immenses écueils : l'absence de typage dynamique moderne, le sabotage logique causé par l'instruction sauvage 
          <code className="text-amber-400 font-mono text-[11px] bg-black px-1.5 py-0.5 rounded ml-1 border border-white/[0.04]">GOTO</code> (Génératrice de code spaghetti), et la rigidité de mise en page héritée de la structure physique des cartes cartonnées de 80 colonnes de l'IBM 704. Analysons individuellement les piliers du temple de la genèse logicielle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel - Multi-button select */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 scrollbar-thin">
          {oldLanguagesData.map((lang) => {
            const isSelected = lang.id === selectedLangId;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLangId(lang.id)}
                className={`flex-shrink-0 lg:flex-shrink-1 text-left px-4 py-3.5 rounded-xl transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#18181b] border-amber-500/40 text-white font-semibold shadow-md shadow-amber-950/10'
                    : 'bg-[#0c0c0e]/40 border-white/[0.04] hover:bg-[#121215] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-sm truncate">{lang.name.split(' (')[0]}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                </div>
                <div className="hidden lg:block text-[10px] text-zinc-500 mt-1 tracking-wide">
                  Création : {lang.year} • Par {lang.creator.split(' (')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Info View */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLang.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.16 }}
              className="space-y-6"
            >
              
              {/* Card Title Header Block */}
              <div className="border border-white/[0.05] bg-[#121215] rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase bg-amber-950/40 text-amber-300 border border-amber-900/40 rounded px-2 py-0.5">
                      GENÈSE : ANNÉE {activeLang.year}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-[#0c0c0e] border border-white/[0.06] rounded px-2 py-0.5">
                      Concepteur : {activeLang.creator}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{activeLang.name}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed"><span className="text-amber-500 font-semibold font-mono">OBJECTIF PREMIER :</span> {activeLang.mainPurpose}</p>
                </div>
              </div>

              {/* Code Sample Demonstration Visual */}
              <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-[#161619] shadow-inner space-y-0.5">
                <div className="bg-[#1e1e24] border-b border-white/[0.06] px-4 py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-[11px] text-zinc-300 font-bold">MANUSCRIT HISTORIQUE DE PROGRAMME</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">FORMAT BRUT D'ORIGINE</span>
                </div>
                
                {/* Simulated Paper/PunchCard Console */}
                <div className="p-5 bg-[#09090b] relative border-b border-white/[0.04]">
                  <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto text-left whitespace-pre select-text">
                    {activeLang.sampleCode}
                  </pre>
                  {/* Watermark badge */}
                  <div className="absolute bottom-2 right-3 font-mono text-[9px] text-zinc-600 tracking-wider">
                    COMPILER v{activeLang.year}.0
                  </div>
                </div>

                <div className="p-4 bg-[#121215] text-xs text-zinc-400 leading-relaxed text-justify italic">
                  💡 <span className="font-semibold text-zinc-300">Analyse de la syntaxe : </span> 
                  {activeLang.sampleExplanation}
                </div>
              </div>

              {/* Why has it disappeared vs Legacy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Decisive flaw/Disappearance */}
                <div className="space-y-3 bg-red-950/10 border border-red-900/15 rounded-xl p-5">
                  <h5 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-red-500" />
                    Pourquoi il a totalement disparu de l'écriture courante
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                    {activeLang.whySunk}
                  </p>
                </div>

                {/* Legacy Status */}
                <div className="space-y-3 bg-indigo-950/10 border border-[#818cf8]/15 rounded-xl p-5">
                  <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    Légat secret & Activité d'aujourd'hui
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                    {activeLang.legacyStatus}
                  </p>
                </div>

              </div>

              {/* Archeologist final critique */}
              <div className="bg-[#121215]/50 border border-white/[0.04] p-5 rounded-xl space-y-1.5">
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-amber-500" />
                  Le Verdict de l'Historien
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                  {activeLang.historianVerdict}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
