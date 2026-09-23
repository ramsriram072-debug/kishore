import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  ShieldAlert, 
  Users, 
  Skull, 
  Swords, 
  Layers, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles,
  Mountain,
  Building2,
  TreePine,
  Flame,
  Radio,
  Navigation
} from 'lucide-react';
import { GameWorld, Region } from '../types';

interface Map2DViewerProps {
  world: GameWorld;
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
}

export const Map2DViewer: React.FC<Map2DViewerProps> = ({
  world,
  selectedRegionId,
  onSelectRegion
}) => {
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [fogOfWar, setFogOfWar] = useState<boolean>(false);
  const [revealedRegions, setRevealedRegions] = useState<Set<string>>(new Set());
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // If no region selected, default to the first one
  const activeRegion = world.regions.find((r) => r.id === selectedRegionId) || world.regions[0] || null;

  // Characters in active region
  const regionCharacters = activeRegion 
    ? world.characters.filter((c) => c.region.toLowerCase().includes(activeRegion.name.toLowerCase()) || activeRegion.name.toLowerCase().includes(c.region.toLowerCase()))
    : [];

  // Enemies in active region
  const regionEnemies = activeRegion
    ? world.enemies.filter((e) => e.spawn_region.toLowerCase().includes(activeRegion.name.toLowerCase()) || activeRegion.name.toLowerCase().includes(e.spawn_region.toLowerCase()))
    : [];

  // Quests targeting active region
  const regionQuests = activeRegion
    ? world.quests.filter((q) => q.target_region.toLowerCase().includes(activeRegion.name.toLowerCase()) || activeRegion.name.toLowerCase().includes(q.target_region.toLowerCase()))
    : [];

  const handleRegionClick = (region: Region) => {
    onSelectRegion(region.id);
    if (fogOfWar) {
      setRevealedRegions((prev) => new Set(prev).add(region.id));
    }
  };

  const getDangerColor = (level: number) => {
    if (level <= 3) return { stroke: '#10b981', fill: '#059669', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    if (level <= 6) return { stroke: '#f59e0b', fill: '#d97706', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    if (level <= 8) return { stroke: '#ef4444', fill: '#dc2626', bg: 'bg-red-500/10 text-red-400 border-red-500/30' };
    return { stroke: '#a855f7', fill: '#9333ea', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
  };

  const getBiomeIcon = (type: string, biome: string) => {
    const text = `${type} ${biome}`.toLowerCase();
    if (text.includes('mountain') || text.includes('peak') || text.includes('cliff') || text.includes('crag')) {
      return <Mountain className="w-3.5 h-3.5" />;
    }
    if (text.includes('forest') || text.includes('jungle') || text.includes('wood') || text.includes('tree') || text.includes('canopy')) {
      return <TreePine className="w-3.5 h-3.5" />;
    }
    if (text.includes('city') || text.includes('citadel') || text.includes('spire') || text.includes('metropolis') || text.includes('district') || text.includes('dock')) {
      return <Building2 className="w-3.5 h-3.5" />;
    }
    if (text.includes('volcan') || text.includes('fire') || text.includes('magma') || text.includes('lava') || text.includes('cinder')) {
      return <Flame className="w-3.5 h-3.5" />;
    }
    if (text.includes('cyber') || text.includes('matrix') || text.includes('server') || text.includes('silo') || text.includes('orbital') || text.includes('station')) {
      return <Radio className="w-3.5 h-3.5" />;
    }
    return <Compass className="w-3.5 h-3.5" />;
  };

  return (
    <div id="map-2d-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Map Canvas Card */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Map Toolbar */}
        <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-slate-200 flex items-center gap-1.5 text-sm">
              <Compass className="w-4 h-4 text-amber-400" />
              Cartographic Map
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {world.regions.length} Charted Regions
            </span>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              id="map-toggle-routes"
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                showRoutes ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              title="Toggle connecting transit routes"
            >
              <Layers className="w-3 h-3" />
              <span>Routes</span>
            </button>

            <button
              id="map-toggle-heatmap"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                showHeatmap ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              title="Toggle danger heat radiation"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Danger</span>
            </button>

            <button
              id="map-toggle-markers"
              onClick={() => setShowMarkers(!showMarkers)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                showMarkers ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              title="Toggle Quest and Denizen pins"
            >
              <Users className="w-3 h-3" />
              <span>Denizens</span>
            </button>

            <button
              id="map-toggle-fog"
              onClick={() => setFogOfWar(!fogOfWar)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                fogOfWar ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              title="Toggle Fog of War mode"
            >
              {fogOfWar ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              <span>Fog of War</span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
              <button
                id="map-zoom-in"
                onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                id="map-zoom-out"
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                id="map-zoom-reset"
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SVG Interactive Canvas */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-950 overflow-hidden cursor-crosshair select-none">
          
          {/* Subtle Cartographic Grid Background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
              backgroundSize: '40px 40px, 80px 80px, 80px 80px'
            }}
          />

          {/* Compass Rose Accent */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-20 text-amber-300 hidden sm:block">
            <Navigation className="w-16 h-16 animate-pulse" />
          </div>

          {/* Topographical SVG Element */}
          <svg 
            id="interactive-map-svg"
            viewBox="0 0 1000 650" 
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <defs>
              {/* Radial gradients for danger heatmaps */}
              <radialGradient id="danger-aura-high" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#ef4444" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="danger-aura-extreme" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#a855f7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="danger-aura-mid" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="node-active-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </radialGradient>
              
              {/* Filter for glow */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Trade Routes / Highways */}
            {showRoutes && (
              <g id="map-routes-layer" className="transition-opacity duration-300">
                {world.regions.map((sourceReg) => {
                  const sourceX = (sourceReg.x / 100) * 1000;
                  const sourceY = (sourceReg.y / 100) * 650;

                  return (sourceReg.connected_to || []).map((targetName) => {
                    const targetReg = world.regions.find(
                      (r) => r.name.toLowerCase() === targetName.toLowerCase() || r.id === targetName
                    );
                    if (!targetReg) return null;

                    const targetX = (targetReg.x / 100) * 1000;
                    const targetY = (targetReg.y / 100) * 650;
                    const isLinkedToSelected = selectedRegionId === sourceReg.id || selectedRegionId === targetReg.id;

                    // Curvature offset for natural road aesthetic
                    const midX = (sourceX + targetX) / 2 + (sourceY > targetY ? 20 : -20);
                    const midY = (sourceY + targetY) / 2 + (sourceX > targetX ? -20 : 20);

                    return (
                      <path
                        key={`route-${sourceReg.id}-${targetReg.id}`}
                        d={`M ${sourceX} ${sourceY} Q ${midX} ${midY} ${targetX} ${targetY}`}
                        fill="none"
                        stroke={isLinkedToSelected ? '#f59e0b' : '#475569'}
                        strokeWidth={isLinkedToSelected ? 2.5 : 1.5}
                        strokeDasharray={isLinkedToSelected ? '6 4' : '4 4'}
                        opacity={isLinkedToSelected ? 0.9 : 0.4}
                        className={isLinkedToSelected ? 'animate-pulse' : ''}
                      />
                    );
                  });
                })}
              </g>
            )}

            {/* Danger Heatmap Aura */}
            {showHeatmap && (
              <g id="map-heatmap-layer">
                {world.regions.map((reg) => {
                  const cx = (reg.x / 100) * 1000;
                  const cy = (reg.y / 100) * 650;
                  if (reg.danger_level < 5) return null;

                  const gradientId = reg.danger_level >= 9 
                    ? 'url(#danger-aura-extreme)' 
                    : reg.danger_level >= 7 
                    ? 'url(#danger-aura-high)' 
                    : 'url(#danger-aura-mid)';
                  const radius = 50 + reg.danger_level * 5;

                  return (
                    <circle
                      key={`heat-${reg.id}`}
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={gradientId}
                      className="pointer-events-none animate-pulse"
                      style={{ animationDuration: `${4 - reg.danger_level * 0.2}s` }}
                    />
                  );
                })}
              </g>
            )}

            {/* Region Landmass Polygons / Islands (Thematic shapes) */}
            <g id="map-landmass-layer">
              {world.regions.map((reg) => {
                const cx = (reg.x / 100) * 1000;
                const cy = (reg.y / 100) * 650;
                const isSelected = activeRegion?.id === reg.id;
                const isFogged = fogOfWar && !revealedRegions.has(reg.id) && !isSelected;

                if (isFogged) return null;

                // Generates an organic polygon around the node center
                const radius = isSelected ? 48 : 38;
                const points = [
                  `${cx - radius * 0.9},${cy - radius * 0.3}`,
                  `${cx - radius * 0.4},${cy - radius * 0.85}`,
                  `${cx + radius * 0.5},${cy - radius * 0.75}`,
                  `${cx + radius * 0.95},${cy - radius * 0.2}`,
                  `${cx + radius * 0.75},${cy + radius * 0.75}`,
                  `${cx - radius * 0.2},${cy + radius * 0.9}`,
                  `${cx - radius * 0.8},${cy + radius * 0.5}`,
                ].join(' ');

                return (
                  <polygon
                    key={`land-${reg.id}`}
                    points={points}
                    fill={isSelected ? '#1e293b' : '#0f172a'}
                    stroke={isSelected ? '#f59e0b' : '#334155'}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={isSelected ? 0.9 : 0.6}
                    className="transition-all duration-300"
                  />
                );
              })}
            </g>

            {/* Region Interactive Nodes */}
            <g id="map-nodes-layer">
              {world.regions.map((reg) => {
                const cx = (reg.x / 100) * 1000;
                const cy = (reg.y / 100) * 650;
                const isSelected = activeRegion?.id === reg.id;
                const colors = getDangerColor(reg.danger_level);
                const isFogged = fogOfWar && !revealedRegions.has(reg.id) && !isSelected;

                if (isFogged) {
                  return (
                    <g
                      key={`node-${reg.id}`}
                      onClick={() => handleRegionClick(reg)}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={16}
                        fill="#1e1b4b"
                        stroke="#6366f1"
                        strokeDasharray="3 3"
                        opacity={0.6}
                      />
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        fill="#818cf8"
                        fontSize="10"
                        className="font-mono select-none"
                      >
                        ?
                      </text>
                    </g>
                  );
                }

                return (
                  <g
                    key={`node-${reg.id}`}
                    id={`map-node-${reg.id}`}
                    onClick={() => handleRegionClick(reg)}
                    className="cursor-pointer group"
                  >
                    {/* Selected halo */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={32}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth={1.5}
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: '10s' }}
                      />
                    )}

                    {/* Outer Node Circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 20 : 16}
                      fill={isSelected ? '#0f172a' : '#020617'}
                      stroke={isSelected ? '#38bdf8' : colors.stroke}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200 group-hover:scale-110"
                      style={{ transformOrigin: `${cx}px ${cy}px` }}
                    />

                    {/* Inner Center Dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 7 : 5}
                      fill={isSelected ? '#38bdf8' : colors.stroke}
                    />

                    {/* Danger Rating Badge */}
                    <rect
                      x={cx + 10}
                      y={cy - 22}
                      width={18}
                      height={14}
                      rx={4}
                      fill="#0f172a"
                      stroke={colors.stroke}
                      strokeWidth={1}
                    />
                    <text
                      x={cx + 19}
                      y={cy - 12}
                      textAnchor="middle"
                      fill={colors.stroke}
                      fontSize="9"
                      fontWeight="bold"
                      className="font-mono select-none"
                    >
                      {reg.danger_level}
                    </text>

                    {/* Name Label */}
                    <g transform={`translate(${cx}, ${cy + (isSelected ? 28 : 24)})`}>
                      <rect
                        x="-60"
                        y="-8"
                        width="120"
                        height="18"
                        rx="4"
                        fill="#020617"
                        fillOpacity="0.85"
                        stroke={isSelected ? '#38bdf8' : '#334155'}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="5"
                        textAnchor="middle"
                        fill={isSelected ? '#f8fafc' : '#cbd5e1'}
                        fontSize="10"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        className="select-none tracking-tight font-display"
                      >
                        {reg.name.length > 18 ? `${reg.name.slice(0, 16)}...` : reg.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Extra Markers (NPC / Quest indicators over regions) */}
            {showMarkers && (
              <g id="map-decorations-layer" className="pointer-events-none">
                {world.regions.map((reg) => {
                  const cx = (reg.x / 100) * 1000;
                  const cy = (reg.y / 100) * 650;
                  const hasNpc = world.characters.some((c) => c.region.toLowerCase().includes(reg.name.toLowerCase()));
                  const hasQuest = world.quests.some((q) => q.target_region.toLowerCase().includes(reg.name.toLowerCase()));
                  const hasEnemy = world.enemies.some((e) => e.spawn_region.toLowerCase().includes(reg.name.toLowerCase()));

                  return (
                    <g key={`markers-${reg.id}`} transform={`translate(${cx - 24}, ${cy - 18})`}>
                      {hasQuest && (
                        <circle cx="0" cy="0" r="4" fill="#f59e0b" />
                      )}
                      {hasNpc && (
                        <circle cx="8" cy="0" r="4" fill="#38bdf8" />
                      )}
                      {hasEnemy && (
                        <circle cx="16" cy="0" r="4" fill="#ef4444" />
                      )}
                    </g>
                  );
                })}
              </g>
            )}
          </svg>

          {/* Map Legend (Bottom-Left) */}
          <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1 shadow-lg pointer-events-none hidden sm:block">
            <p className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Threat Scale</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                1-3 Safe
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                4-6 Perilous
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                7-8 Deadly
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                9-10 Calamity
              </span>
            </div>
          </div>

          {/* Map Scale indicator (Bottom-Right) */}
          <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 pointer-events-none">
            Scale: 100 Leagues [Zoom: {Math.round(zoomLevel * 100)}%]
          </div>
        </div>
      </div>

      {/* Region Inspector Sidebar */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
        {activeRegion ? (
          <>
            {/* Header / Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {activeRegion.type}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getDangerColor(activeRegion.danger_level).bg}`}>
                  Danger {activeRegion.danger_level}/10
                </span>
              </div>
              <h3 id="inspector-region-name" className="font-display text-xl font-bold text-white mt-1">
                {activeRegion.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Biome: {activeRegion.biome}</span>
              </p>
            </div>

            {/* Description */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
              {activeRegion.description}
            </div>

            {/* Landmark Box */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300 block">Notable Landmark</span>
                <span className="text-slate-300">{activeRegion.landmark}</span>
              </div>
            </div>

            {/* Connected Transit Routes */}
            {activeRegion.connected_to && activeRegion.connected_to.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Connected Territories ({activeRegion.connected_to.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRegion.connected_to.map((targetName) => {
                    const match = world.regions.find(
                      (r) => r.name.toLowerCase() === targetName.toLowerCase() || r.id === targetName
                    );
                    return (
                      <button
                        key={targetName}
                        onClick={() => match && onSelectRegion(match.id)}
                        className="text-xs px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
                      >
                        <Compass className="w-3 h-3 text-slate-400" />
                        <span>{match ? match.name : targetName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Denizens & Encounters in this Region */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              
              {/* Local Characters */}
              {regionCharacters.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    Residing Characters ({regionCharacters.length})
                  </span>
                  <div className="space-y-1.5">
                    {regionCharacters.map((c) => (
                      <div key={c.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                        <p className="font-semibold text-sky-300">{c.name}</p>
                        <p className="text-[11px] text-slate-400 italic">{c.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Roaming Enemies */}
              {regionEnemies.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Skull className="w-3.5 h-3.5 text-red-400" />
                    Hostile Threats ({regionEnemies.length})
                  </span>
                  <div className="space-y-1.5">
                    {regionEnemies.map((e) => (
                      <div key={e.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-red-300">{e.name}</p>
                          <p className="text-[11px] text-slate-400">{e.type}</p>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-800/40 text-[10px] font-bold">
                          Tier {e.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Quests */}
              {regionQuests.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Swords className="w-3.5 h-3.5 text-amber-400" />
                    Local Quests ({regionQuests.length})
                  </span>
                  <div className="space-y-1.5">
                    {regionQuests.map((q) => (
                      <div key={q.id} className="p-2 rounded-lg bg-amber-950/15 border border-amber-800/30 text-xs">
                        <p className="font-semibold text-amber-300">{q.title}</p>
                        <p className="text-[11px] text-slate-300 truncate mt-0.5">{q.reward}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <Compass className="w-8 h-8 mx-auto mb-2 text-slate-600 animate-spin" />
            <p className="text-sm font-medium">Select any region on the map to inspect details</p>
          </div>
        )}
      </div>

    </div>
  );
};
