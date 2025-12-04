import React from 'react';
import { AppData } from '../types';
import { creatorInfo } from '../data';
import { Github, Globe, Linkedin, Mail } from 'lucide-react';

interface AboutProps {
  ui: AppData['ui'];
  lang: 'en' | 'fa';
}

const About: React.FC<AboutProps> = ({ ui, lang }) => {
  const info = lang === 'fa' ? creatorInfo.fa : creatorInfo.en;
  const isRtl = lang === 'fa';

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 mb-6">
          {ui.about}
        </h2>
        <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
                {ui.aboutDesc}
            </p>
            {/* Background decoration */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{ui.creator}</h3>
        
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-1 rounded-2xl shadow-xl">
            <div className="bg-white dark:bg-dark-card rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                 {/* Decorative gradient blob */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-500/5 to-purple-500/5 pointer-events-none"></div>

                <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {info.name.charAt(0)}
                    </div>
                </div>

                <div className="text-center md:text-left flex-1 z-10">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{info.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">Full Stack Developer & Linux Enthusiast</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <a href={`mailto:${info.email}`} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-all duration-300">
                            <Mail size={18} />
                            <span className="text-sm font-medium">Email</span>
                        </a>
                        <a href={info.home} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-300">
                            <Globe size={18} />
                            <span className="text-sm font-medium">Website</span>
                        </a>
                        <a href={info.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 hover:text-black dark:hover:text-white transition-all duration-300">
                            <Github size={18} />
                            <span className="text-sm font-medium">GitHub</span>
                        </a>
                        <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300">
                            <Linkedin size={18} />
                            <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
