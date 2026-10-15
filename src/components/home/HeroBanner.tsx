import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Truck } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface HeroBannerProps {
  onShopNow: () => void;
  onExploreSeasonal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onExploreSeasonal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-stone-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill-free kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Direct Farm-to-Doorstep Groceries</span>
              <span className="text-stone-300">·</span>
              <span>Bengaluru & Pan-India Hubs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Fresh Groceries, <br />
              <span className="text-emerald-700">Delivered to Your Door.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Skip the crowded supermarket lines. Savor naturally ripened fruits, crisp morning vegetables, stone-milled wheat flour, and unpolished lentils harvested with care from India's finest agro-collectives.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
              >
                <span>Shop Everyday Essentials</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSeasonal}
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-semibold rounded-2xl border border-stone-300 shadow-sm hover:border-emerald-500 transition-all duration-200 text-sm"
              >
                Explore Fresh Picks
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2-Hour Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Pesticide Residue</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Morning 7 AM Slots</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[5/4] bg-stone-200">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                alt="Vibrant array of fresh organic vegetables, bell peppers, carrots, and fruits at a farm market display"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                    Today's Harvest Arrival
                  </span>
                  <p className="text-xs font-bold text-stone-900 mt-0.5">
                    100% Quality Inspected Produce
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-700 block">₹0 Delivery</span>
                  <span className="text-[10px] text-stone-500">on orders &gt; ₹499</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
