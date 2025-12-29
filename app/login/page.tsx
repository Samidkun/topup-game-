"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/ui/Toast';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { dict } = useLanguage();
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI States
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic Validation
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Format email tidak valid');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Password tidak sama');
      return;
    }

    // Simulate API Call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setToast({
        message: isLogin ? 'Berhasil masuk!' : 'Akun berhasil dibuat!',
        type: 'success'
      });
      // Here you would redirect or update auth state
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background relative">
      <Navbar />
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              {isLogin ? dict.login.login_title : dict.login.register_title}
            </h1>
            <p className="text-white/50">
              {isLogin 
                ? dict.login.login_desc
                : dict.login.register_desc
              }
            </p>
          </div>

          {/* Form Card */}
          <div className="glass p-8 rounded-3xl border border-white/10">
            {/* Toggle Login/Register */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isLogin ? 'bg-primary text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {dict.login.login_title}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                  !isLogin ? 'bg-primary text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {dict.login.register_title}
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error Alert */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{dict.login.email_label}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.login.email_placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">{dict.login.password_label}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={dict.login.password_placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">{dict.login.confirm_password_label}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={dict.login.password_placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <Link href="#" className="text-sm text-primary hover:underline">
                    {dict.login.forgot_password}
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? dict.login.processing : (isLogin ? dict.login.submit_login : dict.login.submit_register)}
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-sm">{dict.login.divider}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Login */}
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {dict.login.google}
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-white/30 text-sm mt-8">
            {dict.login.terms_start} {isLogin ? dict.login.terms_action_login : dict.login.terms_action_register}, {dict.login.terms_middle}{' '}
            <Link href="#" className="text-primary hover:underline">{dict.login.terms_conditions}</Link>
            {' '}{dict.login.terms_and}{' '}
            <Link href="#" className="text-primary hover:underline">{dict.login.privacy_policy}</Link>
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
