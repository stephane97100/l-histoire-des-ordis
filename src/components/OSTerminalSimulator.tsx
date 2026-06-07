import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Terminal, RefreshCw, Send, HelpCircle, AlertTriangle } from 'lucide-react';

interface CLIEnv {
  id: string;
  name: string;
  prompt: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  welcome: string;
  commands: {
    [key: string]: {
      desc: string;
      run: (args?: string) => string;
    };
  };
}

export default function OSTerminalSimulator() {
  const [activeCli, setActiveCli] = useState<string>('msdos');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const cliEnvironments: { [key: string]: CLIEnv } = {
    msdos: {
      id: 'msdos',
      name: 'MS-DOS Prompt v6.22',
      prompt: 'C:\\>',
      bgClass: 'bg-black',
      textClass: 'text-emerald-400 font-mono',
      borderClass: 'border-emerald-900',
      welcome: `Microsoft(R) MS-DOS(R) Version 6.22
(C)Copyright Microsoft Corp 1981-1994.

Tapez 'HELP' pour lister les commandes disponibles.`,
      commands: {
        help: {
          desc: 'Affiche la liste des commandes MS-DOS disponibles.',
          run: () => `Commandes prises en charge :
  DIR        - Liste le contenu du répertoire courant
  VER        - Affiche la version du système DOS
  DATE       - Affiche l'heure et la date d'époque
  JOKE       - Petite blague d'historien de l'informatique
  NEOFETCH   - Résumé des spécifications du PC IBM simulé
  TYPE       - Affiche le contenu de fichier (ex: TYPE README.TXT)
  FORMAT     - Formate une disquette virtuelle (ex: FORMAT A:)
  CLS        - Efface l'écran du terminal`
        },
        ver: {
          desc: 'Affiche la version courante de MS-DOS.',
          run: () => 'MS-DOS version 6.22 - Code Source officiel relâché historiquement.'
        },
        dir: {
          desc: 'Affiche la liste des fichiers du dossier virtuel.',
          run: () => ` Le volume dans le lecteur C n'a pas d'étiquette.
 Le numéro de série du volume est 2A3B-1981

 Répertoire de C:\\

.              <DIR>        06-06-2026   23:16
..             <DIR>        06-06-2026   23:16
COMMAND  COM         54,645  31-05-1994   06:22
CONFIG   SYS            142  06-06-2026   23:16
AUTOEXEC BAT            280  06-06-2026   23:16
README   TXT          1,204  06-06-2026   23:16
QBASIC   EXE        194,303  31-05-1994   06:22
         5 fichier(s)        250,574 octets
         2 Dossier(s)     45,809,152 octets libres`
        },
        date: {
          desc: 'Affiche la date actuelle.',
          run: () => `La date actuelle est : Samedi 06-06-2026\nL'heure actuelle est : ${new Date().toLocaleTimeString()}`
        },
        neofetch: {
          desc: 'Affiche des statistiques informatiques rétro.',
          run: () => `     .----------.      OS: MS-DOS 6.22 (PC-Compatible)
    /          /       CPU: Intel 80386 DX @ 33 MHz
   /   IBM    /        RAM: 4 Mo (dont FMA de 640 Ko conventionnels)
  /          /         GPU: VGA Standard 256 Couleurs (OAK Tech)
  '----------'         HDD: IDE Seagate 40 Mo`
        },
        type: {
          desc: 'Affiche le contenu de README.TXT.',
          run: (arg) => {
            if (!arg || arg.toUpperCase() !== 'README.TXT') {
              return "Fichier non trouvé. Essayez 'TYPE README.TXT'";
            }
            return `--- CHRONOS HISTORIC ARCHIVE ---
Bienvenue sur l'ancêtre du stockage industriel.
MS-DOS ne dispose d'aucun multitâche.
Votre processeur Intel 386 attend patiemment la fin de votre saisie clavier.
A lire : La disquette de Windows 3.11 vous attend au bureau des secrets.`;
          }
        },
        joke: {
          desc: 'Une blague de geek.',
          run: () => "Pourquoi les historiens aiment-ils MS-DOS ?\nParce qu'à l'époque, les crashs de Windows n'étaient pas un bug, ils se chargeaient comme une fonctionnalité par-dessus !"
        },
        format: {
          desc: 'Simule le formatage de disquette.',
          run: (arg) => {
            if (!arg) return "Veuillez spécifier le lecteur à formater (ex: FORMAT A:)";
            return `Insertion d'une nouvelle disquette 1.44 Mo dans le lecteur ${arg.toUpperCase()}...
Formatage en cours...
10%... 40%... 80%... 100%
Formatage terminé. Le secteur de boot est désormais vierge.`;
          }
        }
      }
    },
    amiga: {
      id: 'amiga',
      name: 'Amiga Shell v1.3',
      prompt: '1.Amiga:>',
      bgClass: 'bg-indigo-950',
      textClass: 'text-amber-300 font-mono',
      borderClass: 'border-amber-600/40',
      welcome: `Amiga Workbench Command Line Interface (CLI)
Copyright (C) 1985-1988 Commodore-Amiga, Inc.
Kernel Exec v1.3 loaded in ROM.

Tapez 'help' pour lister les commandes AmigaOS.`,
      commands: {
        help: {
          desc: 'Liste des instructions cli Amiga.',
          run: () => `Commandes CLI AmigaOS :
  list       - Répertoire des disquettes système
  version    - Affiche la version d'Exec et Kickstart
  info       - État des périphériques de stockage (DF0:, DF1:)
  loadwb     - Tente de charger l'interface Workbench
  joke       - Anecdote Commodore d'époque
  neofetch   - Spécifications matérielles de l'Amiga 500`
        },
        version: {
          desc: 'Renvoie la version courante.',
          run: () => 'Kickstart version 34.5 (V1.3), Workbench version 34.20'
        },
        list: {
          desc: 'Liste les fichiers de l\'Amiga.',
          run: () => `Directory "System" on Saturday 06-Jun-06
System             DIR  ----rwed Today 23:16:37
Utilities          DIR  ----rwed Today 23:16:37
Expansion          DIR  ----rwed Today 12:00:00
Shell              12040  ----rwed 10-Oct-1988
LoadWB             4560  ----rwed 10-Oct-1988
EndCLI             3212  ----rwed 10-Oct-1988`
        },
        info: {
          desc: 'Affiche l\'utilisation des lecteurs.',
          run: () => `Unit     Size     Used     Free    Full%  Status    Name
DF0:     880K     712K     168K     81%   Read-Only Workbench1.3
DF1:     880K       0K     880K      0%   No-Disk   -`
        },
        neofetch: {
          desc: 'Affiche la configuration de l\'Amiga.',
          run: () => `     /\\               OS: AmigaOS 1.3
    /  \\              CPU: Motorola 68000 @ 7.16 MHz
   /____\\   _         Chipset: OCS (Agnus, Denise, Paula)
  /      \\ (_)        RAM: 512 Ko Chip RAM + 512 Ko Slow RAM
 /________\\           Sound: 4 voies stéréo PCM 8-bit natives`
        },
        loadwb: {
          desc: 'Démarre le bureau Workbench.',
          run: () => `Tentative d'ouverture de l'écran Workbench...
[SUCCESS] Le gestionnaire d'écrans superposables d'AmigaOS vient de basculer d'une couche matérielle. Interface Workbench bleue et orange activée.`
        },
        joke: {
          desc: 'Une blague Amiga.',
          run: () => "Pourquoi l'Amiga était-il en avance de 10 ans ?\nParce que pendant que Bill Gates dessinait des sabliers sur Windows, l'Amiga jouait la démo animée 'Boing Ball' en multitâche et en haute résolution !"
        }
      }
    },
    sunos: {
      id: 'sunos',
      name: 'SunOS Technical Virtual Shell',
      prompt: 'sunos% ',
      bgClass: 'bg-zinc-900',
      textClass: 'text-[#e0def4] font-mono',
      borderClass: 'border-zinc-700',
      welcome: `SunOS Release 4.1.3 (SPARCstation-10)
System administrator login initialized.
Type 'help' to unlock custom historical instructions.`,
      commands: {
        help: {
          desc: 'Visualisation des commandes UNIX Sun.',
          run: () => `Commandes SunOS disponibles :
  ls         - Liste les fichiers d'administration
  uname -a   - Spécifications du noyau d'inspiration BSD
  dtrace     - Simule la sonde de performance dynamique propriétaire
  w          - Liste les utilisateurs connectés sur le terminal réseau NFS
  neofetch   - Spécifications de la station SPARC
  cat motd   - Affiche le message de bienvenue du serveur`
        },
        'uname -a': {
          desc: 'Affiche les informations noyau.',
          run: () => 'SunOS sunhost 4.1.3 1 sun4m sparc'
        },
        ls: {
          desc: 'Liste les fichiers.',
          run: () => `drwxr-xr-x   2 root     shared        512 Jun  6 23:16 .
drwxr-xr-x  14 root     shared        512 Jun  6 23:16 ..
-rwxr-xr-x   1 billjoy  sys         34580 Oct 12 1992  vi
-rw-r--r--   1 root     sys           204 Jun  6 23:16 motd
-r-xr-xr-x   1 root     sys        198420 Oct 12 1992  nfsd`
        },
        'cat motd': {
          desc: 'Affiche le message système.',
          run: () => `===========================================================
*   Bienvenue sur le serveur central de Sun Microsystems.   *
*   Architecte : Bill Joy. "The Network is the Computer".   *
===========================================================`
        },
        w: {
          desc: 'Affiche l\'activité utilisateur.',
          run: () => `  11:16pm  up 24 days,  3:12,  2 users,  load average: 0.04, 0.08, 0.12
USER     TTY      FROM              LOGIN@  IDLE   WHAT
billjoy  console  -                22:05    1.00s  vi /usr/src/sys/sys/main.c
gosling  ttyp0    gosling-station  23:01    5:14   javac HelloWorld.java`
        },
        dtrace: {
          desc: 'Exécute une investigation dynamique.',
          run: () => `dtrace: system trace initialized successfully...
CPU     ID                    FUNCTION:NAME
  0    120                     sched:enqueue   Envoi d'un paquet TCP/IP via NFS
  0    341                sys_read:entry       Lecteur de disque actif (34 Mo/s)
dtrace: 2 probes fired, no bottleneck detected.`
        },
        neofetch: {
          desc: 'Statistiques de la machine Sun.',
          run: () => `     _________       OS: SunOS 4.1.3 (Solaris Engine BSD)
    /   _   _/       CPU: MicroSPARC II @ 50 MHz
   /   / |_/         RAM: 32 Mo (Haut de gamme scientifique)
  /   /_             STORAGE: 1 Go SCSI externe unifié par NFS
 /_____/             UI: OpenWindows / X11R5`
        }
      }
    },
    beos: {
      id: 'beos',
      name: 'BeOS Terminal v5.0',
      prompt: 'beos:/boot/home> ',
      bgClass: 'bg-slate-950',
      textClass: 'text-violet-400 font-mono',
      borderClass: 'border-violet-900',
      welcome: `Welcome to the BeOS Terminal.
System: BeOS 5.0.3 "Hollis" (x86 Edition).
Optimized for multi-threading & massive media playback.
Enter 'help' to review historical media terminal commands.`,
      commands: {
        help: {
          desc: 'Commandes BeOS dédiées.',
          run: () => `Commandes Be OS disponibles :
  ls         - Liste récursive du système BFS
  bfsinfo    - Examine les métadonnées indexées par base de données de BFS
  neofetch   - Spécifications de la bête multimédia
  joke       - Histoire sur le rachat manqué par Apple
  alert      - Ouvre une alerte graphique système`
        },
        ls: {
          desc: 'Examine le dossier.',
          run: () => `beos:/boot/home> ls
-rw-r--r--   1 user  common    1240  Today 23:16   audio_mixer.cpp
drwxr-xr-x   2 user  common       0  Today 23:16   Desktop
drwxr-xr-x   2 user  common       0  Today 23:16   mail
-rwxr-xr-x   1 user  common   98452  Mar 12 2000   BeMovie_Player`
        },
        bfsinfo: {
          desc: 'Affiche les attributs.',
          run: () => `File: audio_mixer.cpp
File System: BFS (Be File System)
============= ATTACHED METADATA / DATABASE INDEX =============
Composer (Artist) : Jean-Louis Gassee
Bitrate           : 44100 Hz, 16-bit Stéréo
Status            : Ready, index mis à jour en temps réel (0.001 ms)
Index Query State : Searchable by any OS database query instant-wide.`
        },
        alert: {
          desc: 'Alarme système.',
          run: () => 'System Alert dialog spawned on Workbench. (Simulé : "BeOS est prêt pour digérer 24 pistes audio indépendantes !").'
        },
        neofetch: {
          desc: 'Tableau de bord de la bête BeOS.',
          run: () => `      __             OS: BeOS R5 Personal Edition
     /  )            CPU: Intel Pentium II dual-process @ 300 MHz
    /--<             RAM: 64 Mo SDRAM
   /    )            Sound: SoundBlaster Live! avec pilote basse latence
  (____/             File System: BFS indexé (Hautes Performances)`
        },
        joke: {
          desc: 'La plaisanterie de Jean-Louis Gassée.',
          run: () => "Pourquoi Apple a-t-il préféré acheter NeXT de Steve Jobs plutôt que BeOS ?\nParce que Jean-Louis Gassée voulait 400 millions de dollars d'action Apple, alors que Steve Jobs a offert le retour immédiat du messie et une keynote gratuite !"
        }
      }
    },
    raspberry: {
      id: 'raspberry',
      name: 'Raspberry Pi Bash (pi@raspberrypi:~)',
      prompt: 'pi@raspberrypi:~ $ ',
      bgClass: 'bg-[#090d16]',
      textClass: 'text-rose-400 font-mono',
      borderClass: 'border-rose-950/40',
      welcome: `Linux raspberrypi 6.1.21-v8+ #1642 SMP PREEMPT ARMv8 64-bit
      
Welcome to Raspberry Pi OS (Debian Bookworm base).
Type 'help' to review embedded hardware & system commands.`,
      commands: {
        help: {
          desc: 'Liste des commandes Raspberry Shell.',
          run: () => `Commandes disponibles sur cette console ARM :
  ls            - Liste les dossiers de projets (Python, GPIO...)
  cat config.py - Affiche le script de lecture des capteurs GPIO
  pinout        - Sortie d'affichage ASCII du connecteur 40 broches GPIO
  sudo apt      - Simule l'installation de paquets (ex: sudo apt install python3)
  neofetch      - Spécifications du Raspberry Pi monocarte simulé
  joke          - Anecdote amusante sur le projet`
        },
        ls: {
          desc: 'Dossier utilisateur.',
          run: () => `total 16
drwxr-xr-x 2 pi pi 4096 Jun  6 22:15 Desktop
drwxr-xr-x 2 pi pi 4096 Jun  6 23:16 python_games
-rwxr-xr-x 1 pi pi  431 Jun  6 23:16 config.py
-rw-r--r-- 1 pi pi  102 Jun  6 23:16 sensors_log.csv`
        },
        'cat config.py': {
          desc: 'Affiche un code Python d\'accès GPIO.',
          run: () => `import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)  # Broche de la LED

print("Démarrage du clignotement de la LED...")
try:
    while True:
        GPIO.output(18, GPIO.HIGH)
        time.sleep(0.5)
        GPIO.output(18, GPIO.LOW)
        time.sleep(0.5)
except KeyboardInterrupt:
    GPIO.cleanup()
    print("GPIO nettoyé.")`
        },
        pinout: {
          desc: 'Affiche la carte des GPIO.',
          run: () => `        ,--------------------------------.
        | oooooooooooooooooooo J8     |
        | 1ooooooooooooooooooo        |
        |                             |
        |      Broadcom               |
        |      BCM2711 ARM            |
        |                             |
        |  [USB] [USB] [LAN]          |
        \`-----------------------------+
        
J8 CONNECTOR PINOUT:
  3V3 Power   (1)  (2)   5V Power
  GPIO 2 (SDA)(3)  (4)   5V Power
  GPIO 3 (SCL)(5)  (6)   Ground
  GPIO 4      (7)  (8)   GPIO 14 (TXD)
  Ground      (9)  (10)  GPIO 15 (RXD)
  GPIO 17    (11)  (12)  GPIO 18 (PWM)`
        },
        'sudo apt': {
          desc: 'Simule apt-get.',
          run: (args) => {
            const clean = args ? args.trim().toLowerCase() : '';
            if (clean === 'install python3' || clean.includes('install')) {
              return `Lecture des listes de paquets... Fait
Construction de l'arbre des dépendances... Fait
Les NOUVEAUX paquets suivants seront installés :
  python3-minimal python3-pip
0 mis à jour, 2 nouvellement installés, 0 à enlever.
Réception de :1 http://archive.raspberrypi.org/debian bookworm/main armhf [420 kB]
Configuration de python3 (3.11.2-1+b1) ... [OK]`;
            }
            return `Options de démo d'apprentissage historique :
  sudo apt install python3`;
          }
        },
        neofetch: {
          desc: 'Données matérielles du Pi.',
          run: () => `      ,---,          OS: Raspberry Pi OS Bookworm (ARM64)
     /   _ \\_        Host: Raspberry Pi 4 Model B Rev 1.5
    |   (_)  |       Kernel: 6.1.21-v8+ v8+ Linux
    |   _    |       Uptime: 4 hours, 12 mins
     \\   \\_/ /       CPU: Broadcom BCM2711 Quad-Core Cortex-A72 @ 1.5GHz
      \`---\`          RAM: 8 Go LPDDR4 (Modèle Premium)
                     Storage: SanDisk Ultra 32 Go MicroSD (Classe 10)`
        },
        joke: {
          desc: 'Grande blague du Raspberry.',
          run: () => "Pourquoi le Raspberry Pi s'appelle-t-il ainsi ?\nParce que 'Raspberry' fait référence au fruit (framboise), s'inscrivant dans la tradition des noms de fruits informatiques (comme Apple, Tangerine ou Apricot), et 'Pi' fait référence à Python, le langage préconisé pour l'apprentissage !"
        }
      }
    },
    basic: {
      id: 'basic',
      name: 'ROM BASIC v1.1',
      prompt: 'OK\n',
      bgClass: 'bg-[#1e1ea8]',
      textClass: 'text-amber-300 font-mono font-bold',
      borderClass: 'border-blue-700',
      welcome: `ROM BASIC V1.1 BY MICROSOFT
(C) Copyright Microsoft Corp 1982-1985
32768 BYTES FREE

Tapez 'help' pour lister les instructions d'époque.`,
      commands: {
        help: {
          desc: 'Affiche la liste des commandes BASIC.',
          run: () => `Instructions BASIC disponibles :
  LIST       - Affiche le code source BASIC en mémoire
  RUN        - Exécute le programme en mémoire ram
  PRINT      - Affiche une ligne (ex: PRINT Hello)
  PEEK       - Lit un octet dans la mémoire virtuelle (ex: PEEK 16384)
  POKE       - Écrit un octet en mémoire (ex: POKE 16384, 128)
  NEOFETCH   - Spécifications du micro-ordinateur émulé
  JOKE       - Éclats d'humour en BASIC`
        },
        list: {
          desc: 'Affiche le programme BASIC.',
          run: () => `10 REM --- MONOLOGUE GEEK ---
20 COLOR 14, 1 : CLS
30 PRINT "BIENVENUE SUR CHRONOS BASIC v1.1"
40 FOR I = 1 TO 3 : PRINT "CHARGEMENT SYSTEME MICRO-80..." : NEXT I
50 PRINT "MOTEUR DE RECHERCHE CONSOLE PREP-7 OK"
60 END`
        },
        run: {
          desc: 'Exécute le programme chargé.',
          run: () => `[EXECUTION...]
BIENVENUE SUR CHRONOS BASIC v1.1
CHARGEMENT SYSTEME MICRO-80...
CHARGEMENT SYSTEME MICRO-80...
CHARGEMENT SYSTEME MICRO-80...
MOTEUR DE RECHERCHE CONSOLE PREP-7 OK

Break in 60`
        },
        print: {
          desc: 'Affiche le message entré après PRINT.',
          run: (args) => {
            if (!args) return "Syntax Error (Essayez: PRINT BONJOUR HISTORIEN)";
            let cleanMsg = args.replace(/["']/g, ''); // strip optional quotes
            return cleanMsg;
          }
        },
        peek: {
          desc: 'Lit un octet mémoire.',
          run: (args) => {
            const addr = args ? args.trim() : '16384';
            return `Lecture de l'adresse virtuelle ${addr}...
Octet récupéré : ${Math.floor(Math.random() * 256)} (Binaire: ${Math.floor(Math.random() * 256).toString(2)})`;
          }
        },
        poke: {
          desc: 'Écrit un octet mémoire.',
          run: (args) => {
            if (!args) return "Syntax Error (Utilisation: POKE adresse, valeur)";
            return `OK. Écriture effectuée dans le tampon d'adresse de l'accumulateur.`;
          }
        },
        neofetch: {
          desc: 'Spécifications de la bête BASIC.',
          run: () => `     ____________    OS: Microsoft ROM-BASIC v1.1
    /           /    Host: IBM 5150 Personal Computer Client
   /   BASIC   /     CPU: Intel 8088 @ 4.77 MHz
  /           /      RAM: 64 Ko RAM conventionnelle
 /___________/       Storage: Support cassette audio / Disquette 5.25"`
        },
        joke: {
          desc: 'Plaisanterie BASIC.',
          run: () => "Pourquoi les développeurs des années 80 avaient une excellente santé physique ?\n\nParce que leur vie était une boucle constante : 10 COURIR, 20 MANGER, 30 DORMIR, 40 GOTO 10 !"
        }
      }
    },
    tos: {
      id: 'tos',
      name: 'Atari TOS v1.04 CLI',
      prompt: 'A:\\>',
      bgClass: 'bg-zinc-200',
      textClass: 'text-zinc-900 font-mono font-medium',
      borderClass: 'border-zinc-400',
      welcome: `Atari TOS Command Command Tool (Rainbow TOS v1.04)
(C) Copyright 1989 Atari Corp. All Rights Reserved.
GEM Desktop Interface and AES graphics pipeline initialized.

Tapez 'help' pour les instructions Atari CLI.`,
      commands: {
        help: {
          desc: 'Liste des instructions Atari CLI.',
          run: () => `Commandes TOS console autorisées :
  DIR        - Liste le contenu de la disquette virtuelle
  SHOW       - Affiche le fichier texte d'origine Jack Tramiel (ex: SHOW README.DOC)
  GEM        - Boote l'interface graphique du Bureau GEM verte d'époque
  ST_DEATH   - Simule les fameuses bombes Atari systémiques fatales (crash d'époque)
  NEOFETCH   - Spécifications matérielles de l'Atari 1040 ST
  JOKE       - Blague ou citation de l'icône Jack Tramiel`
        },
        dir: {
          desc: 'Contenu du lecteur A.',
          run: () => ` Le volume dans le lecteur A n'a pas d'étiquette.
 Répertoire de A:\\

TOS      SYS       112,400  02-04-1989   11:00
DESKTOP  INF         1,204  06-03-1989   14:32
GWRITE   PRG        54,220  15-05-1989   09:00
MIDI_SYN APP        48,150  18-09-1989   16:15
README   DOC         1,048  06-06-2026   23:16
         5 fichier(s)       217,022 octets
         0 Dossier(s)       145,152 octets de libres`
        },
        show: {
          desc: 'Affiche un fichier disquette.',
          run: (args) => {
            if (!args || args.toUpperCase() !== 'README.DOC') {
              return "Fichier non trouvé. Spécifiez (SHOW README.DOC)";
            }
            return `================= NOTE JACK TRAMIEL (MD) =================
"Power without the Price" (Le pouvoir sans le prix) !
Bienvenue sur l'Atari 1040 STf. En 1985, Atari dote d'office sa machine
de broches d'interface MIDI standardisées.
C'est grâce à cette audace que les plus grands précurseurs de la MAO
(Musique Assistée par Ordinateur) comme Pro-24 (Cubase originel) ou Creator
naissent et façonnent les disques de légende des années 90 (Jean-Michel Jarre,
Daft Punk, Fatboy Slim...).`;
          }
        },
        gem: {
          desc: 'Boote le bureau graphique GEM.',
          run: () => `Chargement dynamique du Graphics Environment Manager...
[SUCCESS] Bureau GEM vert 2D opérationnel ! Palette couleur RVB 16 tons chargée sur moniteur Atari SC1224.
Souris opérationnelle (Atari mouse branchée sur port 0).`
        },
        st_death: {
          desc: 'Simule l\'erreur système fatale.',
          run: () => `💣  💣  💣  💣  💣  💣  💣  💣
[SYSTEM SHUTDOWN - ERROR CODE EXCEPTION]
Exception de bus d'adresse détectée sur la broche du CPU Motorola 68000.
TOS a détecté 8 bombes de corruption de pile mémoire fatale.
Veuillez réinitialiser votre machine ST à froid.`
        },
        neofetch: {
          desc: 'Détails de l\'Atari.',
          run: () => `     .________.      OS: Atari TOS v1.04 "Rainbow" (avec coprocesseur)
    /        /       Host: Atari 1040 STf Edition Francophone
   /   ST   /        CPU: Motorola MC68000 @ 8.0 MHz (16/32-bits)
  /________/         RAM: 1 Mo (1024 Ko) de RAM unifiée haut de gamme d'intérêt musical
                     GPU: Shifter vidéo standard 2 et Blit de bloc`
        },
        joke: {
          desc: 'Plaisanterie Jack Tramiel.',
          run: () => "Pourquoi le Commodore Amiga et l'Atari ST se détestaient-ils tant ?\n\nParce que l'Atari ST était un Commodore déguisé et l'Amiga était un projet d'Atari raté ! Les ingénieurs se sont échangé leurs brevets à coup de procès spectaculaires d'archéologie industrielle !"
        }
      }
    },
    vg5000: {
      id: 'vg5000',
      name: 'Philips VG5000 BASIC',
      prompt: 'OK\n',
      bgClass: 'bg-[#000080]',
      textClass: 'text-cyan-300 font-mono font-bold',
      borderClass: 'border-cyan-600/30',
      welcome: `PHILIPS VG5000 - GR099 MICRO-INTERPRETER v1.0
(C) 1984 PHILIPS / RADIOLA
24576 BYTES FREE

Tapez 'help' pour la notice du VG5000.`,
      commands: {
        help: {
          desc: 'Affiche la liste des commandes.',
          run: () => `Notice du Philips VG5000 BASIC :
  LIST       - Affiche le code source du jeu d'aventure émulé
  RUN        - Exécute le jeu stocké en mémoire
  PRINT      - Affiche des lignes d'écriture (ex: PRINT "TEST")
  PLAY       - Émet des signaux d'alarme et beeps virtuels
  NEOFETCH   - Examine les puces internes du VG5000 (Z80, EF9345)
  JOKE       - Blague historique sur l'esthétique du clavier`
        },
        list: {
          desc: 'Affiche le code source du jeu.',
          run: () => `10 REM *** LE MONSTRE DU SILICIUM ***
20 SCREEN 0,1 : CLS
30 PRINT "MONSTRE APPARAIT A L'ECRAN"
40 FOR I = 1 TO 200: NEXT I
50 PRINT "BRAVO ! VOUS AVEZ ACHETE PLUS DE RAM"
60 END`
        },
        run: {
          desc: 'Exécute le code source.',
          run: () => `[EXECUTION DU CHARGEMENT...]
MONSTRE APPARAIT A L'ECRAN
[Sprites semigraphiques EF9345 émulés]
 █▄▄ █▄▄ ▄█▄
 ▀█▀ ▀█▀ █▀█
BRAVO ! VOUS AVEZ ACHETE PLUS DE RAM
Break in 60`
        },
        print: {
          desc: 'Affiche la chaîne.',
          run: (args) => args ? args.replace(/["']/g, '') : "Syntax Error"
        },
        play: {
          desc: 'Joue une suite sonore.',
          run: () => `♪ BEEP SYSTEME (1 Voie) ♪
Philips VG5000 synthétise activement une note simple d'alarme de 89 ms.`
        },
        neofetch: {
          desc: 'Spécifications techniques.',
          run: () => `      _______        OS: VG5000 Microsoft BASIC v1.0
     /  ___  \\       Host: Philips VG5000 (Radiola France)
    /  /  /__/       CPU: Zilog Z80A @ 4.0 MHz (8-bits pur)
   /  /______        RAM: 24 Ko (extensible à 56 Ko avec cartouche)
  /_________/        GPU: Écran semigraphique EF9345 (25 lignes de 40 car.)`
        },
        joke: {
          desc: 'Blague d\'époque.',
          run: () => "Pourquoi le Philips VG5000 avait-il un clavier si unique ?\n\nParce que ses touches étaient en gomme dure de caoutchouc séparées comme des chiclets d'écorce ! Les utilisateurs devaient taper avec une force d'athlète pour imprimer une lettre sans rater la gâchette !"
        }
      }
    },
    thomson: {
      id: 'thomson',
      name: 'Thomson MO5 / TO7',
      prompt: ']\n',
      bgClass: 'bg-[#ffffcc]',
      textClass: 'text-[#0000a8] font-mono font-bold',
      borderClass: 'border-yellow-300',
      welcome: `THOMSON MICRO-SYSTEMES v1.0 (MICR09)
(C) 1984 FIL / MICROSOFT
31242 OCTETS LIBRES

Tapez 'help' pour le plan de vol Thomson.`,
      commands: {
        help: {
          desc: 'Affiche la liste des commandes.',
          run: () => `Plan de vol Thomson MO5 & TO7 :
  LIST       - Affiche le programme d'initiation au calcul
  RUN        - Exécute le calcul en mémoire ram
  IPT        - L'histoire légendaire du "Plan Informatique pour Tous" de 1985
  SCREEN     - Alterne les couleurs de l'écran (ex: SCREEN 2,0)
  NEOFETCH   - Fiche d'identité du micro-ordinateur national
  JOKE       - Blague sur les touches souples durcies ou le crayon optique`
        },
        ipt: {
          desc: 'Historique IPT 1985.',
          run: () => `====== LE PLAN INFORMATIQUE POUR TOUS (1985) ======
En 1985, le gouvernement français lance un projet pharaonique destiné à équiper
toutes les écoles de France en micro-ordinateurs. Près de 120 000 ordinateurs, 
majoritairement des Thomson MO5 et TO7-70, sont déployés dans des réseaux appelés
"Nanoréseau". Des millions d'écoliers français ont ainsi tapé leurs toutes premières
lignes de BASIC d'écriture sous les yeux de professeurs passionnés.`
        },
        list: {
          desc: 'Affiche le code source du calcul.',
          run: () => `10 REM *** INITIATION MATHS ***
20 SCREEN 1,2 : CLS
30 PRINT "NANO-RESEAU S-09 EN ACTION"
40 FOR X = 1 TO 5
50 PRINT "X="; X; " CARRE="; X*X
60 NEXT X
70 END`
        },
        run: {
          desc: 'Exécute le code source.',
          run: () => `[BOOT NANORESEAU...]
NANO-RESEAU S-09 EN ACTION
X= 1  CARRE= 1
X= 2  CARRE= 4
X= 3  CARRE= 9
X= 4  CARRE= 16
X= 5  CARRE= 25
OK. Opération terminée sous 20 ms (Motorola 6809E).`
        },
        screen: {
          desc: 'Alterne les couleurs d\'écran.',
          run: (args) => `OK. Couleur de fond modifiée d'après l'instruction SCREEN [${args || '2,0'}]. (Simulation graphique de palette Thomson d'époque).`
        },
        neofetch: {
          desc: 'Spécifications de la bête.',
          run: () => `     ____________    OS: Microsoft BASIC 1.0 (FIL)
    /   ______  /    Host: Thomson MO5 (Clavier Gomme d'époque)
   /   /     / /     CPU: Motorola 6809E @ 1.0 MHz
  /   /_____/ /      RAM: 48 Ko (dont 32 Ko utilisables en RAM utilisateur)
 /___________/       IO: Crayon optique actif d'origine ou lecteur cassette extérieur`
        },
        joke: {
          desc: 'Blague crayon optique.',
          run: () => "Pourquoi les enfants français de 1985 se sentaient-ils comme des magiciens ?\n\nParce qu'ils collaient un stylo spécial branché (le 'crayon optique') directement sur la vitre de leur lourd moniteur cathodique pour dessiner des pixels ou cliquer sur l'écran !"
        }
      }
    }
  };

  // Run a command in the current shell
  const handleExecute = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const cmdClean = inputVal.trim();
    if (!cmdClean) return;

    const env = cliEnvironments[activeCli] || cliEnvironments.msdos;
    let newHistory = [...history, { type: 'input' as const, text: `${env.prompt}${cmdClean}` }];

    const lowerCmd = cmdClean.toLowerCase();
    const cmdKey = Object.keys(env.commands).find(k => lowerCmd.startsWith(k));

    if (lowerCmd === 'cls' || lowerCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmdKey) {
      const restArgs = cmdClean.substring(cmdKey.length).trim();
      const output = env.commands[cmdKey].run(restArgs);
      newHistory.push({ type: 'output' as const, text: output });
    } else {
      newHistory.push({
        type: 'output' as const,
        text: `Commande ou nom de fichier non reconnu. Tapez 'help' ou 'HELP' pour lister les options historiques.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  // Autoreset history on shell switch
  useEffect(() => {
    const env = cliEnvironments[activeCli] || cliEnvironments.msdos;
    setHistory([{ type: 'output', text: env.welcome }]);
  }, [activeCli]);

  // Scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-xl p-6 shadow-xl" id="retro-terminal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold font-sans text-white flex items-center gap-2">
            <Terminal className="text-[#818cf8] w-5 h-5 animate-pulse" />
            Simulateur de Console & Interactivité Shell d'Époque
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Mettez-vous dans les conditions réelles d'un développeur ou d'un utilisateur des années 80-90 en invoquant des terminaux de légende.
          </p>
        </div>

        {/* OS CLI Selectors */}
        <div className="flex flex-wrap gap-2">
          {Object.values(cliEnvironments).map((env) => (
            <button
              key={env.id}
              onClick={() => setActiveCli(env.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all border cursor-pointer ${
                activeCli === env.id
                  ? 'bg-[#18181b] text-white border-white/[0.15] shadow-md shadow-black/20'
                  : 'bg-[#09090b] hover:bg-[#121215] text-zinc-400 border-white/[0.04]'
              }`}
            >
              {env.name.split(' v')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-black rounded-lg border border-white/[0.06] shadow-inner p-4 relative overflow-hidden">
        {/* Retro CRT Overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15 pointer-events-none z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_95%)] pointer-events-none z-20" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/[0.03] animate-[scanline_8s_linear_infinite] pointer-events-none z-20" />

        {/* Terminal Text Screen */}
        <div className="h-[280px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-1 text-left select-text relative z-10">
          {history.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap text-sm leading-relaxed ${
                line.type === 'input' 
                  ? 'text-white font-mono font-semibold' 
                  : cliEnvironments[activeCli]?.textClass || 'text-emerald-400 font-mono'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleExecute} className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06] relative z-10">
          <span className="font-mono text-sm text-zinc-450 font-semibold flex-shrink-0">
            {cliEnvironments[activeCli]?.prompt || 'C:\\>'}
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Écrivez une commande... exe: help, neofetch, ls"
            className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-sm placeholder-zinc-800"
            autoFocus
          />
          <button
            type="submit"
            className="p-1 px-3 bg-[#0c0c0e] hover:bg-[#121215] border border-white/[0.06] hover:border-white/[0.12] rounded text-xs font-bold text-zinc-400 flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <Send className="w-3 h-3 text-zinc-400" />
            Entrer
          </button>
        </form>
      </div>

      {/* Terminal Footer Tips */}
      <div className="flex items-center gap-2 mt-3 bg-[#121215]/60 border border-white/[0.05] p-3 rounded-lg text-left text-xs text-zinc-400">
        <HelpCircle className="w-4 h-4 flex-shrink-0 text-[#818cf8]" />
        <p>
          <strong>Conseil technique :</strong> Tentez la commande <code className="bg-black border border-white/[0.04] py-0.5 px-1.5 rounded text-amber-300 font-mono text-[11px]">neofetch</code> ou <code className="bg-black border border-white/[0.04] py-0.5 px-1.5 rounded text-amber-300 font-mono text-[11px]">joke</code> dans n'importe quel terminal virtuel pour apprécier les données ou répliques récoltées par l'historien !
        </p>
      </div>
    </div>
  );
}
