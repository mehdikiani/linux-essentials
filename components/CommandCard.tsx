import React, { useState } from 'react';
import { CommandData } from '../types';
import { Copy, Check, Terminal, List, Play } from 'lucide-react';

const CommandCard: React.FC<{ command: CommandData }> = ({ command }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'options' | 'examples'>('overview');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-linux-card border border-slate-700 rounded-xl overflow-hidden shadow-xl mb-8 transition-all hover:border-slate-600">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-mono font-bold text-linux-accent flex items-center gap-2">
            <span className="text-linux-secondary">$</span> {command.name}
          </h3>
          <p className="text-slate-400 mt-1">{command.title}</p>
        </div>
        <div className="flex bg-slate-900 rounded-lg p-1">
          {[
            { id: 'overview', icon: Terminal, label: 'Syntax' },
            { id: 'options', icon: List, label: 'Options' },
            { id: 'examples', icon: Play, label: 'Examples' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${activeTab === tab.id 
                  ? 'bg-slate-700 text-white shadow' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'}
              `}
            >
              <tab.icon size={14} />
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
              <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-2">Description</h4>
              <p className="text-lg text-slate-200 leading-relaxed">{command.description}</p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-2">Syntax</h4>
              <div className="bg-black/50 border border-slate-700 rounded-lg p-4 font-mono text-linux-accent">
                {command.syntax}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'options' && (
          <div className="animate-fadeIn">
            {command.options.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-sm">
                      <th className="py-3 px-4 w-24">Flag</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 hidden md:table-cell">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {command.options.map((opt, i) => (
                      <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-4 font-mono text-linux-secondary font-bold">{opt.flag}</td>
                        <td className="py-4 px-4 text-slate-300">
                          <div>{opt.description}</div>
                          <div className="text-xs text-slate-500 mt-1 md:hidden">Ex: {opt.example}</div>
                        </td>
                        <td className="py-4 px-4 font-mono text-sm text-slate-400 hidden md:table-cell">{opt.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 italic">No specific options listed for this basic command.</div>
            )}
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-6 animate-fadeIn">
            {command.examples.map((ex, i) => (
              <div key={i} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-300">{ex.title}</span>
                  <button 
                    onClick={() => handleCopy(ex.code)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    {copied === ex.code ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">{ex.code}</pre>
                </div>
                {ex.output && (
                  <div className="border-t border-slate-800 p-4 bg-black/20">
                    <div className="text-xs text-slate-500 mb-2 uppercase font-bold">Output Preview</div>
                    <pre className="font-mono text-xs text-slate-400 whitespace-pre-wrap">{ex.output}</pre>
                  </div>
                )}
                <div className="px-4 py-3 bg-slate-800/50 text-sm text-slate-400 border-t border-slate-800">
                  <span className="text-blue-400 font-bold">Note: </span>
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