import React from 'react';
import { Sprout, ShieldCheck, HeartHandshake, Truck, Award, Users } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AboutPageProps {
  onShopNow: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onShopNow }) => {
  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Our Soil, Our Farmers, Your Kitchen
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Nourishing India with Authentic, Honest Groceries
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Kanchan Super Market was founded with a singular conviction: that every Indian family deserves unadulterated food harvested with dignity, delivered at peak freshness, and priced with fair transparency.
          </p>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm">
          <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold text-stone-900">
              The Journey from Farm Gate to Doorstep
            </h2>
            <p>
              Traditional grocery supply chains in India pass vegetables and grains through four to six intermediate mandis. By the time leafy greens or seasonal fruits reach your local neighborhood cart, they have been harvested 4 to 6 days prior, losing over 40% of their natural vitamin C and crisp sweetness.
            </p>
            <p>
              Kanchan Super Market eliminates these middlemen. By operating localized collection centers in prime agricultural belts—from the fertile tomato plains of Kolar to the mango orchards of Ratnagiri and apple terraces of Shimla—produce harvested at 5:00 AM arrives in our temperature-controlled urban hubs by midnight, ready for your 7:00 AM breakfast table.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-900 font-bold">
              <div>
                <span className="text-2xl font-extrabold text-emerald-700 block">450+</span>
                <span className="text-stone-500 font-normal">Farmer Collectives</span>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <span className="text-2xl font-extrabold text-emerald-700 block">&lt; 24 Hrs</span>
                <span className="text-stone-500 font-normal">Harvest to Kitchen</span>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <span className="text-2xl font-extrabold text-emerald-700 block">0%</span>
                <span className="text-stone-500 font-normal">Chemical Polish</span>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-md">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Farmer holding fresh crate of vegetables at sunrise in rural India"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Unpolished Integrity</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our toor, moong, and chana dals are never polished with marble powder or synthetic oils. What you cook is 100% pure seed coat and aleurone nutrients.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Rigorous Lab Testing</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every delivery lot is randomly sampled and checked for heavy metals, moisture limits, and chemical residues under FSSAI-accredited testing protocols.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Direct Farmer Honorarium</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We guarantee agricultural partners 20-30% above prevailing APMC mandi rates, deposited directly into verified bank accounts within 48 hours of harvest.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Taste the Difference of Genuine Farm Freshness
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Try your first basket with code <strong className="text-amber-400">FRESH100</strong> for ₹100 off, with free 2-hour doorstep delivery.
          </p>
          <button
            onClick={onShopNow}
            className="px-8 py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold rounded-2xl text-xs transition-colors shadow-md inline-block"
          >
            Explore Fresh Groceries Now
          </button>
        </div>

      </div>
    </div>
  );
};
