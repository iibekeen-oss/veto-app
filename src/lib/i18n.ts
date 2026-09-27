import { AppLanguage } from '../types';

export interface Translations {
  // Required keys requested by user
  login: string;
  signup: string;
  email: string;
  password: string;
  settings: string;
  language: string;
  logout: string;
  profile: string;

  // Additional comprehensive UI keys
  appName: string;
  appSubtitle: string;
  allFilter: string;
  veto0Filter: string;
  rebuttalsFilter: string;
  recordVetoBtn: string;
  proStance: string;
  conStance: string;
  commentsTitle: string;
  addCommentPlaceholder: string;
  sendComment: string;
  cancel: string;
  confirm: string;
  rememberMe: string;
  demoLogin: string;
  guestUser: string;
  account: string;
  close: string;
  supabaseSettings: string;
  switchLanguageNotice: string;
  welcomeBack: string;
  accountCreated: string;
  loggedOutMsg: string;
  inputRequired: string;
  round: string;
  stanceBreakdown: string;
  interceptionActive: string;
  totalVotes: string;
  verifiedAthlete: string;
  fullScreenFeed: string;
  phoneMockup: string;
  codeInspector: string;
}

// النصوص الافتراضية والترجمات كما حددها المستخدم
export const translations: Record<'syr' | 'en' | 'ar', Translations> = {
  syr: {
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب جديد',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    settings: 'الإعدادات',
    language: 'لغة التطبيق',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',

    // UI translations
    appName: 'فيتو',
    appSubtitle: 'بطاقة الفيتو الحاسمة للنقاش الرياضي',
    allFilter: 'الكل',
    veto0Filter: 'فيتو-0 التأسيسي',
    rebuttalsFilter: 'الردود التكتيكية',
    recordVetoBtn: 'سجل رد فيتو',
    proStance: 'مع (PRO)',
    conStance: 'ضد (CON)',
    commentsTitle: 'غرفة النقاش الرياضي',
    addCommentPlaceholder: 'أضف دليلك العلمي أو الرياضي...',
    sendComment: 'نشر التعليق',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    rememberMe: 'تذكرني على هذا الجهاز',
    demoLogin: 'دخول سريع بحساب تجريبي',
    guestUser: 'رياضي ضيف',
    account: 'الملف الشخصي',
    close: 'إغلاق',
    supabaseSettings: 'إعدادات قاعدة بيانات سوبابيس',
    switchLanguageNotice: 'تم تغيير لغة التطبيق إلى العربية بنجاح',
    welcomeBack: 'مرحباً بك مجدداً في VETO!',
    accountCreated: 'تم إنشاء حسابك الجديد بنجاح!',
    loggedOutMsg: 'تم تسجيل الخروج بنجاح',
    inputRequired: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
    round: 'الجولة',
    stanceBreakdown: 'مؤشر حسم النقاش',
    interceptionActive: 'اعتراض تكتيكي نشط',
    totalVotes: 'إجمالي الأصوات',
    verifiedAthlete: 'رياضي موثق',
    fullScreenFeed: 'عرض ملء الشاشة',
    phoneMockup: 'محاكي الهاتف',
    codeInspector: 'فاحص كود كوتلن',
  },
  ar: {
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب جديد',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    settings: 'الإعدادات',
    language: 'لغة التطبيق',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',

    // UI translations
    appName: 'فيتو',
    appSubtitle: 'بطاقة الفيتو الحاسمة للنقاش الرياضي',
    allFilter: 'الكل',
    veto0Filter: 'فيتو-0 التأسيسي',
    rebuttalsFilter: 'الردود التكتيكية',
    recordVetoBtn: 'سجل رد فيتو',
    proStance: 'مع (PRO)',
    conStance: 'ضد (CON)',
    commentsTitle: 'غرفة النقاش الرياضي',
    addCommentPlaceholder: 'أضف دليلك العلمي أو الرياضي...',
    sendComment: 'نشر التعليق',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    rememberMe: 'تذكرني على هذا الجهاز',
    demoLogin: 'دخول سريع بحساب تجريبي',
    guestUser: 'رياضي ضيف',
    account: 'الملف الشخصي',
    close: 'إغلاق',
    supabaseSettings: 'إعدادات قاعدة بيانات سوبابيس',
    switchLanguageNotice: 'تم تغيير لغة التطبيق إلى العربية بنجاح',
    welcomeBack: 'مرحباً بك مجدداً في VETO!',
    accountCreated: 'تم إنشاء حسابك الجديد بنجاح!',
    loggedOutMsg: 'تم تسجيل الخروج بنجاح',
    inputRequired: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
    round: 'الجولة',
    stanceBreakdown: 'مؤشر حسم النقاش',
    interceptionActive: 'اعتراض تكتيكي نشط',
    totalVotes: 'إجمالي الأصوات',
    verifiedAthlete: 'رياضي موثق',
    fullScreenFeed: 'عرض ملء الشاشة',
    phoneMockup: 'محاكي الهاتف',
    codeInspector: 'فاحص كود كوتلن',
  },
  en: {
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    settings: 'Settings',
    language: 'App Language',
    logout: 'Log Out',
    profile: 'Profile',

    // UI translations
    appName: 'VETO',
    appSubtitle: 'ABSOLUTE VETO CARD - KINETIC GYM DEBATE',
    allFilter: 'ALL',
    veto0Filter: 'VETO-0 ONLY',
    rebuttalsFilter: 'REBUTTALS',
    recordVetoBtn: 'RECORD VETO',
    proStance: 'PRO',
    conStance: 'CON',
    commentsTitle: 'Gym Debate Floor',
    addCommentPlaceholder: 'Add kinetic argument or biomechanical proof...',
    sendComment: 'Post Comment',
    cancel: 'Cancel',
    confirm: 'Confirm',
    rememberMe: 'Remember me on this device',
    demoLogin: 'Quick Demo Athlete Login',
    guestUser: 'Guest Athlete',
    account: 'Profile',
    close: 'Close',
    supabaseSettings: 'Supabase Real-Time Settings',
    switchLanguageNotice: 'App language switched to English',
    welcomeBack: 'Welcome back to VETO!',
    accountCreated: 'Account created successfully!',
    loggedOutMsg: 'Logged out successfully',
    inputRequired: 'Please enter both email and password',
    round: 'ROUND',
    stanceBreakdown: 'STANCE BREAKDOWN',
    interceptionActive: 'TACTICAL INTERCEPTION ACTIVE',
    totalVotes: 'TOTAL VOTES',
    verifiedAthlete: 'VERIFIED ATHLETE',
    fullScreenFeed: 'Full Screen Feed',
    phoneMockup: 'Phone Mockup View',
    codeInspector: 'Kotlin Code Inspector',
  },
};

