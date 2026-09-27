import React from 'react';
import { AuthUser, AppLanguage } from '../types';

export interface SettingsModalProps {
  isOpen?: boolean;
  currentLang?: AppLanguage | string;
  onLanguageChange?: (lang: AppLanguage | any) => void;
  onClose: () => void;
  user?: AuthUser | null;
  currentUser?: AuthUser | null;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogout?: () => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
  onOpenSupabaseModal?: () => void;
}

export function SettingsModal({
  isOpen = true,
  currentLang = 'syr',
  onLanguageChange,
  onClose,
  user,
  currentUser,
  onLoginClick,
  onSignupClick,
  onLogout,
  onOpenAuth,
}: SettingsModalProps) {
  if (isOpen === false) return null;

  const activeUser = user || currentUser;
  const activeLang = currentLang === 'ar' ? 'syr' : currentLang;

  const handleLangChange = (lang: 'syr' | 'en') => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else if (onOpenAuth) {
      onOpenAuth('login');
    }
  };

  const handleSignup = () => {
    if (onSignupClick) {
      onSignupClick();
    } else if (onOpenAuth) {
      onOpenAuth('signup');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
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
                onClick={() => handleLangChange('syr')}
                className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  activeLang === 'syr' 
                    ? 'border-green-500 bg-green-500/10 text-white' 
                    : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm">السريانية</span>
                  {activeLang === 'syr' && <span className="text-green-500 font-bold">✓</span>}
                </div>
                <span className="text-xs text-gray-500 mt-2">syr / RTL</span>
              </button>

              {/* زر اللغة الإنجليزية - نقي وخالٍ تماماً من الأعلام */}
              <button
                type="button"
                onClick={() => handleLangChange('en')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  activeLang === 'en' 
                    ? 'border-green-500 bg-green-500/10 text-white' 
                    : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm">English</span>
                  {activeLang === 'en' && <span className="text-green-500 font-bold">✓</span>}
                </div>
                <span className="text-xs text-gray-500 mt-2">LTR English</span>
              </button>
            </div>
          </div>

          {/* قسم الملف الشخصي والحساب */}
          <div className="bg-gray-800/40 border border-gray-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-300">الملف الشخصي</h3>
            {activeUser ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  مرحباً بك، <span className="font-bold text-white">{activeUser.email}</span>
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
            
            {!activeUser && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button 
                  type="button"
                  onClick={handleLogin}
                  className="py-2 px-4 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  تسجيل الدخول
                </button>
                <button 
                  type="button"
                  onClick={handleSignup}
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

export default SettingsModal;
