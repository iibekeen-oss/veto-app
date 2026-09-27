import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// 2. ملفات الترجمة لـ 16 لغة (نظيفة بالكامل وخالية من الأعلام)
const translations: Record<string, Record<string, string>> = {
  syr: {
    settings: "الإعدادات",
    management: "إدارة تفضيلات التطبيق والحساب",
    language: "لغة التطبيق",
    profile: "الملف الشخصي",
    guestNotice: "انت تتصفح حالياً كرياضي زائر. سجّل الدخول لحفظ اصواتك وردودك.",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب جديد",
    logout: "تسجيل الخروج",
    emailPlaceholder: "البريد الإلكتروني",
    passwordPlaceholder: "كلمة المرور",
    submitLogin: "دخول",
    submitSignup: "تسجيل",
    cancel: "إلغاء"
  },
  en: {
    settings: "Settings",
    management: "Manage app preferences and account",
    language: "App Language",
    profile: "Profile",
    guestNotice: "You are currently browsing as a guest. Log in to save your votes and replies.",
    login: "Login",
    signup: "Sign Up",
    logout: "Log Out",
    emailPlaceholder: "Email Address",
    passwordPlaceholder: "Password",
    submitLogin: "Sign In",
    submitSignup: "Register",
    cancel: "Cancel"
  },
  // بقية اللغات (إسبانية، فرنسية، ألمانية، إيطالية، يونانية، سويدية، نرويجية، دانماركية، روسية، فارسية، تركية، كورية، صينية، يابانية)
  es: { settings: "Ajustes", management: "Gestionar preferencias y cuenta", language: "Idioma", login: "Iniciar sesión", signup: "Registrarse", logout: "Cerrar sesión", profile: "Perfil", guestNotice: "Estás navegando como invitado.", emailPlaceholder: "Correo electrónico", passwordPlaceholder: "Contraseña", submitLogin: "Entrar", submitSignup: "Registrarse", cancel: "Cancelar" },
  fr: { settings: "Paramètres", management: "Gérer les préférences et le compte", language: "Langue", login: "Connexion", signup: "S'inscrire", logout: "Déconnexion", profile: "Profil", guestNotice: "Vous naviguez en tant qu'invité.", emailPlaceholder: "Adresse e-mail", passwordPlaceholder: "Mot de passe", submitLogin: "Connexion", submitSignup: "Inscription", cancel: "Annuler" },
  de: { settings: "Einstellungen", management: "App-Einstellungen und Konto verwalten", language: "Sprache", login: "Anmelden", signup: "Registrieren", logout: "Abmelden", profile: "Profil", guestNotice: "Du surfst als Gast.", emailPlaceholder: "E-Mail-Adresse", passwordPlaceholder: "Passwort", submitLogin: "Anmelden", submitSignup: "Registrieren", cancel: "Abbrechen" },
  it: { settings: "Impostazioni", management: "Gestisci preferenze e account", language: "Lingua", login: "Accedi", signup: "Registrati", logout: "Disconnettiti", profile: "Profilo", guestNotice: "Stai navigando come ospite.", emailPlaceholder: "Indirizzo e-mail", passwordPlaceholder: "Password", submitLogin: "Accedi", submitSignup: "Registrati", cancel: "Annulla" },
  el: { settings: "Ρυθμίσεις", management: "Διαχείριση προτιμήσεων και λογαριασμού", language: "Γλώσσα", login: "Σύνδεση", signup: "Εγγραφή", logout: "Αποσύνδεση", profile: "Προφίλ", guestNotice: "Περιηγείστε ως επισκέπτης.", emailPlaceholder: "Διεύθυνση email", passwordPlaceholder: "Κωδικός πρόσβασης", submitLogin: "Σύνδεση", submitSignup: "Εγγραφή", cancel: "Ακύρωση" },
  sv: { settings: "Inställningar", management: "Hantera inställningar och konto", language: "Språk", login: "Logga in", signup: "Registrera", logout: "Logga ut", profile: "Profil", guestNotice: "Du surfar som gäst.", emailPlaceholder: "E-postadress", passwordPlaceholder: "Lösenord", submitLogin: "Logga in", submitSignup: "Registrera", cancel: "Avbryt" },
  no: { settings: "Innstillinger", management: "Administrer innstillinger og konto", language: "Språk", login: "Logg inn", signup: "Registrer", logout: "Logg ut", profile: "Profil", guestNotice: "Du surfer som gjest.", emailPlaceholder: "E-postadresse", passwordPlaceholder: "Passord", submitLogin: "Logg inn", submitSignup: "Registrer", cancel: "Avbryt" },
  da: { settings: "Indstillinger", management: "Administrer præferencer og konto", language: "Sprog", login: "Log ind", signup: "Tilmeld", logout: "Log ud", profile: "Profil", guestNotice: "Du surfer som gæst.", emailPlaceholder: "E-mailadresse", passwordPlaceholder: "Adgangskode", submitLogin: "Log ind", submitSignup: "Tilmeld", cancel: "Annuller" },
  ru: { settings: "Настройки", management: "Управление настройками и аккаунтом", language: "Язык", login: "Войти", signup: "Регистрация", logout: "Выйти", profile: "Профиль", guestNotice: "Вы гость.", emailPlaceholder: "Эл. почта", passwordPlaceholder: "Пароль", submitLogin: "Войти", submitSignup: "Регистрация", cancel: "Отмена" },
  fa: { settings: "تنظیمات", management: "مدیریت تنظیمات و حساب کاربری", language: "زبان", login: "ورود", signup: "ثبت‌نام", logout: "خروج", profile: "پروفایل", guestNotice: "شما مهمان هستید.", emailPlaceholder: "ایمیل", passwordPlaceholder: "رمز عبور", submitLogin: "ورود", submitSignup: "ثبت‌نام", cancel: "لغو" },
  tr: { settings: "Ayarlar", management: "Uygulama tercihlerini ve hesabı yönetin", language: "Dil", login: "Giriş", signup: "Kayıt Ol", logout: "Çıkış", profile: "Profil", guestNotice: "Misafir olarak geziniyorsunuz.", emailPlaceholder: "E-posta", passwordPlaceholder: "Şifre", submitLogin: "Giriş Yap", submitSignup: "Kayıt Ol", cancel: "İptal" },
  ko: { settings: "설정", management: "앱 환경설정 및 계정 관리", language: "언어", login: "로그인", signup: "회원가입", logout: "로그아웃", profile: "프로필", guestNotice: "게스트로 둘러보는 중입니다.", emailPlaceholder: "이메일 주소", passwordPlaceholder: "비밀번호", submitLogin: "로그인", submitSignup: "회원가입", cancel: "취소" },
  zh: { settings: "设置", management: "管理应用偏好与账户", language: "语言", login: "登录", signup: "注册", logout: "登出", profile: "个人资料", guestNotice: "访客浏览中。", emailPlaceholder: "电子邮件", passwordPlaceholder: "密码", submitLogin: "登录", submitSignup: "注册", cancel: "取消" },
  ja: { settings: "設定", management: "アプリ設定とアカウント管理", language: "言語", login: "ログイン", signup: "登録", logout: "ログアウト", profile: "プロフィール", guestNotice: "ゲストとして閲覧中。", emailPlaceholder: "メールアドレス", passwordPlaceholder: "パスワード", submitLogin: "ログイン", submitSignup: "登録", cancel: "キャンセル" }
};