// Aliases for compatibility
export const DICTIONARY = translations;

export const LANGUAGE_STORAGE_KEY = 'app_lang';
export const AUTH_USER_STORAGE_KEY = 'veto_auth_user';

// Current language initialization as specified by user
export let currentLang: AppLanguage = (typeof window !== 'undefined'
  ? ((localStorage.getItem('app_lang') || localStorage.getItem('veto_app_language') || 'syr') as AppLanguage)
  : 'syr');

// Helper functions according to user snippet
export function changeLanguage(lang: AppLanguage) {
  currentLang = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('app_lang', lang);
    localStorage.setItem('veto_app_language', lang);
    updateUI();
  }
}

export function t(key: string): string {
  const activeDict = translations[currentLang] || translations.syr;
  return (activeDict as any)[key] || (translations.en as any)[key] || key;
}

// تحديث النصوص في الواجهة
export function updateUI() {
  if (typeof document !== 'undefined') {
    // تحديث خيار القائمة المنسدلة إن وجدت
    const langSelect = document.getElementById('langSelect') as HTMLSelectElement | null;
    if (langSelect && langSelect.value !== currentLang) {
      langSelect.value = currentLang;
    }

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        (element as HTMLElement).innerText = t(key);
      }
    });

    // ضبط اتجاه الصفحة حسب اللغة (السريانية/العربية من اليمين لليسار والعنجليزية من اليسار لليمين)
    const isRtl = currentLang === 'syr' || currentLang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang === 'syr' ? 'ar-SY' : currentLang;
  }
}

export function getInitialLanguage(): AppLanguage {
  if (typeof window !== 'undefined') {
    const saved = (localStorage.getItem('app_lang') || localStorage.getItem('veto_app_language')) as AppLanguage | null;
    if (saved === 'syr' || saved === 'ar' || saved === 'en') {
      return saved;
    }
  }
  return 'syr';
}

export function saveLanguage(lang: AppLanguage): void {
  changeLanguage(lang);
}

export function getSavedAuthUser() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // Fallback
      }
    }
  }
  return null;
}

export function saveAuthUser(user: any) {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    }
  }
}

// Global browser script registration
if (typeof window !== 'undefined') {
  (window as any).translations = translations;
  (window as any).changeLanguage = changeLanguage;
  (window as any).t = t;
  (window as any).updateUI = updateUI;
  (window as any).currentLang = currentLang;

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      updateUI();
    });
  } else {
    updateUI();
  }
}
