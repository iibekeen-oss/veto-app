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
  onLanguageChange?: (lang: 'syr' | 'en') => void;
  onClose?: () => void;
  user?: any;
  currentUser?: any;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogout?: () => void;
  [key: string]: any;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-white">
        
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
            <label className="text-sm font-medium text-gray-300 block">لغة التطبيق</label>
            
            <div className="grid grid-cols-2 gap-3">
              {/* زر اللغة السريانية - نقي وخالٍ تماماً من الأعلام */}
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('syr')}
                className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  currentLang === 'syr' 
                    ? 'border-green-500 bg-green-500/10 text-white' 
                    : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm">السريانية</span>
                  {currentLang === 'syr' && <span className="text-green-500 font-bold">✓</span>}
                </div>
                <span className="text-xs text-gray-500 mt-2">syr / RTL</span>
              </button>

              {/* زر اللغة الإنجليزية - نقي وخالٍ تماماً من الأعلام */}
              <button
                type="button"
                onClick={() => onLanguageChange && onLanguageChange('en')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  currentLang === 'en' 
                    ? 'border-green-500 bg-green-500/10 text-white' 
                    : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm">English</span>
                  {currentLang === 'en' && <span className="text-green-500 font-bold">✓</span>}
                </div>
                <span className="text-xs text-gray-500 mt-2">LTR English</span>
              </button>
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
