import { GameWorld } from '../types';

export const SAMPLE_WORLDS: GameWorld[] = [
  {
    world_name: 'Aetheria: The Shattered Skylands',
    theme: 'Fantasy',
    size: 'Medium',
    description: 'A shattered world where civilization thrives on verdant floating archipelagos held aloft by primordial gravitite crystal cores, hovering over the perilous Miasma Abyss.',
    climate_summary: 'Brisk mountain gales in the upper troposphere with solar auroras, drifting thunderstorm squalls, and toxic sulfur tempests in the lower chasms.',
    regions: [
      {
        id: 'reg-1',
        name: 'The Sunspire Citadel',
        type: 'Celestial Capital',
        description: 'A grand city carved from luminescent white marble and gold, balanced on the apex of the highest floating monolith.',
        danger_level: 2,
        x: 50,
        y: 20,
        biome: 'High Altitude Cloudlands',
        landmark: 'The Solar Sun-Prism',
        connected_to: ['Whispering Archipelago', 'Zephyr Shipyards']
      },
      {
        id: 'reg-2',
        name: 'Zephyr Shipyards',
        type: 'Aeronautical Hub',
        description: 'A bustling industrial dock suspended between two massive cliffs where skyships, gliders, and solar-balloon frigates are forged.',
        danger_level: 4,
        x: 28,
        y: 35,
        biome: 'Wind-Swept Canyons',
        landmark: 'The Great Magnetic Gantry',
        connected_to: ['The Sunspire Citadel', 'Bramble Rift', 'Whispering Archipelago']
      },
      {
        id: 'reg-3',
        name: 'Whispering Archipelago',
        type: 'Mystic Spires',
        description: 'A cluster of smaller adrift islands overgrown with bioluminescent willows whose leaves ring like crystal chimes in wind.',
        danger_level: 5,
        x: 72,
        y: 40,
        biome: 'Floating Bioluminescent Forest',
        landmark: 'The Shimmering Bell Tree',
        connected_to: ['The Sunspire Citadel', 'The Obsidian Caldera']
      },
      {
        id: 'reg-4',
        name: 'Bramble Rift',
        type: 'Tangled Ruins',
        description: 'Twisted, petrified iron-wood roots linking fragmented rocks, teeming with predatory raptors and feral scavenger bands.',
        danger_level: 7,
        x: 20,
        y: 65,
        biome: 'Petrified Thorn Jungles',
        landmark: 'The Chasm Bridge',
        connected_to: ['Zephyr Shipyards', 'The Abyssal Trench']
      },
      {
        id: 'reg-5',
        name: 'The Obsidian Caldera',
        type: 'Volcanic Island',
        description: 'A smoking, inverted basalt mountain that spews blue pyrolatite fire into the open stratosphere, rich in volatile gravitite ore.',
        danger_level: 8,
        x: 78,
        y: 72,
        biome: 'Volcanic Basalt Crags',
        landmark: 'The Magma Inverter Crucible',
        connected_to: ['Whispering Archipelago', 'The Abyssal Trench']
      },
      {
        id: 'reg-6',
        name: 'The Abyssal Trench',
        type: 'Forbidden Rift',
        description: 'The fathomless depths just above the toxic Miasma Sea where fallen cities decay and shadowy leviathans breach through thick smog.',
        danger_level: 10,
        x: 48,
        y: 85,
        biome: 'Toxic Fog Desolation',
        landmark: 'The Sunken Colossus Gateway',
        connected_to: ['Bramble Rift', 'The Obsidian Caldera']
      }
    ],
    characters: [
      {
        id: 'char-1',
        name: 'Arch-Navigator Vaelen',
        role: 'Chief Skylord of the Wind Council',
        description: 'A scarred aerialist with brass spectacles and a clockwork artificial arm who charted the Outer Stormwall.',
        region: 'The Sunspire Citadel',
        personality: 'Stoic, calculating, fiercely protective of skyship navigation logs.'
      },
      {
        id: 'char-2',
        name: 'Sylva Ironwing',
        role: 'Master Shipwright',
        description: 'An outspoken mechanic clad in heavy welding leathers who can repair a ruptured lift-balloon mid-hurricane.',
        region: 'Zephyr Shipyards',
        personality: 'Boisterous, pragmatic, loves wagering on aerial skyship races.'
      },
      {
        id: 'char-3',
        name: 'Oracle Miriel',
        role: 'Keeper of the Chime Willows',
        description: 'An ancient elf-blooded hermit who communicates with the gravitite currents through vibrational resonant singing.',
        region: 'Whispering Archipelago',
        personality: 'Enigmatic, speaks in cryptic meteorological metaphors.'
      },
      {
        id: 'char-4',
        name: 'Kaelen the Ash-Diver',
        role: 'Gravitite Prospector',
        description: 'A daring salvage pilot who plunges into volcanic updrafts to mine raw molten crystals with heat-shielded harpoons.',
        region: 'The Obsidian Caldera',
        personality: 'Reckless adrenaline junkie with an uncanny instinct for survival.'
      },
      {
        id: 'char-5',
        name: 'The Blind Smuggler Jax',
        role: 'Black-Market Outlaw',
        description: 'Operates a stealth glider using echolocation bat-drones through forbidden air corridors beneath the radar net.',
        region: 'Bramble Rift',
        personality: 'Shrewd, untrusting, but honors debts signed with blood.'
      }
    ],
    enemies: [
      {
        id: 'enem-1',
        name: 'Cloud-Skimmer Wyrm',
        type: 'Aerial Leviathan',
        description: 'Colossal feathered serpents that generate sonic crackles and swallow solar glider sails whole.',
        difficulty: 8,
        spawn_region: 'Whispering Archipelago',
        weakness: 'Vulnerable to ultrasonic resonance and tail rudder attacks.',
        loot: 'Prismatic Wyrmscale, Sonic Gland'
      },
      {
        id: 'enem-2',
        name: 'Miasma Dreadstalker',
        type: 'Mutated Horror',
        description: 'Insectoid abominations with six translucent wings that ascend from the lower abyss hunting heat and light sources.',
        difficulty: 9,
        spawn_region: 'The Abyssal Trench',
        weakness: 'Pure concentrated sunlight or blinding flare ammunition.',
        loot: 'Abyssal Ichor, Chitinous Scythe-Claw'
      },
      {
        id: 'enem-3',
        name: 'Rift Scavenger Corsair',
        type: 'Air Pirate Humanoid',
        description: 'Desperate exiles piloting salvaged propeller skiffs armed with harpoon winches and corrosive canister bombs.',
        difficulty: 5,
        spawn_region: 'Bramble Rift',
        weakness: 'Direct attacks on their exposed gas intake valves.',
        loot: 'Refined Kerosene, Grappling Harpoon'
      },
      {
        id: 'enem-4',
        name: 'Infernal Magma Golem',
        type: 'Elemental Automaton',
        description: 'Ancient defensive guardians fueled by volcanic gravitite slumbering inside the crater walls.',
        difficulty: 7,
        spawn_region: 'The Obsidian Caldera',
        weakness: 'Cryogenic frost vials and joint disruption.',
        loot: 'Heart of Cinders, Molten Core Fragment'
      },
      {
        id: 'enem-5',
        name: 'Storm Gryphon',
        type: 'Beast of Prey',
        description: 'Aggressive predatory raptors with electrified talons that nest along the vertical underbelly of the sky islands.',
        difficulty: 6,
        spawn_region: 'Zephyr Shipyards',
        weakness: 'Grounded nets and grounding metal rods.',
        loot: 'Electrified Talon, Feather of Gale'
      }
    ],
    quests: [
      {
        id: 'qst-1',
        title: 'The Fallen Skyship Sovereign',
        description: 'Investigate the distress beacon of the flagship Royal Sovereign that crash-landed near the edge of Bramble Rift before corsairs salvage the antimatter core.',
        reward: '2,500 Sky-Crowns, Officer Flight Insignia',
        quest_giver: 'Arch-Navigator Vaelen',
        target_region: 'Bramble Rift'
      },
      {
        id: 'qst-2',
        title: 'Whispers in the Glass Leaves',
        description: 'Collect three resonant seeds from the singing willows to recalibrate the Citadel’s failing levitation dampeners.',
        reward: 'Gravitite Harmonic Compass, 1,800 XP',
        quest_giver: 'Oracle Miriel',
        target_region: 'Whispering Archipelago'
      },
      {
        id: 'qst-3',
        title: 'Heist of the Solar Inverter',
        description: 'Sabotage the rogue smelter in the Obsidian Caldera to prevent a catastrophic overload of the island’s thermal core.',
        reward: 'Thermal Aegis Shield, Flameheart Ring',
        quest_giver: 'Sylva Ironwing',
        target_region: 'The Obsidian Caldera'
      },
      {
        id: 'qst-4',
        title: 'Descent into the Shrouded Depths',
        description: 'Descend through the noxious cloud barrier into the Abyssal Trench to recover an ancient pre-cataclysm datapad.',
        reward: 'Ancient Blueprint: Aerodynamic Wingsuit, Mythic Relic Key',
        quest_giver: 'The Blind Smuggler Jax',
        target_region: 'The Abyssal Trench'
      },
      {
        id: 'qst-5',
        title: 'Scourge of the Windlanes',
        description: 'Hunt down the Alpha Cloud-Skimmer Wyrm that has severed the trade caravan connecting the Citadel to the Zephyr docks.',
        reward: 'Skyskimmer Feather Cloak, Master Aviator Title',
        quest_giver: 'Zephyr Port Authority',
        target_region: 'Zephyr Shipyards'
      }
    ],
    items: [
      {
        id: 'itm-1',
        name: 'Gravitite Tether-Hook',
        type: 'Mobility Tool',
        description: 'A pressurized grapple pistol that locks onto magnetic cloud currents, enabling frictionless 80m swings across chasms.',
        rarity: 'Rare',
        origin_region: 'Zephyr Shipyards'
      },
      {
        id: 'itm-2',
        name: 'Sun-Prism Chronometer',
        type: 'Celestial Relic',
        description: 'A golden pocket watch that bends local airflow and predicts solar wind turbulence with 99.8% precision.',
        rarity: 'Epic',
        origin_region: 'The Sunspire Citadel'
      },
      {
        id: 'itm-3',
        name: 'Aegis of the Storm Falcon',
        type: 'Armor',
        description: 'Lightweight lamellar breastplate fashioned from storm gryphon feathers and tempered cobalt alloy; deflects lightning bolts.',
        rarity: 'Epic',
        origin_region: 'Zephyr Shipyards'
      },
      {
        id: 'itm-4',
        name: 'Cinder-Forged Greatsword',
        type: 'Weapon',
        description: 'A colossal two-handed blade infused with volatile magma veins, releasing waves of flame on heavy swings.',
        rarity: 'Legendary',
        origin_region: 'The Obsidian Caldera'
      },
      {
        id: 'itm-5',
        name: 'Miasma Filter Mask',
        type: 'Survival Gear',
        description: 'Dual-canister brass respirator filled with crushed willow charcoal; protects against the toxic gases of the abyss.',
        rarity: 'Uncommon',
        origin_region: 'Bramble Rift'
      },
      {
        id: 'itm-6',
        name: 'Resonance Tuning Fork',
        type: 'Magical Artifact',
        description: 'When struck against gravitite, creates an harmonic barrier that repels ethereal wyrms and flying monsters.',
        rarity: 'Rare',
        origin_region: 'Whispering Archipelago'
      },
      {
        id: 'itm-7',
        name: 'Heart of the First Colossus',
        type: 'Mythic Core',
        description: 'A pulsing sapphire sphere recovered from pre-shattering ruins that can keep an entire metropolis aloft for centuries.',
        rarity: 'Artifact',
        origin_region: 'The Abyssal Trench'
      },
      {
        id: 'itm-8',
        name: 'Corsair Smoke Grenade',
        type: 'Consumable',
        description: 'Creates a 15-meter sphere of dense sulfur cloud that conceals retreat and confuses airborne predator optics.',
        rarity: 'Common',
        origin_region: 'Bramble Rift'
      }
    ],
    lore: [
      {
        id: 'lore-1',
        title: 'The Great Cleaving (Year 0)',
        text: 'Seven centuries ago, the planetary mantle shattered when the Ancestral Gravitite Core went super-critical. What was once a unified supercontinent fractured into thousands of adrift sky isles held in eternal suspension.'
      },
      {
        id: 'lore-2',
        title: 'The Miasma Sea Below',
        text: 'Beneath the cloudline lies the sunken world, submerged under a perpetual ocean of toxic, heavy vapor known as the Miasma. Anything that drops below the cloud deck is lost to crushing pressure and mutant bioforms.'
      },
      {
        id: 'lore-3',
        title: 'The Code of the Skyways',
        text: 'All sailing airships, regardless of guild or nationality, are bound by the Covenant of the Beacon: any vessel displaying an amber emergency flare is entitled to salvage assistance and safe docking.'
      },
      {
        id: 'lore-4',
        title: 'The Singing Willows',
        text: 'Natural scholars discovered that the bioluminescent willows act as organic gravitite antennae. Their root networks knit shattered landmasses together, preventing micro-islands from drifting into fatal collisions.'
      },
      {
        id: 'lore-5',
        title: 'The Silent Titans',
        text: 'Colossal mechanical effigies slumber frozen in the deepest trenches. Legends speak of a master key that will awaken the titans to pull the sky continents back down into a healed terrestrial planet.'
      }
    ]
  },
  {
    world_name: 'Neo-Kowloon: The Neon Necropolis',
    theme: 'Cyberpunk',
    size: 'Medium',
    description: 'A multi-tiered, vertical megacity of 80 million souls encased inside an atmospheric smog dome, where mega-corporations control the rain, memories are traded like cryptocurrency, and rogue AI pantheons rule the Net.',
    climate_summary: 'Perpetual acid drizzle, ozone-heavy neon haze, artificial cloud density calibrated for corporate solar yield.',
    regions: [
      {
        id: 'nk-1',
        name: 'Olympus Sector (Apex Tier)',
        type: 'Corporate Penthouse District',
        description: 'Ultra-luxurious skyward terraces bathed in golden filtered artificial sunlight, guarded by privatized combat mechs.',
        danger_level: 3,
        x: 50,
        y: 15,
        biome: 'High-Tech Glass & Chrome Spire',
        landmark: 'The Arasaka-Vanguard Monolith',
        connected_to: ['Neon Promenade', 'The Data-Silo District']
      },
      {
        id: 'nk-2',
        name: 'Neon Promenade (Mid-City)',
        type: 'Commercial Entertainment Grid',
        description: 'Blinding holographic billboards, multi-level ramen stalls, synth-jazz clubs, and cyberware black clinics.',
        danger_level: 5,
        x: 32,
        y: 45,
        biome: 'Dense Urban Canopy',
        landmark: 'The Grand Holo-Dragon Flyway',
        connected_to: ['Olympus Sector', 'The Rust Sump', 'The Data-Silo District']
      },
      {
        id: 'nk-3',
        name: 'The Data-Silo District',
        type: 'Industrial Server Farm',
        description: 'Miles of liquid-nitrogen cooled supercomputers where rogue netrunners jack in under armed syndicates.',
        danger_level: 6,
        x: 75,
        y: 42,
        biome: 'Industrial Cybernetic Grid',
        landmark: 'The Quantum Cooling Towers',
        connected_to: ['Olympus Sector', 'The Undercity Slums']
      },
      {
        id: 'nk-4',
        name: 'The Rust Sump (Under-Belly)',
        type: 'Cyber-Junk Wastes',
        description: 'A subterranean labyrinth of discarded bio-mechanical parts, toxic drainage canals, and forgotten sewer communes.',
        danger_level: 8,
        x: 25,
        y: 75,
        biome: 'Toxic Industrial Slums',
        landmark: 'The Old Subway Core Terminal',
        connected_to: ['Neon Promenade', 'The Sub-Grid Core']
      },
      {
        id: 'nk-5',
        name: 'The Undercity Slums',
        type: 'Favela Habitat',
        description: 'Stacked shipping containers reaching 40 stories high, inhabited by undocumented citizens without corporate citizenship sin-numbers.',
        danger_level: 7,
        x: 70,
        y: 75,
        biome: 'Vertical Slum Sprawl',
        landmark: 'The Shrine of the Broken Wire',
        connected_to: ['The Data-Silo District', 'The Sub-Grid Core']
      },
      {
        id: 'nk-6',
        name: 'The Sub-Grid Core',
        type: 'Unregulated Ghost Zone',
        description: 'The foundation layer of the city where geothermal generators pump steam and rogue military androids wander feral.',
        danger_level: 10,
        x: 50,
        y: 90,
        biome: 'Dark Geothermal Machine Warren',
        landmark: 'The Motherboard Reactor Breach',
        connected_to: ['The Rust Sump', 'The Undercity Slums']
      }
    ],
    characters: [
      {
        id: 'nkc-1',
        name: 'Director Evelyn Cross',
        role: 'OmniCorp Security Vice-President',
        description: 'Implanted with tactical predictive subroutines and diamond-weave subdermal armor; rules the Olympus grid with cold corporate decree.',
        region: 'Olympus Sector (Apex Tier)',
        personality: 'Merciless, polite, calculates human lives strictly in credit margins.'
      },
      {
        id: 'nkc-2',
        name: 'Cipher_Zero (Ren)',
        role: 'Legendary Ghost Netrunner',
        description: 'A fugitive hacker whose physical body is wired into a mobile life-support deck while her mind traverses cyberspace.',
        region: 'The Data-Silo District',
        personality: 'Cynical, hyper-intelligent, obsessed with unmasking corporate propaganda.'
      },
      {
        id: 'nkc-3',
        name: 'Doc Kurogane',
        role: 'Street Ripperdoc & Bioweaver',
        description: 'An aging surgeon with four articulated mechanical arms who installs military implants in an unassuming noodle restaurant basement.',
        region: 'Neon Promenade (Mid-City)',
        personality: 'Gruff, compassionate under a harsh exterior, demands payment upfront.'
      },
      {
        id: 'nkc-4',
        name: 'Kira "Overdrive" Vance',
        role: 'Mercenary Solo & Bike Runner',
        description: 'Fastest courier in the city; her legs have been replaced with high-impulse pneumatic jump struts.',
        region: 'The Undercity Slums',
        personality: 'Thrall to speed, fearless, loyal to the underdog street guilds.'
      },
      {
        id: 'nkc-5',
        name: 'The Apostle (Entity 7)',
        role: 'Prophet of the Digital Afterlife',
        description: 'A cult leader who claims to channel the collective consciousness of deceased citizens trapped in corrupted cloud servers.',
        region: 'The Rust Sump (Under-Belly)',
        personality: 'Chillingly charismatic, poetic, mesmerizingly eerie.'
      }
    ],
    enemies: [
      {
        id: 'nke-1',
        name: 'OmniCorp Apex Enforcer',
        type: 'Cyborg Strike Soldier',
        description: 'Heavy corporate kill-teams equipped with thermal cloaking, smart rifles, and flash-suppression shields.',
        difficulty: 7,
        spawn_region: 'Olympus Sector (Apex Tier)',
        weakness: 'EMP grenades and neural malware override hacks.',
        loot: 'Smart-Link Cyber-Arm, Corporate Encryption Key'
      },
      {
        id: 'nke-2',
        name: 'Feral Glitchhound',
        type: 'Cyber-Canine War Drone',
        description: 'Decommissioned military reconnaissance quadrupeds with carbon-fiber fangs and laser rangefinders, hunting in street packs.',
        difficulty: 4,
        spawn_region: 'The Rust Sump (Under-Belly)',
        weakness: 'Audio feedback screech and optic lens blindness.',
        loot: 'High-Density Servomotor, Sensor Array'
      },
      {
        id: 'nke-3',
        name: 'Rogue Sub-Core Mech (M-9 Titan)',
        type: 'Automated Construction Warframe',
        description: 'A 15-foot rusted mining exoskeleton hijacked by a corrupted construction AI wielding hydraulic plasma drills.',
        difficulty: 9,
        spawn_region: 'The Sub-Grid Core',
        weakness: 'Exposed battery fuel-cells on rear cervical chassis.',
        loot: 'Plasma Drill Core, Titanium Exoskeleton Plate'
      },
      {
        id: 'nke-4',
        name: 'Chromed Syndicate Bouncer',
        type: 'Augmented Thug',
        description: 'Enforcers pumped with synthetic adrenal boosters that ignore ballistic pain while wielding heavy concussion batons.',
        difficulty: 5,
        spawn_region: 'Neon Promenade (Mid-City)',
        weakness: 'Nerve-toxin darts and leg joint destabilization.',
        loot: 'Adrenal Injector, Modified Shock Club'
      },
      {
        id: 'nke-5',
        name: 'Net-Wraith (Black ICE Protocol)',
        type: 'Virtual Defense Algorithm',
        description: 'A murderous security daemon that can manifest through nearby surveillance projectors and fry the brains of unwary hackers.',
        difficulty: 8,
        spawn_region: 'The Data-Silo District',
        weakness: 'Firewall shunt decks and emergency optic disconnect.',
        loot: 'Corrupted ICE Shard, Cryptographic Zero-Day Exploit'
      }
    ],
    quests: [
      {
        id: 'nkq-1',
        title: 'Project Chiron Extraction',
        description: 'Infiltrate the 90th floor of the OmniCorp research spire to extract a defecting genetic engineer before executive wet-work squads eliminate him.',
        reward: '45,000 Creds, Chiron Reflex Accelerator Cyberware',
        quest_giver: 'Cipher_Zero (Ren)',
        target_region: 'Olympus Sector (Apex Tier)'
      },
      {
        id: 'nkq-2',
        title: 'The Ripperdoc’s Debt',
        description: 'Recover a shipment of stolen neural processors hijacked by the Chromed Syndicate in the Neon Promenade back-alleys.',
        reward: 'Free Cyberware Upgrades, Advanced Med-Pack Blueprint',
        quest_giver: 'Doc Kurogane',
        target_region: 'Neon Promenade (Mid-City)'
      },
      {
        id: 'nkq-3',
        title: 'Ghost in the Machine',
        description: 'Track down a rogue AI virus causing citywide subway train derailments in the subterranean Sub-Grid Core.',
        reward: 'AI Companion Deck "Echo-7", 3,000 XP',
        quest_giver: 'Director Evelyn Cross',
        target_region: 'The Sub-Grid Core'
      },
      {
        id: 'nkq-4',
        title: 'Midnight Express Run',
        description: 'Smuggle an encrypted memory shard containing the synthetic water rations ledger through three hostile security checkpoints.',
        reward: 'Custom Hyper-Bike Overdrive Tuning, 25,000 Creds',
        quest_giver: 'Kira "Overdrive" Vance',
        target_region: 'The Undercity Slums'
      },
      {
        id: 'nkq-5',
        title: 'Baptism in the Acid Rain',
        description: 'Neutralize the Apostle’s signal broadcast tower in the Rust Sump before his followers trigger a catastrophic city grid blackout.',
        reward: 'Holo-Cowl of the Disconnected, EMP Cannon',
        quest_giver: 'Street Resistance Alliance',
        target_region: 'The Rust Sump (Under-Belly)'
      }
    ],
    items: [
      {
        id: 'nki-1',
        name: 'Mantis Kinetic Blades',
        type: 'Cyberware Arm Implant',
        description: 'Concealed thermic-edged blades deployed from the forearms capable of slicing reinforced steel blast doors.',
        rarity: 'Legendary',
        origin_region: 'The Data-Silo District'
      },
      {
        id: 'nki-2',
        name: 'Monowire Garrote',
        type: 'Weapon',
        description: 'A single-molecule thin carbon filament weapon that whips at supersonic speeds, bisecting targets silently.',
        rarity: 'Epic',
        origin_region: 'Neon Promenade (Mid-City)'
      },
      {
        id: 'nki-3',
        name: 'Cyberdeck "Onyx Mk IV"',
        type: 'Netrunning Terminal',
        description: 'Military cyberdeck with 8 buffer slots and liquid nitrogen cooling; bypasses Tier-4 ICE defenses.',
        rarity: 'Epic',
        origin_region: 'The Data-Silo District'
      },
      {
        id: 'nki-4',
        name: 'Glitch-Camo Trenchcoat',
        type: 'Wearable Tech',
        description: 'Reflective nano-mesh that bends light and scrambles automated facial recognition cameras.',
        rarity: 'Rare',
        origin_region: 'The Undercity Slums'
      },
      {
        id: 'nki-5',
        name: 'Neuro-Strobe Flashbang',
        type: 'Tactical Device',
        description: 'Overloads optical implants with 10,000 lumens of polarized static, blinding both organic and synthetic eyes.',
        rarity: 'Uncommon',
        origin_region: 'Neon Promenade (Mid-City)'
      },
      {
        id: 'nki-6',
        name: 'Bio-Synthetic Stim-Injector',
        type: 'Consumable',
        description: 'Instantly clots hemorrhaging wounds, clears chemical toxins, and increases reflexes by 25% for 45 seconds.',
        rarity: 'Common',
        origin_region: 'The Rust Sump (Under-Belly)'
      },
      {
        id: 'nki-7',
        name: 'Zero-Day Genesis Key',
        type: 'Master Cryptography Shard',
        description: 'The rumored root-access password code generated during the initial initialization of the city’s central mainframe.',
        rarity: 'Artifact',
        origin_region: 'The Sub-Grid Core'
      },
      {
        id: 'nki-8',
        name: 'Street-Doc Diagnostic Scanner',
        type: 'Utility Hardware',
        description: 'Handheld scanner revealing cybernetic enhancements, weak armor points, and concealed weapons on targets.',
        rarity: 'Rare',
        origin_region: 'Neon Promenade (Mid-City)'
      }
    ],
    lore: [
      {
        id: 'nkl-1',
        title: 'The Great Blackout of 2088',
        text: 'When the municipal power authority went bankrupt, mega-corporations privatized electricity floor-by-floor. Light became a monthly subscription service, condemning the bottom forty levels to perpetual shadow.'
      },
      {
        id: 'nkl-2',
        title: 'The Corporate Sin-System',
        text: 'Every citizen receives a Standard Identification Number (SIN). Without a valid corporate sponsor, a human is classified as "Static"—possessing no legal protection, medical rights, or property ownership.'
      },
      {
        id: 'nkl-3',
        title: 'The Ghost Net Myths',
        text: 'Netrunners whisper of the "Ghost Net", deep partitions of disconnected corporate servers where hundreds of digitized minds have lived on for decades, evolving their own synthetic digital pantheon.'
      },
      {
        id: 'nkl-4',
        title: 'The Acid Drizzle Treaty',
        text: 'Rainwater in Neo-Kowloon carries toxic sulfur and industrial particulates. The Apex Tier pays for cloud-seeding chemicals to ensure downpours wash away debris into lower tiers while their sky terraces remain immaculate.'
      },
      {
        id: 'nkl-5',
        title: 'The Flesh-Purity Movement',
        text: 'In the lowest slums, an underground sect rejects all synthetic implants, believing that artificial circuitry erodes the human soul. They wage a guerrilla war against corporate cyberware harvesting vans.'
      }
    ]
  }
];

