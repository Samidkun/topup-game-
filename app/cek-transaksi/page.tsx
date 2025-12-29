"use client";

import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle2, XCircle, AlertCircle, Copy, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

// Dummy transaction data
const dummyTransactions = [
  {
    invoice: 'INV-2024122900001',
    status: 'success',
    game: 'Mobile Legends',
    item: '706 Diamonds +16 Bonus',
    price: 152000,
    date: '29 Des 2024, 14:30',
    paymentMethod: 'DANA',
  },
  {
    invoice: 'INV-2024122800002',
    status: 'pending',
    game: 'Free Fire',
    item: '520 Diamonds',
    price: 75000,
    date: '28 Des 2024, 10:15',
    paymentMethod: 'BCA Virtual Account',
  },
  {
    invoice: 'INV-2024122700003',
    status: 'failed',
    game: 'PUBG Mobile',
    item: '660 UC',
    price: 159000,
    date: '27 Des 2024, 18:45',
    paymentMethod: 'GoPay',
  },
];

export default function CekTransaksiPage() {
  const { dict } = useLanguage();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [searchResult, setSearchResult] = useState<typeof dummyTransactions[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  // Status config moved inside to use dict
  const statusConfig = {
    success: {
      label: dict.checkTransaction.status_success,
      icon: <CheckCircle2 size={16} />,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    pending: {
      label: dict.checkTransaction.status_pending,
      icon: <Clock size={16} />,
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    },
    failed: {
      label: dict.checkTransaction.status_failed,
      icon: <XCircle size={16} />,
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
    },
  };

  const handleSearch = () => {
    const result = dummyTransactions.find(
      (t) => t.invoice.toLowerCase() === invoiceNumber.toLowerCase()
    );
    if (result) {
      setSearchResult(result);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const copyInvoice = () => {
    if (searchResult) {
      navigator.clipboard.writeText(searchResult.invoice);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{dict.checkTransaction.title}</h1>
            <p className="text-white/50">
              {dict.checkTransaction.subtitle}
            </p>
          </div>

          {/* Search Box */}
          <div className="glass p-6 rounded-3xl border border-white/10 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                <input
                  type="text"
                  placeholder={dict.checkTransaction.placeholder}
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                {dict.checkTransaction.check_btn}
              </button>
            </div>
          </div>

          {/* Not Found */}
          {notFound && (
            <div className="glass p-8 rounded-3xl border border-white/10 text-center">
              <AlertCircle size={48} className="text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{dict.checkTransaction.not_found_title}</h3>
              <p className="text-white/50">
                {dict.checkTransaction.not_found_desc}
              </p>
            </div>
          )}

          {/* Search Result */}
          {searchResult && (
            <div className="glass p-8 rounded-3xl border border-white/10">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig[searchResult.status as keyof typeof statusConfig].color}`}>
                  {statusConfig[searchResult.status as keyof typeof statusConfig].icon}
                  <span className="text-sm font-medium">
                    {statusConfig[searchResult.status as keyof typeof statusConfig].label}
                  </span>
                </div>
                <span className="text-white/30 text-sm">{searchResult.date}</span>
              </div>

              {/* Invoice Number */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-6">
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{dict.checkTransaction.invoice_label}</div>
                  <div className="text-white font-mono font-bold">{searchResult.invoice}</div>
                </div>
                <button
                  onClick={copyInvoice}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                  {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} className="text-white/50" />}
                </button>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-white/50">Game</span>
                  <span className="text-white font-medium">{searchResult.game}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-white/50">{dict.gameDetail.item}</span>
                  <span className="text-white font-medium">{searchResult.item}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-white/50">{dict.checkTransaction.payment_method}</span>
                  <span className="text-white font-medium">{searchResult.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-white/50">{dict.checkTransaction.total_payment}</span>
                  <span className="text-xl font-bold text-white">{formatPrice(searchResult.price)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {searchResult.status === 'pending' && (
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <p className="text-yellow-400 text-sm mb-4">
                    {dict.checkTransaction.pay_now_warning}
                  </p>
                  <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-colors">
                    {dict.checkTransaction.pay_now_btn}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
            <h4 className="text-white font-medium mb-3">💡 {dict.checkTransaction.tips_title}</h4>
            <ul className="text-white/40 text-sm space-y-2">
              {dict.checkTransaction.tips_list.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
