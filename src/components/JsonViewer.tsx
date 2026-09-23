import React, { useState } from 'react';
import { Code2, Copy, Check, Download, Upload, AlertCircle, FileText } from 'lucide-react';
import { GameWorld } from '../types';
import { downloadJsonFile, downloadPdfFile } from '../utils/exportUtils';

interface JsonViewerProps {
  world: GameWorld;
  onImportWorld?: (world: GameWorld) => void;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ world, onImportWorld }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [showImport, setShowImport] = useState<boolean>(false);
  const [importText, setImportText] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);

  const jsonString = JSON.stringify(world, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    try {
      setIsExportingPdf(true);
      downloadPdfFile(world);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDoImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importText);
      if (!parsed.world_name || !Array.isArray(parsed.regions)) {
        throw new Error("JSON must include at least 'world_name' and 'regions' array.");
      }
      if (onImportWorld) {
        onImportWorld(parsed);
        setShowImport(false);
        setImportText('');
      }
    } catch (err: any) {
      setImportError(err.message || 'Invalid JSON format');
    }
  };

  return (
    <div id="json-viewer-container" className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div>
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            Generated Game World Schema (JSON)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full structured game data ready for engine export (Godot, Unity, Unreal, or Web).
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            id="btn-download-pdf"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 text-xs font-semibold border border-red-500/30 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            title="Download printable Game Design Report as PDF"
          >
            <FileText className="w-3.5 h-3.5 text-red-400" />
            <span>{isExportingPdf ? 'Exporting PDF...' : 'Download as PDF'}</span>
          </button>

          <button
            id="btn-copy-json"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            id="btn-download-json-inner"
            onClick={() => downloadJsonFile(world)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .json</span>
          </button>

          <button
            id="btn-toggle-import-json"
            onClick={() => setShowImport(!showImport)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
          </button>
        </div>
      </div>

      {/* Import Drawer */}
      {showImport && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Paste Game World JSON to Load & Map</span>
            <button 
              onClick={() => setShowImport(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>
          {importError && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{importError}</span>
            </div>
          )}
          <textarea
            rows={5}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste raw JSON here..."
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <button
            onClick={handleDoImport}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
          >
            Load into World Studio
          </button>
        </div>
      )}

      {/* Code Display */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-2xl">
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="font-mono text-[11px] text-slate-400 ml-2">world_data.json</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {jsonString.split('\n').length} lines
          </span>
        </div>

        <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-400/90 leading-relaxed max-h-[600px] select-text">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
