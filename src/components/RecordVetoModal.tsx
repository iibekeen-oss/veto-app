import React, { useState, useRef } from 'react';
import { X, Flame, Video, CheckCircle, AlertCircle, Upload, Loader2, Database } from 'lucide-react';
import { VetoPost, Stance } from '../types';
import { insertRebuttalToSupabase, uploadRebuttalVideo, insertVideoToSupabase } from '../lib/supabaseClient';
import { nutritionImg, deadliftImg } from '../assets/images';

interface RecordVetoModalProps {
  currentRoundsCount: number;
  onClose: () => void;
  onSubmit: (newPost: VetoPost) => void;
}

export const RecordVetoModal: React.FC<RecordVetoModalProps> = ({
  currentRoundsCount,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('BIOMECHANICS');
  const [stance, setStance] = useState<Stance>('CON'); // Rebuttal is oppositional
  const [recordedDuration, setRecordedDuration] = useState('0:45');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const newRound = currentRoundsCount; // Next round number

  // Handle local video selection
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setRecordedDuration('0:30');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSyncStatus('Uploading video to Supabase Storage...');

    let publicVideoUrl = '';

    // 1. Upload video to Supabase Storage bucket 'rebuttals' if file selected
    if (videoFile) {
      const uploadRes = await uploadRebuttalVideo(videoFile);
      if (uploadRes.url) {
        publicVideoUrl = uploadRes.url;
      }
    }

    setSyncStatus('Inserting rebuttal into Supabase debates/veto_posts...');

    // 2. Insert new record into 'debates' or 'veto_posts' table with exact specified schema:
    // - title: Rebuttal Headline text
    // - content: Kinetic Thesis text
    // - category: Selected category (BIOMECHANICS)
    // - veto_level: 3
    // - is_opposition: true
    const supabaseResult = await insertRebuttalToSupabase({
      title: title.trim(),
      content: summary.trim(),
      category: category.toUpperCase(),
      veto_level: 3,
      is_opposition: true,
      video_url: publicVideoUrl,
      pro_count: 1,
      con_count: 0,
    });

    // Also populate the requested 'videos' table if a video was included and user is authenticated
    if (publicVideoUrl || videoFile) {
      await insertVideoToSupabase({
        title: title.trim(),
        description: summary.trim(),
        video_url: publicVideoUrl || undefined,
      }).catch(() => null);
    }

    const generatedId = supabaseResult.data?.id || `post-${Date.now()}`;

    // 3. Construct local post for immediate feed presentation and refresh
    const newPost: VetoPost = {
      id: String(generatedId),
      round: newRound,
      creatorName: 'Alex Miller (You)',
      handle: '@alex_lifts',
      avatarInitial: 'A',
      title: title.trim(),
      summary: summary.trim(),
      videoDuration: recordedDuration,
      category: category.toUpperCase(),
      debateTopic: 'BENCH PRESS INTEGRITY',
      image:
        videoPreviewUrl ||
        (newRound % 2 === 0 ? nutritionImg : deadliftImg),
      proCount: 1,
      conCount: 0,
      userStance: 'PRO',
      comments: [
        {
          id: `c-init-${Date.now()}`,
          author: 'Alex Miller (You)',
          handle: '@alex_lifts',
          content: 'Kinetic Thesis & Rebuttal logged to Supabase. Floor opened for cross-examination!',
          stance: 'PRO',
          timestamp: 'Just now',
          likes: 1,
          userLiked: true,
        },
      ],
    };

    setSyncStatus('Rebuttal synchronized successfully!');
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(newPost);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div
        className="w-full max-w-lg bg-[#18181a] rounded-2xl border-2 border-[#FF3333] shadow-[0_0_30px_rgba(255,51,51,0.3)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#28282b] flex items-center justify-between bg-[#1f1f23]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#FF3333]/20 text-[#FF3333] border border-[#FF3333]/40">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm tracking-tight">
                  SUBMIT VETO REBUTTAL
                </h3>
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#FF3333]/20 text-[#FF3333] border border-[#FF3333]">
                  VETO {newRound}
                </span>
              </div>
              <p className="text-[#8e8e93] text-xs font-mono">
                Supabase Realtime Sync: veto_level: 3 · is_opposition: true
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 rounded-full text-[#8e8e93] hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Stance Notice */}
          <div className="p-3 rounded-xl bg-[#FF3333]/10 border border-[#FF3333]/30 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#FF3333] shrink-0 mt-0.5" />
            <div className="flex-1 text-xs text-[#dddddd] leading-relaxed">
              Submitting as <strong className="text-[#FF3333]">VETO {newRound}</strong> with{' '}
              <strong className="text-[#3ECF8E]">veto_level = 3</strong> &{' '}
              <strong className="text-[#FF3333]">is_opposition = true</strong> into Supabase{' '}
              <code className="text-[#3ECF8E] font-mono">debates / veto_posts</code>.
            </div>
          </div>

          {/* Title / Headline */}
          <div>
            <label className="block text-xs font-bold text-[#b0b0b0] uppercase font-mono mb-1.5">
              Rebuttal Headline
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Counter: EMG Data Disproves The Touch-and-Go Rebound"
              className="w-full bg-[#121212] border border-[#333336] focus:border-[#FF3333] focus:ring-1 focus:ring-[#FF3333] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-[#666666] outline-none transition-all disabled:opacity-60"
            />
          </div>

          {/* Kinetic Thesis & Argument */}
          <div>
            <label className="block text-xs font-bold text-[#b0b0b0] uppercase font-mono mb-1.5">
              Kinetic Thesis & Argument (Content)
            </label>
            <textarea
              required
              rows={3}
              disabled={isSubmitting}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Explain the anatomical, physiological, or technical reason why the previous thesis fails..."
              className="w-full bg-[#121212] border border-[#333336] focus:border-[#FF3333] focus:ring-1 focus:ring-[#FF3333] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-[#666666] outline-none transition-all resize-none disabled:opacity-60"
            />
          </div>

          {/* Category & Video Storage Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#b0b0b0] uppercase font-mono mb-1.5">
                Category
              </label>
              <select
                value={category}
                disabled={isSubmitting}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#121212] border border-[#333336] text-white text-xs font-mono rounded-xl px-3 py-2.5 outline-none focus:border-[#FF3333]"
              >
                <option value="BIOMECHANICS">BIOMECHANICS</option>
                <option value="KINESIOLOGY">KINESIOLOGY</option>
                <option value="SPORTS PHYSIO">SPORTS PHYSIO</option>
                <option value="POWERLIFTING">POWERLIFTING</option>
                <option value="HYPERTROPHY">HYPERTROPHY</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#b0b0b0] uppercase font-mono mb-1.5">
                Video Storage (Bucket: 'rebuttals')
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="video/*"
                className="hidden"
                onChange={handleVideoSelect}
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-between bg-[#121212] hover:bg-[#1f1f23] border border-[#333336] hover:border-[#3ECF8E]/60 rounded-xl px-3 py-2 text-xs font-mono transition-colors cursor-pointer"
              >
                <span className="text-[#00FF66] flex items-center gap-1.5 truncate">
                  <Upload className="w-3.5 h-3.5 text-[#3ECF8E]" />
                  {videoFile ? videoFile.name : 'Upload Rebuttal MP4'}
                </span>
                <span className="text-[10px] text-[#8e8e93] shrink-0 ml-1">
                  {videoFile ? `${(videoFile.size / (1024 * 1024)).toFixed(1)}MB` : recordedDuration}
                </span>
              </button>
            </div>
          </div>

          {/* Sync status indicator */}
          {syncStatus && (
            <div className="p-2.5 rounded-xl bg-[#141816] border border-[#3ECF8E]/40 text-xs font-mono text-[#3ECF8E] flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0 animate-pulse" />
              <span>{syncStatus}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#28282b]">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#8e8e93] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#FF3333] hover:bg-[#FF3333]/90 text-white font-bold text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(255,51,51,0.5)] transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>POSTING TO SUPABASE...</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5" />
                  <span>POST VETO REBUTTAL</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
