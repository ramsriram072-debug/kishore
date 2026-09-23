import React, { useState } from 'react';
import { Sparkles, Dices, RefreshCw, X, ChevronRight, Wand2, ShieldAlert } from 'lucide-react';
import { WorldTheme, WorldSize } from '../types';
import { PRESET_PROMPTS } from '../data/sampleWorlds';

interface WorldCreatorFormProps {
  onGenerate: (theme: string, size: string, description: string) => Promise<void>;
  isGenerating: boolean;
  isOpen: boolean;
  onClose: () => void;
  error?: string | null;
}

const THEMES: { id: WorldTheme; label: string; desc: string }[] = [
  { id: 'Fantasy', label: 'Fantasy', desc: 'Floating archipelagos, arcane ley lines, mythical beasts' },
  { id: 'Sci-Fi', label: 'Sci-Fi', desc: 'Orbital colonies, terraformed moons, plasma dynamos' },
  { id: 'Cyberpunk', label: 'Cyberpunk', desc: 'Megacorporation spires, neon rain, black-market cyberware' },
  { id: 'Horror', label: 'Horror', desc: 'Gothic cathedrals, blood tides, restless spirits' },
  { id: 'Post-Apocalyptic', label: 'Post-Apocalyptic', desc: 'Irradiated deserts, scrap fortresses, mutant warbands' },
  { id: 'Medieval', label: 'Medieval', desc: 'Feudal kingdoms, stone castles, crusader heraldry' },
  { id: 'Steampunk', label: 'Steampunk', desc: 'Brass clockwork, steam-dreadnoughts, smog alleys' },
  { id: 'Solar-punk', label: 'Solar-punk', desc: 'Living arboreal cities, clean energy, symbiotic druids' },
  { id: 'Eldritch', label: 'Eldritch', desc: 'Non-Euclidean ruins, forgotten cosmos deities, sanity fog' }
];

const SIZES: { id: WorldSize; label: string; count: string }[] = [
  { id: 'Small', label: 'Small World', count: '5 Key Regions • Compact & Fast' },
  { id: 'Medium', label: 'Medium Realm', count: '7 Deep Regions • Balanced Gameplay' },
  { id: 'Large', label: 'Large Continent', count: '10 Vast Regions • Epic Campaign' }
];

export const WorldCreatorForm: React.FC<WorldCreatorFormProps> = ({
  onGenerate,
  isGenerating,
  isOpen,
  onClose,
  error
}) => {
  const [theme, setTheme] = useState<string>('Fantasy');
  const [size, setSize] = useState<string>('Medium');
  const [description, setDescription] = useState<string>(
    'A world where humanity lives on floating islands above a dangerous toxic ocean, traveling between cliff cities by gravitite skyships.'
  );

  const handleRandomize = () => {
    const randomPreset = PRESET_PROMPTS[Math.floor(Math.random() * PRESET_PROMPTS.length)];
    setTheme(randomPreset.theme);
    setSize(randomPreset.size);
    setDescription(randomPreset.description);
  };

  const handleApplyPreset = (preset: typeof PRESET_PROMPTS[0]) => {
    setTheme(preset.theme);
    setSize(preset.size);
    setDescription(preset.description);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;
    await onGenerate(theme, size, description);
  };

  if (!isOpen) return null;

  return (
    <div id="modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        id="world-creator-modal" 
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                Generate Game World
              </h2>
              <p className="text-xs text-slate-400">
                AI will architect the map, regions, characters, quests, enemies, items, and lore.
              </p>
            </div>
          </div>
          <button
            id="btn-close-modal"
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Error Message */}
          {error && (
            <div id="generation-error-banner" className="flex items-start gap-3 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">Generation Notice</p>
                <p className="text-slate-300 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Theme Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="theme" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                1. Game Theme
              </label>
              <span className="text-[11px] text-amber-400/90 font-medium">Selected: {theme}</span>
            </div>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              disabled={isGenerating}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all cursor-pointer"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} — {t.desc}
                </option>
              ))}
            </select>

            {/* Quick Theme Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {THEMES.slice(0, 6).map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  disabled={isGenerating}
                  className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                    theme === t.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                      : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* World Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="size" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                2. World Size & Scope
              </label>
              <span className="text-[11px] text-amber-400/90 font-medium">{size}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SIZES.map((s) => (
                <button
                  type="button"
                  id={`size-btn-${s.id.toLowerCase()}`}
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  disabled={isGenerating}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    size === s.id
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-sm shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <p className={`text-sm font-semibold ${size === s.id ? 'text-amber-300' : 'text-slate-200'}`}>
                    {s.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {s.count}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Description & World Premise */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                3. Describe Your World & Vision
              </label>
              <button
                type="button"
                id="btn-random-premise"
                onClick={handleRandomize}
                disabled={isGenerating}
                className="flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Roll Random Premise</span>
              </button>
            </div>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isGenerating}
              placeholder="Example: A world where humanity lives on floating islands above a dangerous ocean..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-slate-600 resize-none leading-relaxed"
            />

            {/* Inspirational Preset Chips */}
            <div className="mt-3">
              <span className="text-[11px] text-slate-400 font-medium block mb-1.5">
                Inspirational Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PROMPTS.map((p) => (
                  <button
                    type="button"
                    key={p.title}
                    onClick={() => handleApplyPreset(p)}
                    disabled={isGenerating}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-amber-200 border border-slate-800/90 transition-all flex items-center gap-1 group"
                  >
                    <span>{p.title}</span>
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="btn-submit-generate"
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing World & Map...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>✨ Generate World</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
