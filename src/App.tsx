import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WorldHeroBanner } from './components/WorldHeroBanner';
import { WorldCreatorForm } from './components/WorldCreatorForm';
import { Map2DViewer } from './components/Map2DViewer';
import { RegionsView } from './components/RegionsView';
import { CharactersView } from './components/CharactersView';
import { EnemiesView } from './components/EnemiesView';
import { QuestsView } from './components/QuestsView';
import { ItemsView } from './components/ItemsView';
import { LoreView } from './components/LoreView';
import { JsonViewer } from './components/JsonViewer';
import { SAMPLE_WORLDS } from './data/sampleWorlds';
import { GameWorld } from './types';
import { Sparkles, History, Compass, ArrowRight } from 'lucide-react';

export default function App() {
  const [world, setWorld] = useState<GameWorld>(() => {
    try {
      const saved = localStorage.getItem('worldforge_active_world');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return SAMPLE_WORLDS[0];
  });

  const [activeTab, setActiveTab] = useState<string>('map');
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [worldHistory, setWorldHistory] = useState<GameWorld[]>(() => {
    try {
      const saved = localStorage.getItem('worldforge_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return SAMPLE_WORLDS;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('worldforge_active_world', JSON.stringify(world));
    } catch (e) {
      // ignore
    }
  }, [world]);

  const handleGenerate = async (theme: string, size: string, description: string) => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, size, description })
      });

      const data = await res.json();

      if (!data.success || !data.world) {
        throw new Error(data.error || 'Failed to generate world');
      }

      setWorld(data.world);
      setSelectedRegionId(data.world.regions[0]?.id || null);
      setActiveTab('map');
      setIsCreatorOpen(false);

      // Add to history
      setWorldHistory((prev) => {
        const updated = [data.world, ...prev.filter((w) => w.world_name !== data.world.world_name)].slice(0, 10);
        try {
          localStorage.setItem('worldforge_history', JSON.stringify(updated));
        } catch (e) {
          // ignore
        }
        return updated;
      });
    } catch (err: any) {
      console.error('World generation failed:', err);
      setGenerationError(err.message || 'Error communicating with generation engine.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectSample = (sample: GameWorld) => {
    setWorld(sample);
    setSelectedRegionId(sample.regions[0]?.id || null);
    setActiveTab('map');
  };

  const handleSelectRegionOnMap = (regionId: string) => {
    setSelectedRegionId(regionId);
    setActiveTab('map');
  };

  const handleSelectRegionByName = (regionName: string) => {
    const match = world.regions.find(
      (r) => r.name.toLowerCase().includes(regionName.toLowerCase()) || regionName.toLowerCase().includes(r.name.toLowerCase())
    );
    if (match) {
      setSelectedRegionId(match.id);
      setActiveTab('map');
    }
  };

  return (
    <div id="ai-game-world-generator-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation Header */}
      <Header
        currentWorld={world}
        onSelectSample={handleSelectSample}
        onOpenGenerator={() => setIsCreatorOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isGenerating={isGenerating}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* World Hero Banner with Stats and Tabs */}
        <WorldHeroBanner
          world={world}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenGenerator={() => setIsCreatorOpen(true)}
        />

        {/* Tab Views */}
        <section id="world-content-viewport" className="min-h-[500px]">
          {activeTab === 'map' && (
            <Map2DViewer
              world={world}
              selectedRegionId={selectedRegionId}
              onSelectRegion={setSelectedRegionId}
            />
          )}

          {activeTab === 'regions' && (
            <RegionsView
              regions={world.regions}
              onSelectOnMap={handleSelectRegionOnMap}
            />
          )}

          {activeTab === 'characters' && (
            <CharactersView
              characters={world.characters}
              onSelectRegionName={handleSelectRegionByName}
            />
          )}

          {activeTab === 'enemies' && (
            <EnemiesView
              enemies={world.enemies}
              onSelectRegionName={handleSelectRegionByName}
            />
          )}

          {activeTab === 'quests' && (
            <QuestsView
              quests={world.quests}
              onSelectRegionName={handleSelectRegionByName}
            />
          )}

          {activeTab === 'items' && (
            <ItemsView items={world.items} />
          )}

          {activeTab === 'lore' && (
            <LoreView lore={world.lore} worldName={world.world_name} />
          )}

          {activeTab === 'json' && (
            <JsonViewer
              world={world}
              onImportWorld={(imported) => {
                setWorld(imported);
                setSelectedRegionId(imported.regions[0]?.id || null);
                setActiveTab('map');
              }}
            />
          )}
        </section>

        {/* History / Vault Drawer */}
        {worldHistory.length > 1 && (
          <aside className="border-t border-slate-800/80 pt-6 mt-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-400" />
                World Archive ({worldHistory.length})
              </span>
              <button
                onClick={() => setIsCreatorOpen(true)}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <span>Generate New</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {worldHistory.map((item) => (
                <div
                  key={item.world_name}
                  onClick={() => handleSelectSample(item)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    world.world_name === item.world_name
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {item.theme}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.regions.length} regions
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-white truncate">
                    {item.world_name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        )}

      </main>

      {/* World Creator Modal */}
      <WorldCreatorForm
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        error={generationError}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© WorldForge AI — AI Game World & Cartography Engine</p>
          <p className="text-[11px] text-slate-600">Exportable to JSON, Markdown, Godot & Unity workflows</p>
        </div>
      </footer>

    </div>
  );
}
