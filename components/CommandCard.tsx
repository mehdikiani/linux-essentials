import React, { useState } from 'react';
import { CommandData, AppData } from '../types';
import { Copy, Check, Terminal, List, Play } from 'lucide-react';

interface CommandCardProps {
  command: CommandData;
  ui: AppData['ui'];
  lang: 'en' | 'fa';
}

const CommandCard: React.FC<CommandCardProps> = ({ command, ui, lang }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'options' | 'examples'>('overview');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const isRtl = lang === 'fa';

  return (
    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-none mb-8 transition-all hover:border-gray-200 dark:hover:border-slate-600 group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-mono font-bold text-primary-600 dark:text-primary-500 flex items-center gap-2" dir="ltr">
            <span className="text-purple-400 dark:text-purple-400 select-none">$</span> 
            <span className={isRtl ? 'text-right' : ''}>{command.name}</span>
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">{command.title}</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-slate-900/80 rounded-lg p-1">
          {[
            { id: 'overview', icon: Terminal, label: ui.tabs.syntax },
            { id: 'options', icon: List, label: ui.tabs.options },
            { id: 'examples', icon: Play, label: ui.tabs.examples }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all
                ${activeTab === tab.id 
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-slate-800'}
              `}
            >
              <tab.icon size={14} className={isRtl ? 'ml-1' : ''} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h4 className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-bold mb-2">{ui.labels.desc}</h4>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">{command.description}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-bold mb-2">{ui.labels.syntax}</h4>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 font-mono text-primary-400 shadow-inner" dir="ltr">
                {command.syntax}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'options' && (
          <div className="animate-fadeIn">
            {command.options.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-dark-border">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 dark:bg-slate-800/50">
                    <tr className="border-b border-gray-100 dark:border-dark-border text-gray-500 dark:text-gray-400 text-sm">
                      <th className={`py-3 px-4 w-24 ${isRtl ? 'text-right' : 'text-left'}`}>{ui.labels.flag}</th>
                      <th className={`py-3 px-4 ${isRtl ? 'text-right' : 'text-left'}`}>{ui.labels.desc}</th>
                      <th className={`py-3 px-4 hidden md:table-cell ${isRtl ? 'text-right' : 'text-left'}`}>{ui.labels.example}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {command.options.map((opt, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors last:border-0">
                        <td className="py-4 px-4 font-mono text-purple-600 dark:text-purple-400 font-bold" dir="ltr">{opt.flag}</td>
                        <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                          <div>{opt.description}</div>
                          <div className="text-xs text-gray-400 mt-1 md:hidden" dir="ltr">Ex: {opt.example}</div>
                        </td>
                        <td className="py-4 px-4 font-mono text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell" dir="ltr">{opt.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500 italic">No specific options listed for this basic command.</div>
            )}
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-6 animate-fadeIn">
            {command.examples.map((ex, i) => (
              <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
                <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-300">{ex.title}</span>
                  <button 
                    onClick={() => handleCopy(ex.code)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {copied === ex.code ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="p-4 overflow-x-auto" dir="ltr">
                  <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">{ex.code}</pre>
                </div>
                {ex.output && (
                  <div className="border-t border-slate-700 p-4 bg-black/30" dir="ltr">
                    <div className="text-[10px] text-gray-500 mb-2 uppercase font-bold">{ui.labels.output}</div>
                    <pre className="font-mono text-xs text-gray-400 whitespace-pre-wrap">{ex.output}</pre>
                  </div>
                )}
                <div className="px-4 py-3 bg-slate-800/50 text-sm text-gray-400 border-t border-slate-800">
                  <span className="text-primary-400 font-bold">{ui.labels.note}</span>
                  {ex.explanation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCard;