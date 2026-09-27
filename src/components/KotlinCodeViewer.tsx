import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';
import { KOTLIN_SOURCE_FILES } from '../data/mockData';

interface KotlinCodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KotlinCodeViewer: React.FC<KotlinCodeViewerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = KOTLIN_SOURCE_FILES[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    // Download current file as .kt
    const blob = new Blob([currentFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6">
      <div
        className="w-full max-w-5xl h-[88vh] bg-[#141416] rounded-2xl border border-[#2d2d32] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#1a1a1e] border-b border-[#2d2d32] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/30">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white font-bold text-base tracking-tight font-mono">
                  CODE INSPECTOR & VISUAL CANVAS
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2a2a30] text-[#00FF66] border border-[#00FF66]/40">
                  Compose + React Native
                </span>
              </div>
              <p className="text-[#8e8e93] text-xs">
                Production-grade @Composable functions, state management, and high-contrast dark gym theme
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#242428] hover:bg-[#2e2e34] text-white text-xs font-mono font-medium transition-all border border-[#3a3a42] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span className="text-[#00FF66]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#b0b0b0]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF66] hover:bg-[#00FF66]/90 text-[#121212] text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(0,255,102,0.4)] cursor-pointer"
              title="Download file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save .kt</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8e8e93] hover:text-white hover:bg-[#25252a] transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* File Navigator Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#121214] border-b border-[#252528] overflow-x-auto scrollbar-none">
          {KOTLIN_SOURCE_FILES.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => setActiveFileIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeFileIndex === idx
                  ? 'bg-[#222226] text-[#00FF66] font-bold border border-[#00FF66]/40 shadow-sm'
                  : 'text-[#888888] hover:text-white hover:bg-[#1a1a1d]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        {/* File Meta bar */}
        <div className="px-6 py-2 bg-[#161619] border-b border-[#222226] flex items-center justify-between text-xs text-[#8e8e93] font-mono">
          <span>Path: {currentFile.path}</span>
          <span className="text-[#a0a0a0]">{currentFile.description}</span>
        </div>

        {/* Code Editor Body */}
        <div className="flex-1 overflow-auto bg-[#0d0d0f] p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed select-text">
          <pre className="text-[#e2e8f0]">
            <code>{currentFile.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
