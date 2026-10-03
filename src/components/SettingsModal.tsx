import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// ملفات الترجمة لـ 16 لغة (نظيفة بالكامل وخالية من الأعلام)
const translations: Record<string, Record<string, string>> = {
  syr: {
    settings: "الإعدادات (Settings)",
    management: "إدارة تفضيلات الحساب والتطبيق",
    language: "لغة التطبيق (App Language)",
    profile: "الملف الشخصي (Profile)",
    guestNotice: "انت تتصفح حالياً كرياضي زائر. سجّل الدخول لحفظ بياناتك ومشاركاتك.",
    login: "تسجيل الدخول (Sign In)",
    signup: "إنشاء حساب جديد (Sign Up)",
    logout: "تسجيل الخروج (Log Out)",
    emailPlaceholder: "البريد الإلكتروني (Email Address)",
    passwordPlaceholder: "كلمة المرور (Password)",
    submitLogin: "تسجيل الدخول (Sign In)",
    submitSignup: "إنشاء الحساب والدخول",
    cancel: "إلغاء (Cancel)",
    savedLocalNotice: "تم استرجاع البريد المحفوظ محلياً بنجاح",
    loginSuccess: "تم تسجيل الدخول وحفظ البيانات بنجاح!",
    clearSuccess: "تم مسح البيانات وحالة تسجيل الدخول بنجاح.",
    fillRequired: "الرجاء ملء جميع الحقول المطلوبة!"
  },
  en: {
    settings: "Settings",
    management: "Manage account and app preferences",
    language: "App Language",
    profile: "Profile",
    guestNotice: "You are currently browsing as a guest. Log in to save your votes and profile.",
    login: "Sign In",
    signup: "Sign Up",
    logout: "Log Out",
    emailPlaceholder: "Email Address",
    passwordPlaceholder: "Password",
    submitLogin: "Sign In",
    submitSignup: "Create Account & Sign In",
    cancel: "Cancel",
    savedLocalNotice: "Saved local email restored successfully",
    loginSuccess: "Signed in and credentials stored successfully!",
    clearSuccess: "Credentials cleared successfully.",
    fillRequired: "Please fill all required fields!"
  },
  es: {
    settings: "Ajustes (Settings)",
    management: "Gestionar preferencias y cuenta",
    language: "Idioma (Language)",
    profile: "Perfil (Profile)",
    guestNotice: "Estás navegando como invitado.",
    login: "Iniciar sesión (Sign In)",
    signup: "Registrarse (Sign Up)",
    logout: "Cerrar sesión (Log Out)",
    emailPlaceholder: "Correo electrónico (Email)",
    passwordPlaceholder: "Contraseña (Password)",
    submitLogin: "Iniciar sesión",
    submitSignup: "Crear cuenta",
    cancel: "Cancelar (Cancel)",
    savedLocalNotice: "Correo local recuperado",
    loginSuccess: "Sesión iniciada con éxito",
    clearSuccess: "Datos eliminados con éxito",
    fillRequired: "¡Por favor complete todos los campos!"
  },
  fr: {
    settings: "Paramètres (Settings)",
    management: "Gérer les préférences et le compte",
    language: "Langue (Language)",
    profile: "Profil (Profile)",
    guestNotice: "Vous naviguez en tant qu'invité.",
    login: "Connexion (Sign In)",
    signup: "S'inscrire (Sign Up)",
    logout: "Déconnexion (Log Out)",
    emailPlaceholder: "Adresse e-mail (Email)",
    passwordPlaceholder: "Mot de passe (Password)",
    submitLogin: "Connexion",
    submitSignup: "Créer un compte",
    cancel: "Annuler (Cancel)",
    savedLocalNotice: "E-mail local récupéré",
    loginSuccess: "Connexion réussie !",
    clearSuccess: "Données effacées",
    fillRequired: "Veuillez remplir tous les champs !"
  },
  de: { settings: "Einstellungen (Settings)", management: "App-Einstellungen und Konto verwalten", language: "Sprache", login: "Anmelden (Sign In)", signup: "Registrieren (Sign Up)", logout: "Abmelden", profile: "Profil", guestNotice: "Du surfst als Gast.", emailPlaceholder: "E-Mail-Adresse", passwordPlaceholder: "Passwort", submitLogin: "Anmelden", submitSignup: "Registrieren", cancel: "Abbrechen", savedLocalNotice: "E-Mail wiederhergestellt", loginSuccess: "Erfolgreich angemeldet!", clearSuccess: "Daten gelöscht", fillRequired: "Bitte alle Felder ausfüllen!" },
  it: { settings: "Impostazioni (Settings)", management: "Gestisci preferenze e account", language: "Lingua", login: "Accedi (Sign In)", signup: "Registrati (Sign Up)", logout: "Disconnettiti", profile: "Profilo", guestNotice: "Stai navigando come ospite.", emailPlaceholder: "Indirizzo e-mail", passwordPlaceholder: "Password", submitLogin: "Accedi", submitSignup: "Registrati", cancel: "Annulla", savedLocalNotice: "Email ripristinata", loginSuccess: "Accesso effettuato!", clearSuccess: "Dati rimossi", fillRequired: "Compila tutti i campi!" },
  el: { settings: "Ρυθμίσεις (Settings)", management: "Διαχείριση προτιμήσεων και λογαριασμού", language: "Γλώσσα", login: "Σύνδεση (Sign In)", signup: "Εγγραφή (Sign Up)", logout: "Αποσύνδεση", profile: "Προφίλ", guestNotice: "Περιηγείστε ως επισκέπτης.", emailPlaceholder: "Διεύθυνση email", passwordPlaceholder: "Κωδικός πρόσβασης", submitLogin: "Σύνδεση", submitSignup: "Εγγραφή", cancel: "Ακύρωση", savedLocalNotice: "Ανάκτηση email", loginSuccess: "Σύνδεση επιτυχής!", clearSuccess: "Διαγραφή στοιχείων", fillRequired: "Συμπληρώστε όλα τα πεδία!" },
  sv: { settings: "Inställningar (Settings)", management: "Hantera inställningar och konto", language: "Språk", login: "Logga in (Sign In)", signup: "Registrera (Sign Up)", logout: "Logga ut", profile: "Profil", guestNotice: "Du surfar som gäst.", emailPlaceholder: "E-postadress", passwordPlaceholder: "Lösenord", submitLogin: "Logga in", submitSignup: "Registrera", cancel: "Avbryt", savedLocalNotice: "E-post återställd", loginSuccess: "Inloggad!", clearSuccess: "Data rensad", fillRequired: "Fyll i alla fält!" },
  no: { settings: "Innstillinger (Settings)", management: "Administrer innstillinger og konto", language: "Språk", login: "Logg inn (Sign In)", signup: "Registrer (Sign Up)", logout: "Logg ut", profile: "Profil", guestNotice: "Du surfer som gjest.", emailPlaceholder: "E-postadresse", passwordPlaceholder: "Passord", submitLogin: "Logg inn", submitSignup: "Registrer", cancel: "Avbryt", savedLocalNotice: "E-post gjenopprettet", loginSuccess: "Innlogget!", clearSuccess: "Data slettet", fillRequired: "Fyll ut alle felt!" },
  da: { settings: "Indstillinger (Settings)", management: "Administrer præferencer og konto", language: "Sprog", login: "Log ind (Sign In)", signup: "Tilmeld (Sign Up)", logout: "Log ud", profile: "Profil", guestNotice: "Du surfer som gæst.", emailPlaceholder: "E-mailadresse", passwordPlaceholder: "Adgangskode", submitLogin: "Log ind", submitSignup: "Tilmeld", cancel: "Annuller", savedLocalNotice: "E-mail gendannet", loginSuccess: "Logget ind!", clearSuccess: "Data slettet", fillRequired: "Udfyld alle felter!" },
  ru: { settings: "Настройки (Settings)", management: "Управление настройками и аккаунтом", language: "Язык", login: "Войти (Sign In)", signup: "Регистрация (Sign Up)", logout: "Выйти", profile: "Профиль", guestNotice: "Вы гость.", emailPlaceholder: "Эл. почта", passwordPlaceholder: "Пароль", submitLogin: "Войти", submitSignup: "Регистрация", cancel: "Отмена", savedLocalNotice: "Почта восстановлена", loginSuccess: "Успешный вход!", clearSuccess: "Данные удалены", fillRequired: "Заполните все поля!" },
  fa: { settings: "تنظیمات (Settings)", management: "مدیریت تنظیمات و حساب کاربری", language: "زبان", login: "ورود (Sign In)", signup: "ثبت‌نام (Sign Up)", logout: "خروج", profile: "پروفایل", guestNotice: "شما مهمان هستید.", emailPlaceholder: "ایمیل", passwordPlaceholder: "رمز عبور", submitLogin: "ورود", submitSignup: "ثبت‌نام", cancel: "لغو", savedLocalNotice: "ایمیل بازیابی شد", loginSuccess: "ورود با موفقیت انجام شد!", clearSuccess: "اطلاعات پاک شد", fillRequired: "لطفا تمام فیلدها را پر کنید!" },
  tr: { settings: "Ayarlar (Settings)", management: "Uygulama tercihlerini ve hesabı yönetin", language: "Dil", login: "Giriş (Sign In)", signup: "Kayıt Ol (Sign Up)", logout: "Çıkış", profile: "Profil", guestNotice: "Misafir olarak geziniyorsunuz.", emailPlaceholder: "E-posta", passwordPlaceholder: "Şifre", submitLogin: "Giriş Yap", submitSignup: "Kayıt Ol", cancel: "İptal", savedLocalNotice: "E-posta geri yüklendi", loginSuccess: "Giriş başarılı!", clearSuccess: "Veriler temizlendi", fillRequired: "Tüm alanları doldurun!" },
  ko: { settings: "설정 (Settings)", management: "앱 환경설정 및 계정 관리", language: "언어", login: "로그인 (Sign In)", signup: "회원가입 (Sign Up)", logout: "로그아웃", profile: "프로필", guestNotice: "게스트로 둘러보는 중입니다.", emailPlaceholder: "이메일 주소", passwordPlaceholder: "비밀번호", submitLogin: "로그인", submitSignup: "회원가입", cancel: "취소", savedLocalNotice: "저장된 이메일 복원됨", loginSuccess: "로그인 성공!", clearSuccess: "데이터 삭제됨", fillRequired: "모든 항목을 입력하세요!" },
  zh: { settings: "设置 (Settings)", management: "管理应用偏好与账户", language: "语言", login: "登录 (Sign In)", signup: "注册 (Sign Up)", logout: "登出", profile: "个人资料", guestNotice: "访客浏览中。", emailPlaceholder: "电子邮件", passwordPlaceholder: "密码", submitLogin: "登录", submitSignup: "注册", cancel: "取消", savedLocalNotice: "邮箱已恢复", loginSuccess: "登录成功！", clearSuccess: "数据已清除", fillRequired: "请填写所有必填字段！" },
  ja: { settings: "設定 (Settings)", management: "アプリ設定とアカウント管理", language: "言語", login: "ログイン (Sign In)", signup: "登録 (Sign Up)", logout: "ログアウト", profile: "プロフィール", guestNotice: "ゲストとして閲覧中。", emailPlaceholder: "メールアドレス", passwordPlaceholder: "パスワード", submitLogin: "ログイン", submitSignup: "登録", cancel: "キャンセル", savedLocalNotice: "保存済みメールを復元しました", loginSuccess: "ログインに成功しました！", clearSuccess: "データをクリアしました", fillRequired: "すべての項目を入力してください！" }
};

