export type WorldTheme = 
  | 'Fantasy' 
  | 'Sci-Fi' 
  | 'Cyberpunk' 
  | 'Horror' 
  | 'Post-Apocalyptic' 
  | 'Medieval' 
  | 'Steampunk' 
  | 'Solar-punk' 
  | 'Eldritch';

export type WorldSize = 'Small' | 'Medium' | 'Large';

export interface Region {
  id: string;
  name: string;
  type: string;
  description: string;
  danger_level: number; // 1 to 10
  x: number; // 10 to 90 (grid percentage)
  y: number; // 10 to 90 (grid percentage)
  biome: string;
  landmark: string;
  connected_to: string[]; // names or IDs of neighboring regions
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  region: string;
  personality?: string;
}

export interface Enemy {
  id: string;
  name: string;
  type: string;
  description: string;
  difficulty: number; // 1 to 10
  spawn_region: string;
  weakness?: string;
  loot?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: string;
  quest_giver: string;
  target_region: string;
}

export interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Artifact';
  origin_region?: string;
}

export interface LoreEntry {
  id: string;
  title?: string;
  text: string;
}

export interface GameWorld {
  world_name: string;
  theme: WorldTheme | string;
  size: WorldSize | string;
  description: string;
  climate_summary?: string;
  regions: Region[];
  characters: Character[];
  enemies: Enemy[];
  quests: Quest[];
  items: Item[];
  lore: (string | LoreEntry)[];
}

export interface GenerationRequest {
  theme: string;
  size: string;
  description: string;
}

export interface GenerationResponse {
  success: boolean;
  world?: GameWorld;
  error?: string;
  source?: 'gemini' | 'procedural';
}
