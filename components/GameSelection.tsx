"use client";

import React, { useState } from 'react';
import { Search, Flame } from 'lucide-react';

const categories = ["Semua", "MOBA", "Battle Royale", "RPG", "FPS"];

const games = [
  { id: 1, name: "Mobile Legends", category: "MOBA", image: "/images/games/Image (Mobile Legends).png", tag: "Hot" },
  { id: 2, name: "Free Fire", category: "Battle Royale", image: "/images/games/Image (Free Fire).png", tag: "Popular" },
  { id: 3, name: "PUBG Mobile", category: "Battle Royale", image: "/images/games/Image (PUBG Mobile).png", tag: "Popular" },
  { id: 4, name: "Genshin Impact", category: "RPG", image: "/images/games/Image (Genshin Impact).png", tag: "New" },
  { id: 5, name: "Call of Duty Mobile", category: "FPS", image: "/images/games/Image (Call of Duty Mobile).png", tag: "" },
  { id: 6, name: "Valorant", category: "FPS", image: "/images/games/Image (Valorant).png", tag: "Hot" },
  { id: 7, name: "League of Legends", category: "MOBA", image: "/images/games/Image (League of Legends).png", tag: "" },
  { id: 8, name: "Arena of Valor", category: "MOBA", image: "/images/games/Image (Arena of Valor).png", tag: "" },
];

const GameSelection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(game => {
    const matchesCategory = activeCategory === "Semua" || game.category === activeCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      {/* Header Section - Tetap Center */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Pilih <span className="gradient-text">Game Favorit</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-lg">
          Tersedia berbagai game populer dengan harga terbaik dan proses tercepat
        </p>
      </div>

      {/* Control Bar: Tabs & Search - Dibuat lebih solid */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 bg-white/[0.02] p-4 rounded-[2rem] border border-white/5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text"
            placeholder="Cari game favorit kamu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Grid - Benerin Alignment di sini */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {filteredGames.map((game) => (
            <div 
              key={game.id} 
              className="group relative rounded-[2.5rem] overflow-hidden aspect-[3/4] glass border border-white/10 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
            >
              <img 
                src={game.image} 
                alt={game.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay yang lebih gelap di bawah biar teks kebaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              {game.tag && (
                <div className="absolute top-5 right-5 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg uppercase tracking-wider">
                  <Flame size={12} fill="white" />
                  {game.tag}
                </div>
              )}

              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">{game.name}</h3>
                <div className="flex items-center gap-2">
                   <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] text-white/70 font-medium uppercase tracking-widest">
                    {game.category}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-white/20 text-xl font-medium">Game tidak ditemukan...</p>
        </div>
      )}
    </section>
  );
};

export default GameSelection;