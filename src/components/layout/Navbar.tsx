'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import MacroTickerTape from '@/components/widgets/MacroTickerTape';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/terminal', label: 'Terminal' },
    { href: '/sectors', label: 'Sectors' },
    { href: '/institutional', label: 'FII/DII' },
    { href: '/stress-test', label: 'AI Stress' },
    { href: '/risk', label: 'Risk Matrix' },
    { href: '/ai-intel', label: 'AI Wire' },
  ];

  return (
    <header className="w-full z-50 bg-[#0d0f12] px-6 lg:px-14 py-3.5 flex flex-col border-b border-white/5 shrink-0">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
          FinScope<span className="text-orange-500 text-2xl leading-none">.</span>
        </Link>

        {/* Center Minimal Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive ? 'text-white font-bold' : 'hover:text-white text-slate-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Auth Action */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#1b1e24] border border-white/10 px-3 py-1.5 rounded-full text-xs text-slate-200">
                <div className="h-5 w-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-[10px]">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="font-medium max-w-[100px] truncate">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-full bg-slate-800/60 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/"
              className="px-5 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-slate-200 transition-all shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}