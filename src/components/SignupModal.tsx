import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface SignupModalProps {
  onClose: () => void;
  onSuccess?: (user: any) => void;
}

export default function SignupModal({ onClose, onSuccess }: SignupModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // دالة حساب العمر والتحقق من أنه 18 سنة أو أكثر
  const validateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // التحقق من إدخال تاريخ الميلاد
    if (!birthdate) {
      setError('يرجى إدخال تاريخ الميلاد.');
      return;
    }

    // التحقق من الشرط القانوني (18 سنة فأكثر)
    if (!validateAge(birthdate)) {
      setError('عذراً، يجب أن يكون عمرك 18 عاماً أو أكثر لتسجيل الحساب.');
      return;
    }

    setLoading(true);

    try {
      // إرسال طلب إنشاء الحساب إلى Supabase
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            birthdate: birthdate, // تخزين تاريخ الميلاد ضمن بيانات المستخدم الإضافية
          }
        }
      });

      if (signupError) throw signupError;

      // نجاح التسجيل والدخول الفوري
      const user = data?.user || (data?.session ? data.session.user : null);
      if (onSuccess) onSuccess(user);
      onClose();

    } catch (err: any) {
      setError(err?.message || 'حدث خطأ أثناء إنشاء الحساب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 text-white space-y-4">
        
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <h2 className="text-lg font-bold">إنشاء حساب جديد</h2>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:border-green-500 outline-none"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">كلمة المرور</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:border-green-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">تاريخ الميلاد (الشرط القانوني: 18 سنة فأكثر)</label>
            <input 
              type="date" 
              value={birthdate} 
              onChange={(e) => setBirthdate(e.target.value)} 
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:border-green-500 outline-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب والدخول'}
          </button>
        </form>

      </div>
    </div>
  );
}

export { SignupModal };
