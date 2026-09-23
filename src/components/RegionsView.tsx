import React from 'react';
import { MapPin, ShieldAlert, Sparkles, Compass, Route } from 'lucide-react';
import { Region } from '../types';

interface RegionsViewProps {
  regions: Region[];
  onSelectOnMap: (regionId: string) => void;
}

export const RegionsView: React.FC<RegionsViewProps> = ({ regions, onSelectOnMap }) => {
  const getDangerColor = (level: number) => {
    if (level <= 3) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', bar: 'bg-emerald-500' };
    if (level <= 6) return { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', bar: 'bg-amber-500' };
    if (level <= 8) return { text: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', bar: 'bg-red-500' };
    return { text: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', bar: 'bg-purple-500' };
  };

  return (
    <div id="regions-view-container" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            World Regions & Territories ({regions.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Geographic zones, biomes, landmark structures, and transit networks across the realm.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {regions.map((region) => {
          const dangerStyle = getDangerColor(region.danger_level);
          return (
            <div
              key={region.id}
              id={`card-region-${region.id}`}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-0.5"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {region.type}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${dangerStyle.bg} ${dangerStyle.text} flex items-center gap-1`}>
                    <ShieldAlert className="w-3 h-3" />
                    Danger {region.danger_level}/10
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {region.name}
                </h3>

                {/* Biome & Coordinates */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {region.biome}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    [X: {region.x}%, Y: {region.y}%]
                  </span>
                </div>

                {/* Danger meter bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-3 border border-slate-800/80">
                  <div
                    className={`h-full rounded-full ${dangerStyle.bar}`}
                    style={{ width: `${(region.danger_level / 10) * 100}%` }}
                  />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-4 mb-4">
                  {region.description}
                </p>

                {/* Landmark Pill */}
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs mb-3 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block text-[11px]">Notable Landmark:</span>
                    <span className="text-slate-300 text-xs">{region.landmark}</span>
                  </div>
                </div>

                {/* Connected routes */}
                {region.connected_to && region.connected_to.length > 0 && (
                  <div className="mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                      Transit Routes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {region.connected_to.map((route) => (
                        <span key={route} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/60 flex items-center gap-1">
                          <Route className="w-2.5 h-2.5 text-slate-400" />
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectOnMap(region.id)}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Locate on 2D Map</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
