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

<<<<<<< HEAD
export interface AppData {
  modules: ModuleData[];
  quickRef: QuickRefCategory[];
  ui: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchResults: string;
    noResults: string;
    quickRef: string;
    quickRefDesc: string;
    modules: string;
    footer: string;
    about: string;
    aboutDesc: string;
    creator: string;
    tabs: {
      syntax: string;
      options: string;
      examples: string;
    };
    labels: {
      desc: string;
      syntax: string;
      flag: string;
      example: string;
      output: string;
      note: string;
    }
  }
}
=======






>>>>>>> cb9d2c7ded7e8da36aea0a0780cede0df23e0468
