import { GameWorld, Region, Character, Enemy, Quest, Item, LoreEntry } from '../src/types';

export function generateProceduralWorld(theme: string = 'Fantasy', size: string = 'Medium', userDesc: string = ''): GameWorld {
  const normTheme = theme.toLowerCase();
  const regionCount = size === 'Small' ? 5 : size === 'Large' ? 10 : 7;
  
  // Theme-specific templates
  const themeNouns = normTheme.includes('sci-fi') 
    ? { title: 'Aethelgard Prime', realm: 'Sector', cap: 'Orbital Nexus', wild: 'Ion Wastes', tech: 'Plasma Coil' }
    : normTheme.includes('cyber') 
    ? { title: 'Neo-Sintra Megalopolis', realm: 'Sub-Grid', cap: 'High-Orbit Apex', wild: 'Slag Alley', tech: 'Cyberdeck' }
    : normTheme.includes('horror') || normTheme.includes('eldritch')
    ? { title: 'Malcorath: The Bleeding Realm', realm: 'Domain', cap: 'The Black Cathedral', wild: 'Ash Marshes', tech: 'Cursed Relic' }
    : normTheme.includes('post-apoc')
    ? { title: 'Cinderfall Wastes', realm: 'Zone', cap: 'Haven Citadel', wild: 'Radiation Crater', tech: 'Scrap Engine' }
    : normTheme.includes('steampunk')
    ? { title: 'Vaporhaven & The Iron Climes', realm: 'Foundry', cap: 'The Great Cog Spire', wild: 'Soot Marsh', tech: 'Pneumatic Drill' }
    : { title: 'Eldoria: The Shattered Realm', realm: 'Kingdom', cap: 'Sunstone Citadel', wild: 'Whispering Wilds', tech: 'Aether Crystal' };

  const worldName = userDesc.length > 5 && userDesc.split(' ').length <= 4
    ? userDesc.trim()
    : `${themeNouns.title}`;

  // Generate regions distributed across coordinate space (15% to 85%)
  const regionTemplates = [
    { name: `${themeNouns.cap}`, type: 'Metropolitan Core', biome: 'Urban/Citadel', danger: 2, landmark: 'The Sovereign Spire' },
    { name: `The North ${themeNouns.realm} Ridges`, type: 'Highland Frontier', biome: 'Tundra / Crags', danger: 4, landmark: 'Watchtower of the Frost' },
    { name: `Emerald Veridion Basin`, type: 'Dense Wilds', biome: 'Ancient Canopy', danger: 5, landmark: 'The Mother Tree Root' },
    { name: `The Rust & Obsidian Canyons`, type: 'Badlands', biome: 'Fractured Gorge', danger: 6, landmark: 'The Echo Chasm' },
    { name: `${themeNouns.wild}`, type: 'Hazardous Waste', biome: 'Volcanic / Toxic Marsh', danger: 8, landmark: 'Fallen Leviathan Bones' },
    { name: `The Sunken Deep Port`, type: 'Coastal Haven', biome: 'Tidal Estuary', danger: 3, landmark: 'The Lighthouse of Tides' },
    { name: `The Forbidden Core Perimeter`, type: 'Quarantine Zone', biome: 'Dimensional Breach', danger: 10, landmark: 'The Event Horizon Arch' },
    { name: `Sky-Reach Plateau`, type: 'Floating Spires', biome: 'Misty Peaks', danger: 7, landmark: 'Solar Observatory' },
    { name: `Underground Machine Warrens`, type: 'Subterranean Vault', biome: 'Caverns', danger: 8, landmark: 'The Great Piston Core' },
    { name: `The Whispering Dunes`, type: 'Crystal Desert', biome: 'Glass Sands', danger: 6, landmark: 'Obelisk of the Lost Eclipse' }
  ];

  const regions: Region[] = [];
  const count = Math.min(regionCount, regionTemplates.length);

  // Position nodes radially or in distributed organic pockets
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    const radius = 25 + (i % 2 === 0 ? 10 : -8);
    const x = Math.round(50 + radius * Math.cos(angle));
    const y = Math.round(50 + radius * Math.sin(angle));
    const tmpl = regionTemplates[i];

    regions.push({
      id: `reg-${i + 1}`,
      name: tmpl.name,
      type: tmpl.type,
      description: `A distinct domain within ${worldName}, known for its ${tmpl.biome.toLowerCase()} terrain and strategic prominence.`,
      danger_level: tmpl.danger,
      x: Math.max(15, Math.min(85, x)),
      y: Math.max(15, Math.min(85, y)),
      biome: tmpl.biome,
      landmark: tmpl.landmark,
      connected_to: []
    });
  }

  // Connect adjacent regions
  for (let i = 0; i < regions.length; i++) {
    const next = regions[(i + 1) % regions.length].name;
    const prev = regions[(i - 1 + regions.length) % regions.length].name;
    regions[i].connected_to = [next, prev];
    if (regions.length > 5 && i % 2 === 0) {
      const cross = regions[(i + 3) % regions.length].name;
      regions[i].connected_to.push(cross);
    }
  }

  const characters: Character[] = [
    {
      id: 'char-1',
      name: 'Grand Overseer Julian Vance',
      role: 'Head of Governance',
      description: 'A weathered statesman who balances fragile faction treaties against rising regional insurgencies.',
      region: regions[0].name,
      personality: 'Diplomatic, weary, but resolute.'
    },
    {
      id: 'char-2',
      name: 'Lyra Swiftstrike',
      role: 'Master Ranger & Scout',
      description: 'Guides expeditions through the uncharted frontiers; knows every hidden passage and predator patrol pattern.',
      region: regions[1 % regions.length].name,
      personality: 'Observant, laconic, speaks with sharp dry humor.'
    },
    {
      id: 'char-3',
      name: 'Scholar Theresa Drake',
      role: 'Keeper of Ancient Codices',
      description: 'Deciphering the forbidden texts and ancient relic energy circuits left by the world’s progenitor creators.',
      region: regions[2 % regions.length].name,
      personality: 'Curious, obsessive, easily distracted by ancient relics.'
    },
    {
      id: 'char-4',
      name: 'Captain Korg "Ironjaw"',
      role: 'Mercenary Guildmaster',
      description: 'A heavily armored combat veteran whose mercenary company sells security to the highest bidding merchant caravan.',
      region: regions[3 % regions.length].name,
      personality: 'Blunt, unyielding, fiercely loyal to paid contracts.'
    },
    {
      id: 'char-5',
      name: 'The Nameless Exile',
      role: 'Rogue Mystic / Saboteur',
      description: 'Cast out from the high council for uncovering classified secrets regarding the core cataclysm.',
      region: regions[4 % regions.length].name,
      personality: 'Secretive, intense, seeking redemption or retribution.'
    }
  ];

  const enemies: Enemy[] = [
    {
      id: 'enem-1',
      name: 'Rift-Touched Stalker',
      type: 'Aberration',
      description: 'Predatory hunters corrupted by volatile ambient anomaly radiation, phase-shifting between physical planes.',
      difficulty: 6,
      spawn_region: regions[4 % regions.length].name,
      weakness: 'Resonant sound bursts and bright radiant flares.',
      loot: 'Phase Chitin, Radiant Essence'
    },
    {
      id: 'enem-2',
      name: 'Iron Marauder Dreadnought',
      type: 'Armored Raider',
      description: 'A towering mechanized marauder brandishing heavy rotary siege ballistas and explosive scrap cannons.',
      difficulty: 8,
      spawn_region: regions[3 % regions.length].name,
      weakness: 'Hydraulic joint cables and rear exhaust ventilation ports.',
      loot: 'Tempered Carbon Core, Heavy Siege Plating'
    },
    {
      id: 'enem-3',
      name: 'Grave-Bog Wyrm',
      type: 'Colossal Serpent',
      description: 'Subterranean venomous behemoth that burrows through the silt to drag entire caravans beneath the mire.',
      difficulty: 7,
      spawn_region: regions[1 % regions.length].name,
      weakness: 'Piercing attacks to its ventral sensory gills.',
      loot: 'Wyrm Bile Flask, Diamond Tooth'
    },
    {
      id: 'enem-4',
      name: 'Automaton Sentinel Warden',
      type: 'Ancient Construct',
      description: 'Dormant defense guardian awakened by trespassers, wielding focused beam lasers and hardlight bucklers.',
      difficulty: 9,
      spawn_region: regions[6 % regions.length]?.name || regions[0].name,
      weakness: 'High-voltage electric grounding surges.',
      loot: 'Pristine Logic Processor, Prismatic Power Cell'
    },
    {
      id: 'enem-5',
      name: 'Carrion Shadow Harrier',
      type: 'Winged Beast',
      description: 'Flocks of razor-beaked avian predators that dive at high velocity using thermal winds.',
      difficulty: 4,
      spawn_region: regions[2 % regions.length].name,
      weakness: 'Netted projectiles and fire arrows.',
      loot: 'Razor Feather, Harrier Talon'
    }
  ];

  const quests: Quest[] = [
    {
      id: 'qst-1',
      title: 'Echoes of the Progenitor Beacon',
      description: `Locate and activate the three harmonic relay pylons in ${regions[1 % regions.length].name} before the anomaly storm reaches critical threshold.`,
      reward: '3,000 Gold / Credits, Explorer Compass of the Winds',
      quest_giver: 'Scholar Theresa Drake',
      target_region: regions[1 % regions.length].name
    },
    {
      id: 'qst-2',
      title: 'The Siege of Iron Canyon',
      description: `Intercept and dismantle the Iron Marauder Dreadnought caravan threatening supply routes into ${regions[0].name}.`,
      reward: 'Masterwork Ballistic Armor, Citadel Merit Badge',
      quest_giver: 'Grand Overseer Julian Vance',
      target_region: regions[3 % regions.length].name
    },
    {
      id: 'qst-3',
      title: 'Tears of the Sunken Grotto',
      description: 'Dive into the submerged crypts of the coastal region to retrieve the legendary Pearl of Luminescence.',
      reward: 'Underwater Breathing Talisman, 2,200 XP',
      quest_giver: 'The Nameless Exile',
      target_region: regions[5 % regions.length]?.name || regions[0].name
    },
    {
      id: 'qst-4',
      title: 'Shadows in the Canopy',
      description: 'Hunt down the Alpha Rift-Touched Stalker terrorizing foraging camps in the borderlands.',
      reward: 'Predator Stealth Cloak, 4,500 Bounty',
      quest_giver: 'Lyra Swiftstrike',
      target_region: regions[4 % regions.length].name
    },
    {
      id: 'qst-5',
      title: 'The Forgotten Core Protocol',
      description: 'Breach the security vault inside the deepest hazard zone and download the world foundation schematics.',
      reward: 'Progenitor Master Key, Title of Worldwalker',
      quest_giver: 'Captain Korg "Ironjaw"',
      target_region: regions[regions.length - 1].name
    }
  ];

  const items: Item[] = [
    {
      id: 'itm-1',
      name: 'Progenitor Resonance Blade',
      type: 'One-Handed Weapon',
      description: 'A forged alloy blade vibrating at molecular frequencies, cleanly severing dense armor and shields.',
      rarity: 'Legendary',
      origin_region: regions[0].name
    },
    {
      id: 'itm-2',
      name: 'Aegis of the Vanguard',
      type: 'Heavy Shield',
      description: 'Infused with kinetic absorption capacitors that convert incoming projectile force into concussive counter-blasts.',
      rarity: 'Epic',
      origin_region: regions[3 % regions.length].name
    },
    {
      id: 'itm-3',
      name: 'Cartographer’s Chrono-Lens',
      type: 'Exploration Artifact',
      description: 'Reveals territorial topography, subterranean caverns, and danger concentrations through dense fog.',
      rarity: 'Rare',
      origin_region: regions[1 % regions.length].name
    },
    {
      id: 'itm-4',
      name: 'Vial of Pure Aether-Ichor',
      type: 'Consumable Elixir',
      description: 'Instantly regenerates vitality and purges harmful environmental afflictions or toxic miasmas.',
      rarity: 'Uncommon',
      origin_region: regions[2 % regions.length].name
    },
    {
      id: 'itm-5',
      name: 'Phase-Warp Grapple',
      type: 'Mobility Gear',
      description: 'Fires an anchor tether that momentarily folds local spacetime, pulling the user 30 meters instantly.',
      rarity: 'Epic',
      origin_region: regions[4 % regions.length].name
    },
    {
      id: 'itm-6',
      name: 'Heart of the World Engine',
      type: 'Prismatic Core',
      description: 'An undying energy dynamo capable of powering entire cities or generating planetary atmospheric stabilization shields.',
      rarity: 'Artifact',
      origin_region: regions[regions.length - 1].name
    },
    {
      id: 'itm-7',
      name: 'Ranger Scout Boots',
      type: 'Light Footwear',
      description: 'Silences footsteps completely and increases traverse speed across treacherous marshes and scree.',
      rarity: 'Rare',
      origin_region: regions[1 % regions.length].name
    },
    {
      id: 'itm-8',
      name: 'Signal Flare of the Citadel',
      type: 'Tactical Item',
      description: 'Calls down precision orbital strikes or defensive auxiliary reinforcements in open field combat.',
      rarity: 'Common',
      origin_region: regions[0].name
    }
  ];

  const lore: LoreEntry[] = [
    {
      id: 'lore-1',
      title: 'The Great Convergence Cataclysm',
      text: `Centuries ago, the physical laws governing ${worldName} warped during the Convergence. Boundaries between material reality and the ether collapsed, giving rise to distinct localized biomes and anomalous wildlife.`
    },
    {
      id: 'lore-2',
      title: 'The Accord of the Spire',
      text: 'Following three generations of territorial strife, the surviving factions established the Free Trade Cartel, decreeing that regional trade corridors and communication beacons remain neutral territory.'
    },
    {
      id: 'lore-3',
      title: 'The Whispers of the Deep Vaults',
      text: 'Explorers who venture into the forbidden perimeter report hearing synchronized mechanical pulses emanating from deep subterranean strata, as if the planet itself is a sleeping artificial construct.'
    },
    {
      id: 'lore-4',
      title: 'Flora and Fauna Adaptations',
      text: 'Ambient ambient energy saturation has forced indigenous wildlife to adapt rapidly. Predators develop bioluminescent hunting lures, while flora absorbs atmospheric radiation to grow into titanic barrier forests.'
    },
    {
      id: 'lore-5',
      title: 'The Legend of the Worldwalker',
      text: 'Ancient inscriptions prophesy the arrival of a wanderer who will unite the fractured regional tokens, awaken the Progenitor Core, and decide the ultimate fate of this realm.'
    }
  ];

  return {
    world_name: worldName,
    theme,
    size,
    description: userDesc || `A vast, dynamic ${theme.toLowerCase()} realm composed of contrasting territories, perilous hazards, and rich historical legends.`,
    climate_summary: `Variable climate characterized by energetic weather patterns, shifting microclimates, and regional atmospheric phenomena.`,
    regions,
    characters,
    enemies,
    quests,
    items,
    lore
  };
}
