import React from 'react';
import { ModuleData } from '../types';
import { Terminal, BookOpen, Layers, Cpu, Shield, Network, HardDrive, FileText, Hash, Info } from 'lucide-react';

interface SidebarProps {
  modules: ModuleData[];
  activeModuleId: string | null;
  onSelectModule: (id: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
  onSelectAbout: () => void;
  isAboutActive: boolean;
  ui: any;
  lang: 'en' | 'fa';
}

const Sidebar: React.FC<SidebarProps> = ({ 
  modules, 
  activeModuleId, 
  onSelectModule, 
  isOpen, 
  onClose, 
  onSelectAbout,
  isAboutActive,
  ui, 
  lang 
}) => {
  const getIcon = (index: number) => {
    const icons = [Layers, FileText, BookOpen, Hash, Shield, HardDrive, Cpu, Network];
    const Icon = icons[index] || Terminal;
    return <Icon size={18} />;
  };

  const isRtl = lang === 'fa';

  return (
    <aside 
      className={`
        fixed inset-y-0 z-40 w-72 bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl border-r dark:border-dark-border border-gray-200 transform transition-all duration-300 ease-in-out shadow-2xl
        ${isRtl ? 'right-0 border-l border-r-0' : 'left-0 border-r'} 
        ${isOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')} md:translate-x-0
      `}
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
            LX
          </div>
          <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Linux<span className="text-primary-600 dark:text-primary-500">Mastery</span>
          </h1>
        </div>
        <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-900 dark:hover:text-white">
          ✕
        </button>
      </div>

      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-88px)]">
        <button
          onClick={() => { onSelectModule(null); onClose(); }}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
            ${activeModuleId === null && !isAboutActive
              ? 'bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-500/10 dark:to-indigo-500/10 text-primary-700 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'}
          `}
        >
          <Terminal size={18} />
          <span className="font-semibold">{ui.quickRef}</span>
        </button>

        <button
          onClick={() => { onSelectAbout(); onClose(); }}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
            ${isAboutActive
              ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-500/20 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'}
          `}
        >
          <Info size={18} />
          <span className="font-semibold">{ui.about}</span>
        </button>

        <div className="pt-6 pb-2">
          <p className="px-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{ui.modules}</p>
        </div>

        {modules.map((mod, index) => (
          <button
            key={mod.id}
            onClick={() => { onSelectModule(mod.id); onClose(); }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left group border border-transparent
              ${activeModuleId === mod.id 
                ? 'bg-gradient-to-r from-gray-900 to-slate-800 dark:from-slate-700 dark:to-slate-800 text-white shadow-lg shadow-gray-200/50 dark:shadow-none border-gray-800 dark:border-slate-600' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'}
            `}
          >
            <span className={`${activeModuleId === mod.id ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}>
              {getIcon(index)}
            </span>
            <div className="flex flex-col">
              <span className={`text-sm font-semibold truncate ${isRtl ? 'pl-2' : 'w-48'}`}>
                {mod.title.includes(':') ? mod.title.split(':')[1] : mod.title}
              </span>
              <span className="text-[10px] opacity-60">Module {index + 1}</span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
