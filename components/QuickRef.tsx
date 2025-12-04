import React from 'react';
import { QuickRefCategory, AppData } from '../types';

interface QuickRefProps {
  categories: QuickRefCategory[];
  ui: AppData['ui'];
  lang: 'en' | 'fa';
}

const QuickRef: React.FC<QuickRefProps> = ({ categories, ui, lang }) => {
  const isRtl = lang === 'fa';
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{ui.quickRef}</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {ui.quickRefDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-none transition-all duration-300 group">
            <div className="bg-gray-50 dark:bg-slate-800/50 px-4 py-3 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{cat.title}</h3>
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-slate-600 group-hover:bg-primary-500 transition-colors"></div>
            </div>
            <div className="p-0">
              <table className="w-full">
                <tbody>
                  {cat.commands.map((cmd, j) => (
                    <tr key={j} className="border-b border-gray-50 dark:border-dark-border last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className={`py-3 px-4 font-mono text-sm text-purple-600 dark:text-purple-400 font-semibold ${isRtl ? 'text-left' : 'text-left'}`} dir="ltr">{cmd.cmd}</td>
                      <td className={`py-3 px-4 text-sm text-gray-500 dark:text-gray-400 ${isRtl ? 'text-left' : 'text-right'}`}>{cmd.purpose}</td>
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