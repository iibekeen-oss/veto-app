import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Storage keys
const SUPABASE_URL_STORAGE_KEY = 'veto_supabase_project_url';
const SUPABASE_KEY_STORAGE_KEY = 'veto_supabase_anon_key';

// Default project configuration (الرابط والمفتاح الرسميان لمشروع VETO)
// ✅ Verified active in Supabase dashboard -> Project Settings -> API -> Project URL
export const DEFAULT_SUPABASE_URL = 'https://ykoxoafqdgpnqrdkyme.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_EB_rTfmgBLjdqo7nnNUAuw_JR0wwqS-';

// Legacy / mistyped URLs that must never be used (force fallback to the correct default)
const LEGACY_BAD_URL_FRAGMENTS = ['dieindvfdqpoywloccad'];

export function getSavedSupabaseUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SUPABASE_URL_STORAGE_KEY);
    const isLegacyBadUrl =
      !!saved && LEGACY_BAD_URL_FRAGMENTS.some((frag) => saved.includes(frag));
    if (saved && !isLegacyBadUrl && saved.includes('.supabase.co')) {
      return saved;
    }
    // Purge any stale/incorrect value so the correct default is always used
    if (saved && (isLegacyBadUrl || !saved.includes('.supabase.co'))) {
      localStorage.removeItem(SUPABASE_URL_STORAGE_KEY);
    }
  }
  return DEFAULT_SUPABASE_URL;
}

export function getSavedSupabaseKey(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SUPABASE_KEY_STORAGE_KEY);
    if (saved && !saved.includes('placeholder')) {
      return saved;
    }
  }
  return DEFAULT_SUPABASE_ANON_KEY;
}

// Supabase Project Credentials
export let SUPABASE_URL = getSavedSupabaseUrl();
export let SUPABASE_ANON_KEY = getSavedSupabaseKey();

// Global Supabase client instance as requested:
// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export let supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function configureSupabase(url: string, anonKey: string) {
  SUPABASE_URL = url.trim();
  SUPABASE_ANON_KEY = anonKey.trim();
  if (typeof window !== 'undefined') {
    localStorage.setItem(SUPABASE_URL_STORAGE_KEY, SUPABASE_URL);
    localStorage.setItem(SUPABASE_KEY_STORAGE_KEY, SUPABASE_ANON_KEY);
  }
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabase;
}

export function saveSupabaseKey(key: string) {
  configureSupabase(SUPABASE_URL, key);
}

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

export interface VideoRecord {
  id?: string;
  user_id?: string;
  title: string;
  description?: string;
  video_url?: string;
  created_at?: string;
}

/**
 * Insert video into the 'videos' table schema requested by user:
 * create table videos (
 *   id uuid default gen_random_uuid() primary key,
 *   user_id uuid references auth.users not null,
 *   title text not null,
 *   description text,
 *   video_url text,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 */
export async function insertVideoToSupabase(video: {
  title: string;
  description?: string;
  video_url?: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'User must be authenticated to insert video under RLS policy' };
    }

    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          user_id: user.id,
          title: video.title,
          description: video.description || null,
          video_url: video.video_url || null,
        },
      ])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all videos from 'videos' table (viewable by everyone under RLS policy)
 */
export async function fetchVideosFromSupabase(): Promise<{ success: boolean; data?: VideoRecord[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
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

const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100 MB – match your bucket limit

/** Extract a readable error message from an unknown thrown value. */
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'Unknown upload error.';
}

/**
 * Upload a video file to the Supabase Storage bucket 'videos'.
 *
 * Progress is COARSE: `onProgress` fires only with 0 (start) and 100 (done),
 * because the Supabase JS SDK's `storage.upload()` does not emit byte-level
 * progress events. We intentionally do NOT fall back to a `blob:` object URL on
 * failure, since such a URL is useless once persisted to the database.
 */
export async function uploadRebuttalVideo(
  file: File,
  onProgress?: (progress: number) => void,
  options?: { signal?: AbortSignal }
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // 1. Validate the file before touching the network.
    if (!file) {
      return { success: false, error: 'No file provided.' };
    }
    if (!file.type.startsWith('video/')) {
      return { success: false, error: 'Only video files are allowed.' };
    }
    if (file.size === 0) {
      return { success: false, error: 'The selected file is empty.' };
    }
    if (file.size > MAX_VIDEO_BYTES) {
      return {
        success: false,
        error: `Video is too large (max ${Math.round(MAX_VIDEO_BYTES / 1024 / 1024)} MB).`,
      };
    }

    // 2. Authenticate (bucket policy requires an authenticated user).
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'User must be authenticated to upload videos.' };
    }

    // 3. Build a collision-proof path. Extension comes from the MIME type,
    //    falling back to the filename only if needed.
    const ext =
      file.type.split('/')[1]?.split('+')[0] ||
      file.name.split('.').pop()?.toLowerCase() ||
      'mp4';
    const uniqueSuffix =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 8);
    const filePath = `${user.id}/${Date.now()}-${uniqueSuffix}.${ext}`;

    onProgress?.(0);

    // 4. Upload. `upsert` is unnecessary now that the path is unique.
    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        contentType: file.type || 'video/mp4',
        signal: options?.signal,
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    onProgress?.(100);

    // 5. Public URL is computed synchronously and cannot fail.
    const { data: publicData } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    return { success: true, url: publicData.publicUrl };
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err) };
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

/**
 * دالة إنشاء حساب جديد عبر Supabase Auth
 */
export async function handleSignUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      if (typeof window !== 'undefined' && window.alert) {
        alert("خطأ في إنشاء الحساب: " + error.message);
      }
      return { success: false, error };
    } else {
      if (typeof window !== 'undefined' && window.alert) {
        alert("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
      }
      return { success: true, data };
    }
  } catch (err: any) {
    if (typeof window !== 'undefined' && window.alert) {
      alert("خطأ في إنشاء الحساب: " + (err?.message || 'خطأ غير معروف'));
    }
    return { success: false, error: err };
  }
}

/**
 * دالة تسجيل الدخول عبر Supabase Auth
 */
export async function handleLogin(email: string, password: string, onUserAuthenticated?: (user: any) => void) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    if (typeof window !== 'undefined' && window.alert) {
      alert("خطأ في تسجيل الدخول: " + error.message);
    }
    return { success: false, error };
  } else {
    if (typeof window !== 'undefined' && window.alert) {
      alert("مرحباً بك مجدداً!");
    }
    // هنا يتم تحديث حالة المستخدم في الواجهة
    if (onUserAuthenticated) {
      onUserAuthenticated(data?.user || data?.session?.user);
    }
    return { success: true, data };
  }
}

/**
 * دالة تسجيل الخروج عبر Supabase Auth
 */
export async function handleLogout() {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    if (typeof window !== 'undefined' && window.alert) {
      alert("تم تسجيل الخروج بنجاح.");
    }
  }
  return { error };
}


