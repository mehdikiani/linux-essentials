import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CommandCard from './components/CommandCard';
import QuickRef from './components/QuickRef';
import About from './components/About';
import { getAppData } from './data';
import { Search, Menu, Moon, Sun, Languages } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'fa'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // Default to dark for "dev" feel
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load theme from local storage or system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load Data based on language
  const appData = useMemo(() => getAppData(lang), [lang]);
  const { modules, quickRef, ui } = appData;

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'fa' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleModuleSelect = (id: string | null) => {
      setActiveModuleId(id);
      setIsAboutActive(false);
      setSearchQuery('');
  };

  const handleAboutSelect = () => {
      setIsAboutActive(true);
      setActiveModuleId(null);
      setSearchQuery('');
  }

  const isRtl = lang === 'fa';

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
  }, [searchQuery, modules]);

  const activeModule = modules.find(m => m.id === activeModuleId);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-dark-bg to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'}`}>
      <Sidebar 
        modules={modules}
        activeModuleId={activeModuleId}
        onSelectModule={handleModuleSelect}
        onSelectAbout={handleAboutSelect}
        isAboutActive={isAboutActive}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ui={ui}
        lang={lang}
      />

      <div className={`transition-all duration-300 ${isRtl ? 'md:mr-72' : 'md:ml-72'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-border px-4 py-3 sm:px-6 shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <Menu />
              </button>

              <div className="relative flex-1 max-w-lg">
                <div className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${isRtl ? 'right-3' : 'left-3'}`}>
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder={ui.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`
                    w-full bg-gray-100/50 dark:bg-slate-800/50 border-transparent text-gray-900 dark:text-white py-2.5 rounded-xl border focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 outline-none transition-all placeholder:text-gray-400 shadow-inner
                    ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}
                  `}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title={lang === 'en' ? 'Switch to Persian' : 'Switch to English'}
              >
                <Languages size={18} />
                <span className="hidden sm:inline">{lang === 'en' ? 'FA' : 'EN'}</span>
              </button>
              
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)]">
          
          {searchQuery ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {ui.searchResults} ({filteredContent?.length || 0})
              </h2>
              {filteredContent && filteredContent.length > 0 ? (
                filteredContent.map((cmd, idx) => (
                  <div key={idx} className="relative group">
                     <div className={`absolute -top-3 px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[10px] rounded-full uppercase font-bold tracking-wider z-10 shadow-sm ${isRtl ? 'right-4' : 'left-4'}`}>
                       {cmd.moduleTitle.includes(':') ? cmd.moduleTitle.split(':')[1] : cmd.moduleTitle}
                     </div>
                     <CommandCard command={cmd} ui={ui} lang={lang} />
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-lg">{ui.noResults} "{searchQuery}"</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {isAboutActive ? (
                  <About ui={ui} lang={lang} />
              ) : activeModuleId ? (
                <div className="animate-fadeIn">
                  <div className={`mb-8 pl-6 py-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-gray-100 dark:border-dark-border shadow-lg shadow-gray-200/50 dark:shadow-none relative overflow-hidden ${isRtl ? 'border-r-4 border-r-primary-500 border-l-0 pr-6 pl-0' : 'border-l-4 border-l-primary-500'}`}>
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
                    
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 relative z-10">{activeModule?.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg relative z-10">{activeModule?.description}</p>
                  </div>
                  
                  <div className="space-y-8">
                    {activeModule?.commands.map((cmd, idx) => (
                      <CommandCard key={idx} command={cmd} ui={ui} lang={lang} />
                    ))}
                  </div>
                </div>
              ) : (
                <QuickRef categories={quickRef} ui={ui} lang={lang} />
              )}
            </>
          )}

          <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-dark-border text-center text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-2">
                Linux Fundamentals Guide &copy; {new Date().getFullYear()} • 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 font-bold">{ui.footer}</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
