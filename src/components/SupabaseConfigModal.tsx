import React, { useState } from 'react';
import { Database, Key, Check, ShieldCheck, RefreshCw, X, Radio } from 'lucide-react';
import { SUPABASE_URL, getSavedSupabaseKey, saveSupabaseKey } from '../lib/supabaseClient';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  isConnected,
}) => {
  const [apiKey, setApiKey] = useState(getSavedSupabaseKey() || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveSupabaseKey(apiKey);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#14151a] border border-[#2d313d] rounded-2xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#252833] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#3ECF8E]/15 border border-[#3ECF8E]/40 text-[#3ECF8E]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-mono font-bold text-sm tracking-wide flex items-center gap-2">
                SUPABASE REALTIME CONFIG
                <span className={`text-[10px] px-2 py-0.5 rounded font-black ${isConnected ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40' : 'bg-[#FF3333]/20 text-[#FF3333] border border-[#FF3333]/40'}`}>
                  {isConnected ? 'ONLINE' : 'ACTIVE'}
                </span>
              </h2>
              <p className="text-[#8a91a0] text-xs font-mono">
                Project Realtime stance synchronization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7c8494] hover:text-white hover:bg-[#20232c] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project URL Readonly */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-[#a0a8b8] flex items-center gap-1.5 font-bold">
            <Radio className="w-3.5 h-3.5 text-[#3ECF8E]" />
            SUPABASE PROJECT URL
          </label>
          <div className="p-2.5 rounded-xl bg-[#0d0e12] border border-[#282b36] font-mono text-xs text-[#00FF66] select-all flex items-center justify-between">
            <span>{SUPABASE_URL}</span>
            <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
          </div>
        </div>

        {/* Publishable / Anon Key Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-[#a0a8b8] flex items-center gap-1.5 font-bold">
            <Key className="w-3.5 h-3.5 text-[#FFAA00]" />
            SUPABASE PUBLISHABLE KEY (ANON KEY)
          </label>
          <textarea
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your full Supabase anon / publishable key here..."
            rows={3}
            className="w-full p-2.5 rounded-xl bg-[#0d0e12] border border-[#282b36] focus:border-[#3ECF8E] focus:ring-1 focus:ring-[#3ECF8E] font-mono text-xs text-white placeholder-[#505663] resize-none outline-none"
          />
          <p className="text-[11px] text-[#6b7280] font-mono">
            Directly updates <code className="text-[#00FF66]">pro_count</code> and <code className="text-[#FF3333]">con_count</code> on the <code className="text-white">veto_posts</code> table in real time.
          </p>
        </div>

        {/* Real-time Status Card */}
        <div className="p-3 rounded-xl bg-[#1a1c24] border border-[#2d3240] text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
            <span className="text-[#b4bad0]">Realtime Broadcast Active</span>
          </div>
          <span className="text-[#00FF66] font-bold">postgres_changes (UPDATE)</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#252833]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1e212b] hover:bg-[#282c39] text-[#9ca3af] hover:text-white font-mono text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3ECF8E] hover:bg-[#34b77d] text-[#0d0e12] font-mono font-bold text-xs transition-all shadow-[0_0_15px_rgba(62,207,142,0.4)] cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>SAVED & CONNECTED</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>SAVE KEY & CONNECT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