// قائمة الـ 16 لغة (أسماء فقط بدون أعلام)
const languagesList = [
  { code: 'syr', name: 'السريانية', dir: 'RTL' },
  { code: 'en', name: 'English', dir: 'LTR' },
  { code: 'es', name: 'Español', dir: 'LTR' },
  { code: 'fr', name: 'Français', dir: 'LTR' },
  { code: 'de', name: 'Deutsch', dir: 'LTR' },
  { code: 'it', name: 'Italiano', dir: 'LTR' },
  { code: 'el', name: 'Ελληνικά', dir: 'LTR' },
  { code: 'sv', name: 'Svenska', dir: 'LTR' },
  { code: 'no', name: 'Norsk', dir: 'LTR' },
  { code: 'da', name: 'Dansk', dir: 'LTR' },
  { code: 'ru', name: 'Русский', dir: 'LTR' },
  { code: 'fa', name: 'فارسی', dir: 'RTL' },
  { code: 'tr', name: 'Türkçe', dir: 'LTR' },
  { code: 'ko', name: '한국어', dir: 'LTR' },
  { code: 'zh', name: '中文', dir: 'LTR' },
  { code: 'ja', name: '日本語', dir: 'LTR' }
];

interface SettingsModalProps {
  onClose?: () => void;
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
  user?: any;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogout?: () => void;
  [key: string]: any;
}

