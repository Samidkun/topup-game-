"use client";

import React from 'react';
import { Zap, ShieldCheck, Headphones } from 'lucide-react';

const Hero = () => {
  return (
    // Tambahin items-center di sini buat maksa semua anak elemen lurus di as tengah
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center">
      {/* Background Glows - Gue benerin biar lebih simetris */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-medium text-white/80 mb-8 w-fit">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Platform Top Up No. 1 di Indonesia
          <span className="text-white ml-2">Lihat Promo Terbaru →</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl">
          Top Up Game Favorit<br />
          <span className="gradient-text">Dalam Sekejap Mata</span>
        </h1>
        
        {/* Description - Max-width sudah benar, tapi pastiin mx-auto jalan */}
        <p className="max-w-2xl text-white/60 text-lg mb-12">
          Nikmati pengalaman top up tercepat dengan proses otomatis, keamanan terjamin, dan harga ter-affordable untuk semua game favorit kamu
        </p>

        {/* Feature Cards */}
        {/* Pastikan justify-center buat jaga-jaga kalau card-nya kurang dari 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full justify-center">
          {[
            { 
              icon: <Zap className="text-accent" />, 
              title: "Proses Instan", 
              desc: "Transaksi diproses otomatis dan diamond masuk ke akun kamu dalam hitungan detik" 
            },
            { 
              icon: <ShieldCheck className="text-accent" />, 
              title: "100% Aman & Legal", 
              desc: "Sistem keamanan berlapis dengan opsi pembayaran resmi dan terpercaya" 
            },
            { 
              icon: <Headphones className="text-accent" />, 
              title: "Support 24/7", 
              desc: "Tim customer service kami siap membantu setiap saat tanpa henti" 
            },
          ].map((feature, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-primary/50 transition-all duration-300">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;