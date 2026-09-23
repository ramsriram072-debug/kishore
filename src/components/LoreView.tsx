import React from 'react';
import { ScrollText, BookOpen, Bookmark } from 'lucide-react';
import { LoreEntry } from '../types';

interface LoreViewProps {
  lore: (string | LoreEntry)[];
  worldName: string;
}

export const LoreView: React.FC<LoreViewProps> = ({ lore, worldName }) => {
  return (
    <div id="lore-view-container" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-amber-400" />
            World Chronicles & Lore ({lore.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ancient myths, catastrophic events, societal treaties, and whispered secrets of {worldName}.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {lore.map((entry, index) => {
          const isObj = typeof entry !== 'string';
          const title = isObj ? (entry.title || `Chronicle ${index + 1}`) : `Chronicle ${index + 1}`;
          const text = isObj ? entry.text : entry;

          return (
            <div
              key={index}
              id={`card-lore-${index}`}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-all group"
            >
              {/* Decorative side accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-700 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Bookmark className="w-4 h-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                      Entry 0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
