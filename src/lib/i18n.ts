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

export const DICTIONARY: Record<AppLanguage, Translations> = {
  ar: {
    // User requested dictionary
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
    account: 'الحساب الشخصي',
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
    // English exact translations requested by user
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
    account: 'User Profile',
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

export const LANGUAGE_STORAGE_KEY = 'veto_app_language';
export const AUTH_USER_STORAGE_KEY = 'veto_auth_user';

export function getInitialLanguage(): AppLanguage {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as AppLanguage | null;
    if (saved === 'ar' || saved === 'en') {
      return saved;
    }
  }
  // Default to Arabic as requested by user
  return 'ar';
}

export function saveLanguage(lang: AppLanguage): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
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
