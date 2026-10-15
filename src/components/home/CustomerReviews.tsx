import React from 'react';
import { Star, Quote, Info } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Demo Label */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold mb-2">
            <Info className="w-3.5 h-3.5 text-stone-500" />
            <span>Sample Customer Experience (Demo Showcase)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Loved by Conscious Indian Households
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real families, real kitchens. Here is what demo shoppers love about Kanchan Super Market.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-stone-300 mb-2" />
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-3">
                <ImageWithFallback
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{t.name}</h4>
                  <p className="text-[11px] text-stone-500">{t.city}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                    {t.verifiedTag}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
