import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { generateProceduralWorld } from './server/proceduralGenerator';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // World Generation endpoint
  app.post('/api/generate', async (req, res) => {
    const { theme = 'Fantasy', size = 'Medium', description = '' } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    // Minimum counts based on world size
    const minRegions = size === 'Small' ? 5 : size === 'Large' ? 10 : 7;
    const minItems = size === 'Small' ? 6 : size === 'Large' ? 10 : 8;

    if (!apiKey) {
      console.warn('[AI Generator] No GEMINI_API_KEY found, using high-fidelity procedural generation engine.');
      const world = generateProceduralWorld(theme, size, description);
      return res.json({
        success: true,
        source: 'procedural',
        world
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `You are a world-class game world architect, narrative designer, and cartographer.
Create a complete, deeply immersive, internally consistent game world based on the following parameters:

Theme: ${theme}
World Size: ${size}
User Prompt / Premise: ${description || 'Create an imaginative and cohesive game setting with distinct political or natural forces.'}

Requirements:
1. Provide at least ${minRegions} distinct regions. For each region, assign a 2D map coordinate: 'x' between 15 and 85, and 'y' between 15 and 85, so they form a well-spaced geographical layout. Include connected neighboring regions in 'connected_to'.
2. Provide at least 5 compelling characters (NPCs, leaders, rogues, or scholars) anchored to specific regions.
3. Provide at least 5 dangerous enemies or beasts with difficulty ratings (1 to 10), weaknesses, and loot drops.
4. Provide at least 5 narrative quests with clear rewards, quest givers, and target regions.
5. Provide at least ${minItems} unique items or relics spanning various rarities (Common, Uncommon, Rare, Epic, Legendary, Artifact).
6. Provide at least 5 rich lore chronicles or historical events shaping the world's current conflicts.

Make all names, biomes, factions, and landmarks fit the '${theme}' tone perfectly.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              world_name: { type: Type.STRING, description: 'Evocative title of the game world' },
              description: { type: Type.STRING, description: 'Overarching premise, setting description, and central conflict' },
              climate_summary: { type: Type.STRING, description: 'Atmosphere, skies, weather patterns, and environmental hazards' },
              regions: {
                type: Type.ARRAY,
                description: 'Geographic territories or sectors of the map',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    type: { type: Type.STRING, description: 'e.g. Floating Island, Obsidian Rift, Neon Megaplex, Sunken Port' },
                    description: { type: Type.STRING },
                    danger_level: { type: Type.INTEGER, description: '1 to 10 danger scale' },
                    x: { type: Type.NUMBER, description: 'Horizontal coordinate percentage (15 to 85)' },
                    y: { type: Type.NUMBER, description: 'Vertical coordinate percentage (15 to 85)' },
                    biome: { type: Type.STRING },
                    landmark: { type: Type.STRING, description: 'Key notable structure or natural wonder' },
                    connected_to: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'Names of neighboring connected regions'
                    }
                  },
                  required: ['name', 'type', 'description', 'danger_level', 'x', 'y', 'biome', 'landmark']
                }
              },
              characters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    description: { type: Type.STRING },
                    region: { type: Type.STRING, description: 'Name of the region they reside in or frequent' },
                    personality: { type: Type.STRING }
                  },
                  required: ['name', 'role', 'description', 'region']
                }
              },
              enemies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    description: { type: Type.STRING },
                    difficulty: { type: Type.INTEGER, description: '1 to 10' },
                    spawn_region: { type: Type.STRING },
                    weakness: { type: Type.STRING },
                    loot: { type: Type.STRING }
                  },
                  required: ['name', 'type', 'description', 'difficulty', 'spawn_region']
                }
              },
              quests: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    reward: { type: Type.STRING },
                    quest_giver: { type: Type.STRING },
                    target_region: { type: Type.STRING }
                  },
                  required: ['title', 'description', 'reward', 'quest_giver', 'target_region']
                }
              },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    description: { type: Type.STRING },
                    rarity: { type: Type.STRING, description: 'Common, Uncommon, Rare, Epic, Legendary, or Artifact' },
                    origin_region: { type: Type.STRING }
                  },
                  required: ['name', 'type', 'description', 'rarity']
                }
              },
              lore: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    text: { type: Type.STRING }
                  },
                  required: ['title', 'text']
                }
              }
            },
            required: ['world_name', 'description', 'regions', 'characters', 'enemies', 'quests', 'items', 'lore']
          }
        }
      });

      const responseText = response.text || '';
      const parsedWorld = JSON.parse(responseText);

      // Clean up IDs and defaults if missing
      parsedWorld.theme = theme;
      parsedWorld.size = size;

      if (parsedWorld.regions) {
        parsedWorld.regions.forEach((r: any, idx: number) => {
          if (!r.id) r.id = `reg-${idx + 1}`;
          if (typeof r.x !== 'number' || isNaN(r.x)) r.x = 20 + ((idx * 27) % 65);
          if (typeof r.y !== 'number' || isNaN(r.y)) r.y = 20 + ((idx * 37) % 65);
          if (!Array.isArray(r.connected_to)) r.connected_to = [];
        });
      }

      if (parsedWorld.characters) {
        parsedWorld.characters.forEach((c: any, idx: number) => {
          if (!c.id) c.id = `char-${idx + 1}`;
        });
      }

      if (parsedWorld.enemies) {
        parsedWorld.enemies.forEach((e: any, idx: number) => {
          if (!e.id) e.id = `enem-${idx + 1}`;
        });
      }

      if (parsedWorld.quests) {
        parsedWorld.quests.forEach((q: any, idx: number) => {
          if (!q.id) q.id = `qst-${idx + 1}`;
        });
      }

      if (parsedWorld.items) {
        parsedWorld.items.forEach((it: any, idx: number) => {
          if (!it.id) it.id = `itm-${idx + 1}`;
        });
      }

      if (parsedWorld.lore) {
        parsedWorld.lore.forEach((l: any, idx: number) => {
          if (!l.id) l.id = `lore-${idx + 1}`;
        });
      }

      return res.json({
        success: true,
        source: 'gemini',
        world: parsedWorld
      });
    } catch (err: any) {
      console.error('[AI Generator Error]:', err?.message || err);
      // Fallback gracefully so user doesn't hit a wall
      const fallbackWorld = generateProceduralWorld(theme, size, description);
      return res.json({
        success: true,
        source: 'procedural',
        note: `Generated with procedural engine (Gemini API: ${err?.message || 'unavailable'})`,
        world: fallbackWorld
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Game World Generator server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
