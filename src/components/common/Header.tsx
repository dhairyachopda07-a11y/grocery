import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  Percent, 
  Tag, 
  Sparkles,
  Check
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ImageWithFallback } from './ImageWithFallback';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
}

const CITIES = [
  { name: 'Bengaluru (Indiranagar)', pin: '560038' },
  { name: 'Bengaluru (Koramangala)', pin: '560034' },
  { name: 'Mumbai (Bandra West)', pin: '400050' },
  { name: 'Delhi NCR (South Ex)', pin: '110049' },
  { name: 'Hyderabad (Jubilee Hills)', pin: '500033' },
  { name: 'Pune (Kothrud)', pin: '411038' }
];

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { 
    cartCount, 
    subtotal, 
    setIsCartOpen, 
    wishlist, 
    selectedCity, 
    setSelectedCity,
    pincode,
    setPincode,
    addToCart,
    setSelectedProduct
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPromoDismissed, setIsPromoDismissed] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search results
  const searchResults = searchQuery.trim().length >= 2
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (city: { name: string; pin: string }) => {
    setSelectedCity(city.name);
    setPincode(city.pin);
    setIsLocationOpen(false);
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'categories' },
    { label: 'Today’s Offers', view: 'offers', badge: 'Deals' },
    { label: 'Recipes', view: 'recipes' },
    { label: 'Blog', view: 'blog' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* 1. Announcement Bar */}
      {!isPromoDismissed && (
        <div className="bg-emerald-900 text-emerald-50 text-xs px-4 py-2 flex items-center justify-between tracking-wide">
          <div className="mx-auto flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] text-emerald-200 uppercase font-semibold">
              <Percent className="w-3 h-3" /> Offer
            </span>
            <span>Free 2-Hour Express Delivery on orders above ₹499 · Use code <strong className="text-white underline decoration-emerald-400">FRESH100</strong> for ₹100 off</span>
          </div>
          <button 
            onClick={() => setIsPromoDismissed(true)}
            className="text-emerald-300 hover:text-white p-0.5 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          
          {/* Brand Wordmark & Location */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-sm group-hover:bg-emerald-700 transition-colors">
                F
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-stone-900 block leading-none">
                  Fresh<span className="text-emerald-600">Basket</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-500 mt-0.5 block">
                  Farm Fresh · Supermarket
                </span>
              </div>
            </button>

            {/* Location Selector Dropdown */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-2 text-left px-3 py-1.5 rounded-lg border border-stone-200 hover:border-emerald-500 bg-stone-50 transition-colors text-xs"
              >
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-stone-500 font-medium">Deliver to</span>
                  <span className="block font-semibold text-stone-800 line-clamp-1 max-w-[140px]">
                    {selectedCity}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isLocationOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider border-b border-stone-100">
                    Select Delivery Hub
                  </div>
                  {CITIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleSelectCity(c)}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-emerald-50 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <p className="font-medium text-stone-800">{c.name}</p>
                        <p className="text-stone-400 text-[11px]">PIN: {c.pin}</p>
                      </div>
                      {selectedCity === c.name && (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Real-time Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search fresh mangoes, basmati rice, milk, paneer, atta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-full text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden z-50">
                <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
                  <span>Product Suggestions</span>
                  <span>{searchResults.length} matches</span>
                </div>
                <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-stone-50 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsSearchFocused(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.altText}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-100 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-stone-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-stone-500">{product.unit} · <span className="text-emerald-700 font-bold">₹{product.price}</span></p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-stone-50 border-t border-stone-100 text-center">
                  <button
                    onClick={() => {
                      onNavigate('shop', searchQuery);
                      setIsSearchFocused(false);
                    }}
                    className="text-xs text-emerald-700 font-semibold hover:underline"
                  >
                    View all matching products in catalog →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('shop', 'wishlist')}
              className="relative p-2.5 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow"
              aria-label="Open Shopping Basket"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-emerald-200 uppercase font-semibold">My Basket</span>
                <span className="text-xs font-bold tabular-nums">
                  {cartCount === 0 ? 'Empty' : `₹${subtotal}`}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-emerald-700 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 3. Secondary Navigation Strip */}
        <nav className="hidden md:flex items-center justify-between border-t border-stone-100 py-2.5 text-sm">
          <div className="flex items-center gap-7 overflow-x-auto no-scrollbar py-0.5">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => onNavigate(link.view)}
                  className={`relative font-medium whitespace-nowrap transition-colors py-1 ${
                    isActive
                      ? 'text-emerald-700 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Guaranteed Farm-to-Kitchen in 24 Hrs</span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-4">
          {/* Mobile search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
            />
          </div>

          {/* Mobile location */}
          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{selectedCity} ({pincode})</span>
            </div>
            <button 
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="text-emerald-700 font-semibold"
            >
              Change
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  onNavigate(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 text-left rounded-lg text-sm font-medium ${
                  currentView === link.view
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
