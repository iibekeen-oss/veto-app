import React from 'react';
import {
  X,
  Settings,
  Languages,
  LogOut,
  LogIn,
  User,
  Shield,
  Database,
  Check,
  Flame,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AuthUser, AppLanguage } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenSupabaseModal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenSupabaseModal,
}) => {
  const { language, setLanguage, t, isRtl } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#161619] border border-[#2a2a30] rounded-2xl p-6 shadow-[0_0_35px_rgba(0,0,0,0.85)] text-white overflow-hidden">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] via-[#FF3333] to-[#00FF66]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#25252b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#202026] text-[#00FF66] border border-[#2a2a34]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono tracking-wide">{t.settings}</h2>
              <p className="text-xs text-[#8e8e93] font-mono">
                {isRtl ? 'إدارة تفضيلات التطبيق والحساب' : 'Application preferences & profile'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8e8e93] hover:text-white hover:bg-[#25252b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Section 1: لغة التطبيق (Language) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-mono font-bold text-[#b0b0b8] flex items-center gap-2">
                <Languages className="w-4 h-4 text-[#00FF66]" />
                <span>{t.language}</span>
              </label>
              <span className="text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded-md border border-[#00FF66]/20">
                {language === 'ar' ? 'العربية نشطة' : 'English Active'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Arabic Option */}
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                  language === 'ar'
                    ? 'bg-[#1a231d] border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.2)]'
                    : 'bg-[#111114] border-[#222228] hover:border-[#33333d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇸🇦</span>
                  <div>
                    <p className="text-xs font-bold text-white font-sans">العربية</p>
                    <p className="text-[10px] text-[#70707a] font-mono">RTL Arabic</p>
                  </div>
                </div>
                {language === 'ar' && <Check className="w-4 h-4 text-[#00FF66]" />}
              </button>

              {/* English Option */}
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#1a231d] border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.2)]'
                    : 'bg-[#111114] border-[#222228] hover:border-[#33333d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇺🇸</span>
                  <div>
                    <p className="text-xs font-bold text-white font-mono">English</p>
                    <p className="text-[10px] text-[#70707a] font-mono">LTR English</p>
                  </div>
                </div>
                {language === 'en' && <Check className="w-4 h-4 text-[#00FF66]" />}
              </button>
            </div>
          </div>

          {/* Section 2: الملف الشخصي (Profile) */}
          <div className="p-4 rounded-xl bg-[#101013] border border-[#222228]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#b0b0b8] flex items-center gap-2">
                <User className="w-4 h-4 text-[#FF3333]" />
                <span>{t.profile}</span>
              </span>
              {currentUser && (
                <span className="text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#00FF66]" />
                  <span>{currentUser.role || t.verifiedAthlete}</span>
                </span>
              )}
            </div>

            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF3333] to-[#990000] text-white font-mono font-black flex items-center justify-center text-base shadow-[0_0_12px_rgba(255,51,51,0.4)]">
                    {currentUser.avatarInitial || currentUser.name[0] || 'V'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate font-mono">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-[#8e8e93] truncate font-mono">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                {/* Athlete Kinetic Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1c1c22] text-center">
                  <div className="p-2 rounded-lg bg-[#16161b] border border-[#23232b]">
                    <p className="text-[10px] text-[#70707c] font-mono">
                      {isRtl ? 'الأصوات' : 'Votes'}
                    </p>
                    <p className="text-xs font-mono font-bold text-[#00FF66]">14</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#16161b] border border-[#23232b]">
                    <p className="text-[10px] text-[#70707c] font-mono">
                      {isRtl ? 'الردود' : 'Rebuttals'}
                    </p>
                    <p className="text-xs font-mono font-bold text-[#FF3333]">3</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#16161b] border border-[#23232b]">
                    <p className="text-[10px] text-[#70707c] font-mono">
                      {isRtl ? 'الدقة' : 'Accuracy'}
                    </p>
                    <p className="text-xs font-mono font-bold text-white">92%</p>
                  </div>
                </div>

                {/* تسجيل الخروج (Logout) */}
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-[#221518] hover:bg-[#2e191d] border border-[#FF3333]/30 text-[#FF5555] font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(255,51,51,0.15)]"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#FF3333]" />
                  <span>{t.logout}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#8e8e93] font-mono">
                  {isRtl
                    ? 'أنت تتصفح حالياً كرياضي زائر. سجّل الدخول لحفظ أصواتك وردودك.'
                    : 'Browsing as a guest athlete. Log in to sync votes and official rebuttals.'}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuth('login');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#00FF66] hover:bg-[#00FF66]/90 text-black font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,255,102,0.25)]"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{t.login}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuth('signup');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#1b1c22] hover:bg-[#252834] border border-[#FF3333]/40 text-[#FF5555] font-mono font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 text-[#FF3333]" />
                    <span>{t.signup}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: قاعدة بيانات Supabase (Cloud Sync) */}
          <div className="p-3.5 rounded-xl bg-[#0e0e11] border border-[#202026] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <span>Supabase Live Database</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] animate-ping" />
                </p>
                <p className="text-[10px] text-[#6b6b75] font-mono">
                  {isRtl ? 'مزامنة مباشرة لعدادات المؤيدين والمعارضين' : 'Real-time PRO/CON stance sync'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSupabaseModal();
              }}
              className="py-1.5 px-3 rounded-lg bg-[#191920] hover:bg-[#252530] text-[#3ECF8E] text-[11px] font-mono font-bold border border-[#3ECF8E]/30 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{isRtl ? 'تعديل' : 'Config'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-6 pt-4 border-t border-[#222228] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-[#1e1e24] hover:bg-[#282832] text-white font-mono font-bold text-xs transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