export default function SettingsModal({
  onClose,
  currentLang: externalLang,
  onLanguageChange: externalLangChange,
  user: externalUser,
  onLogout: externalLogout,
}: SettingsModalProps) {
  const [currentLang, setCurrentLang] = useState<string>(
    externalLang || localStorage.getItem('app_lang') || 'syr'
  );
  const [user, setUser] = useState<any>(externalUser || null);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // مزامنة المستخدم من الـ props أو Supabase
  useEffect(() => {
    if (externalUser) {
      setUser(externalUser);
    }
  }, [externalUser]);

  useEffect(() => {
    if (externalLang && externalLang !== currentLang) {
      setCurrentLang(externalLang);
    }
  }, [externalLang]);

  // التحقق من حالة المستخدم عند الفتح
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? externalUser ?? null);
    });

    return () => subscription.unsubscribe();
  }, [externalUser]);

  // تغيير لغة التطبيق وتحديث الاتجاه
  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('app_lang', langCode);
    const selectedLangObj = languagesList.find(l => l.code === langCode);
    document.documentElement.dir = selectedLangObj?.dir || 'LTR';
    if (externalLangChange) {
      externalLangChange(langCode);
    }
  };

  const t = (key: string): string =>
    translations[currentLang]?.[key] || translations['en']?.[key] || key;

  // تنفيذ تسجيل الحساب أو الدخول عبر Supabase
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert("خطأ: " + error.message);
        else alert("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert("خطأ: " + error.message);
        else alert("مرحباً بك مجدداً!");
      }
    } catch (err: any) {
      alert("خطأ: " + (err?.message || 'خطأ غير معروف'));
    }

    setLoading(false);
    setAuthMode(null);
    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert("تم تسجيل الخروج بنجاح.");
    }
    setUser(null);
    if (externalLogout) {
      externalLogout();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col">
        
        {/* رأس النافذة */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-bold">{t('settings')}</h2>
            <p className="text-xs text-gray-400">{t('management')}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto">
          
          {/* لغة التطبيق (بدون أعلام نهائياً) */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 block">{t('language')}</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-gray-800 rounded-xl">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-2 rounded-lg border text-right transition-all flex items-center justify-between cursor-pointer ${
                    currentLang === lang.code 
                      ? 'border-green-500 bg-green-500/10 text-white' 
                      : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <span className="font-bold text-xs">{lang.name}</span>
                  {currentLang === lang.code && <span className="text-green-500 text-xs font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* قسم الملف الشخصي والمصادقة */}
          <div className="bg-gray-800/40 border border-gray-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-300">{t('profile')}</h3>
            
            {user ? (
              <div className="space-y-3">
                <div className="text-xs text-green-400 font-semibold bg-green-950/40 p-2 rounded border border-green-800/50 truncate">
                  {user.email || user.name}
                </div>
                <button 
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 px-4 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-bold border border-red-800/50 transition-all cursor-pointer"
                >
                  {t('logout')}
                </button>
              </div>
            ) : authMode ? (
              // نموذج تسجيل الدخول أو إنشاء الحساب
              <form onSubmit={handleAuthSubmit} className="space-y-3 pt-2">
                <input 
                  type="email" 
                  placeholder={t('emailPlaceholder')} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white focus:outline-none focus:border-green-500"
                />
                <input 
                  type="password" 
                  placeholder={t('passwordPlaceholder')} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white focus:outline-none focus:border-green-500"
                />
                <div className="flex gap-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "..." : (authMode === 'login' ? t('submitLogin') : t('submitSignup'))}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setAuthMode(null)}
                    className="py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs transition-all cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            ) : (
              // أزرار الاختيار للزائر
              <div className="space-y-3">
                <p className="text-xs text-gray-400">{t('guestNotice')}</p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button 
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="py-2 px-4 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    {t('login')}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-all border border-gray-700 cursor-pointer"
                  >
                    {t('signup')}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export { SettingsModal };
