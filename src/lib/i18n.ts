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
  appName?: string;
  appSubtitle?: string;
  allFilter?: string;
  veto0Filter?: string;
  rebuttalsFilter?: string;
  recordVetoBtn?: string;
  proStance?: string;
  conStance?: string;
  commentsTitle?: string;
  addCommentPlaceholder?: string;
  sendComment?: string;
  cancel?: string;
  confirm?: string;
  rememberMe?: string;
  demoLogin?: string;
  guestUser?: string;
  account?: string;
  close?: string;
  supabaseSettings?: string;
  switchLanguageNotice?: string;
  welcomeBack?: string;
  accountCreated?: string;
  loggedOutMsg?: string;
  inputRequired?: string;
  round?: string;
  stanceBreakdown?: string;
  interceptionActive?: string;
  totalVotes?: string;
  verifiedAthlete?: string;
  fullScreenFeed?: string;
  phoneMockup?: string;
  codeInspector?: string;
}

// كائن الترجمات المتعددة لجميع اللغات الـ 16 المحددة بالكامل
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
  it: {
    appTitle: "Piattaforma di Dibattito",
    login: "Accedi",
    signup: "Registrati",
    email: "E-mail",
    password: "Password",
    settings: "Impostazioni",
    language: "Lingua dell'applicazione",
    logout: "Disconnettiti",
    profile: "Profilo",
    guestNotice: "Stai navigando come ospite. Accedi per salvare i tuoi voti e le tue risposte.",
    management: "Gestisci preferenze e account",

    appName: "Piattaforma VETO",
    appSubtitle: "Intercettazione Tattica Atletica",
    allFilter: "Tutti i Dibattiti",
    veto0Filter: "Origine (VETO-0)",
    rebuttalsFilter: "Contro-Repliche",
    recordVetoBtn: "Nuovo Veto",
    proStance: "A FAVORE (HTK)",
    conStance: "CONTRO (DEF)",
    commentsTitle: "Dibattiti e Repliche Tattiche",
    addCommentPlaceholder: "Scrivi la tua contro-argomentazione tattica...",
    sendComment: "Invia Replica",
    cancel: "Annulla",
    confirm: "Conferma",
    rememberMe: "Ricorda credenziali",
    demoLogin: "Accesso Demo Rapido",
    guestUser: "Atleta Ospite",
    account: "Account",
    close: "Chiudi",
    supabaseSettings: "Configurazione Supabase",
    switchLanguageNotice: "Lingua cambiata in italiano",
    welcomeBack: "Bentornato su VETO!",
    accountCreated: "Account creato con successo!",
    loggedOutMsg: "Disconnesso con successo",
    inputRequired: "Inserisci sia l'email che la password",
    round: "ROUND",
    stanceBreakdown: "RIPARTIZIONE DELLE POSIZIONI",
    interceptionActive: "INTERCETTAZIONE TATTICA ATTIVA",
    totalVotes: "VOTI TOTALI",
    verifiedAthlete: "ATLETA VERIFICATO",
    fullScreenFeed: "Feed a Schermo Intero",
    phoneMockup: "Vista Mockup Mobile",
    codeInspector: "Ispettore Codice Kotlin",
  },
  el: {
    appTitle: "Πλατφόρμα Συζήτησης",
    login: "Σύνδεση",
    signup: "Εγγραφή",
    email: "Email",
    password: "Κωδικός πρόσβασης",
    settings: "Ρυθμίσεις",
    language: "Γλώσσα εφαρμογής",
    logout: "Αποσύνδεση",
    profile: "Профиль",
    guestNotice: "Περιηγείστε ως επισκέπτης. Συνδεθείτε για να αποθηκεύσετε τις ψήφους σας.",
    management: "Διαχείριση προτιμήσεων και λογαριασμού",

    appName: "Πλατφόρμα VETO",
    appSubtitle: "Τακτική Αθλητική Αναχαίτιση",
    allFilter: "Όλες οι Συζητήσεις",
    veto0Filter: "Αρχική (VETO-0)",
    rebuttalsFilter: "Αντικρούσεις",
    recordVetoBtn: "Νέο Veto",
    proStance: "ΥΠΕΡ (HTK)",
    conStance: "ΚΑΤΑ (DEF)",
    commentsTitle: "Αντικρούσεις και Συζητήσεις",
    addCommentPlaceholder: "Υποβάλετε το τακτικό σας αντεπιχείρημα...",
    sendComment: "Δημοσίευση",
    cancel: "Ακύρωση",
    confirm: "Επιβεβαίωση",
    rememberMe: "Απομνημόνευση στοιχείων",
    demoLogin: "Άμεση Δοκιμαστική Είσοδος",
    guestUser: "Επισκέπτης Αθλητής",
    account: "Λογαριασμός",
    close: "Κλείσιμο",
    supabaseSettings: "Ρυθμίσεις Supabase",
    switchLanguageNotice: "Η γλώσσα άλλαξε στα ελληνικά",
    welcomeBack: "Καλώς ήρθατε πίσω στο VETO!",
    accountCreated: "Ο λογαριασμός δημιουργήθηκε επιτυχώς!",
    loggedOutMsg: "Αποσυνδεθήκατε επιτυχώς",
    inputRequired: "Παρακαλούμε εισάγετε email και κωδικό πρόσβασης",
    round: "ΓΥΡΟΣ",
    stanceBreakdown: "ΚΑΤΑΝΟΜΗ ΘΕΣΕΩΝ",
    interceptionActive: "ΕΝΕΡΓΗ ΤΑΚΤΙΚΗ ΑΝΑΧΑΙΤΙΣΗ",
    totalVotes: "ΣΥΝΟΛΙΚΕΣ ΨΗΦΟΙ",
    verifiedAthlete: "ΕΠΑΛΗΘΕΥΜΕΝΟΣ ΑΘΛΗΤΗΣ",
    fullScreenFeed: "Πλήρης Οθόνη",
    phoneMockup: "Προβολή Mockup",
    codeInspector: "Επιθεωρητής Κώδικα Kotlin",
  },
  sv: {
    appTitle: "Debattplattform",
    login: "Logga in",
    signup: "Registrera dig",
    email: "E-post",
    password: "Lösenord",
    settings: "Inställningar",
    language: "Appens språk",
    logout: "Logga ut",
    profile: "Profil",
    guestNotice: "Du surfar som gäst. Logga in för att spara dina röster och svar.",
    management: "Hantera inställningar och konto",

    appName: "VETO-plattform",
    appSubtitle: "Taktisk Atletisk Avlyssning",
    allFilter: "Alla debatter",
    veto0Filter: "Ursprung (VETO-0)",
    rebuttalsFilter: "Motinlägg",
    recordVetoBtn: "Nytt Veto",
    proStance: "FÖR (HTK)",
    conStance: "EMOT (DEF)",
    commentsTitle: "Debattinlägg och genmälen",
    addCommentPlaceholder: "Skriv ditt taktiska motargument...",
    sendComment: "Publicera svar",
    cancel: "Avbryt",
    confirm: "Bekräfta",
    rememberMe: "Kom ihåg inloggning",
    demoLogin: "Snabb Demo-inloggning",
    guestUser: "Gästatlet",
    account: "Konto",
    close: "Stäng",
    supabaseSettings: "Supabase-inställningar",
    switchLanguageNotice: "Språket ändrat till svenska",
    welcomeBack: "Välkommen tillbaka till VETO!",
    accountCreated: "Kontot skapades!",
    loggedOutMsg: "Utloggad!",
    inputRequired: "Ange både e-post och lösenord",
    round: "RUNDA",
    stanceBreakdown: "STÄLLNINGSFÖRDELNING",
    interceptionActive: "TAKTISK AVLYSSNING AKTIV",
    totalVotes: "TOTALA RÖSTER",
    verifiedAthlete: "VERIFIERAD ATLET",
    fullScreenFeed: "Helskärmsläge",
    phoneMockup: "Mobilvy",
    codeInspector: "Kotlin-kodgranskare",
  },
  no: {
    appTitle: "Debattplattform",
    login: "Logg inn",
    signup: "Registrer deg",
    email: "E-post",
    password: "Passord",
    settings: "Innstillinger",
    language: "App-språk",
    logout: "Logg ut",
    profile: "Profil",
    guestNotice: "Du surfler som gjest. Logg inn for å lagre stemmene dine.",
    management: "Administrer innstillinger og konto",

    appName: "VETO-plattform",
    appSubtitle: "Taktisk Atletisk Avskjæring",
    allFilter: "Alle debatter",
    veto0Filter: "Opprinnelse (VETO-0)",
    rebuttalsFilter: "Motsvar",
    recordVetoBtn: "Nytt Veto",
    proStance: "FOR (HTK)",
    conStance: "MOT (DEF)",
    commentsTitle: "Debatt og motsvar",
    addCommentPlaceholder: "Skriv ditt taktiske motargument...",
    sendComment: "Publiser motsvar",
    cancel: "Avbryt",
    confirm: "Bekreft",
    rememberMe: "Husk meg",
    demoLogin: "Rask Demo-innlogging",
    guestUser: "Gjesteatlet",
    account: "Konto",
    close: "Lukk",
    supabaseSettings: "Supabase-konfigurasjon",
    switchLanguageNotice: "Språk endret til norsk",
    welcomeBack: "Velkommen tilbake til VETO!",
    accountCreated: "Konto opprettet!",
    loggedOutMsg: "Logget ut!",
    inputRequired: "Vennligst oppgi både e-post og passord",
    round: "RUNDE",
    stanceBreakdown: "STILLINGSFORDELING",
    interceptionActive: "TAKTISK AVSKJÆRING AKTIV",
    totalVotes: "TOTALT ANTALL STEMMER",
    verifiedAthlete: "VERIFISERT ATLET",
    fullScreenFeed: "Fullskjermsvisning",
    phoneMockup: "Mobil mockup-visning",
    codeInspector: "Kotlin-kodeinspektør",
  },
  da: {
    appTitle: "Debatplatform",
    login: "Log ind",
    signup: "Tilmeld dig",
    email: "E-mail",
    password: "Adgangskode",
    settings: "Indstillinger",
    language: "App-sprog",
    logout: "Log ud",
    profile: "Profil",
    guestNotice: "Du surfer som gæst. Log ind for at gemme dine stemmer.",
    management: "Håndtér indstillinger og konto",

    appName: "VETO-platform",
    appSubtitle: "Taktisk Atletisk Afskæring",
    allFilter: "Alle debatter",
    veto0Filter: "Oprindelse (VETO-0)",
    rebuttalsFilter: "Modindlæg",
    recordVetoBtn: "Nyt Veto",
    proStance: "FOR (HTK)",
    conStance: "IMOD (DEF)",
    commentsTitle: "Debat og gensvar",
    addCommentPlaceholder: "Skriv dit taktiske modargument...",
    sendComment: "Send svar",
    cancel: "Annuller",
    confirm: "Bekræft",
    rememberMe: "Husk mig",
    demoLogin: "Hurtig Demo-login",
    guestUser: "Gæsteatlet",
    account: "Konto",
    close: "Luk",
    supabaseSettings: "Supabase-indstillinger",
    switchLanguageNotice: "Sprog ændret til dansk",
    welcomeBack: "Velkommen tilbage til VETO!",
    accountCreated: "Konto oprettet!",
    loggedOutMsg: "Logget ud!",
    inputRequired: "Indtast venligst både e-mail og adgangskode",
    round: "RUNDE",
    stanceBreakdown: "HOLDFORDELING",
    interceptionActive: "TAKTISK AFSKÆRING AKTIV",
    totalVotes: "SAMLEDE STEMMER",
    verifiedAthlete: "VERIFICERET ATLET",
    fullScreenFeed: "Fuld skærm",
    phoneMockup: "Mobilvisning",
    codeInspector: "Kotlin-kodeinspektør",
  },
  ru: {
    appTitle: "Платформа дебатов",
    login: "Войти",
    signup: "Регистрация",
    email: "Электронная почта",
    password: "Пароль",
    settings: "Настройки",
    language: "Язык приложения",
    logout: "Выйти",
    profile: "Профиль",
    guestNotice: "Вы просматриваете как гость. Войдите, чтобы сохранить свои голоса.",
    management: "Управление настройками и аккаунтом",

    appName: "Платформа VETO",
    appSubtitle: "Тактический Спортивный Перехват",
    allFilter: "Все дебаты",
    veto0Filter: "Первоисточник (VETO-0)",
    rebuttalsFilter: "Контраргументы",
    recordVetoBtn: "Новое вето",
    proStance: "ЗА (HTK)",
    conStance: "ПРОТИВ (DEF)",
    commentsTitle: "Дебаты и возражения",
    addCommentPlaceholder: "Введите ваш тактический контраргумент...",
    sendComment: "Опубликовать",
    cancel: "Отмена",
    confirm: "Подтвердить",
    rememberMe: "Запомнить меня",
    demoLogin: "Быстрый демо-вход",
    guestUser: "Гость-атлет",
    account: "Аккаунт",
    close: "Закрыть",
    supabaseSettings: "Настройки Supabase",
    switchLanguageNotice: "Язык изменен на русский",
    welcomeBack: "С возвращением в VETO!",
    accountCreated: "Аккаунт успешно создан!",
    loggedOutMsg: "Вы успешно вышли",
    inputRequired: "Пожалуйста, введите почту и пароль",
    round: "РАУНД",
    stanceBreakdown: "РАСПРЕДЕЛЕНИЕ ГОЛОСОВ",
    interceptionActive: "ТАКТИЧЕСКИЙ ПЕРЕХВАТ АКТИВЕН",
    totalVotes: "ВСЕГО ГОЛОСОВ",
    verifiedAthlete: "ПРОВЕРЕННЫЙ АТЛЕТ",
    fullScreenFeed: "Полноэкранный режим",
    phoneMockup: "Мобильный макет",
    codeInspector: "Инспектор Kotlin кода",
  },
  fa: {
    appTitle: "پلتفرم بحث",
    login: "ورود",
    signup: "ثبتنام",
    email: "ایمیل",
    password: "رمز عبور",
    settings: "تنظیمات",
    language: "زبان برنامه",
    logout: "خروج",
    profile: "پروفایل",
    guestNotice: "شما به عنوان مهمان مرور میکنید. برای ذخیره آرای خود وارد شوید.",
    management: "مدیریت تنظیمات و حساب کاربری",

    appName: "پلتفرم ویتو VETO",
    appSubtitle: "رهگیری تاکتیکی ورزشی",
    allFilter: "همه مباحث",
    veto0Filter: "مبنا (VETO-0)",
    rebuttalsFilter: "پاسخهای متقابل",
    recordVetoBtn: "ثبت وتو جدید",
    proStance: "موافق (HTK)",
    conStance: "مخالف (DEF)",
    commentsTitle: "مباحث و پاسخهای تاکتیکی",
    addCommentPlaceholder: "استدلال متقابل تاکتیکی خود را بنویسید...",
    sendComment: "ارسال پاسخ",
    cancel: "انصراف",
    confirm: "تایید",
    rememberMe: "مرا به خاطر بسپار",
    demoLogin: "ورود آزمایشی سریع",
    guestUser: "ورزشکار مهمان",
    account: "حساب کاربری",
    close: "بستن",
    supabaseSettings: "تنظیمات سوپابیس",
    switchLanguageNotice: "زبان به فارسی تغییر کرد",
    welcomeBack: "به پلتفرم ویتو خوش آمدید!",
    accountCreated: "حساب کاربری با موفقیت ساخته شد!",
    loggedOutMsg: "خروج با موفقیت انجام شد",
    inputRequired: "لطفا ایمیل و رمز عبور را وارد کنید",
    round: "دور",
    stanceBreakdown: "توزیع آراء و مواضع",
    interceptionActive: "رهگیری تاکتیکی فعال است",
    totalVotes: "مجموع آرا",
    verifiedAthlete: "ورزشکار تایید شده",
    fullScreenFeed: "نمایش تمام صفحه",
    phoneMockup: "نمای موبایل",
    codeInspector: "بررسی کد کاتلین",
  },
  tr: {
    appTitle: "Tartışma Platformu",
    login: "Giriş Yap",
    signup: "Kayıt Ol",
    email: "E-posta",
    password: "Şifre",
    settings: "Ayarlar",
    language: "Uygulama Dili",
    logout: "Çıkış Yap",
    profile: "Profil",
    guestNotice: "Şu anda misafir olarak geziniyorsunuz. Oylarınızı kaydetmek için giriş yapın.",
    management: "Uygulama tercihlerini ve hesabı yönet",

    appName: "VETO Platformu",
    appSubtitle: "Taktiksel Atletik Müdahale",
    allFilter: "Tüm Tartışmalar",
    veto0Filter: "Kaynak (VETO-0)",
    rebuttalsFilter: "Karşı Argümanlar",
    recordVetoBtn: "Yeni Veto",
    proStance: "LEHTE (HTK)",
    conStance: "ALEYHTE (DEF)",
    commentsTitle: "Tartışma ve Karşı Cevaplar",
    addCommentPlaceholder: "Taktiksel karşı tezinizi yazın...",
    sendComment: "Cevabı Gönder",
    cancel: "İptal",
    confirm: "Onayla",
    rememberMe: "Beni hatırla",
    demoLogin: "Hızlı Demo Girişi",
    guestUser: "Misafir Sporcu",
    account: "Hesap",
    close: "Kapat",
    supabaseSettings: "Supabase Ayarları",
    switchLanguageNotice: "Dil Türkçe olarak değiştirildi",
    welcomeBack: "VETO'ya tekrar hoş geldiniz!",
    accountCreated: "Hesap başarıyla oluşturuldu!",
    loggedOutMsg: "Başarıyla çıkış yapıldı",
    inputRequired: "Lütfen hem e-posta hem de şifre girin",
    round: "RAUNT",
    stanceBreakdown: "DURUŞ DAĞILIMI",
    interceptionActive: "TAKTİKSEL MÜDAHALE AKTİF",
    totalVotes: "TOPLAM OY",
    verifiedAthlete: "ONAYLI SPORCU",
    fullScreenFeed: "Tam Ekran Akış",
    phoneMockup: "Mobil Görünüm",
    codeInspector: "Kotlin Kod İnceleyici",
  },
  ko: {
    appTitle: "토론 플랫폼",
    login: "로그인",
    signup: "회원가입",
    email: "이메일",
    password: "비밀번호",
    settings: "설정",
    language: "앱 언어",
    logout: "로그아웃",
    profile: "프로필",
    guestNotice: "현재 게스트로 둘러보는 중입니다. 투표를 저장하려면 로그인하세요.",
    management: "앱 환경설정 및 계정 관리",

    appName: "VETO 플랫폼",
    appSubtitle: "전술적 운동 요격 시스템",
    allFilter: "모든 토론",
    veto0Filter: "원조 (VETO-0)",
    rebuttalsFilter: "반박 영상",
    recordVetoBtn: "새 거부권 등록",
    proStance: "찬성 (HTK)",
    conStance: "반대 (DEF)",
    commentsTitle: "토론 및 반박 의견",
    addCommentPlaceholder: "전술적 반론을 작성하세요...",
    sendComment: "반론 등록",
    cancel: "취소",
    confirm: "확인",
    rememberMe: "로그인 상태 유지",
    demoLogin: "데모 선수로 즉시 시작",
    guestUser: "게스트 운동선수",
    account: "계정",
    close: "닫기",
    supabaseSettings: "Supabase 클라우드 설정",
    switchLanguageNotice: "언어가 한국어로 변경되었습니다",
    welcomeBack: "VETO에 다시 오신 것을 환영합니다!",
    accountCreated: "계정이 성공적으로 생성되었습니다!",
    loggedOutMsg: "성공적으로 로그아웃되었습니다",
    inputRequired: "이메일과 비밀번호를 모두 입력해주세요",
    round: "라운드",
    stanceBreakdown: "입장 분포 현황",
    interceptionActive: "전술적 요격 시스템 작동 중",
    totalVotes: "총 투표수",
    verifiedAthlete: "인증된 선수",
    fullScreenFeed: "전체 화면 피드",
    phoneMockup: "모바일 목업 보기",
    codeInspector: "Kotlin 코드 검사기",
  },
  zh: {
    appTitle: "辩论平台",
    login: "登录",
    signup: "注册",
    email: "电子邮箱",
    password: "密码",
    settings: "设置",
    language: "应用语言",
    logout: "登出",
    profile: "个人资料",
    guestNotice: "您当前正以访客身份浏览。请登录以保存您的投票。",
    management: "管理应用偏好和账户",

    appName: "VETO 否决平台",
    appSubtitle: "战术运动拦截系统",
    allFilter: "所有辩论",
    veto0Filter: "初始原件 (VETO-0)",
    rebuttalsFilter: "反驳回应",
    recordVetoBtn: "发起新否决",
    proStance: "赞同 (HTK)",
    conStance: "反对 (DEF)",
    commentsTitle: "战术反驳与辩论记录",
    addCommentPlaceholder: "提交您的战术反驳论据...",
    sendComment: "发表反驳",
    cancel: "取消",
    confirm: "确认",
    rememberMe: "记住登录信息",
    demoLogin: "一键演示运动员登录",
    guestUser: "访客运动员",
    account: "账户",
    close: "关闭",
    supabaseSettings: "Supabase 云端配置",
    switchLanguageNotice: "语言已切换为中文",
    welcomeBack: "欢迎回到 VETO 平台！",
    accountCreated: "账号注册成功！",
    loggedOutMsg: "已成功登出",
    inputRequired: "请输入电子邮箱和密码",
    round: "回合",
    stanceBreakdown: "立场分布统计",
    interceptionActive: "战术拦截系统运作中",
    totalVotes: "总投票数",
    verifiedAthlete: "认证运动员",
    fullScreenFeed: "全屏视图",
    phoneMockup: "手机模型视图",
    codeInspector: "Kotlin 代码检视器",
  },
  ja: {
    appTitle: "ディベートプラットフォーム",
    login: "ログイン",
    signup: "登録",
    email: "メール",
    password: "パスワード",
    settings: "設定",
    language: "アプリの言語",
    logout: "ログアウト",
    profile: "プロフィール",
    guestNotice: "現在ゲストとして閲覧しています。投票を保存するにはログインしてください。",
    management: "アプリの設定とアカウントを管理",

    appName: "VETO プラットフォーム",
    appSubtitle: "戦術的アスリート迎撃システム",
    allFilter: "すべてのディベート",
    veto0Filter: "発端 (VETO-0)",
    rebuttalsFilter: "反論・迎撃",
    recordVetoBtn: "新規VETOを記録",
    proStance: "賛成 (HTK)",
    conStance: "反対 (DEF)",
    commentsTitle: "ディベート反論記録",
    addCommentPlaceholder: "戦術的反論を入力...",
    sendComment: "反論を投稿",
    cancel: "キャンセル",
    confirm: "確認",
    rememberMe: "ログイン状態を保持",
    demoLogin: "デモ選手でログイン",
    guestUser: "ゲスト選手",
    account: "アカウント",
    close: "閉じる",
    supabaseSettings: "Supabase クラウド設定",
    switchLanguageNotice: "言語を日本語に切り替えました",
    welcomeBack: "VETOへようこそ！",
    accountCreated: "アカウントを作成しました！",
    loggedOutMsg: "ログアウトしました",
    inputRequired: "メールアドレスとパスワードを入力してください",
    round: "ラウンド",
    stanceBreakdown: "スタンス内訳",
    interceptionActive: "戦術的迎撃システム作動中",
    totalVotes: "総投票数",
    verifiedAthlete: "認定アスリート",
    fullScreenFeed: "全画面フィード",
    phoneMockup: "スマホモックアップ表示",
    codeInspector: "Kotlinコードインスペクタ",
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

// دالة لجلب النص المترجم بناءً على اللغة الحالية
export function t(key: string, lang: string = currentLang): string {
  const chosenLang = lang || currentLang;
  return (translations[chosenLang] as any)?.[key] || (translations['en'] as any)?.[key] || key;
}

// اللغات التي تعتمد اتجاه اليمين إلى اليسار (RTL)
export const RTL_LANGUAGES = ['syr', 'ar', 'fa'];

// عند اختيار المستخدم للغة جديدة:
export const handleLanguageChange = (newLang: AppLanguage | string) => {
  currentLang = newLang as AppLanguage;
  if (typeof window !== 'undefined') {
    localStorage.setItem('app_lang', newLang);
    localStorage.setItem('veto_app_language', newLang);
    
    // ضبط اتجاه الصفحة تلقائياً (السريانية والفارسية والعربية يمين لليسار والبقية ليمين)
    const isRtl = RTL_LANGUAGES.includes(newLang);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang === 'syr' ? 'ar-SY' : newLang;
    
    updateUI();
  }
};

// التوافق مع استدعاء changeLanguage
export const changeLanguage = handleLanguageChange;

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
        (element as HTMLElement).innerText = t(key, currentLang);
      }
    });

    const isRtl = RTL_LANGUAGES.includes(currentLang);
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
  handleLanguageChange(lang);
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
  (window as any).t = t;
  (window as any).handleLanguageChange = handleLanguageChange;
  (window as any).changeLanguage = handleLanguageChange;
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
