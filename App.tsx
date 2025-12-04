import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CommandCard from './components/CommandCard';
import QuickRef from './components/QuickRef';
import { modules, quickRef } from './data';
import { Search, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter logic
  const filteredContent = useMemo(() => {
    if (!searchQuery) return null;
    const query = searchQuery.toLowerCase();
    
    // Flatten all commands for search
    const allCommands = modules.flatMap(m => m.commands.map(c => ({...c, moduleId: m.id, moduleTitle: m.title})));
    
    return allCommands.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const activeModule = modules.find(m => m.id === activeModuleId);

  return (
    <div className="min-h-screen bg-linux-dark text-linux-text font-sans selection:bg-linux-accent selection:text-black">
      <Sidebar 
        modules={modules}
        activeModuleId={activeModuleId}
        onSelectModule={(id) => { setActiveModuleId(id); setSearchQuery(''); }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="md:ml-72 transition-all duration-300">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-linux-dark/90 backdrop-blur-md border-b border-slate-800 p-4">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white p-2 rounded-md hover:bg-slate-800"
            >
              <Menu />
            </button>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search commands (e.g., 'grep', 'permissions')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-linux-accent focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto p-4 md:p-8">
          
          {searchQuery ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Search Results ({filteredContent?.length || 0})
              </h2>
              {filteredContent && filteredContent.length > 0 ? (
                filteredContent.map((cmd, idx) => (
                  <div key={idx} className="relative">
                     <div className="absolute -top-3 left-4 px-2 py-0.5 bg-linux-secondary text-white text-[10px] rounded uppercase font-bold tracking-wider z-10">
                       {cmd.moduleTitle}
                     </div>
                     <CommandCard command={cmd} />
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-500">
                  <p className="text-lg">No commands found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {activeModuleId ? (
                <div className="animate-fadeIn">
                  <div className="mb-8 border-l-4 border-linux-accent pl-6 py-2 bg-gradient-to-r from-linux-accent/10 to-transparent rounded-r-xl">
                    <h2 className="text-3xl font-bold text-white">{activeModule?.title}</h2>
                    <p className="text-slate-400 mt-2 text-lg">{activeModule?.description}</p>
                  </div>
                  
                  <div className="space-y-8">
                    {activeModule?.commands.map((cmd, idx) => (
                      <CommandCard key={idx} command={cmd} />
                    ))}
                  </div>
                </div>
              ) : (
                <QuickRef categories={quickRef} />
              )}
            </>
          )}

          <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
            <p>Linux Fundamentals Guide &copy; {new Date().getFullYear()} • Built for Mastery</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;