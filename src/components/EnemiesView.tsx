import React from 'react';
import { Skull, MapPin, Zap, Gift, ShieldAlert } from 'lucide-react';
import { Enemy } from '../types';

interface EnemiesViewProps {
  enemies: Enemy[];
  onSelectRegionName?: (regionName: string) => void;
}

export const EnemiesView: React.FC<EnemiesViewProps> = ({ enemies, onSelectRegionName }) => {
  const getDifficultyColor = (diff: number) => {
    if (diff <= 3) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', bar: 'bg-emerald-500' };
    if (diff <= 6) return { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', bar: 'bg-amber-500' };
    if (diff <= 8) return { text: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', bar: 'bg-red-500' };
    return { text: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', bar: 'bg-purple-500' };
  };

  return (
    <div id="enemies-view-container" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-400" />
            Hostile Bestiary & Adversaries ({enemies.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monsters, apex predators, automated warmachines, and rogue factions roaming the territories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {enemies.map((enemy) => {
          const diffStyle = getDifficultyColor(enemy.difficulty);
          return (
            <div
              key={enemy.id}
              id={`card-enemy-${enemy.id}`}
              className="bg-slate-900 border border-slate-800 hover:border-red-950/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-0.5"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {enemy.type}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${diffStyle.bg} ${diffStyle.text} flex items-center gap-1`}>
                    <ShieldAlert className="w-3 h-3" />
                    Tier {enemy.difficulty}/10
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-lg font-bold text-white group-hover:text-red-300 transition-colors">
                  {enemy.name}
                </h3>

                {/* Spawn Region */}
                <div className="mt-1 mb-3">
                  <span 
                    onClick={() => onSelectRegionName && onSelectRegionName(enemy.spawn_region)}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 hover:border-amber-500/40 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>Lair: {enemy.spawn_region}</span>
                  </span>
                </div>

                {/* Difficulty meter bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-3 border border-slate-800/80">
                  <div
                    className={`h-full rounded-full ${diffStyle.bar}`}
                    style={{ width: `${(enemy.difficulty / 10) * 100}%` }}
                  />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {enemy.description}
                </p>

                {/* Tactical Weakness */}
                {enemy.weakness && (
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs mb-2 flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300 block text-[10px] uppercase">Tactical Weakness:</span>
                      <span className="text-slate-300 text-xs">{enemy.weakness}</span>
                    </div>
                  </div>
                )}

                {/* Loot Drop */}
                {enemy.loot && (
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex items-start gap-2">
                    <Gift className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-300 block text-[10px] uppercase">Salvage / Trophy:</span>
                      <span className="text-slate-300 text-xs">{enemy.loot}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
