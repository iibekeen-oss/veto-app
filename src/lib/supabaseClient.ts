import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Supabase Project Credentials
export const SUPABASE_URL = 'https://dieindvfdqpoywloccad.supabase.co';

// Local storage key for custom user-pasted key
const SUPABASE_STORAGE_KEY = 'veto_supabase_anon_key';

// Default / initial anon key (can be replaced in UI settings or via prompt)
export const DEFAULT_SUPABASE_ANON_KEY =
  (typeof window !== 'undefined' && localStorage.getItem(SUPABASE_STORAGE_KEY)) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export function getSavedSupabaseKey(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(SUPABASE_STORAGE_KEY) || '';
  }
  return '';
}

export function saveSupabaseKey(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SUPABASE_STORAGE_KEY, key.trim());
    supabase = createClient(SUPABASE_URL, key.trim());
  }
}

// Global Supabase client instance
export let supabase = createClient(SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY);

export interface SupabasePost {
  id: string;
  title: string;
  content?: string;
  category?: string;
  veto_level?: number;
  is_opposition?: boolean;
  video_url?: string;
  pro_count: number;
  con_count: number;
  updated_at?: string;
  created_at?: string;
}

export interface StanceUpdateResult {
  success: boolean;
  pro_count: number;
  con_count: number;
  error?: string;
  isMockFallback?: boolean;
}

export interface RebuttalInsertPayload {
  title: string;
  content: string;
  category: string;
  veto_level: number;
  is_opposition: boolean;
  video_url?: string;
  pro_count?: number;
  con_count?: number;
}

/**
 * Upload video file to Supabase Storage bucket 'rebuttals'
 */
export async function uploadRebuttalVideo(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop() || 'mp4';
    const fileName = `rebuttal_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `videos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('rebuttals')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.warn('Supabase storage upload error:', uploadError.message);
      // Fallback object URL
      return { success: false, url: URL.createObjectURL(file), error: uploadError.message };
    }

    const { data: publicData } = supabase.storage
      .from('rebuttals')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicData?.publicUrl || URL.createObjectURL(file),
    };
  } catch (err: any) {
    console.warn('Storage upload fallback:', err.message);
    return { success: false, url: URL.createObjectURL(file), error: err.message };
  }
}

/**
 * Insert a new Rebuttal record into Supabase table ('debates' or fallback 'veto_posts')
 * with:
 * - title: Rebuttal Headline text
 * - content: Kinetic Thesis text
 * - category: Selected category (e.g. BIOMECHANICS)
 * - veto_level: 3
 * - is_opposition: true
 * - pro_count: 1
 * - con_count: 0
 */
export async function insertRebuttalToSupabase(payload: RebuttalInsertPayload): Promise<{
  success: boolean;
  data?: any;
  error?: string;
  tableName: string;
}> {
  const record = {
    title: payload.title,
    content: payload.content,
    category: payload.category,
    veto_level: payload.veto_level,
    is_opposition: payload.is_opposition,
    video_url: payload.video_url || null,
    pro_count: payload.pro_count ?? 1,
    con_count: payload.con_count ?? 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 1. First attempt inserting into 'debates' table
  try {
    const { data, error } = await supabase
      .from('debates')
      .insert([record])
      .select();

    if (!error && data) {
      return { success: true, data: data[0], tableName: 'debates' };
    }
  } catch (e) {
    // Continue to fallback
  }

  // 2. Second attempt inserting into 'veto_posts' table
  try {
    const { data, error } = await supabase
      .from('veto_posts')
      .insert([record])
      .select();

    if (!error && data) {
      return { success: true, data: data[0], tableName: 'veto_posts' };
    }

    return {
      success: false,
      error: error?.message || 'Database insert fallback',
      tableName: 'veto_posts',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
      tableName: 'veto_posts',
    };
  }
}

/**
 * Fetch latest posts / debates from Supabase table
 */
export async function fetchFeedFromSupabase(): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    // Try debates table first
    const { data: debateData, error: debateErr } = await supabase
      .from('debates')
      .select('*')
      .order('created_at', { ascending: false });

    if (!debateErr && debateData && debateData.length > 0) {
      return { success: true, data: debateData };
    }

    // Try veto_posts table
    const { data: postsData, error: postsErr } = await supabase
      .from('veto_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!postsErr && postsData && postsData.length > 0) {
      return { success: true, data: postsData };
    }

    return { success: false, error: postsErr?.message || debateErr?.message };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

/**
 * Update both PRO count and CON count simultaneously in Supabase 'veto_posts' or 'debates' table
 * and select the updated row for real-time verification.
 */
export async function updateStanceCountsInSupabase(
  postId: string,
  newProCount: number,
  newConCount: number
): Promise<StanceUpdateResult> {
  const updatePayload = {
    pro_count: newProCount,
    con_count: newConCount,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('veto_posts')
      .update(updatePayload)
      .eq('id', postId)
      .select();

    if (!error) {
      return {
        success: true,
        pro_count: data && data[0]?.pro_count !== undefined ? data[0].pro_count : newProCount,
        con_count: data && data[0]?.con_count !== undefined ? data[0].con_count : newConCount,
      };
    }
  } catch (e) {
    // Continue
  }

  // Also sync with debates if exists
  try {
    await supabase.from('debates').update(updatePayload).eq('id', postId);
  } catch (e) {
    // Ignore
  }

  return {
    success: true,
    pro_count: newProCount,
    con_count: newConCount,
    isMockFallback: true,
  };
}

/**
 * Subscribe to realtime stance counter updates for veto_posts and debates
 */
export function subscribeToStanceUpdates(
  onUpdate: (payload: { id: string; pro_count?: number; con_count?: number }) => void
): RealtimeChannel {
  return supabase
    .channel('veto_posts_realtime_stance')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'veto_posts' },
      (payload) => {
        if (payload.new) {
          const rec: any = payload.new;
          onUpdate({
            id: rec.id,
            pro_count: rec.pro_count,
            con_count: rec.con_count,
          });
        }
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'debates' },
      (payload) => {
        if (payload.new) {
          const rec: any = payload.new;
          onUpdate({
            id: rec.id,
            pro_count: rec.pro_count,
            con_count: rec.con_count,
          });
        }
      }
    )
    .subscribe();
}
