"use client";

import React, { useState } from 'react';
import { Tag, Gift, Zap, Clock, Copy, Check, Gamepad2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const promos = [
  {
    id: 1,
    title: "Diskon 20% Semua Game",
    desc: "Khusus pengguna baru, dapatkan potongan hingga 20% untuk pembelian pertama di semua game yang tersedia.",
    code: "NEWUSER20",
    discount: "20%",
    validUntil: "31 Des 2024",
    minPurchase: 50000,
    maxDiscount: 25000,
    icon: <Tag className="text-white" />,
    color: "from-purple-600 to-indigo-600",
    games: ["Semua Game"],
    isActive: true,
  },
  {
    id: 2,
    title: "Bonus Diamond Mobile Legends",
    desc: "Top up minimal 500 Diamond dan dapatkan bonus 50 Diamond gratis langsung masuk ke akun game kamu!",
    code: "MLBB50BONUS",
    discount: "+50 💎",
    validUntil: "25 Des 2024",
    minPurchase: 100000,
    maxDiscount: 0,
    icon: <Gift className="text-white" />,
    color: "from-orange-600 to-amber-600",
    games: ["Mobile Legends"],
    isActive: true,
  },
  {
    id: 3,
    title: "Flash Sale Setiap Hari",
    desc: "Diskon hingga 50% untuk game pilihan setiap jam 12:00 dan 20:00. Kuota terbatas, siapa cepat dia dapat!",
    code: "FLASH50",
    discount: "50%",
    validUntil: "Setiap Hari",
    minPurchase: 0,
    maxDiscount: 50000,
    icon: <Zap className="text-white" />,
    color: "from-rose-600 to-pink-600",
    games: ["Free Fire", "PUBG Mobile"],
    isActive: true,
  },
  {
    id: 4,
    title: "Cashback 15% Pakai DANA",
    desc: "Bayar pakai DANA dan dapatkan cashback 15% langsung ke saldo DANA kamu. Maksimal cashback Rp30.000",
    code: "DANA15CB",
    discount: "15%",
    validUntil: "30 Des 2024",
    minPurchase: 25000,
    maxDiscount: 30000,
    icon: <Tag className="text-white" />,
    color: "from-blue-600 to-cyan-600",
    games: ["Semua Game"],
    isActive: true,
  },
  {
    id: 5,
    title: "Promo Akhir Tahun",
    desc: "Rayakan akhir tahun dengan diskon spesial 25% untuk semua game. Berlaku untuk semua metode pembayaran.",
    code: "NEWYEAR25",
    discount: "25%",
    validUntil: "1 Jan 2025",
    minPurchase: 75000,
    maxDiscount: 40000,
    icon: <Gift className="text-white" />,
    color: "from-emerald-600 to-teal-600",
    games: ["Semua Game"],
    isActive: true,
  },
  {
    id: 6,
    title: "Diskon Genshin Impact",
    desc: "Khusus top up Genesis Crystal, dapatkan diskon 10% tanpa minimum pembelian.",
    code: "GENSHIN10",
    discount: "10%",
    validUntil: "20 Des 2024",
    minPurchase: 0,
    maxDiscount: 15000,
    icon: <Gamepad2 className="text-white" />,
    color: "from-violet-600 to-purple-600",
    games: ["Genshin Impact"],
    isActive: false,
  },
];

const filters = ["Semua", "Aktif", "Berakhir"];

export default function PromoPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredPromos = promos.filter((promo) => {
    if (activeFilter === "Aktif") return promo.isActive;
    if (activeFilter === "Berakhir") return !promo.isActive;
    return true;
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Promo & <span className="gradient-text">Penawaran</span>
            </h1>
            <p className="text-white/50 max-w-xl mx-auto">
              Jangan lewatkan promo menarik dan diskon spesial untuk top up game favoritmu
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeFilter === filter
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Promo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromos.map((promo) => (
              <div 
                key={promo.id} 
                className={`glass p-6 rounded-3xl border border-white/10 relative overflow-hidden transition-all hover:border-primary/30 ${
                  !promo.isActive ? 'opacity-60' : ''
                }`}
              >
                {/* Background Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${promo.color} blur-[80px] opacity-20 -z-10`} />
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${promo.color} flex items-center justify-center shadow-lg`}>
                    {promo.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    promo.isActive 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-white/10 text-white/40 border border-white/10'
                  }`}>
                    {promo.isActive ? 'Aktif' : 'Berakhir'}
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-white font-bold text-lg mb-4">
                  {promo.discount}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                <p className="text-white/40 text-sm mb-6 line-clamp-2">{promo.desc}</p>

                {/* Game Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {promo.games.map((game) => (
                    <span key={game} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-white/50">
                      {game}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-6 text-sm">
                  {promo.minPurchase > 0 && (
                    <div className="flex justify-between text-white/40">
                      <span>Min. Pembelian</span>
                      <span>{formatPrice(promo.minPurchase)}</span>
                    </div>
                  )}
                  {promo.maxDiscount > 0 && (
                    <div className="flex justify-between text-white/40">
                      <span>Maks. Potongan</span>
                      <span>{formatPrice(promo.maxDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/40">
                    <span>Berlaku Hingga</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {promo.validUntil}
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                  <div className="flex-1">
                    <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Kode Promo</div>
                    <div className="text-primary font-mono font-bold">{promo.code}</div>
                  </div>
                  <button
                    onClick={() => copyCode(promo.code)}
                    disabled={!promo.isActive}
                    className={`p-3 rounded-xl transition-colors ${
                      promo.isActive 
                        ? 'bg-white/10 hover:bg-white/20' 
                        : 'bg-white/5 cursor-not-allowed'
                    }`}
                  >
                    {copiedCode === promo.code 
                      ? <Check size={18} className="text-emerald-400" /> 
                      : <Copy size={18} className="text-white/50" />
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPromos.length === 0 && (
            <div className="text-center py-20">
              <Tag size={48} className="text-white/10 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tidak Ada Promo</h3>
              <p className="text-white/50">Belum ada promo untuk filter ini</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
