import React from 'react';
import { Swords, User, MapPin, Award, Compass } from 'lucide-react';
import { Quest } from '../types';

interface QuestsViewProps {
  quests: Quest[];
  onSelectRegionName?: (regionName: string) => void;
}

export const QuestsView: React.FC<QuestsViewProps> = ({ quests, onSelectRegionName }) => {
  return (
    <div id="quests-view-container" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-400" />
            Campaign Quests & Missions ({quests.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Plot hooks, expedition bounties, faction intrigues, and relic retrieval assignments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {quests.map((quest, idx) => (
          <div
            key={quest.id}
            id={`card-quest-${quest.id}`}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Quest #{idx + 1}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <User className="w-3 h-3 text-sky-400" />
                  Giver: <span className="text-slate-200 font-medium">{quest.quest_giver}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {quest.title}
              </h3>

              {/* Target Location */}
              <div className="mt-1 mb-3">
                <button
                  type="button"
                  onClick={() => onSelectRegionName && onSelectRegionName(quest.target_region)}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>Objective Destination: {quest.target_region}</span>
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {quest.description}
              </p>
            </div>

            {/* Reward Box */}
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Reward Bounty:</span>
                  <span className="text-xs font-semibold text-slate-100">{quest.reward}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectRegionName && onSelectRegionName(quest.target_region)}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors shrink-0 flex items-center gap-1"
                title="Locate region on 2D map"
              >
                <Compass className="w-3 h-3" />
                <span className="hidden sm:inline">Track</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
