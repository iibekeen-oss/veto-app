import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Storage keys
const SUPABASE_URL_STORAGE_KEY = 'veto_supabase_project_url';
const SUPABASE_KEY_STORAGE_KEY = 'veto_supabase_anon_key';

// Default project configuration (محدد وفق رابط ومفتاح مشروعك)
export const DEFAULT_SUPABASE_URL = 'https://dieldnvdgqoywloczad.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_QLbsGQdXLVZutx_vcSieJg_05ec6';

export function getSavedSupabaseUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SUPABASE_URL_STORAGE_KEY);
    if (saved && !saved.includes('dieindvfdqpoywloccad')) {
      return saved;
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