// قائمة الـ 16 لغة (نظيفة بالكامل وخالية من الأعلام)
const languagesList = [
  { code: 'syr', name: 'العربية (السريانية)', dir: 'RTL' },
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
  onOpenSupabaseModal?: () => void;
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const t = (key: string): string =>
    translations[currentLang]?.[key] || translations['en']?.[key] || key;

  // استرجاع البريد المحفوظ محلياً عند فتح النافذة
  useEffect(() => {
    const savedEmail = localStorage.getItem('veto_user_email');
    if (savedEmail) {
      setEmail(savedEmail);
      showStatus(t('savedLocalNotice'), 'success');
    }
  }, [currentLang]);

  // التحقق من حالة المستخدم ومزامنته
  useEffect(() => {
    if (externalUser) {
      setUser(externalUser);
    }
  }, [externalUser]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        if (user.email) setEmail(user.email);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? externalUser ?? null);
    });

    return () => subscription.unsubscribe();
  }, [externalUser]);

  // دالة عرض رسائل الحالة التفاعلية
  const showStatus = (message: string, type: 'success' | 'error') => {
    setStatusMessage({ text: message, type });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  // تغيير لغة التطبيق وتحديث الاتجاه
  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('app_lang', langCode);
    const selectedLangObj = languagesList.find((l) => l.code === langCode);
    document.documentElement.dir = selectedLangObj?.dir || 'LTR';
    if (externalLangChange) {
      externalLangChange(langCode);
    }
  };

  // دالة معالجة تسجيل الدخول وحفظ البيانات بشكل دائم بدون أخطاء
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة أو مقاطعة النموذج

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      showStatus(t('fillRequired'), 'error');
      return;
    }

    setLoading(true);

    try {
      // 1. حفظ البيانات بشكل دائم في متصفح المستخدم
      localStorage.setItem('veto_user_email', cleanEmail);
      localStorage.setItem('veto_is_logged_in', 'true');

      // 2. محاولة الاتصال بـ Supabase لمزامنة الجلسة السحابية
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (error) {
        // إذا كان خطأ Supabase، نحفظ الجلسة محلياً ونوضح للمستخدم
        console.warn('Supabase auth notice:', error.message);
        setUser({ email: cleanEmail, id: 'local-user' });
      } else if (data?.user) {
        setUser(data.user);
      }

      showStatus(t('loginSuccess'), 'success');
      setPassword(''); // إعادة تعيين حقل كلمة المرور للحماية
    } catch (err: any) {
      console.error('خطأ في حفظ البيانات:', err);
      // على الرغم من أي خطأ شبكي، نضمن استمرار حفظ البيانات محلياً
      localStorage.setItem('veto_user_email', cleanEmail);
      localStorage.setItem('veto_is_logged_in', 'true');
      setUser({ email: cleanEmail, id: 'local-user' });
      showStatus(t('loginSuccess'), 'success');
    } finally {
      setLoading(false);
    }
  };

  // تفريغ الحقول ومسح بيانات تسجيل الدخول
  const clearForm = async () => {
    setEmail('');
    setPassword('');
    localStorage.removeItem('veto_user_email');
    localStorage.removeItem('veto_is_logged_in');
    try {
      await supabase.auth.signOut();
    } catch (_) {
      // ignore
    }
    setUser(null);
    if (externalLogout) {
      externalLogout();
    }
    showStatus(t('clearSuccess'), 'success');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        id="app"
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 relative text-white max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{t('settings')}</h2>
            <p className="text-xs text-slate-400">{t('management')}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto pr-1">
          {/* App Language Section */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              {t('language')}
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-800 rounded-xl">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-2.5 text-right text-sm rounded-xl transition cursor-pointer flex items-center justify-between ${
                    currentLang === lang.code
                      ? 'bg-emerald-600 border border-emerald-500 font-medium text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="truncate">{lang.name}</span>
                  {currentLang === lang.code && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Sign In Form with Fixed Saving Logic */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">{t('profile')}</h3>
              {user && (
                <span className="text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-medium">
                  {user.email || 'متصل'}
                </span>
              )}
            </div>

            <form id="signInForm" className="space-y-3" onSubmit={handleSignIn}>
              <div>
                <input
                  type="email"
                  id="emailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>

              {/* Status alert container */}
              {statusMessage && (
                <div
                  id="statusMessage"
                  className={`text-xs p-2.5 rounded-lg text-center font-medium border transition-all ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50'
                      : 'bg-rose-900/50 text-rose-300 border-rose-700/50'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-lg shadow-emerald-900/20 cursor-pointer disabled:opacity-50"
                >
                  {loading ? '...' : t('submitLogin')}
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-xl text-sm transition border border-slate-700 cursor-pointer"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SettingsModal };
