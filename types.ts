export interface CommandOption {
  flag: string;
  description: string;
  example: string;
  explanation: string;
}

export interface CommandExample {
  title: string;
  code: string;
  output?: string;
  explanation: string;
}

export interface CommandData {
  name: string;
  title: string;
  description: string;
  syntax: string;
  options: CommandOption[];
  examples: CommandExample[];
}

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  commands: CommandData[];
}

export interface QuickRefCategory {
  title: string;
  commands: { cmd: string; purpose: string }[];
}