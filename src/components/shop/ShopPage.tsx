import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Tag, 
  Sparkles, 
  X, 
  Heart,
  Grid,
  Filter
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ShopPageProps {
  initialCategory?: string;
  initialQuery?: string;
  initialFilter?: string;
  onSelectProduct?: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ 
  initialCategory = 'all',
  initialQuery = '',
  initialFilter = '',
  onSelectProduct
}) => {
  const { wishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [quickFilter, setQuickFilter] = useState<string>(initialFilter || 'all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [priceRange, setPriceRange] = useState<number>(500);

  // Sync props if changed
  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery);
  }, [initialQuery]);

  React.useEffect(() => {
    if (initialFilter) setQuickFilter(initialFilter);
  }, [initialFilter]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Quick filter tabs
      if (quickFilter === 'offers' && !product.isOffer) {
        return false;
      }
      if (quickFilter === 'seasonal' && !product.isSeasonal) {
        return false;
      }
      if (quickFilter === 'bestsellers' && !product.isBestSeller) {
        return false;
      }
      if (quickFilter === 'wishlist' && !wishlist.includes(product.id)) {
        return false;
      }

      // Max Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchHindi = product.hindiName?.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchTag = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchHindi && !matchDesc && !matchTag) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      return b.reviewCount - a.reviewCount; // popular
    });
  }, [selectedCategory, quickFilter, priceRange, searchQuery, sortBy, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setQuickFilter('all');
    setSearchQuery('');
    setSortBy('popular');
    setPriceRange(500);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    quickFilter !== 'all' || 
    searchQuery.trim() !== '' || 
    priceRange < 500;

  return (
    <div className="py-8 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <nav className="text-xs text-stone-500 mb-2 flex items-center gap-1.5">
            <span>Home</span>
            <span>/</span>
            <span className="font-semibold text-stone-800">Online Supermarket Catalog</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Fresh Produce & Groceries
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Showing {filteredProducts.length} items with guaranteed same-day delivery
              </p>
            </div>

            {/* In-Catalog Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search within store..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'offers', label: 'Today’s Offers', badge: 'Hot' },
            { id: 'bestsellers', label: 'Best Sellers' },
            { id: 'seasonal', label: 'Seasonal Picks' },
            { id: 'wishlist', label: `My Wishlist (${wishlist.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setQuickFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                quickFilter === tab.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-500'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1 py-0.2 bg-amber-400 text-stone-900 text-[10px] rounded font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Filters */}
          <aside className="space-y-6">
            
            {/* Category Filter Box */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Categories
                </h3>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-[11px] text-emerald-700 font-semibold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] text-stone-400">{PRODUCTS.length}</span>
                </button>

                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[11px] text-stone-400 shrink-0">{cat.itemCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Box */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-100">
                Max Price: ₹{priceRange}
              </h3>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>₹30</span>
                <span>₹250</span>
                <span>₹500+</span>
              </div>
            </div>

            {/* Reset All Filters button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            )}

          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3">
            
            {/* Sorting & Filter status strip */}
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-stone-500">
                Showing <strong>{filteredProducts.length}</strong> verified fresh items
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-semibold focus:outline-none focus:border-emerald-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-900">No matching products found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  We couldn't find any products matching your current search or filter criteria. Try expanding your price limit or clearing active filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors inline-block"
                >
                  View All Groceries
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
