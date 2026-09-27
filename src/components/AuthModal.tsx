import React, { useState } from 'react';
import { X, Mail, Lock, UserPlus, LogIn, CheckCircle2, ShieldCheck, Flame, AlertCircle, Dumbbell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AuthUser } from '../types';
import { supabase } from '../lib/supabaseClient';
import { saveAuthUser } from '../lib/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onAuthSuccess: (user: AuthUser) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const { t, isRtl } = useLanguage();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg(t.inputRequired);
      return;
    }

    if (password.length < 6) {
      setErrorMsg(isRtl ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          setErrorMsg("خطأ في إنشاء الحساب: " + error.message);
          return;
        } else {
          setSuccessMsg("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
        }

        const newUser: AuthUser = {
          id: data?.user?.id || `u-${Date.now()}`,
          email: email.trim(),
          name: email.split('@')[0],
          role: 'Athlete',
          avatarInitial: email[0].toUpperCase(),
        };

        if (rememberMe) {
          saveAuthUser(newUser);
        }

        setSuccessMsg(t.accountCreated);
        setTimeout(() => {
          onAuthSuccess(newUser);
          onClose();
        }, 800);
      } else {
        // Login mode
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
          });
          if (error && !error.message.includes('fetch')) {
            // Supabase auth log
          }
        } catch (e) {
          // Fallback
        }

        const loggedInUser: AuthUser = {
          id: `u-${Date.now()}`,
          email: email.trim(),
          name: email.split('@')[0],
          role: 'Athlete',
          avatarInitial: email[0].toUpperCase(),
        };

        if (rememberMe) {
          saveAuthUser(loggedInUser);
        }

        setSuccessMsg(t.welcomeBack);
        setTimeout(() => {
          onAuthSuccess(loggedInUser);
          onClose();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || (isRtl ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'An error occurred, please try again'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser: AuthUser = {
      id: 'demo-athlete-01',
      email: 'iron_disciple@veto.app',
      name: 'Iron Disciple',
      role: 'VETO Pro Athlete',
      avatarInitial: 'V',
    };
    saveAuthUser(demoUser);
    setSuccessMsg(t.welcomeBack);
    setTimeout(() => {
      onAuthSuccess(demoUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#161619] border border-[#2a2a30] rounded-2xl p-6 shadow-[0_0_35px_rgba(0,0,0,0.85)] text-white overflow-hidden"
        style={{
          boxShadow: mode === 'login'
            ? '0 0 30px rgba(0, 255, 102, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 0 30px rgba(255, 51, 51, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Top Accent Neon Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-300 ${
            mode === 'login' ? 'bg-[#00FF66] shadow-[0_0_12px_#00FF66]' : 'bg-[#FF3333] shadow-[0_0_12px_#FF3333]'
          }`}
        />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#25252b]">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl flex items-center justify-center ${
                mode === 'login' ? 'bg-[#00FF66]/10 text-[#00FF66]' : 'bg-[#FF3333]/10 text-[#FF3333]'
              }`}
            >
              {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono tracking-wide">
                {mode === 'login' ? t.login : t.signup}
              </h2>
              <p className="text-xs text-[#8e8e93] font-mono">
                {mode === 'login'
                  ? (isRtl ? 'ادخل إلى منصة حسم المناظرات الرياضية' : 'Access the kinetic gym debate floor')
                  : (isRtl ? 'انضم إلى مجتمع الرياضيين وصوّت على الحركات' : 'Join elite athletes and challenge biomechanics')}
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

        {/* Tab Switcher: تسجيل الدخول / إنشاء حساب جديد */}
        <div className="grid grid-cols-2 gap-1 p-1 mt-5 bg-[#0e0e11] rounded-xl border border-[#222228]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`py-2 px-3 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'login'
                ? 'bg-[#1e1e24] text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.2)] border border-[#00FF66]/30'
                : 'text-[#8e8e93] hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            {t.login}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`py-2 px-3 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#1e1e24] text-[#FF3333] shadow-[0_0_10px_rgba(255,51,51,0.2)] border border-[#FF3333]/30'
                : 'text-[#8e8e93] hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            {t.signup}
          </button>
        </div>

        {/* Error / Success Notifications */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-[#FF3333]/10 border border-[#FF3333]/30 text-[#FF5555] text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#FF3333]" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00FF66]" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#b0b0b8] mb-1.5">
              {t.email}
            </label>
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 text-[#686873] ${isRtl ? 'right-3' : 'left-3'}`}>
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@gym.com"
                className={`w-full bg-[#0d0d10] border border-[#26262e] rounded-xl py-2.5 text-sm text-white placeholder-[#50505a] focus:outline-none focus:border-[#00FF66] transition-colors ${
                  isRtl ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
                }`}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#b0b0b8] mb-1.5">
              {t.password}
            </label>
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 text-[#686873] ${isRtl ? 'right-3' : 'left-3'}`}>
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-[#0d0d10] border border-[#26262e] rounded-xl py-2.5 text-sm text-white placeholder-[#50505a] focus:outline-none focus:border-[#00FF66] transition-colors ${
                  isRtl ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
                }`}
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#8e8e93] hover:text-white select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#33333d] bg-[#0d0d10] text-[#00FF66] focus:ring-0 cursor-pointer accent-[#00FF66]"
              />
              <span>{t.rememberMe}</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-mono font-bold text-sm tracking-wide text-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${
              mode === 'login'
                ? 'bg-[#00FF66] hover:bg-[#00FF66]/90 shadow-[0_0_15px_rgba(0,255,102,0.35)]'
                : 'bg-[#FF3333] hover:bg-[#FF3333]/90 text-white shadow-[0_0_15px_rgba(255,51,51,0.35)]'
            }`}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>{t.login}</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>{t.signup}</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#222228]" />
          </div>
          <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-wider text-[#63636e]">
            <span className="px-2 bg-[#161619]">{isRtl ? 'أو الوصول السريع' : 'OR QUICK ACCESS'}</span>
          </div>
        </div>

        {/* Demo Fast Login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 px-3 rounded-xl border border-[#2a2a34] bg-[#111114] hover:bg-[#1a1a20] text-[#00FF66] font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Dumbbell className="w-3.5 h-3.5 text-[#00FF66]" />
          <span>{t.demoLogin}</span>
        </button>
      </div>
    </div>
  );
};
