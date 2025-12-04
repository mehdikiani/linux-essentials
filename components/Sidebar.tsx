import React from 'react';
import { ModuleData } from '../types';
import { Terminal, BookOpen, Layers, Cpu, Shield, Network, HardDrive, FileText, Hash } from 'lucide-react';

interface SidebarProps {
  modules: ModuleData[];
  activeModuleId: string | null;
  onSelectModule: (id: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, activeModuleId, onSelectModule, isOpen, onClose }) => {
  const getIcon = (index: number) => {
    const icons = [Layers, FileText, BookOpen, Hash, Shield, HardDrive, Cpu, Network];
    const Icon = icons[index] || Terminal;
    return <Icon size={18} />;
  };

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-linux-card border-r border-slate-700 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}
    >
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-linux-accent to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/20">
            LX
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Linux<span className="text-linux-accent">Mastery</span></h1>
        </div>
        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
          ✕
        </button>
      </div>

      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-88px)]">
        <button
          onClick={() => { onSelectModule(null); onClose(); }}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
            ${activeModuleId === null 
              ? 'bg-linux-accent/10 text-linux-accent border border-linux-accent/20' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
          `}
        >
          <Terminal size={18} />
          <span className="font-semibold">Quick Reference</span>
        </button>

        <div className="pt-4 pb-2">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Modules</p>
        </div>

        {modules.map((mod, index) => (
          <button
            key={mod.id}
            onClick={() => { onSelectModule(mod.id); onClose(); }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group
              ${activeModuleId === mod.id 
                ? 'bg-slate-700 text-white shadow-md' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <span className={`${activeModuleId === mod.id ? 'text-linux-accent' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {getIcon(index)}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate w-48">{mod.title.split(':')[1] || mod.title}</span>
              <span className="text-[10px] opacity-60">Module {index + 1}</span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;