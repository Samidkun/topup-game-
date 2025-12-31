"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ShoppingCart,
  Copy,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/ui/Toast";
import { useLanguage } from "@/context/LanguageContext";

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { dict } = useLanguage();

  // State for dynamic data
  const [game, setGame] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [selectedNominal, setSelectedNominal] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch game data
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/games/${params.slug}`);
        const data = await res.json();

        if (data.error) {
          router.push("/"); // Redirect if game not found
          return;
        }

        setGame(data);
      } catch (error) {
        console.error("Failed to fetch game:", error);
        setToast({ message: "Failed to load game data", type: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchGame();
    }
  }, [params.slug, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    if (!userId || !serverId) {
      setToast({ message: dict.gameDetail.toast_error_data, type: "error" });
      return;
    }
    if (!selectedNominal) {
      setToast({ message: dict.gameDetail.toast_error_nominal, type: "error" });
      return;
    }

    // Simulate navigation
    setToast({ message: dict.gameDetail.toast_process, type: "success" });
    const queryparams = new URLSearchParams({
      slug: game.slug,
      userid: userId,
      serverid: serverId,
      nominal: selectedNominal,
    }).toString();
    setTimeout(() => {
      router.push(`/checkout?${queryparams}`);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white animate-pulse">Loading Game Data...</div>
      </div>
    );
  }

  if (!game) return null;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            {dict.gameDetail.back}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Game Info & Nominals */}
            <div className="lg:col-span-2 space-y-8">
              {/* Game Header */}
              <div className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6">
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {game.name}
                  </h1>
                  <p className="text-white/50 text-sm">
                    {game.developer} • {game.category}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                      Popular
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white/60 text-xs font-medium rounded-full">
                      {dict.gameDetail.process_instant}
                    </span>
                  </div>
                </div>
              </div>

              {/* Input User ID */}
              <div className="glass p-6 rounded-3xl border border-white/10">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">
                    1
                  </span>
                  {dict.gameDetail.data_title}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      {dict.gameDetail.userid_label}
                    </label>
                    <input
                      type="text"
                      placeholder={dict.gameDetail.userid_placeholder}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      {dict.gameDetail.zoneid_label}
                    </label>
                    <input
                      type="text"
                      placeholder={dict.gameDetail.zoneid_placeholder}
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                <p className="text-white/30 text-xs mt-3">
                  {dict.gameDetail.helper_text}
                </p>
              </div>

              {/* Pilih Nominal */}
              <div className="glass p-6 rounded-3xl border border-white/10">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm">
                    2
                  </span>
                  {dict.gameDetail.nominal_title}
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {game.nominals.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedNominal(item.id)}
                      className={`relative p-4 rounded-2xl border text-left transition-all ${
                        selectedNominal === item.id
                          ? "bg-primary/20 border-primary"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {selectedNominal === item.id && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 size={16} className="text-primary" />
                        </div>
                      )}
                      <div className="text-white font-bold">
                        {item.amount} 💎
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
                <h2 className="text-lg font-bold text-white mb-6">
                  {dict.gameDetail.summary_title}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Game</span>
                    <span className="text-white font-medium">{game.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">User ID</span>
                    <span className="text-white font-medium">
                      {userId || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Zone ID</span>
                    <span className="text-white font-medium">
                      {serverId || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">
                      {dict.gameDetail.item}
                    </span>
                    <span className="text-white font-medium">
                      {selectedNominal
                        ? `${
                            game.nominals.find(
                              (n: any) => n.id === selectedNominal
                            )?.amount
                          } Diamonds`
                        : "-"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white/50">
                      {dict.gameDetail.total}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {selectedNominal
                        ? formatPrice(
                            game.nominals.find(
                              (n: any) => n.id === selectedNominal
                            )?.price || 0
                          )
                        : "-"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                >
                  <ShoppingCart size={20} />
                  {dict.gameDetail.checkout_btn}
                </button>

                <p className="text-white/30 text-xs text-center mt-4">
                  {dict.gameDetail.terms_agree}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
