"use client";

import React from 'react';
import { Gamepad2, Layers, CreditCard, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: <Gamepad2 size={24} className="text-white" />,
    title: "Pilih Game",
    desc: "Pilih game favorit kamu dari daftar game yang tersedia",
    color: "bg-purple-500",
    num: "01"
  },
  {
    icon: <Layers size={24} className="text-white" />,
    title: "Pilih Nominal",
    desc: "Pilih nominal top up dan metode pembayaran yang diinginkan",
    color: "bg-orange-500",
    num: "02"
  },
  {
    icon: <CreditCard size={24} className="text-white" />,
    title: "Lakukan Pembayaran",
    desc: "Selesaikan pembayaran dengan metode yang kamu pilih",
    color: "bg-rose-500",
    num: "03"
  },
  {
    icon: <CheckCircle2 size={24} className="text-white" />,
    title: "Selesai",
    desc: "Diamond akan masuk ke akun game kamu secara otomatis",
    color: "bg-emerald-500",
    num: "04"
  }
];

import { useLanguage } from '@/context/LanguageContext';

const HowToTopUp = () => {
  const { dict } = useLanguage();

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {dict.howTo.title} <span className="text-accent">{dict.howTo.title_highlight}</span>
        </h2>
        <p className="text-white/40">{dict.howTo.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-lg group-hover:scale-110 transition-transform`}>
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border-2 border-white/10 flex items-center justify-center text-[10px] font-bold text-white/50">
                  {step.num}
                </div>
              </div>
              {/* Dynamic Step Text */}
              <h3 className="text-lg font-bold text-white mb-2">{dict.howTo.steps[idx].title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{dict.howTo.steps[idx].desc}</p>
            </div>
            
            {/* Connector Line (Desktop) */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-white/10 to-transparent -z-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToTopUp;
