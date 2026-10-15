import React from 'react';
import { Sprout, Clock, ShieldCheck, Banknote } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Sprout,
      title: 'Direct Farm Sourcing',
      description: 'We partner directly with 450+ certified farmer collectives across Karnataka, Maharashtra, and Himachal Pradesh, bypassing middlemen so produce reaches you within 24 hours of harvest.'
    },
    {
      icon: Clock,
      title: '2-Hour Express Delivery',
      description: 'Our fleet of electric delivery vans and insulated temperature-controlled crates ensures tender herbs, leafy palak, and fresh dairy arrive without wilting or spoilage.'
    },
    {
      icon: ShieldCheck,
      title: 'Triple Quality Inspection',
      description: 'Every crate undergoes stringent quality checks for size, firmness, natural color, and zero pesticide residues in compliance with rigorous FSSAI standards.'
    },
    {
      icon: Banknote,
      title: 'Fair & Transparent Pricing',
      description: 'No inflated surge fees during peak morning hours. Honest per-kilo pricing with clear savings on weekly household essentials.'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            The Kanchan Super Market Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Why Discerning Families Trust Kanchan Super Market
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Built on transparency, sustainability, and respect for domestic culinary traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
