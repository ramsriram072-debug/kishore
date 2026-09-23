import React, { useState } from 'react';
import { Package, Sparkles, MapPin, Filter } from 'lucide-react';
import { Item } from '../types';

interface ItemsViewProps {
  items: Item[];
}

export const ItemsView: React.FC<ItemsViewProps> = ({ items }) => {
  const [selectedRarity, setSelectedRarity] = useState<string>('All');

  const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Artifact'];

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case 'Artifact':
        return { text: 'text-amber-300', bg: 'bg-amber-500/15 border-amber-500/40', glow: 'shadow-amber-500/10' };
      case 'Legendary':
        return { text: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/40', glow: 'shadow-orange-500/10' };
      case 'Epic':
        return { text: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/40', glow: 'shadow-purple-500/10' };
      case 'Rare':
        return { text: 'text-sky-400', bg: 'bg-sky-500/15 border-sky-500/40', glow: 'shadow-sky-500/10' };
      case 'Uncommon':
        return { text: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/40', glow: 'shadow-emerald-500/10' };
      default:
        return { text: 'text-slate-300', bg: 'bg-slate-800 border-slate-700', glow: '' };
    }
  };

  const filteredItems = selectedRarity === 'All'
    ? items
    : items.filter((it) => it.rarity.toLowerCase() === selectedRarity.toLowerCase());

  return (
    <div id="items-view-container" className="space-y-6">
      {/* Header and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            Artifacts, Weapons & Relics ({items.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ancient armaments, consumable elixirs, cybernetic mods, and legendary relics.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {rarities.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRarity(r)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedRarity === r
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const style = getRarityStyle(item.rarity);
          return (
            <div
              key={item.id}
              id={`card-item-${item.id}`}
              className={`bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-0.5 ${style.glow}`}
            >
              <div>
                {/* Badge row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.bg} ${style.text}`}>
                    {item.rarity}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {item.type}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h3>

                {/* Origin Region */}
                {item.origin_region && (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 mb-2.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>Origin: {item.origin_region}</span>
                  </p>
                )}

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-amber-400/80">
                  <Sparkles className="w-3 h-3" />
                  <span>Unique Relic</span>
                </span>
                <span className="font-mono text-[10px]">{item.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
