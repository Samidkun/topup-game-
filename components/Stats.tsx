"use client";

import React from 'react';
import { Users, CreditCard, Gamepad2, Star } from 'lucide-react';

const Stats = () => {
  const stats = [
    { label: "2.5M+", sub: "Pengguna Aktif", icon: <Users size={20} />, color: "from-purple-500 to-indigo-500" },
    { label: "10M+", sub: "Transaksi Sukses", icon: <CreditCard size={20} />, color: "from-pink-500 to-rose-500" },
    { label: "500+", sub: "Game Tersedia", icon: <Gamepad2 size={20} />, color: "from-orange-500 to-amber-500" },
    { label: "4.9/5", sub: "Rating Pengguna", icon: <Star size={20} />, color: "from-yellow-400 to-orange-400" },
  ];

  return (
    <section className="py-16 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Pake grid center yang tegas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              {/* Icon dengan Glow Effect biar lebih premium */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} blur-lg opacity-40 group-hover:opacity-70 transition-opacity`} />
                <span className="relative z-10">{stat.icon}</span>
              </div>
              
              <div className="relative">
                <div className="text-3xl font-bold text-white tracking-tight">{stat.label}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;