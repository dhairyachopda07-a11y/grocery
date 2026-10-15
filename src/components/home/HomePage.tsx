import React from 'react';
import { ArrowRight, Sparkles, Tag, Flame, ShieldCheck } from 'lucide-react';
import { HeroBanner } from './HeroBanner';
import { CategoryGrid } from './CategoryGrid';
import { SeasonalPicks } from './SeasonalPicks';
import { WhyChooseUs } from './WhyChooseUs';
import { FeaturedBlogSection } from './FeaturedBlogSection';
import { CustomerReviews } from './CustomerReviews';
import { NewsletterSection } from './NewsletterSection';
import { ProductCard } from '../shop/ProductCard';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface HomePageProps {
  onNavigate: (view: string, param?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 8);
  const todaysOffers = PRODUCTS.filter(p => p.isOffer && p.discountPercentage && p.discountPercentage >= 15).slice(0, 4);

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroBanner 
        onShopNow={() => onNavigate('shop')}
        onExploreSeasonal={() => onNavigate('shop', 'seasonal')}
      />

      {/* 2. Shop by Category (8 aisles) */}
      <CategoryGrid 
        onSelectCategory={(slug) => {
          if (slug === 'all') {
            onNavigate('shop');
          } else {
            onNavigate('shop', slug);
          }
        }}
      />

      {/* 3. Today's Offers (Discounted Products) */}
      <section className="py-14 sm:py-20 bg-stone-100/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Save Big This Week</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Today's Special Offers & Discounts
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Freshly marked-down daily essentials. Limited harvest batches at direct-from-source prices.
              </p>
            </div>

            <button
              onClick={() => onNavigate('offers')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>See All Deals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {todaysOffers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers Product Grid */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Most Popular Groceries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Customer Best Sellers
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                The most re-ordered kitchen essentials ordered daily across Indian households.
              </p>
            </div>

            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>Explore Entire Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Seasonal Produce Spotlight */}
      <SeasonalPicks onShopAll={() => onNavigate('shop', 'seasonal')} />

      {/* 6. Why Choose Us (4 pillars) */}
      <WhyChooseUs />

      {/* 7. Featured Blog Articles (4 latest) */}
      <FeaturedBlogSection 
        onReadArticle={(slug) => onNavigate('blog-article', slug)}
        onViewAllBlogs={() => onNavigate('blog')}
      />

      {/* 8. Customer Reviews (Sample Feedback) */}
      <CustomerReviews />

      {/* 9. Newsletter Subscription */}
      <NewsletterSection />

    </div>
  );
};
