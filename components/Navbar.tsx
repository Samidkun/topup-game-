"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">GameTopUp</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Beranda', href: '/' },
            { label: 'Game', href: '/#games' },
            { label: 'Promo', href: '/promo' },
            { label: 'Bantuan', href: '/#faq' },
            { label: 'Cek Transaksi', href: '/cek-transaksi' },
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Search, Cart, Login */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-white/70 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <Link href="/checkout" className="relative">
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <ShoppingCart size={20} />
            </button>
            <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
          <Link href="/login" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all">
            <LogIn size={18} />
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
