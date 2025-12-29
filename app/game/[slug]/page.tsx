"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingCart, Copy, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const nominals = [
  { id: 1, diamonds: 86, bonus: 0, price: 19000 },
  { id: 2, diamonds: 172, bonus: 0, price: 38000 },
  { id: 3, diamonds: 257, bonus: 0, price: 57000 },
  { id: 4, diamonds: 344, bonus: 0, price: 76000 },
  { id: 5, diamonds: 429, bonus: 0, price: 95000 },
  { id: 6, diamonds: 514, bonus: 0, price: 114000 },
  { id: 7, diamonds: 600, bonus: 14, price: 133000 },
  { id: 8, diamonds: 706, bonus: 16, price: 152000 },
  { id: 9, diamonds: 878, bonus: 20, price: 190000 },
  { id: 10, diamonds: 1050, bonus: 24, price: 228000 },
  { id: 11, diamonds: 1412, bonus: 32, price: 304000 },
  { id: 12, diamonds: 2195, bonus: 50, price: 475000 },
];

export default function GameDetailPage() {
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');

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
      
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Game Info & Nominals */}
            <div className="lg:col-span-2 space-y-8">
              {/* Game Header */}
              <div className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6">
                <img 
                  src="/images/games/Image (Mobile Legends).png" 
                  alt="Mobile Legends"
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Mobile Legends: Bang Bang</h1>
                  <p className="text-white/50 text-sm">Moonton • MOBA</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">Popular</span>
                    <span className="px-3 py-1 bg-white/10 text-white/60 text-xs font-medium rounded-full">Proses Instan</span>
                  </div>
                </div>
              </div>

              {/* Input User ID */}
              <div className="glass p-6 rounded-3xl border border-white/10">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">1</span>
                  Masukkan Data Akun
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">User ID</label>
                    <input
                      type="text"
                      placeholder="Masukkan User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Zone ID</label>
                    <input
                      type="text"
                      placeholder="Masukkan Zone ID"
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                <p className="text-white/30 text-xs mt-3">
                  User ID dan Zone ID bisa dilihat di profil game kamu
                </p>
              </div>

              {/* Pilih Nominal */}
              <div className="glass p-6 rounded-3xl border border-white/10">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">2</span>
                  Pilih Nominal
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {nominals.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedNominal(item.id)}
                      className={`relative p-4 rounded-2xl border text-left transition-all ${
                        selectedNominal === item.id
                          ? 'bg-primary/20 border-primary'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {selectedNominal === item.id && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 size={16} className="text-primary" />
                        </div>
                      )}
                      <div className="text-white font-bold">
                        {item.diamonds} 💎
                        {item.bonus > 0 && (
                          <span className="text-accent text-xs ml-1">+{item.bonus}</span>
                        )}
                      </div>
                      <div className="text-white/50 text-sm mt-1">
                        {formatPrice(item.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="glass p-6 rounded-3xl border border-white/10 sticky top-28">
                <h2 className="text-lg font-bold text-white mb-6">Ringkasan Pesanan</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Game</span>
                    <span className="text-white font-medium">Mobile Legends</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">User ID</span>
                    <span className="text-white font-medium">{userId || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Zone ID</span>
                    <span className="text-white font-medium">{serverId || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Item</span>
                    <span className="text-white font-medium">
                      {selectedNominal 
                        ? `${nominals.find(n => n.id === selectedNominal)?.diamonds} Diamonds`
                        : '-'
                      }
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white/50">Total</span>
                    <span className="text-2xl font-bold text-white">
                      {selectedNominal 
                        ? formatPrice(nominals.find(n => n.id === selectedNominal)?.price || 0)
                        : '-'
                      }
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    selectedNominal && userId && serverId
                      ? 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  Lanjut ke Pembayaran
                </Link>

                <p className="text-white/30 text-xs text-center mt-4">
                  Dengan melanjutkan, kamu menyetujui Syarat & Ketentuan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
