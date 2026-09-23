import React from 'react';
import { 
  Compass, 
  MapPin, 
  Users, 
  Skull, 
  Swords, 
  Package, 
  ScrollText, 
  Code2, 
  CloudSun,
  Sparkles
} from 'lucide-react';
import { GameWorld } from '../types';

interface WorldHeroBannerProps {
  world: GameWorld;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenGenerator: () => void;
}

export const WorldHeroBanner: React.FC<WorldHeroBannerProps> = ({
  world,
  activeTab,
  setActiveTab,
  onOpenGenerator
}) => {
  const tabs = [
    { id: 'map', label: '2D Map', icon: Compass, count: world.regions.length },
    { id: 'regions', label: 'Regions', icon: MapPin, count: world.regions.length },
    { id: 'characters', label: 'Characters', icon: Users, count: world.characters.length },
    { id: 'enemies', label: 'Enemies', icon: Skull, count: world.enemies.length },
    { id: 'quests', label: 'Quests', icon: Swords, count: world.quests.length },
    { id: 'items', label: 'Items & Relics', icon: Package, count: world.items.length },
    { id: 'lore', label: 'Lore', icon: ScrollText, count: world.lore.length },
    { id: 'json', label: 'JSON Schema', icon: Code2, count: null },
  ];

  return (
    <div id="world-hero-banner" className="space-y-4">
      {/* Overview Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {world.theme}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {world.size} Scale
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Procedural Cartography Active
              </span>
            </div>

            {/* World Title */}
            <h2 id="world-main-title" className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {world.world_name}
            </h2>

            {/* Main Premise */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {world.description}
            </p>

            {/* Climate & Atmosphere */}
            {world.climate_summary && (
              <div className="flex items-start gap-2 pt-1 text-xs text-slate-400">
                <CloudSun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="italic">{world.climate_summary}</span>
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <button
            onClick={onOpenGenerator}
            className="self-start px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/40 text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Regenerate World</span>
          </button>
        </div>

        {/* Quick stat counters */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Regions</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">{world.regions.length}</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Characters</span>
            <span className="text-sm sm:text-base font-bold text-sky-400 font-mono">{world.characters.length}</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Enemies</span>
            <span className="text-sm sm:text-base font-bold text-red-400 font-mono">{world.enemies.length}</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Quests</span>
            <span className="text-sm sm:text-base font-bold text-amber-400 font-mono">{world.quests.length}</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Relics</span>
            <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">{world.items.length}</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Lore</span>
            <span className="text-sm sm:text-base font-bold text-purple-400 font-mono">{world.lore.length}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-amber-400 text-amber-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