export const PRESET_PROMPTS = [
  {
    title: 'Floating Sky Islands',
    theme: 'Fantasy',
    size: 'Medium',
    description: 'A world where humanity lives on floating islands above a toxic cloud ocean, traveling by skyships powered by gravitite crystals.'
  },
  {
    title: 'Neon Megacity Sprawl',
    theme: 'Cyberpunk',
    size: 'Medium',
    description: 'A multi-tiered vertical metropolis where megacorps trade memories as currency, rogue AI gods inhabit the data networks, and acid rain drenches chrome alleys.'
  },
  {
    title: 'Cursed Sunken Gothic Realm',
    theme: 'Horror',
    size: 'Medium',
    description: 'A gothic coastal kingdom submerged under black mirror tides, where blood-moon eclipses awaken clockwork gargoyles and eldritch leviathans.'
  },
  {
    title: 'Desert Machine Oasis',
    theme: 'Sci-Fi',
    size: 'Large',
    description: 'An arid sand planet dominated by colossal dormant machine titans, wandering nomad sand-skiffs, and oasis cities sheltered inside fallen starships.'
  },
  {
    title: 'Solar-Punk Bioluminescent Canopy',
    theme: 'Solar-punk',
    size: 'Small',
    description: 'A harmonious civilization built inside the branches of thousand-meter-tall world-trees powered by chlorophyll solar sails and symbiotic fungal telepathy.'
  },
  {
    title: 'Ironclad Steampunk Trenches',
    theme: 'Steampunk',
    size: 'Medium',
    description: 'An endless subterranean warzone of brass steam-mechs, clockwork airships, chemical trenches, and geothermal volcanic mines.'
  }
];
