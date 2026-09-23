import { GameWorld } from '../types';
import { jsPDF } from 'jspdf';

export function downloadJsonFile(world: GameWorld): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(world, null, 2));
  const downloadAnchor = document.createElement('a');
  const sanitizedName = world.world_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${sanitizedName || 'game-world'}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function downloadMarkdownFile(world: GameWorld): void {
  let md = `# 🌍 ${world.world_name}\n\n`;
  md += `**Theme:** ${world.theme} | **Scale:** ${world.size}\n\n`;
  md += `## Overview\n${world.description}\n\n`;
  if (world.climate_summary) {
    md += `### Atmosphere & Climate\n${world.climate_summary}\n\n`;
  }

  md += `## 🗺️ Regions (${world.regions.length})\n\n`;
  world.regions.forEach((r, idx) => {
    md += `### ${idx + 1}. ${r.name} (${r.type})\n`;
    md += `- **Danger Level:** ${r.danger_level}/10\n`;
    md += `- **Biome:** ${r.biome}\n`;
    md += `- **Landmark:** ${r.landmark}\n`;
    md += `- **Coordinates:** X: ${r.x}%, Y: ${r.y}%\n`;
    md += `- **Description:** ${r.description}\n\n`;
  });

  md += `## 🧑 Characters & Factions (${world.characters.length})\n\n`;
  world.characters.forEach((c) => {
    md += `### ${c.name} - *${c.role}*\n`;
    md += `- **Location:** ${c.region}\n`;
    if (c.personality) md += `- **Personality:** ${c.personality}\n`;
    md += `- **Description:** ${c.description}\n\n`;
  });

  md += `## 👾 Enemies & Monsters (${world.enemies.length})\n\n`;
  world.enemies.forEach((e) => {
    md += `### ${e.name} [Tier ${e.difficulty}/10]\n`;
    md += `- **Type:** ${e.type}\n`;
    md += `- **Spawn Territory:** ${e.spawn_region}\n`;
    if (e.weakness) md += `- **Weakness:** ${e.weakness}\n`;
    if (e.loot) md += `- **Loot Drop:** ${e.loot}\n`;
    md += `- **Description:** ${e.description}\n\n`;
  });

  md += `## ⚔️ Quests & Missions (${world.quests.length})\n\n`;
  world.quests.forEach((q) => {
    md += `### ${q.title}\n`;
    md += `- **Quest Giver:** ${q.quest_giver}\n`;
    md += `- **Target Location:** ${q.target_region}\n`;
    md += `- **Reward:** ${q.reward}\n`;
    md += `- **Objective:** ${q.description}\n\n`;
  });

  md += `## 🎒 Artifacts & Gear (${world.items.length})\n\n`;
  world.items.forEach((it) => {
    md += `### ${it.name} [${it.rarity}]\n`;
    md += `- **Type:** ${it.type}\n`;
    if (it.origin_region) md += `- **Origin:** ${it.origin_region}\n`;
    md += `- **Description:** ${it.description}\n\n`;
  });

  md += `## 📜 Lore & Ancient History (${world.lore.length})\n\n`;
  world.lore.forEach((l, idx) => {
    if (typeof l === 'string') {
      md += `### Chronicle ${idx + 1}\n${l}\n\n`;
    } else {
      md += `### ${l.title || `Chronicle ${idx + 1}`}\n${l.text}\n\n`;
    }
  });

  const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
  const downloadAnchor = document.createElement('a');
  const sanitizedName = world.world_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${sanitizedName || 'game-world'}.md`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function downloadPdfFile(world: GameWorld): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(`WorldForge AI — ${world.world_name} Game World Report`, margin, y);
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 8;
  };

  // Cover / Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'F');

  doc.setTextColor(245, 158, 11); // amber-500
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('WORLDFORGE AI • GAME DESIGN DOCUMENT', margin + 6, y + 8);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(world.world_name, margin + 6, y + 18);

  doc.setTextColor(203, 213, 225); // slate-300
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Theme: ${world.theme}   |   Scale: ${world.size}   |   Generated: ${new Date().toLocaleDateString()}`, margin + 6, y + 26);

  y += 40;

  // Section: World Overview
  checkPageBreak(30);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('1. World Premise & Overview', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const overviewLines = doc.splitTextToSize(world.description, contentWidth);
  checkPageBreak(overviewLines.length * 4.5 + 4);
  doc.text(overviewLines, margin, y);
  y += overviewLines.length * 4.5 + 3;

  if (world.climate_summary) {
    checkPageBreak(15);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    const climateLines = doc.splitTextToSize(`Atmosphere: ${world.climate_summary}`, contentWidth);
    doc.text(climateLines, margin, y);
    y += climateLines.length * 4.5 + 4;
  }

  // Section: Regions
  y += 3;
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(`2. Key Regions & Territories (${world.regions.length})`, margin, y);
  y += 6;

  world.regions.forEach((r, idx) => {
    checkPageBreak(28);
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${idx + 1}. ${r.name} [${r.type}]`, margin + 3, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 83, 9); // amber-700
    doc.text(`Danger Level: ${r.danger_level}/10   |   Biome: ${r.biome}   |   Coord: (${r.x}%, ${r.y}%)`, margin + 3, y + 10);

    doc.setTextColor(71, 85, 105);
    const desc = r.description.length > 140 ? r.description.substring(0, 137) + '...' : r.description;
    doc.text(desc, margin + 3, y + 15, { maxWidth: contentWidth - 6 });

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(`Landmark: ${r.landmark}`, margin + 3, y + 19, { maxWidth: contentWidth - 6 });

    y += 25;
  });

  // Section: Characters & Factions
  if (world.characters && world.characters.length > 0) {
    y += 2;
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`3. Characters & Factions (${world.characters.length})`, margin, y);
    y += 6;

    world.characters.forEach((c) => {
      checkPageBreak(20);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`${c.name} — ${c.role}`, margin + 3, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(3, 105, 161); // sky-700
      doc.text(`Region: ${c.region}${c.personality ? `   |   Disposition: ${c.personality}` : ''}`, margin + 3, y + 9.5);

      doc.setTextColor(71, 85, 105);
      const desc = c.description.length > 150 ? c.description.substring(0, 147) + '...' : c.description;
      doc.text(desc, margin + 3, y + 14, { maxWidth: contentWidth - 6 });

      y += 21;
    });
  }

  // Section: Enemies & Hostiles
  if (world.enemies && world.enemies.length > 0) {
    y += 2;
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`4. Hostile Bestiary (${world.enemies.length})`, margin, y);
    y += 6;

    world.enemies.forEach((e) => {
      checkPageBreak(20);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(185, 28, 28); // red-700
      doc.text(`${e.name} [Tier ${e.difficulty}/10 Threat] — ${e.type}`, margin + 3, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Lair: ${e.spawn_region}${e.weakness ? `   |   Weakness: ${e.weakness}` : ''}`, margin + 3, y + 9.5);

      const desc = e.description.length > 140 ? e.description.substring(0, 137) + '...' : e.description;
      doc.text(desc, margin + 3, y + 14, { maxWidth: contentWidth - 6 });

      y += 21;
    });
  }

  // Section: Quests
  if (world.quests && world.quests.length > 0) {
    y += 2;
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`5. Campaign Quests & Missions (${world.quests.length})`, margin, y);
    y += 6;

    world.quests.forEach((q) => {
      checkPageBreak(20);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(q.title, margin + 3, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(180, 83, 9);
      doc.text(`Giver: ${q.quest_giver}   |   Destination: ${q.target_region}   |   Bounty: ${q.reward}`, margin + 3, y + 9.5);

      doc.setTextColor(71, 85, 105);
      const desc = q.description.length > 150 ? q.description.substring(0, 147) + '...' : q.description;
      doc.text(desc, margin + 3, y + 14, { maxWidth: contentWidth - 6 });

      y += 21;
    });
  }

  // Section: Items & Relics
  if (world.items && world.items.length > 0) {
    y += 2;
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`6. Notable Artifacts & Items (${world.items.length})`, margin, y);
    y += 6;

    world.items.forEach((it) => {
      checkPageBreak(18);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 15, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${it.name} [${it.rarity} ${it.type}]`, margin + 3, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const desc = it.description.length > 150 ? it.description.substring(0, 147) + '...' : it.description;
      doc.text(desc, margin + 3, y + 9.5, { maxWidth: contentWidth - 6 });

      y += 18;
    });
  }

  // Section: Lore & Chronicles
  if (world.lore && world.lore.length > 0) {
    y += 2;
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`7. Ancient Lore & Chronicles (${world.lore.length})`, margin, y);
    y += 6;

    world.lore.forEach((l, idx) => {
      const isObj = typeof l !== 'string';
      const title = isObj ? (l.title || `Chronicle ${idx + 1}`) : `Chronicle ${idx + 1}`;
      const text = isObj ? l.text : l;

      checkPageBreak(22);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(title, margin, y);
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(text, contentWidth);
      checkPageBreak(lines.length * 4.5);
      doc.text(lines, margin, y);
      y += lines.length * 4.5 + 4;
    });
  }

  // Page Numbers Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 8);
    doc.text('Generated by WorldForge AI Game World Studio', margin, pageHeight - 8);
  }

  const sanitizedName = world.world_name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  doc.save(`${sanitizedName || 'game-world'}-report.pdf`);
}

