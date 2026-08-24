'use client';

import './globals.css';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import VoiceCopilot from '@/components/widgets/VoiceCopilot';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Mail, Lock, User, ArrowRight, Globe as GlobeIcon, ShieldCheck } from 'lucide-react';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // AGAR USER LOGIN NAHI HAI -> TOH STRICT LOGIN SCREEN (NO ACCESS TO APP)
  if (!isAuthenticated) {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      const displayName = isRegister ? (name || 'Trader') : (email.split('@')[0] || 'Investor');
      login(displayName, email);
    };

    return (
      <div className="relative w-screen h-screen flex flex-col justify-between bg-[#0d0f12] overflow-hidden select-none">
        {/* Background Decorative Flow SVG Curves */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100,200 C300,50 800,600 1600,100"
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
          />
          <path
            d="M-50,600 C500,400 900,100 1800,500"
            fill="none"
            stroke="#475569"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* 3D Floating Coin 1 (Top Right) */}
        <div className="hidden lg:flex absolute top-12 right-24 z-10 animate-bounce [animation-duration:6s]">
          <div className="relative w-36 h-28 transform -rotate-12 hover:scale-105 transition-transform">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-[#f97316] to-[#c2410c] shadow-[0_20px_35px_rgba(234,88,12,0.35)] flex items-center justify-center border-t-2 border-orange-300">
              <div className="w-28 h-20 rounded-[30px] bg-gradient-to-b from-[#fef3c7] to-[#f59e0b] flex items-center justify-center shadow-inner border border-amber-200/50">
                <span className="text-3xl font-black text-amber-900 drop-shadow-sm font-sans">
                  ₹
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Floating Coin 2 (Bottom Left) */}
        <div className="hidden lg:flex absolute bottom-36 left-20 z-10 animate-bounce [animation-duration:8s]">
          <div className="relative w-36 h-28 transform rotate-12 hover:scale-105 transition-transform">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-[#ea580c] to-[#9a3412] shadow-[0_20px_35px_rgba(234,88,12,0.3)] flex items-center justify-center border-t-2 border-orange-300">
              <div className="w-28 h-20 rounded-[30px] bg-gradient-to-b from-[#ffedd5] to-[#fb923c] flex items-center justify-center shadow-inner border border-orange-200/50">
                <span className="text-2xl font-black text-orange-950 font-mono tracking-tighter">
                  50
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Auth Header */}
        <div className="w-full px-8 lg:px-16 py-6 flex items-center justify-between border-b border-white/5 z-20">
          <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
            FinScope<span className="text-orange-500 text-2xl leading-none">.</span>
          </div>
          <div className="text-xs font-mono text-slate-400">SECURE TERMINAL ACCESS</div>
        </div>

        {/* Center Stage Authentication Card */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto z-20 w-full my-auto">
          <div className="w-full bg-[#16181e]/95 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
            {/* Pill Switcher */}
            <div className="inline-flex p-1 rounded-full bg-[#0d0f12] border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  !isRegister ? 'bg-white text-black shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isRegister ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              {isRegister ? 'Join FinScope 360' : 'Terminal Authentication'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              {isRegister
                ? 'Create your credentials to unlock Indian macro terminal.'
                : 'Enter your credentials to unlock the 3D globe & live charts.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1 font-mono">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 bg-[#0d0f12] border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-orange-500 transition-all">
                    <User className="h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-transparent text-xs text-white focus:outline-none w-full placeholder-slate-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1 font-mono">
                  Email Address
                </label>
                <div className="flex items-center gap-2 bg-[#0d0f12] border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-orange-500 transition-all">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="trader@finscope.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent text-xs text-white focus:outline-none w-full placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1 font-mono">
                  Password
                </label>
                <div className="flex items-center gap-2 bg-[#0d0f12] border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:border-orange-500 transition-all">
                  <Lock className="h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-transparent text-xs text-white focus:outline-none w-full placeholder-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isRegister ? 'Start Free Terminal Access' : 'Sign In & Unlock Terminal'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Instant Demo?</span>
              <button
                type="button"
                onClick={() => login('Demo Trader', 'demo@finscope.in')}
                className="text-orange-400 font-bold hover:underline"
              >
                1-Click Demo Login →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="w-full bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ea580c] px-8 lg:px-16 py-4 text-white z-20 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="font-bold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Encrypted Institutional Terminal Gate
          </div>
          <div className="text-orange-100 font-mono">
            NSE Live • FII/DII Real-Time • Global 3D Geospatial Nexus
          </div>
        </div>
      </div>
    );
  }

  // AGAR USER LOGIN HAI -> POORA WEB APP UNLOCK
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0d0f12] text-slate-100 font-sans">
      <Navbar />
      <main className="flex-1 overflow-hidden relative">{children}</main>
      <VoiceCopilot />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0f12] text-slate-100">
        <AuthProvider>
          <AuthGate>{children}</AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}