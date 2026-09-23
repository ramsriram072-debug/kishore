import React from 'react';
import { Users, MapPin, Smile, BookOpen } from 'lucide-react';
import { Character } from '../types';

interface CharactersViewProps {
  characters: Character[];
  onSelectRegionName?: (regionName: string) => void;
}

export const CharactersView: React.FC<CharactersViewProps> = ({ characters, onSelectRegionName }) => {
  return (
    <div id="characters-view-container" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Key Characters & Factions ({characters.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Influential leaders, outlaws, scholars, and mercenaries driving the world’s politics and lore.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {characters.map((char) => {
          const initials = char.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2);

          return (
            <div
              key={char.id}
              id={`card-character-${char.id}`}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-0.5"
            >
              <div>
                {/* Character Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-display font-bold text-sm shrink-0">
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {char.name}
                    </h3>
                    <p className="text-xs font-medium text-amber-400/90 mt-0.5">
                      {char.role}
                    </p>
                  </div>
                </div>

                {/* Region Tag */}
                <div className="mb-3">
                  <span 
                    onClick={() => onSelectRegionName && onSelectRegionName(char.region)}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Stationed: {char.region}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {char.description}
                </p>

                {/* Personality Quote */}
                {char.personality && (
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs flex items-start gap-2">
                    <Smile className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-slate-500 block">Disposition:</span>
                      <span className="text-slate-300 italic">{char.personality}</span>
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
