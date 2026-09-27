import React from 'react';

export default function SettingsModal({
  currentLang = 'syr',
  onLanguageChange,
  onClose,
  user,
  onLoginClick,
  onSignupClick,
  onLogout,
}: {
  currentLang?: string;
  onLanguageChange?: (lang: any) => void;
  onClose?: () => void;
  user?: any;
  currentUser?: any;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogout?: () => void;
  [key: string]: any;
}) {
  const languages = [
    { code: 'syr', label: 'السريانية', sub: 'syr / RTL' },
    { code: 'en', label: 'English', sub: 'LTR English' },
    { code: 'es', label: 'Español', sub: 'LTR Español' },
    { code: 'fr', label: 'Français', sub: 'LTR Français' },
    { code: 'de', label: 'Deutsch', sub: 'LTR Deutsch' },
    { code: 'it', label: 'Italiano', sub: 'LTR Italiano' },
    { code: 'el', label: 'Ελληνικά', sub: 'LTR Ελληνικά' },
    { code: 'sv', label: 'Svenska', sub: 'LTR Svenska' },
    { code: 'no', label: 'Norsk', sub: 'LTR Norsk' },
    { code: 'da', label: 'Dansk', sub: 'LTR Dansk' },
    { code: 'ru', label: 'Русский', sub: 'LTR Русский' },
    { code: 'fa', label: 'فارسی', sub: 'fa / RTL' },
    { code: 'tr', label: 'Türkçe', sub: 'LTR Türkçe' },
    { code: 'ko', label: '한국어', sub: 'LTR 한국어' },
    { code: 'zh', label: '中文', sub: 'LTR 中文' },
    { code: 'ja', label: '日本語', sub: 'LTR 日本語' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
        
        {/* رأس النافذة */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-bold">الإعدادات</h2>
            <p className="text-xs text-gray-400">إدارة تفضيلات التطبيق والحساب</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-6">
          
          {/* قسم اختيار لغة التطبيق (بدون أي أعلام نهائياً) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300 block">لغة التطبيق</label>
              <span className="text-[11px] text-gray-400">16 لغة مدعومة</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onLanguageChange && onLanguageChange(item.code)}
                  className={`p-2.5 rounded-xl border text-right rtl:text-right ltr:text-left transition-all flex flex-col justify-between cursor-pointer ${
                    currentLang === item.code 
                      ? 'border-green-500 bg-green-500/10 text-white shadow-sm ring-1 ring-green-500/30' 
                      : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs sm:text-sm">{item.label}</span>
                    {currentLang === item.code && <span className="text-green-500 font-bold text-xs">✓</span>}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* قسم الملف الشخصي والحساب */}
          <div className="bg-gray-800/40 border border-gray-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-300">الملف الشخصي</h3>
            {user ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  مرحباً بك، <span className="font-bold text-white">{user.email}</span>
                </div>
                {onLogout && (
                  <button 
                    type="button"
                    onClick={onLogout}
                    className="w-full py-2 px-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all cursor-pointer"
                  >
                    تسجيل الخروج
                  </button>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400">
                انت تتصفح حالياً كرياضي زائر. سجّل الدخول لحفظ اصواتك وردودك.
              </p>
            )}
            
            {!user && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button 
                  type="button"
                  onClick={onLoginClick}
                  className="py-2 px-4 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  تسجيل الدخول
                </button>
                <button 
                  type="button"
                  onClick={onSignupClick}
                  className="py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-all border border-gray-700 cursor-pointer"
                >
                  إنشاء حساب جديد
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export { SettingsModal };
