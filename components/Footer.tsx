"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { dict } = useLanguage();

  return (
    <footer className="bg-muted-purple/40 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">GameTopUp</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              {dict.footer.desc}
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-all">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6">{dict.footer.company.title}</h4>
            <ul className="space-y-4">
              {dict.footer.company.links.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">{dict.footer.support.title}</h4>
            <ul className="space-y-4">
              {dict.footer.support.links.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">{dict.footer.contact.title}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5" />
                <span className="text-white/40 text-sm">support@gametopup.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5" />
                <span className="text-white/40 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span className="text-white/40 text-sm">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2023 {dict.footer.rights}
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-white/20 hover:text-white text-xs transition-colors">{dict.footer.support.links[3]}</Link>
            <Link href="#" className="text-white/20 hover:text-white text-xs transition-colors">{dict.footer.support.links[2]}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
