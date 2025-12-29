"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Wallet, Building2, Store, QrCode, ChevronRight, Shield, Clock, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckoutPage() {
  const { dict } = useLanguage();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('E-Wallet');

  const paymentMethods = [
    {
      category: "E-Wallet",
      icon: <Wallet size={20} />,
      methods: [
        { id: 'dana', name: 'DANA', fee: 0 },
        { id: 'ovo', name: 'OVO', fee: 0 },
        { id: 'gopay', name: 'GoPay', fee: 0 },
        { id: 'shopeepay', name: 'ShopeePay', fee: 0 },
      ]
    },
    {
      category: "Virtual Account",
      icon: <Building2 size={20} />,
      methods: [
        { id: 'bca', name: 'BCA Virtual Account', fee: 4000 },
        { id: 'bni', name: 'BNI Virtual Account', fee: 4000 },
        { id: 'bri', name: 'BRI Virtual Account', fee: 4000 },
        { id: 'mandiri', name: 'Mandiri Virtual Account', fee: 4000 },
      ]
    },
    {
      category: "QRIS",
      icon: <QrCode size={20} />,
      methods: [
        { id: 'qris', name: 'QRIS', fee: 0 },
      ]
    },
    {
      category: "Minimarket",
      icon: <Store size={20} />,
      methods: [
        { id: 'alfamart', name: 'Alfamart', fee: 2500 },
        { id: 'indomaret', name: 'Indomaret', fee: 2500 },
      ]
    },
  ];

  const orderSummary = {
    game: 'Mobile Legends',
    item: '706 Diamonds +16 Bonus',
    userId: '123456789',
    serverId: '1234',
    price: 152000,
  };

  const selectedMethod = paymentMethods
    .flatMap(cat => cat.methods)
    .find(m => m.id === selectedPayment);

  const adminFee = selectedMethod?.fee || 0;
  const total = orderSummary.price + adminFee;

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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/game/mobile-legends" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            {dict.checkout.back}
          </Link>

          <h1 className="text-3xl font-bold text-white mb-8">{dict.checkout.title}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Payment Methods */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">{dict.checkout.payment_method_title}</h2>
              
              {paymentMethods.map((category) => (
                <div key={category.category} className="glass rounded-2xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                        {category.icon}
                      </div>
                      <span className="text-white font-medium">{category.category}</span>
                    </div>
                    <ChevronRight 
                      size={20} 
                      className={`text-white/30 transition-transform ${expandedCategory === category.category ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  
                  {expandedCategory === category.category && (
                    <div className="border-t border-white/5">
                      {category.methods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors ${
                            selectedPayment === method.id ? 'bg-primary/10' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPayment === method.id ? 'border-primary bg-primary' : 'border-white/30'
                            }`}>
                              {selectedPayment === method.id && <CheckCircle2 size={12} className="text-white" />}
                            </div>
                            <span className="text-white">{method.name}</span>
                          </div>
                          <span className="text-white/50 text-sm">
                            {method.fee > 0 ? `+${formatPrice(method.fee)}` : dict.checkout.free}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="glass p-6 rounded-3xl border border-white/10 sticky top-28">
                <h2 className="text-lg font-bold text-white mb-6">{dict.checkout.order_detail_title}</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Game</span>
                    <span className="text-white font-medium">{orderSummary.game}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{dict.gameDetail.item}</span>
                    <span className="text-white font-medium">{orderSummary.item}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{dict.gameDetail.userid_label}</span>
                    <span className="text-white font-medium">{orderSummary.userId} ({orderSummary.serverId})</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{dict.checkout.item_price}</span>
                    <span className="text-white">{formatPrice(orderSummary.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{dict.checkout.admin_fee}</span>
                    <span className="text-white">{adminFee > 0 ? formatPrice(adminFee) : dict.checkout.free}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/10">
                    <span className="text-white font-medium">{dict.gameDetail.total}</span>
                    <span className="text-2xl font-bold text-white">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    selectedPayment
                      ? 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <CreditCard size={20} />
                  {dict.checkout.pay_btn}
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <Shield size={14} />
                    {dict.checkout.secure_trans}
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <Clock size={14} />
                    {dict.checkout.instant_proc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
