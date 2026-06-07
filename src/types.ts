export interface OSVersion {
  name: string;
  year: string;
  significance: string;
}

export type KernelType = 'Monolithic' | 'Microkernel' | 'Hybrid' | 'Exokernel' | 'Custom' | 'Nanokernel' | 'Aucun (Monoprogramme)';

export interface OSInfo {
  id: string;
  name: string;
  fullName: string;
  developer: string;
  launchYear: string;
  architects: string[];
  kernel: KernelType;
  kernelDetails: string;
  license: string;
  fileSystems: string[];
  architectureBasis: string; // e.g., UNIX, DOS, Amiga, CP/M, NeXTSTEP
  summary: string;
  description: string;
  historicalSignificance: string;
  keyInnovations: string[];
  anecdote: string;
  color: string; // Tailwind class color for UI tags
  versions: OSVersion[];
  survivalExplanation?: string; // Why this system survived and is still in use today
  
  // Specific sections for Linux
  linuxDistributions?: {
    historical: {
      name: string;
      year: string;
      description: string;
      significance: string;
    }[];
    modern: {
      name: string;
      year: string;
      description: string;
      targetAudience: string;
      popularitySign: string;
    }[];
  };
}

export interface LineageNode {
  id: string;
  label: string;
  year: string;
  type: 'ancestor' | 'group' | 'os' | 'os-variant';
  lineageId: string;
  children?: string[]; // IDs of children nodes
  description: string;
}

export interface Lineage {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  rootNode: string;
  nodes: LineageNode[];
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | (() => string);
}

export interface TerminalConfig {
  prompt: string;
  welcomeMessage: string;
  fontClass: string;
  bgClass: string;
  textClass: string;
  commands: { [key: string]: TerminalCommand };
}

export interface ForgottenOS {
  id: string;
  name: string;
  machine: string;
  launchYear: string;
  developer: string;
  cpu: string;
  ram: string;
  osInterfaceType: 'Text / BASIC' | 'Graphics GUI' | 'Hybrid CLI';
  summary: string;
  detailedHistory: string;
  whyForgotten: string;
  anecdote: string;
  basicCommands?: { cmd: string; out: string }[];
}

