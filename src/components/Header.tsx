import React from 'react';
import { Compass, Sparkles, Download, FileText, Code2, Globe2, Printer } from 'lucide-react';
import { GameWorld } from '../types';
import { downloadJsonFile, downloadMarkdownFile, downloadPdfFile } from '../utils/exportUtils';
import { SAMPLE_WORLDS } from '../data/sampleWorlds';

interface HeaderProps {
  currentWorld: GameWorld;
  onSelectSample: (world: GameWorld) => void;
  onOpenGenerator: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isGenerating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentWorld,
  onSelectSample,
  onOpenGenerator,
  activeTab,
  setActiveTab,
  isGenerating
}) => {
  return (
    <header id="app-header" className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/10 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 id="header-brand-title" className="font-display text-lg sm:text-xl font-bold tracking-wide text-white">
                WorldForge AI
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Game World Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              Active: <span className="text-slate-200 font-medium">{currentWorld.world_name}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Preset switch dropdown */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 mr-2">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Presets:</span>
            {SAMPLE_WORLDS.map((sw) => (
              <button
                key={sw.world_name}
                id={`btn-preset-${sw.theme.toLowerCase()}`}
                onClick={() => onSelectSample(sw)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  currentWorld.world_name === sw.world_name
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                {sw.theme}
              </button>
            ))}
          </div>

          {/* Quick Generate Trigger */}
          <button
            id="header-create-world-btn"
            onClick={onOpenGenerator}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">New World</span>
            <span className="sm:hidden">Create</span>
          </button>

          {/* Download Menu */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2 sm:pl-3">
            <button
              id="header-export-pdf-btn"
              onClick={() => downloadPdfFile(currentWorld)}
              title="Download world as printable PDF report"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 border border-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="header-export-json-btn"
              onClick={() => downloadJsonFile(currentWorld)}
              title="Download world as JSON"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              id="header-export-md-btn"
              onClick={() => downloadMarkdownFile(currentWorld)}
              title="Download world as Markdown GDD"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors hidden sm:block"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              id="header-view-json-btn"
              onClick={() => setActiveTab('json')}
              title="View Raw JSON"
              className={`p-2 rounded-lg border transition-colors ${
                activeTab === 'json'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              <Code2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
