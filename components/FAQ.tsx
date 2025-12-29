"use client";

import React, { useState } from 'react';
import { Star, ChevronDown, MessageSquareQuote } from 'lucide-react';

const testimonials = [
  {
    name: "Siti Nurhaliza",
    game: "Free Fire Indonesia",
    text: "Sudah langganan top up di sini! Pelayanan customer servicenya ramah banget dan selalu fast response.",
    rating: 5,
    avatar: "/images/games/Image (Siti Nurhaliza).png"
  },
  {
    name: "Adi Nugroho",
    game: "Mobile Legends Bang Bang",
    text: "Topup 1000 diamond langsung masuk dalam hitungan detik. Harganya juga bersaing banget!",
    rating: 5,
    avatar: "/images/games/Image (Siti Nurhaliza).png"
  },
  {
    name: "Budi Santoso",
    game: "PUBG Mobile Indonesia",
    text: "Mantap pelayanannya, amanah dan terpercaya. Bakal jadi langganan terus nih.",
    rating: 5,
    avatar: "/images/games/Image (Siti Nurhaliza).png"
  }
];

const faqs = [
  { q: "Berapa lama waktu yang dibutuhkan untuk proses top up?", a: "Proses top up biasanya memakan waktu kurang dari 60 detik setelah pembayaran terverifikasi secara otomatis oleh sistem kami." },
  { q: "Apakah aman melakukan top up di platform ini?", a: "Sangat aman! Kami menggunakan gateway pembayaran resmi dan terpercaya untuk memastikan keamanan transaksi Anda." },
  { q: "Metode pembayaran apa saja yang tersedia?", a: "Kami menyediakan berbagai metode pembayaran mulai dari QRIS, E-Wallet (Dana, Ovo, GoPay), Virtual Account Bank, hingga Minimarket (Alfamart/Indomaret)." },
  { q: "Bagaimana jika top up gagal atau diamond tidak masuk?", a: "Jika terjadi kendala, silakan hubungi customer service kami melalui WhatsApp (24/7) dengan melampirkan bukti transaksi." },
  { q: "Apakah bisa melakukan refund jika salah membeli?", a: "Sayangnya, semua transaksi yang sudah berhasil diproses tidak dapat dibatalkan atau direfund. Harap teliti kembali ID dan nominal sebelum membayar." }
];

import { useLanguage } from '@/context/LanguageContext';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { dict } = useLanguage();

  return (
    <section className="py-20 bg-muted-purple/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {dict.faq.testimonials.title} <span className="text-accent">{dict.faq.testimonials.title_highlight}</span>
            </h2>
            <p className="text-white/40">{dict.faq.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl relative group border border-white/5 hover:border-primary/30 transition-all w-full max-w-md">
                <MessageSquareQuote size={40} className="absolute top-6 right-8 text-white/5 group-hover:text-primary/10 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                    <p className="text-white/30 text-[10px] font-medium uppercase tracking-wider">{t.game}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/60 text-sm font-medium">4.9/5 {dict.faq.testimonials.rating_text}</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {dict.faq.questions.title} <span className="text-accent">{dict.faq.questions.title_highlight}</span>
            </h2>
            <p className="text-white/40">{dict.faq.questions.subtitle}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass rounded-2xl border border-white/5 overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-semibold">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-white/30 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                {openIndex === idx && (
                  <div className="px-8 pb-6 text-white/40 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 glass p-8 rounded-3xl border border-white/5 text-center">
            <h3 className="text-white font-bold mb-2">{dict.faq.questions.contact_title}</h3>
            <p className="text-white/40 text-sm mb-6">{dict.faq.questions.contact_subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all flex items-center gap-2">
                {dict.faq.questions.whatsapp}
              </button>
              <button className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all flex items-center gap-2">
                {dict.faq.questions.chat}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
