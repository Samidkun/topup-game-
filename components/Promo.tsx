"use client";

import React from 'react';
import { Tag,Gift, Zap } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import Skeleton from '@/components/ui/Skeleton';

// Static config for visual elements (icons, colors)
const promoConfig = [
  {
    icon: <Tag className="text-white" />,
    color: "from-purple-600 to-indigo-600",
  },
  {
    icon: <Gift className="text-white" />,
    color: "from-orange-600 to-amber-600",
  },
  {
    icon: <Zap className="text-white" />,
    color: "from-rose-600 to-pink-600",
  }
];

const Promo = () => {
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-muted-purple/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {dict.promo.title} <span className="text-accent">{dict.promo.title_highlight}</span> {dict.promo.title_suffix}
          </h2>
          <p className="text-white/40">{dict.promo.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="w-full max-w-sm rounded-[2rem] overflow-hidden">
                <Skeleton className="w-full h-64 md:h-80" />
              </div>
            ))
          ) : (
            dict.promo.items.map((promo: any, idx: number) => (
              <div key={idx} className="group glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden transition-all hover:border-primary/30 w-full max-w-sm">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${promoConfig[idx].color} blur-[60px] opacity-20 -z-10`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${promoConfig[idx].color} flex items-center justify-center shadow-lg`}>
                  {promoConfig[idx].icon}
                </div>
                <div className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                  {promo.badge}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{promo.title}</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">{promo.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div>
                  <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">{dict.promo.code}</div>
                  <div className="text-sm font-mono font-bold text-accent">{promo.code}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">{dict.promo.valid}</div>
                  <div className="text-sm font-bold text-white/60">{promo.date}</div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold transition-all uppercase tracking-widest active:scale-[0.98]">
                {dict.promo.use}
              </button>
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Promo;
