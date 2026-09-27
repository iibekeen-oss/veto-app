import { AppLanguage } from '../types';

export interface Translations {
  // Required keys requested by user
  appTitle: string;
  login: string;
  signup: string;
  email: string;
  password: string;
  settings: string;
  language: string;
  logout: string;
  profile: string;
  guestNotice: string;
  management: string;

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

// كائن الترجمات المتعددة بما يشمل syr, en, es, fr, de حسب طلب المستخدم بالضبط
export const translations: Record<string, Translations> = {
  syr: {
    appTitle: "منصة النقاش",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب جديد",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    settings: "الإعدادات",
    language: "لغة التطبيق",
    logout: "تسجيل الخروج",
    profile: "الملف الشخصي",
    guestNotice: "انت تتصفح حالياً كرياضي زائر. سجّل الدخول لحفظ اصواتك وردودك.",
    management: "إدارة تفضيلات التطبيق والحساب",

    appName: "ڤيتو VETO",
    appSubtitle: "نظام الاعتراض الرياضي التكتيكي",
    allFilter: "الكل",
    veto0Filter: "الأصل (VETO-0)",
    rebuttalsFilter: "الردود المضادة",
    recordVetoBtn: "اعتراض جديد",
    proStance: "مؤيد (HTK)",
    conStance: "معارض (DEF)",
    commentsTitle: "سجل المناقشات والردود",
    addCommentPlaceholder: "اكتب ردك أو مبررك التكتيكي...",
    sendComment: "إرسال الرد",
    cancel: "إلغاء",
    confirm: "تأكيد",
    rememberMe: "تذكر بيانات الدخول",
    demoLogin: "دخول سريع كرياضي تجريبي",
    guestUser: "رياضي زائر",
    account: "الحساب",
    close: "إغلاق",
    supabaseSettings: "إعدادات Supabase السحابية",
    switchLanguageNotice: "تم تغيير لغة التطبيق إلى السريانية",
    welcomeBack: "مرحباً بك مجدداً في منصة ڤيتو!",
    accountCreated: "تم إنشاء الحساب بنجاح!",
    loggedOutMsg: "تم تسجيل الخروج بنجاح",
    inputRequired: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
    round: "الجولة",
    stanceBreakdown: "توزيع الأصوات والمواقف",
    interceptionActive: "نظام الاعتراض التكتيكي نشط",
    totalVotes: "إجمالي الأصوات",
    verifiedAthlete: "رياضي معتمد",
    fullScreenFeed: "عرض ملء الشاشة",
    phoneMockup: "محاكي الهاتف المحمول",
    codeInspector: "مستكشف كود كوتلن (Kotlin)",
  },
  en: {
    appTitle: "Debate Platform",
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    settings: "Settings",
    language: "App Language",
    logout: "Log Out",
    profile: "Profile",
    guestNotice: "You are currently browsing as a guest. Log in to save your votes and replies.",
    management: "Manage app preferences and account",

    appName: "VETO Platform",
    appSubtitle: "Tactical Athletic Interception",
    allFilter: "All Debates",
    veto0Filter: "Origin (VETO-0)",
    rebuttalsFilter: "Counter Rebuttals",
    recordVetoBtn: "Record Veto",
    proStance: "PRO (HTK)",
    conStance: "CON (DEF)",
    commentsTitle: "Debate Rebuttals & Interceptions",
    addCommentPlaceholder: "Submit your tactical counter-argument...",
    sendComment: "Post Rebuttal",
    cancel: "Cancel",
    confirm: "Confirm",
    rememberMe: "Remember my credentials",
    demoLogin: "Instant Demo Athlete Login",
    guestUser: "Guest Athlete",
    account: "Account",
    close: "Close",
    supabaseSettings: "Supabase Cloud Configuration",
    switchLanguageNotice: "Language switched to English",
    welcomeBack: "Welcome back to VETO!",
    accountCreated: "Account created successfully!",
    loggedOutMsg: "Logged out successfully",
    inputRequired: "Please enter both email and password",
    round: "ROUND",
    stanceBreakdown: "STANCE BREAKDOWN",
    interceptionActive: "TACTICAL INTERCEPTION ACTIVE",
    totalVotes: "TOTAL VOTES",
    verifiedAthlete: "VERIFIED ATHLETE",
    fullScreenFeed: "Full Screen Feed",
    phoneMockup: "Phone Mockup View",
    codeInspector: "Kotlin Code Inspector",
  },
  es: {
    appTitle: "Plataforma de Debate",
    login: "Iniciar sesión",
    signup: "Registrarse",
    email: "Correo electrónico",
    password: "Contraseña",
    settings: "Ajustes",
    language: "Idioma de la aplicación",
    logout: "Cerrar sesión",
    profile: "Perfil",
    guestNotice: "Estás navegando como invitado. Inicia sesión para guardar tus votos y respuestas.",
    management: "Gestionar preferencias y cuenta",

    appName: "Plataforma VETO",
    appSubtitle: "Intercepción Táctica Atlética",
    allFilter: "Todos",
    veto0Filter: "Origen (VETO-0)",
    rebuttalsFilter: "Contra-Réplicas",
    recordVetoBtn: "Nuevo Veto",
    proStance: "A FAVOR (HTK)",
    conStance: "EN CONTRA (DEF)",
    commentsTitle: "Debates y Réplicas Tácticas",
    addCommentPlaceholder: "Escribe tu contraargumento táctico...",
    sendComment: "Publicar Réplica",
    cancel: "Cancelar",
    confirm: "Confirmar",
    rememberMe: "Recordar credenciales",
    demoLogin: "Acceso Demo Rápido",
    guestUser: "Atleta Invitado",
    account: "Cuenta",
    close: "Cerrar",
    supabaseSettings: "Configuración Supabase",
    switchLanguageNotice: "Idioma cambiado a español",
    welcomeBack: "¡Bienvenido de nuevo a VETO!",
    accountCreated: "¡Cuenta creada exitosamente!",
    loggedOutMsg: "Sesión cerrada correctamente",
    inputRequired: "Por favor, introduce correo y contraseña",
    round: "RONDA",
    stanceBreakdown: "DISTRIBUCIÓN DE POSTURAS",
    interceptionActive: "INTERCEPCIÓN TÁCTICA ACTIVA",
    totalVotes: "TOTAL VOTOS",
    verifiedAthlete: "ATLETA VERIFICADO",
    fullScreenFeed: "Vista Pantalla Completa",
    phoneMockup: "Vista Maqueta Móvil",
    codeInspector: "Inspector de Código Kotlin",
  },
  fr: {
    appTitle: "Plateforme de Débat",
    login: "Connexion",
    signup: "S'inscrire",
    email: "E-mail",
    password: "Mot de passe",
    settings: "Paramètres",
    language: "Langue de l'application",
    logout: "Déconnexion",
    profile: "Profil",
    guestNotice: "Vous naviguez en tant qu'invité. Connectez-vous pour enregistrer vos votes et réponses.",
    management: "Gérer les préférences et le compte",

    appName: "Plateforme VETO",
    appSubtitle: "Interception Tactique Sportive",
    allFilter: "Tous",
    veto0Filter: "Origine (VETO-0)",
    rebuttalsFilter: "Contre-Réfutations",
    recordVetoBtn: "Nouveau Veto",
    proStance: "POUR (HTK)",
    conStance: "CONTRE (DEF)",
    commentsTitle: "Débats et Réfutations",
    addCommentPlaceholder: "Rédigez votre contre-argument tactique...",
    sendComment: "Publier",
    cancel: "Annuler",
    confirm: "Confirmer",
    rememberMe: "Se souvenir de moi",
    demoLogin: "Connexion Démo Rapide",
    guestUser: "Athlète Invité",
    account: "Compte",
    close: "Fermer",
    supabaseSettings: "Configuration Supabase",
    switchLanguageNotice: "Langue modifiée en français",
    welcomeBack: "Bienvenue de nouveau sur VETO !",
    accountCreated: "Compte créé avec succès !",
    loggedOutMsg: "Déconnexion réussie",
    inputRequired: "Veuillez saisir votre e-mail et mot de passe",
    round: "TOUR",
    stanceBreakdown: "RÉPARTITION DES POSITIONS",
    interceptionActive: "INTERCEPTION TACTIQUE ACTIVE",
    totalVotes: "TOTAL DES VOTES",
    verifiedAthlete: "ATHLÈTE VÉRIFIÉ",
    fullScreenFeed: "Plein Écran",
    phoneMockup: "Aperçu Mobile",
    codeInspector: "Inspecteur de Code Kotlin",
  },
  de: {
    appTitle: "Debattenplattform",
    login: "Anmelden",
    signup: "Registrieren",
    email: "E-Mail",
    password: "Passwort",
    settings: "Einstellungen",
    language: "App-Sprache",
    logout: "Abmelden",
    profile: "Profil",
    guestNotice: "Du surfst als Gast. Melde dich an, um Stimmen und Antworten zu speichern.",
    management: "App-Einstellungen und Konto verwalten",

    appName: "VETO-Plattform",
    appSubtitle: "Taktische Sportliche Abfangung",
    allFilter: "Alle Debatten",
    veto0Filter: "Ursprung (VETO-0)",
    rebuttalsFilter: "Gegen-Erwiderungen",
    recordVetoBtn: "Neues Veto",
    proStance: "PRO (HTK)",
    conStance: "KONTRA (DEF)",
    commentsTitle: "Debatten & Erwiderungen",
    addCommentPlaceholder: "Taktisches Gegenargument verfassen...",
    sendComment: "Erwiderung posten",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    rememberMe: "Angemeldet bleiben",
    demoLogin: "Sofortiger Demo-Login",
    guestUser: "Gast-Athlet",
    account: "Konto",
    close: "Schließen",
    supabaseSettings: "Supabase Konfiguration",
    switchLanguageNotice: "Sprache auf Deutsch umgestellt",
    welcomeBack: "Willkommen zurück bei VETO!",
    accountCreated: "Konto erfolgreich erstellt!",
    loggedOutMsg: "Erfolgreich abgemeldet",
    inputRequired: "Bitte E-Mail und Passwort eingeben",
    round: "RUNDE",
    stanceBreakdown: "STIMMENVERTEILUNG",
    interceptionActive: "TAKTISCHE ABFANGUNG AKTIV",
    totalVotes: "GESAMTSTIMMEN",
    verifiedAthlete: "VERIFIZIERTER ATHLET",
    fullScreenFeed: "Vollbild-Feed",
    phoneMockup: "Smartphone-Ansicht",
    codeInspector: "Kotlin-Code-Inspektor",
  },
};

// Aliases for compatibility
translations.ar = translations.syr;
export const DICTIONARY = translations;

export const LANGUAGE_STORAGE_KEY = 'app_lang';
export const AUTH_USER_STORAGE_KEY = 'veto_auth_user';

// Current language initialization
export let currentLang: AppLanguage = (typeof window !== 'undefined'
  ? ((localStorage.getItem('app_lang') || localStorage.getItem('veto_app_language') || 'syr') as AppLanguage)
  : 'syr');

// Helper functions
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

    // ضبط اتجاه الصفحة: syr و ar من اليمين لليسار، وبقية اللغات من اليسار لليمين
    const isRtl = currentLang === 'syr' || currentLang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang === 'syr' ? 'ar-SY' : currentLang;
  }
}

export function getInitialLanguage(): AppLanguage {
  if (typeof window !== 'undefined') {
    const saved = (localStorage.getItem('app_lang') || localStorage.getItem('veto_app_language')) as AppLanguage | null;
    if (saved && (translations as any)[saved]) {
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
