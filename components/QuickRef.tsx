import React from 'react';
import { QuickRefCategory } from '../types';

interface QuickRefProps {
  categories: QuickRefCategory[];
}

const QuickRef: React.FC<QuickRefProps> = ({ categories }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Quick Reference Card</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Rapid access to essential Linux commands. Perfect for brushing up your memory or quick lookups during work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-linux-card border border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-linux-accent/5 transition-all duration-300 group">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-white group-hover:text-linux-accent transition-colors">{cat.title}</h3>
              <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-linux-accent transition-colors"></div>
            </div>
            <div className="p-0">
              <table className="w-full">
                <tbody>
                  {cat.commands.map((cmd, j) => (
                    <tr key={j} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-mono text-sm text-linux-secondary font-semibold">{cmd.cmd}</td>
                      <td className="py-3 px-4 text-sm text-slate-400 text-right">{cmd.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickRef;