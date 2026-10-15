import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CategoriesPageProps {
  onSelectCategory: (slug: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectCategory }) => {
  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Aisles & Departments
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Explore All 8 Grocery Departments
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Carefully curated collections of daily vegetables, stone-milled flours, certified organic staples, and breakfast items.
          </p>
        </div>

        {/* 8 Categories Large Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group cursor-pointer bg-white rounded-3xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full bg-stone-100 overflow-hidden relative">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {cat.itemCount} items
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Shop this Aisle</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
