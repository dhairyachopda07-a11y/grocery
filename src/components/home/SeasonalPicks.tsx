import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';

interface SeasonalPicksProps {
  onShopAll: () => void;
}

export const SeasonalPicks: React.FC<SeasonalPicksProps> = ({ onShopAll }) => {
  const seasonalProducts = PRODUCTS.filter(p => p.isSeasonal || ['fruits-vegetables'].includes(p.category)).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative subtle texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Harvest of the Month</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Seasonal & Farm Fresh Picks
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-lg">
              Freshly harvested at regional peak maturity. Packed with natural sweetness, vibrant natural antioxidants, and authentic terroir.
            </p>
          </div>

          <button
            onClick={onShopAll}
            className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Explore All Seasonal Items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid in Seasonal Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalProducts.map((product) => (
            <div key={product.id} className="text-stone-900">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
