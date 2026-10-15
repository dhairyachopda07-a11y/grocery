import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CategoryGridProps {
  onSelectCategory: (slug: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Curated Aisle Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (8 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group cursor-pointer bg-stone-50 rounded-2xl border border-stone-200/80 p-4 hover:border-emerald-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-200 mb-3">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                <span className="text-stone-400 font-medium">
                  {cat.itemCount} items
                </span>
                <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
